import React, { useState } from 'react';
import {
  BrainCircuit,
  Sparkles,
  Send,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  HelpCircle,
  Zap,
  Bot
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AIGrowthAdvisorService } from '../../services/aiService';

interface Message {
  sender: 'user' | 'advisor';
  query?: string;
  response?: {
    diagnosis: string;
    causes: string[];
    immediateAction: string;
    projectedImpact: string;
  };
  text?: string;
  time: string;
}

export const AIGrowthAdvisor: React.FC = () => {
  const { metrics, business, setActiveTab } = useApp();
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isThinking, setIsThinking] = useState<boolean>(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'advisor',
      text: `Hello! I am your AI Business Growth Advisor. I continuously analyze your inbound call audio transcripts, WhatsApp chats, conversion bottlenecks, and pricing objections to identify hidden revenue leaks. What would you like to examine today?`,
      time: 'Just now'
    }
  ]);

  const presetQuestions = [
    'How much revenue did AI generate this month?',
    'Where is the biggest bottleneck in our sales pipeline?',
    'What is our most common customer objection?',
    'Which lead source is converting best?',
    'How can we get 10 more appointments next week?'
  ];

  const handleSendQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      query: queryText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    const advice = await AIGrowthAdvisorService.analyzeBusinessQuery(queryText, metrics, business);

    setTimeout(() => {
      setIsThinking(false);
      const advisorMsg: Message = {
        sender: 'advisor',
        response: advice,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, advisorMsg]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-130px)] flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Header */}
      <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-bold shadow-xs">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-slate-900">AI Revenue & Growth Advisor</h2>
            <p className="text-[11px] text-slate-500">
              Autonomous diagnostic engine auditing call logs, objections, and leakages for {business.name}.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-lg">
            ROI Engine Active
          </span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/30">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {m.sender === 'user' ? (
              <div className="max-w-[75%] rounded-2xl px-4 py-2.5 bg-indigo-600 text-white text-xs shadow-xs">
                {m.query}
              </div>
            ) : (
              <div className="max-w-[85%] rounded-2xl px-5 py-4 bg-white border border-slate-200 shadow-xs text-xs space-y-3">
                {m.text && <p className="text-slate-700 leading-relaxed">{m.text}</p>}

                {m.response && (
                  <>
                    <div>
                      <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                        Executive Diagnostic
                      </span>
                      <p className="text-slate-800 font-semibold leading-relaxed">{m.response.diagnosis}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        Underlying Causes Identified
                      </span>
                      <ul className="space-y-1">
                        {m.response.causes.map((c, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-slate-600">
                            <span className="text-indigo-500 font-bold">•</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                          Immediate Recommended Action
                        </span>
                        <p className="text-slate-800 font-bold mt-0.5">{m.response.immediateAction}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Projected Impact</span>
                        <span className="font-extrabold text-sm text-emerald-600 font-sans">
                          {m.response.projectedImpact}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-slate-200 max-w-xs shadow-xs text-xs text-indigo-600 font-medium">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Analyzing pipeline telemetry & calculating ROI...</span>
          </div>
        )}
      </div>

      {/* Quick Prompts Box */}
      <div className="px-4 py-2 bg-white border-t border-slate-100 overflow-x-auto flex items-center gap-2 text-[11px]">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0">
          Suggested Questions:
        </span>
        {presetQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSendQuery(q)}
            className="flex-shrink-0 px-3 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 text-slate-700 font-medium transition cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-white border-t border-slate-200">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendQuery(inputQuery);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            placeholder="Ask anything about revenue, conversion, or bottlenecks..."
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs disabled:opacity-40 transition cursor-pointer"
          >
            Ask Advisor
          </button>
        </form>
      </div>
    </div>
  );
};
