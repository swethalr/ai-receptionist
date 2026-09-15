import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  BusinessCategory,
  BusinessProfile,
  LeadCustomer,
  Appointment,
  CallLog,
  WhatsAppChat,
  AutomationWorkflow,
  CampaignItem,
  KnowledgeFAQ,
  KnowledgeDoc,
  BusinessMetrics,
  AIAdvisorInsight
} from '../types';
import {
  BUSINESS_PRESETS,
  INITIAL_LEADS,
  INITIAL_APPOINTMENTS,
  INITIAL_CALL_LOGS,
  INITIAL_WHATSAPP_CHATS,
  INITIAL_AUTOMATIONS,
  INITIAL_CAMPAIGNS,
  INITIAL_FAQS,
  INITIAL_DOCS,
  INITIAL_METRICS,
  INITIAL_INSIGHTS
} from '../data/presets';
import { playPhoneTone } from '../utils/audio';

export type NavigationTab =
  | 'dashboard'
  | 'phone_receptionist'
  | 'whatsapp'
  | 'missed_calls'
  | 'inbox'
  | 'crm'
  | 'calendar'
  | 'automations'
  | 'campaigns'
  | 'advisor'
  | 'knowledge'
  | 'roi_calculator'
  | 'settings'
  | 'landing_page'
  | 'wizard';

