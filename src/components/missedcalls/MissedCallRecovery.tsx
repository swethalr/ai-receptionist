import React, { useState } from 'react';
import {
  PhoneMissed,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  DollarSign,
  Zap,
  PhoneCall,
  MessageSquare,
  Users,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MissedCallRecovery: React.FC = () => {
  const { callLogs, metrics, triggerMissedCallRecovery, setActiveTab } = useApp();
  const [callerSimName, setCallerSimName] = useState<string>('Elena Rostova');
  const [callerSimPhone, setCallerSimPhone] = useState<string>('+1 (555) 390-8812');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const missedAndRecovered = callLogs.filter(c => c.status === 'missed' || c.status === 'missed_recovered');

  const handleSimulate = () => {
    setIsSimulating(true);
    triggerMissedCallRecovery(callerSimName, callerSimPhone);
    setTimeout(() => {
      setIsSimulating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Value Banner */}
      <div className="bg-gradient-to-r from-amber-900/90 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 border border-amber-500/20 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Core High-Yield Revenue Engine
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
            Missed Call Instant Revenue Recovery
          </h1>

          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            When your staff is busy or away, 67% of callers never leave a voicemail and immediately dial your competitor. RevReception detects missed calls instantly, dispatches a personalized WhatsApp/SMS within 18 seconds, qualifies their needs, and locks the appointment.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-5">
            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <PhoneMissed className="w-4 h-4 text-slate-950" />
              <span>{isSimulating ? 'Simulating 18s Recovery Cycle...' : 'Test 18-Second Missed Call Recovery'}</span>
            </button>

            <button
              onClick={() => setActiveTab('whatsapp')}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white font-semibold text-xs transition"
            >
              <span>View Active WhatsApp Recoveries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Missed Revenue Recovered */}
        <div className="bg-white rounded-xl p-5 border border-emerald-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Missed Revenue Recovered</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 mt-2 font-sans">
            ${metrics.missedRevenueRecovered.toLocaleString()}
          </div>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span className="font-semibold text-emerald-700">64 leads</span> saved from competitors
          </p>
        </div>

        {/* Card 2: Recovery Win Rate */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>AI Recovery Win Rate</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2 font-sans">74.4%</div>
          <p className="text-xs text-slate-500 mt-1">
            {metrics.missedCallsRecovered} of {metrics.missedCalls} missed callers booked
          </p>
        </div>

        {/* Card 3: Avg Response Speed */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>AI Response Velocity</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2 font-sans">18 Secs</div>
          <p className="text-xs text-slate-500 mt-1">
            vs human industry average of 42 mins
          </p>
        </div>

        {/* Card 4: Potential Loss Prevented */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Prevented Competitor Leak</span>
            <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2 font-sans">$84,000+</div>
          <p className="text-xs text-slate-500 mt-1">Projected annual leak without AI</p>
        </div>
      </div>

      {/* Interactive Anatomy of a Missed Call Recovery */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-1">How Missed Call Recovery Works In Real-Time</h3>
        <p className="text-xs text-slate-500 mb-6">Every step executes automatically without requiring front desk intervention:</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Step 01 • Instant</span>
              <h4 className="font-bold text-xs text-slate-900 mt-1">Phone Line Busy / Disconnect</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Platform telecommunication hook detects unanswered call, queries caller ID and checks existing patient status.
              </p>
            </div>
            <div className="mt-3 text-[10px] font-mono text-slate-400">Timestamp: 00:00</div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200/80 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">Step 02 • 18 Seconds</span>
              <h4 className="font-bold text-xs text-slate-900 mt-1">Contextual WhatsApp Dispatched</h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                AI sends warm message: "We noticed we just missed your call! How can our clinical team help you today?"
              </p>
            </div>
            <div className="mt-3 text-[10px] font-mono text-indigo-600 font-semibold">T+18 seconds</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Step 03 • 2 Minutes</span>
              <h4 className="font-bold text-xs text-slate-900 mt-1">AI Lead Qualification</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Customer replies with clinical need. AI identifies procedure, checks doctor schedule, and presents 2 open slots.
              </p>
            </div>
            <div className="mt-3 text-[10px] font-mono text-slate-400">T+2 minutes</div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Step 04 • Conversion</span>
              <h4 className="font-bold text-xs text-slate-900 mt-1">Confirmed & Revenue Attributed</h4>
              <p className="text-[11px] text-slate-700 mt-1 leading-relaxed">
                Patient selects slot, pays consultation deposit, calendar syncs, and revenue is tagged to "AI Recovered".
              </p>
            </div>
            <div className="mt-3 text-[10px] font-mono text-emerald-700 font-bold">+$1,800 Added</div>
          </div>
        </div>
      </div>

      {/* Missed Call Logs & Recovery Status Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Missed Call Recovery Log</h3>
            <p className="text-xs text-slate-500">Real-time telecommunication capture and conversion attribution</p>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
            {missedAndRecovered.length} Total Captured
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="px-5 py-3">Caller Identity</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Detected Intent</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">AI Action Taken</th>
                <th className="px-4 py-3">Attributed Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {missedAndRecovered.map(call => {
                const isRecovered = call.status === 'missed_recovered';
                return (
                  <tr key={call.id} className="hover:bg-slate-50/60 transition">
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-slate-900">{call.callerName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{call.callerNumber}</div>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600">{call.timestamp}</td>
                    <td className="px-4 py-3.5 font-medium text-slate-800">{call.intent}</td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isRecovered
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {isRecovered ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {isRecovered ? 'RECOVERED VIA AI' : 'PENDING RESPONSE'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 max-w-xs truncate">{call.actionTaken}</td>
                    <td className="px-4 py-3.5 font-bold font-sans">
                      {isRecovered ? (
                        <span className="text-emerald-600">+$1,800.00</span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
