import React from 'react';
import Home from './Pages/Home/Home';
import Events from './Pages/Event/Events';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import AboutUs from './Pages/AboutUs/AboutUs';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/events" element={<Events />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
