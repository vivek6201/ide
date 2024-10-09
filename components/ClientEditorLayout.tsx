"use client";
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Editor from "@/components/Editor";
import ActionTabs from "@/components/ActionTabs";
import { useEffect, useState } from "react";

export default function ClientEditorLayout() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="h-[calc(100vh-64px)] bg-background text-foreground max-h-screen">
        <Tabs defaultValue="editor" className="flex flex-col h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>
          <TabsContent value="editor" className="flex-grow">
            <Editor />
          </TabsContent>
          <TabsContent value="actions" className="flex-grow">
            <ActionTabs />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] bg-background text-foreground">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={70} minSize={50}>
          <Editor />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={30} minSize={30}>
          <ActionTabs />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
