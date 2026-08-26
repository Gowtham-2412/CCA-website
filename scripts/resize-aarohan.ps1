<#
    resize-aarohan.ps1 — generate web-sized derivatives for the Aarohan gallery.

    Why this exists
    ---------------
    Four of the seven Aarohan gallery photos are unprocessed camera originals:

        ARHN6  14.9 MB      ARHN4  13.0 MB
        ARHN5   9.2 MB      ARHN2   6.8 MB

    That is ~44 MB to fill a frame that is at most ~1060x620 CSS pixels. CRA
    emits imported assets byte-for-byte, so the browser downloads and decodes
    the full original either way.

    This script writes two derivatives per photo into src/Assets/Images/aarohan:

        ARHNn-w1600.jpg   long edge <= 1600px, q82   ~200-350 KB   the active frame
        ARHNn-t320.jpg    long edge <=  320px, q82   ~10-20 KB     the contact strip

    NON-DESTRUCTIVE BY DESIGN. D:\CCA is not a git repository, so there is no way
    to recover an overwritten original. Sources are opened read-only and never
    written to. Delete the aarohan/ output folder to undo this script entirely.

    Usage
    -----
        powershell -ExecutionPolicy Bypass -File scripts\resize-aarohan.ps1

    It then rewrites src/Pages/Aarohan/galleryAssets.js to import the derivatives,
    with the real measured dimensions baked in. Nothing needs editing by hand —
    galleryFrames.js owns captions and order and is not touched.
#>

Add-Type -AssemblyName System.Drawing

$SrcDir = Join-Path $PSScriptRoot '..\src\Assets\Images'
$OutDir = Join-Path $SrcDir 'aarohan'

# Order matches the gallery. ARHN7 is deliberately absent — it is not used.
$Sources = @(
    @{ Key = 'ARHN1'; File = 'ARHN1.jpeg'; Caption = 'Grand Inauguration' }
    @{ Key = 'ARHN2'; File = 'ARHN2.jpeg'; Caption = 'Robotics Arena'     }
    @{ Key = 'ARHN3'; File = 'ARHN3.jpeg'; Caption = 'Cultural Nights'    }
    @{ Key = 'ARHN4'; File = 'ARHN4.jpeg'; Caption = 'Hackathon'          }
    @{ Key = 'ARHN5'; File = 'ARHN5.JPG';  Caption = 'Inspiratie Talks'   }
    @{ Key = 'ARHN6'; File = 'ARHN6.jpeg'; Caption = 'Decathlon Battle'   }
    @{ Key = 'ARHN8'; File = 'ARHN8.jpeg'; Caption = 'Closing Ceremony'   }
)

$FULL_EDGE  = 1600
$THUMB_EDGE = 320
$QUALITY    = 82

if (-not (Test-Path $OutDir)) {
    New-Item -ItemType Directory -Path $OutDir | Out-Null
    Write-Host "created $OutDir" -ForegroundColor DarkGray
}

$JpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq 'image/jpeg' }

# EXIF orientation. System.Drawing does NOT apply this automatically, so a
# portrait-orientation camera original would silently come out sideways. Read
# tag 0x0112 and bake the rotation into the pixels, then drop the tag so the
# browser cannot rotate it a second time.
function Set-ExifOrientation {
    param([System.Drawing.Image]$Image)

    $ORIENTATION = 0x0112
    if ($Image.PropertyIdList -notcontains $ORIENTATION) { return }

    $value = $Image.GetPropertyItem($ORIENTATION).Value[0]
    switch ($value) {
        2 { $Image.RotateFlip([System.Drawing.RotateFlipType]::RotateNoneFlipX) }
        3 { $Image.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
        4 { $Image.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipX) }
        5 { $Image.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipX) }
        6 { $Image.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
        7 { $Image.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipX) }
        8 { $Image.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
        default { return }
    }
    $Image.RemovePropertyItem($ORIENTATION)
}

# Scales to fit within MaxEdge preserving aspect ratio, and never upscales.
# No centre-crop: the CSS container already crops with object-fit: cover, so
# cropping here would only throw away pixels the layout might later want.
function Save-Resized {
    param(
        [System.Drawing.Image]$Image,
        [string]$DestPath,
        [int]$MaxEdge,
        [int]$Quality
    )

    $longest = [Math]::Max($Image.Width, $Image.Height)
    $scale   = [Math]::Min(1.0, $MaxEdge / [double]$longest)
    $w       = [int][Math]::Round($Image.Width  * $scale)
    $h       = [int][Math]::Round($Image.Height * $scale)

    $bmp = New-Object System.Drawing.Bitmap $w, $h
    try {
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        try {
            # Defaults here are visibly poor on a large downscale.
            $g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
            $g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
            $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
            $g.DrawImage($Image, 0, 0, $w, $h)
        } finally { $g.Dispose() }

        # Explicit quality — the default JPEG encoder setting is lower than this.
        $ep = New-Object System.Drawing.Imaging.EncoderParameters 1
        try {
            $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
                [System.Drawing.Imaging.Encoder]::Quality, [int]$Quality)
            $bmp.Save($DestPath, $JpegCodec, $ep)
        } finally { $ep.Dispose() }
    } finally { $bmp.Dispose() }

    return @{ W = $w; H = $h }
}

