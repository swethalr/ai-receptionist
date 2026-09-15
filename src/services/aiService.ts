import { BusinessProfile, ObjectionRule } from '../types';
import { INITIAL_OBJECTIONS, INITIAL_FAQS } from '../data/presets';

export interface AIResponseResult {
  replyText: string;
  intent: 'book_appointment' | 'pricing_inquiry' | 'emergency' | 'reschedule' | 'cancellation' | 'human_handoff' | 'general_faq' | 'smalltalk';
  leadScoreDelta: number;
  sentiment: 'positive' | 'neutral' | 'urgent' | 'frustrated';
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  qualificationAnswer?: { question: string; answer: string };
  recommendedService?: string;
  suggestedSlots?: string[];
  shouldEscalate: boolean;
  escalationReason?: string;
  objectionDetected?: string;
}

export class ReceptionistAIService {
  static async generatePhoneReply(
    userMessage: string,
    history: { speaker: 'ai' | 'caller' | 'system'; text: string }[],
    business: BusinessProfile,
    currentLeadScore: number = 60
  ): Promise<AIResponseResult> {
    const textLower = userMessage.toLowerCase();

    // 1. Check for emergency escalation
    const emergencyWords = ['severe pain', 'bleeding', 'cannot breathe', 'swelling', 'broken jaw', 'trauma', 'fell', 'unbearable', 'gas leak', 'fire', 'suicide', 'court order', 'arrested'];
    if (emergencyWords.some(w => textLower.includes(w))) {
      return {
        replyText: `I understand this is urgent and we take your safety very seriously. I am flagging this as a priority emergency triage right now. We have immediate emergency slots open today at our ${business.locations[0]?.name || 'clinic'} location. Would you like me to hold the next opening, or would you prefer I connect you directly to our on-call clinical team?`,
        intent: 'emergency',
        leadScoreDelta: 30,
        sentiment: 'urgent',
        urgency: 'emergency',
        shouldEscalate: true,
        escalationReason: 'Emergency symptom / triage detected from caller keywords'
      };
    }

    // 2. Check for human handoff request
    const humanWords = ['talk to human', 'real person', 'speak to a doctor', 'operator', 'representative', 'receptionist', 'transfer me', 'speak with someone'];
    if (humanWords.some(w => textLower.includes(w))) {
      return {
        replyText: `Certainly! I will connect you right away with our front desk care team. I am passing along your contact details and our conversation history so you won't have to repeat anything. Please hold for just a moment.`,
        intent: 'human_handoff',
        leadScoreDelta: 10,
        sentiment: 'neutral',
        urgency: 'medium',
        shouldEscalate: true,
        escalationReason: 'Caller requested human handoff'
      };
    }

    // 3. Check for Objection Handling
    for (const obj of INITIAL_OBJECTIONS) {
      if (
        (obj.category === 'price' && (textLower.includes('expensive') || textLower.includes('cost too much') || textLower.includes('discount') || textLower.includes('cheaper') || textLower.includes('budget'))) ||
        (obj.category === 'decision_maker' && (textLower.includes('husband') || textLower.includes('wife') || textLower.includes('spouse') || textLower.includes('partner') || textLower.includes('family'))) ||
        (obj.category === 'timing' && (textLower.includes('think about it') || textLower.includes('not ready') || textLower.includes('later') || textLower.includes('next month') || textLower.includes('busy this week'))) ||
        (obj.category === 'comparison' && (textLower.includes('comparing') || textLower.includes('other clinic') || textLower.includes('competitor') || textLower.includes('another doctor')))
      ) {
        return {
          replyText: obj.approvedScript,
          intent: 'pricing_inquiry',
          leadScoreDelta: 5,
          sentiment: 'neutral',
          urgency: 'medium',
          objectionDetected: obj.objection,
          shouldEscalate: false
        };
      }
    }

    // 4. Check for FAQ matches
    for (const faq of INITIAL_FAQS) {
      const qKeywords = faq.question.toLowerCase().split(' ').filter(w => w.length > 4);
      if (qKeywords.some(kw => textLower.includes(kw))) {
        return {
          replyText: `${faq.answer} Would you like to schedule a time to speak with our specialists in person?`,
          intent: 'general_faq',
          leadScoreDelta: 10,
          sentiment: 'positive',
          urgency: 'medium',
          shouldEscalate: false
        };
      }
    }

    // 5. Check for Appointment Booking / Schedule intent
    const bookingWords = ['book', 'appointment', 'schedule', 'come in', 'consultation', 'visit', 'available', 'tomorrow', 'today', 'thursday', 'friday', 'saturday', 'slot', 'time'];
    if (bookingWords.some(w => textLower.includes(w))) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dayName = tomorrow.toLocaleDateString('en-US', { weekday: 'long' });

      // Match a service
      const matchedService = business.services.find(s =>
        textLower.includes(s.name.toLowerCase().split(' ')[0]) || textLower.includes(s.name.toLowerCase().split(' ')[1] || '')
      ) || business.services[0];

      return {
        replyText: `I would be delighted to schedule that for you. For our ${matchedService.name}, we have openings this ${dayName} at 11:00 AM, 2:30 PM, and 4:15 PM with our team. Which of those times fits your schedule best?`,
        intent: 'book_appointment',
        leadScoreDelta: 25,
        sentiment: 'positive',
        urgency: 'high',
        recommendedService: matchedService.name,
        suggestedSlots: [`${dayName} at 11:00 AM`, `${dayName} at 2:30 PM`, `${dayName} at 4:15 PM`],
        shouldEscalate: false
      };
    }

