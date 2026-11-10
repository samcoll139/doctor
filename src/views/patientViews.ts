import { state, go, back, toast, t, priceForMed, cartTotal, toggleCartItem } from '../main';
import { defaultHospitals, defaultDoctors, defaultLabs, defaultPharmacyStock } from '../db/sqliteService';

export function topbar(title: string, sub?: string, showBack: boolean = true): string {
  return `<div class="topbar">
    ${showBack ? `<button class="back-btn" onclick="window.suhaBack()">←</button>` : ''}
    <div><h2>${title}</h2>${sub ? `<div class="sub">${sub}</div>` : ''}</div>
  </div>`;
}

export function patientHome(): string {
  return `
  <div class="hero-card">
    <span class="tag tag-marigold" style="margin-bottom:8px; display:inline-block;">${t('welcome')} 👋</span>
    <h3>${t('heroTitle')}</h3>
    <p>${t('heroSub')}</p>
    <button class="btn btn-marigold" onclick="window.suhaGo('hospitalSearch')">${t('searchHospitals')}</button>
  </div>

  ${state.myReferrals.length ? `
  <span class="eyebrow">⚠️ Referred by your doctor</span>
  ${state.myReferrals.map((r: any) => `
    <div class="card" style="border-color:var(--marigold);">
      <div class="row">
        <div>
          <div style="font-weight:600; font-size:14px;">${r.doctorName}</div>
          <div class="fine">${r.spec} · ${r.hospitalName}</div>
        </div>
        <span class="tag tag-marigold">Referral</span>
      </div>
      <div class="divider"></div>
      <div class="fine" style="margin-bottom:8px;">"${r.reason}" — from ${r.fromDoctor}</div>
      <button class="btn btn-outline btn-sm" onclick="window.suhaGo('doctorDetail', {selDoctor:'${r.doctorId}', selSlot:null, selReason:''})">Book This Appointment</button>
    </div>`).join('')}
  ` : ''}

  <div class="card" style="border-color:var(--teal); margin-top:2px;" onclick="window.suhaGo('aiAssistant')">
    <div class="row" style="gap:12px;">
      <div class="row" style="gap:12px;">
        <div class="icon" style="font-size:22px;">🤖</div>
        <div>
          <div style="font-weight:700; font-size:14px; color:var(--teal-deep);">Suha AI Assistant</div>
          <div class="fine">Ask how to book, what your tablets do, or any doubt — in your own language</div>
        </div>
      </div>
      <span class="tag tag-marigold">New</span>
    </div>
  </div>

  <span class="eyebrow">Quick actions</span>
  <div class="quick-grid">
    <div class="quick-tile" onclick="window.suhaGo('myAppointments')">
      <div class="icon">📅</div>
      <div class="label">${t('quickAppointments')}</div>
    </div>
    <div class="quick-tile" onclick="window.suhaGo('myPrescriptions')">
      <div class="icon">💊</div>
      <div class="label">${t('quickPrescriptions')}</div>
    </div>
    <div class="quick-tile" onclick="window.suhaGo('labLocation')">
      <div class="icon">🧪</div>
      <div class="label">${t('quickReports')}</div>
    </div>
    <div class="quick-tile" onclick="window.suhaGo('familyMembers')">
      <div class="icon">👨‍👩‍👧</div>
      <div class="label">${t('quickFamily')}</div>
    </div>
    <div class="quick-tile" onclick="window.suhaGo('myOrders')">
      <div class="icon">🧾</div>
      <div class="label">Pharmacy Orders</div>
    </div>
    <div class="quick-tile" onclick="window.suhaGo('askDoubt')">
      <div class="icon">❓</div>
      <div class="label">Ask a Doctor</div>
    </div>
  </div>
  <div class="quick-tile" style="margin-bottom:14px;" onclick="window.suhaToast('Emergency line connects to nearest 24×7 hospital')">
    <div class="row" style="gap:10px;">
      <div class="icon">🚑</div>
      <div class="label">${t('quickEmergency')}</div>
    </div>
  </div>

  <span class="eyebrow">Upcoming appointment</span>
  ${state.myAppointments.length ? state.myAppointments.map((a: any) => `
    <div class="card">
      <div class="row">
        <div>
          <div style="font-weight:600; font-size:14px;">${a.doctor} ${a.patientName && a.patientName !== 'You' ? `<span class="tag" style="margin-left:4px;">For ${a.patientName}</span>` : ''}</div>
          <div class="fine">${a.spec} · ${a.hospital}</div>
        </div>
        <span class="tag">${a.status}</span>
      </div>
      <div class="divider"></div>
      <div class="row">
        <span class="mono" style="font-size:12.5px;">📆 ${a.date} · ⏰ ${a.time}</span>
        <span class="tag tag-marigold">🎫 Token #${a.token || 1}</span>
      </div>
      ${a.token && a.token > 1 ? `<div class="fine" style="margin-top:6px;">${a.token - 1} patient(s) ahead of you in the queue.</div>` : ''}
    </div>`).join('') : `<div class="fine">No appointments yet.</div>`}
  <div class="fine" style="margin-top:6px;">🔔 A reminder will be sent to your phone before this appointment. 📶 No app notification? We'll send it as an SMS instead.</div>
  `;
}

