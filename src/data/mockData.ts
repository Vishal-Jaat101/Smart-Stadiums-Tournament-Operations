// CONCOURSE Smart Stadium Operations - Grounding Data Layer

export interface Venue {
  id: string;
  name: string;
  location: string;
  altitude?: string;
  weatherDetails: string;
  environmentalRisk: string;
  cyberRiskScore: number;
  dominantIncidents: string[];
  peakIncidentWindow: string;
  wasteDiversionRate: string;
  capacity: number;
  initialGates: GateStatus[];
}

export interface GateStatus {
  id: string;
  name: string;
  section: string;
  occupancy: number; // Percentage
  status: 'safe' | 'warning' | 'critical';
  ingressRate: number; // fans per minute
  egressRate: number; // fans per minute
  isClosed: boolean;
}

export interface MatchTimelineEvent {
  date: string;
  match: string;
  venueName: string;
  outcome: string;
  egressStressCase: boolean;
}

export interface CyberThreat {
  vector: string;
  actorClass: string;
  targetSurface: string;
  severity: 'High' | 'Medium' | 'Low-Medium';
}

export interface TransitLine {
  id: string;
  name: string;
  load: number; // current passengers
  capacity: number; // max passengers
  status: 'normal' | 'delayed' | 'overloaded';
  etaMinutes: number;
}

