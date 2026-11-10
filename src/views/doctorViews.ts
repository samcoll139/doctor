import { state, toast, t } from '../main';
import { topbar } from './patientViews';
import { defaultHospitals, defaultDoctors, defaultSamplePatients } from '../db/sqliteService';

export function doctorLoginScreen(): string {
  return `
  ${topbar('Doctor Login', 'Select your hospital to sign in', true)}
  <input class="search-input" placeholder="Search hospital name..." oninput="window.filterDoctorHospitals(this.value)">
  <div id="docHospResults">${doctorHospitalCards(state.hospitals || defaultHospitals)}</div>
  `;
}

export function doctorHospitalCards(list: any[]): string {
  return list.map(h => `
    <div class="card" onclick="window.suhaGo('doctorPassword', {pendingDoctorHospital:'${h.id}'})">
      <div style="font-weight:600; font-size:14px; color:var(--teal-deep);">${h.name}</div>
      <div class="fine">${h.area}</div>
    </div>`).join('');
}

export function doctorPasswordScreen(): string {
  const h = (state.hospitals || defaultHospitals).find((x: any) => x.id === state.pendingDoctorHospital) || defaultHospitals[0];
  return `
  ${topbar('Doctor Login', h.name, true)}
  <div class="card">
    <span class="eyebrow">Enter your password</span>
    <input class="search-input" type="password" id="docPwd" placeholder="Password" onkeydown="if(event.key==='Enter') window.submitDoctorLogin()">
    <button class="btn btn-primary" onclick="window.submitDoctorLogin()">Login</button>
  </div>
  <div class="fine">Demo mode — any password works.</div>
  `;
}

export function doctorDashboard(): string {
  const d = state.currentDoctor || defaultDoctors[0];
  const h = (state.hospitals || defaultHospitals).find((x: any) => x.id === (state.doctorHospital || d.hospital)) || defaultHospitals[0];
  return `
  <div class="hero-card">
    <span class="tag tag-marigold" style="margin-bottom:8px; display:inline-block;">${h.name}</span>
    <h3>${d.name}</h3>
    <p>${d.spec} · Today's OP timing 09:00 AM – 06:00 PM</p>
  </div>
  <div class="row" style="margin-bottom:8px;">
    <span class="eyebrow" style="margin:0;">Today's appointments</span>
    <span class="tag">${state.doctorAppointments.length} patients</span>
  </div>
  ${state.doctorAppointments.map((a: any, idx: number) => `
    <div class="card">
      <div class="row">
        <div class="row" style="gap:12px;">
          <div class="avatar">${a.patient[0]}</div>
          <div>
            <div style="font-weight:600; font-size:14px;">${a.patient}</div>
            <div class="fine">${a.reason}</div>
          </div>
        </div>
        <div style="text-align:right;">
          <div class="mono" style="font-size:12.5px; font-weight:600;">${a.time}</div>
          <div class="tag tag-marigold" style="margin-top:4px;">Token #${idx + 1}</div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="row">
        <span class="tag">${a.status}</span>
        <button class="btn btn-ghost btn-sm" onclick="window.suhaGo('reschedule', {rescheduleIdx:${idx}, rescheduleNewTime:null})">⚠️ Emergency — Change Time</button>
      </div>
    </div>`).join('')}
  `;
}

export function rescheduleScreen(): string {
  const a = state.doctorAppointments[state.rescheduleIdx] || state.doctorAppointments[0];
  const d = state.currentDoctor || defaultDoctors[0];
  const allTimes = d.slots.map((s: any) => s.t);
  const takenTimes = state.doctorAppointments
    .filter((_: any, i: number) => i !== state.rescheduleIdx)
    .map((x: any) => x.time);
  return `
  ${topbar('Change Appointment Time', 'Emergency reschedule', true)}
  <div class="card">
    <div class="row" style="gap:12px;">
      <div class="avatar">${a.patient[0]}</div>
      <div>
        <div style="font-weight:600; font-size:14px;">${a.patient}</div>
        <div class="fine">${a.reason}</div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="row"><span class="fine">Current time</span><span class="mono" style="font-size:12.5px;">${a.time}</span></div>
  </div>
  <span class="eyebrow">Choose from your own appointment timings</span>
  <div class="slot-grid">
    ${allTimes.map((t: string) => {
      const isTaken = takenTimes.includes(t) && t !== a.time;
      const isSelected = state.rescheduleNewTime === t;
      return `<div class="slot ${isTaken ? 'taken' : ''} ${isSelected ? 'selected' : ''}"
        onclick="${isTaken ? '' : `window.selectRescheduleTime('${t}')`}">${t}</div>`;
    }).join('')}
  </div>
  <div class="fine" style="margin-bottom:14px;">These are your own OP timings for today. The patient will be notified on their phone (SMS if offline) the moment you confirm.</div>
  <button class="btn btn-alert" ${state.rescheduleNewTime ? '' : 'style="opacity:0.45; pointer-events:none;"'} onclick="window.confirmReschedule()">
    Confirm New Time${state.rescheduleNewTime ? ' · ' + state.rescheduleNewTime : ''}
  </button>
  `;
}

