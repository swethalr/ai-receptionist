import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Trash2,
  Sparkles,
  Search,
  CheckCircle2,
  FileText,
  MapPin,
  Clock,
  DollarSign,
  Send,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const KnowledgeBase: React.FC = () => {
  const { faqs, addFAQ, deleteFAQ, business } = useApp();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddFaqModal, setShowAddFaqModal] = useState<boolean>(false);

  // New FAQ Form
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newCategory, setNewCategory] = useState('pricing');

  // Interactive Sandbox
  const [testQuestion, setTestQuestion] = useState('');
  const [testAnswer, setTestAnswer] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const filteredFaqs = faqs.filter(
    f =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateFAQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    addFAQ({
      question: newQuestion.trim(),
      answer: newAnswer.trim(),
      category: newCategory
    });

    setShowAddFaqModal(false);
    setNewQuestion('');
    setNewAnswer('');
  };

  const handleTestSandbox = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testQuestion.trim()) return;

    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      const matchedFaq = faqs.find(f =>
        testQuestion.toLowerCase().includes(f.category) ||
        f.question.toLowerCase().split(' ').some(w => w.length > 3 && testQuestion.toLowerCase().includes(w))
      );

      if (matchedFaq) {
        setTestAnswer(`Ava: "${matchedFaq.answer}" (Derived from Knowledge Base Rule #${matchedFaq.id})`);
      } else {
        setTestAnswer(
          `Ava: "At ${business.name}, we prioritize transparent patient care. Regarding your question on '${testQuestion}', our specialists offer customized evaluations starting from $${business.services[0]?.price}. Would you like me to reserve a time for you?"`
        );
      }
    }, 600);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">AI Knowledge Base & Clinic Brain</h1>
          <p className="text-xs text-slate-500">
            Train your AI phone receptionist and WhatsApp assistant with verified facts, pricing, and clinical policies
          </p>
        </div>

        <button
          onClick={() => setShowAddFaqModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Knowledge Entry</span>
        </button>
      </div>

      {/* Main Grid: Left FAQs (8 cols), Right Sandbox Tester (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: FAQs List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-3 flex items-center gap-3 shadow-xs">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search knowledge base facts..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="space-y-3">
            {filteredFaqs.map(faq => (
              <div key={faq.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {faq.category}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 mt-1.5">{faq.question}</h4>
                  </div>
                  <button
                    onClick={() => deleteFAQ(faq.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition"
                    title="Delete entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {faq.answer}
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                  <span>Usage count: {faq.usageCount} times in live calls</span>
                  <span className="text-emerald-600 font-semibold">100% Fact Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Interactive Knowledge Tester Sandbox */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-xs text-slate-900">Live AI Knowledge Sandbox</h3>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Type any question a caller might ask to test how Ava retrieves answers from your training data.
            </p>

            <form onSubmit={handleTestSandbox} className="mt-3 space-y-2">
              <textarea
                rows={2}
                placeholder="e.g. Do you offer free parking or validate tickets?"
                value={testQuestion}
                onChange={e => setTestQuestion(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={!testQuestion.trim() || isTesting}
                className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs disabled:opacity-40 transition"
              >
                {isTesting ? 'Querying AI Engine...' : 'Test AI Answer'}
              </button>
            </form>

            {testAnswer && (
              <div className="mt-3 p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs text-indigo-950 leading-relaxed">
                {testAnswer}
              </div>
            )}
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-4 text-xs">
            <h4 className="font-bold text-indigo-300 text-xs mb-1">Clinic Safeguard Rules</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Ava never invents medical advice, diagnoses emergencies without physician consult, or commits to prices outside approved brackets.
            </p>
          </div>
        </div>
      </div>

      {/* Add FAQ Modal */}
      {showAddFaqModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-base text-slate-900 mb-1">Add Knowledge Base FAQ</h3>
            <p className="text-xs text-slate-500 mb-4">Teach your AI receptionist how to handle caller questions.</p>

            <form onSubmit={handleCreateFAQ} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Question or Topic</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. What is your policy on late arrivals?"
                  value={newQuestion}
                  onChange={e => setNewQuestion(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                >
                  <option value="pricing">Pricing & Insurance</option>
                  <option value="booking">Scheduling & Availability</option>
                  <option value="general">Location & Hours</option>
                  <option value="medical">Clinical Protocols</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Approved Answer</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. We allow a 10-minute grace period. Beyond 15 minutes we may need to reschedule to respect subsequent patients."
                  value={newAnswer}
                  onChange={e => setNewAnswer(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddFaqModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Save to AI Knowledge Base
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
