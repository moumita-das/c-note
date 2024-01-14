import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import SongDetails from "./pages/SongDetails";
import Upload from "./pages/Upload";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/song/:songId" element={<SongDetails />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/login" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
