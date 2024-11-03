import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAtom } from "jotai";
import {
  isAlertShowAtom,
  errorMessageAtom,
} from "@/shared/utils/atom/modalAtom";
import { useAuthService } from "@/shared/utils/auth/useAuthService";
import { Main } from "@/pages/main";
import { Game } from "@/pages/game";
<<<<<<< HEAD
import { Result } from "@/pages/result";
=======
import { Waiting } from "@/pages/waiting";
>>>>>>> da6b507d52523db173d4870fa07e376900b1d16c
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
<<<<<<< HEAD
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
        <Route path="/problem" element={<ProblemList />} />
        <Route path="/problem/:problemId" element={<ProblemDetail />} />
        <Route path="/game/result" element={<Result />} />
        <Route path="/google/callback" element={<Loading />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
=======
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
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
>>>>>>> da6b507d52523db173d4870fa07e376900b1d16c
  );
};

export default App;
