import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAtom } from "jotai";
import {
  isAlertShowAtom,
  errorMessageAtom,
} from "@/shared/utils/atom/modalAtom";
import { useAuthService } from "@/shared/utils/auth/useAuthService";
import { Main } from "@/pages/main";
import { Game } from "@/pages/game";
import { Waiting } from "@/pages/waiting";
import { Login } from "@/pages/login";
import { Loading } from "@/pages/loading";
import { NotFound } from "@/pages/not-found/Not-found";
import { Prepare } from "@/pages/prepare";
import {
  GameHome,
  GameFind,
  ContestList,
  ContestQuestion,
  ContestRank,
} from "@/pages/room";
import { Result } from "@/pages/result";
import { CreateContest, Start, CreateQuestion } from "@/pages/admin";
import { ProblemDetail, ProblemList } from "@/pages/problem";
import { Ai } from "@/pages/game/ai/ui/page/page";
import { useAxiosInterceptor } from "@/shared/utils/customAxios";
import ErrorModal from "@/shared/components/ErrorModal";

const App = () => {
  useAuthService();
  useAxiosInterceptor();

  const [isAlertShow, setIsAlertShow] = useAtom(isAlertShowAtom);
  const [errorMessage] = useAtom(errorMessageAtom);

  const modalClose = () => {
    setIsAlertShow(false);
    window.location.href = "/login";
  };

  return (
    <>
      {isAlertShow && (
        <ErrorModal errorMessage={errorMessage} onClose={modalClose} />
      )}
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/game" element={<GameHome />} />
          <Route path="/ranking" element={<Prepare />} />
          <Route path="/introduce" element={<Prepare />} />
          <Route path="/guide" element={<Prepare />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setting" element={<Ai />} />
          <Route path="/contest/list" element={<ContestList />} />
          <Route path="/game/contest" element={<ContestList />} />
          <Route
            path="/game/contest/:contestId"
            element={<ContestQuestion />}
          />
          <Route
            path="/game/contest/ranking/:contestId"
            element={<ContestRank />}
          />
          <Route
            path="/game/contest/:contestId/code/:problemId"
            element={<Game />}
          />
          <Route path="/admin" element={<Start />} />
          <Route path="/admin/contest" element={<CreateContest />} />
          <Route path="/admin/question" element={<CreateQuestion />} />
          <Route path="/problem" element={<ProblemList />} />
          <Route path="/problem/:problemId" element={<ProblemDetail />} />
          <Route path="/google/callback" element={<Loading />} />
          <Route path="/game/find" element={<GameFind />} />
          <Route path="/game/waiting/:roomId" element={<Waiting />} />
          <Route path="/game/:roomId/code/:problemId" element={<Game />} />
          <Route path="/game/result/:roomId" element={<Result />} />
          <Route path="/game/:roomId" element={<Game />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
