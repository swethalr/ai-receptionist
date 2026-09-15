import React, { useState } from 'react';
import {
  PhoneCall,
  PhoneMissed,
  Sparkles,
  Bell,
  MapPin,
  Building2,
  Sliders,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  Layers,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BusinessCategory } from '../../types';

export const Header: React.FC = () => {
  const {
    business,
    switchBusinessCategory,
    activeTab,
    setActiveTab,
    activeLocationId,
    setActiveLocationId,
    agencyMode,
    setAgencyMode,
    setIsCallSimulatorOpen,
    triggerMissedCallRecovery,
    notifications,
    markNotificationRead
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showBizDropdown, setShowBizDropdown] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const categories: { id: BusinessCategory; label: string }[] = [
    { id: 'dental', label: 'Dental & Aesthetics' },
    { id: 'real_estate', label: 'Luxury Real Estate' },
    { id: 'cosmetic', label: 'MedSpa & Dermatology' },
    { id: 'legal', label: 'Corporate & Trial Law' },
    { id: 'home_services', label: 'HVAC & Home Services' },
    { id: 'medical', label: 'Orthopedic & Medical' },
    { id: 'salon_spa', label: 'Salons & Day Spas' },
    { id: 'auto_dealership', label: 'Luxury Auto Dealership' },
    { id: 'b2b_agency', label: 'B2B Growth Agency' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-xs">
      {/* Left: Brand & Business Switcher */}
      <div className="flex items-center gap-3 md:gap-5">
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => setActiveTab('dashboard')}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-100">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-900 tracking-tight text-lg leading-none font-sans">
                RevReception
              </span>
              {agencyMode ? (
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                  Agency Whitelabel
                </span>
              ) : (
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live AI Voice
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">AI Front Desk & Revenue Engine</p>
          </div>
        </div>

        {/* Business Preset Switcher */}
        <div className="relative hidden lg:block">
          <button
            onClick={() => setShowBizDropdown(!showBizDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 transition-colors text-xs font-semibold text-slate-700"
          >
            <Building2 className="w-3.5 h-3.5 text-indigo-600" />
            <span className="max-w-[180px] truncate">{business.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showBizDropdown && (
            <div className="absolute left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
              <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Switch Target Business Preset
              </div>
              <div className="max-h-72 overflow-y-auto py-1">
                {categories.map(c => (
                  <button
                    key={c.id}
                    onClick={() => {
                      switchBusinessCategory(c.id);
                      setShowBizDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${
                      business.category === c.id ? 'bg-indigo-50/70 text-indigo-600 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <span>{c.label}</span>
                    {business.category === c.id && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                  </button>
                ))}
              </div>
              <div className="p-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setShowBizDropdown(false);
                    setActiveTab('wizard');
                  }}
                  className="w-full text-center py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                >
                  + Run Setup Wizard for New Business
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Location Selector */}
        {business.locations.length > 1 && (
          <div className="hidden xl:flex items-center gap-1 text-xs text-slate-600 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={activeLocationId}
              onChange={e => setActiveLocationId(e.target.value)}
              className="bg-transparent border-none text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
            >
              {business.locations.map(l => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Right: Quick Action Buttons & Status */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Live System Status Pill */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-medium text-emerald-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>AI Receptionist Online</span>
        </div>

        {/* Action: Simulate Missed Call Recovery */}
        <button
          onClick={() => triggerMissedCallRecovery('Marcus Sterling', '+1 (555) 234-8891')}
          title="Simulate a caller hanging up to test the instant 18-second WhatsApp recovery workflow"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-semibold text-xs transition active:scale-95 cursor-pointer"
        >
          <PhoneMissed className="w-3.5 h-3.5 text-amber-600" />
          <span className="hidden sm:inline">Simulate Missed Call</span>
        </button>

        {/* Action: Test Live Phone Call */}
        <button
          onClick={() => setIsCallSimulatorOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm shadow-indigo-200 transition active:scale-95 cursor-pointer"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Call AI Receptionist</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-slate-900">Smart Priority Notifications</span>
                  <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-1.5 rounded">
                    Zero Spam
                  </span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  Close
                </button>
              </div>

              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-1">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`py-2.5 px-2 rounded-lg cursor-pointer transition text-xs ${
                      n.read ? 'opacity-60 hover:bg-slate-50' : 'bg-indigo-50/40 hover:bg-indigo-50/70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] mt-0.5">{n.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 mt-2 border-t border-slate-100 flex justify-between items-center text-[11px]">
                <span className="text-slate-400">Escalations auto-route to on-call staff</span>
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    setActiveTab('inbox');
                  }}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  View All in Inbox →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Landing Page & Whitelabel Switcher */}
        <div className="flex items-center gap-1 pl-1 border-l border-slate-200">
          <button
            onClick={() => setActiveTab(activeTab === 'landing_page' ? 'dashboard' : 'landing_page')}
            title="Toggle Public SaaS Landing Page view vs App Dashboard"
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'landing_page'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {activeTab === 'landing_page' ? 'Dashboard' : 'Landing Page'}
          </button>
        </div>
      </div>
    </header>
  );
};
