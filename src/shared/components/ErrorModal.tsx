import React from "react";
import Modal from "@/shared/components/Modal";

interface ErrorModalProps {
  errorMessage: string;
  onClose: () => void;
}

const ErrorModal = ({ errorMessage, onClose }: ErrorModalProps) => (
    <Modal
      status="나쁨"
      mode="알림"
      title="오류가 발생했습니다."
      subtitle={errorMessage}
      animation
      onClose={onClose}
    />
  );

export default ErrorModal;
