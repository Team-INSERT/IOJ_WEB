import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Main } from "@/pages/main/index";
import { Game } from "@/pages/game/index";
import { Login } from "@/pages/login";
import { Setting } from "@/pages/setting";
import { useAuthService } from "@/shared/utils/auth/useAuthService";
import GameHome from "@/pages/room/ui/GameHome";
import ContestList from "@/pages/room/ui/Contest/List";
import ContestQuestion from "@/pages/room/ui/Contest/Question";

const App = () => {
  useAuthService();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/game" element={<GameHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/game/contest" element={<ContestList />} />
        <Route path="/game/contest/questions" element={<ContestQuestion />} />
        <Route path="/game/contest/code" element={<Game />} />
      </Routes>
    </Router>
  );
};

export default App;