export function hospitalSearch(): string {
  return `
  ${topbar('Search Hospitals', 'Nearby suggestions based on your location', true)}
  ${state.bookingFor && state.bookingFor !== 'You' ? `<div class="fine" style="margin-bottom:8px;">Booking for: <strong>${state.bookingFor}</strong></div>` : ''}
  <input class="search-input" id="hospSearchInput" placeholder="Search hospitals, area..." oninput="window.filterHospitals(this.value)">
  <div id="hospitalResults">${hospitalCards(state.hospitals || defaultHospitals)}</div>
  `;
}

export function hospitalCards(list: any[]): string {
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
}

export function hospitalDetail(): string {
  const h = (state.hospitals || defaultHospitals).find((x: any) => x.id === state.selHospital) || defaultHospitals[0];
  const docs = (state.doctors || defaultDoctors).filter((d: any) => d.hospital === h.id);
  return `
  ${topbar(h.name, h.area, true)}
  <div class="card">
    <div class="row">
      <span class="fine">🕒 Hospital timing</span>
      <span class="tag tag-marigold">${h.timing}</span>
    </div>
  </div>
  <div class="card" onclick="window.suhaGo('hospitalPharmacy', {selHospital:'${h.id}'})" style="border-color:var(--marigold);">
    <div class="row">
      <div class="row" style="gap:12px;">
        <div class="icon" style="font-size:22px;">💊</div>
        <div>
          <div style="font-weight:600; font-size:14px;">Hospital Pharmacy</div>
          <div class="fine">Buy prescribed &amp; OTC medicines, pay online</div>
        </div>
      </div>
      <span class="tag tag-marigold">Open</span>
    </div>
  </div>
  <span class="eyebrow">Doctors available here</span>
  ${docs.map((d: any) => `
    <div class="card" onclick="window.suhaGo('doctorDetail', {selDoctor:'${d.id}', selSlot:null, selReason:''})">
      <div class="row">
        <div class="row" style="gap:12px;">
          <div class="avatar">${d.name.split(' ').slice(-1)[0][0]}</div>
          <div>
            <div style="font-weight:600; font-size:14px;">${d.name}</div>
            <div class="fine">${d.spec}</div>
          </div>
        </div>
        <span class="mono" style="font-size:12.5px; color:var(--teal-deep); font-weight:600;">₹${d.fee}</span>
      </div>
    </div>`).join('')}
  `;
}

export function doctorDetail(): string {
  const d = (state.doctors || defaultDoctors).find((x: any) => x.id === state.selDoctor) || defaultDoctors[0];
  const h = (state.hospitals || defaultHospitals).find((x: any) => x.id === d.hospital) || defaultHospitals[0];
  return `
  ${topbar(d.name, d.spec + ' · ' + h.name, true)}
  <div class="card">
    <div class="row">
      <span class="fine">📍 ${h.area}</span>
      <span class="tag tag-marigold">₹${d.fee} fee</span>
    </div>
  </div>
  ${state.bookingFor && state.bookingFor !== 'You' ? `<div class="fine" style="margin-bottom:8px;">Booking for: <strong>${state.bookingFor}</strong></div>` : ''}
  <span class="eyebrow">All available timings today</span>
  <div class="slot-grid">
    ${d.slots.map((s: any) => `
      <div class="slot ${!s.open ? 'taken' : ''} ${state.selSlot === s.t ? 'selected' : ''}"
        onclick="${s.open ? `window.selectSlot('${s.t}')` : ''}">${s.t}</div>
    `).join('')}
  </div>
  <div class="fine" style="margin-bottom:14px;">Greyed-out times are already booked. Select an open slot to continue.</div>
  <span class="eyebrow">Reason for visit (optional)</span>
  <div class="card">
    <textarea id="visitReason" rows="2" placeholder="e.g. Fever, follow-up checkup — leave blank if you'd rather not say">${state.selReason || ''}</textarea>
  </div>
  <button class="btn btn-primary" ${state.selSlot ? '' : 'style="opacity:0.45; pointer-events:none;"'} onclick="window.captureReasonAndContinue()">
    Continue to Book · ${state.selSlot || 'select a time'}
  </button>
  `;
}

