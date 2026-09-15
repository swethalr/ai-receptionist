import React, { useState } from 'react';
import {
  Settings,
  Headphones,
  Sliders,
  ShieldCheck,
  Building2,
  Phone,
  MessageSquare,
  CheckCircle2,
  Save,
  Volume2,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { speechManager } from '../../utils/audio';

export const SettingsView: React.FC = () => {
  const { business, setBusiness, agencyMode, setAgencyMode } = useApp();

  const [bizName, setBizName] = useState(business.name);
  const [bizPhone, setBizPhone] = useState(business.phone);
  const [bizWhatsApp, setBizWhatsApp] = useState(business.whatsappNumber);
  const [personality, setPersonality] = useState(business.personality);
  const [greeting, setGreeting] = useState(business.greeting);
  const [speakingSpeed, setSpeakingSpeed] = useState(business.speakingSpeed);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setBusiness({
      ...business,
      name: bizName,
      phone: bizPhone,
      whatsappNumber: bizWhatsApp,
      personality,
      greeting,
      speakingSpeed
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handlePreviewVoice = () => {
    speechManager.speak(greeting, undefined, undefined, speakingSpeed);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">AI Receptionist & Business Rules</h1>
          <p className="text-xs text-slate-500">
            Configure AI voice persona, clinic operating parameters, and telephony routing safeguards
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings Saved Successfully</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: AI Voice Persona & Speed */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-sm text-slate-900">Voice Persona & Speech Tuning</h3>
            </div>
            <button
              type="button"
              onClick={handlePreviewVoice}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Test Voice Audio</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Tone & Communication Persona</label>
              <select
                value={personality}
                onChange={e => setPersonality(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
              >
                <option value="warm">Warm & Empathetic (Best for Healthcare & Wellness)</option>
                <option value="luxury">High-End Luxury (Best for Real Estate & Aesthetics)</option>
                <option value="professional">Direct & Professional (Best for Legal & B2B)</option>
                <option value="urgent">Urgent & Fast-Action (Best for Emergency Services)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Speaking Speed Multiplier ({speakingSpeed}x)
              </label>
              <input
                type="range"
                min="0.8"
                max="1.2"
                step="0.05"
                value={speakingSpeed}
                onChange={e => setSpeakingSpeed(Number(e.target.value))}
                className="w-full accent-indigo-600 mt-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>0.8x (Measured)</span>
                <span>1.0x (Standard)</span>
                <span>1.2x (Brisk)</span>
              </div>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block text-xs mb-1">
              Standard Inbound Phone Greeting
            </label>
            <textarea
              rows={2}
              value={greeting}
              onChange={e => setGreeting(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>
        </div>

        {/* Section 2: Business Coordinates */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building2 className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-sm text-slate-900">Business Profile & Telecom Coordinates</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Business Name</label>
              <input
                type="text"
                value={bizName}
                onChange={e => setBizName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Dedicated Inbound Phone</label>
              <input
                type="text"
                value={bizPhone}
                onChange={e => setBizPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Official WhatsApp Business</label>
              <input
                type="text"
                value={bizWhatsApp}
                onChange={e => setBizWhatsApp(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Safety & Prohibited Phrases */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-sm text-slate-900">Clinical Safeguards & Guardrails</h3>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            The AI is strictly constrained against committing to unapproved medical diagnoses, guaranteeing 100% cure rates, or negotiating fees outside authorized ranges.
          </p>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap gap-2 text-xs">
            {business.prohibitedStatements.map((stmt, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-medium"
              >
                🚫 "{stmt}"
              </span>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Configuration Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
