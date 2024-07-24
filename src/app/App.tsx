import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Main } from "@/pages/main/ui/page/Page";
import { GameRanking } from "@/pages/gameRanking";
import { Login } from "@/pages/login";
import { useAuthService } from "@/shared/utils/auth/useAuthService";
import { Setting } from "@/pages/setting";

const App = () => {
  useAuthService();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/game/ranking" element={<GameRanking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </Router>
  );
};

export default App;
