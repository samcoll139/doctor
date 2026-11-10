import './styles/main.css';
import { getTranslation } from './i18n';
import { sqliteService, defaultHospitals, defaultDoctors, defaultLabs, defaultPharmacyStock, defaultSamplePatients } from './db/sqliteService';
import {
  patientHome, hospitalSearch, hospitalDetail, doctorDetail, paymentScreen,
  confirmationScreen, myAppointmentsScreen, myPrescriptionsScreen,
  hospitalPharmacyScreen, pharmacyCheckoutScreen, pharmacyOrderConfirmScreen,
  myOrdersScreen, askDoubtScreen, aiAssistantScreen, labLocationScreen,
  labListScreen, myReportsScreen, familyMembersScreen, renderAiChatLog
} from './views/patientViews';
import {
  doctorLoginScreen, doctorPasswordScreen, doctorDashboard, rescheduleScreen,
  myPatientsScreen, patientRecordScreen, patientDoubtsScreen
} from './views/doctorViews';
import {
  labLoginScreen, labPasswordScreen, labDashboardScreen, labPatientRecordScreen
} from './views/labViews';

export interface AppState {
  lang: string;
  persona: 'patient' | 'doctor' | 'lab' | null;
  screen: string;
  history: string[];
  selHospital: string | null;
  selDoctor: string | null;
  selSlot: string | null;
  selReason: string;
  selLab: string | null;
  selPatient: string | null;
  doctorHospital: string | null;
  currentDoctor: any;
  hospitals: any[];
  doctors: any[];
  labs: any[];
  samplePatients: any[];
  myAppointments: any[];
  myPrescriptions: any[];
  myReports: any[];
  myReferrals: any[];
  doctorAppointments: any[];
  referrals: any[];
  familyMembers: any[];
  bookingFor: string;
  homeCollectionRequests: any[];
  pharmacyCart: any[];
  myOrders: any[];
  doubts: any[];
  aiChat: any[];
  aiVoiceLang: string;
  aiSpeakReplies: boolean;
  labLocation: string;
  labId: string | null;
  labSelPatient: string | null;
  pendingDoctorHospital: string | null;
  pendingLab: string | null;
  rescheduleIdx: number | null;
  rescheduleNewTime: string | null;
}

export const state: AppState = {
  lang: 'en',
  persona: null,
  screen: 'appHome',
  history: [],
  selHospital: null,
  selDoctor: null,
  selSlot: null,
  selReason: '',
  selLab: null,
  selPatient: null,
  doctorHospital: null,
  currentDoctor: defaultDoctors[0],
  hospitals: defaultHospitals,
  doctors: defaultDoctors,
  labs: defaultLabs,
  samplePatients: defaultSamplePatients,
  myAppointments: [
    { hospital: 'Sivakasi General Hospital', doctor: 'Dr. R. Kavitha', spec: 'General Physician', date: '25 Aug 2026', time: '09:30 AM', status: 'Upcoming', patientName: 'You', token: 2 }
  ],
  myPrescriptions: [
    { doctor: 'Dr. R. Kavitha', hospital: 'Sivakasi General Hospital', date: '12 Aug 2026', meds: ['Amoxicillin 500mg – 3x/day, 5 days', 'ORS – as needed'] }
  ],
  myReports: [
    { name: 'Blood Test – CBC', date: '10 Aug 2026', lab: 'Sivakasi Diagnostic Centre', sharedWithDoctor: true, accessLog: [{ by: 'Dr. R. Kavitha', role: 'Doctor', time: '12 Aug 2026, 10:20 AM' }] }
  ],
  myReferrals: [],
  doctorAppointments: [
    { patient: 'Muthu Kumar', time: '09:00 AM', reason: 'Fever, follow-up', status: 'Confirmed' },
    { patient: 'Lakshmi Priya', time: '09:30 AM', reason: 'General checkup', status: 'Confirmed' },
    { patient: 'Karthik Raja', time: '11:30 AM', reason: 'Sugar review', status: 'Confirmed' },
  ],
  referrals: [],
  familyMembers: [
    { id: 'self', name: 'You', relation: 'Self', age: 31 }
  ],
  bookingFor: 'You',
  homeCollectionRequests: [],
  pharmacyCart: [],
  myOrders: [],
  doubts: [],
  aiChat: [],
  aiVoiceLang: 'en-IN',
  aiSpeakReplies: true,
  labLocation: '',
  labId: null,
  labSelPatient: null,
  pendingDoctorHospital: null,
  pendingLab: null,
  rescheduleIdx: null,
  rescheduleNewTime: null,
};