    // 6. Time selection confirmation
    const slotWords = ['11', '2:30', '4:15', 'morning', 'afternoon', 'first one', 'second', 'works', 'sounds good', 'yes please', 'perfect'];
    if (slotWords.some(w => textLower.includes(w))) {
      return {
        replyText: `Excellent choice! I have reserved that time on the calendar. To finalize your confirmation, what is the best mobile number and spelling of your full name? Once confirmed, I'll send your calendar invite and arrival directions straight to your WhatsApp.`,
        intent: 'book_appointment',
        leadScoreDelta: 30,
        sentiment: 'positive',
        urgency: 'high',
        shouldEscalate: false
      };
    }

    // 7. General Contextual Fallback matching business personality
    return {
      replyText: `Thank you for sharing that. At ${business.name}, we customize every consultation to your exact goals. We provide ${business.brandVocabulary.slice(0, 2).join(' and ')}. Would you like me to reserve a priority consultation slot this week, or check pricing on a specific service?`,
      intent: 'general_faq',
      leadScoreDelta: 8,
      sentiment: 'positive',
      urgency: 'medium',
      shouldEscalate: false
    };
  }

  static async generateAdvisorAnswer(
    query: string,
    business: BusinessProfile
  ): Promise<{ answer: string; relatedMetrics: string[]; actionSteps: string[] }> {
    const q = query.toLowerCase();

    if (q.includes('why did revenue decrease') || q.includes('revenue decrease') || q.includes('lost revenue') || q.includes('drop')) {
      return {
        answer: `Based on your live platform audit, revenue experienced a temporary 6.2% dip primarily due to an 18% increase in human response time during peak lunch hours (12 PM - 2 PM), leading to 14 unrecovered missed calls. However, your AI WhatsApp receptionist maintained a 74.4% recovery rate, reclaiming $48,600 that would have otherwise leaked to nearby practices.`,
        relatedMetrics: ['14 Unrecovered Missed Calls (~$18,400 at risk)', 'Average Human Response Time: 42 mins vs AI: 14 secs', 'WhatsApp Conversion Rate: 38.2%'],
        actionSteps: [
          'Enable Instant Auto-Dispatch for phone calls when line rings for > 3 rings',
          'Activate the "14-Day Dormant Cosmetic Lead" re-engagement campaign to unlock ~$19,200',
          'Expand after-hours AI scheduling to include Sunday mornings'
        ]
      };
    }

    if (q.includes('lead source') || q.includes('which converts best') || q.includes('channel')) {
      return {
        answer: `Your highest converting lead channel is WhatsApp (38.2% booking rate, $1,840 avg customer value), followed closely by Direct Inbound Phone (34.0%). In contrast, Website Quiz forms convert at 19.4% because leads often delay responding. Our data shows that when website form leads receive an automated WhatsApp confirmation within 60 seconds, their conversion jumps to 31.8%!`,
        relatedMetrics: ['WhatsApp: 38.2% conversion', 'Phone Calls: 34.0% conversion', 'Web Forms: 19.4% conversion (Leads up 64% with instant WhatsApp auto-trigger)'],
        actionSteps: [
          'Enable the "Form-to-WhatsApp Instant Ping" automation',
          'Increase Google Business Profile call-tracking attribution budget',
          'Add click-to-WhatsApp float widget to website pricing page'
        ]
      };
    }

    if (q.includes('ai revenue') || q.includes('how much revenue did ai generate') || q.includes('ai generated')) {
      return {
        answer: `This month, RevReception's AI receptionist directly generated $128,400 in attributed revenue (69.6% of total revenue). This includes $48,600 recovered from 64 previously missed phone calls and $34,200 generated from automated 3-day and 7-day follow-up sequences without requiring any staff manual labor.`,
        relatedMetrics: ['$128,400 AI-Attributed Revenue', '$48,600 Recovered Missed Calls', '342 Staff Hours Saved ($10,260 labor cost savings)'],
        actionSteps: [
          'Review staff commission on AI-qualified high-ticket cosmetic leads',
          'Download monthly Board-Level Revenue Attribution PDF Report',
          'Upgrade to Multi-Location sync to replicate this workflow across branches'
        ]
      };
    }

    if (q.includes('staff') || q.includes('which staff member') || q.includes('converts the most')) {
      return {
        answer: `Dr. Aris Thorne maintains the highest consultation-to-treatment conversion rate at 84.5% ($64,200 revenue), closely followed by Dr. Elena Rostova at 79.2% ($58,900). Hygienist Sarah Lin leads patient retention with a 91.0% recall rate.`,
        relatedMetrics: ['Dr. Thorne: 84.5% conversion', 'Dr. Rostova: 79.2% conversion', 'Sarah Lin: 91.0% recall'],
        actionSteps: [
          'Route high-ticket porcelain makeover inquiries preferentially to Dr. Thorne calendar buffers',
          'Automate pre-treatment financing approvals to assist Dr. Rostova implant consults'
        ]
      };
    }

    // Default advisor response
    return {
      answer: `Our growth diagnostics indicate your business is operating at an impressive 94.5% AI Receptionist Quality Score. The greatest immediate opportunity is recovering 18 qualified cosmetic leads who paused at the pricing stage. Launching our approved objection sequence can secure 5 to 7 additional consults worth ~$14,000 this week.`,
      relatedMetrics: ['33.0% Overall Conversion Rate', '98.2% Clinical Answer Accuracy', '$19,200 Potential Revenue At Risk'],
      actionSteps: [
        'Run 1-click Re-engagement on dormant leads',
        'Verify buffer time between surgical procedures in staff calendar',
        'Review recent call recordings with sentiment scores below 80%'
      ]
    };
  }
}

