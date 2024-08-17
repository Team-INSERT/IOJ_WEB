import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuthService } from "@/shared/utils/auth/useAuthService";
import { Main } from "@/pages/main";
import { Game } from "@/pages/game";
import { Login } from "@/pages/login";
import { Setting } from "@/pages/setting";
import { GameHome, ContestList, ContestQuestion } from "@/pages/room";
import { Contest, Start, Question } from "@/pages/admin";

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
        <Route path="/game/contest/:contestId" element={<ContestQuestion />} />
        {/* <Route
          path="/game/contest/ranking/:contestId"
          element={<ContestRanking />}
        /> */}
        <Route path="/game/contest/code" element={<Game />} />
        <Route path="/admin" element={<Start />} />
        <Route path="/admin/Main" element={<Contest />} />
        <Route path="/admin/Question" element={<Question />} />
      </Routes>
    </Router>
  );
};

export default App;