export function t(key: string): string {
  return getTranslation(state.lang, key);
}

export function toggleLang() {
  state.lang = state.lang === 'en' ? 'ta' : 'en';
  render();
}

export function go(screen: string, extra?: Partial<AppState>) {
  state.history.push(state.screen);
  if (extra) Object.assign(state, extra);
  state.screen = screen;
  render();
}

export function back() {
  state.screen = state.history.pop() || 'landing';
  render();
}

export function goLanding() {
  state.history = [];
  state.screen = 'landing';
  render();
}

export function setPersona(p: 'patient' | 'doctor' | 'lab') {
  state.persona = p;
  state.history = [];
  if (p === 'patient') state.screen = 'home';
  else if (p === 'doctor') state.screen = state.doctorHospital ? 'doctorDashboard' : 'doctorLogin';
  else state.screen = state.labId ? 'labDashboard' : 'labLogin';
  render();
}

export function toast(msg: string) {
  const host = document.getElementById('toastHost');
  if (!host) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span>✅</span><span>${msg}</span>`;
  host.innerHTML = '';
  host.appendChild(el);
  setTimeout(() => {
    if (host.contains(el)) host.removeChild(el);
  }, 2800);
}

export function priceForMed(medText: string): number {
  const base = medText.split('–')[0].trim().toLowerCase();
  const table: Record<string, number> = {
    paracetamol: 20, amoxicillin: 65, vitamin: 90, ors: 25,
    azithromycin: 110, cetirizine: 30, pantoprazole: 55, calcium: 75
  };
  for (const k in table) {
    if (base.includes(k)) return table[k];
  }
  let sum = 0;
  for (let i = 0; i < base.length; i++) sum += base.charCodeAt(i);
  return 30 + (sum % 90);
}

export function cartTotal(): number {
  return state.pharmacyCart.reduce((s, c) => s + c.price, 0);
}

export function toggleCartItem(name: string, price: number) {
  const idx = state.pharmacyCart.findIndex(c => c.name === name);
  if (idx > -1) {
    state.pharmacyCart.splice(idx, 1);
    toast('Removed from cart');
  } else {
    state.pharmacyCart.push({ name, price });
    toast(name + ' added to cart');
  }
  render();
}

/* AI Assistant */
function buildAiContext(): string {
  const meds = state.myPrescriptions.flatMap((p: any) => p.meds);
  return `You are the in-app AI assistant for "Suha Health Care" — a hospital search, doctor appointment booking, e-prescription and pharmacy app for Sivakasi and nearby towns in Tamil Nadu, India.
Always reply in the same language and script the patient used. Keep answers short and conversational (2-4 sentences max).
${meds.length ? `Patient medicines: ${meds.join(', ')}.` : ''}`;
}

async function sendAiMessage() {
  if (state.aiChat.some((m: any) => m.pending)) return;
  const box = document.getElementById('aiInput') as HTMLTextAreaElement | null;
  if (!box) return;
  const text = box.value.trim();
  if (!text) return;
  box.value = '';
  state.aiChat.push({ role: 'user', content: text });
  state.aiChat.push({ role: 'assistant', content: '', pending: true });
  render();

  try {
    const history = state.aiChat.filter((m: any) => !m.pending).map((m: any) => ({ role: m.role, content: m.content }));
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 800,
        system: buildAiContext(),
        messages: history
      })
    });
    const data = await response.json();
    const reply = ((data && data.content) || []).map((c: any) => c.text || '').join('\n').trim()
      || "I am ready to help you with doctor appointments, medicines and lab reports.";
    state.aiChat = state.aiChat.filter((m: any) => !m.pending);
    state.aiChat.push({ role: 'assistant', content: reply });
    speakAiReply(reply);
  } catch {
    state.aiChat = state.aiChat.filter((m: any) => !m.pending);
    state.aiChat.push({ role: 'assistant', content: 'You can book appointments, view your prescriptions, and order medicines directly in this app!' });
  }
  render();
}

function speakAiReply(text: string) {
  if (!state.aiSpeakReplies || !window.speechSynthesis || !text) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = /[\u0B80-\u0BFF]/.test(text) ? 'ta-IN' : 'en-IN';
  window.speechSynthesis.speak(utter);
}

let aiRecognition: any = null;
function toggleAiMic() {
  const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SR) { toast('Voice input is not supported on this device'); return; }
  if (aiRecognition) { aiRecognition.stop(); return; }
  aiRecognition = new SR();
  aiRecognition.lang = state.aiVoiceLang;
  aiRecognition.onstart = () => {
    const btn = document.getElementById('aiMicBtn');
    if (btn) btn.textContent = '🎙️ Listening…';
  };
  aiRecognition.onresult = (e: any) => {
    const transcript = e.results[0][0].transcript;
    const box = document.getElementById('aiInput') as HTMLTextAreaElement | null;
    if (box) box.value = transcript;
    if (transcript && transcript.trim()) sendAiMessage();
  };
  aiRecognition.onend = () => {
    aiRecognition = null;
    const btn = document.getElementById('aiMicBtn');
    if (btn) btn.textContent = '🎤 Speak';
  };
  aiRecognition.start();
}

/* Expose Global Helpers for HTML event bindings */
(window as any).suhaGo = go;
(window as any).suhaBack = back;
(window as any).suhaToast = toast;
(window as any).setPersona = setPersona;
(window as any).toggleLang = toggleLang;
(window as any).goLanding = goLanding;
(window as any).toggleCartItem = toggleCartItem;
(window as any).sendAiMessage = sendAiMessage;
(window as any).toggleAiMic = toggleAiMic;
(window as any).toggleAiVoiceLang = () => {
  state.aiVoiceLang = state.aiVoiceLang === 'ta-IN' ? 'en-IN' : 'ta-IN';
  render();
};
(window as any).toggleAiSpeakReplies = () => {
  state.aiSpeakReplies = !state.aiSpeakReplies;
  if (!state.aiSpeakReplies && window.speechSynthesis) window.speechSynthesis.cancel();
  render();
};
(window as any).selectSlot = (t: string) => { state.selSlot = t; render(); };
(window as any).captureReasonAndContinue = () => {
  const box = document.getElementById('visitReason') as HTMLTextAreaElement | null;
  state.selReason = box ? box.value.trim() : '';
  go('payment');
};
(window as any).confirmBooking = async () => {
  const d = (state.doctors || defaultDoctors).find((x: any) => x.id === state.selDoctor) || defaultDoctors[0];
  const h = (state.hospitals || defaultHospitals).find((x: any) => x.id === d.hospital) || defaultHospitals[0];
  const newAppt = {
    hospital: h.name,
    doctor: d.name,
    spec: d.spec,
    date: '25 Aug 2026',
    time: state.selSlot || '09:30 AM',
    status: 'Upcoming',
    patientName: state.bookingFor || 'You',
    token: 0,
    reason: state.selReason || ''
  };
  const token = await sqliteService.addAppointment(newAppt);
  newAppt.token = token;
  state.myAppointments.unshift(newAppt);
  go('confirmation');
};
(window as any).orderFromPrescription = (hospitalName: string) => {
  const h = defaultHospitals.find(x => x.name === hospitalName) || defaultHospitals[0];
  go('hospitalPharmacy', { selHospital: h.id });
};
(window as any).confirmPharmacyOrder = () => {
  if (!state.pharmacyCart.length) { toast('Your cart is empty'); return; }
  const h = defaultHospitals.find(x => x.id === state.selHospital);
  const order = {
    id: 'ORD' + (1000 + state.myOrders.length + 1),
    hospital: h ? h.name : 'SuhaCare Pharmacy',
    items: state.pharmacyCart.slice(),
    total: cartTotal(),
    status: 'Preparing',
    date: '23 Aug 2026'
  };
  state.myOrders.unshift(order);
  state.pharmacyCart = [];
  go('pharmacyOrderConfirm');
};
(window as any).postDoubt = async () => {
  const box = document.getElementById('doubtText') as HTMLTextAreaElement | null;
  const q = box ? box.value.trim() : '';
  if (!q) { toast('Type your doubt first'); return; }
  const id = await sqliteService.addDoubt(q);
  state.doubts.unshift({ id, question: q, answer: null, answeredBy: null });
  toast('Your doubt has been posted anonymously');
  render();
};
(window as any).answerDoubt = (id: string) => {
  const box = document.getElementById('ans_' + id) as HTMLTextAreaElement | null;
  const ans = box ? box.value.trim() : '';
  if (!ans) { toast('Type an answer first'); return; }
  const d = state.doubts.find((x: any) => x.id === id);
  if (d) {
    d.answer = ans;
    d.answeredBy = state.currentDoctor ? state.currentDoctor.name : 'Dr. R. Kavitha';
    toast('Answer posted');
    render();
  }
};
(window as any).bookForMember = (name: string) => {
  state.bookingFor = name;
  toast('Booking flow set for ' + name);
  go('hospitalSearch');
};
(window as any).addFamilyMember = () => {
  const nameEl = document.getElementById('famName') as HTMLInputElement | null;
  const relEl = document.getElementById('famRelation') as HTMLInputElement | null;
  const ageEl = document.getElementById('famAge') as HTMLInputElement | null;
  const name = nameEl ? nameEl.value.trim() : '';
  const relation = relEl ? relEl.value.trim() || 'Family' : 'Family';
  const age = ageEl ? ageEl.value.trim() || '—' : '—';
  if (!name) { toast('Enter a name first'); return; }
  state.familyMembers.push({ id: 'fam' + Date.now(), name, relation, age });
  toast(name + ' added to your family profile');
  render();
};
(window as any).requestHomeCollection = (lid: string) => {
  const l = defaultLabs.find(x => x.id === lid) || defaultLabs[0];
  state.homeCollectionRequests.unshift({ patientName: state.bookingFor || 'You', lab: l.name, date: '23 Aug 2026', status: 'Pending' });
  toast('Home sample collection requested from ' + l.name);
};
(window as any).toggleShareReport = (rName: string) => {
  const r = state.myReports.find((x: any) => x.name === rName);
  if (r) {
    r.sharedWithDoctor = !r.sharedWithDoctor;
    toast(r.sharedWithDoctor ? 'Report shared with doctor' : 'Access revoked');
    render();
  }
};
(window as any).filterHospitals = (q: string) => {
  q = q.toLowerCase();
  const list = (state.hospitals || defaultHospitals).filter((h: any) => h.name.toLowerCase().includes(q) || h.area.toLowerCase().includes(q));
  const el = document.getElementById('hospitalResults');
  if (el) el.innerHTML = list.length ? (window as any).hospitalCards(list) : `<div class="empty-state"><h3>No hospitals found</h3></div>`;
};
(window as any).hospitalCards = (list: any[]) => {
  return list.map(h => `
    <div class="card" onclick="window.suhaGo('hospitalDetail', {selHospital:'${h.id}'})">
      <div class="row">
        <div>
          <div style="font-weight:600; font-size:14.5px; color:var(--teal-deep);">${h.name}</div>
          <div class="fine">${h.area}</div>
        </div>
        <span class="tag">${h.distance}</span>
      </div>
      <div class="divider"></div>
      <div class="row">
        <span class="fine">🕒 ${h.timing}</span>
        <span class="fine">${defaultDoctors.filter(d => d.hospital === h.id).length} doctors</span>
      </div>
    </div>`).join('');
};
(window as any).filterDoctorHospitals = (q: string) => {
  q = q.toLowerCase();
  const list = (state.hospitals || defaultHospitals).filter((h: any) => h.name.toLowerCase().includes(q));
  const el = document.getElementById('docHospResults');
  if (el) el.innerHTML = list.length ? (window as any).doctorHospitalCards(list) : `<div class="empty-state"><h3>No hospital found</h3></div>`;
};
(window as any).doctorHospitalCards = (list: any[]) => {
  return list.map(h => `
    <div class="card" onclick="window.suhaGo('doctorPassword', {pendingDoctorHospital:'${h.id}'})">
      <div style="font-weight:600; font-size:14px; color:var(--teal-deep);">${h.name}</div>
      <div class="fine">${h.area}</div>
    </div>`).join('');
};
(window as any).submitDoctorLogin = () => {
  const pwd = (document.getElementById('docPwd') as HTMLInputElement | null)?.value;
  if (!pwd) { toast('Enter your password'); return; }
  state.doctorHospital = state.pendingDoctorHospital;
  state.currentDoctor = defaultDoctors.find(d => d.hospital === state.doctorHospital) || defaultDoctors[0];
  toast('Logged in as ' + state.currentDoctor.name);
  state.history = [];
  go('doctorDashboard');
};
(window as any).selectRescheduleTime = (t: string) => {
  state.rescheduleNewTime = t;
  render();
};
(window as any).confirmReschedule = () => {
  const a = state.doctorAppointments[state.rescheduleIdx || 0];
  if (a && state.rescheduleNewTime) {
    a.time = state.rescheduleNewTime;
    a.status = 'Rescheduled';
    toast(a.patient + ' appointment moved to ' + a.time);
    state.rescheduleNewTime = null;
    back();
  }
};
(window as any).filterPatients = (q: string) => {
  q = q.toLowerCase();
  const list = (state.samplePatients || defaultSamplePatients).filter((p: any) => p.name.toLowerCase().includes(q));
  const el = document.getElementById('patientResults');
  if (el) el.innerHTML = list.length ? (window as any).patientCards(list) : `<div class="empty-state"><h3>No patient found</h3></div>`;
};
(window as any).patientCards = (list: any[]) => {
  return list.map(p => `
    <div class="card" onclick="window.suhaGo('patientRecord', {selPatient:'${p.id}'})">
      <div class="row">
        <div class="row" style="gap:12px;">
          <div class="avatar">${p.name[0]}</div>
          <div>
            <div style="font-weight:600; font-size:14px;">${p.name}</div>
            <div class="fine">Age ${p.age} · Last visit ${p.lastVisit}</div>
          </div>
        </div>
        <span class="tag">${(p.reports || []).length} reports</span>
      </div>
    </div>`).join('');
};
(window as any).doctorViewReport = (pid: string, idx: number) => {
  const p = (state.samplePatients || defaultSamplePatients).find((x: any) => x.id === pid);
  if (p && p.reports[idx]) {
    const r = p.reports[idx];
    if (!r.accessLog) r.accessLog = [];
    r.accessLog.unshift({ by: state.currentDoctor.name, role: 'Doctor', time: 'Just now' });
    toast('Opening ' + r.name);
    render();
  }
};
(window as any).prescribe = (pid: string) => {
  const name = (document.getElementById('medName') as HTMLInputElement | null)?.value.trim();
  const dose = (document.getElementById('medDose') as HTMLInputElement | null)?.value.trim();
  if (!name) { toast('Enter a medicine name first'); return; }
  const p = (state.samplePatients || defaultSamplePatients).find((x: any) => x.id === pid);
  if (p) {
    if (!p.prescriptions) p.prescriptions = [];
    p.prescriptions.unshift({ doctor: state.currentDoctor.name, date: '23 Aug 2026', meds: [`${name}${dose ? ' – ' + dose : ''}`] });
    toast('Prescription sent to ' + p.name + ' app');
    render();
  }
};
(window as any).referPatient = (pid: string) => {
  const doctorId = (document.getElementById('referDoctor') as HTMLSelectElement | null)?.value;
  const reason = (document.getElementById('referReason') as HTMLTextAreaElement | null)?.value.trim() || 'Specialist review recommended';
  const target = defaultDoctors.find(d => d.id === doctorId) || defaultDoctors[0];
  const p = (state.samplePatients || defaultSamplePatients).find((x: any) => x.id === pid);
  if (p) {
    state.referrals.unshift({ patientId: pid, patientName: p.name, doctorId, fromDoctor: state.currentDoctor.name, reason, date: '23 Aug 2026' });
    if (pid === 'p0') {
      state.myReferrals.unshift({ doctorId, doctorName: target.name, spec: target.spec, hospitalName: 'Referred Hospital', fromDoctor: state.currentDoctor.name, reason });
    }
    toast('Referral sent for ' + p.name);
    render();
  }
};
(window as any).doctorLogout = () => {
  state.doctorHospital = null;
  goLanding();
};
(window as any).filterLabLogin = (q: string) => {
  q = q.toLowerCase();
  const list = defaultLabs.filter(l => l.name.toLowerCase().includes(q));
  const el = document.getElementById('labLoginResults');
  if (el) el.innerHTML = list.length ? (window as any).labLoginCards(list) : `<div class="empty-state"><h3>No lab found</h3></div>`;
};
(window as any).labLoginCards = (list: any[]) => {
  return list.map(l => `
    <div class="card" onclick="window.suhaGo('labPassword', {pendingLab:'${l.id}'})">
      <div style="font-weight:600; font-size:14px; color:var(--teal-deep);">${l.name}</div>
      <div class="fine">${l.area}</div>
    </div>`).join('');
};
(window as any).submitLabLogin = () => {
  const pwd = (document.getElementById('labPwd') as HTMLInputElement | null)?.value;
  if (!pwd) { toast('Enter your password'); return; }
  state.labId = state.pendingLab;
  const l = defaultLabs.find(x => x.id === state.labId);
  toast('Logged in as ' + (l ? l.name : 'Lab'));
  state.history = [];
  go('labDashboard');
};
(window as any).markCollected = (labName: string, idxWithinLab: number) => {
  const list = state.homeCollectionRequests.filter((r: any) => r.lab === labName);
  const target = list[idxWithinLab];
  if (target) {
    target.status = 'Collected';
    toast('Marked collected for ' + target.patientName);
    render();
  }
};
(window as any).filterLabPatients = (q: string) => {
  q = q.toLowerCase();
  const list = (state.samplePatients || defaultSamplePatients).filter((p: any) => p.name.toLowerCase().includes(q));
  const el = document.getElementById('labPatientResults');
  if (el) el.innerHTML = list.length ? (window as any).labPatientCards(list) : `<div class="empty-state"><h3>No patient found</h3></div>`;
};
(window as any).labPatientCards = (list: any[]) => {
  return list.map(p => `
    <div class="card" onclick="window.suhaGo('labPatientRecord', {labSelPatient:'${p.id}'})">
      <div class="row">
        <div class="row" style="gap:12px;">
          <div class="avatar">${p.name[0]}</div>
          <div>
            <div style="font-weight:600; font-size:14px;">${p.name}</div>
            <div class="fine">${p.phone}</div>
          </div>
        </div>
        <span class="tag">${(p.reports || []).length} reports</span>
      </div>
    </div>`).join('');
};
(window as any).uploadReport = (pid: string) => {
  const name = (document.getElementById('reportName') as HTMLInputElement | null)?.value.trim();
  const date = (document.getElementById('reportDate') as HTMLInputElement | null)?.value.trim() || '23 Aug 2026';
  if (!name) { toast('Enter a test name first'); return; }
  const p = (state.samplePatients || defaultSamplePatients).find((x: any) => x.id === pid);
  const l = defaultLabs.find(x => x.id === state.labId) || defaultLabs[0];
  if (p) {
    if (!p.reports) p.reports = [];
    p.reports.unshift({ name, date, lab: l.name, sharedWithDoctor: false, accessLog: [] });
    toast('Report uploaded to ' + p.name + ' app');
    render();
  }
};
(window as any).labLogout = () => {
  state.labId = null;
  goLanding();
};

/* Bottom Nav Builders */
function patientNav(): string {
  const items = [
    { id: 'home', icon: '🏠', label: t('navHome') },
    { id: 'hospitalSearch', icon: '🔍', label: t('navSearch') },
    { id: 'myPrescriptions', icon: '💊', label: t('navPresc') },
    { id: 'labLocation', icon: '🧪', label: t('navReports') },
    { id: 'familyMembers', icon: '👨‍👩‍👧', label: t('navFamily') },
  ];
  return items.map(i => `
    <button class="nav-item ${state.screen === i.id ? 'active' : ''}" onclick="state.history=[]; window.suhaGo('${i.id}')">
      <span class="nav-dot">${i.icon}</span>${i.label}
    </button>`).join('');
}

function doctorNav(): string {
  const items = state.doctorHospital ? [
    { id: 'doctorDashboard', icon: '📋', label: t('navToday') },
    { id: 'myPatients', icon: '🗂️', label: t('navPatients') },
    { id: 'patientDoubts', icon: '❓', label: 'Doubts' },
  ] : [];
  const logoutBtn = state.doctorHospital ? `
    <button class="nav-item" onclick="window.doctorLogout()"><span class="nav-dot">↩️</span>${t('navLogout')}</button>` : '';
  return items.map(i => `
    <button class="nav-item ${state.screen === i.id ? 'active' : ''}" onclick="state.history=[]; window.suhaGo('${i.id}')">
      <span class="nav-dot">${i.icon}</span>${i.label}
    </button>`).join('') + logoutBtn;
}

function labNav(): string {
  if (!state.labId) return '';
  return `
    <button class="nav-item ${state.screen === 'labDashboard' ? 'active' : ''}" onclick="state.history=[]; window.suhaGo('labDashboard')">
      <span class="nav-dot">🧪</span>${t('navUpload')}
    </button>
    <button class="nav-item" onclick="window.labLogout()"><span class="nav-dot">↩️</span>${t('navLogout')}</button>
  `;
}

function appHomeScreen(): string {
  return `
  <div style="text-align:center; padding:44px 10px 14px;">
    <div style="font-size:52px;">🩺</div>
    <h1 style="margin:14px 0 6px; color:var(--teal-deep); font-size:24px;">Suha Health Care</h1>
    <p class="fine" style="font-size:14px;">Hospitals, doctors, prescriptions &amp; pharmacy — all in one app, for Sivakasi &amp; nearby towns.</p>
  </div>

  <div class="card">
    <div class="row" style="gap:12px;">
      <div class="icon" style="font-size:24px;">🏥</div>
      <div>
        <div style="font-weight:600; font-size:14px;">Find hospitals &amp; book doctors</div>
        <div class="fine">Search nearby hospitals, pick a specialist, get a token</div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="row" style="gap:12px;">
      <div class="icon" style="font-size:24px;">💊</div>
      <div>
        <div style="font-weight:600; font-size:14px;">Prescriptions &amp; pharmacy</div>
        <div class="fine">Doctor-prescribed medicines, order &amp; pay in-app</div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="row" style="gap:12px;">
      <div class="icon" style="font-size:24px;">❓</div>
      <div>
        <div style="font-weight:600; font-size:14px;">Ask a Doctor</div>
        <div class="fine">Post general health doubts, answered by our doctors — anonymously</div>
      </div>
    </div>
  </div>

  <button class="btn btn-marigold" style="margin-top:20px;" onclick="window.goLanding()">Get Started</button>
  `;
}

function landingScreen(): string {
  return `
  <div style="text-align:center; padding:36px 6px 20px;">
    <div style="font-size:44px;">🩺</div>
    <h2 style="margin:12px 0 4px; color:var(--teal-deep);">${t('welcome')}</h2>
    <p class="fine">${t('chooseHow')}</p>
  </div>
  <div class="card" onclick="window.setPersona('patient')">
    <div style="display:flex; align-items:center; gap:12px;">
      <div class="avatar">🧑</div>
      <div>
        <div style="font-weight:700; font-size:15px; color:var(--teal-deep);">${t('patientLogin')}</div>
        <div class="fine">${t('patientLoginSub')}</div>
      </div>
    </div>
  </div>
  <div class="card" onclick="window.setPersona('doctor')">
    <div style="display:flex; align-items:center; gap:12px;">
      <div class="avatar">🩺</div>
      <div>
        <div style="font-weight:700; font-size:15px; color:var(--teal-deep);">${t('doctorLogin')}</div>
        <div class="fine">${t('doctorLoginSub')}</div>
      </div>
    </div>
  </div>
  <div class="card" onclick="window.setPersona('lab')">
    <div style="display:flex; align-items:center; gap:12px;">
      <div class="avatar">🧪</div>
      <div>
        <div style="font-weight:700; font-size:15px; color:var(--teal-deep);">${t('labLogin')}</div>
        <div class="fine">${t('labLoginSub')}</div>
      </div>
    </div>
  </div>
  `;
}

export function render() {
  const body = document.getElementById('screenBody');
  const nav = document.getElementById('bottomNav');
  const langBtn = document.getElementById('langBtn');
  if (langBtn) langBtn.textContent = t('langBtn');

  if (!body || !nav) return;

  if (state.screen === 'appHome') {
    body.innerHTML = appHomeScreen();
    nav.innerHTML = '';
    body.scrollTop = 0;
    return;
  }
  if (state.screen === 'landing') {
    body.innerHTML = landingScreen();
    nav.innerHTML = '';
    body.scrollTop = 0;
    return;
  }

  // Persona Screen Routers
  if (state.persona === 'patient') {
    switch (state.screen) {
      case 'home': body.innerHTML = patientHome(); break;
      case 'hospitalSearch': body.innerHTML = hospitalSearch(); break;
      case 'hospitalDetail': body.innerHTML = hospitalDetail(); break;
      case 'doctorDetail': body.innerHTML = doctorDetail(); break;
      case 'payment': body.innerHTML = paymentScreen(); break;
      case 'confirmation': body.innerHTML = confirmationScreen(); break;
      case 'myPrescriptions': body.innerHTML = myPrescriptionsScreen(); break;
      case 'hospitalPharmacy': body.innerHTML = hospitalPharmacyScreen(); break;
      case 'pharmacyCheckout': body.innerHTML = pharmacyCheckoutScreen(); break;
      case 'pharmacyOrderConfirm': body.innerHTML = pharmacyOrderConfirmScreen(); break;
      case 'myOrders': body.innerHTML = myOrdersScreen(); break;
      case 'askDoubt': body.innerHTML = askDoubtScreen(); break;
      case 'aiAssistant': body.innerHTML = aiAssistantScreen(); break;
      case 'labLocation': body.innerHTML = labLocationScreen(); break;
      case 'labList': body.innerHTML = labListScreen(); break;
      case 'myReports': body.innerHTML = myReportsScreen(); break;
      case 'myAppointments': body.innerHTML = myAppointmentsScreen(); break;
      case 'familyMembers': body.innerHTML = familyMembersScreen(); break;
      default: body.innerHTML = patientHome();
    }
    nav.innerHTML = patientNav();
  } else if (state.persona === 'doctor') {
    switch (state.screen) {
      case 'doctorLogin': body.innerHTML = doctorLoginScreen(); break;
      case 'doctorPassword': body.innerHTML = doctorPasswordScreen(); break;
      case 'doctorDashboard': body.innerHTML = doctorDashboard(); break;
      case 'reschedule': body.innerHTML = rescheduleScreen(); break;
      case 'myPatients': body.innerHTML = myPatientsScreen(); break;
      case 'patientRecord': body.innerHTML = patientRecordScreen(); break;
      case 'patientDoubts': body.innerHTML = patientDoubtsScreen(); break;
      default: body.innerHTML = state.doctorHospital ? doctorDashboard() : doctorLoginScreen();
    }
    nav.innerHTML = doctorNav();
  } else {
    switch (state.screen) {
      case 'labLogin': body.innerHTML = labLoginScreen(); break;
      case 'labPassword': body.innerHTML = labPasswordScreen(); break;
      case 'labDashboard': body.innerHTML = labDashboardScreen(); break;
      case 'labPatientRecord': body.innerHTML = labPatientRecordScreen(); break;
      default: body.innerHTML = state.labId ? labDashboardScreen() : labLoginScreen();
    }
    nav.innerHTML = labNav();
  }

  body.scrollTop = 0;
}

// Initial mount
document.addEventListener('DOMContentLoaded', () => {
  render();
});
