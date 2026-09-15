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
  AIAdvisorInsight,
  ObjectionRule
} from '../types';

export const BUSINESS_PRESETS: Record<BusinessCategory, BusinessProfile> = {
  dental: {
    id: 'biz_dental_apex',
    name: 'Apex Dental & Facial Aesthetics',
    category: 'dental',
    tagline: 'Premier Cosmetic Dentistry, Implants & Facial Aesthetics',
    phone: '+1 (555) 438-9200',
    whatsappNumber: '+1 (555) 438-9201',
    email: 'concierge@apexdentalstudio.com',
    website: 'https://apexdentalstudio.com',
    address: '840 Michigan Ave, Suite 600, Chicago, IL',
    personality: 'medical',
    tone: 'Compassionate, authoritative, reassuring, and concierge-level professional',
    greeting: 'Thank you for calling Apex Dental & Facial Aesthetics. This is Ava, your AI patient coordinator. How can I assist with your smile or care today?',
    speakingSpeed: 1.0,
    language: 'en-US',
    brandVocabulary: ['gentle care', 'board-certified specialists', 'same-day emergency', 'digital smile design', 'flexible financing'],
    prohibitedStatements: ['We guarantee painless procedures', 'I will give you an instant 50% discount', 'You will not need insurance', 'The doctor will definitely write a narcotic prescription'],
    afterHoursMessage: 'Our clinical team is currently away, but I can check urgent symptom guidelines or secure your priority appointment slot for tomorrow morning.',
    workingHours: {
      start: '08:00',
      end: '19:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    bufferTimeMinutes: 15,
    services: [
      { id: 'srv_1', name: 'Comprehensive Exam & Digital 3D Imaging', durationMin: 45, price: 220, depositRequired: 50, description: 'Complete periodontal mapping, 3D oral scanning, and preventive diagnostic consult' },
      { id: 'srv_2', name: 'Emergency Toothache & Triage Exam', durationMin: 30, price: 180, depositRequired: 50, description: 'Immediate same-day diagnosis, palliative relief, and restorative treatment plan' },
      { id: 'srv_3', name: 'Invisalign & Clear Aligner Consultation', durationMin: 45, price: 150, depositRequired: 50, description: 'iTero 3D digital smile simulation and customized alignment blueprint' },
      { id: 'srv_4', name: 'Porcelain Veneers & Smile Makeover Consult', durationMin: 60, price: 350, depositRequired: 100, description: 'Bespoke aesthetic facial harmony assessment with Master Ceramicist review' },
      { id: 'srv_5', name: 'Surgical Dental Implant Consultation', durationMin: 60, price: 290, depositRequired: 100, description: 'Bone density evaluation, guided implant placement protocol review' }
    ],
    staff: [
      { id: 'staff_1', name: 'Dr. Aris Thorne, DDS', role: 'Chief Cosmetic Surgeon', email: 'dr.thorne@apexdental.com', phone: '+1 555-438-9211', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200', specialty: 'Prosthodontics & Veneers', appointmentsCount: 142, conversionRate: 84.5, revenueGenerated: 64200 },
      { id: 'staff_2', name: 'Dr. Elena Rostova, DMD', role: 'Implant Specialist', email: 'dr.rostova@apexdental.com', phone: '+1 555-438-9212', avatar: 'https://images.unsplash.com/photo-1594824813637-bf7f6e3c97ea?auto=format&fit=crop&q=80&w=200', specialty: 'Oral Surgery & Implants', appointmentsCount: 118, conversionRate: 79.2, revenueGenerated: 58900 },
      { id: 'staff_3', name: 'Sarah Lin, RDH', role: 'Senior Hygienist & Care Lead', email: 'sarah.lin@apexdental.com', phone: '+1 555-438-9213', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200', specialty: 'Preventive Care & Whitening', appointmentsCount: 185, conversionRate: 91.0, revenueGenerated: 32400 }
    ],
    locations: [
      { id: 'loc_1', name: 'Downtown Magnificent Mile', address: '840 Michigan Ave, Suite 600', city: 'Chicago, IL', phone: '+1 (555) 438-9200', whatsapp: '+1 (555) 438-9201', isPrimary: true },
      { id: 'loc_2', name: 'Lincoln Park Flagship', address: '2104 N Clark St', city: 'Chicago, IL', phone: '+1 (555) 438-9280', whatsapp: '+1 (555) 438-9281', isPrimary: false }
    ],
    qualificationQuestions: [
      { id: 'q_1', question: 'What specific dental concern or procedure are you seeking today?', purpose: 'Service identification & routing', weight: 30 },
      { id: 'q_2', question: 'Are you currently experiencing sharp pain, swelling, or trauma?', purpose: 'Emergency clinical triage', weight: 35 },
      { id: 'q_3', question: 'Have you had dental x-rays taken in the past 12 months?', purpose: 'Diagnostic readiness', weight: 15 },
      { id: 'q_4', question: 'Do you have private dental PPO insurance or are you self-funding with HSA/Financing?', purpose: 'Financial eligibility & checkout plan', weight: 20 }
    ],
    escalationRules: [
      { id: 'esc_1', trigger: 'Patient reports severe facial swelling, difficulty breathing, or traumatic tooth avulsion', action: 'Immediate transfer to on-call surgeon & push emergency alert', notifyStaffId: 'staff_1', severity: 'critical' },
      { id: 'esc_2', trigger: 'Caller specifically asks for legal counsel or billing dispute above $500', action: 'Notify Practice Manager with call summary', notifyStaffId: 'staff_3', severity: 'high' },
      { id: 'esc_3', trigger: 'Caller repeatedly requests a human receptionist', action: 'Polite transfer with 3-second warm handoff briefing', notifyStaffId: 'staff_3', severity: 'medium' }
    ]
  },
  real_estate: {
    id: 'biz_realestate_prime',
    name: 'PrimeHaven Realty & Luxury Estates',
    category: 'real_estate',
    tagline: 'High-Yield Residential Investments & Luxury Penthouses',
    phone: '+1 (555) 890-4100',
    whatsappNumber: '+1 (555) 890-4101',
    email: 'advisory@primehavenrealty.com',
    website: 'https://primehavenrealty.com',
    address: '450 Brickell Ave, Miami, FL',
    personality: 'luxury',
    tone: 'Sophisticated, discreet, market-savvy, and high-energy',
    greeting: 'Welcome to PrimeHaven Realty Private Client Advisory. I am Julian, your AI acquisition coordinator. Are you inquiring about a specific listing or our exclusive private portfolio?',
    speakingSpeed: 1.0,
    language: 'en-US',
    brandVocabulary: ['private treaty', 'off-market acquisitions', 'capital appreciation', 'waterfront acreage', 'proof of funds'],
    prohibitedStatements: ['Guaranteed 30% ROI in one year', 'You do not need an escrow deposit', 'We bypass fair housing disclosures'],
    afterHoursMessage: 'Our brokers are currently hosting private showings, but I can reserve an exclusive VIP walkthrough for tomorrow.',
    workingHours: {
      start: '07:30',
      end: '21:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    bufferTimeMinutes: 30,
    services: [
      { id: 'srv_re_1', name: 'Private Luxury Penthouse Walkthrough', durationMin: 60, price: 0, depositRequired: 0, description: 'Exclusive on-site tour of turnkey residences ($2M - $12M)' },
      { id: 'srv_re_2', name: 'Off-Market Investment Portfolio Consult', durationMin: 45, price: 0, depositRequired: 0, description: 'Institutional and high-net-worth real estate syndicate opportunities' },
      { id: 'srv_re_3', name: 'Comparative Market Valuation & Seller Intake', durationMin: 60, price: 0, depositRequired: 0, description: 'Comprehensive algorithmic CMA and custom marketing strategy' }
    ],
    staff: [
      { id: 'staff_re_1', name: 'Julian Vance', role: 'Managing Broker & Partner', email: 'jvance@primehaven.com', phone: '+1 555-890-4111', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', specialty: 'Waterfront Estates', appointmentsCount: 88, conversionRate: 71.4, revenueGenerated: 184000 }
    ],
    locations: [
      { id: 'loc_re_1', name: 'Brickell HQ', address: '450 Brickell Ave', city: 'Miami, FL', phone: '+1 (555) 890-4100', whatsapp: '+1 (555) 890-4101', isPrimary: true }
    ],
    qualificationQuestions: [
      { id: 'q_re_1', question: 'What target budget range are you working with for your acquisition?', purpose: 'Financial tier qualification', weight: 40 },
      { id: 'q_re_2', question: 'Are you purchasing all-cash or utilizing private jumbo financing?', purpose: 'Liquidity readiness', weight: 30 },
      { id: 'q_re_3', question: 'What is your intended closing timeline (30 days, 60 days, or Q4)?', purpose: 'Urgency velocity', weight: 30 }
    ],
    escalationRules: [
      { id: 'esc_re_1', trigger: 'Prospect indicates verified budget above $5,000,000 all-cash', action: 'Instant SMS alert to Managing Broker phone', notifyStaffId: 'staff_re_1', severity: 'critical' }
    ]
  },
  cosmetic: {
    id: 'biz_cosmetic_lumiere',
    name: 'Lumière Aesthetics & Laser Clinic',
    category: 'cosmetic',
    tagline: 'State-of-the-Art Facial Rejuvenation & Body Contouring',
    phone: '+1 (555) 672-8811',
    whatsappNumber: '+1 (555) 672-8812',
    email: 'info@lumiereclinic.com',
    website: 'https://lumiereclinic.com',
    address: '1200 Rodeo Drive, Beverly Hills, CA',
    personality: 'luxury',
    tone: 'Warm, elegant, meticulous, aesthetic-focused',
    greeting: 'Welcome to Lumière Aesthetics. I am Chloe, your AI concierge. How can we elevate your aesthetic journey today?',
    speakingSpeed: 0.95,
    language: 'en-US',
    brandVocabulary: ['collagen induction', 'customized glow', 'board-certified injector', 'natural rejuvenation'],
    prohibitedStatements: ['Zero recovery time for deep chemical peels', 'Discounts if you pay cash under the table'],
    afterHoursMessage: 'We are closed for evening treatment hours, but our booking coordinator can lock in your treatment slot for tomorrow.',
    workingHours: { start: '09:00', end: '18:30', days: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    bufferTimeMinutes: 20,
    services: [
      { id: 'srv_c_1', name: 'Master Injector Botox & Dysport Assessment', durationMin: 45, price: 400, depositRequired: 100, description: 'Bespoke facial muscle vector mapping and dosage consult' },
      { id: 'srv_c_2', name: 'Morpheus8 RF Microneedling & Skin Tightening', durationMin: 75, price: 950, depositRequired: 200, description: 'Deep subdermal collagen stimulation' }
    ],
    staff: [
      { id: 'staff_c_1', name: 'Dr. Camille Laurent', role: 'Medical Director', email: 'camille@lumiere.com', phone: '+1 555-672-8820', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200', specialty: 'Facial Aesthetics', appointmentsCount: 160, conversionRate: 88.0, revenueGenerated: 92000 }
    ],
    locations: [{ id: 'loc_c_1', name: 'Beverly Hills Flagship', address: '1200 Rodeo Drive', city: 'Beverly Hills, CA', phone: '+1 (555) 672-8811', whatsapp: '+1 (555) 672-8812', isPrimary: true }],
    qualificationQuestions: [{ id: 'q_c_1', question: 'Have you received cosmetic injectables or laser treatments in the past 6 months?', purpose: 'Safety protocol', weight: 50 }],
    escalationRules: [{ id: 'esc_c_1', trigger: 'Adverse reaction reported post-treatment', action: 'Immediate doctor dispatch', notifyStaffId: 'staff_c_1', severity: 'critical' }]
  },
  legal: {
    id: 'biz_legal_vanguard',
    name: 'Vanguard Corporate & Trial Law',
    category: 'legal',
    tagline: 'Strategic Corporate Defense, Commercial Contracts & M&A',
    phone: '+1 (555) 321-7000',
    whatsappNumber: '+1 (555) 321-7001',
    email: 'intake@vanguardlegal.com',
    website: 'https://vanguardlegal.com',
    address: '100 Wall Street, 28th Floor, New York, NY',
    personality: 'professional',
    tone: 'Sharp, discreet, objective, compliance-focused',
    greeting: 'You have reached Vanguard Legal Partners intake. I am Victoria, your AI legal intake coordinator. Please state the nature of your legal matter for confidential routing.',
    speakingSpeed: 1.0,
    language: 'en-US',
    brandVocabulary: ['confidential attorney-client intake', 'conflict check', 'partner review', 'retainer schedule'],
    prohibitedStatements: ['I promise you will win the lawsuit', 'This conversation constitutes formal legal representation'],
    afterHoursMessage: 'Our partners are in trial or counsel sessions. Please provide matter details for conflict clearance.',
    workingHours: { start: '08:30', end: '18:30', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    bufferTimeMinutes: 15,
    services: [
      { id: 'srv_l_1', name: 'Partner Corporate Intake & Strategy Session', durationMin: 60, price: 650, depositRequired: 250, description: 'Evaluation of corporate governance, contracts, or partnership dispute' }
    ],
    staff: [{ id: 'staff_l_1', name: 'Marcus Sterling, Esq.', role: 'Senior Partner', email: 'msterling@vanguard.com', phone: '+1 555-321-7010', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200', specialty: 'Commercial Litigation', appointmentsCount: 65, conversionRate: 76.0, revenueGenerated: 145000 }],
    locations: [{ id: 'loc_l_1', name: 'Financial District', address: '100 Wall Street, 28th Floor', city: 'New York, NY', phone: '+1 (555) 321-7000', whatsapp: '+1 (555) 321-7001', isPrimary: true }],
    qualificationQuestions: [{ id: 'q_l_1', question: 'Who is the opposing entity or party (for our mandatory conflict screening)?', purpose: 'Conflict of interest check', weight: 50 }],
    escalationRules: [{ id: 'esc_l_1', trigger: 'Subpoena, active restraining order or imminent court filing deadline', action: 'Transfer to litigation associate immediately', notifyStaffId: 'staff_l_1', severity: 'critical' }]
  },
  home_services: {
    id: 'biz_hvac_precision',
    name: 'Precision Climate HVAC & Smart Home',
    category: 'home_services',
    tagline: '24/7 Emergency Heating, AC Replacement & Air Quality',
    phone: '+1 (555) 940-1200',
    whatsappNumber: '+1 (555) 940-1201',
    email: 'dispatch@precisionclimate.com',
    website: 'https://precisionclimate.com',
    address: '1500 Industrial Pkwy, Dallas, TX',
    personality: 'friendly',
    tone: 'Prompt, solution-oriented, helpful, transparent',
    greeting: 'Precision Climate 24/7 Emergency Dispatch! I am Sam, your AI service coordinator. Is your system currently cooling or heating?',
    speakingSpeed: 1.05,
    language: 'en-US',
    brandVocabulary: ['licensed master technician', 'upfront flat-rate pricing', 'same-day truck dispatch', '100% satisfaction guarantee'],
    prohibitedStatements: ['We will replace your entire system for free', 'It is 100% guaranteed your compressor is dead without seeing it'],
    afterHoursMessage: 'Our on-call technician is dispatched for emergencies. Let me secure your address and symptoms.',
    workingHours: { start: '00:00', end: '23:59', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    bufferTimeMinutes: 30,
    services: [
      { id: 'srv_h_1', name: 'Emergency Diagnostic & System Safety Audit', durationMin: 60, price: 99, depositRequired: 0, description: 'Complete 34-point electronic check of capacitors, freon, and heat exchanger' },
      { id: 'srv_h_2', name: 'High-Efficiency Heat Pump / AC Replacement Estimate', durationMin: 90, price: 0, depositRequired: 0, description: 'Load calculation and rebates consult' }
    ],
    staff: [{ id: 'staff_h_1', name: 'Dave Cooper', role: 'Lead Field Dispatcher', email: 'dave@precisionclimate.com', phone: '+1 555-940-1210', avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=200', specialty: 'Commercial & Residential HVAC', appointmentsCount: 210, conversionRate: 89.0, revenueGenerated: 78000 }],
    locations: [{ id: 'loc_h_1', name: 'Dallas Metro Dispatch', address: '1500 Industrial Pkwy', city: 'Dallas, TX', phone: '+1 (555) 940-1200', whatsapp: '+1 (555) 940-1201', isPrimary: true }],
    qualificationQuestions: [{ id: 'q_h_1', question: 'Is your heating or cooling system currently non-functional?', purpose: 'Emergency priority', weight: 40 }],
    escalationRules: [{ id: 'esc_h_1', trigger: 'Gas smell reported or CO detector triggering', action: 'Tell customer to evacuate immediately and alert dispatch', notifyStaffId: 'staff_h_1', severity: 'critical' }]
  },
  medical: {
    id: 'biz_med_zenith',
    name: 'Zenith Orthopedics & Sports Rehab',
    category: 'medical',
    tagline: 'Minimally Invasive Joint Restoration & Athletic Performance',
    phone: '+1 (555) 789-3300',
    whatsappNumber: '+1 (555) 789-3301',
    email: 'appointments@zenithortho.com',
    website: 'https://zenithortho.com',
    address: '900 Medical Center Dr, Boston, MA',
    personality: 'medical',
    tone: 'Clinical, empathetic, accurate, patient-first',
    greeting: 'Zenith Orthopedics clinical scheduling. This is Maya, your AI patient navigator. Which joint or injury are you looking to treat?',
    speakingSpeed: 0.98,
    language: 'en-US',
    brandVocabulary: ['fellowship-trained', 'regenerative orthopedics', 'MRI diagnostics', 'rapid recovery pathway'],
    prohibitedStatements: ['You will definitely need surgery', 'Stop taking your prescribed medications'],
    afterHoursMessage: 'Our clinic hours are 8am to 6pm. If you have severe trauma, please dial 911 or visit the nearest ER.',
    workingHours: { start: '08:00', end: '18:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    bufferTimeMinutes: 20,
    services: [
      { id: 'srv_m_1', name: 'New Patient Orthopedic Evaluation & X-Ray', durationMin: 45, price: 320, depositRequired: 50, description: 'Comprehensive musculoskeletal biomechanical testing' }
    ],
    staff: [{ id: 'staff_m_1', name: 'Dr. Rebecca Stern, MD', role: 'Orthopedic Surgeon', email: 'rstern@zenithortho.com', phone: '+1 555-789-3310', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200', specialty: 'Knee & Shoulder Arthroscopy', appointmentsCount: 130, conversionRate: 82.5, revenueGenerated: 112000 }],
    locations: [{ id: 'loc_m_1', name: 'Boston Medical Commons', address: '900 Medical Center Dr', city: 'Boston, MA', phone: '+1 (555) 789-3300', whatsapp: '+1 (555) 789-3301', isPrimary: true }],
    qualificationQuestions: [{ id: 'q_m_1', question: 'How long have you had this joint discomfort or injury?', purpose: 'Chronicity triage', weight: 35 }],
    escalationRules: [{ id: 'esc_m_1', trigger: 'Loss of sensation, open fracture or severe motor impairment', action: 'Advise immediate emergency room referral', notifyStaffId: 'staff_m_1', severity: 'critical' }]
  },
  salon_spa: {
    id: 'biz_spa_aura',
    name: 'Aura Signature Salon & Day Sanctuary',
    category: 'salon_spa',
    tagline: 'Artisan Hair Color, Organic Balayage & Japanese Scalp Spa',
    phone: '+1 (555) 512-3400',
    whatsappNumber: '+1 (555) 512-3401',
    email: 'reception@aurasalon.com',
    website: 'https://aurasalon.com',
    address: '320 SoHo Broadway, New York, NY',
    personality: 'warm',
    tone: 'Chic, welcoming, relaxed, attentive',
    greeting: 'Welcome to Aura Salon & Sanctuary. I am Olivia, your AI booking assistant. Are you looking for hair design, color, or our head spa treatment?',
    speakingSpeed: 1.0,
    language: 'en-US',
    brandVocabulary: ['clean beauty', 'bespoke gloss', 'scalp detox', 'celebrity colorist'],
    prohibitedStatements: ['We will give you free extensions'],
    afterHoursMessage: 'Our stylists are resting their shears for the evening, but I can lock in your appointment slot for this weekend.',
    workingHours: { start: '09:00', end: '20:00', days: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    bufferTimeMinutes: 15,
    services: [{ id: 'srv_s_1', name: 'Balayage & Bespoke Gloss Transformation', durationMin: 150, price: 380, depositRequired: 75, description: 'Dimensional hand-painted lightening with bond protection' }],
    staff: [{ id: 'staff_s_1', name: 'Mia Fontaine', role: 'Creative Director', email: 'mia@aurasalon.com', phone: '+1 555-512-3410', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', specialty: 'Dimensional Color', appointmentsCount: 195, conversionRate: 92.0, revenueGenerated: 48000 }],
    locations: [{ id: 'loc_s_1', name: 'SoHo Flagship', address: '320 SoHo Broadway', city: 'New York, NY', phone: '+1 (555) 512-3400', whatsapp: '+1 (555) 512-3401', isPrimary: true }],
    qualificationQuestions: [{ id: 'q_s_1', question: 'Do you currently have previous box dye or bleach on your hair?', purpose: 'Service duration requirement', weight: 40 }],
    escalationRules: [{ id: 'esc_s_1', trigger: 'Bridal party booking for more than 4 people', action: 'Direct to VIP Event Director', notifyStaffId: 'staff_s_1', severity: 'medium' }]
  },
  auto_dealership: {
    id: 'biz_auto_apex',
    name: 'Apex Motor Group & Exotic Imports',
    category: 'auto_dealership',
    tagline: 'Curated European Performance & Certified Pre-Owned Luxury',
    phone: '+1 (555) 760-8900',
    whatsappNumber: '+1 (555) 760-8901',
    email: 'vip@apexmotorgroup.com',
    website: 'https://apexmotorgroup.com',
    address: '8800 Wilshire Blvd, Los Angeles, CA',
    personality: 'sales-focused',
    tone: 'Polished, energetic, direct, consultative',
    greeting: 'Welcome to Apex Motor Group VIP Sales. I am Harrison, your AI vehicle concierge. Are you scheduling a test drive or inquiring about a specific VIN?',
    speakingSpeed: 1.05,
    language: 'en-US',
    brandVocabulary: ['clean CarFax', 'single-owner certified', 'enclosed carrier delivery', 'competitive trade appraisal'],
    prohibitedStatements: ['Take the car home today without a drivers license'],
    afterHoursMessage: 'Our showroom is closed, but I can hold a 24-hour test drive reservation on any vehicle in stock.',
    workingHours: { start: '09:00', end: '20:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    bufferTimeMinutes: 30,
    services: [{ id: 'srv_a_1', name: 'Executive Test Drive & Trade-In Appraisal', durationMin: 60, price: 0, depositRequired: 0, description: 'Direct highway test drive and live market appraisal' }],
    staff: [{ id: 'staff_a_1', name: 'Harrison Blake', role: 'VP of Sales', email: 'harrison@apexmotors.com', phone: '+1 555-760-8910', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200', specialty: 'Porsche & Aston Martin', appointmentsCount: 90, conversionRate: 68.0, revenueGenerated: 210000 }],
    locations: [{ id: 'loc_a_1', name: 'Wilshire Showroom', address: '8800 Wilshire Blvd', city: 'Beverly Hills, CA', phone: '+1 (555) 760-8900', whatsapp: '+1 (555) 760-8901', isPrimary: true }],
    qualificationQuestions: [{ id: 'q_a_1', question: 'Do you have a vehicle to trade in toward your new purchase?', purpose: 'Trade equity assessment', weight: 30 }],
    escalationRules: [{ id: 'esc_a_1', trigger: 'Customer offers full cash wire today', action: 'Notify General Sales Manager directly', notifyStaffId: 'staff_a_1', severity: 'critical' }]
  },
  education: {
    id: 'biz_edu_summit',
    name: 'Summit Prep Academy & Executive Learning',
    category: 'education',
    tagline: 'Ivy League Admissions Advisory & STEM Elite Tutoring',
    phone: '+1 (555) 441-2000',
    whatsappNumber: '+1 (555) 441-2001',
    email: 'admissions@summitprep.edu',
    website: 'https://summitprep.edu',
    address: '500 Palo Alto Ave, Palo Alto, CA',
    personality: 'professional',
    tone: 'Academic, inspiring, articulate, supportive',
    greeting: 'Summit Prep Academy Admissions. I am Claire, your AI admissions advisor. How can we support your student’s academic trajectory?',
    speakingSpeed: 1.0,
    language: 'en-US',
    brandVocabulary: ['diagnostic baseline', 'tailored syllabus', 'top 1% mentors', 'college matriculation'],
    prohibitedStatements: ['100% guarantee admission to Harvard'],
    afterHoursMessage: 'Our academic counselors are offline, but I can arrange your diagnostic assessment slot.',
    workingHours: { start: '08:00', end: '19:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    bufferTimeMinutes: 15,
    services: [{ id: 'srv_e_1', name: 'Academic Diagnostic & Strategy Consultation', durationMin: 60, price: 180, depositRequired: 50, description: 'Standardized assessment review and roadmap' }],
    staff: [{ id: 'staff_e_1', name: 'Dr. Arthur Chen', role: 'Head of Counseling', email: 'achen@summitprep.edu', phone: '+1 555-441-2010', avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200', specialty: 'STEM & Ivy Admissions', appointmentsCount: 110, conversionRate: 85.0, revenueGenerated: 62000 }],
    locations: [{ id: 'loc_e_1', name: 'Silicon Valley Campus', address: '500 Palo Alto Ave', city: 'Palo Alto, CA', phone: '+1 (555) 441-2000', whatsapp: '+1 (555) 441-2001', isPrimary: true }],
    qualificationQuestions: [{ id: 'q_e_1', question: 'What grade is your student currently entering?', purpose: 'Grade tier placement', weight: 40 }],
    escalationRules: [{ id: 'esc_e_1', trigger: 'National Merit finalist inquiry', action: 'Notify Head of Counseling directly', notifyStaffId: 'staff_e_1', severity: 'high' }]
  },
  b2b_agency: {
    id: 'biz_agency_scalar',
    name: 'Scalar Digital Growth Partners',
    category: 'b2b_agency',
    tagline: 'Performance Paid Media & Revenue Operations for B2B SaaS',
    phone: '+1 (555) 830-5500',
    whatsappNumber: '+1 (555) 830-5501',
    email: 'growth@scalaragency.com',
    website: 'https://scalaragency.com',
    address: '101 California St, San Francisco, CA',
    personality: 'sales-focused',
    tone: 'Data-driven, succinct, ambitious, consultative',
    greeting: 'Scalar Digital Growth Partners. I am Alex, your AI revenue operations lead. What is your current monthly ad spend or pipeline target?',
    speakingSpeed: 1.05,
    language: 'en-US',
    brandVocabulary: ['CAC-to-LTV ratio', 'pipeline velocity', 'attribution modeling', 'paid acquisition flywheel'],
    prohibitedStatements: ['We guarantee 10x ROAS in 7 days for any company'],
    afterHoursMessage: 'Our growth partners are reviewing client dashboards. Let me secure your pipeline audit session.',
    workingHours: { start: '08:00', end: '19:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    bufferTimeMinutes: 30,
    services: [{ id: 'srv_b_1', name: 'B2B Pipeline & Ad Spend Audit', durationMin: 45, price: 0, depositRequired: 0, description: 'Deep dive into funnel leakages and creative fatigue' }],
    staff: [{ id: 'staff_b_1', name: 'Alex Thorne', role: 'Partner & Head of Growth', email: 'alex@scalaragency.com', phone: '+1 555-830-5510', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200', specialty: 'B2B Performance Marketing', appointmentsCount: 75, conversionRate: 74.0, revenueGenerated: 198000 }],
    locations: [{ id: 'loc_b_1', name: 'San Francisco HQ', address: '101 California St', city: 'San Francisco, CA', phone: '+1 (555) 830-5500', whatsapp: '+1 (555) 830-5501', isPrimary: true }],
    qualificationQuestions: [{ id: 'q_b_1', question: 'What is your current monthly marketing ad spend budget?', purpose: 'Account tiering', weight: 50 }],
    escalationRules: [{ id: 'esc_b_1', trigger: 'Prospect ad spend exceeds $50,000/month', action: 'Instant slack alert to agency founders', notifyStaffId: 'staff_b_1', severity: 'critical' }]
  }
};

export const INITIAL_LEADS: LeadCustomer[] = [
  {
    id: 'lead_1',
    name: 'Marcus Sterling',
    phone: '+1 (555) 234-8891',
    email: 'm.sterling@sterlingholdings.com',
    channel: 'phone',
    source: 'Google Business Profile',
    leadScore: 94,
    stage: 'appointment_booked',
    intent: 'Full Smile Makeover & Porcelain Veneers',
    urgency: 'high',
    estimatedValue: 4800,
    actualRevenue: 4800,
    tags: ['High Value', 'Executive', 'Missed Call Recovered'],
    notes: 'Called during peak hours when line was busy. AI recovered within 24s via WhatsApp. Patient verified budget and booked Dr. Thorne consult.',
    createdAt: '2026-09-14 11:42 AM',
    lastInteraction: '2026-09-15 09:15 AM',
    nextFollowUp: '2026-09-16 10:00 AM (Pre-consult reminder)',
    missedCallRecovered: true,
    attributedToAI: true,
    assignedStaffId: 'staff_1',
    locationId: 'loc_1',
    aiSummary: 'High-intent caller inquiring about porcelain veneers for upcoming speaking engagements. Budget approved, deposit paid.',
    conversationHistoryCount: 6,
    qualificationAnswers: {
      'Service': 'Porcelain Veneers (Upper 8)',
      'Timeline': 'Within next 4 weeks',
      'Insurance': 'Self-pay HSA',
      'Pain': 'None - cosmetic upgrade'
    }
  },
  {
    id: 'lead_2',
    name: 'Dr. Priya Patel',
    phone: '+1 (555) 456-1123',
    email: 'priya.patel@biopharma.org',
    channel: 'whatsapp',
    source: 'Meta Ads (Instagram)',
    leadScore: 88,
    stage: 'qualified',
    intent: 'Invisalign & Nightguard for Teeth Grinding',
    urgency: 'medium',
    estimatedValue: 3200,
    tags: ['Invisalign', 'PPO Insurance', 'WhatsApp Lead'],
    notes: 'Interacted with WhatsApp AI at 10:15 PM last night. AI qualified insurance provider and offered Thursday slots.',
    createdAt: '2026-09-14 10:15 PM',
    lastInteraction: '2026-09-15 08:30 AM',
    nextFollowUp: '2026-09-15 04:00 PM (Slot hold confirmation)',
    missedCallRecovered: false,
    attributedToAI: true,
    assignedStaffId: 'staff_1',
    locationId: 'loc_1',
    aiSummary: 'Qualified for adult Invisalign. Prefers late afternoon appointments due to laboratory schedule.',
    conversationHistoryCount: 8
  },
  {
    id: 'lead_3',
    name: 'David Chen',
    phone: '+1 (555) 887-9944',
    email: 'dchen99@gmail.com',
    channel: 'phone',
    source: 'Direct Phone Call',
    leadScore: 98,
    stage: 'appointment_booked',
    intent: 'Severe Lower Molar Throbbing & Emergency Exam',
    urgency: 'emergency',
    estimatedValue: 1250,
    actualRevenue: 1250,
    tags: ['Urgent', 'Same-Day', 'Emergency Triage'],
    notes: 'Voice AI receptionist identified 8/10 pain scale and facial tenderness. Slotted into same-day 2:30 PM buffer with Dr. Rostova.',
    createdAt: '2026-09-15 07:45 AM',
    lastInteraction: '2026-09-15 07:48 AM',
    nextFollowUp: '2026-09-15 02:00 PM (Arrival checklist)',
    missedCallRecovered: false,
    attributedToAI: true,
    assignedStaffId: 'staff_2',
    locationId: 'loc_1',
    aiSummary: 'Emergency dental intake completed in 2m 45s. Confirmed allergy to penicillin and reserved emergency operatory.',
    conversationHistoryCount: 4
  },
  {
    id: 'lead_4',
    name: 'Samantha Ross',
    phone: '+1 (555) 332-9012',
    email: 'sross.design@gmail.com',
    channel: 'website_form',
    source: 'Website Smile Quiz',
    leadScore: 68,
    stage: 'contacted',
    intent: 'In-Office Zoom Laser Teeth Whitening',
    urgency: 'low',
    estimatedValue: 450,
    tags: ['Whitening', 'Follow-Up Sequence Active'],
    notes: 'Submitted form 2 days ago. AI Follow-Up Engine sent personalized video guide and available Saturday openings.',
    createdAt: '2026-09-13 03:20 PM',
    lastInteraction: '2026-09-14 04:00 PM',
    nextFollowUp: '2026-09-16 02:00 PM (Value follow-up)',
    missedCallRecovered: false,
    attributedToAI: true,
    assignedStaffId: 'staff_3',
    locationId: 'loc_1',
    aiSummary: 'Interested in bridal brightening. Comparing prices with neighborhood salons.',
    conversationHistoryCount: 3
  },
  {
    id: 'lead_5',
    name: 'Jonathan Miller',
    phone: '+1 (555) 912-7788',
    email: 'jmiller@millercapital.com',
    channel: 'phone',
    source: 'Google Search Ads',
    leadScore: 82,
    stage: 'qualified',
    intent: 'Single Tooth Dental Implant & Bone Graft',
    urgency: 'medium',
    estimatedValue: 3900,
    tags: ['Implant Lead', 'Needs Second Follow-Up'],
    notes: 'AI spoke with him on phone for 4 mins. Addressed implant longevity objection with clinic clinical success rates.',
    createdAt: '2026-09-12 11:10 AM',
    lastInteraction: '2026-09-14 11:15 AM',
    nextFollowUp: '2026-09-15 03:30 PM (Doctor case study follow-up)',
    missedCallRecovered: false,
    attributedToAI: true,
    assignedStaffId: 'staff_2',
    locationId: 'loc_2',
    aiSummary: 'High purchasing power, wanted reassurance regarding bone grafting healing times. Responded warmly to automated case study text.',
    conversationHistoryCount: 5
  },
  {
    id: 'lead_6',
    name: 'Elena Vasquez',
    phone: '+1 (555) 654-2201',
    email: 'elena.v@outlook.com',
    channel: 'whatsapp',
    source: 'Referral',
    leadScore: 35,
    stage: 're_engagement',
    intent: 'General Checkup & Cleaning',
    urgency: 'low',
    estimatedValue: 250,
    tags: ['Reactivation Target', 'Past Patient 8 Months'],
    notes: 'Enrolled in AI 6-month hygiene recall sequence.',
    createdAt: '2026-08-01 10:00 AM',
    lastInteraction: '2026-09-11 02:00 PM',
    nextFollowUp: '2026-09-18 10:00 AM',
    missedCallRecovered: false,
    attributedToAI: true,
    assignedStaffId: 'staff_3',
    locationId: 'loc_1',
    aiSummary: 'Lapsed patient due for routine checkup. Reactivation campaign dispatched.',
    conversationHistoryCount: 2
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt_1',
    contactId: 'lead_3',
    contactName: 'David Chen',
    contactPhone: '+1 (555) 887-9944',
    serviceId: 'srv_2',
    serviceName: 'Emergency Toothache & Triage Exam',
    staffId: 'staff_2',
    staffName: 'Dr. Elena Rostova, DMD',
    locationId: 'loc_1',
    locationName: 'Downtown Magnificent Mile',
    date: '2026-09-15',
    timeSlot: '02:30 PM',
    durationMin: 30,
    price: 180,
    status: 'confirmed',
    bookedBy: 'ai_phone',
    notes: 'Severe pain lower right molar. Penicillin allergy flagged.',
    calendarSynced: true,
    createdAt: '2026-09-15 07:48 AM'
  },
  {
    id: 'apt_2',
    contactId: 'lead_1',
    contactName: 'Marcus Sterling',
    contactPhone: '+1 (555) 234-8891',
    serviceId: 'srv_4',
    serviceName: 'Porcelain Veneers & Smile Makeover Consult',
    staffId: 'staff_1',
    staffName: 'Dr. Aris Thorne, DDS',
    locationId: 'loc_1',
    locationName: 'Downtown Magnificent Mile',
    date: '2026-09-16',
    timeSlot: '11:00 AM',
    durationMin: 60,
    price: 350,
    status: 'confirmed',
    bookedBy: 'ai_whatsapp',
    notes: 'Recovered missed call lead. Paid $100 reservation deposit.',
    calendarSynced: true,
    createdAt: '2026-09-14 11:55 AM'
  },
  {
    id: 'apt_3',
    contactId: 'lead_2',
    contactName: 'Dr. Priya Patel',
    contactPhone: '+1 (555) 456-1123',
    serviceId: 'srv_3',
    serviceName: 'Invisalign & Clear Aligner Consultation',
    staffId: 'staff_1',
    staffName: 'Dr. Aris Thorne, DDS',
    locationId: 'loc_1',
    locationName: 'Downtown Magnificent Mile',
    date: '2026-09-17',
    timeSlot: '04:30 PM',
    durationMin: 45,
    price: 150,
    status: 'pending',
    bookedBy: 'ai_whatsapp',
    notes: 'Requested late slot. Reminder sequence queued.',
    calendarSynced: true,
    createdAt: '2026-09-15 08:32 AM'
  },
  {
    id: 'apt_4',
    contactId: 'lead_7',
    contactName: 'Chloe Bennett',
    contactPhone: '+1 (555) 771-4920',
    serviceId: 'srv_1',
    serviceName: 'Comprehensive Exam & Digital 3D Imaging',
    staffId: 'staff_3',
    staffName: 'Sarah Lin, RDH',
    locationId: 'loc_2',
    locationName: 'Lincoln Park Flagship',
    date: '2026-09-15',
    timeSlot: '10:00 AM',
    durationMin: 45,
    price: 220,
    status: 'attended',
    bookedBy: 'ai_phone',
    notes: 'New family patient moving to Chicago.',
    calendarSynced: true,
    createdAt: '2026-09-13 09:12 AM'
  }
];

export const INITIAL_CALL_LOGS: CallLog[] = [
  {
    id: 'call_1',
    callerNumber: '+1 (555) 887-9944',
    callerName: 'David Chen',
    direction: 'inbound',
    status: 'completed',
    durationSec: 165,
    timestamp: '2026-09-15 07:45 AM',
    recordingAvailable: true,
    intent: 'Emergency Toothache Triage',
    sentiment: 'urgent',
    urgency: 'emergency',
    language: 'English',
    leadScore: 98,
    summary: 'Caller woke up with acute lower molar pain (8/10). AI checked triage protocol, validated Dr. Rostova availability, and booked 2:30 PM emergency slot with SMS prep instructions.',
    actionTaken: 'Emergency Slot Booked & WhatsApp Directions Dispatched',
    bookedAppointmentId: 'apt_1',
    transcript: [
      { id: 't1', speaker: 'ai', text: 'Thank you for calling Apex Dental & Facial Aesthetics. This is Ava, your AI patient coordinator. How can I assist with your care today?', timestamp: '00:01' },
      { id: 't2', speaker: 'caller', text: 'Hi Ava, I woke up with excruciating pain in my bottom right tooth. It is throbbing and I cannot chew anything.', timestamp: '00:08' },
      { id: 't3', speaker: 'ai', text: 'I am so sorry you are in pain, David. We take dental emergencies very seriously. Do you notice any visible swelling in your cheek or jaw right now?', timestamp: '00:18' },
      { id: 't4', speaker: 'caller', text: 'A little bit of swelling, yes. I took two Tylenol but it barely helped.', timestamp: '00:26' },
      { id: 't5', speaker: 'ai', text: 'Understood. We have an emergency triage block open today at 2:30 PM with Dr. Rostova at our Michigan Avenue clinic. Would you like me to reserve that immediately for you?', timestamp: '00:36' },
      { id: 't6', speaker: 'caller', text: 'Yes please, 2:30 PM works. Please put me down.', timestamp: '00:43' },
      { id: 't7', speaker: 'ai', text: 'You are booked for 2:30 PM with Dr. Rostova. I have sent the confirmation and parking directions to this number via WhatsApp. Please avoid extremely hot or cold drinks until you arrive.', timestamp: '00:55' }
    ]
  },
  {
    id: 'call_2',
    callerNumber: '+1 (555) 234-8891',
    callerName: 'Marcus Sterling',
    direction: 'inbound',
    status: 'missed_recovered',
    durationSec: 0,
    timestamp: '2026-09-14 11:42 AM',
    recordingAvailable: false,
    intent: 'Porcelain Veneers Inquiry',
    sentiment: 'neutral',
    urgency: 'high',
    language: 'English',
    leadScore: 94,
    summary: 'Line was busy with another patient. System immediately registered missed call and triggered AI WhatsApp Recovery within 24 seconds. Lead qualified and booked $4,800 makeover.',
    actionTaken: 'Missed Call Recovered via AI WhatsApp ($4,800 Won)',
    bookedAppointmentId: 'apt_2',
    transcript: []
  },
  {
    id: 'call_3',
    callerNumber: '+1 (555) 912-7788',
    callerName: 'Jonathan Miller',
    direction: 'inbound',
    status: 'completed',
    durationSec: 240,
    timestamp: '2026-09-12 11:10 AM',
    recordingAvailable: true,
    intent: 'Dental Implant Pricing & Longevity',
    sentiment: 'positive',
    urgency: 'medium',
    language: 'English',
    leadScore: 82,
    summary: 'Inquired about cost difference between bridges vs implants. AI cited titanium bio-compatibility, 98% 10-year success rate, and flexible CareCredit financing.',
    actionTaken: 'Sent Clinical Case Study & Financing Calculator via SMS',
    transcript: [
      { id: 'tm1', speaker: 'ai', text: 'Hello! You have reached Apex Dental. How may I help you today?', timestamp: '00:01' },
      { id: 'tm2', speaker: 'caller', text: 'Hi, I need a replacement for a missing upper molar. How much does an implant cost and is it better than a bridge?', timestamp: '00:09' },
      { id: 'tm3', speaker: 'ai', text: 'Great question, Jonathan. A dental implant replaces the root itself, preserving your surrounding bone structure and keeping adjacent healthy teeth untouched, unlike a traditional bridge. Complete implant consultations start at $290 with comprehensive 3D imaging. Would you like me to text you our financing options?', timestamp: '00:28' }
    ]
  },
  {
    id: 'call_4',
    callerNumber: '+1 (555) 601-3829',
    callerName: 'Unknown Caller',
    direction: 'inbound',
    status: 'missed',
    durationSec: 0,
    timestamp: '2026-09-15 01:10 AM',
    recordingAvailable: false,
    intent: 'After-Hours Inquiry',
    sentiment: 'neutral',
    urgency: 'low',
    language: 'English',
    leadScore: 45,
    summary: 'After-hours missed call. Instant SMS recovery message sent with booking link.',
    actionTaken: 'SMS Recovery Dispatched (Pending Response)',
    transcript: []
  }
];

export const INITIAL_WHATSAPP_CHATS: WhatsAppChat[] = [
  {
    id: 'wa_1',
    contactId: 'lead_1',
    contactName: 'Marcus Sterling',
    contactPhone: '+1 (555) 234-8891',
    lastMessage: 'Perfect, deposit is paid. See you Wednesday at 11:00 AM.',
    lastMessageTime: '11:58 AM',
    unreadCount: 0,
    isEscalated: false,
    leadScore: 94,
    stage: 'appointment_booked',
    serviceInterest: 'Porcelain Veneers & Smile Makeover',
    messages: [
      { id: 'm1', sender: 'ai', text: 'Hi Marcus, we noticed we just missed your call at Apex Dental! Our front desk was attending to a patient, but I am Ava, your AI care coordinator. How can I help you today?', time: '11:42 AM', status: 'read' },
      { id: 'm2', sender: 'customer', text: 'Hi Ava! Thanks for the quick text. I was calling because I am interested in doing porcelain veneers on my upper teeth before my keynote in November.', time: '11:44 AM', status: 'read' },
      { id: 'm3', sender: 'ai', text: 'That sounds exciting! Dr. Aris Thorne specializes in custom smile makeovers with digital 3D previews. To help prepare, how many teeth are you hoping to enhance, and have you had veneers in the past?', time: '11:45 AM', status: 'read' },
      { id: 'm4', sender: 'customer', text: 'I am looking at 8 upper teeth. First time doing veneers. What is the consultation cost and when can I see Dr. Thorne?', time: '11:47 AM', status: 'read' },
      { id: 'm5', sender: 'ai', text: 'A comprehensive smile makeover consult with 3D facial imaging is $350, with a $100 deposit that applies directly toward your treatment. Dr. Thorne has openings this Wednesday at 11:00 AM or Thursday at 2:00 PM at our Michigan Ave clinic. Which works best?', time: '11:48 AM', status: 'read' },
      { id: 'm6', sender: 'customer', text: 'Wednesday at 11:00 AM is ideal.', time: '11:50 AM', status: 'read' },
      { id: 'm7', sender: 'ai', text: 'Wonderful! I have reserved Wednesday at 11:00 AM for you. Here is your secure one-click link to complete your $100 reservation: https://apexdental.com/pay/v-9481', time: '11:51 AM', status: 'read' },
      { id: 'm8', sender: 'customer', text: 'Perfect, deposit is paid. See you Wednesday at 11:00 AM.', time: '11:58 AM', status: 'read' }
    ]
  },
  {
    id: 'wa_2',
    contactId: 'lead_2',
    contactName: 'Dr. Priya Patel',
    contactPhone: '+1 (555) 456-1123',
    lastMessage: 'Can I do Thursday afternoon instead?',
    lastMessageTime: '08:30 AM',
    unreadCount: 1,
    isEscalated: false,
    leadScore: 88,
    stage: 'qualified',
    serviceInterest: 'Invisalign & Clear Aligner Consult',
    messages: [
      { id: 'm2_1', sender: 'customer', text: 'Hi! I saw your ad about Invisalign consultation with 3D smile simulation. Does my Delta Dental PPO cover the consult?', time: '10:15 PM', status: 'read' },
      { id: 'm2_2', sender: 'ai', text: 'Good evening Priya! Yes, we are an in-network premier provider for Delta Dental PPO. In most cases, diagnostic orthodontic consults are covered or subject to a minimal co-pay. We can verify your exact subscriber ID in advance.', time: '10:15 PM', status: 'read' },
      { id: 'm2_3', sender: 'customer', text: 'That is great. I work late at the research institute, do you have any appointments after 4:00 PM this week?', time: '10:18 PM', status: 'read' },
      { id: 'm2_4', sender: 'ai', text: 'Certainly! We have Thursday at 4:30 PM or Friday at 5:15 PM with Dr. Thorne. Would you like me to hold Thursday at 4:30 PM for you?', time: '10:19 PM', status: 'read' },
      { id: 'm2_5', sender: 'customer', text: 'Can I do Thursday afternoon instead?', time: '08:30 AM', status: 'delivered' }
    ]
  }
];

export const INITIAL_AUTOMATIONS: AutomationWorkflow[] = [
  {
    id: 'wf_1',
    name: 'Instant Missed Call Recovery & Booking',
    description: 'When an inbound phone call goes unanswered, instantly identifies the caller and sends a contextual WhatsApp/SMS inquiry to capture the lead.',
    category: 'missed_call',
    active: true,
    triggerEvent: 'Phone Call Unanswered / Busy',
    stepsCount: 6,
    runsCount: 384,
    conversionsCount: 92,
    revenueGenerated: 42800,
    nodes: [
      { id: 'n1', type: 'trigger', title: 'Trigger: Missed Call Detected', subtitle: 'Event: Call terminates with status missed / busy', config: { channel: 'voice', thresholdSec: 0 }, iconName: 'PhoneMissed' },
      { id: 'n2', type: 'condition', title: 'Condition: Caller CRM Check', subtitle: 'Check if caller is active patient or new prospect', config: { check: 'is_existing_customer' }, iconName: 'UserCheck' },
      { id: 'n3', type: 'action', title: 'AI Action: Dispatch Warm Recovery SMS/WhatsApp', subtitle: 'Personalized "Noticed we missed you" within 30 seconds', config: { delaySeconds: 25 }, iconName: 'MessageSquare' },
      { id: 'n4', type: 'delay', title: 'Delay: Wait for Response', subtitle: 'Buffer period: 10 minutes', config: { durationMinutes: 10 }, iconName: 'Clock' },
      { id: 'n5', type: 'condition', title: 'Condition: Intent & Lead Score > 75', subtitle: 'Branch if caller specifies clinical service', config: { minScore: 75 }, iconName: 'Sparkles' },
      { id: 'n6', type: 'action', title: 'Action: Offer 2 Real-Time Calendar Openings', subtitle: 'Lock priority slot and notify front desk', config: { autoBook: true }, iconName: 'Calendar' }
    ]
  },
  {
    id: 'wf_2',
    name: 'Dormant Lead 30-Day Re-Engagement Engine',
    description: 'Automatically follows up with prospects who inquired about high-ticket services (Veneers, Implants) but paused before scheduling.',
    category: 're_engagement',
    active: true,
    triggerEvent: 'Lead Stage = Qualified (Inactivity > 14 Days)',
    stepsCount: 5,
    runsCount: 215,
    conversionsCount: 47,
    revenueGenerated: 36400,
    nodes: [
      { id: 'n2_1', type: 'trigger', title: 'Trigger: 14 Days Inactivity', subtitle: 'Qualified lead with no booked appointment', config: { days: 14 }, iconName: 'CalendarClock' },
      { id: 'n2_2', type: 'action', title: 'AI Action: Generate Contextual Value Follow-up', subtitle: 'Share doctor smile preview or financing breakdown', config: { includeFinancing: true }, iconName: 'Bot' },
      { id: 'n2_3', type: 'delay', title: 'Delay: 4 Days', subtitle: 'Respectful spacing between touches', config: { days: 4 }, iconName: 'Clock' },
      { id: 'n2_4', type: 'action', title: 'Action: Send VIP Priority Reservation Link', subtitle: 'Offer waiver of consultation deposit', config: { incentive: 'waived_deposit' }, iconName: 'Send' }
    ]
  },
  {
    id: 'wf_3',
    name: 'Smart Appointment Confirmation & Zero No-Show Safeguard',
    description: 'Multi-stage automated reminder cadence via WhatsApp 48h, 24h, and 2h before the scheduled appointment.',
    category: 'post_appointment',
    active: true,
    triggerEvent: 'Appointment Booked in Schedule',
    stepsCount: 4,
    runsCount: 520,
    conversionsCount: 498,
    revenueGenerated: 89000,
    nodes: [
      { id: 'n3_1', type: 'trigger', title: 'Trigger: Appointment Created', subtitle: 'Status = Confirmed', config: {}, iconName: 'CheckCircle' },
      { id: 'n3_2', type: 'action', title: 'Action: Send Calendar Invite & Intake Link', subtitle: 'WhatsApp message with 1-click Google/Apple Calendar', config: {}, iconName: 'Share2' },
      { id: 'n3_3', type: 'delay', title: 'Delay: 24 Hours Prior to Appointment', subtitle: 'Automatic trigger at T-24h', config: { hoursPrior: 24 }, iconName: 'Clock' },
      { id: 'n3_4', type: 'action', title: 'Action: AI 2-Way Confirmation Request', subtitle: 'Customer replies "1" to confirm or "2" to reschedule', config: {}, iconName: 'MessageCircle' }
    ]
  }
];

export const INITIAL_CAMPAIGNS: CampaignItem[] = [
  {
    id: 'cmp_1',
    name: 'Autumn Cosmetic Makeover VIP Reactivation',
    targetCriteria: 'All cosmetic inquiries in the last 6 months who did not book (Lead Score 60+)',
    audienceCount: 142,
    status: 'active',
    sentCount: 142,
    repliedCount: 68,
    bookedCount: 29,
    revenueRecovered: 38700,
    createdDate: '2026-09-01',
    templateMessage: 'Hi {{name}}, Dr. Thorne is opening 10 priority slots this month for 3D digital smile previews. As you previously inquired about veneers, we have reserved a complimentary scan for you this week.'
  },
  {
    id: 'cmp_2',
    name: 'Q3 Dental Hygiene & Checkup Recall',
    targetCriteria: 'Existing patients with no visit in 7+ months',
    audienceCount: 310,
    status: 'completed',
    sentCount: 310,
    repliedCount: 184,
    bookedCount: 112,
    revenueRecovered: 24640,
    createdDate: '2026-08-15',
    templateMessage: 'Hi {{name}}, Sarah from Apex Dental here! It has been 6 months since your last cleaning. Keeping your gums healthy prevents costly future repairs. Reply "BOOK" to see this week\'s times.'
  }
];

export const INITIAL_FAQS: KnowledgeFAQ[] = [
  {
    id: 'faq_1',
    question: 'How much do porcelain veneers cost at Apex Dental?',
    answer: 'Our custom porcelain veneers range from $1,400 to $2,200 per tooth depending on the material and ceramic complexity. We offer flexible zero-interest financing through CareCredit and Sunbit, starting at $129/month.',
    category: 'Pricing & Financing',
    usageCount: 284
  },
  {
    id: 'faq_2',
    question: 'Do you accept dental insurance?',
    answer: 'Yes! We are an in-network PPO provider for Delta Dental, Cigna, Aetna, MetLife, and Guardian. For out-of-network plans, our team files claims directly on your behalf to maximize your annual benefits.',
    category: 'Insurance',
    usageCount: 412
  },
  {
    id: 'faq_3',
    question: 'What is your emergency appointment policy?',
    answer: 'We reserve emergency buffer blocks every day between 8:00 AM and 6:00 PM for acute pain, broken teeth, or oral trauma. Patients are seen same-day with digital x-rays and immediate pain relief.',
    category: 'Clinical Care',
    usageCount: 195
  },
  {
    id: 'faq_4',
    question: 'Where can I park when visiting the Michigan Avenue clinic?',
    answer: 'Validated indoor valet parking is available inside the building at 840 N Michigan Ave (entrance on Chestnut St). We validate parking for 2 hours for all patients.',
    category: 'Location & Parking',
    usageCount: 167
  }
];

export const INITIAL_DOCS: KnowledgeDoc[] = [
  { id: 'doc_1', fileName: 'Apex_Dental_Clinical_Fee_Schedule_2026.pdf', category: 'Pricing', fileSize: '1.4 MB', uploadDate: '2026-08-10', tokensIndexed: 14200, status: 'ready' },
  { id: 'doc_2', fileName: 'Emergency_Triage_Clinical_Protocol_v4.pdf', category: 'Clinical Guidelines', fileSize: '850 KB', uploadDate: '2026-08-12', tokensIndexed: 8900, status: 'ready' },
  { id: 'doc_3', fileName: 'Invisalign_Provider_FAQ_&_Contraindications.docx', category: 'Treatment Protocols', fileSize: '620 KB', uploadDate: '2026-08-15', tokensIndexed: 5400, status: 'ready' }
];

export const INITIAL_METRICS: BusinessMetrics = {
  totalLeads: 418,
  leadsContacted: 412,
  qualifiedLeads: 294,
  hotLeads: 142,
  appointmentsBooked: 186,
  appointmentsCompleted: 154,
  customersWon: 138,
  totalRevenue: 184500,
  aiAttributedRevenue: 128400,
  missedCalls: 86,
  missedCallsRecovered: 64,
  missedRevenueRecovered: 48600,
  followUpRevenue: 34200,
  potentialRevenueAtRisk: 19200,
  conversionRate: 33.0,
  avgCustomerValue: 1336,
  revenuePerLead: 441,
  avgResponseTimeSec: 14,
  noShowRate: 3.8,
  qualityScore: {
    accuracy: 98.2,
    responseQuality: 96.4,
    leadQualification: 94.0,
    bookingSuccess: 89.5,
    overall: 94.5
  }
};

export const INITIAL_INSIGHTS: AIAdvisorInsight[] = [
  {
    id: 'ins_1',
    type: 'opportunity',
    title: 'High-Value Tuesday Surge Detected',
    metric: '42% higher conversion',
    description: 'Tuesdays between 5:00 PM and 8:00 PM generate your highest-intent cosmetic leads ($2,800 avg deal size). Your phone AI is currently handling 91% of these queries seamlessly.',
    financialImpact: 14200,
    actionText: 'View Time-Slot Analytics',
    actionRoute: 'analytics'
  },
  {
    id: 'ins_2',
    type: 'warning',
    title: '18 Uncontacted Second Follow-ups',
    metric: '$19,200 At Risk',
    description: '18 qualified prospects from last week have not received their second automated touchpoint. Launching the AI Follow-Up sequence now has an estimated 35% conversion recovery.',
    financialImpact: 19200,
    actionText: 'Trigger 1-Click AI Follow-Up',
    actionRoute: 'campaigns'
  },
  {
    id: 'ins_3',
    type: 'win',
    title: 'Missed Call Recovery Yields 74.4% Win Rate',
    metric: '+$48,600 Recaptured',
    description: 'By responding within 24 seconds via WhatsApp, the AI converted 64 missed calls into booked procedures this month that would have otherwise gone to local competitors.',
    financialImpact: 48600,
    actionText: 'Review Recovered Calls',
    actionRoute: 'calls'
  },
  {
    id: 'ins_4',
    type: 'recommendation',
    title: 'Enable Sunday Morning AI Booking',
    metric: '+12 Weekly Consults',
    description: '14 callers hung up on Sundays when voicemail was active. Enabling 24/7 AI Phone Booking will capture an estimated $16,000 in additional monthly revenue.',
    financialImpact: 16000,
    actionText: 'Update Hours & Personality',
    actionRoute: 'settings'
  }
];

export const INITIAL_OBJECTIONS: ObjectionRule[] = [
  {
    id: 'obj_1',
    objection: 'Too expensive / Out of budget',
    category: 'price',
    aiGuidance: 'Acknowledge transparently without making up discounts. Highlight tiered treatment plans, long-term longevity, and 0% monthly financing.',
    approvedScript: 'We believe premium dental care should be accessible and transparent. In addition to our master ceramicist warranties, we partner with CareCredit and Sunbit to offer flexible payments starting as low as $129/month. Would you like to review those options during your consult?',
    neverDo: 'Never offer an unauthorized instant cash discount or guarantee insurance will pay 100%.'
  },
  {
    id: 'obj_2',
    objection: 'I need to check with my spouse or partner first',
    category: 'decision_maker',
    aiGuidance: 'Validate their partnership decision warmly. Offer to send a digital smile portfolio and summary they can review together over dinner.',
    approvedScript: 'Of course! It is so important that both of you feel 100% confident in the treatment plan. Would it be helpful if I texted you our smile preview gallery and treatment breakdown so you can review it together?',
    neverDo: 'Never pressure or dismiss the need to discuss with family.'
  },
  {
    id: 'obj_3',
    objection: 'I need to think about it / Not ready right now',
    category: 'timing',
    aiGuidance: 'Remove pressure immediately. Offer to place a gentle reminder or send educational material.',
    approvedScript: 'Take all the time you need! There is zero pressure. Would you like me to hold a tentative slot or simply check back in with you next Tuesday to see if you have any questions?',
    neverDo: 'Never send spam messages daily if they asked for breathing room.'
  },
  {
    id: 'obj_4',
    objection: 'I am comparing with another clinic nearby',
    category: 'comparison',
    aiGuidance: 'Commend their thoroughness. Highlight unique clinic differentiators (3D digital scanning, board-certified specialists, warranty) without badmouthing competitors.',
    approvedScript: 'Doing your research is smart! What makes our clinic unique is that Dr. Thorne performs all cosmetic smile simulations using 3D digital oral scanning and custom hand-layered ceramics with a 5-year guarantee.',
    neverDo: 'Never criticize or demean other local practitioners.'
  }
];
