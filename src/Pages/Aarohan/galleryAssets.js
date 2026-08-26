/**
 * GENERATED FILE — overwritten by scripts/resize-aarohan.ps1.
 *
 * Do not hand-edit. Captions and frame order live in galleryFrames.js, which is
 * hand-maintained; this file holds only derived data (which file, what size), so
 * regenerating it can never lose a decision anyone made.
 *
 * ── Current state: placeholder, pointing at the untouched originals ──
 *
 * The resize script has not been run yet, so there are no derivatives to import
 * and every frame points at its camera original — `thumb` is the same file as
 * `full`, and dimensions are omitted.
 *
 * This placeholder exists so the module graph is valid before the script runs.
 * webpack resolves imports statically at build time, so a file that "will exist
 * later" is a hard build failure, not a warning — which is why galleryFrames.js
 * cannot simply import the derivatives directly and hope.
 *
 * To generate the real thing:
 *
 *     powershell -ExecutionPolicy Bypass -File scripts\resize-aarohan.ps1
 *
 * That writes ~2 MB of derivatives into Assets/Images/aarohan/ and rewrites this
 * file to import them, with the real output dimensions baked in. Nothing else
 * needs editing. To undo: delete Assets/Images/aarohan/ and `git checkout` this
 * file — or, since this repo is not under version control, re-paste the block
 * below, which is the whole placeholder.
 */

import {
  ARHN1, ARHN2, ARHN3, ARHN4, ARHN5, ARHN6, ARHN8,
} from '../../Assets/Images';

/**
 * Keyed by source basename so galleryFrames.js reads as a running order.
 *
 * `w`/`h` are absent here on purpose rather than guessed. GalleryViewfinder
 * omits the width/height attributes when they are missing, and the stage is a
 * fixed-height box either way, so the only thing lost is the browser's ability
 * to reserve the right box before CSS lands. A wrong guess would be worse than
 * nothing: it would reserve the wrong box and shift the layout on decode.
 */
export const ASSETS = {
  ARHN1: { full: ARHN1, thumb: ARHN1 },
  ARHN2: { full: ARHN2, thumb: ARHN2 },
  ARHN3: { full: ARHN3, thumb: ARHN3 },
  ARHN4: { full: ARHN4, thumb: ARHN4 },
  ARHN5: { full: ARHN5, thumb: ARHN5 },
  ARHN6: { full: ARHN6, thumb: ARHN6 },
  ARHN8: { full: ARHN8, thumb: ARHN8 },
};
