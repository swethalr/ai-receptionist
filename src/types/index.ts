export type BusinessCategory =
  | 'dental'
  | 'medical'
  | 'cosmetic'
  | 'real_estate'
  | 'legal'
  | 'home_services'
  | 'salon_spa'
  | 'auto_dealership'
  | 'education'
  | 'b2b_agency';

export type AIPersonality =
  | 'professional'
  | 'friendly'
  | 'luxury'
  | 'warm'
  | 'medical'
  | 'sales-focused'
  | 'concierge';

export interface ServiceItem {
  id: string;
  name: string;
  durationMin: number;
  price: number;
  depositRequired: number;
  description: string;
  category?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  specialty: string;
  appointmentsCount: number;
  conversionRate: number;
  revenueGenerated: number;
}

export interface BusinessLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  isPrimary: boolean;
}

export interface BusinessProfile {
  id: string;
  name: string;
  category: BusinessCategory;
  tagline: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  website: string;
  address: string;
  personality: AIPersonality;
  tone: string;
  greeting: string;
  speakingSpeed: number; // 0.8 - 1.2
  language: string;
  brandVocabulary: string[];
  prohibitedStatements: string[];
  afterHoursMessage: string;
  workingHours: {
    start: string;
    end: string;
    days: string[];
  };
  bufferTimeMinutes: number;
  services: ServiceItem[];
  staff: StaffMember[];
  locations: BusinessLocation[];
  qualificationQuestions: {
    id: string;
    question: string;
    purpose: string;
    weight: number;
  }[];
  escalationRules: {
    id: string;
    trigger: string;
    action: string;
    notifyStaffId: string;
    severity: 'medium' | 'high' | 'critical';
  }[];
}

export type LeadChannel =
  | 'phone'
  | 'whatsapp'
  | 'website_form'
  | 'chat'
  | 'google_business'
  | 'instagram';

export type LeadStage =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'appointment_booked'
  | 'attended'
  | 'won'
  | 'lost'
  | 're_engagement';

export interface LeadCustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
  channel: LeadChannel;
  source: string;
  leadScore: number; // 0 - 100
  stage: LeadStage;
  intent: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  estimatedValue: number;
  actualRevenue?: number;
  tags: string[];
  notes: string;
  createdAt: string;
  lastInteraction: string;
  nextFollowUp?: string;
  missedCallRecovered: boolean;
  attributedToAI: boolean;
  assignedStaffId?: string;
  locationId?: string;
  aiSummary: string;
  conversationHistoryCount: number;
  qualificationAnswers?: Record<string, string>;
}

export interface Appointment {
  id: string;
  contactId: string;
  contactName: string;
  contactPhone: string;
  serviceId: string;
  serviceName: string;
  staffId: string;
  staffName: string;
  locationId: string;
  locationName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. 10:30 AM
  durationMin: number;
  price: number;
  status: 'confirmed' | 'pending' | 'rescheduled' | 'cancelled' | 'attended' | 'no_show';
  bookedBy: 'ai_phone' | 'ai_whatsapp' | 'web_form' | 'manual';
  notes?: string;
  calendarSynced: boolean;
  createdAt: string;
}

export interface CallLog {
  id: string;
  callerNumber: string;
  callerName: string;
  direction: 'inbound' | 'outbound';
  status: 'completed' | 'missed' | 'transferred' | 'missed_recovered';
  durationSec: number;
  timestamp: string;
  recordingAvailable: boolean;
  intent: string;
  sentiment: 'positive' | 'neutral' | 'frustrated' | 'urgent';
  urgency: 'low' | 'medium' | 'high' | 'critical' | 'emergency';
  language: string;
  leadScore: number;
  summary: string;
  transcript: {
    id: string;
    speaker: 'ai' | 'caller' | 'system';
    text: string;
    timestamp: string;
  }[];
  bookedAppointmentId?: string;
  actionTaken: string;
  transferredTo?: string;
}

export interface WhatsAppMessage {
  id: string;
  sender: 'customer' | 'ai' | 'staff';
  text: string;
  time: string;
  status: 'sent' | 'delivered' | 'read';
  actionPrompt?: string;
}

export interface WhatsAppChat {
  id: string;
  contactId: string;
  contactName: string;
  contactPhone: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isEscalated: boolean;
  messages: WhatsAppMessage[];
  leadScore: number;
  stage: LeadStage;
  serviceInterest?: string;
}

export interface AutomationNode {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'delay';
  title: string;
  subtitle: string;
  config: Record<string, any>;
  iconName: string;
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  category: 'missed_call' | 'post_appointment' | 'lead_qualification' | 're_engagement' | 'abandoned_booking';
  active: boolean;
  triggerEvent: string;
  stepsCount: number;
  runsCount: number;
  conversionsCount: number;
  revenueGenerated: number;
  nodes: AutomationNode[];
}

export interface CampaignItem {
  id: string;
  name: string;
  targetCriteria: string;
  audienceCount: number;
  status: 'active' | 'scheduled' | 'completed' | 'draft';
  sentCount: number;
  repliedCount: number;
  bookedCount: number;
  revenueRecovered: number;
  createdDate: string;
  templateMessage: string;
}

export interface KnowledgeFAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  usageCount: number;
}

export interface KnowledgeDoc {
  id: string;
  fileName: string;
  category: string;
  fileSize: string;
  uploadDate: string;
  tokensIndexed: number;
  status: 'ready' | 'processing';
}

export interface BusinessMetrics {
  totalLeads: number;
  leadsContacted: number;
  qualifiedLeads: number;
  hotLeads: number;
  appointmentsBooked: number;
  appointmentsCompleted: number;
  customersWon: number;
  totalRevenue: number;
  aiAttributedRevenue: number;
  missedCalls: number;
  missedCallsRecovered: number;
  missedRevenueRecovered: number;
  followUpRevenue: number;
  potentialRevenueAtRisk: number;
  conversionRate: number; // e.g. 24.8%
  avgCustomerValue: number;
  revenuePerLead: number;
  avgResponseTimeSec: number;
  noShowRate: number;
  qualityScore: {
    accuracy: number;
    responseQuality: number;
    leadQualification: number;
    bookingSuccess: number;
    overall: number;
  };
}

export interface AIAdvisorInsight {
  id: string;
  type: 'opportunity' | 'warning' | 'win' | 'recommendation';
  title: string;
  metric: string;
  description: string;
  financialImpact: number;
  actionText: string;
  actionRoute: string;
}

export interface ObjectionRule {
  id: string;
  objection: string;
  category: 'price' | 'timing' | 'decision_maker' | 'trust' | 'comparison';
  aiGuidance: string;
  approvedScript: string;
  neverDo: string;
}
