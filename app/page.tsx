import ClientEditorLayout from "@/components/ClientEditorLayout";
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <div className="h-screen">
      <Navbar/>
      <ClientEditorLayout/>
    </div>
  );
}
