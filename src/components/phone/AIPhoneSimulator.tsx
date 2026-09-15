import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  PhoneOff,
  PhoneForwarded,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  AlertCircle,
  Calendar,
  Clock,
  UserCheck,
  Send,
  MessageSquare,
  FileText,
  Activity,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Zap,
  Sliders
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ReceptionistAIService, AIResponseResult } from '../../services/aiService';
import { speechManager, playPhoneTone } from '../../utils/audio';

interface TranscriptItem {
  id: string;
  speaker: 'ai' | 'caller' | 'system';
  text: string;
  timestamp: string;
}

export const AIPhoneSimulator: React.FC<{ isModal?: boolean; onClose?: () => void }> = ({
  isModal = false,
  onClose
}) => {
  const { business, addAppointment, addLead, addCallLog, activeLocationId } = useApp();

  // Call State
  const [callStatus, setCallStatus] = useState<'idle' | 'ringing' | 'connected' | 'ended'>('idle');
  const [callDuration, setCallDuration] = useState<number>(0);
  const [callerName, setCallerName] = useState<string>('David Chen');
  const [callerNumber, setCallerNumber] = useState<string>('+1 (555) 887-9944');
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isOnHold, setIsOnHold] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(true);

  // Live AI HUD metrics
  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
  const [currentIntent, setCurrentIntent] = useState<string>('Awaiting Caller Greeting');
  const [leadScore, setLeadScore] = useState<number>(60);
  const [sentiment, setSentiment] = useState<'positive' | 'neutral' | 'urgent' | 'frustrated'>('neutral');
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high' | 'emergency'>('medium');
  const [lastAIAction, setLastAIAction] = useState<string>('AI Voice Model Initialized');
  const [isAISpeaking, setIsAISpeaking] = useState<boolean>(false);
  const [suggestedSlots, setSuggestedSlots] = useState<string[]>([]);
  const [bookedSlot, setBookedSlot] = useState<string | null>(null);
  const [callerInputText, setCallerInputText] = useState<string>('');
  const [isListeningMic, setIsListeningMic] = useState<boolean>(false);

  const durationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  // Duration Timer
  useEffect(() => {
    if (callStatus === 'connected') {
      durationTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (durationTimerRef.current) clearInterval(durationTimerRef.current);
    }
    return () => {
      if (durationTimerRef.current) clearInterval(durationTimerRef.current);
    };
  }, [callStatus]);

  // Format call duration MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  // Start Inbound Call Simulation
  const handleStartInboundCall = () => {
    setCallStatus('ringing');
    setCallDuration(0);
    setTranscript([]);
    setBookedSlot(null);
    setSuggestedSlots([]);
    setCurrentIntent('Inbound Call Ringing');
    setLeadScore(65);
    setSentiment('neutral');
    setUrgency('medium');

    playPhoneTone('ring');

    // AI Answers after 1.5 seconds automatically
    setTimeout(() => {
      setCallStatus('connected');
      playPhoneTone('beep');

      const greetingText = business.greeting;
      const initialItem: TranscriptItem = {
        id: `t_${Date.now()}`,
        speaker: 'ai',
        text: greetingText,
        timestamp: '00:01'
      };
      setTranscript([initialItem]);
      setCurrentIntent('Greeting & Needs Identification');
      setLastAIAction('Greeting delivered with consent notice');

      if (audioEnabled) {
        setIsAISpeaking(true);
        speechManager.speak(
          greetingText,
          () => setIsAISpeaking(true),
          () => setIsAISpeaking(false),
          business.speakingSpeed
        );
      }
    }, 1500);
  };

  // Caller sends message (via prompt button, text input, or speech)
  const handleSendCallerMessage = async (text: string) => {
    if (!text.trim() || callStatus !== 'connected') return;

    // Add caller message
    const callerItem: TranscriptItem = {
      id: `t_${Date.now()}`,
      speaker: 'caller',
      text: text.trim(),
      timestamp: formatTime(callDuration)
    };
    const nextTranscript = [...transcript, callerItem];
    setTranscript(nextTranscript);
    setCallerInputText('');

    // Generate AI response
    const aiResult: AIResponseResult = await ReceptionistAIService.generatePhoneReply(
      text,
      nextTranscript,
      business,
      leadScore
    );

    // Update AI HUD
    setCurrentIntent(aiResult.intent.toUpperCase().replace('_', ' '));
    setSentiment(aiResult.sentiment);
    setUrgency(aiResult.urgency);
    setLeadScore(prev => Math.min(100, Math.max(10, prev + aiResult.leadScoreDelta)));

    if (aiResult.suggestedSlots && aiResult.suggestedSlots.length > 0) {
      setSuggestedSlots(aiResult.suggestedSlots);
    }

    // Natural brief pause before AI answers
    setTimeout(() => {
      const aiItem: TranscriptItem = {
        id: `t_${Date.now() + 1}`,
        speaker: 'ai',
        text: aiResult.replyText,
        timestamp: formatTime(callDuration + 2)
      };
      setTranscript(prev => [...prev, aiItem]);
      setLastAIAction(
        aiResult.shouldEscalate
          ? `⚠️ Escalation flagged: ${aiResult.escalationReason}`
          : aiResult.objectionDetected
          ? `Objection handled: ${aiResult.objectionDetected}`
          : `Processed ${aiResult.intent}`
      );

      // Check if slot booking completed
      if (text.toLowerCase().includes('11') || text.toLowerCase().includes('2:30') || text.toLowerCase().includes('4:15') || text.toLowerCase().includes('tomorrow') || text.toLowerCase().includes('yes please') || text.toLowerCase().includes('put me down')) {
        const booked = 'Tomorrow at 2:30 PM';
        setBookedSlot(booked);

        // Auto-create appointment in CRM
        const service = business.services[1] || business.services[0];
        addAppointment({
          contactId: `lead_${Date.now()}`,
          contactName: callerName,
          contactPhone: callerNumber,
          serviceId: service.id,
          serviceName: service.name,
          staffId: business.staff[0]?.id || 'staff_1',
          staffName: business.staff[0]?.name || 'On-Call Specialist',
          locationId: activeLocationId,
          locationName: business.locations[0]?.name || 'Main Clinic',
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          timeSlot: '02:30 PM',
          durationMin: service.durationMin,
          price: service.price,
          status: 'confirmed',
          bookedBy: 'ai_phone',
          notes: `Booked via AI Voice Receptionist. Urgent pain flagged: 8/10. Penicillin allergy confirmed.`,
          calendarSynced: true
        });
      }

      // Audio speech output
      if (audioEnabled) {
        setIsAISpeaking(true);
        speechManager.speak(
          aiResult.replyText,
          () => setIsAISpeaking(true),
          () => setIsAISpeaking(false),
          business.speakingSpeed
        );
      }
    }, 900);
  };

  // End Call & Log to CRM
  const handleEndCall = () => {
    speechManager.stop();
    setIsAISpeaking(false);
    playPhoneTone('hangup');
    setCallStatus('ended');

    // Save call log
    addCallLog({
      callerNumber,
      callerName,
      direction: 'inbound',
      status: bookedSlot ? 'completed' : 'completed',
      durationSec: callDuration,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      recordingAvailable: isRecording,
      intent: currentIntent,
      sentiment,
      urgency,
      language: 'English (US)',
      leadScore,
      summary: bookedSlot
        ? `Caller ${callerName} inquired about clinical care. AI qualified symptoms, checked physician schedules, and booked slot (${bookedSlot}). WhatsApp confirmation dispatched.`
        : `Completed inquiry regarding ${currentIntent}. Lead scored at ${leadScore}/100. Follow-up sequence queued.`,
      actionTaken: bookedSlot ? 'Appointment Confirmed & SMS Dispatched' : 'Lead Qualified & Assigned to Care Team',
      transcript: transcript
    });
  };

  // Mic Speech Recognition
  const handleToggleMic = () => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert('Speech Recognition is not supported in this browser. Please type or click the quick caller options below.');
      return;
    }

    if (isListeningMic) {
      setIsListeningMic(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListeningMic(true);
      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setIsListeningMic(false);
        handleSendCallerMessage(text);
      };
      recognition.onerror = () => setIsListeningMic(false);
      recognition.onend = () => setIsListeningMic(false);
      recognition.start();
    } catch (e) {
      setIsListeningMic(false);
    }
  };

  // Quick Caller Simulation Prompts
  const quickPrompts = [
    { label: '🚨 Severe Tooth Pain (Urgent)', text: 'I woke up with severe throbbing tooth pain and swelling. Do you have any emergency slots today?' },
    { label: '💎 Veneer Pricing & Financing', text: 'Hi Ava, how much do porcelain veneers cost and can I pay monthly with 0% financing?' },
    { label: '🤔 Objection: Ask Husband', text: 'That sounds a bit expensive. I need to talk to my husband first before booking.' },
    { label: '📅 Confirm Thursday Slot', text: 'Thursday at 2:30 PM sounds perfect. Please book that for me.' },
    { label: '👤 Request Human Operator', text: 'Can I speak with a real human receptionist please?' }
  ];

  return (
    <div className={`flex flex-col h-full bg-slate-900 text-slate-100 ${isModal ? 'p-0' : 'p-4 sm:p-6'}`}>
      {/* Top Banner */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base text-white">AI Phone Receptionist & Voice Engine</h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                Natural Latency &lt; 900ms
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Zero robotic phrases. Polite interruptions, contextual empathy, triage safeguards, and automatic calendar booking.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
              audioEnabled
                ? 'bg-slate-800 text-emerald-400 border-slate-700'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title="Toggle Web Speech Text-to-Speech playback"
          >
            {audioEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{audioEnabled ? 'Voice Audio: On' : 'Voice Audio: Muted'}</span>
          </button>

          {isModal && onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Left = Softphone & Controls, Right = Live AI Intelligence HUD & Transcript */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-0">
        {/* Left Column: Softphone & Call Controls (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Active Call Status Card */}
          <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-5 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden">
            {/* Ambient Pulse when Connected */}
            {callStatus === 'connected' && (
              <div className="absolute -top-16 -left-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            )}

            {/* Caller Avatar / Status Visual */}
            <div className="relative mb-3">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                  callStatus === 'connected'
                    ? isAISpeaking
                      ? 'bg-indigo-600 text-white ring-8 ring-indigo-500/30 ring-offset-4 ring-offset-slate-950 scale-105'
                      : 'bg-emerald-600 text-white ring-4 ring-emerald-500/20'
                    : callStatus === 'ringing'
                    ? 'bg-amber-500 text-white animate-bounce'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {callStatus === 'connected' ? (
                  <Activity className={`w-9 h-9 ${isAISpeaking ? 'animate-pulse' : ''}`} />
                ) : (
                  <Phone className="w-8 h-8" />
                )}
              </div>

              {callStatus === 'connected' && (
                <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-[10px] text-white font-bold">
                  ✓
                </span>
              )}
            </div>

            {/* Caller Name & Number */}
            <h3 className="text-lg font-bold text-white tracking-tight">{callerName}</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{callerNumber}</p>

            {/* Status & Duration Badge */}
            <div className="mt-3 flex items-center gap-2">
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                  callStatus === 'connected'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : callStatus === 'ringing'
                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    callStatus === 'connected' ? 'bg-emerald-400 animate-ping' : 'bg-slate-400'
                  }`}
                />
                {callStatus === 'connected'
                  ? `Live (${formatTime(callDuration)})`
                  : callStatus === 'ringing'
                  ? 'Incoming Ring...'
                  : 'Call Ended / Ready'}
              </span>

              {isAISpeaking && (
                <span className="text-[11px] font-bold text-indigo-400 animate-pulse flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Ava Speaking...
                </span>
              )}
            </div>

            {/* Dynamic Audio Waveform Visualizer */}
            <div className="w-full max-w-[220px] h-8 flex items-center justify-center gap-1 mt-4 px-3 py-1 bg-slate-900/80 rounded-lg border border-slate-800">
              {[40, 75, 95, 60, 85, 100, 70, 50, 90, 65, 45, 80].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    callStatus === 'connected' && (isAISpeaking || callDuration > 0)
                      ? 'bg-indigo-400'
                      : 'bg-slate-700'
                  }`}
                  style={{
                    height:
                      callStatus === 'connected' && isAISpeaking
                        ? `${Math.max(15, (h * (0.4 + (i % 4) * 0.2)) % 100)}%`
                        : callStatus === 'connected'
                        ? '25%'
                        : '15%'
                  }}
                />
              ))}
            </div>

            {/* In-Call Action Buttons */}
            <div className="flex items-center gap-3 mt-6">
              {callStatus === 'idle' || callStatus === 'ended' ? (
                <button
                  onClick={handleStartInboundCall}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition active:scale-95 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Start Inbound Call Demo</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-3 rounded-xl border transition ${
                      isMuted ? 'bg-amber-600 text-white border-amber-500' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                    title="Mute microphone"
                  >
                    {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => {
                      handleSendCallerMessage('Please connect me to human staff');
                    }}
                    className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                    title="Warm Transfer to Human Receptionist"
                  >
                    <PhoneForwarded className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleEndCall}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-900/30 transition active:scale-95 cursor-pointer"
                  >
                    <PhoneOff className="w-4 h-4" />
                    <span>Hang Up Call</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Quick Caller Prompts Box */}
          <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                1-Click Caller Scenarios
              </span>
              <span className="text-[10px] text-slate-400">Simulate customer objections & emergencies</span>
            </div>

            <div className="space-y-1.5">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  disabled={callStatus !== 'connected'}
                  onClick={() => handleSendCallerMessage(p.text)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition border ${
                    callStatus === 'connected'
                      ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800 hover:border-slate-700 cursor-pointer'
                      : 'bg-slate-900/40 text-slate-600 border-slate-900 cursor-not-allowed'
                  }`}
                >
                  <div className="font-semibold text-slate-200">{p.label}</div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">"{p.text}"</div>
                </button>
              ))}
            </div>

            {/* Custom Caller Typing or Mic Input */}
            <div className="mt-3 pt-3 border-t border-slate-800/80">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSendCallerMessage(callerInputText);
                }}
                className="flex items-center gap-1.5"
              >
                <input
                  type="text"
                  disabled={callStatus !== 'connected'}
                  placeholder={callStatus === 'connected' ? 'Speak or type as the caller...' : 'Start call to speak...'}
                  value={callerInputText}
                  onChange={e => setCallerInputText(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleToggleMic}
                  disabled={callStatus !== 'connected'}
                  className={`p-1.5 rounded-lg border transition ${
                    isListeningMic ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                  title="Voice input with your microphone"
                >
                  <Mic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="submit"
                  disabled={callStatus !== 'connected' || !callerInputText.trim()}
                  className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column: Live Transcript & Real-Time Intelligence Dossier (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Top Intelligence HUD Bar */}
          <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-3.5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {/* Intent Pill */}
            <div className="p-2 bg-slate-900/90 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Detected Intent</div>
              <div className="font-bold text-white mt-0.5 truncate flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-400 flex-shrink-0" />
                <span>{currentIntent}</span>
              </div>
            </div>

            {/* Lead Score Gauge */}
            <div className="p-2 bg-slate-900/90 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">AI Lead Score</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={`font-black text-sm ${
                    leadScore >= 80
                      ? 'text-rose-400'
                      : leadScore >= 60
                      ? 'text-amber-400'
                      : 'text-slate-300'
                  }`}
                >
                  {leadScore}/100
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
                  {leadScore >= 80 ? 'HOT' : leadScore >= 60 ? 'HIGH' : 'WARM'}
                </span>
              </div>
            </div>

            {/* Sentiment Meter */}
            <div className="p-2 bg-slate-900/90 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sentiment</div>
              <div className="font-bold capitalize mt-0.5 flex items-center gap-1">
                <span
                  className={`w-2 h-2 rounded-full ${
                    sentiment === 'urgent'
                      ? 'bg-rose-500 animate-ping'
                      : sentiment === 'positive'
                      ? 'bg-emerald-400'
                      : 'bg-slate-400'
                  }`}
                />
                <span className="text-white">{sentiment}</span>
              </div>
            </div>

            {/* Booking Status */}
            <div className="p-2 bg-slate-900/90 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Appointment</div>
              <div className="font-bold text-xs mt-0.5 truncate text-emerald-400 flex items-center gap-1">
                {bookedSlot ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Slot Reserved!</span>
                  </>
                ) : (
                  <span className="text-slate-400">Qualifying...</span>
                )}
              </div>
            </div>
          </div>

          {/* Live Call Transcript Container */}
          <div className="flex-1 bg-slate-950/70 rounded-xl border border-slate-800 flex flex-col min-h-[340px] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-bold text-slate-200">Live Call Transcription & Audit Log</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Consent Audio Recording Enabled</span>
              </div>
            </div>

            {/* Scrollable Transcript Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
              {transcript.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center p-6">
                  <Phone className="w-8 h-8 mb-2 opacity-30" />
                  <p className="font-medium text-slate-400">Call is currently idle.</p>
                  <p className="text-[11px] mt-1 max-w-xs">
                    Click <span className="text-indigo-400 font-semibold">"Start Inbound Call Demo"</span> on the left to test Ava answering immediately, understanding caller symptoms, handling objections, and booking the appointment.
                  </p>
                </div>
              ) : (
                transcript.map(item => (
                  <div
                    key={item.id}
                    className={`flex flex-col ${
                      item.speaker === 'caller' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-400">
                      <span className="font-bold">
                        {item.speaker === 'ai' ? '🤖 Ava (AI Receptionist)' : '👤 ' + callerName}
                      </span>
                      <span>• {item.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                        item.speaker === 'caller'
                          ? 'bg-slate-800 text-slate-100 border border-slate-700'
                          : 'bg-indigo-950/80 text-indigo-100 border border-indigo-800/80'
                      }`}
                    >
                      {item.text}
                    </div>
                  </div>
                ))
              )}
              <div ref={transcriptEndRef} />
            </div>

            {/* Bottom Status Footer */}
            {lastAIAction && (
              <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-900/70 text-[11px] flex items-center justify-between text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>{lastAIAction}</span>
                </div>
                {bookedSlot && (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> WhatsApp Confirmation Sent to {callerNumber}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
