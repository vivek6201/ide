"use client";

import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { useRecoilState, useRecoilValue } from "recoil";
import { inputAtom, outputAtom } from "@/store/store";
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { parseAns } from "@/lib/utils";

export default function ActionTabs() {
  const [input, setInput] = useRecoilState(inputAtom);
  const output = useRecoilValue(outputAtom);

  return (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel
        defaultSize={50}
        minSize={30}
        className="bg-[#202020] my-1 relative"
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center px-5 pb-5">
            <p className="font-semibold px-5 py-2 rounded-b-lg shadow-xl dark:bg-black/70 bg-gray-100 w-fit">
              Input
            </p>
          </div>
          <Textarea
            placeholder="Enter input here..."
            value={input ?? ""}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow resize-none border-none focus-visible:ring-0 w-11/12 mx-auto"
          />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize={50}
        minSize={30}
        className="bg-[#202020] mt-1"
      >
        <div className="px-5 pb-5">
          <p className="font-semibold px-5 py-2 rounded-b-lg shadow-xl dark:bg-black/70 bg-gray-100 w-fit">
            Output
          </p>
        </div>
        <pre className="flex-grow p-2 rounded overflow-auto w-11/12 mx-auto">
          {parseAns(output.value).stdout}
        </pre>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
