import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  Phone,
  MoreVertical,
  CheckCheck,
  Paperclip,
  Smile,
  ShieldCheck,
  Calendar,
  DollarSign,
  UserCheck,
  Clock,
  ChevronRight,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ReceptionistAIService } from '../../services/aiService';
import { WhatsAppChat } from '../../types';

export const WhatsAppReceptionist: React.FC = () => {
  const { whatsappChats, addWhatsAppMessage, business, addAppointment, activeLocationId } = useApp();

  const [selectedChatId, setSelectedChatId] = useState<string>(whatsappChats[0]?.id || 'wa_1');
  const [inputText, setInputText] = useState<string>('');
  const [isAITyping, setIsAITyping] = useState<boolean>(false);
  const [filterQuery, setFilterQuery] = useState<string>('');

  const activeChat = whatsappChats.find(c => c.id === selectedChatId) || whatsappChats[0];
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages, isAITyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !activeChat) return;

    // 1. Add customer message
    addWhatsAppMessage(activeChat.id, 'customer', text.trim());
    setInputText('');
    setIsAITyping(true);

    // 2. Format history for AI
    const history = activeChat.messages.map(m => ({
      speaker: (m.sender === 'customer' ? 'caller' : 'ai') as 'ai' | 'caller' | 'system',
      text: m.text
    }));

    // 3. Generate AI response with contextual intelligence
    const aiResult = await ReceptionistAIService.generatePhoneReply(
      text,
      history,
      business,
      activeChat.leadScore
    );

    // Natural WhatsApp typing delay (1.2s)
    setTimeout(() => {
      setIsAITyping(false);
      addWhatsAppMessage(activeChat.id, 'ai', aiResult.replyText);

      // Check if slot booking completed
      if (text.toLowerCase().includes('11') || text.toLowerCase().includes('2:30') || text.toLowerCase().includes('4:30') || text.toLowerCase().includes('wednesday') || text.toLowerCase().includes('tomorrow') || text.toLowerCase().includes('works best')) {
        addAppointment({
          contactId: activeChat.contactId,
          contactName: activeChat.contactName,
          contactPhone: activeChat.contactPhone,
          serviceId: business.services[0]?.id || 'srv_1',
          serviceName: activeChat.serviceInterest || business.services[0]?.name || 'Consultation',
          staffId: business.staff[0]?.id || 'staff_1',
          staffName: business.staff[0]?.name || 'Care Specialist',
          locationId: activeLocationId,
          locationName: business.locations[0]?.name || 'Main Office',
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          timeSlot: '11:00 AM',
          durationMin: 45,
          price: business.services[0]?.price || 220,
          status: 'confirmed',
          bookedBy: 'ai_whatsapp',
          notes: `Booked via WhatsApp AI Assistant. Deposit link generated.`,
          calendarSynced: true
        });
      }
    }, 1200);
  };

  const sampleInboundPrompts = [
    'Hi, I want to book an appointment.',
    'How much does this cost?',
    'Are you open tomorrow?',
    'Can I come at 5:00 PM?',
    'Where are you located and is parking free?',
    'I missed your call earlier. What is this regarding?'
  ];

  const filteredChats = whatsappChats.filter(c =>
    c.contactName.toLowerCase().includes(filterQuery.toLowerCase()) ||
    c.contactPhone.includes(filterQuery)
  );

  return (
    <div className="h-[calc(100vh-130px)] flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Top Bar Header */}
      <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-green-500 text-white flex items-center justify-center font-bold shadow-xs">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm text-slate-900">WhatsApp AI Front Desk & Sales Coordinator</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-800 border border-green-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                24/7 Live Auto-Responder Active
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Responds in under 15 seconds, qualifies patient intent, handles objections, and schedules into your calendar.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-slate-800">Connected Number</div>
            <div className="text-[11px] text-slate-500 font-mono">{business.whatsappNumber}</div>
          </div>
        </div>
      </div>

      {/* Main Container: Left Conversation List (320px), Right Active Chat */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Chat List */}
        <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50/40 flex-shrink-0">
          <div className="p-3 border-b border-slate-200">
            <input
              type="text"
              placeholder="Search conversations..."
              value={filterQuery}
              onChange={e => setFilterQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredChats.map(chat => {
              const isSelected = chat.id === activeChat?.id;
              return (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChatId(chat.id)}
                  className={`p-3.5 cursor-pointer transition flex items-start gap-3 ${
                    isSelected ? 'bg-white border-l-4 border-l-green-600 shadow-xs' : 'hover:bg-slate-100/60'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white font-bold flex items-center justify-center text-xs flex-shrink-0 shadow-xs">
                    {chat.contactName.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-slate-900 truncate">{chat.contactName}</h4>
                      <span className="text-[10px] text-slate-400">{chat.lastMessageTime}</span>
                    </div>

                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{chat.lastMessage}</p>

                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                        Score {chat.leadScore}
                      </span>
                      <span className="text-[9px] font-medium px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 truncate max-w-[120px]">
                        {chat.stage.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active WhatsApp Screen */}
        {activeChat ? (
          <div className="flex-1 flex flex-col bg-[#efeae2]/40 relative">
            {/* WhatsApp Header */}
            <div className="px-4 py-2.5 bg-white border-b border-slate-200 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                  {activeChat.contactName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-xs text-slate-900">{activeChat.contactName}</h3>
                    <span className="text-[10px] bg-green-50 text-green-700 font-bold px-1 rounded border border-green-200">
                      Verified Lead
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span>AI Receptionist Online • {activeChat.contactPhone}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleSendMessage('I would like to speak directly with the human doctor or office manager.');
                  }}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  title="Simulate Customer requesting Human Staff"
                >
                  <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden sm:inline">Request Human Handoff</span>
                </button>
              </div>
            </div>

            {/* Chat Messages Timeline */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {/* Security Banner */}
              <div className="flex justify-center my-2">
                <div className="bg-amber-50 border border-amber-200/80 rounded-lg px-3 py-1 text-[11px] text-amber-800 flex items-center gap-1.5 max-w-md text-center shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0 text-amber-600" />
                  <span>Messages and calls are end-to-end encrypted. AI responses follow clinic verified protocols.</span>
                </div>
              </div>

              {activeChat.messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'customer' ? 'items-start' : 'items-end'
                  }`}
                >
                  <div
                    className={`max-w-[78%] rounded-xl px-3.5 py-2.5 text-xs shadow-xs leading-relaxed ${
                      msg.sender === 'customer'
                        ? 'bg-white text-slate-800 rounded-tl-xs border border-slate-100'
                        : 'bg-[#d9fdd3] text-slate-900 rounded-tr-xs border border-green-200/60'
                    }`}
                  >
                    {msg.sender === 'ai' && (
                      <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 mb-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Ava • AI Coordinator</span>
                      </div>
                    )}
                    <div>{msg.text}</div>
                    <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-400">
                      <span>{msg.time}</span>
                      {msg.sender !== 'customer' && (
                        <CheckCheck className="w-3.5 h-3.5 text-sky-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isAITyping && (
                <div className="flex items-start">
                  <div className="bg-white rounded-xl rounded-tl-xs px-3 py-2 text-xs text-slate-500 border border-slate-100 flex items-center gap-1.5 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[11px] font-medium text-emerald-800 ml-1">Ava is typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Test Chips */}
            <div className="px-4 py-2 bg-white/90 border-t border-slate-200/80">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] flex-shrink-0">
                  Quick Prompts:
                </span>
                {sampleInboundPrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(p)}
                    className="flex-shrink-0 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-slate-200 text-slate-700 font-medium transition cursor-pointer"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition" title="Attach file">
                <Paperclip className="w-4 h-4" />
              </button>

              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSendMessage(inputText);
                }}
                className="flex-1 flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Type a WhatsApp message as customer..."
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  className="flex-1 bg-slate-100 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-500 border border-transparent focus:border-emerald-500"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
