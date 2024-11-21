import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import React, { useState, useEffect, useRef } from "react";

interface AceEditorComponentProps {
  initialCode: string;
  language: string;
  onCodeChange: (newCode: string) => void;
  isInputDisabled: boolean;
  isDevilActive: boolean;
}

export const AceEditorComponent: React.FC<AceEditorComponentProps> = ({
  initialCode,
  language,
  onCodeChange,
  isInputDisabled,
  isDevilActive,
}) => {
  const [code, setCode] = useState<string>(initialCode);
  const editorRef = useRef<any>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCodeChange = (newCode: string) => {
    if (!isInputDisabled) {
      setCode(newCode);
      onCodeChange(newCode);
    }
  };

  const getEditorMode = (lang: string) =>
    ["c", "cpp"].includes(lang.toLowerCase()) ? "c_cpp" : lang.toLowerCase();

  const addDevilModeCommands = () => {
    const editor = editorRef.current?.editor;
    if (editor) {
      editor.commands.addCommand({
        name: "devilModeSpace",
        bindKey: { win: "Space", mac: "Space" },
        exec: () => {
          const { selection } = editor;
          const pos = selection.getCursor();
          const currentValue = editor.getValue();

          if (pos.column > 0) {
            const newValue =
              currentValue.slice(
                0,
                editor.session.doc.positionToIndex(pos) - 1,
              ) + currentValue.slice(editor.session.doc.positionToIndex(pos));
            setCode(newValue);
            onCodeChange(newValue);
            selection.moveCursorBy(0, -1);
          }
        },
      });

      editor.commands.addCommand({
        name: "devilModeBackspace",
        bindKey: { win: "Backspace", mac: "Backspace" },
        exec: () => {
          const { selection } = editor;
          const pos = selection.getCursor();
          const currentValue = editor.getValue();
          const newValue = `${currentValue.slice(
            0,
            editor.session.doc.positionToIndex(pos),
          )} ${currentValue.slice(editor.session.doc.positionToIndex(pos))}`;
          setCode(newValue);
          onCodeChange(newValue);
          selection.moveCursorBy(0, 1);
        },
      });
      console.log("Devil 모드 명령 추가됨");
    }
  };

  const removeDevilModeCommands = () => {
    const editor = editorRef.current?.editor;
    if (editor) {
      editor.commands.removeCommand("devilModeSpace");
      editor.commands.removeCommand("devilModeBackspace");
    }
  };

  useEffect(() => {
    if (isDevilActive) {
      console.log("Devil 모드 활성화");
      addDevilModeCommands();

      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }

      // 9.5초 후 Devil 모드 자동 종료
      timeoutRef.current = window.setTimeout(() => {
        removeDevilModeCommands();
        timeoutRef.current = null;
      }, 9500); // 9.5초
    } else {
      removeDevilModeCommands();
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    return () => {
      removeDevilModeCommands();
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isDevilActive]);

  return (
    <AceEditor
      ref={editorRef}
      mode={getEditorMode(language)}
      theme="monokai"
      value={code}
      onChange={handleCodeChange}
      width="100%"
      height="100%"
      fontSize={16}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
      }}
      editorProps={{ $blockScrolling: true }}
      readOnly={isInputDisabled}
    />
  );
};
