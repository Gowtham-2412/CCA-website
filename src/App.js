import React from 'react';
import './App.css';
import Home from './Pages/Home/Home';
import Events from './Pages/Event/Events';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import AboutUs from './Pages/AboutUs/AboutUs';
import Hall from './Pages/HallofFame/Hall';
import OurCells from './Pages/Our-Cells/OurCells';
import Footer from './Components/Footer/Footer';
import Aarohan from './Pages/Aarohan/Aarohan';
import Team from './Pages/Our-Team/Team';
import Core from './Pages/Cells/CoreCell/CoreCell';
import Ecell from './Pages/Cells/Ecell/Ecell';
import RnD from './Pages/Cells/RnD/RnD.js';
import RoboCell from './Pages/Cells/RoboCell/RoboCell.js';
import WDCT from './Pages/Cells/WDCT/WDCT.js';
import ScrollToTop from './Components/UI/ScrollToTop';
import CustomCursor from './Components/UI/CustomCursor';
import InteractiveBackground from './Components/UI/InteractiveBackground';

function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <InteractiveBackground />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/events" element={<Events />} />
        <Route path="/hall" element={<Hall />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/our-team" element={<Team />} />
        <Route path="/our-cells" element={<OurCells />} />
        <Route path="/aarohan" element={<Aarohan />} />
        <Route path="/core" element={<Core />} />
        <Route path="/ecell" element={<Ecell />} />
        <Route path="/rnd" element={<RnD />} />
        <Route path="/robo" element={<RoboCell />} />
        <Route path="/wdct" element={<WDCT />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </BrowserRouter>
  );
}

export default App;
