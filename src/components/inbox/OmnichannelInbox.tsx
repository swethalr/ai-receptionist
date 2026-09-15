import React, { useState } from 'react';
import {
  Inbox,
  Phone,
  MessageSquare,
  Globe,
  Mail,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Sparkles,
  Send,
  UserCheck,
  Search,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OmnichannelInbox: React.FC = () => {
  const { leads, callLogs, whatsappChats, addWhatsAppMessage } = useApp();
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    type: 'phone' | 'whatsapp' | 'web';
    contactName: string;
    contactPhone: string;
    snippet: string;
    time: string;
    status: 'ai_handled' | 'needs_review' | 'escalated';
    sentiment: string;
    leadScore: number;
  }>({
    id: 'wa_1',
    type: 'whatsapp',
    contactName: 'Marcus Sterling',
    contactPhone: '+1 (555) 234-8891',
    snippet: 'Hi, I missed your call earlier. How much do porcelain veneers cost?',
    time: '14m ago',
    status: 'ai_handled',
    sentiment: 'positive',
    leadScore: 88
  });

  const [staffReplyText, setStaffReplyText] = useState<string>('');

  // Generate unified communication items
  const unifiedItems = [
    ...whatsappChats.map(w => ({
      id: w.id,
      type: 'whatsapp' as const,
      contactName: w.contactName,
      contactPhone: w.contactPhone,
      snippet: w.lastMessage,
      time: w.lastMessageTime,
      status: w.isEscalated ? ('needs_review' as const) : ('ai_handled' as const),
      sentiment: 'positive',
      leadScore: w.leadScore
    })),
    ...callLogs.slice(0, 4).map(c => ({
      id: c.id,
      type: 'phone' as const,
      contactName: c.callerName,
      contactPhone: c.callerNumber,
      snippet: c.summary,
      time: c.timestamp,
      status: c.status === 'completed' ? ('ai_handled' as const) : ('needs_review' as const),
      sentiment: c.sentiment,
      leadScore: c.leadScore
    }))
  ];

  const filteredItems = unifiedItems.filter(item => {
    if (selectedChannel === 'all') return true;
    return item.type === selectedChannel;
  });

  const handleSendStaffReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffReplyText.trim()) return;

    if (selectedItem.type === 'whatsapp') {
      addWhatsAppMessage(selectedItem.id, 'staff', staffReplyText);
    }
    setStaffReplyText('');
  };

  return (
    <div className="h-[calc(100vh-130px)] flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Header */}
      <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
            <Inbox className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-slate-900">Omnichannel Unified Inbox</h2>
            <p className="text-[11px] text-slate-500">
              Live central stream for Phone calls, WhatsApp, Google Business, Website inquiries, and SMS.
            </p>
          </div>
        </div>

        {/* Channel Filter Chips */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setSelectedChannel('all')}
            className={`px-2.5 py-1 rounded-md transition ${
              selectedChannel === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            All ({unifiedItems.length})
          </button>
          <button
            onClick={() => setSelectedChannel('whatsapp')}
            className={`px-2.5 py-1 rounded-md transition ${
              selectedChannel === 'whatsapp' ? 'bg-white text-green-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            WhatsApp
          </button>
          <button
            onClick={() => setSelectedChannel('phone')}
            className={`px-2.5 py-1 rounded-md transition ${
              selectedChannel === 'phone' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Phone Calls
          </button>
        </div>
      </div>

      {/* Main Grid: Left List (340px), Right Detail View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left List */}
        <div className="w-80 sm:w-96 border-r border-slate-200 flex flex-col bg-slate-50/40 flex-shrink-0">
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredItems.map(item => {
              const isSelected = item.id === selectedItem.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-3.5 cursor-pointer transition flex items-start gap-3 ${
                    isSelected ? 'bg-white border-l-4 border-l-indigo-600 shadow-xs' : 'hover:bg-slate-100/60'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0 font-bold text-xs ${
                      item.type === 'whatsapp'
                        ? 'bg-green-500'
                        : item.type === 'phone'
                        ? 'bg-indigo-600'
                        : 'bg-amber-500'
                    }`}
                  >
                    {item.type === 'whatsapp' ? (
                      <MessageSquare className="w-4 h-4" />
                    ) : item.type === 'phone' ? (
                      <Phone className="w-4 h-4" />
                    ) : (
                      <Globe className="w-4 h-4" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-slate-900 truncate">{item.contactName}</h4>
                      <span className="text-[10px] text-slate-400">{item.time}</span>
                    </div>

                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.snippet}</p>

                    <div className="flex items-center gap-1.5 mt-2">
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                          item.status === 'ai_handled'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {item.status === 'ai_handled' ? '✓ AI Handled' : '⚠️ Human Review'}
                      </span>
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                        Score {item.leadScore}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="flex-1 flex flex-col bg-slate-50/20">
          {selectedItem ? (
            <>
              {/* Detail Header */}
              <div className="px-5 py-3 bg-white border-b border-slate-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900">{selectedItem.contactName}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                      {selectedItem.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{selectedItem.contactPhone}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    Lead Score: {selectedItem.leadScore}/100
                  </span>
                </div>
              </div>

              {/* Message Details */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-bold text-slate-700">Inbound Interaction Summary</span>
                    <span>{selectedItem.time}</span>
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed">{selectedItem.snippet}</p>
                </div>

                {/* AI Automated Action Card */}
                <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 mb-1">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Autonomous AI Receptionist Execution</span>
                  </div>
                  <p className="text-[11px] text-indigo-950 leading-relaxed">
                    AI identified service interest, checked physician calendar availability, and sent follow-up booking options. No manual front desk intervention was required.
                  </p>
                </div>
              </div>

              {/* Staff Takeover Reply Bar */}
              <div className="p-4 bg-white border-t border-slate-200">
                <div className="text-[11px] font-semibold text-slate-500 mb-1.5 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Send Direct Reply as Staff (Human Takeover)</span>
                </div>
                <form onSubmit={handleSendStaffReply} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type human reply here (AI will pause automatically)..."
                    value={staffReplyText}
                    onChange={e => setStaffReplyText(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    disabled={!staffReplyText.trim()}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs disabled:opacity-40"
                  >
                    Send Reply
                  </button>
                </form>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
