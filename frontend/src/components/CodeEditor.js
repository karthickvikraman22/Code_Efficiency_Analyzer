import React from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, onCodeChange, onEditorMount }) {
    return (
        <Editor
            height="70vh"
            defaultLanguage="java"
            theme="vs-dark"
            value={code}
            options={{
                fontSize: 14,
                minimap: { enabled: true },
                wordWrap: "on",
                roundedSelection: true,
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                formatOnType: true,
                formatOnPaste: true,
                readOnly: false,
                automaticLayout: true,
                quickSuggestions: true,
                folding: true,
            }}
            onMount={onEditorMount}
            onChange={onCodeChange}
        />
    );
}