"use client";

import { useState } from "react";
import { generateArticleDraftAction } from "./actions";
import { StyleGuardIssue } from "@/lib/articles/style-guard";
import { NormalizedArticle } from "@/lib/articles/types";

export default function DraftsClientPage() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState<"professional" | "conversational" | "technical">("professional");
  const [isLoading, setIsLoading] = useState(false);
  const [draft, setDraft] = useState<Partial<NormalizedArticle> | null>(null);
  const [issues, setIssues] = useState<StyleGuardIssue[]>([]);
  const [provider, setProvider] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;

    setIsLoading(true);
    setDraft(null);
    setIssues([]);
    setCopied(false);

    const keywordArray = keywords.split(",").map(k => k.trim()).filter(k => k.length > 0);

    const result = await generateArticleDraftAction({
      topic,
      keywords: keywordArray,
      tone
    });

    if (result.success && result.data) {
      setDraft(result.data.draft);
      setIssues(result.data.issues);
      setProvider(result.data.provider);
    } else {
      alert("Error generating draft.");
    }

    setIsLoading(false);
  };

  const handleCopy = () => {
    if (!draft) return;
    const code = JSON.stringify(draft, null, 2);
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid lg:grid-cols-[350px_1fr] gap-8 items-start">
      
      {/* Input Panel */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 shadow-2xl">
        <h2 className="text-lg font-semibold text-white mb-6">Article Properties</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Topic / Working Title</label>
            <input 
              type="text" 
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. 5 AI tools for business"
              className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Keywords (Comma separated)</label>
            <textarea 
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
              placeholder="ai, business, chatgpt, midjourney"
              className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-100 min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Tone of Voice</label>
            <select 
              value={tone}
              onChange={e => setTone(e.target.value as "professional" | "conversational" | "technical")}
              className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:border-transparent transition-all"
            >
              <option value="professional">Professional & Trustworthy</option>
              <option value="conversational">Conversational & Engaging</option>
              <option value="technical">Technical & Detailed</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-4 bg-[#38bdf8] hover:bg-[#0284c7] disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 font-bold py-3 px-4 rounded-lg transition-all duration-300 transform active:scale-95 flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Generating Draft...
              </>
            ) : "Generate AI Draft"}
          </button>
        </form>
      </div>

      {/* Output Panel */}
      <div className="space-y-6">
        
        {issues.length > 0 && (
          <div className="bg-[#1e1b4b]/50 border border-indigo-500/30 rounded-xl p-5 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-indigo-400 font-semibold mb-3 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              Style Guard Validation
            </h3>
            <ul className="space-y-2 text-sm">
              {issues.map((issue, idx) => (
                <li key={idx} className={`flex items-start gap-2 p-2 rounded-md ${issue.level === 'error' ? 'bg-red-950/40 text-red-300' : 'bg-amber-950/40 text-amber-300'}`}>
                  <span className="font-mono text-xs opacity-70 mt-0.5">[{issue.field}]</span>
                  <span>{issue.message}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {draft ? (
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-[#0b101e]">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-300">Generated TypeScript Object</span>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${provider === 'openai' ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-300'}`}>
                  {provider}
                </span>
              </div>
              <button 
                onClick={handleCopy}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded transition-colors"
              >
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>
            <div className="p-5 overflow-x-auto">
              <pre className="text-sm font-mono text-slate-300 whitespace-pre-wrap">
                <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(JSON.stringify(draft, null, 2)) }} />
              </pre>
            </div>
          </div>
        ) : (
          <div className="h-full min-h-[400px] border border-dashed border-slate-800 rounded-xl flex items-center justify-center text-slate-500 text-sm">
            Configure article properties and generate a draft to see the output here.
          </div>
        )}
      </div>

    </div>
  );
}

// Simple naive syntax highlighter for JSON
function syntaxHighlight(json: string) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      let cls = 'text-blue-400';
      if (/^"/.test(match)) {
          if (/:$/.test(match)) {
              cls = 'text-purple-400';
          } else {
              cls = 'text-green-400';
              // Check for fact check
              if (match.includes('[FACT-CHECK REQUIRED]')) {
                 match = match.replace('[FACT-CHECK REQUIRED]', '<span class="bg-red-500/30 text-red-300 px-1 rounded animate-pulse">[FACT-CHECK REQUIRED]</span>');
              }
          }
      } else if (/true|false/.test(match)) {
          cls = 'text-amber-400';
      } else if (/null/.test(match)) {
          cls = 'text-slate-500';
      }
      return '<span class="' + cls + '">' + match + '</span>';
  });
}
