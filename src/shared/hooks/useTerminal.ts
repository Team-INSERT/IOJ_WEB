import { useRef, MutableRefObject } from "react";
import { Terminal } from "xterm";
import { useWebSocket } from "./useWebSocket";

interface TerminalProps {
  terminalRef: MutableRefObject<HTMLDivElement | null>;
  inputDisableRef: MutableRefObject<boolean>;
  isProcessFinished: boolean;
  onSubmit: (input: string) => void;
}

export const useTerminal = () => {
  const { connectWebSocket, clientRef } = useWebSocket();
  const terminalInstanceRef = useRef<Terminal | null>(null);
  const inputBufferRef = useRef<string>("");
  const isTerminalInitialized = useRef(false);
  const isProcessFinishedRef = useRef(false);

  const initializeTerminal = ({
    terminalRef,
    inputDisableRef,
    isProcessFinished,
    onSubmit,
  }: TerminalProps) => {
    if (terminalRef.current && !terminalInstanceRef.current) {
      const terminal = new Terminal({
        cursorBlink: true,
        scrollback: 1000,
        tabStopWidth: 4,
      });
      terminal.open(terminalRef.current);
      terminal.writeln("프로세스가 실행됩니다.");
      terminal.writeln("");

      isProcessFinishedRef.current = isProcessFinished;

      terminal.onData((data: string) => {
        if (inputDisableRef.current || isProcessFinishedRef.current) {
          return;
        }

        if (!isProcessFinishedRef.current) {
          if (data === "\r" || data === "\n") {
            if (inputBufferRef.current.trim() !== "") {
              terminal.writeln("");
              onSubmit(inputBufferRef.current);
              inputBufferRef.current = "";
            }
          } else if (data === "\u007F") {
            if (inputBufferRef.current.length > 0) {
              inputBufferRef.current = inputBufferRef.current.slice(0, -1);
              terminal.write("\b \b");
            }
          } else {
            inputBufferRef.current += data;
            terminal.write(data);
          }
        }
      });

      terminalInstanceRef.current = terminal;
      isTerminalInitialized.current = true;

      if (!clientRef.current) {
        connectWebSocket();
      }
    }
  };

  const resetAndEnableTerminal = ({
    terminalRef,
    inputDisableRef,
    isProcessFinished,
    onSubmit,
  }: TerminalProps) => {
    if (terminalInstanceRef.current) {
      terminalInstanceRef.current.dispose();
      terminalInstanceRef.current = null;
      isTerminalInitialized.current = false;
      isProcessFinishedRef.current = false;
      initializeTerminal({
        terminalRef,
        inputDisableRef,
        isProcessFinished,
        onSubmit,
      });
    }
  };

  const writeToTerminal = (output: string) => {
    if (terminalInstanceRef.current) {
      const lines = output.split("\n");
      lines.forEach((line) => {
        if (line.trim() !== "") {
          terminalInstanceRef.current?.write(`${line}\n\r`);

          if (
            line.includes("Process finished with exit code 0") ||
            line.includes("Process finished with exit code 1")
          ) {
            isProcessFinishedRef.current = true;
          }
        }
      });
    } else {
      console.error("터미널 인스턴스 없음");
    }
  };

  return {
    initializeTerminal,
    resetAndEnableTerminal,
    writeToTerminal,
    isProcessFinishedRef,
  };
};
