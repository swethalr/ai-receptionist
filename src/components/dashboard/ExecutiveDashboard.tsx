import React from 'react';
import {
  DollarSign,
  TrendingUp,
  Sparkles,
  PhoneMissed,
  AlertTriangle,
  Calendar,
  Users,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  ArrowRight,
  Activity,
  Bot
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ExecutiveDashboard: React.FC = () => {
  const { metrics, insights, setActiveTab, setIsCallSimulatorOpen, triggerMissedCallRecovery, business } = useApp();

  return (
    <div className="space-y-6">
      {/* Top Welcome & KPI Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
            Revenue & Executive Intelligence
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Active Front Desk: <span className="font-semibold text-slate-800">{business.name}</span> • 24/7 AI Autonomous Operation
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCallSimulatorOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Test Voice AI Receptionist</span>
          </button>

          <button
            onClick={() => setActiveTab('advisor')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-xs transition cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5 text-indigo-600" />
            <span>Ask Growth Advisor</span>
          </button>
        </div>
      </div>

      {/* Primary Financial Attribution Cards (The Core Focus on Money) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: AI-Generated Revenue */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 border border-indigo-700/40 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              AI-Generated Revenue
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/30 flex items-center justify-center text-indigo-300">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          <div className="text-3xl sm:text-4xl font-extrabold text-white mt-3 font-sans">
            ${metrics.aiAttributedRevenue.toLocaleString()}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-indigo-200 mt-2">
            <span className="font-bold text-emerald-400">69.6%</span>
            <span>of total gross clinic revenue ($184,500)</span>
          </div>

          <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden mt-4">
            <div className="bg-indigo-400 h-full rounded-full" style={{ width: '69.6%' }} />
          </div>

          <p className="text-[11px] text-slate-400 mt-2">
            Zero staff labor required. Direct phone + WhatsApp bookings.
          </p>
        </div>

        {/* Card 2: Revenue Recovered */}
        <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Revenue Recovered
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>

          <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 mt-3 font-sans">
            ${metrics.missedRevenueRecovered.toLocaleString()}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-2">
            <span className="font-bold text-emerald-700">64 Missed Calls Recaptured</span>
            <span>(74.4% win rate)</span>
          </div>

          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-4">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '74.4%' }} />
          </div>

          <p className="text-[11px] text-slate-500 mt-2">
            Average 18s response time prevented local competitor leak.
          </p>
        </div>

        {/* Card 3: Potential Revenue At Risk */}
        <div className="bg-white rounded-2xl p-6 border border-amber-200 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Potential Revenue At Risk
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>

          <div className="text-3xl sm:text-4xl font-extrabold text-amber-600 mt-3 font-sans">
            ${metrics.potentialRevenueAtRisk.toLocaleString()}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-2">
            <span className="font-bold text-amber-700">18 Uncontacted Follow-ups</span>
            <span>from past 7 days</span>
          </div>

          <div className="mt-4">
            <button
              onClick={() => setActiveTab('campaigns')}
              className="w-full text-center py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-200 transition cursor-pointer"
            >
              Trigger 1-Click AI Follow-Up Sequence →
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Operational Metrics Bar (8 Key Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="bg-white rounded-xl p-3 border border-slate-200">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Leads</div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">{metrics.totalLeads}</div>
          <div className="text-[10px] text-emerald-600 font-medium">+28 this week</div>
        </div>

        <div className="bg-white rounded-xl p-3 border border-slate-200">
          <div className="text-[10px] uppercase font-bold text-slate-400">Hot Leads</div>
          <div className="text-xl font-extrabold text-rose-600 mt-1">{metrics.hotLeads}</div>
          <div className="text-[10px] text-slate-500">Score &gt; 80/100</div>
        </div>

        <div className="bg-white rounded-xl p-3 border border-slate-200">
          <div className="text-[10px] uppercase font-bold text-slate-400">Appointments</div>
          <div className="text-xl font-extrabold text-indigo-600 mt-1">{metrics.appointmentsBooked}</div>
          <div className="text-[10px] text-slate-500">89% AI Booked</div>
        </div>

        <div className="bg-white rounded-xl p-3 border border-slate-200">
          <div className="text-[10px] uppercase font-bold text-slate-400">Conversion Rate</div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">{metrics.conversionRate}%</div>
          <div className="text-[10px] text-emerald-600 font-medium">+4.2% vs human</div>
        </div>

        <div className="bg-white rounded-xl p-3 border border-slate-200">
          <div className="text-[10px] uppercase font-bold text-slate-400">Avg Client Value</div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">${metrics.avgCustomerValue}</div>
          <div className="text-[10px] text-slate-500">Per consult</div>
        </div>

        <div className="bg-white rounded-xl p-3 border border-slate-200">
          <div className="text-[10px] uppercase font-bold text-slate-400">Response Speed</div>
          <div className="text-xl font-extrabold text-emerald-600 mt-1">{metrics.avgResponseTimeSec}s</div>
          <div className="text-[10px] text-slate-500">Industry: 42 mins</div>
        </div>

        <div className="bg-white rounded-xl p-3 border border-slate-200">
          <div className="text-[10px] uppercase font-bold text-slate-400">No-Show Rate</div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">{metrics.noShowRate}%</div>
          <div className="text-[10px] text-emerald-600 font-medium">-14% with SMS</div>
        </div>

        <div className="bg-white rounded-xl p-3 border border-slate-200">
          <div className="text-[10px] uppercase font-bold text-slate-400">AI Quality Score</div>
          <div className="text-xl font-extrabold text-indigo-600 mt-1">{metrics.qualityScore.overall}%</div>
          <div className="text-[10px] text-slate-500">98.2% accuracy</div>
        </div>
      </div>

      {/* Middle Grid: Conversion Funnel & Lead Source Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Lead Conversion Funnel (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-slate-900">End-to-End Revenue Conversion Funnel</h3>
              <p className="text-xs text-slate-500">Capture → Qualify → Schedule → Win</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              33.0% Overall Win Rate
            </span>
          </div>

          {/* Visual Funnel Bars */}
          <div className="space-y-3 mt-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>1. Inbound Leads Captured</span>
                <span className="font-bold text-slate-900">418 Leads (100%)</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-slate-700 h-full rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>2. AI Contacted & Engaged (&lt; 30s)</span>
                <span className="font-bold text-slate-900">412 Engaged (98.5%)</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: '98.5%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>3. Clinically Qualified (Score &gt; 60)</span>
                <span className="font-bold text-slate-900">294 Qualified (70.3%)</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-violet-600 h-full rounded-full" style={{ width: '70.3%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>4. Appointments Booked into Calendar</span>
                <span className="font-bold text-slate-900">186 Booked (44.5%)</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-teal-500 h-full rounded-full" style={{ width: '44.5%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>5. Attended & Revenue Won</span>
                <span className="font-bold text-emerald-700">138 Paying Patients ($184.5K)</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '33.0%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Channel Attribution & AI vs Human (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">Channel Attribution</h3>
              <span className="text-xs text-slate-400">By Revenue</span>
            </div>

            <div className="space-y-2.5 mt-3 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-green-50/60 border border-green-200/60">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="font-bold text-slate-900">WhatsApp AI Assistant</span>
                </div>
                <span className="font-extrabold text-emerald-700">$78,400 (42%)</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-indigo-50/60 border border-indigo-200/60">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                  <span className="font-bold text-slate-900">AI Phone Receptionist</span>
                </div>
                <span className="font-extrabold text-indigo-700">$50,000 (27%)</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  <span className="font-bold text-slate-900">Google Business Profile</span>
                </div>
                <span className="font-bold text-slate-700">$32,100 (17%)</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="font-bold text-slate-900">Website Smile Quiz & Forms</span>
                </div>
                <span className="font-bold text-slate-700">$24,000 (14%)</span>
              </div>
            </div>
          </div>

          {/* AI vs Human Speed Comparison Box */}
          <div className="mt-4 p-3 bg-slate-900 text-white rounded-xl text-xs">
            <div className="flex items-center justify-between text-indigo-300 font-bold text-[11px] mb-2">
              <span>AI VS HUMAN BENCHMARK</span>
              <span className="text-emerald-400">180x FASTER</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-400">AI Front Desk:</span>
                <div className="font-bold text-white">14s Avg Response</div>
                <div className="text-slate-400 text-[10px]">24/7/365 Coverage</div>
              </div>
              <div>
                <span className="text-slate-400">Manual Staff:</span>
                <div className="font-bold text-rose-300">42m Avg Response</div>
                <div className="text-slate-400 text-[10px]">Office Hours Only</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Actionable AI Growth Insights */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-sm text-slate-900">Actionable AI Growth Insights & Leakage Warnings</h3>
          </div>
          <button
            onClick={() => setActiveTab('advisor')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            Explore AI Growth Advisor →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {insights.map(ins => (
            <div
              key={ins.id}
              className={`p-4 rounded-xl border flex flex-col justify-between ${
                ins.type === 'opportunity'
                  ? 'bg-indigo-50/40 border-indigo-200'
                  : ins.type === 'warning'
                  ? 'bg-amber-50/40 border-amber-200'
                  : ins.type === 'win'
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span
                    className={`uppercase tracking-wider ${
                      ins.type === 'opportunity'
                        ? 'text-indigo-700'
                        : ins.type === 'warning'
                        ? 'text-amber-700'
                        : ins.type === 'win'
                        ? 'text-emerald-700'
                        : 'text-slate-700'
                    }`}
                  >
                    {ins.type}
                  </span>
                  <span className="font-extrabold font-sans">
                    +${ins.financialImpact.toLocaleString()}
                  </span>
                </div>

                <h4 className="font-bold text-xs text-slate-900 mt-1.5">{ins.title}</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{ins.description}</p>
              </div>

              <button
                onClick={() => {
                  if (ins.actionRoute === 'campaigns') setActiveTab('campaigns');
                  else if (ins.actionRoute === 'calls') setActiveTab('missed_calls');
                  else if (ins.actionRoute === 'settings') setActiveTab('settings');
                  else setActiveTab('advisor');
                }}
                className="mt-3 text-left text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <span>{ins.actionText}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