$results     = @()
$totalBefore = 0
$totalAfter  = 0

foreach ($entry in $Sources) {
    $srcPath = Join-Path $SrcDir $entry.File
    if (-not (Test-Path $srcPath)) {
        Write-Host "SKIP  $($entry.File) — not found" -ForegroundColor Yellow
        continue
    }

    $srcBytes     = (Get-Item $srcPath).Length
    $totalBefore += $srcBytes

    $fullName  = "$($entry.Key)-w$FULL_EDGE.jpg"
    $thumbName = "$($entry.Key)-t$THUMB_EDGE.jpg"
    $fullPath  = Join-Path $OutDir $fullName
    $thumbPath = Join-Path $OutDir $thumbName

    # FromFile holds a lock for the lifetime of the object, so always dispose.
    # Read-only access — the source is never saved back.
    $img = [System.Drawing.Image]::FromFile($srcPath)
    try {
        Set-ExifOrientation -Image $img
        $full  = Save-Resized -Image $img -DestPath $fullPath  -MaxEdge $FULL_EDGE  -Quality $QUALITY
        $thumb = Save-Resized -Image $img -DestPath $thumbPath -MaxEdge $THUMB_EDGE -Quality $QUALITY
        $srcW = $img.Width; $srcH = $img.Height
    } finally { $img.Dispose() }

    $fullBytes   = (Get-Item $fullPath).Length
    $thumbBytes  = (Get-Item $thumbPath).Length
    $totalAfter += $fullBytes + $thumbBytes

    Write-Host ("{0,-6} {1,5}x{2,-5} {3,7} KB  ->  {4}x{5} {6} KB  +  thumb {7}x{8} {9} KB" -f `
        $entry.Key, $srcW, $srcH, [math]::Round($srcBytes/1KB),
        $full.W, $full.H, [math]::Round($fullBytes/1KB),
        $thumb.W, $thumb.H, [math]::Round($thumbBytes/1KB)) -ForegroundColor Green

    $results += @{
        Key = $entry.Key; Caption = $entry.Caption
        W = $full.W; H = $full.H
    }
}

Write-Host ""
Write-Host ("gallery payload  {0} MB  ->  {1} MB" -f `
    [math]::Round($totalBefore/1MB, 1), [math]::Round($totalAfter/1MB, 2)) -ForegroundColor Cyan
Write-Host "originals untouched in $SrcDir" -ForegroundColor DarkGray

# ── Regenerate galleryAssets.js ──
# Bailing out on an empty result set matters: writing the file anyway would leave
# an ASSETS object with no keys, and galleryFrames.js would spread `undefined`
# into every frame. Better to leave the working placeholder in place.
if ($results.Count -eq 0) {
    Write-Host ""
    Write-Host "no images processed — galleryAssets.js left alone" -ForegroundColor Yellow
    exit 1
}

$assetsPath = [System.IO.Path]::GetFullPath(
    (Join-Path $PSScriptRoot '..\src\Pages\Aarohan\galleryAssets.js'))

$header = @'
/**
 * GENERATED FILE — written by scripts/resize-aarohan.ps1. Do not hand-edit;
 * re-run the script instead.
 *
 * Captions and frame order live in galleryFrames.js, which is hand-maintained.
 * This file holds only derived data — which file each frame resolves to, and its
 * measured pixel dimensions — so regenerating it can never lose a decision a
 * person made.
 *
 * The sources are the untouched camera originals in Assets/Images. Everything
 * imported below is an additional file, so this is fully reversible: delete
 * Assets/Images/aarohan/ and restore the placeholder version of this file.
 */

'@

$imports = ($results | ForEach-Object {
    ("import {0}_W from '../../Assets/Images/aarohan/{0}-w{1}.jpg';`n" +
     "import {0}_T from '../../Assets/Images/aarohan/{0}-t{2}.jpg';") -f `
        $_.Key, $FULL_EDGE, $THUMB_EDGE
}) -join "`n"

$openBlock = @'

/**
 * Keyed by source basename so galleryFrames.js reads as a running order.
 *
 * w/h are the full image's real output dimensions, measured at generation time
 * rather than assumed — EXIF rotation means a portrait original's dimensions are
 * not always what its header claims. GalleryViewfinder passes them through to the
 * <img> width/height attributes so the browser reserves the correct box before
 * CSS is applied. The thumbnails sit in fixed-size buttons and do not need them.
 */
export const ASSETS = {
'@

$entries = ($results | ForEach-Object {
    "  {0}: {{ full: {0}_W, thumb: {0}_T, w: {1}, h: {2} }}," -f $_.Key, $_.W, $_.H
}) -join "`n"

# UTF-8 *without* BOM. PowerShell 5.1's -Encoding utf8 emits a BOM, and Out-File
# defaults to UTF-16, either of which is a needless oddity in a source file.
$content = $header + $imports + "`n" + $openBlock + $entries + "`n};`n"
[System.IO.File]::WriteAllText($assetsPath, $content, (New-Object System.Text.UTF8Encoding $false))

Write-Host ""
Write-Host "wrote $assetsPath" -ForegroundColor Green
Write-Host "nothing left to edit by hand — rebuild to pick it up" -ForegroundColor DarkGray
