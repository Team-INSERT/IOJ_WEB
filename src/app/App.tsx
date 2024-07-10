import React from "react";
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Main } from "../pages/main/ui/page/Page";
import { Game } from "../pages/game/index";
=======
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Main } from "../pages/main/ui/page/Page";
>>>>>>> 176077a5b8a10b4a0fc0efa5c0c23c6795b39d9e

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