export class AIGrowthAdvisorService {
  static async analyzeBusinessQuery(
    query: string,
    metrics: any,
    business: BusinessProfile
  ) {
    const q = query.toLowerCase();

    if (q.includes('revenue') || q.includes('how much') || q.includes('generated') || q.includes('ai revenue')) {
      return {
        diagnosis: `AI channels directly captured $128,400 in closed revenue this billing cycle, representing 69.6% of total practice income ($184,500). Missed call instant recovery alone contributed $48,600 across 64 patients who otherwise would have booked with nearby competitors.`,
        causes: [
          'Average inbound call response time reduced from 42 mins (human staff) to 14 seconds (AI)',
          '18-second WhatsApp recovery converted 74.4% of after-hours callers who hung up after 2 rings',
          'Automated deposit links secured commitment before consult timeslots'
        ],
        immediateAction: 'Increase marketing spend on Google Business Profile to capture more after-hours callers',
        projectedImpact: '+$24,000/mo in additional recapture'
      };
    }

    if (q.includes('bottleneck') || q.includes('pipeline') || q.includes('drop') || q.includes('stuck')) {
      return {
        diagnosis: `The primary revenue bottleneck is located at the "Consultation Proposed → Deposit Paid" transition. Currently, 18 qualified inquiries ($19,200 in value) requested time to "consult their spouse" or "think about financing options" and were not followed up within 24 hours.`,
        causes: [
          'High ticket pricing ($2,500+) creates temporary hesitation without upfront flexible payment options',
          'Front desk staff rarely had time to make 3rd and 4th outreach calls manually'
        ],
        immediateAction: 'Launch our 1-click AI Financing Re-Engagement Sequence via WhatsApp to all 18 dormant leads',
        projectedImpact: 'Reclaims ~$14,800 in 7 days'
      };
    }

    if (q.includes('objection') || q.includes('common')) {
      return {
        diagnosis: `The #1 customer objection identified across 186 call transcripts is "Cost & Financing" (41% of inquiries), followed by "Need to ask spouse/partner" (28%) and "Fear of pain/procedure downtime" (16%).`,
        causes: [
          'Patients are interested in premium treatment but unaware of 0% interest monthly financing plans ($149/mo)',
          'Out-of-pocket pricing was discussed before explaining clinical and aesthetic outcomes'
        ],
        immediateAction: 'Instruct Ava AI voice receptionist to present monthly payment figures alongside full procedure costs',
        projectedImpact: '+18% increase in same-call consult bookings'
      };
    }

    if (q.includes('lead source') || q.includes('channel') || q.includes('best')) {
      return {
        diagnosis: `WhatsApp is currently your highest-yield channel with a 38.2% consultation booking rate and $1,840 average ticket value. Inbound phone calls follow closely at 34.0%. Web quiz leads convert at 19.4% unless paired with an instant WhatsApp trigger.`,
        causes: [
          'WhatsApp delivers asynchronous convenience with zero hold times for patients',
          'Rich media sharing (before/after photos, maps) significantly elevates buyer trust'
        ],
        immediateAction: 'Add a persistent WhatsApp floating CTA button across all high-traffic website pages',
        projectedImpact: '+35 to 45 new qualified conversations monthly'
      };
    }

    // Default 10 appointments next week
    return {
      diagnosis: `To secure 10+ additional appointments by next Friday, you have 142 historical cosmetic inquiries in your CRM who received quotes over the last 90 days but never scheduled treatment.`,
      causes: [
        'Dormant leads are frequently ready to buy when presented with priority scheduling windows',
        'Seasonal availability changes create natural urgency for treatments'
      ],
      immediateAction: 'Dispatch the "VIP Priority Calendar Reopening" broadcast to the top 60 highest-scoring dormant leads',
      projectedImpact: 'Anticipated 11 to 14 booked appointments ($16,500+ revenue)'
    };
  }
}