// Seed venues using real data from Section 3
export const VENUES: Venue[] = [
  {
    id: 'dallas',
    name: 'AT&T Stadium',
    location: 'Dallas, USA',
    weatherDetails: 'Extreme heat (95-100°F sustained)',
    environmentalRisk: 'High core temp risk threshold near 40°C',
    cyberRiskScore: 65,
    dominantIncidents: ['dehydration', 'heat stress', 'parking fraud'],
    peakIncidentWindow: '2:00 PM - 6:00 PM',
    wasteDiversionRate: '68%',
    capacity: 80000,
    initialGates: [
      { id: 'A', name: 'Gate A', section: 'Sec 100-110', occupancy: 42, status: 'safe', ingressRate: 150, egressRate: 0, isClosed: false },
      { id: 'B', name: 'Gate B', section: 'Sec 111-120', occupancy: 78, status: 'warning', ingressRate: 310, egressRate: 0, isClosed: false },
      { id: 'C', name: 'Gate C', section: 'Sec 121-130', occupancy: 94, status: 'critical', ingressRate: 480, egressRate: 0, isClosed: false },
      { id: 'D', name: 'Gate D', section: 'Sec 131-140', occupancy: 51, status: 'safe', ingressRate: 180, egressRate: 0, isClosed: false },
      { id: 'E', name: 'Gate E', section: 'Sec 141-150', occupancy: 30, status: 'safe', ingressRate: 90, egressRate: 0, isClosed: false },
      { id: 'F', name: 'Gate F', section: 'Sec 151-160', occupancy: 62, status: 'safe', ingressRate: 210, egressRate: 0, isClosed: false },
    ]
  },
  {
    id: 'azteca',
    name: 'Azteca Stadium',
    location: 'Mexico City, Mexico',
    altitude: '2,240m altitude',
    weatherDetails: 'Altitude-induced hypoxic stress',
    environmentalRisk: 'Hypoxia & breathing fatigue risk',
    cyberRiskScore: 79, // High Risk Tier
    dominantIncidents: ['organized fraud', 'theft', 'theft from vehicles'],
    peakIncidentWindow: '6:00 PM - 10:00 PM', // Overlaps match/egress
    wasteDiversionRate: '55%',
    capacity: 87520,
    initialGates: [
      { id: 'A', name: 'Gate A', section: 'Sec 100-110', occupancy: 88, status: 'warning', ingressRate: 290, egressRate: 0, isClosed: false },
      { id: 'B', name: 'Gate B', section: 'Sec 111-120', occupancy: 96, status: 'critical', ingressRate: 510, egressRate: 0, isClosed: false },
      { id: 'C', name: 'Gate C', section: 'Sec 121-130', occupancy: 91, status: 'critical', ingressRate: 440, egressRate: 0, isClosed: false },
      { id: 'D', name: 'Gate D', section: 'Sec 131-140', occupancy: 40, status: 'safe', ingressRate: 110, egressRate: 0, isClosed: false },
      { id: 'E', name: 'Gate E', section: 'Sec 141-150', occupancy: 45, status: 'safe', ingressRate: 130, egressRate: 0, isClosed: false },
      { id: 'F', name: 'Gate F', section: 'Sec 151-160', occupancy: 70, status: 'warning', ingressRate: 250, egressRate: 0, isClosed: false },
    ]
  },
  {
    id: 'atlanta',
    name: 'Mercedes-Benz Stadium',
    location: 'Atlanta, USA',
    weatherDetails: 'Climate-controlled roof open',
    environmentalRisk: 'High humidity external conditions',
    cyberRiskScore: 48,
    dominantIncidents: ['ticket disputes', 'food court backups'],
    peakIncidentWindow: '4:00 PM - 8:00 PM',
    wasteDiversionRate: '92%', // 90%+ diversion from landfill
    capacity: 71000,
    initialGates: [
      { id: 'A', name: 'Gate A', section: 'Sec 100-110', occupancy: 35, status: 'safe', ingressRate: 120, egressRate: 0, isClosed: false },
      { id: 'B', name: 'Gate B', section: 'Sec 111-120', occupancy: 60, status: 'safe', ingressRate: 220, egressRate: 0, isClosed: false },
      { id: 'C', name: 'Gate C', section: 'Sec 121-130', occupancy: 50, status: 'safe', ingressRate: 190, egressRate: 0, isClosed: false },
      { id: 'D', name: 'Gate D', section: 'Sec 131-140', occupancy: 72, status: 'warning', ingressRate: 280, egressRate: 0, isClosed: false },
      { id: 'E', name: 'Gate E', section: 'Sec 141-150', occupancy: 85, status: 'warning', ingressRate: 350, egressRate: 0, isClosed: false },
      { id: 'F', name: 'Gate F', section: 'Sec 151-160', occupancy: 40, status: 'safe', ingressRate: 140, egressRate: 0, isClosed: false },
    ]
  },
  {
    id: 'metlife',
    name: 'MetLife Stadium',
    location: 'New York/New Jersey, USA',
    weatherDetails: 'Partly cloudy, 78°F',
    environmentalRisk: 'High egress volume congestion (Final Host)',
    cyberRiskScore: 72,
    dominantIncidents: ['counterfeit credentials', 'unauthorized drones'],
    peakIncidentWindow: '5:00 PM - 9:00 PM',
    wasteDiversionRate: '74%',
    capacity: 82500,
    initialGates: [
      { id: 'A', name: 'Gate A', section: 'Sec 100-110', occupancy: 82, status: 'warning', ingressRate: 310, egressRate: 0, isClosed: false },
      { id: 'B', name: 'Gate B', section: 'Sec 111-120', occupancy: 89, status: 'warning', ingressRate: 340, egressRate: 0, isClosed: false },
      { id: 'C', name: 'Gate C', section: 'Sec 121-130', occupancy: 93, status: 'critical', ingressRate: 460, egressRate: 0, isClosed: false },
      { id: 'D', name: 'Gate D', section: 'Sec 131-140', occupancy: 76, status: 'warning', ingressRate: 290, egressRate: 0, isClosed: false },
      { id: 'E', name: 'Gate E', section: 'Sec 141-150', occupancy: 65, status: 'safe', ingressRate: 200, egressRate: 0, isClosed: false },
      { id: 'F', name: 'Gate F', section: 'Sec 151-160', occupancy: 58, status: 'safe', ingressRate: 180, egressRate: 0, isClosed: false },
    ]
  },
  {
    id: 'vancouver',
    name: 'BC Place',
    location: 'Vancouver, Canada',
    weatherDetails: 'Fully covered / climate-controlled dome',
    environmentalRisk: 'Enclosed space airflow management',
    cyberRiskScore: 50,
    dominantIncidents: ['concourse gridlock', 'lost wristbands'],
    peakIncidentWindow: '7:00 PM - 10:00 PM',
    wasteDiversionRate: '81%',
    capacity: 54500,
    initialGates: [
      { id: 'A', name: 'Gate A', section: 'Sec 100-110', occupancy: 60, status: 'safe', ingressRate: 230, egressRate: 0, isClosed: false },
      { id: 'B', name: 'Gate B', section: 'Sec 111-120', occupancy: 65, status: 'safe', ingressRate: 240, egressRate: 0, isClosed: false },
      { id: 'C', name: 'Gate C', section: 'Sec 121-130', occupancy: 87, status: 'warning', ingressRate: 360, egressRate: 0, isClosed: false },
      { id: 'D', name: 'Gate D', section: 'Sec 131-140', occupancy: 92, status: 'critical', ingressRate: 410, egressRate: 0, isClosed: false },
      { id: 'E', name: 'Gate E', section: 'Sec 141-150', occupancy: 40, status: 'safe', ingressRate: 150, egressRate: 0, isClosed: false },
      { id: 'F', name: 'Gate F', section: 'Sec 151-160', occupancy: 48, status: 'safe', ingressRate: 170, egressRate: 0, isClosed: false },
    ]
  },
  {
    id: 'miami',
    name: 'Hard Rock Stadium',
    location: 'Miami, USA',
    weatherDetails: 'Hot & humid (33°C, 82% humidity)',
    environmentalRisk: 'High core temp / lightning watch warning',
    cyberRiskScore: 68,
    dominantIncidents: ['heat exhaustion', 'vip parking fraud', 'tailgating issues'],
    peakIncidentWindow: '3:00 PM - 7:00 PM',
    wasteDiversionRate: '83%',
    capacity: 65300,
    initialGates: [
      { id: 'A', name: 'Gate A', section: 'Sec 100-110', occupancy: 44, status: 'safe', ingressRate: 160, egressRate: 0, isClosed: false },
      { id: 'B', name: 'Gate B', section: 'Sec 111-120', occupancy: 55, status: 'safe', ingressRate: 190, egressRate: 0, isClosed: false },
      { id: 'C', name: 'Gate C', section: 'Sec 121-130', occupancy: 89, status: 'warning', ingressRate: 380, egressRate: 0, isClosed: false },
      { id: 'D', name: 'Gate D', section: 'Sec 131-140', occupancy: 95, status: 'critical', ingressRate: 490, egressRate: 0, isClosed: false },
      { id: 'E', name: 'Gate E', section: 'Sec 141-150', occupancy: 70, status: 'warning', ingressRate: 270, egressRate: 0, isClosed: false },
      { id: 'F', name: 'Gate F', section: 'Sec 151-160', occupancy: 33, status: 'safe', ingressRate: 100, egressRate: 0, isClosed: false },
    ]
  }
];