export function paymentScreen(): string {
  const d = (state.doctors || defaultDoctors).find((x: any) => x.id === state.selDoctor) || defaultDoctors[0];
  const h = (state.hospitals || defaultHospitals).find((x: any) => x.id === d.hospital) || defaultHospitals[0];
  return `
  ${topbar('Confirm & Pay', 'Booking summary', true)}
  <div class="card">
    <div class="row"><span class="fine">Patient</span><span style="font-weight:600; font-size:13px;">${state.bookingFor || 'You'}</span></div>
    <div class="divider"></div>
    <div class="row"><span class="fine">Doctor</span><span style="font-weight:600; font-size:13px;">${d.name}</span></div>
    <div class="divider"></div>
    <div class="row"><span class="fine">Hospital</span><span class="fine">${h.name}</span></div>
    <div class="divider"></div>
    <div class="row"><span class="fine">Date &amp; time</span><span class="mono" style="font-size:12.5px;">25 Aug 2026 · ${state.selSlot}</span></div>
    <div class="divider"></div>
    ${state.selReason ? `<div class="row"><span class="fine">Reason for visit</span><span style="font-weight:600; font-size:12.5px; text-align:right; max-width:60%;">${state.selReason}</span></div><div class="divider"></div>` : ''}
    <div class="row"><span class="fine">Consultation fee</span><span style="font-weight:700; color:var(--teal-deep);">₹${d.fee}</span></div>
  </div>
  <span class="eyebrow">Pay with</span>
  <div class="card" style="display:flex; gap:10px; align-items:center;">
    <input type="radio" name="pay" checked> <span style="font-size:13.5px;">UPI — GPay / PhonePe / Paytm</span>
  </div>
  <div class="card" style="display:flex; gap:10px; align-items:center;">
    <input type="radio" name="pay"> <span style="font-size:13.5px;">Pay at hospital counter</span>
  </div>
  <button class="btn btn-marigold" onclick="window.confirmBooking()">Pay ₹${d.fee} &amp; Book Appointment</button>
  `;
}

export function confirmationScreen(): string {
  const d = (state.doctors || defaultDoctors).find((x: any) => x.id === state.selDoctor) || defaultDoctors[0];
  const a = state.myAppointments[0] || {};
  return `
  <div style="text-align:center; padding:36px 10px 10px;">
    <div style="font-size:46px;">🎉</div>
    <h2 style="margin:12px 0 6px; color:var(--teal-deep);">Appointment Booked</h2>
    <p class="fine">Your slot with ${d.name} at ${state.selSlot} on 25 Aug 2026 is confirmed${a.patientName !== 'You' ? ' for ' + a.patientName : ''}.</p>
  </div>
  <div class="card">
    <div class="row"><span class="fine">🎫 Your token</span><span class="tag tag-marigold">#${a.token || 1}</span></div>
    <div class="fine" style="margin-top:6px;">${a.token > 1 ? (a.token - 1) + ' patient(s) ahead of you.' : "You're first in the queue."}</div>
  </div>
  ${a.reason ? `<div class="card"><div class="row"><span class="fine">📝 Reason for visit</span></div><div class="fine" style="margin-top:6px;">${a.reason}</div></div>` : ''}
  <div class="card">
    <div class="row"><span class="fine">🔔 Reminder</span><span class="tag">On</span></div>
    <div class="fine" style="margin-top:6px;">We'll send a reminder to your phone before your fixed appointment time. 📶 If app notifications are off, we'll fall back to SMS so you never miss it.</div>
  </div>
  <button class="btn btn-primary" onclick="state.bookingFor='You'; window.suhaGo('home')">Back to Home</button>
  <button class="btn btn-outline" style="margin-top:10px;" onclick="window.suhaGo('myAppointments')">View My Appointments</button>
  `;
}

