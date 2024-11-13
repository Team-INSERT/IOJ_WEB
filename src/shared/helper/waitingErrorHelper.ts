import { NavigateFunction } from "react-router-dom";

export const handleError = (
  error: any,
  setErrorMessage: (msg: string) => void,
  navigate: NavigateFunction,
) => {
  const errorCode = error.response?.data?.code;
  const errorMessage = error.response?.data?.message;

  setErrorMessage(errorMessage);

  switch (errorCode) {
    case "ROOM-404-2":
      navigate("/game/find");
      break;
    case "HOST-400-2":
      navigate("/game/host-error");
      break;
    case "ROOM-400-4":
      navigate("/game/start-error");
      break;
    case "HOST-400-1":
      navigate("/game/ready-error");
      break;
    case "USER-404-1":
      navigate("/user/not-found");
      break;
    case "ROOM-400-3":
      navigate("/game/not-ready");
      break;
    case "ROOM-400-7":
      navigate("/game/delete-error");
      break;
    default:
      navigate("/game/find"); // 기본 페이지로 이동
      break;
  }
};