// Seed knockout results for Extended Egress Demo
export const MATCH_TIMELINE: MatchTimelineEvent[] = [
  { date: 'Jul 2', match: 'USA 2–0 Bosnia & Herzegovina', venueName: 'San Francisco Bay Area Stadium', outcome: 'Regular time', egressStressCase: false },
  { date: 'Jul 3', match: 'Australia 1–1 Egypt (4–2)', venueName: 'AT&T Stadium (Dallas)', outcome: 'Shootout (Extended Egress Window)', egressStressCase: true },
  { date: 'Jul 3', match: 'Argentina 3–2 Cabo Verde', venueName: 'Hard Rock Stadium (Miami)', outcome: 'Overtime (Extended Egress Window)', egressStressCase: true },
  { date: 'Jul 6', match: 'USA 1–4 Belgium', venueName: 'Seattle Stadium', outcome: 'Regular time', egressStressCase: false },
  { date: 'Jul 7', match: 'Switzerland 0–0 Colombia (4–3)', venueName: 'BC Place Vancouver', outcome: 'Shootout (Extended Egress Window)', egressStressCase: true }
];

// Cybersecurity Threat Matrix from Section 3
export const CYBER_THREATS: CyberThreat[] = [
  { vector: 'Hospitality ransomware', actorClass: 'Cybercriminal groups', targetSurface: 'Hotel PMS, keycards, billing', severity: 'High' },
  { vector: 'DDoS', actorClass: 'Hacktivist groups', targetSurface: 'Transit networks, ticketing APIs', severity: 'Medium' },
  { vector: 'Hack-and-leak / doxxing', actorClass: 'Hacktivists & cybercriminals', targetSurface: 'Officials, sponsors, athletes', severity: 'High' },
  { vector: 'Phishing / lookalike domains', actorClass: 'Cybercriminals', targetSurface: 'Fan accounts, FanID portals', severity: 'Medium' },
  { vector: 'QR-code / transport fraud', actorClass: 'Cybercriminals', targetSurface: 'Fans, parking infrastructure', severity: 'Medium' } // Low-Medium per fan, cumulative High
];

