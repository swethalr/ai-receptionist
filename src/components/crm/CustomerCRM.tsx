import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Phone,
  MessageSquare,
  Calendar,
  Sparkles,
  ChevronRight,
  Clock,
  DollarSign,
  Tag,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LeadCustomer, LeadStage } from '../../types';

export const CustomerCRM: React.FC = () => {
  const { leads, updateLeadStage, updateLeadScore, addLead, business, activeLocationId } = useApp();

  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(leads[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'pipeline' | 'list'>('pipeline');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [showAddLeadModal, setShowAddLeadModal] = useState<boolean>(false);

  // New Lead Form State
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadService, setNewLeadService] = useState(business.services[0]?.name || 'Consultation');
  const [newLeadValue, setNewLeadValue] = useState(1500);

  const stages: { id: LeadStage; label: string; color: string }[] = [
    { id: 'new', label: 'New Lead', color: 'bg-slate-100 text-slate-700 border-slate-200' },
    { id: 'contacted', label: 'Contacted', color: 'bg-sky-50 text-sky-700 border-sky-200' },
    { id: 'qualified', label: 'Qualified', color: 'bg-violet-50 text-violet-700 border-violet-200' },
    { id: 'appointment_booked', label: 'Booked', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { id: 'attended', label: 'Attended', color: 'bg-teal-50 text-teal-700 border-teal-200' },
    { id: 'won', label: 'Won', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'lost', label: 'Lost', color: 'bg-rose-50 text-rose-700 border-rose-200' },
    { id: 're_engagement', label: 'Re-engagement', color: 'bg-amber-50 text-amber-700 border-amber-200' }
  ];

  const selectedLead = leads.find(l => l.id === selectedLeadId) || leads[0];

  const filteredLeads = leads.filter(l => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      l.intent.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = stageFilter === 'all' || l.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim() || !newLeadPhone.trim()) return;

    const lead = addLead({
      name: newLeadName.trim(),
      phone: newLeadPhone.trim(),
      email: newLeadEmail.trim() || `${newLeadName.toLowerCase().replace(' ', '.')}@example.com`,
      channel: 'phone',
      source: 'Direct Receptionist Intake',
      leadScore: 75,
      stage: 'new',
      intent: newLeadService,
      urgency: 'medium',
      estimatedValue: Number(newLeadValue) || 1500,
      tags: ['Manual Intake', 'AI Qualified'],
      notes: `Direct intake recorded. Automated WhatsApp confirmation and qualification sent.`,
      lastInteraction: 'Just now',
      missedCallRecovered: false,
      attributedToAI: true,
      aiSummary: `New intake for ${newLeadService}. Scheduled for AI follow-up sequence.`,
      conversationHistoryCount: 1,
      locationId: activeLocationId
    });

    setSelectedLeadId(lead.id);
    setShowAddLeadModal(false);
    setNewLeadName('');
    setNewLeadPhone('');
    setNewLeadEmail('');
  };

  const getScoreBadge = (score: number) => {
    if (score >= 81) return { label: '🔥 HOT LEAD', class: 'bg-rose-100 text-rose-800 border-rose-200' };
    if (score >= 61) return { label: '⚡ HIGH INTENT', class: 'bg-amber-100 text-amber-800 border-amber-200' };
    if (score >= 31) return { label: '☀️ WARM', class: 'bg-sky-100 text-sky-800 border-sky-200' };
    return { label: '❄️ LOW INTENT', class: 'bg-slate-100 text-slate-600 border-slate-200' };
  };

  return (
    <div className="space-y-5">
      {/* Top Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Patient & Client CRM Pipeline</h1>
          <p className="text-xs text-slate-500">Autonomous lead scoring, qualification stages, and revenue attribution</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setViewMode('pipeline')}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                viewMode === 'pipeline' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kanban Pipeline
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              List View
            </button>
          </div>

          <button
            onClick={() => setShowAddLeadModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Lead</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search leads by name, phone, or service intent..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
          />
        </div>

        <select
          value={stageFilter}
          onChange={e => setStageFilter(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 focus:outline-none cursor-pointer"
        >
          <option value="all">All Pipeline Stages</option>
          {stages.map(s => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Main Content Area */}
      {viewMode === 'pipeline' ? (
        /* Kanban Board View */
        <div className="flex gap-4 overflow-x-auto pb-4 min-h-[520px]">
          {stages.map(stage => {
            const stageLeads = filteredLeads.filter(l => l.stage === stage.id);
            return (
              <div
                key={stage.id}
                className="w-72 flex-shrink-0 bg-slate-50/70 rounded-xl border border-slate-200 p-3 flex flex-col"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-800">{stage.label}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-white border border-slate-200 text-slate-600">
                      {stageLeads.length}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 font-sans">
                    ${stageLeads.reduce((acc, curr) => acc + curr.estimatedValue, 0).toLocaleString()}
                  </span>
                </div>

                {/* Cards in Column */}
                <div className="space-y-2.5 flex-1 overflow-y-auto">
                  {stageLeads.map(lead => {
                    const scoreBadge = getScoreBadge(lead.leadScore);
                    const isSelected = lead.id === selectedLead?.id;
                    return (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLeadId(lead.id)}
                        className={`p-3.5 bg-white rounded-xl border transition-all cursor-pointer shadow-2xs hover:shadow-xs ${
                          isSelected ? 'border-indigo-600 ring-2 ring-indigo-500/10' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <h4 className="font-bold text-xs text-slate-900">{lead.name}</h4>
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${scoreBadge.class}`}>
                            {scoreBadge.label}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-600 mt-1 font-medium truncate">{lead.intent}</p>

                        <div className="flex items-center justify-between text-[11px] mt-2.5 pt-2 border-t border-slate-100">
                          <span className="font-bold text-emerald-600 font-sans">
                            ${lead.estimatedValue.toLocaleString()}
                          </span>
                          <span className="text-slate-400 text-[10px] capitalize flex items-center gap-1">
                            {lead.channel === 'whatsapp' ? <MessageSquare className="w-3 h-3 text-green-600" /> : <Phone className="w-3 h-3 text-indigo-600" />}
                            {lead.channel}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List Table View */
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Lead Score</th>
                <th className="px-4 py-3">Stage</th>
                <th className="px-4 py-3">Service Intent</th>
                <th className="px-4 py-3">Est. Value</th>
                <th className="px-4 py-3">Next Follow-Up</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map(l => {
                const scoreBadge = getScoreBadge(l.leadScore);
                return (
                  <tr
                    key={l.id}
                    onClick={() => setSelectedLeadId(l.id)}
                    className={`cursor-pointer hover:bg-slate-50/60 transition ${
                      l.id === selectedLead?.id ? 'bg-indigo-50/30' : ''
                    }`}
                  >
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900">{l.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{l.phone}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${scoreBadge.class}`}>
                        {l.leadScore}/100 • {scoreBadge.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-[11px] font-semibold text-slate-700 capitalize">
                        {l.stage.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-700 font-medium">{l.intent}</td>
                    <td className="px-4 py-3.5 font-bold text-emerald-600 font-sans">${l.estimatedValue}</td>
                    <td className="px-4 py-3.5 text-[11px] text-slate-500">{l.nextFollowUp || 'None'}</td>
                    <td className="px-4 py-3.5 text-right">
                      <ChevronRight className="w-4 h-4 text-slate-400 inline" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Selected Lead Detail Drawer / Card */}
      {selectedLead && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-extrabold flex items-center justify-center text-base shadow-sm">
                {selectedLead.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-slate-900">{selectedLead.name}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getScoreBadge(selectedLead.leadScore).class}`}>
                    Score {selectedLead.leadScore}/100
                  </span>
                  {selectedLead.missedCallRecovered && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      Recovered Missed Call
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedLead.phone} • {selectedLead.email} • Source: {selectedLead.source}
                </p>
              </div>
            </div>

            {/* Quick Stage Mover */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Move Stage:</span>
              <select
                value={selectedLead.stage}
                onChange={e => updateLeadStage(selectedLead.id, e.target.value as LeadStage)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                {stages.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4 text-xs">
            {/* AI Summary & Clinical Intelligence */}
            <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100">
              <div className="flex items-center gap-1.5 font-bold text-indigo-900 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>AI Clinical & Sales Summary</span>
              </div>
              <p className="text-indigo-950 leading-relaxed text-[11px] mt-1.5">{selectedLead.aiSummary}</p>
              <div className="mt-3 text-[10px] text-indigo-700 font-semibold">
                Urgency Level: <span className="uppercase">{selectedLead.urgency}</span>
              </div>
            </div>

            {/* Qualification Answers */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 mb-2">Automated Qualification Answers</div>
              {selectedLead.qualificationAnswers ? (
                <div className="space-y-1.5 text-[11px]">
                  {Object.entries(selectedLead.qualificationAnswers).map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-slate-500">{k}:</span>
                      <span className="font-semibold text-slate-800">{v}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-[11px]">
                  Qualified via incoming phone call conversation. Budget and medical history verified.
                </p>
              )}
            </div>

            {/* Financial Value & Follow-Up */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="text-slate-500">Estimated Procedure Value</div>
                <div className="text-2xl font-extrabold text-emerald-600 mt-1 font-sans">
                  ${selectedLead.estimatedValue.toLocaleString()}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200">
                <div className="text-slate-500 text-[10px]">Next Scheduled AI Touchpoint</div>
                <div className="font-semibold text-slate-800 text-[11px] mt-0.5">
                  {selectedLead.nextFollowUp || 'Pre-appointment reminder queued'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in">
            <h3 className="font-bold text-base text-slate-900 mb-1">Add New Lead to Pipeline</h3>
            <p className="text-xs text-slate-500 mb-4">
              AI receptionist will automatically initiate qualification and sequence routing.
            </p>

            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jessica Taylor"
                  value={newLeadName}
                  onChange={e => setNewLeadName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={newLeadPhone}
                  onChange={e => setNewLeadPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Service Interest</label>
                <select
                  value={newLeadService}
                  onChange={e => setNewLeadService(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                >
                  {business.services.map(s => (
                    <option key={s.id} value={s.name}>
                      {s.name} (${s.price})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Estimated Value ($)</label>
                <input
                  type="number"
                  value={newLeadValue}
                  onChange={e => setNewLeadValue(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Create & Trigger AI Follow-up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
