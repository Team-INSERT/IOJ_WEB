import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Main } from "@/pages/main/ui/page/Page";
import { GameRanking } from "@/pages/gameRanking";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/game/ranking" element={<GameRanking />} />
      </Routes>
    </Router>
  );
};

export default App;