// Transit Logistics nodes
export const TRANSIT_LINES: TransitLine[] = [
  { id: 'T1', name: 'Metro Red Line (Stadium Express)', load: 4200, capacity: 5000, status: 'normal', etaMinutes: 4 },
  { id: 'T2', name: 'Metro Green Line (East Shuttle)', load: 4900, capacity: 4800, status: 'overloaded', etaMinutes: 2 },
  { id: 'T3', name: 'Express Bus Route 404', load: 850, capacity: 1200, status: 'normal', etaMinutes: 9 },
  { id: 'T4', name: 'Rideshare Hub Zone 1 (West Lot)', load: 1800, capacity: 2500, status: 'normal', etaMinutes: 6 },
  { id: 'T5', name: 'Charter Bus Staging Yard B', load: 3100, capacity: 3000, status: 'delayed', etaMinutes: 15 }
];

// Multilingual Mock Scenarios
export interface MultilingualScenario {
  id: string;
  title: string;
  sourceLanguage: string;
  fanQuery: string;
  translation: string;
  affectiveTone: string;
  stressLevel: number; // 0 to 100
  dispatchAgentType: string;
}

export const MULTILINGUAL_SCENARIOS: MultilingualScenario[] = [
  {
    id: 'lost_child',
    title: 'Lost Child',
    sourceLanguage: 'Arabic',
    fanQuery: 'أين يمكنني العثور على ابني؟ لقد فقدته عند البوابة ج. عمره 6 سنوات ويرتدي قميصاً أحمر.',
    translation: 'Where can I find my son? I lost him near Gate C. He is 6 years old and wearing a red shirt.',
    affectiveTone: 'Highly Anxious & Panicked',
    stressLevel: 92,
    dispatchAgentType: 'Security & Family Reunification Agent'
  },
  {
    id: 'heat_medical',
    title: 'Medical Aid (Heat)',
    sourceLanguage: 'Spanish',
    fanQuery: 'Por favor, ayuda. Mi abuelo se siente muy mareado y no puede respirar bien por el calor. Estamos en la sección 124.',
    translation: 'Please help. My grandfather feels very dizzy and cannot breathe well because of the heat. We are in section 124.',
    affectiveTone: 'Distressed & Urgent',
    stressLevel: 88,
    dispatchAgentType: 'Medical & First Aid Custom Agent'
  },
  {
    id: 'ticket_issue',
    title: 'Language Issue',
    sourceLanguage: 'Korean',
    fanQuery: '모바일 티켓이 열리지 않아요. 게이트 C에서 입장이 안 된다고 하는데 영어를 못해서 답답합니다.',
    translation: 'My mobile ticket is not opening. They said I cannot enter Gate C, but I cannot speak English well so it is frustrating.',
    affectiveTone: 'Frustrated & Anxious',
    stressLevel: 65,
    dispatchAgentType: 'Ticketing Resolution Custom Agent'
  },
  {
    id: 'transit_route',
    title: 'Transit Routing',
    sourceLanguage: 'Simplified Chinese',
    fanQuery: '请问去轻轨红线怎么走？我需要赶末班车，这里人太多了，路被堵住了.',
    translation: 'How do I get to the Metro Red Line? I need to catch the last train, but it is too crowded here and the paths are blocked.',
    affectiveTone: 'Hurried & Stressed',
    stressLevel: 75,
    dispatchAgentType: 'Transit & Route Dispatcher Agent'
  }
];
