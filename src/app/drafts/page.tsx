import { notFound } from "next/navigation";
import DraftsClientPage from "./DraftsClientPage";

export const metadata = {
  title: "AI Composer - KIMX Draft Pipeline",
};

export default function DraftsPage() {
  // Prevent access in production
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-6 md:p-12 font-sans selection:bg-[#38bdf8] selection:text-slate-900">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <header className="space-y-2 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <span className="bg-gradient-to-br from-[#38bdf8] to-[#818cf8] text-transparent bg-clip-text">KIMX AI</span>
            Composer Pipeline
          </h1>
          <p className="text-slate-400 text-sm">
            DEV ONLY: Generates drafts for human editorial review. Does not write to source files.
          </p>
        </header>

        <DraftsClientPage />

      </div>
    </div>
  );
}
