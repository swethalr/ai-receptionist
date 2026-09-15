import React, { useState } from 'react';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ROICalculator: React.FC = () => {
  const { setActiveTab } = useApp();

  const [monthlyInquiries, setMonthlyInquiries] = useState<number>(350);
  const [avgCustomerValue, setAvgCustomerValue] = useState<number>(1450);
  const [missedCallRate, setMissedCallRate] = useState<number>(25); // 25%
  const [currentConversionRate, setCurrentConversionRate] = useState<number>(20); // 20%
  const [receptionistMonthlyCost, setReceptionistMonthlyCost] = useState<number>(4500);

  // Calculations
  const missedCallsCount = Math.round(monthlyInquiries * (missedCallRate / 100));
  const aiRecoveredCalls = Math.round(missedCallsCount * 0.72); // 72% AI recovery rate
  const additionalBookedClients = Math.round(aiRecoveredCalls * 0.45); // 45% of recovered book
  const monthlyRevenueRecovered = additionalBookedClients * avgCustomerValue;

  const staffHoursSaved = Math.round((monthlyInquiries * 8) / 60); // 8 mins per call saved
  const softwareCost = 499; // Growth plan
  const netMonthlyProfit = monthlyRevenueRecovered + (receptionistMonthlyCost * 0.5) - softwareCost;
  const roiMultiplier = Math.round((netMonthlyProfit / softwareCost) * 10) / 10;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">Revenue Recovery & ROI Calculator</h1>
        <p className="text-xs text-slate-500">
          Quantify the exact financial impact of autonomous 24/7 AI voice and WhatsApp lead capture for your business
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Sliders (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <h3 className="font-bold text-sm text-slate-900 pb-3 border-b border-slate-100">
            Your Business Economics
          </h3>

          {/* Slider 1: Monthly Calls / Inquiries */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
              <span>Monthly Inbound Leads & Calls:</span>
              <span className="font-bold text-indigo-600">{monthlyInquiries} inquiries</span>
            </div>
            <input
              type="range"
              min="50"
              max="1500"
              step="25"
              value={monthlyInquiries}
              onChange={e => setMonthlyInquiries(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>50</span>
              <span>750</span>
              <span>1,500+</span>
            </div>
          </div>

          {/* Slider 2: Average Customer Value */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
              <span>Average Client Lifetime / Transaction Value:</span>
              <span className="font-bold text-emerald-600 font-sans">${avgCustomerValue.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="200"
              max="8000"
              step="100"
              value={avgCustomerValue}
              onChange={e => setAvgCustomerValue(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>$200</span>
              <span>$4,000</span>
              <span>$8,000</span>
            </div>
          </div>

          {/* Slider 3: Estimated Missed Calls Rate */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
              <span>Unanswered / Missed Calls Rate (Line Busy/After-Hours):</span>
              <span className="font-bold text-amber-600">{missedCallRate}% of calls</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={missedCallRate}
              onChange={e => setMissedCallRate(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>10% (Low)</span>
              <span>30% (Avg)</span>
              <span>60% (High)</span>
            </div>
          </div>

          {/* Slider 4: Human Front Desk Staff Cost */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
              <span>Current Front Desk Staff Cost:</span>
              <span className="font-bold text-slate-800 font-sans">${receptionistMonthlyCost.toLocaleString()} / mo</span>
            </div>
            <input
              type="range"
              min="2500"
              max="12000"
              step="500"
              value={receptionistMonthlyCost}
              onChange={e => setReceptionistMonthlyCost(Number(e.target.value))}
              className="w-full accent-slate-800 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>$2,500/mo</span>
              <span>$6,000/mo</span>
              <span>$12,000/mo</span>
            </div>
          </div>
        </div>

        {/* Right Column: Calculated ROI Breakdown (6 cols) */}
        <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                Projected Financial Impact
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                {roiMultiplier}x Annual ROI
              </span>
            </div>

            {/* Big Number: Net Revenue Gain */}
            <div className="mt-5">
              <div className="text-xs text-slate-400 font-medium">Estimated Monthly Net Profit Recaptured</div>
              <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 mt-1 font-sans">
                +${netMonthlyProfit.toLocaleString()}
                <span className="text-sm text-slate-400 font-normal"> / month</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Annual projected revenue recapture: <span className="font-bold text-white font-sans">+${(netMonthlyProfit * 12).toLocaleString()}</span>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="space-y-3 mt-6 pt-5 border-t border-slate-800/80 text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-300">Recovered Missed Call Bookings:</span>
                <span className="font-bold text-white">+{additionalBookedClients} clients / mo</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-300">Direct Missed Revenue Recaptured:</span>
                <span className="font-bold text-emerald-400 font-sans">+${monthlyRevenueRecovered.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-300">Front Desk Labor Hours Saved:</span>
                <span className="font-bold text-white">{staffHoursSaved} hours / mo</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-300">RevReception SaaS Investment:</span>
                <span className="font-bold text-slate-400 font-sans">-${softwareCost} / mo</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800">
            <button
              onClick={() => setActiveTab('phone_receptionist')}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-950/40 transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Test AI Voice Receptionist Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
