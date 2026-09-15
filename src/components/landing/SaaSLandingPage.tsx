import React from 'react';
import {
  Sparkles,
  Phone,
  MessageSquare,
  PhoneMissed,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  DollarSign,
  Clock,
  Star,
  Users,
  Activity
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SaaSLandingPage: React.FC = () => {
  const { setActiveTab, setIsCallSimulatorOpen, triggerMissedCallRecovery } = useApp();

  const pricingTiers = [
    {
      name: 'Starter Front Desk',
      price: 199,
      period: '/month',
      desc: 'Ideal for solo practitioners and boutique local clinics needing reliable after-hours coverage.',
      features: [
        'AI Voice Receptionist (300 mins/mo)',
        'Instant WhatsApp Inbound Assistant',
        'Missed Call Recovery (T+30s)',
        'Calendar Sync (Google & Outlook)',
        'Standard Business Safeguards'
      ],
      cta: 'Start 14-Day Free Trial',
      highlighted: false
    },
    {
      name: 'Growth Revenue Engine',
      price: 499,
      period: '/month',
      desc: 'Our most popular tier. High-volume autonomous intake, 18-second recovery, and CRM pipeline.',
      features: [
        'Unlimited AI Voice Inbound Minutes',
        'Instant 18-Second Missed Call Recovery',
        'Omnichannel Unified Inbox (Phone + WhatsApp)',
        'Autonomous Multi-Staff Scheduling',
        '1-Click AI Reactivation Campaigns',
        'AI Growth Advisor Diagnostics',
        'HIPAA / Strict Data Compliance'
      ],
      cta: 'Claim Your Growth Setup',
      badge: 'MOST POPULAR • 14.8X ROI',
      highlighted: true
    },
    {
      name: 'Multi-Location Pro',
      price: 899,
      period: '/month',
      desc: 'For multi-location medical centers, law firms, and high-volume real estate brokerages.',
      features: [
        'Everything in Growth Engine',
        'Up to 5 Business Locations & 25 Providers',
        'Custom Voice Persona & Cloned Voice',
        'Bespoke Clinical / Legal Triage Logic',
        'Dedicated VIP Account Engineer',
        'Two-Way EHR / PMS Deep API Sync'
      ],
      cta: 'Book Enterprise Consultation',
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Hero Section */}
      <div className="relative pt-12 pb-20 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950 border border-indigo-700/60 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>The Enterprise AI Front Desk & Revenue Engine</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
            Your AI Receptionist That <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-emerald-400 bg-clip-text text-transparent">
              Never Misses a Single Lead.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Answer every inbound call in under 900ms. Respond immediately on WhatsApp. Recover missed callers within 18 seconds, qualify intent, and lock appointments into your calendar 24/7/365.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setActiveTab('phone_receptionist');
                setIsCallSimulatorOpen(true);
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Test Live Voice Receptionist Demo</span>
            </button>

            <button
              onClick={() => setActiveTab('roi_calculator')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Calculate Your Business ROI</span>
            </button>
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left max-w-3xl mx-auto pt-8 border-t border-slate-800">
            <div>
              <div className="text-2xl font-extrabold text-white font-sans">&lt; 900ms</div>
              <div className="text-xs text-slate-400 mt-0.5">Voice Latency SLA</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-emerald-400 font-sans">18 Secs</div>
              <div className="text-xs text-slate-400 mt-0.5">Missed Call Recovery</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white font-sans">74.4%</div>
              <div className="text-xs text-slate-400 mt-0.5">Missed Lead Win Rate</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-indigo-400 font-sans">24/7/365</div>
              <div className="text-xs text-slate-400 mt-0.5">Zero Sick Days or Burnout</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Feature Demo Showcase */}
      <div className="py-16 bg-slate-950 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              Not a Chatbot. An Autonomous Front Desk Coordinator.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Trained on hundreds of thousands of medical, legal, and luxury service customer conversations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white">AI Voice Phone Receptionist</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Natural human cadence with polite interruptions, empathy for caller pain, symptom triage safeguards, and automatic calendar slot reservations.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveTab('phone_receptionist');
                  setIsCallSimulatorOpen(true);
                }}
                className="mt-6 text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
              >
                <span>Experience live call</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center mb-4">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white">WhatsApp Sales Assistant</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Engages leads immediately on WhatsApp. Answers detailed procedure questions, clarifies insurance brackets, and sends instant confirmation links.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('whatsapp')}
                className="mt-6 text-xs font-bold text-green-400 hover:text-green-300 flex items-center gap-1 cursor-pointer"
              >
                <span>View WhatsApp assistant</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                  <PhoneMissed className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white">18-Second Missed Call Rescue</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Recovers lost callers before they dial a competing practice. Recaptured over $48,600 in lost revenue in the last 30 days alone.
                </p>
              </div>
              <button
                onClick={() => triggerMissedCallRecovery('Marcus Sterling', '+1 (555) 234-8891')}
                className="mt-6 text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
              >
                <span>Simulate instant rescue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
            Transparent, Predictable Investment
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            One extra booked high-value appointment pays for an entire year of RevReception.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-7 flex flex-col justify-between border ${
                tier.highlighted
                  ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/20 shadow-2xl relative'
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div>
                {tier.badge && (
                  <span className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full bg-indigo-500 text-white inline-block mb-3">
                    {tier.badge}
                  </span>
                )}

                <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{tier.desc}</p>

                <div className="mt-5 pb-5 border-b border-slate-800">
                  <span className="text-4xl font-black text-white font-sans">${tier.price}</span>
                  <span className="text-xs text-slate-400 font-medium">{tier.period}</span>
                </div>

                <div className="mt-5 space-y-2.5 text-xs text-slate-300">
                  {tier.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition cursor-pointer ${
                    tier.highlighted
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
