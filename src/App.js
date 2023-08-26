import React from 'react';
import Home from './Pages/Home/Home';
import Events from './Pages/Event/Events';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import AboutUs from './Pages/AboutUs/AboutUs';
import Hall from './Pages/HallofFame/Hall';
import OurCells from './Pages/Our-Cells/OurCells';
import Footer from './Components/Footer/Footer';
import Team from './Pages/Our-Team/Team';

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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
