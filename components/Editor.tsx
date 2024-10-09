"use client";
import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { codeAtom, languageAtom, outputAtom } from "@/store/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languages } from "@/lib/utils";
import { Button } from "./ui/button";
import { Loader2, PlayIcon } from "lucide-react";
import useCodeActions from "@/hooks/useCodeActions";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

export default function Editor() {
  const [code, setCode] = useRecoilState(codeAtom);
  const setLangId = useSetRecoilState(languageAtom);
  const [language, setLanguage] = useState("cpp");
  const { submitCode } = useCodeActions();
  const output = useRecoilValue(outputAtom);

  const getLanguageId = useCallback((lang: string) => {
    const id = languages.get(lang);
    if (!id) return;
    setLangId(id);
  }, [setLangId]);

  useEffect(() => {
    getLanguageId(language);
  }, [language, getLanguageId]);

  return (
    <div className="h-full">
      <div className="flex justify-between gap-2 items-center px-5 py-2">
        <div className="flex gap-2 items-center">
          <Select
            onValueChange={(value) => setLanguage(value)}
            value={language}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="c">C</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="javascript">Javascript</SelectItem>
              <SelectItem value="typescript">Typescript</SelectItem>
              <SelectItem value="go">Go</SelectItem>
              <SelectItem value="rust">Rust</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          className="flex gap-1 items-center"
          variant={"secondary"}
          onClick={submitCode}
        >
          Run
          {output.status === "loading" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <PlayIcon size={16} />
          )}
        </Button>
      </div>
      <div className="bg-[#202020] px-5 pb-5">
        <p className="font-semibold px-5 py-2 rounded-b-lg shadow-xl dark:bg-black/70 bg-gray-100 w-fit">
          Code
        </p>
      </div>
      <MonacoEditor
        height="100%"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || "")}
        className="max-h-screen"
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
        }}
      />
    </div>
  );
}
