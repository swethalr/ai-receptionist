import React from 'react';
import {
  LayoutDashboard,
  PhoneCall,
  MessageSquare,
  PhoneMissed,
  Inbox,
  Users,
  Calendar,
  GitFork,
  Zap,
  TrendingUp,
  BrainCircuit,
  BookOpen,
  Calculator,
  Settings,
  Wand2,
  ShieldCheck,
  Headphones
} from 'lucide-react';
import { useApp, NavigationTab } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, agencyMode, setAgencyMode, metrics, business } = useApp();

  const navSections: {
    title: string;
    items: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string; badgeColor?: string }[];
  }[] = [
    {
      title: 'Operations',
      items: [
        { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
        { id: 'phone_receptionist', label: 'AI Phone Receptionist', icon: PhoneCall, badge: 'Voice Live', badgeColor: 'bg-emerald-100 text-emerald-800' },
        { id: 'whatsapp', label: 'WhatsApp AI Assistant', icon: MessageSquare, badge: 'Instant', badgeColor: 'bg-green-100 text-green-800' },
        { id: 'missed_calls', label: 'Missed Call Recovery', icon: PhoneMissed, badge: '$48.6K Won', badgeColor: 'bg-amber-100 text-amber-800 font-bold' },
        { id: 'inbox', label: 'Omnichannel Inbox', icon: Inbox, badge: '4' }
      ]
    },
    {
      title: 'Pipeline & Revenue',
      items: [
        { id: 'crm', label: 'Customer CRM & Stages', icon: Users },
        { id: 'calendar', label: 'Appointment Scheduling', icon: Calendar },
        { id: 'automations', label: 'Automation Flow Builder', icon: GitFork },
        { id: 'campaigns', label: 'Reactivation Campaigns', icon: Zap }
      ]
    },
    {
      title: 'Intelligence & Growth',
      items: [
        { id: 'advisor', label: 'AI Growth Advisor', icon: BrainCircuit, badge: 'Insights', badgeColor: 'bg-indigo-100 text-indigo-800' },
        { id: 'knowledge', label: 'Knowledge Base & Training', icon: BookOpen },
        { id: 'roi_calculator', label: 'ROI & Revenue Calculator', icon: Calculator },
        { id: 'wizard', label: 'Setup New Business Type', icon: Wand2 },
        { id: 'settings', label: 'AI Voice & Business Rules', icon: Settings }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0 border-r border-slate-800 select-none min-h-[calc(100vh-53px)]">
      {/* Top Business Context Card */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Business</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-900/60 text-indigo-300 border border-indigo-700/50">
            {business.category.toUpperCase()}
          </span>
        </div>
        <p className="font-bold text-white text-sm mt-1 truncate">{business.name}</p>
        <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
          <Headphones className="w-3 h-3 text-emerald-400" />
          <span>Persona: {business.personality.toUpperCase()}</span>
        </p>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
        {navSections.map((section, idx) => (
          <div key={idx}>
            <div className="px-3 mb-1.5 text-[10px] font-bold tracking-wider uppercase text-slate-400">
              {section.title}
            </div>
            <div className="space-y-0.5">
              {section.items.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-bold whitespace-nowrap ml-1 ${
                          isActive ? 'bg-white/20 text-white' : item.badgeColor || 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Financial ROI Mini-Hud & Agency Switcher */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60 text-xs">
        <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 mb-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>AI Attributed Rev</span>
            <span className="text-emerald-400 font-bold">${metrics.aiAttributedRevenue.toLocaleString()}</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1.5">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '69.6%' }} />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
            <span>Missed Calls Recaptured</span>
            <span className="text-white font-medium">{metrics.missedCallsRecovered} / {metrics.missedCalls} (74%)</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Agency Mode</span>
          </div>
          <button
            onClick={() => setAgencyMode(!agencyMode)}
            className={`w-8 h-4 rounded-full transition-colors relative cursor-pointer ${
              agencyMode ? 'bg-indigo-600' : 'bg-slate-700'
            }`}
          >
            <span
              className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
                agencyMode ? 'right-0.5' : 'left-0.5'
              }`}
            />
          </button>
        </div>
      </div>
    </aside>
  );
};
