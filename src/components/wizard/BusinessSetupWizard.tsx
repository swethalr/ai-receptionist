import React, { useState } from 'react';
import {
  Wand2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Building2,
  Headphones,
  Phone,
  MessageSquare,
  Sparkles,
  Calendar,
  DollarSign,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BusinessCategory } from '../../types';
import { BUSINESS_PRESETS } from '../../data/presets';

export const BusinessSetupWizard: React.FC = () => {
  const { switchBusinessCategory, setActiveTab, setIsCallSimulatorOpen } = useApp();

  const [step, setStep] = useState<number>(1);
  const [selectedCat, setSelectedCat] = useState<BusinessCategory>('dental');
  const [receptionistName, setReceptionistName] = useState<string>('Ava');
  const [tone, setTone] = useState<'warm' | 'luxury' | 'professional'>('warm');

  const categories: { id: BusinessCategory; title: string; desc: string }[] = [
    { id: 'dental', title: 'Dental & Aesthetics', desc: 'Emergency tooth pain triage, cosmetic consults, dental insurance qualification' },
    { id: 'real_estate', title: 'Luxury Real Estate', desc: 'Buyer pre-approval screening, property showings, luxury home seller intake' },
    { id: 'cosmetic', title: 'MedSpa & Dermatology', desc: 'Botox/filler inquiries, downtime questions, facial rejuvenation deposits' },
    { id: 'legal', title: 'Trial & Corporate Law', desc: 'Strict conflict-of-interest checks, statute of limitations intake, consultations' },
    { id: 'home_services', title: 'HVAC & Plumbing', desc: '24/7 emergency dispatching, repair quote qualifiers, technician scheduling' },
    { id: 'salon_spa', title: 'High-End Salons & Spas', desc: 'Stylist matching, bridal party bookings, treatment packages' },
    { id: 'auto_dealership', title: 'Luxury Auto Dealership', desc: 'VIP test drives, lease trade-in appraisals, showroom appointments' },
    { id: 'b2b_agency', title: 'B2B Growth Agency', desc: 'Discovery call scheduling, annual marketing budget qualification' }
  ];

  const handleFinish = () => {
    switchBusinessCategory(selectedCat);
    setActiveTab('phone_receptionist');
    setIsCallSimulatorOpen(true);
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">
      {/* Wizard Progress Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
          <span>Step {step} of 4</span>
          <span className="text-indigo-600">
            {step === 1 ? 'Select Industry' : step === 2 ? 'AI Voice Persona' : step === 3 ? 'Services & Pricing' : 'Ready to Launch'}
          </span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Select Industry Category */}
      {step === 1 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Choose Your Business Preset</h2>
            <p className="text-xs text-slate-500">
              Each preset includes pre-configured qualification logic, clinical safeguards, and appointment flows.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categories.map(c => (
              <div
                key={c.id}
                onClick={() => setSelectedCat(c.id)}
                className={`p-4 rounded-xl border transition cursor-pointer ${
                  selectedCat === c.id
                    ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/10 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-900">{c.title}</h4>
                  {selectedCat === c.id && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-3">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition cursor-pointer"
            >
              <span>Continue to Persona</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Voice Persona & Identity */}
      {step === 2 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Define AI Front Desk Identity</h2>
            <p className="text-xs text-slate-500">
              Set how your AI receptionist sounds and interacts when answering inbound callers.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Receptionist Name</label>
              <input
                type="text"
                value={receptionistName}
                onChange={e => setReceptionistName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Communication Style</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'warm', title: 'Warm & Empathetic', desc: 'Welcoming, gentle, and patient' },
                  { id: 'luxury', title: 'High-End Luxury', desc: 'Refined, polished, and exclusive' },
                  { id: 'professional', title: 'Direct & Professional', desc: 'Efficient, clear, and focused' }
                ].map(t => (
                  <div
                    key={t.id}
                    onClick={() => setTone(t.id as any)}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      tone === t.id ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200'
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900">{t.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-3">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition cursor-pointer"
            >
              <span>Next: Services & Rules</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Verified Services & Safeguards */}
      {step === 3 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Pre-Loaded Services & Safeguards</h2>
            <p className="text-xs text-slate-500">
              Loaded automatically from our verified industry benchmark for {selectedCat.toUpperCase()}.
            </p>
          </div>

          <div className="space-y-2">
            {BUSINESS_PRESETS[selectedCat]?.services.map(s => (
              <div key={s.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-slate-900">{s.name}</span>
                  <span className="text-slate-500 ml-2">({s.durationMin} mins)</span>
                </div>
                <span className="font-extrabold text-emerald-600 font-sans">${s.price}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-3">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition cursor-pointer"
            >
              <span>Review & Deploy</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Ready to Launch */}
      {step === 4 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">AI Front Desk Ready for Inbound Calls</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Your autonomous phone receptionist, 18-second missed call recovery engine, and WhatsApp assistant have been configured.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-md mx-auto text-left text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Business Model:</span>
              <span className="font-bold text-slate-900 capitalize">{selectedCat.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">AI Receptionist:</span>
              <span className="font-bold text-indigo-600">{receptionistName} ({tone.toUpperCase()})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Recovery SLA:</span>
              <span className="font-bold text-emerald-600">18 seconds via WhatsApp</span>
            </div>
          </div>

          <button
            onClick={handleFinish}
            className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-100 transition cursor-pointer"
          >
            Launch Interactive Voice Demo Call →
          </button>
        </div>
      )}
    </div>
  );
};
