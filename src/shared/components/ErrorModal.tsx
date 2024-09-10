import React from "react";
import Modal from "@/shared/components/Modal";

interface ErrorModalProps {
  errorCode: string;
  onClose: () => void;
}

const errorMessages: Record<string, string> = {
  "USER-403-1": "요청한 사용자의 권한이 존재하지 않습니다.",
  "USER-403-2": "요청한 사용자의 3학년 권한이 존재하지 않습니다.",
  "USER-403-3": "요청한 사용자의 2학년 권한이 존재하지 않습니다.",
  "USER-403-4": "요청한 사용자의 1학년 권한이 존재하지 않습니다.",
  "USER-404-1": "요청한 사용자가 존재하지 않습니다.",
  "PROBLEM-409-1": "이미 해결된 문제입니다.",
};

const ErrorModal = ({ errorCode, onClose }: ErrorModalProps) => {
  const message = errorMessages[errorCode] || "오류가 발생했습니다.";

  return (
    <Modal
      status="나쁨"
      mode="알림"
      title={message}
      subtitle="대회에 접근할 수 있는 권한이 없습니다."
      animation
      onClose={onClose}
    />
  );
};

export default ErrorModal;