export function myAppointmentsScreen(): string {
  return `
  ${topbar('My Appointments', 'Upcoming & past visits', true)}
  ${state.myAppointments.length ? state.myAppointments.map((a: any) => `
    <div class="card">
      <div class="row">
        <div>
          <div style="font-weight:600; font-size:14px;">${a.doctor} ${a.patientName && a.patientName !== 'You' ? `<span class="tag" style="margin-left:4px;">For ${a.patientName}</span>` : ''}</div>
          <div class="fine">${a.spec} · ${a.hospital}</div>
        </div>
        <span class="tag">${a.status}</span>
      </div>
      <div class="divider"></div>
      <div class="row">
        <span class="mono" style="font-size:12.5px;">📆 ${a.date} · ⏰ ${a.time}</span>
        <span class="tag tag-marigold">🎫 #${a.token || 1}</span>
      </div>
      ${a.reason ? `<div class="fine" style="margin-top:8px;">📝 ${a.reason}</div>` : ''}
    </div>`).join('') : `<div class="empty-state"><h3>No appointments</h3><p>Book a doctor to see it here.</p></div>`}
  `;
}

export function myPrescriptionsScreen(): string {
  return `
  ${topbar('My Prescriptions', 'Medicines prescribed by your doctors', true)}
  ${state.myPrescriptions.length ? state.myPrescriptions.map((p: any) => `
    <div class="card">
      <div class="row">
        <div>
          <div style="font-weight:600; font-size:14px;">${p.doctor}</div>
          <div class="fine">${p.hospital || ''} ${p.hospital ? '·' : ''} ${p.date}</div>
        </div>
        <span class="tag tag-marigold">💊</span>
      </div>
      <div class="divider"></div>
      ${p.meds.map((m: string) => `<div class="fine">• ${m}</div>`).join('')}
      <div class="divider"></div>
      <button class="btn btn-marigold btn-sm" onclick="window.orderFromPrescription('${(p.hospital || '').replace(/'/g, "\\'")}')">🛒 Order &amp; Pay at Pharmacy</button>
    </div>`).join('') : `<div class="empty-state"><h3>No prescriptions yet</h3><p>After a doctor visit, medicines appear here automatically.</p></div>`}
  `;
}

export function hospitalPharmacyScreen(): string {
  const h = (state.hospitals || defaultHospitals).find((x: any) => x.id === state.selHospital) || defaultHospitals[0];
  const prescribedMeds = state.myPrescriptions.flatMap((p: any) => p.meds.map((m: string) => ({ med: m, doctor: p.doctor })));
  return `
  ${topbar(h.name + ' Pharmacy', 'Order your medicines & pay online', true)}
  ${prescribedMeds.length ? `
  <span class="eyebrow">💊 Prescribed for you</span>
  ${prescribedMeds.map((pm: any) => {
    const price = priceForMed(pm.med);
    const inCart = state.pharmacyCart.some((c: any) => c.name === pm.med);
    return `
    <div class="card">
      <div class="row">
        <div>
          <div style="font-weight:600; font-size:13.5px;">${pm.med}</div>
          <div class="fine">Prescribed by ${pm.doctor}</div>
        </div>
        <span class="mono" style="font-size:12.5px; color:var(--teal-deep); font-weight:600;">₹${price}</span>
      </div>
      <div class="divider"></div>
      <button class="btn ${inCart ? 'btn-ghost' : 'btn-outline'} btn-sm" ${inCart ? 'disabled' : ''} onclick="window.toggleCartItem('${pm.med.replace(/'/g, "\\'")}', ${price})">${inCart ? '✓ Added to Cart' : 'Add to Cart'}</button>
    </div>`;
  }).join('')}
  ` : `<div class="fine" style="margin-bottom:12px;">No prescribed medicines yet — ask your doctor to prescribe, or browse pharmacy stock below.</div>`}

  <span class="eyebrow" style="margin-top:6px; display:block;">🧴 Pharmacy stock</span>
  ${defaultPharmacyStock.map(item => {
    const inCart = state.pharmacyCart.some((c: any) => c.name === item.name);
    return `
    <div class="card">
      <div class="row">
        <div style="font-weight:600; font-size:13.5px;">${item.name}</div>
        <span class="mono" style="font-size:12.5px; color:var(--teal-deep); font-weight:600;">₹${item.price}</span>
      </div>
      <div class="divider"></div>
      <button class="btn ${inCart ? 'btn-ghost' : 'btn-outline'} btn-sm" ${inCart ? 'disabled' : ''} onclick="window.toggleCartItem('${item.name.replace(/'/g, "\\'")}', ${item.price})">${inCart ? '✓ Added to Cart' : 'Add to Cart'}</button>
    </div>`;
  }).join('')}

  ${state.pharmacyCart.length ? `
  <div class="card" style="border-color:var(--teal); margin-top:6px;">
    <div class="row">
      <span class="fine">🛒 ${state.pharmacyCart.length} item(s) in cart</span>
      <span style="font-weight:700; color:var(--teal-deep);">₹${cartTotal()}</span>
    </div>
    <button class="btn btn-marigold" style="margin-top:10px;" onclick="window.suhaGo('pharmacyCheckout')">Review Cart &amp; Pay</button>
  </div>` : ''}
  `;
}