export function myPatientsScreen(): string {
  return `
  ${topbar('My Patients', 'Search a patient to view their reports', true)}
  <input class="search-input" placeholder="Search patient name..." oninput="window.filterPatients(this.value)">
  <div id="patientResults">${patientCards(state.samplePatients || defaultSamplePatients)}</div>
  `;
}

export function patientCards(list: any[]): string {
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
        <span class="tag">${p.reports.length} reports</span>
      </div>
    </div>`).join('');
}

export function patientRecordScreen(): string {
  const p = (state.samplePatients || defaultSamplePatients).find((x: any) => x.id === state.selPatient) || defaultSamplePatients[0];
  const otherDoctors = (state.doctors || defaultDoctors).filter((dd: any) => dd.id !== (state.currentDoctor ? state.currentDoctor.id : ''));
  return `
  ${topbar(p.name, 'Age ' + p.age + ' · ' + p.phone, true)}
  <span class="eyebrow">Lab reports</span>
  ${p.reports.length ? p.reports.map((r: any, idx: number) => `
    <div class="card">
      <div class="row">
        <div>
          <div style="font-weight:600; font-size:13.5px;">${r.name}</div>
          <div class="fine">${r.lab} · ${r.date}</div>
        </div>
        <button class="btn btn-outline btn-sm" onclick="window.doctorViewReport('${p.id}', ${idx})">View</button>
      </div>
    </div>`).join('') : `<div class="fine">No reports shared yet.</div>`}

  <span class="eyebrow" style="margin-top:6px; display:block;">Prescribe medicine</span>
  <div class="card">
    <input class="med-input" id="medName" placeholder="Medicine name, e.g. Paracetamol 500mg">
    <input class="med-input" id="medDose" placeholder="Dosage, e.g. 2x/day, 5 days">
    <textarea id="medNotes" rows="2" placeholder="Notes for patient (optional)"></textarea>
    <button class="btn btn-marigold" onclick="window.prescribe('${p.id}')">Send Prescription to Patient</button>
  </div>

  ${p.prescriptions && p.prescriptions.length ? `<span class="eyebrow">Past prescriptions</span>` + p.prescriptions.map((pr: any) => `
    <div class="card">
      <div class="fine" style="font-weight:600; color:var(--teal-deep);">${pr.date} · ${pr.doctor}</div>
      ${pr.meds.map((m: string) => `<div class="fine">• ${m}</div>`).join('')}
    </div>`).join('') : ''}

  <span class="eyebrow" style="margin-top:6px; display:block;">⚠️ Refer to a specialist</span>
  <div class="card">
    <select class="search-input" id="referDoctor">
      ${otherDoctors.map((dd: any) => `<option value="${dd.id}">${dd.name} — ${dd.spec}</option>`).join('')}
    </select>
    <textarea id="referReason" rows="2" placeholder="Reason for referral, e.g. Needs cardiology review"></textarea>
    <button class="btn btn-outline" onclick="window.referPatient('${p.id}')">Send Referral</button>
  </div>
  `;
}

export function patientDoubtsScreen(): string {
  const unanswered = state.doubts.filter((d: any) => !d.answer);
  const answered = state.doubts.filter((d: any) => d.answer);
  return `
  ${topbar('Patient Doubts', 'General health questions — asked anonymously, any doctor can answer', true)}
  <span class="eyebrow">🕓 Waiting for answer (${unanswered.length})</span>
  ${unanswered.length ? unanswered.map((d: any) => `
    <div class="card">
      <div class="row"><span class="tag">${d.id}</span><span class="tag tag-marigold">New</span></div>
      <div style="font-weight:600; font-size:13.5px; margin-top:8px;">${d.question}</div>
      <div class="divider"></div>
      <textarea id="ans_${d.id}" rows="2" placeholder="Type your answer..."></textarea>
      <button class="btn btn-marigold btn-sm" style="margin-top:8px;" onclick="window.answerDoubt('${d.id}')">Post Answer</button>
    </div>`).join('') : `<div class="fine" style="margin-bottom:12px;">No pending doubts right now.</div>`}

  ${answered.length ? `
  <span class="eyebrow" style="margin-top:10px; display:block;">✅ Answered</span>
  ${answered.map((d: any) => `
    <div class="card">
      <div class="row"><span class="tag">${d.id}</span><span class="tag">${d.answeredBy}</span></div>
      <div style="font-weight:600; font-size:13.5px; margin-top:8px;">${d.question}</div>
      <div class="divider"></div>
      <div class="fine">${d.answer}</div>
    </div>`).join('')}` : ''}
  `;
}
