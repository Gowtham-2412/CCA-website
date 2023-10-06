import React from 'react';
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

function App() {
  return (
    <BrowserRouter>
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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