export function pharmacyCheckoutScreen(): string {
  return `
  ${topbar('Confirm & Pay', 'Pharmacy order summary', true)}
  ${state.pharmacyCart.map((c: any) => `
    <div class="card">
      <div class="row">
        <span style="font-weight:600; font-size:13.5px;">${c.name}</span>
        <span class="mono" style="font-size:12.5px; color:var(--teal-deep); font-weight:600;">₹${c.price}</span>
      </div>
    </div>`).join('')}
  <div class="card">
    <div class="row"><span class="fine">Total</span><span style="font-weight:700; color:var(--teal-deep); font-size:15px;">₹${cartTotal()}</span></div>
  </div>
  <span class="eyebrow">Pay with</span>
  <div class="card" style="display:flex; gap:10px; align-items:center;">
    <input type="radio" name="paypharm" checked> <span style="font-size:13.5px;">UPI — GPay / PhonePe / Paytm</span>
  </div>
  <div class="card" style="display:flex; gap:10px; align-items:center;">
    <input type="radio" name="paypharm"> <span style="font-size:13.5px;">Pay at pharmacy counter</span>
  </div>
  <button class="btn btn-marigold" ${state.pharmacyCart.length ? '' : 'style="opacity:0.45; pointer-events:none;"'} onclick="window.confirmPharmacyOrder()">Pay ₹${cartTotal()} &amp; Place Order</button>
  `;
}

export function pharmacyOrderConfirmScreen(): string {
  const o = state.myOrders[0] || {};
  return `
  <div style="text-align:center; padding:36px 10px 10px;">
    <div style="font-size:46px;">💊</div>
    <h2 style="margin:12px 0 6px; color:var(--teal-deep);">Order Placed</h2>
    <p class="fine">Your payment of ₹${o.total} was received. ${o.hospital} pharmacy is preparing your order.</p>
  </div>
  <div class="card">
    <div class="row"><span class="fine">Order ID</span><span class="tag tag-marigold">${o.id}</span></div>
    <div class="divider"></div>
    ${(o.items || []).map((i: any) => `<div class="fine">• ${i.name} — ₹${i.price}</div>`).join('')}
  </div>
  <button class="btn btn-primary" onclick="window.suhaGo('home')">Back to Home</button>
  <button class="btn btn-outline" style="margin-top:10px;" onclick="window.suhaGo('myOrders')">View My Orders</button>
  `;
}

export function myOrdersScreen(): string {
  return `
  ${topbar('My Pharmacy Orders', 'Medicines you’ve ordered & paid for', true)}
  ${state.myOrders.length ? state.myOrders.map((o: any) => `
    <div class="card">
      <div class="row">
        <div>
          <div style="font-weight:600; font-size:14px;">${o.id}</div>
          <div class="fine">${o.hospital} · ${o.date}</div>
        </div>
        <span class="tag ${o.status === 'Delivered' ? '' : 'tag-marigold'}">${o.status}</span>
      </div>
      <div class="divider"></div>
      ${(o.items || []).map((i: any) => `<div class="fine">• ${i.name} — ₹${i.price}</div>`).join('')}
      <div class="row" style="margin-top:8px;"><span class="fine">Paid</span><span style="font-weight:700; color:var(--teal-deep);">₹${o.total}</span></div>
    </div>`).join('') : `<div class="empty-state"><h3>No orders yet</h3><p>Order medicines from a hospital pharmacy to see them here.</p></div>`}
  `;
}

