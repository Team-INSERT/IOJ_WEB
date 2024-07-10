import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Main } from "../pages/main/ui/page/Page";
import { Game } from "../pages/game/index";

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