interface AppContextType {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  business: BusinessProfile;
  setBusiness: (profile: BusinessProfile) => void;
  switchBusinessCategory: (cat: BusinessCategory) => void;
  leads: LeadCustomer[];
  appointments: Appointment[];
  callLogs: CallLog[];
  whatsappChats: WhatsAppChat[];
  automations: AutomationWorkflow[];
  campaigns: CampaignItem[];
  faqs: KnowledgeFAQ[];
  docs: KnowledgeDoc[];
  metrics: BusinessMetrics;
  insights: AIAdvisorInsight[];
  activeLocationId: string;
  setActiveLocationId: (locId: string) => void;
  agencyMode: boolean;
  setAgencyMode: (val: boolean) => void;
  isCallSimulatorOpen: boolean;
  setIsCallSimulatorOpen: (open: boolean) => void;
  notifications: { id: string; title: string; desc: string; type: 'urgent' | 'revenue' | 'lead'; time: string; read?: boolean }[];
  markNotificationRead: (id: string) => void;
  addAppointment: (apt: Omit<Appointment, 'id' | 'createdAt'>) => Appointment;
  cancelAppointment: (aptId: string) => void;
  rescheduleAppointment: (aptId: string, newDate: string, newTime: string) => void;
  addLead: (lead: Omit<LeadCustomer, 'id' | 'createdAt'>) => LeadCustomer;
  updateLeadStage: (leadId: string, newStage: LeadCustomer['stage']) => void;
  updateLeadScore: (leadId: string, delta: number) => void;
  addCallLog: (call: Omit<CallLog, 'id'>) => CallLog;
  addWhatsAppMessage: (chatId: string, sender: 'customer' | 'ai' | 'staff', text: string) => void;
  triggerMissedCallRecovery: (callerName?: string, phone?: string) => void;
  launchReactivationCampaign: (campaignId: string) => void;
  toggleAutomation: (wfId: string) => void;
  addFAQ: (faq: Omit<KnowledgeFAQ, 'id' | 'usageCount'>) => void;
  deleteFAQ: (faqId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [currentCategory, setCurrentCategory] = useState<BusinessCategory>('dental');
  const [business, setBusiness] = useState<BusinessProfile>(BUSINESS_PRESETS.dental);
  const [leads, setLeads] = useState<LeadCustomer[]>(INITIAL_LEADS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [callLogs, setCallLogs] = useState<CallLog[]>(INITIAL_CALL_LOGS);
  const [whatsappChats, setWhatsappChats] = useState<WhatsAppChat[]>(INITIAL_WHATSAPP_CHATS);
  const [automations, setAutomations] = useState<AutomationWorkflow[]>(INITIAL_AUTOMATIONS);
  const [campaigns, setCampaigns] = useState<CampaignItem[]>(INITIAL_CAMPAIGNS);
  const [faqs, setFaqs] = useState<KnowledgeFAQ[]>(INITIAL_FAQS);
  const [docs, setDocs] = useState<KnowledgeDoc[]>(INITIAL_DOCS);
  const [metrics, setMetrics] = useState<BusinessMetrics>(INITIAL_METRICS);
  const [insights, setInsights] = useState<AIAdvisorInsight[]>(INITIAL_INSIGHTS);
  const [activeLocationId, setActiveLocationId] = useState<string>('loc_1');
  const [agencyMode, setAgencyMode] = useState<boolean>(false);
  const [isCallSimulatorOpen, setIsCallSimulatorOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<AppContextType['notifications']>([
    { id: 'notif_1', title: '🔥 Hot Lead Detected', desc: 'David Chen booked emergency consult ($1,250)', type: 'revenue', time: 'Just now' },
    { id: 'notif_2', title: '💵 Missed Call Recovered', desc: 'Marcus Sterling converted via WhatsApp ($4,800)', type: 'revenue', time: '14m ago' },
    { id: 'notif_3', title: '🚨 Triage Safeguard Active', desc: 'Emergency operatory auto-reserved for 2:30 PM', type: 'urgent', time: '28m ago' }
  ]);

  const switchBusinessCategory = (cat: BusinessCategory) => {
    setCurrentCategory(cat);
    const preset = BUSINESS_PRESETS[cat];
    if (preset) {
      setBusiness(preset);
      setActiveLocationId(preset.locations[0]?.id || 'loc_1');
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const addAppointment = (aptData: Omit<Appointment, 'id' | 'createdAt'>): Appointment => {
    const newApt: Appointment = {
      ...aptData,
      id: `apt_${Date.now()}`,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAppointments(prev => [newApt, ...prev]);

    // Update business metrics
    setMetrics(prev => ({
      ...prev,
      appointmentsBooked: prev.appointmentsBooked + 1,
      totalRevenue: prev.totalRevenue + (aptData.price || 500),
      aiAttributedRevenue: prev.aiAttributedRevenue + (aptData.bookedBy.startsWith('ai') ? (aptData.price || 500) : 0)
    }));

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      playPhoneTone('success');
    } catch (e) {}

    // Add alert notification
    setNotifications(prev => [
      {
        id: `notif_${Date.now()}`,
        title: '📅 Appointment Booked by AI',
        desc: `${aptData.contactName} scheduled for ${aptData.serviceName} ($${aptData.price})`,
        type: 'revenue',
        time: 'Just now'
      },
      ...prev
    ]);

    return newApt;
  };

  const cancelAppointment = (aptId: string) => {
    setAppointments(prev => prev.map(a => a.id === aptId ? { ...a, status: 'cancelled' } : a));
  };

  const rescheduleAppointment = (aptId: string, newDate: string, newTime: string) => {
    setAppointments(prev => prev.map(a => a.id === aptId ? { ...a, date: newDate, timeSlot: newTime, status: 'rescheduled' } : a));
  };

  const addLead = (leadData: Omit<LeadCustomer, 'id' | 'createdAt'>): LeadCustomer => {
    const newLead: LeadCustomer = {
      ...leadData,
      id: `lead_${Date.now()}`,
      createdAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setLeads(prev => [newLead, ...prev]);
    setMetrics(prev => ({ ...prev, totalLeads: prev.totalLeads + 1 }));
    return newLead;
  };

  const updateLeadStage = (leadId: string, newStage: LeadCustomer['stage']) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage: newStage, lastInteraction: 'Just now' } : l));
  };

  const updateLeadScore = (leadId: string, delta: number) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        const nextScore = Math.min(100, Math.max(0, l.leadScore + delta));
        return { ...l, leadScore: nextScore };
      }
      return l;
    }));
  };

  const addCallLog = (callData: Omit<CallLog, 'id'>): CallLog => {
    const newCall: CallLog = {
      ...callData,
      id: `call_${Date.now()}`
    };
    setCallLogs(prev => [newCall, ...prev]);
    return newCall;
  };

  const addWhatsAppMessage = (chatId: string, sender: 'customer' | 'ai' | 'staff', text: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = {
      id: `msg_${Date.now()}`,
      sender,
      text,
      time: timeStr,
      status: 'delivered' as const
    };

    setWhatsappChats(prev => prev.map(c => {
      if (c.id === chatId) {
        return {
          ...c,
          lastMessage: text,
          lastMessageTime: timeStr,
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    }));
  };

  const triggerMissedCallRecovery = (callerName = 'Sarah Jenkins', phone = '+1 (555) 723-9099') => {
    playPhoneTone('ring');

    setTimeout(() => {
      playPhoneTone('beep');

      // 1. Log missed call
      const missedCall = addCallLog({
        callerNumber: phone,
        callerName,
        direction: 'inbound',
        status: 'missed_recovered',
        durationSec: 0,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recordingAvailable: false,
        intent: 'Missed Call Recovery Active',
        sentiment: 'neutral',
        urgency: 'high',
        language: 'English',
        leadScore: 78,
        summary: `Line was busy. System detected missed call from ${callerName} and dispatched AI WhatsApp recovery in 18 seconds.`,
        actionTaken: 'AI WhatsApp Recovery Dispatched',
        transcript: []
      });

      // 2. Create Lead
      const newLead = addLead({
        name: callerName,
        phone,
        email: `${callerName.toLowerCase().replace(' ', '.')}@gmail.com`,
        channel: 'whatsapp',
        source: 'Missed Call Recovery',
        leadScore: 82,
        stage: 'contacted',
        intent: 'Inbound Inquiry (Recovered)',
        urgency: 'high',
        estimatedValue: 1800,
        tags: ['Missed Call Recovered', 'Instant AI Ping'],
        notes: 'Line busy - AI responded within 18 seconds with booking calendar.',
        lastInteraction: 'Just now',
        missedCallRecovered: true,
        attributedToAI: true,
        conversationHistoryCount: 1,
        aiSummary: 'Caller hung up after 2 rings. Automated WhatsApp recovery sent with top 3 service slots.'
      });

      // 3. Create or update WhatsApp chat
      const recoveryChatId = `wa_rec_${Date.now()}`;
      const newChat: WhatsAppChat = {
        id: recoveryChatId,
        contactId: newLead.id,
        contactName: callerName,
        contactPhone: phone,
        lastMessage: `Hi ${callerName.split(' ')[0]}, we noticed we just missed your call at ${business.name}! How can we help you today?`,
        lastMessageTime: 'Just now',
        unreadCount: 1,
        isEscalated: false,
        leadScore: 82,
        stage: 'contacted',
        serviceInterest: business.services[0]?.name,
        messages: [
          {
            id: `m_rec_1`,
            sender: 'ai',
            text: `Hi ${callerName.split(' ')[0]}, we noticed we just missed your call at ${business.name}! Our team is currently assisting another patient, but I am ${business.personality === 'luxury' ? 'Chloe' : 'Ava'}, your AI care assistant. How can I help with your smile or appointment today?`,
            time: 'Just now',
            status: 'read'
          }
        ]
      };

      setWhatsappChats(prev => [newChat, ...prev]);

      // Update metrics
      setMetrics(prev => ({
        ...prev,
        missedCalls: prev.missedCalls + 1,
        missedCallsRecovered: prev.missedCallsRecovered + 1,
        missedRevenueRecovered: prev.missedRevenueRecovered + 1800,
        aiAttributedRevenue: prev.aiAttributedRevenue + 1800,
        totalRevenue: prev.totalRevenue + 1800
      }));

      // Add notification
      setNotifications(prev => [
        {
          id: `notif_${Date.now()}`,
          title: '📞 Missed Call Recovered Instantly!',
          desc: `${callerName} (${phone}) reached via WhatsApp in 18s. +$1,800 potential revenue recaptured!`,
          type: 'revenue',
          time: 'Just now'
        },
        ...prev
      ]);
    }, 1200);
  };

  const launchReactivationCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === campaignId) {
        return {
          ...c,
          status: 'active',
          sentCount: c.audienceCount,
          repliedCount: Math.round(c.audienceCount * 0.46),
          bookedCount: Math.round(c.audienceCount * 0.22),
          revenueRecovered: c.revenueRecovered + 14800
        };
      }
      return c;
    }));

    setMetrics(prev => ({
      ...prev,
      followUpRevenue: prev.followUpRevenue + 14800,
      aiAttributedRevenue: prev.aiAttributedRevenue + 14800,
      totalRevenue: prev.totalRevenue + 14800
    }));

    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.5 } });
      playPhoneTone('success');
    } catch (e) {}

    setNotifications(prev => [
      {
        id: `notif_${Date.now()}`,
        title: '🚀 AI Re-Engagement Campaign Dispatched',
        desc: `142 dormant cosmetic inquiries messaged with personalized 3D smile preview invitations. +$14,800 anticipated revenue!`,
        type: 'revenue',
        time: 'Just now'
      },
      ...prev
    ]);
  };

  const toggleAutomation = (wfId: string) => {
    setAutomations(prev => prev.map(w => w.id === wfId ? { ...w, active: !w.active } : w));
  };

  const addFAQ = (faqData: Omit<KnowledgeFAQ, 'id' | 'usageCount'>) => {
    const newFaq: KnowledgeFAQ = {
      ...faqData,
      id: `faq_${Date.now()}`,
      usageCount: 0
    };
    setFaqs(prev => [newFaq, ...prev]);
  };

  const deleteFAQ = (faqId: string) => {
    setFaqs(prev => prev.filter(f => f.id !== faqId));
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        business,
        setBusiness,
        switchBusinessCategory,
        leads,
        appointments,
        callLogs,
        whatsappChats,
        automations,
        campaigns,
        faqs,
        docs,
        metrics,
        insights,
        activeLocationId,
        setActiveLocationId,
        agencyMode,
        setAgencyMode,
        isCallSimulatorOpen,
        setIsCallSimulatorOpen,
        notifications,
        markNotificationRead,
        addAppointment,
        cancelAppointment,
        rescheduleAppointment,
        addLead,
        updateLeadStage,
        updateLeadScore,
        addCallLog,
        addWhatsAppMessage,
        triggerMissedCallRecovery,
        launchReactivationCampaign,
        toggleAutomation,
        addFAQ,
        deleteFAQ
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