export function askDoubtScreen(): string {
  return `
  ${topbar('Ask a Doctor', 'Post a general health doubt — any doctor can answer', true)}
  <div class="card">
    <span class="eyebrow">Your doubt</span>
    <textarea id="doubtText" rows="3" placeholder="e.g. Is it normal to feel dizzy after fasting?"></textarea>
    <div class="fine" style="margin:6px 0 10px;">🔒 Posted anonymously — your name, phone &amp; personal details are never shared or stored with your question.</div>
    <button class="btn btn-marigold" onclick="window.postDoubt()">Post Your Doubt</button>
  </div>
  <span class="eyebrow" style="margin-top:6px; display:block;">Doubts &amp; Answers</span>
  ${state.doubts.length ? state.doubts.map((d: any) => `
    <div class="card">
      <div class="row">
        <span class="tag">${d.id}</span>
        <span class="tag ${d.answer ? '' : 'tag-marigold'}">${d.answer ? 'Answered' : 'Waiting for doctor'}</span>
      </div>
      <div style="font-weight:600; font-size:13.5px; margin-top:8px;">${d.question}</div>
      ${d.answer ? `
      <div class="divider"></div>
      <div class="fine" style="color:var(--teal-deep); font-weight:600;">👨‍⚕️ ${d.answeredBy}</div>
      <div class="fine" style="margin-top:4px;">${d.answer}</div>` : ''}
    </div>`).join('') : `<div class="empty-state"><h3>No doubts posted yet</h3><p>Ask anything — a doctor will answer soon.</p></div>`}
  `;
}

export function aiAssistantScreen(): string {
  return `
  ${topbar('Suha AI Assistant', 'Booking help · medicines · health doubts', true)}
  <div class="card" style="border-color:var(--teal);">
    <div class="fine">🤖 Ask me how to book an appointment, what a tablet your doctor prescribed is generally for, or any health doubt. Type or tap 🎤 to speak — I'll reply in whichever language you use, and can read my answer aloud too.</div>
  </div>
  <div id="aiChatLog" style="display:flex; flex-direction:column; gap:10px; margin:12px 0;">
    ${renderAiChatLog()}
  </div>
  <div class="card">
    <textarea id="aiInput" rows="2" placeholder="Type or tap 🎤 to speak..." onkeydown="if(event.key==='Enter' && !event.shiftKey){event.preventDefault(); window.sendAiMessage();}"></textarea>
    <div class="row" style="gap:8px; margin-top:8px;">
      <button class="btn btn-outline btn-sm" id="aiMicBtn" onclick="window.toggleAiMic()">🎤 Speak</button>
      <button class="btn btn-outline btn-sm" onclick="window.toggleAiVoiceLang()">${state.aiVoiceLang === 'ta-IN' ? '🇮🇳 தமிழ்' : '🇬🇧 English'}</button>
      <button class="btn btn-outline btn-sm" onclick="window.toggleAiSpeakReplies()">${state.aiSpeakReplies ? '🔊 On' : '🔇 Off'}</button>
    </div>
    <button class="btn btn-marigold" id="aiSendBtn" style="margin-top:8px;" onclick="window.sendAiMessage()">Send</button>
  </div>
  `;
}

export function renderAiChatLog(): string {
  if (!state.aiChat.length) {
    return `<div class="empty-state"><h3>No messages yet</h3><p>Try: "How do I book a doctor appointment?" or "என் மாத்திரை எதுக்கு?"</p></div>`;
  }
  return state.aiChat.map((m: any) => `
    <div style="align-self:${m.role === 'user' ? 'flex-end' : 'flex-start'}; max-width:88%;">
      <div class="card" style="margin:0;">
        <div class="fine" style="font-weight:700; margin-bottom:4px; color:${m.role === 'user' ? 'var(--marigold)' : 'var(--teal-deep)'};">${m.role === 'user' ? 'You' : '🤖 Suha AI'}</div>
        <div style="font-size:13.5px; white-space:pre-wrap; line-height:1.45;">${m.pending ? '💭 Typing…' : m.content}</div>
      </div>
    </div>`).join('');
}

