"use client";

import Editor from "@monaco-editor/react";

import { Language } from "@/lib/mockData";

const languageMap: Record<Language, string> = {
  "C++17": "cpp",
  "Python 3": "python",
  "Java 21": "java",
  "JavaScript": "javascript"
};

export function CodeEditor({
  language,
  value,
  height,
  readOnly = false,
  onChange
}: {
  language: Language;
  value: string;
  height: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded border border-line">
      <Editor
        theme="vs-light"
        language={languageMap[language]}
        value={value}
        height={height}
        onChange={(nextValue) => onChange?.(nextValue ?? "")}
        options={{
          readOnly,
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: 13,
          minimap: { enabled: false },
          automaticLayout: true,
          scrollBeyondLastLine: false
        }}
      />
    </div>
  );
}
