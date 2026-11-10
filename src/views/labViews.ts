import { state, toast, t } from '../main';
import { topbar } from './patientViews';
import { defaultLabs, defaultSamplePatients } from '../db/sqliteService';

export function labLoginScreen(): string {
  return `
  ${topbar('Lab Login', 'Search your lab to sign in', true)}
  <input class="search-input" placeholder="Search lab name..." oninput="window.filterLabLogin(this.value)">
  <div id="labLoginResults">${labLoginCards(state.labs || defaultLabs)}</div>
  `;
}

export function labLoginCards(list: any[]): string {
  return list.map(l => `
    <div class="card" onclick="window.suhaGo('labPassword', {pendingLab:'${l.id}'})">
      <div style="font-weight:600; font-size:14px; color:var(--teal-deep);">${l.name}</div>
      <div class="fine">${l.area}</div>
    </div>`).join('');
}

export function labPasswordScreen(): string {
  const l = (state.labs || defaultLabs).find((x: any) => x.id === state.pendingLab) || defaultLabs[0];
  return `
  ${topbar('Lab Login', l.name, true)}
  <div class="card">
    <span class="eyebrow">Enter your password</span>
    <input class="search-input" type="password" id="labPwd" placeholder="Password" onkeydown="if(event.key==='Enter') window.submitLabLogin()">
    <button class="btn btn-primary" onclick="window.submitLabLogin()">Login</button>
  </div>
  <div class="fine">Demo mode — any password works.</div>
  `;
}

export function labDashboardScreen(): string {
  const l = (state.labs || defaultLabs).find((x: any) => x.id === state.labId) || defaultLabs[0];
  const myRequests = state.homeCollectionRequests.filter((r: any) => r.lab === l.name);
  return `
  <div class="hero-card">
    <span class="tag tag-marigold" style="margin-bottom:8px; display:inline-block;">${state.labLocation || 'Sivakasi'}</span>
    <h3>${l.name}</h3>
    <p>${l.area} · ${l.timing}</p>
  </div>

  ${myRequests.length ? `
  <span class="eyebrow">🏠 Home collection requests</span>
  ${myRequests.map((r: any, idx: number) => `
    <div class="card">
      <div class="row">
        <div>
          <div style="font-weight:600; font-size:13.5px;">${r.patientName}</div>
          <div class="fine">Requested ${r.date}</div>
        </div>
        <span class="tag ${r.status === 'Collected' ? '' : 'tag-marigold'}">${r.status}</span>
      </div>
      ${r.status === 'Pending' ? `<div class="divider"></div><button class="btn btn-ghost btn-sm" onclick="window.markCollected('${l.name.replace(/'/g, "\\'")}', ${idx})">Mark Sample Collected</button>` : ''}
    </div>`).join('')}
  ` : ''}

  <span class="eyebrow">Upload a report</span>
  <input class="search-input" placeholder="Search patient name..." oninput="window.filterLabPatients(this.value)">
  <div id="labPatientResults">${labPatientCards(state.samplePatients || defaultSamplePatients)}</div>
  `;
}

export function labPatientCards(list: any[]): string {
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
        <span class="tag">${p.reports.length} reports</span>
      </div>
    </div>`).join('');
}

export function labPatientRecordScreen(): string {
  const p = (state.samplePatients || defaultSamplePatients).find((x: any) => x.id === state.labSelPatient) || defaultSamplePatients[0];
  return `
  ${topbar(p.name, p.phone, true)}
  <span class="eyebrow">Existing reports</span>
  ${p.reports.length ? p.reports.map((r: any) => `
    <div class="card">
      <div style="font-weight:600; font-size:13.5px;">${r.name}</div>
      <div class="fine">${r.lab} · ${r.date}</div>
    </div>`).join('') : `<div class="fine">No reports yet.</div>`}

  <span class="eyebrow" style="margin-top:6px; display:block;">Upload new report</span>
  <div class="card">
    <input class="med-input" id="reportName" placeholder="Test name, e.g. Blood Test – CBC">
    <input class="med-input" id="reportDate" placeholder="Date, e.g. 23 Aug 2026" value="23 Aug 2026">
    <button class="btn btn-marigold" onclick="window.uploadReport('${p.id}')">Upload &amp; Send to Patient</button>
  </div>
  <div class="fine">Once uploaded, the report appears instantly in the patient's login and can be shared with their doctor from there.</div>
  `;
}