export function labLocationScreen(): string {
  return `
  ${topbar('Lab Reports', 'Choose your location to find nearby labs', true)}
  <div class="card">
    <span class="eyebrow">Your location</span>
    <input class="search-input" id="locInput" value="Sivakasi" placeholder="Enter area or town">
    <button class="btn btn-primary" onclick="window.suhaGo('labList')">Find Labs Near Me</button>
  </div>
  <span class="eyebrow">Already have reports?</span>
  <div class="card" onclick="window.suhaGo('myReports')">
    <div class="row">
      <span style="font-weight:600; font-size:13.5px;">📄 View My Reports</span>
      <span class="tag">${state.myReports.length}</span>
    </div>
  </div>
  `;
}

export function labListScreen(): string {
  return `
  ${topbar('Labs near Sivakasi', 'Choose a lab to book a test or fetch a report', true)}
  ${defaultLabs.map(l => `
    <div class="card">
      <div class="row" onclick="window.suhaGo('myReports', {selLab:'${l.id}'})">
        <div>
          <div style="font-weight:600; font-size:14px; color:var(--teal-deep);">${l.name}</div>
          <div class="fine">${l.area}</div>
        </div>
        <span class="tag">${l.distance}</span>
      </div>
      <div class="divider"></div>
      <div class="row" style="margin-bottom:6px;">
        <span class="fine">🕒 ${l.timing}</span>
      </div>
      <div class="btn-row">
        <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation(); window.suhaToast('Test booking request sent to ${l.name}')">Book Test</button>
        <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); window.requestHomeCollection('${l.id}')">🏠 Home Collection</button>
      </div>
    </div>`).join('')}
  `;
}

export function myReportsScreen(): string {
  return `
  ${topbar('My Lab Reports', 'All your reports, accessible anywhere', true)}
  ${state.myReports.length ? state.myReports.map((r: any) => `
    <div class="card">
      <div class="row">
        <div>
          <div style="font-weight:600; font-size:14px;">${r.name}</div>
          <div class="fine">${r.lab} · ${r.date}</div>
        </div>
        <span class="tag ${r.sharedWithDoctor ? '' : 'tag-marigold'}">${r.sharedWithDoctor ? 'Shared' : 'Not shared'}</span>
      </div>
      <div class="divider"></div>
      <div class="row">
        <button class="btn btn-outline btn-sm" onclick="window.suhaToast('Opening report PDF (demo)')">View Report</button>
        <button class="btn ${r.sharedWithDoctor ? 'btn-ghost' : 'btn-marigold'} btn-sm" onclick="window.toggleShareReport('${r.name.replace(/'/g, "\\'")}')">${r.sharedWithDoctor ? 'Revoke Access' : 'Share with Doctor'}</button>
      </div>
    </div>`).join('') : `<div class="empty-state"><h3>No reports yet</h3><p>Your lab will upload reports directly to your account.</p></div>`}
  `;
}

export function familyMembersScreen(): string {
  return `
  ${topbar('Family Members', 'Book appointments for anyone in your family', true)}
  ${state.familyMembers.map((m: any) => `
    <div class="card">
      <div class="row">
        <div class="row" style="gap:12px;">
          <div class="avatar">${m.name[0]}</div>
          <div>
            <div style="font-weight:600; font-size:14px;">${m.name}</div>
            <div class="fine">${m.relation} · Age ${m.age}</div>
          </div>
        </div>
        ${state.bookingFor === m.name ? `<span class="tag tag-marigold">Booking for</span>` : ''}
      </div>
      <div class="divider"></div>
      <button class="btn btn-outline btn-sm" onclick="window.bookForMember('${m.name.replace(/'/g, "\\'")}')">Book Appointment for ${m.name}</button>
    </div>`).join('')}

  <span class="eyebrow" style="margin-top:6px; display:block;">Add family member</span>
  <div class="card">
    <input class="med-input" id="famName" placeholder="Name">
    <input class="med-input" id="famRelation" placeholder="Relation, e.g. Mother, Father, Son">
    <input class="med-input" id="famAge" placeholder="Age" type="number">
    <button class="btn btn-marigold" onclick="window.addFamilyMember()">Add Family Member</button>
  </div>
  `;
}
