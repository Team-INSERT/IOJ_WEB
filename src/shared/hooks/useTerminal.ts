import { useRef, MutableRefObject, useCallback } from "react";
import { Terminal } from "xterm";
import { useWebSocket } from "./useWebSocket";

interface TerminalProps {
  terminalRef: MutableRefObject<HTMLDivElement | null>;
  inputDisableRef: MutableRefObject<boolean>;
  isProcessFinished: boolean;
  onSubmit: (input: string) => void;
}

export const useTerminal = () => {
  const { disconnectWebSocket } = useWebSocket();
  const terminalInstanceRef = useRef<Terminal | null>(null);
  const inputBufferRef = useRef<string>("");

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

      terminal.onData((data: string) => {
        if (inputDisableRef.current || isProcessFinished) {
          return;
        }

        if (!isProcessFinished) {
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
      terminalInstanceRef.current.writeln(output);
      disconnectWebSocket();
    }
  };

  return {
    initializeTerminal,
    resetAndEnableTerminal,
    writeToTerminal,
  };
};
