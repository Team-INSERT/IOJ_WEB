import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import React, { useState, useEffect } from "react";

interface AceEditorComponentProps {
  initialCode: string;
  language: string;
  onCodeChange: (newCode: string) => void;
}

export const AceEditorComponent: React.FC<AceEditorComponentProps> = ({
  initialCode,
  language,
  onCodeChange,
}) => {
  const [code, setCode] = useState<string>(initialCode);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange(newCode);
  };

  const getEditorMode = (lang: string) =>
    ["c", "cpp"].includes(lang.toLowerCase()) ? "c_cpp" : lang.toLowerCase();

  return (
    <AceEditor
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
    />
  );
};
