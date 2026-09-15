import React, { useState } from 'react';
import {
  Zap,
  Play,
  CheckCircle2,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReactivationCampaigns: React.FC = () => {
  const { campaigns, launchReactivationCampaign } = useApp();
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(campaigns[0]?.id || 'camp_1');

  const selectedCampaign = campaigns.find(c => c.id === selectedCampaignId) || campaigns[0];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">1-Click AI Reactivation Campaigns</h1>
          <p className="text-xs text-slate-500">
            Re-engage dormant inquiries, unbooked consultations, and past clients without manual staff outreach
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg shadow-xs">
            Total Campaign Revenue: $38,800
          </span>
        </div>
      </div>

      {/* Campaign Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {campaigns.map(camp => {
          const isSelected = camp.id === selectedCampaign?.id;
          const isDraft = camp.status === 'draft';
          return (
            <div
              key={camp.id}
              onClick={() => setSelectedCampaignId(camp.id)}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-white border-indigo-600 ring-2 ring-indigo-500/10 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      camp.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : camp.status === 'completed'
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {camp.status.toUpperCase()}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 capitalize">{camp.channel}</span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 mt-2">{camp.name}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{camp.description}</p>

                {/* Audience & Conversion Stats */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Audience</div>
                    <div className="font-bold text-slate-800 text-xs mt-0.5">{camp.audienceCount}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Replied</div>
                    <div className="font-bold text-indigo-600 text-xs mt-0.5">{camp.repliedCount}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Booked</div>
                    <div className="font-bold text-emerald-600 text-xs mt-0.5">{camp.bookedCount}</div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Recovered</div>
                  <div className="font-extrabold text-sm text-emerald-600 font-sans">
                    ${camp.revenueRecovered.toLocaleString()}
                  </div>
                </div>

                {isDraft ? (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      launchReactivationCampaign(camp.id);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Launch AI Outreach</span>
                  </button>
                ) : (
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active & Converting
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Campaign Template Preview Box */}
      {selectedCampaign && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-sm text-slate-900">
                Personalized AI Outreach Copy Preview • {selectedCampaign.name}
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Dynamic Merge Fields Enabled</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-mono leading-relaxed max-w-2xl">
            {selectedCampaign.templateCopy}
          </div>

          <p className="text-[11px] text-slate-500 mt-2">
            Each message is dynamically varied by AI to protect your phone number reputation and optimize response rates.
          </p>
        </div>
      )}
    </div>
  );
};
