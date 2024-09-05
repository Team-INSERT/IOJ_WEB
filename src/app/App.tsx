import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuthService } from "@/shared/utils/auth/useAuthService";
import { Main } from "@/pages/main";
import { Game } from "@/pages/game";
import { Login } from "@/pages/login";
import { NotFound } from "@/pages/not-found/Not-found";
import {
  GameHome,
  ContestList,
  ContestQuestion,
  ContestRanking,
} from "@/pages/room";
import { CreateContest, Start, CreateQuestion } from "@/pages/admin";
import { ProblemDetail } from "@/pages/problem";
import { Ai } from "@/pages/game/ai/ui/page/page";

const App = () => {
  useAuthService();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/game" element={<GameHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setting" element={<Ai />} />
        <Route path="/game/contest" element={<ContestList />} />
        <Route path="/game/contest/:contestId" element={<ContestQuestion />} />
        <Route
          path="/game/contest/ranking/:contestId"
          element={<ContestRanking />}
        />
        <Route
          path="/game/contest/:contestId/code/:problemId"
          element={<Game />}
        />
        <Route path="/admin" element={<Start />} />
        <Route path="/admin/contest" element={<CreateContest />} />
        <Route path="/admin/question" element={<CreateQuestion />} />
        <Route path="/problem/1" element={<ProblemDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
