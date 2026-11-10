var H=Object.defineProperty;var T=(e,t,i)=>t in e?H(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var x=(e,t,i)=>T(e,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const p of o.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&s(p)}).observe(document,{childList:!0,subtree:!0});function i(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=i(n);fetch(n.href,o)}})();const $={en:{switchApp:"🔁 Switch",langBtn:"தமிழ்",welcome:"Vanakkam!",chooseHow:"Choose how you'd like to continue",patientLogin:"Patient Login",patientLoginSub:"Book appointments, view prescriptions & lab reports",doctorLogin:"Doctor Login",doctorLoginSub:"Manage appointments & prescribe medicines",labLogin:"Lab Login",labLoginSub:"Upload patient test reports",heroTitle:"Need to see a doctor?",heroSub:"Find nearby hospitals, check doctor timings and book your appointment in a few taps.",searchHospitals:"🔍 Search Hospitals",quickAppointments:"My Appointments",quickPrescriptions:"My Prescriptions",quickReports:"Lab Reports",quickEmergency:"Emergency",quickFamily:"Family Members",navHome:"Home",navSearch:"Search",navPresc:"Prescriptions",navReports:"Reports",navFamily:"Family",navToday:"Today",navPatients:"Patients",navLogout:"Logout",navUpload:"Upload"},ta:{switchApp:"🔁 மாற்று",langBtn:"English",welcome:"வணக்கம்!",chooseHow:"எப்படி தொடர விரும்புகிறீர்கள்?",patientLogin:"பேஷன்ட் லாகின்",patientLoginSub:"அப்பாய்ண்ட்மென்ட் புக் பண்ணுங்க, மருந்து & லேப் ரிப்போர்ட் பாருங்க",doctorLogin:"டாக்டர் லாகின்",doctorLoginSub:"அப்பாய்ண்ட்மென்ட் மேனேஜ் பண்ணி மருந்து பிரிஸ்கிரைப் பண்ணுங்க",labLogin:"லேப் லாகின்",labLoginSub:"பேஷன்ட் டெஸ்ட் ரிப்போர்ட் அப்லோட் பண்ணுங்க",heroTitle:"டாக்டரை பார்க்கணுமா?",heroSub:"அருகிலுள்ள ஹாஸ்பிடல்களை கண்டுபிடி, டாக்டர் டைமிங் செக் பண்ணி அப்பாய்ண்ட்மென்ட் புக் பண்ணுங்க.",searchHospitals:"🔍 ஹாஸ்பிடல் தேடு",quickAppointments:"என் அப்பாய்ண்ட்மென்ட்",quickPrescriptions:"என் மருந்து",quickReports:"லேப் ரிப்போர்ட்",quickEmergency:"எமர்ஜென்சி",quickFamily:"குடும்பம்",navHome:"ஹோம்",navSearch:"தேடு",navPresc:"மருந்து",navReports:"ரிப்போர்ட்",navFamily:"குடும்பம்",navToday:"இன்று",navPatients:"பேஷன்ட்ஸ்",navLogout:"லாக் அவுட்",navUpload:"அப்லோட்"}};function B(e,t){return $[e]&&$[e][t]||$.en[t]||t}const w="http://localhost:5000/api",c=[{id:"h1",name:"Sivakasi General Hospital",area:"Main Road, Sivakasi",distance:"1.2 km",timing:"8:00 AM – 9:00 PM"},{id:"h2",name:"Sri Lakshmi Multispeciality",area:"Thiruthangal Road, Sivakasi",distance:"2.4 km",timing:"9:00 AM – 8:00 PM"},{id:"h3",name:"Aravind Eye & General Hospital",area:"Virudhunagar Bypass, Sivakasi",distance:"3.1 km",timing:"Open 24 Hours"}],m=[{id:"d1",name:"Dr. R. Kavitha",spec:"General Physician",hospital:"h1",fee:200,slots:[{t:"09:00 AM",open:!0},{t:"09:30 AM",open:!0},{t:"10:00 AM",open:!1},{t:"11:30 AM",open:!0},{t:"04:00 PM",open:!0},{t:"04:30 PM",open:!1}]},{id:"d2",name:"Dr. M. Senthil",spec:"Orthopedic",hospital:"h1",fee:350,slots:[{t:"10:00 AM",open:!0},{t:"10:30 AM",open:!1},{t:"02:00 PM",open:!0},{t:"02:30 PM",open:!0}]},{id:"d3",name:"Dr. P. Anitha",spec:"Pediatrician",hospital:"h1",fee:250,slots:[{t:"09:00 AM",open:!0},{t:"09:30 AM",open:!0},{t:"05:00 PM",open:!0}]},{id:"d4",name:"Dr. S. Muthuraj",spec:"Cardiologist",hospital:"h2",fee:500,slots:[{t:"11:00 AM",open:!0},{t:"11:30 AM",open:!1},{t:"03:00 PM",open:!0}]},{id:"d5",name:"Dr. K. Devi",spec:"Gynecologist",hospital:"h2",fee:400,slots:[{t:"10:00 AM",open:!0},{t:"10:30 AM",open:!0},{t:"06:00 PM",open:!0}]},{id:"d6",name:"Dr. A. Ramesh",spec:"Ophthalmologist",hospital:"h3",fee:300,slots:[{t:"09:00 AM",open:!0},{t:"01:00 PM",open:!0},{t:"01:30 PM",open:!1}]},{id:"d7",name:"Dr. J. Priya",spec:"Dermatologist",hospital:"h3",fee:350,slots:[{t:"12:00 PM",open:!0},{t:"12:30 PM",open:!0},{t:"05:30 PM",open:!0}]}],u=[{id:"l1",name:"Sivakasi Diagnostic Centre",area:"Main Road, Sivakasi",distance:"0.8 km",timing:"7:00 AM – 8:00 PM"},{id:"l2",name:"Metro Scans & Labs",area:"Sattur Road, Sivakasi",distance:"1.9 km",timing:"8:00 AM – 9:00 PM"},{id:"l3",name:"City Clinical Labs",area:"Virudhunagar Bypass, Sivakasi",distance:"2.7 km",timing:"6:30 AM – 7:00 PM"}],N=[{name:"Paracetamol 500mg (strip of 10)",price:20},{name:"ORS Sachets (pack of 5)",price:25},{name:"Vitamin C Tablets (strip of 15)",price:70},{name:"Cough Syrup 100ml",price:60},{name:"Antiseptic Cream",price:45}],h=[{id:"p0",name:"You (Patient App Account)",age:31,phone:"98••••••00",lastVisit:"20 Aug 2026",reports:[{name:"Blood Test – CBC",date:"10 Aug 2026",lab:"Sivakasi Diagnostic Centre",sharedWithDoctor:!0,accessLog:[{by:"Dr. R. Kavitha",role:"Doctor",time:"12 Aug 2026, 10:20 AM"}]}],prescriptions:[{doctor:"Dr. R. Kavitha",hospital:"Sivakasi General Hospital",date:"12 Aug 2026",meds:["Amoxicillin 500mg – 3x/day, 5 days","ORS – as needed"]}]},{id:"p1",name:"Muthu Kumar",age:45,phone:"98••••••01",lastVisit:"12 Aug 2026",reports:[{name:"Blood Test – CBC",date:"10 Aug 2026",lab:"Sivakasi Diagnostic Centre",sharedWithDoctor:!1,accessLog:[]},{name:"X-Ray Chest",date:"11 Aug 2026",lab:"Metro Scans & Labs",sharedWithDoctor:!1,accessLog:[]}],prescriptions:[{doctor:"Dr. R. Kavitha",date:"12 Aug 2026",meds:["Paracetamol 500mg – 2x/day, 5 days","Vitamin D3 – 1x/week, 4 weeks"]}]},{id:"p2",name:"Lakshmi Priya",age:29,phone:"98••••••02",lastVisit:"15 Aug 2026",reports:[{name:"Lipid Profile",date:"14 Aug 2026",lab:"City Clinical Labs",sharedWithDoctor:!1,accessLog:[]}],prescriptions:[]},{id:"p3",name:"Karthik Raja",age:34,phone:"98••••••03",lastVisit:"18 Aug 2026",reports:[{name:"Sugar Test (Fasting)",date:"17 Aug 2026",lab:"Sivakasi Diagnostic Centre",sharedWithDoctor:!1,accessLog:[]},{name:"ECG",date:"17 Aug 2026",lab:"Sivakasi Diagnostic Centre",sharedWithDoctor:!1,accessLog:[]}],prescriptions:[]}];class I{constructor(){x(this,"hasBackend",!1);this.checkBackend()}async checkBackend(){try{(await fetch(`${w}/hospitals`,{signal:AbortSignal.timeout(1200)})).ok&&(this.hasBackend=!0)}catch{this.hasBackend=!1}}async getHospitals(){if(this.hasBackend)try{return await(await fetch(`${w}/hospitals`)).json()}catch{console.warn("Backend fetch failed, using local store")}const t=localStorage.getItem("suha_hospitals");return t?JSON.parse(t):c}async getDoctors(){if(this.hasBackend)try{return await(await fetch(`${w}/doctors`)).json()}catch{console.warn("Backend fetch failed, using local store")}const t=localStorage.getItem("suha_doctors");return t?JSON.parse(t):m}async addAppointment(t){if(this.hasBackend)try{return(await(await fetch(`${w}/appointments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({hospital_name:t.hospital,doctor_name:t.doctor,spec:t.spec,patient_name:t.patientName,appointment_date:t.date,appointment_time:t.time,reason:t.reason})})).json()).token}catch{console.warn("Backend appointment add failed, saving locally")}const i=JSON.parse(localStorage.getItem("suha_my_appointments")||"[]"),s=i.length+2;return t.token=s,i.unshift(t),localStorage.setItem("suha_my_appointments",JSON.stringify(i)),s}async addDoubt(t){if(this.hasBackend)try{return(await(await fetch(`${w}/doubts`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:t})})).json()).id}catch{console.warn("Backend doubt add failed, saving locally")}const i=JSON.parse(localStorage.getItem("suha_doubts")||"[]"),s="Q"+(1001+i.length);return i.unshift({id:s,question:t,answer:null,answeredBy:null}),localStorage.setItem("suha_doubts",JSON.stringify(i)),s}}const C=new I;function l(e,t,i=!0){return`<div class="topbar">
    ${i?'<button class="back-btn" onclick="window.suhaBack()">←</button>':""}
    <div><h2>${e}</h2>${t?`<div class="sub">${t}</div>`:""}</div>
  </div>`}function L(){return`
  <div class="hero-card">
    <span class="tag tag-marigold" style="margin-bottom:8px; display:inline-block;">${r("welcome")} 👋</span>
    <h3>${r("heroTitle")}</h3>
    <p>${r("heroSub")}</p>
    <button class="btn btn-marigold" onclick="window.suhaGo('hospitalSearch')">${r("searchHospitals")}</button>
  </div>

  ${a.myReferrals.length?`
  <span class="eyebrow">⚠️ Referred by your doctor</span>
  ${a.myReferrals.map(e=>`
    <div class="card" style="border-color:var(--marigold);">
      <div class="row">
        <div>
          <div style="font-weight:600; font-size:14px;">${e.doctorName}</div>
          <div class="fine">${e.spec} · ${e.hospitalName}</div>
        </div>
        <span class="tag tag-marigold">Referral</span>
      </div>
      <div class="divider"></div>
      <div class="fine" style="margin-bottom:8px;">"${e.reason}" — from ${e.fromDoctor}</div>
      <button class="btn btn-outline btn-sm" onclick="window.suhaGo('doctorDetail', {selDoctor:'${e.doctorId}', selSlot:null, selReason:''})">Book This Appointment</button>
    </div>`).join("")}
  `:""}

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
      <div class="label">${r("quickAppointments")}</div>
    </div>
    <div class="quick-tile" onclick="window.suhaGo('myPrescriptions')">
      <div class="icon">💊</div>
      <div class="label">${r("quickPrescriptions")}</div>
    </div>
    <div class="quick-tile" onclick="window.suhaGo('labLocation')">
      <div class="icon">🧪</div>
      <div class="label">${r("quickReports")}</div>
    </div>
    <div class="quick-tile" onclick="window.suhaGo('familyMembers')">
      <div class="icon">👨‍👩‍👧</div>
      <div class="label">${r("quickFamily")}</div>
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
      <div class="label">${r("quickEmergency")}</div>
    </div>
  </div>

  <span class="eyebrow">Upcoming appointment</span>
  ${a.myAppointments.length?a.myAppointments.map(e=>`
    <div class="card">
      <div class="row">
        <div>
          <div style="font-weight:600; font-size:14px;">${e.doctor} ${e.patientName&&e.patientName!=="You"?`<span class="tag" style="margin-left:4px;">For ${e.patientName}</span>`:""}</div>
          <div class="fine">${e.spec} · ${e.hospital}</div>
        </div>
        <span class="tag">${e.status}</span>
      </div>
      <div class="divider"></div>
      <div class="row">
        <span class="mono" style="font-size:12.5px;">📆 ${e.date} · ⏰ ${e.time}</span>
        <span class="tag tag-marigold">🎫 Token #${e.token||1}</span>
      </div>
      ${e.token&&e.token>1?`<div class="fine" style="margin-top:6px;">${e.token-1} patient(s) ahead of you in the queue.</div>`:""}
    </div>`).join(""):'<div class="fine">No appointments yet.</div>'}
  <div class="fine" style="margin-top:6px;">🔔 A reminder will be sent to your phone before this appointment. 📶 No app notification? We'll send it as an SMS instead.</div>
  `}function z(){return`
  ${l("Search Hospitals","Nearby suggestions based on your location",!0)}
  ${a.bookingFor&&a.bookingFor!=="You"?`<div class="fine" style="margin-bottom:8px;">Booking for: <strong>${a.bookingFor}</strong></div>`:""}
  <input class="search-input" id="hospSearchInput" placeholder="Search hospitals, area..." oninput="window.filterHospitals(this.value)">
  <div id="hospitalResults">${O(a.hospitals||c)}</div>
  `}function O(e){return e.map(t=>`
    <div class="card" onclick="window.suhaGo('hospitalDetail', {selHospital:'${t.id}'})">
      <div class="row">
        <div>
          <div style="font-weight:600; font-size:14.5px; color:var(--teal-deep);">${t.name}</div>
          <div class="fine">${t.area}</div>
        </div>
        <span class="tag">${t.distance}</span>
      </div>
      <div class="divider"></div>
      <div class="row">
        <span class="fine">🕒 ${t.timing}</span>
        <span class="fine">${m.filter(i=>i.hospital===t.id).length} doctors</span>
      </div>
    </div>`).join("")}function E(){const e=(a.hospitals||c).find(i=>i.id===a.selHospital)||c[0],t=(a.doctors||m).filter(i=>i.hospital===e.id);return`
  ${l(e.name,e.area,!0)}
  <div class="card">
    <div class="row">
      <span class="fine">🕒 Hospital timing</span>
      <span class="tag tag-marigold">${e.timing}</span>
    </div>
  </div>
  <div class="card" onclick="window.suhaGo('hospitalPharmacy', {selHospital:'${e.id}'})" style="border-color:var(--marigold);">
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
  ${t.map(i=>`
    <div class="card" onclick="window.suhaGo('doctorDetail', {selDoctor:'${i.id}', selSlot:null, selReason:''})">
      <div class="row">
        <div class="row" style="gap:12px;">
          <div class="avatar">${i.name.split(" ").slice(-1)[0][0]}</div>
          <div>
            <div style="font-weight:600; font-size:14px;">${i.name}</div>
            <div class="fine">${i.spec}</div>
          </div>
        </div>
        <span class="mono" style="font-size:12.5px; color:var(--teal-deep); font-weight:600;">₹${i.fee}</span>
      </div>
    </div>`).join("")}
  `}function j(){const e=(a.doctors||m).find(i=>i.id===a.selDoctor)||m[0],t=(a.hospitals||c).find(i=>i.id===e.hospital)||c[0];return`
  ${l(e.name,e.spec+" · "+t.name,!0)}
  <div class="card">
    <div class="row">
      <span class="fine">📍 ${t.area}</span>
      <span class="tag tag-marigold">₹${e.fee} fee</span>
    </div>
  </div>
  ${a.bookingFor&&a.bookingFor!=="You"?`<div class="fine" style="margin-bottom:8px;">Booking for: <strong>${a.bookingFor}</strong></div>`:""}
  <span class="eyebrow">All available timings today</span>
  <div class="slot-grid">
    ${e.slots.map(i=>`
      <div class="slot ${i.open?"":"taken"} ${a.selSlot===i.t?"selected":""}"
        onclick="${i.open?`window.selectSlot('${i.t}')`:""}">${i.t}</div>
    `).join("")}
  </div>
  <div class="fine" style="margin-bottom:14px;">Greyed-out times are already booked. Select an open slot to continue.</div>
  <span class="eyebrow">Reason for visit (optional)</span>
  <div class="card">
    <textarea id="visitReason" rows="2" placeholder="e.g. Fever, follow-up checkup — leave blank if you'd rather not say">${a.selReason||""}</textarea>
  </div>
  <button class="btn btn-primary" ${a.selSlot?"":'style="opacity:0.45; pointer-events:none;"'} onclick="window.captureReasonAndContinue()">
    Continue to Book · ${a.selSlot||"select a time"}
  </button>
  `}function G(){const e=(a.doctors||m).find(i=>i.id===a.selDoctor)||m[0],t=(a.hospitals||c).find(i=>i.id===e.hospital)||c[0];return`
  ${l("Confirm & Pay","Booking summary",!0)}
  <div class="card">
    <div class="row"><span class="fine">Patient</span><span style="font-weight:600; font-size:13px;">${a.bookingFor||"You"}</span></div>
    <div class="divider"></div>
    <div class="row"><span class="fine">Doctor</span><span style="font-weight:600; font-size:13px;">${e.name}</span></div>
    <div class="divider"></div>
    <div class="row"><span class="fine">Hospital</span><span class="fine">${t.name}</span></div>
    <div class="divider"></div>
    <div class="row"><span class="fine">Date &amp; time</span><span class="mono" style="font-size:12.5px;">25 Aug 2026 · ${a.selSlot}</span></div>
    <div class="divider"></div>
    ${a.selReason?`<div class="row"><span class="fine">Reason for visit</span><span style="font-weight:600; font-size:12.5px; text-align:right; max-width:60%;">${a.selReason}</span></div><div class="divider"></div>`:""}
    <div class="row"><span class="fine">Consultation fee</span><span style="font-weight:700; color:var(--teal-deep);">₹${e.fee}</span></div>
  </div>
  <span class="eyebrow">Pay with</span>
  <div class="card" style="display:flex; gap:10px; align-items:center;">
    <input type="radio" name="pay" checked> <span style="font-size:13.5px;">UPI — GPay / PhonePe / Paytm</span>
  </div>
  <div class="card" style="display:flex; gap:10px; align-items:center;">
    <input type="radio" name="pay"> <span style="font-size:13.5px;">Pay at hospital counter</span>
  </div>
  <button class="btn btn-marigold" onclick="window.confirmBooking()">Pay ₹${e.fee} &amp; Book Appointment</button>
  `}function F(){const e=(a.doctors||m).find(i=>i.id===a.selDoctor)||m[0],t=a.myAppointments[0]||{};return`
  <div style="text-align:center; padding:36px 10px 10px;">
    <div style="font-size:46px;">🎉</div>
    <h2 style="margin:12px 0 6px; color:var(--teal-deep);">Appointment Booked</h2>
    <p class="fine">Your slot with ${e.name} at ${a.selSlot} on 25 Aug 2026 is confirmed${t.patientName!=="You"?" for "+t.patientName:""}.</p>
  </div>
  <div class="card">
    <div class="row"><span class="fine">🎫 Your token</span><span class="tag tag-marigold">#${t.token||1}</span></div>
    <div class="fine" style="margin-top:6px;">${t.token>1?t.token-1+" patient(s) ahead of you.":"You're first in the queue."}</div>
  </div>
  ${t.reason?`<div class="card"><div class="row"><span class="fine">📝 Reason for visit</span></div><div class="fine" style="margin-top:6px;">${t.reason}</div></div>`:""}
  <div class="card">
    <div class="row"><span class="fine">🔔 Reminder</span><span class="tag">On</span></div>
    <div class="fine" style="margin-top:6px;">We'll send a reminder to your phone before your fixed appointment time. 📶 If app notifications are off, we'll fall back to SMS so you never miss it.</div>
  </div>
  <button class="btn btn-primary" onclick="state.bookingFor='You'; window.suhaGo('home')">Back to Home</button>
  <button class="btn btn-outline" style="margin-top:10px;" onclick="window.suhaGo('myAppointments')">View My Appointments</button>
  `}function q(){return`
  ${l("My Appointments","Upcoming & past visits",!0)}
  ${a.myAppointments.length?a.myAppointments.map(e=>`
    <div class="card">
      <div class="row">
        <div>
          <div style="font-weight:600; font-size:14px;">${e.doctor} ${e.patientName&&e.patientName!=="You"?`<span class="tag" style="margin-left:4px;">For ${e.patientName}</span>`:""}</div>
          <div class="fine">${e.spec} · ${e.hospital}</div>
        </div>
        <span class="tag">${e.status}</span>
      </div>
      <div class="divider"></div>
      <div class="row">
        <span class="mono" style="font-size:12.5px;">📆 ${e.date} · ⏰ ${e.time}</span>
        <span class="tag tag-marigold">🎫 #${e.token||1}</span>
      </div>
      ${e.reason?`<div class="fine" style="margin-top:8px;">📝 ${e.reason}</div>`:""}
    </div>`).join(""):'<div class="empty-state"><h3>No appointments</h3><p>Book a doctor to see it here.</p></div>'}
  `}function V(){return`
  ${l("My Prescriptions","Medicines prescribed by your doctors",!0)}
  ${a.myPrescriptions.length?a.myPrescriptions.map(e=>`
    <div class="card">
      <div class="row">
        <div>
          <div style="font-weight:600; font-size:14px;">${e.doctor}</div>
          <div class="fine">${e.hospital||""} ${e.hospital?"·":""} ${e.date}</div>
        </div>
        <span class="tag tag-marigold">💊</span>
      </div>
      <div class="divider"></div>
      ${e.meds.map(t=>`<div class="fine">• ${t}</div>`).join("")}
      <div class="divider"></div>
      <button class="btn btn-marigold btn-sm" onclick="window.orderFromPrescription('${(e.hospital||"").replace(/'/g,"\\'")}')">🛒 Order &amp; Pay at Pharmacy</button>
    </div>`).join(""):'<div class="empty-state"><h3>No prescriptions yet</h3><p>After a doctor visit, medicines appear here automatically.</p></div>'}
  `}function Y(){const e=(a.hospitals||c).find(i=>i.id===a.selHospital)||c[0],t=a.myPrescriptions.flatMap(i=>i.meds.map(s=>({med:s,doctor:i.doctor})));return`
  ${l(e.name+" Pharmacy","Order your medicines & pay online",!0)}
  ${t.length?`
  <span class="eyebrow">💊 Prescribed for you</span>
  ${t.map(i=>{const s=he(i.med),n=a.pharmacyCart.some(o=>o.name===i.med);return`
    <div class="card">
      <div class="row">
        <div>
          <div style="font-weight:600; font-size:13.5px;">${i.med}</div>
          <div class="fine">Prescribed by ${i.doctor}</div>
        </div>
        <span class="mono" style="font-size:12.5px; color:var(--teal-deep); font-weight:600;">₹${s}</span>
      </div>
      <div class="divider"></div>
      <button class="btn ${n?"btn-ghost":"btn-outline"} btn-sm" ${n?"disabled":""} onclick="window.toggleCartItem('${i.med.replace(/'/g,"\\'")}', ${s})">${n?"✓ Added to Cart":"Add to Cart"}</button>
    </div>`}).join("")}
  `:'<div class="fine" style="margin-bottom:12px;">No prescribed medicines yet — ask your doctor to prescribe, or browse pharmacy stock below.</div>'}

  <span class="eyebrow" style="margin-top:6px; display:block;">🧴 Pharmacy stock</span>
  ${N.map(i=>{const s=a.pharmacyCart.some(n=>n.name===i.name);return`
    <div class="card">
      <div class="row">
        <div style="font-weight:600; font-size:13.5px;">${i.name}</div>
        <span class="mono" style="font-size:12.5px; color:var(--teal-deep); font-weight:600;">₹${i.price}</span>
      </div>
      <div class="divider"></div>
      <button class="btn ${s?"btn-ghost":"btn-outline"} btn-sm" ${s?"disabled":""} onclick="window.toggleCartItem('${i.name.replace(/'/g,"\\'")}', ${i.price})">${s?"✓ Added to Cart":"Add to Cart"}</button>
    </div>`}).join("")}

  ${a.pharmacyCart.length?`
  <div class="card" style="border-color:var(--teal); margin-top:6px;">
    <div class="row">
      <span class="fine">🛒 ${a.pharmacyCart.length} item(s) in cart</span>
      <span style="font-weight:700; color:var(--teal-deep);">₹${b()}</span>
    </div>
    <button class="btn btn-marigold" style="margin-top:10px;" onclick="window.suhaGo('pharmacyCheckout')">Review Cart &amp; Pay</button>
  </div>`:""}
  `}function W(){return`
  ${l("Confirm & Pay","Pharmacy order summary",!0)}
  ${a.pharmacyCart.map(e=>`
    <div class="card">
      <div class="row">
        <span style="font-weight:600; font-size:13.5px;">${e.name}</span>
        <span class="mono" style="font-size:12.5px; color:var(--teal-deep); font-weight:600;">₹${e.price}</span>
      </div>
    </div>`).join("")}
  <div class="card">
    <div class="row"><span class="fine">Total</span><span style="font-weight:700; color:var(--teal-deep); font-size:15px;">₹${b()}</span></div>
  </div>
  <span class="eyebrow">Pay with</span>
  <div class="card" style="display:flex; gap:10px; align-items:center;">
    <input type="radio" name="paypharm" checked> <span style="font-size:13.5px;">UPI — GPay / PhonePe / Paytm</span>
  </div>
  <div class="card" style="display:flex; gap:10px; align-items:center;">
    <input type="radio" name="paypharm"> <span style="font-size:13.5px;">Pay at pharmacy counter</span>
  </div>
  <button class="btn btn-marigold" ${a.pharmacyCart.length?"":'style="opacity:0.45; pointer-events:none;"'} onclick="window.confirmPharmacyOrder()">Pay ₹${b()} &amp; Place Order</button>
  `}function _(){const e=a.myOrders[0]||{};return`
  <div style="text-align:center; padding:36px 10px 10px;">
    <div style="font-size:46px;">💊</div>
    <h2 style="margin:12px 0 6px; color:var(--teal-deep);">Order Placed</h2>
    <p class="fine">Your payment of ₹${e.total} was received. ${e.hospital} pharmacy is preparing your order.</p>
  </div>
  <div class="card">
    <div class="row"><span class="fine">Order ID</span><span class="tag tag-marigold">${e.id}</span></div>
    <div class="divider"></div>
    ${(e.items||[]).map(t=>`<div class="fine">• ${t.name} — ₹${t.price}</div>`).join("")}
  </div>
  <button class="btn btn-primary" onclick="window.suhaGo('home')">Back to Home</button>
  <button class="btn btn-outline" style="margin-top:10px;" onclick="window.suhaGo('myOrders')">View My Orders</button>
  `}function K(){return`
  ${l("My Pharmacy Orders","Medicines you’ve ordered & paid for",!0)}
  ${a.myOrders.length?a.myOrders.map(e=>`
    <div class="card">
      <div class="row">
        <div>
          <div style="font-weight:600; font-size:14px;">${e.id}</div>
          <div class="fine">${e.hospital} · ${e.date}</div>
        </div>
        <span class="tag ${e.status==="Delivered"?"":"tag-marigold"}">${e.status}</span>
      </div>
      <div class="divider"></div>
      ${(e.items||[]).map(t=>`<div class="fine">• ${t.name} — ₹${t.price}</div>`).join("")}
      <div class="row" style="margin-top:8px;"><span class="fine">Paid</span><span style="font-weight:700; color:var(--teal-deep);">₹${e.total}</span></div>
    </div>`).join(""):'<div class="empty-state"><h3>No orders yet</h3><p>Order medicines from a hospital pharmacy to see them here.</p></div>'}
  `}function U(){return`
  ${l("Ask a Doctor","Post a general health doubt — any doctor can answer",!0)}
  <div class="card">
    <span class="eyebrow">Your doubt</span>
    <textarea id="doubtText" rows="3" placeholder="e.g. Is it normal to feel dizzy after fasting?"></textarea>
    <div class="fine" style="margin:6px 0 10px;">🔒 Posted anonymously — your name, phone &amp; personal details are never shared or stored with your question.</div>
    <button class="btn btn-marigold" onclick="window.postDoubt()">Post Your Doubt</button>
  </div>
  <span class="eyebrow" style="margin-top:6px; display:block;">Doubts &amp; Answers</span>
  ${a.doubts.length?a.doubts.map(e=>`
    <div class="card">
      <div class="row">
        <span class="tag">${e.id}</span>
        <span class="tag ${e.answer?"":"tag-marigold"}">${e.answer?"Answered":"Waiting for doctor"}</span>
      </div>
      <div style="font-weight:600; font-size:13.5px; margin-top:8px;">${e.question}</div>
      ${e.answer?`
      <div class="divider"></div>
      <div class="fine" style="color:var(--teal-deep); font-weight:600;">👨‍⚕️ ${e.answeredBy}</div>
      <div class="fine" style="margin-top:4px;">${e.answer}</div>`:""}
    </div>`).join(""):'<div class="empty-state"><h3>No doubts posted yet</h3><p>Ask anything — a doctor will answer soon.</p></div>'}
  `}function J(){return`
  ${l("Suha AI Assistant","Booking help · medicines · health doubts",!0)}
  <div class="card" style="border-color:var(--teal);">
    <div class="fine">🤖 Ask me how to book an appointment, what a tablet your doctor prescribed is generally for, or any health doubt. Type or tap 🎤 to speak — I'll reply in whichever language you use, and can read my answer aloud too.</div>
  </div>
  <div id="aiChatLog" style="display:flex; flex-direction:column; gap:10px; margin:12px 0;">
    ${Q()}
  </div>
  <div class="card">
    <textarea id="aiInput" rows="2" placeholder="Type or tap 🎤 to speak..." onkeydown="if(event.key==='Enter' && !event.shiftKey){event.preventDefault(); window.sendAiMessage();}"></textarea>
    <div class="row" style="gap:8px; margin-top:8px;">
      <button class="btn btn-outline btn-sm" id="aiMicBtn" onclick="window.toggleAiMic()">🎤 Speak</button>
      <button class="btn btn-outline btn-sm" onclick="window.toggleAiVoiceLang()">${a.aiVoiceLang==="ta-IN"?"🇮🇳 தமிழ்":"🇬🇧 English"}</button>
      <button class="btn btn-outline btn-sm" onclick="window.toggleAiSpeakReplies()">${a.aiSpeakReplies?"🔊 On":"🔇 Off"}</button>
    </div>
    <button class="btn btn-marigold" id="aiSendBtn" style="margin-top:8px;" onclick="window.sendAiMessage()">Send</button>
  </div>
  `}function Q(){return a.aiChat.length?a.aiChat.map(e=>`
    <div style="align-self:${e.role==="user"?"flex-end":"flex-start"}; max-width:88%;">
      <div class="card" style="margin:0;">
        <div class="fine" style="font-weight:700; margin-bottom:4px; color:${e.role==="user"?"var(--marigold)":"var(--teal-deep)"};">${e.role==="user"?"You":"🤖 Suha AI"}</div>
        <div style="font-size:13.5px; white-space:pre-wrap; line-height:1.45;">${e.pending?"💭 Typing…":e.content}</div>
      </div>
    </div>`).join(""):'<div class="empty-state"><h3>No messages yet</h3><p>Try: "How do I book a doctor appointment?" or "என் மாத்திரை எதுக்கு?"</p></div>'}function X(){return`
  ${l("Lab Reports","Choose your location to find nearby labs",!0)}
  <div class="card">
    <span class="eyebrow">Your location</span>
    <input class="search-input" id="locInput" value="Sivakasi" placeholder="Enter area or town">
    <button class="btn btn-primary" onclick="window.suhaGo('labList')">Find Labs Near Me</button>
  </div>
  <span class="eyebrow">Already have reports?</span>
  <div class="card" onclick="window.suhaGo('myReports')">
    <div class="row">
      <span style="font-weight:600; font-size:13.5px;">📄 View My Reports</span>
      <span class="tag">${a.myReports.length}</span>
    </div>
  </div>
  `}function Z(){return`
  ${l("Labs near Sivakasi","Choose a lab to book a test or fetch a report",!0)}
  ${u.map(e=>`
    <div class="card">
      <div class="row" onclick="window.suhaGo('myReports', {selLab:'${e.id}'})">
        <div>
          <div style="font-weight:600; font-size:14px; color:var(--teal-deep);">${e.name}</div>
          <div class="fine">${e.area}</div>
        </div>
        <span class="tag">${e.distance}</span>
      </div>
      <div class="divider"></div>
      <div class="row" style="margin-bottom:6px;">
        <span class="fine">🕒 ${e.timing}</span>
      </div>
      <div class="btn-row">
        <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation(); window.suhaToast('Test booking request sent to ${e.name}')">Book Test</button>
        <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); window.requestHomeCollection('${e.id}')">🏠 Home Collection</button>
      </div>
    </div>`).join("")}
  `}function ee(){return`
  ${l("My Lab Reports","All your reports, accessible anywhere",!0)}
  ${a.myReports.length?a.myReports.map(e=>`
    <div class="card">
      <div class="row">
        <div>
          <div style="font-weight:600; font-size:14px;">${e.name}</div>
          <div class="fine">${e.lab} · ${e.date}</div>
        </div>
        <span class="tag ${e.sharedWithDoctor?"":"tag-marigold"}">${e.sharedWithDoctor?"Shared":"Not shared"}</span>
      </div>
      <div class="divider"></div>
      <div class="row">
        <button class="btn btn-outline btn-sm" onclick="window.suhaToast('Opening report PDF (demo)')">View Report</button>
        <button class="btn ${e.sharedWithDoctor?"btn-ghost":"btn-marigold"} btn-sm" onclick="window.toggleShareReport('${e.name.replace(/'/g,"\\'")}')">${e.sharedWithDoctor?"Revoke Access":"Share with Doctor"}</button>
      </div>
    </div>`).join(""):'<div class="empty-state"><h3>No reports yet</h3><p>Your lab will upload reports directly to your account.</p></div>'}
  `}function te(){return`
  ${l("Family Members","Book appointments for anyone in your family",!0)}
  ${a.familyMembers.map(e=>`
    <div class="card">
      <div class="row">
        <div class="row" style="gap:12px;">
          <div class="avatar">${e.name[0]}</div>
          <div>
            <div style="font-weight:600; font-size:14px;">${e.name}</div>
            <div class="fine">${e.relation} · Age ${e.age}</div>
          </div>
        </div>
        ${a.bookingFor===e.name?'<span class="tag tag-marigold">Booking for</span>':""}
      </div>
      <div class="divider"></div>
      <button class="btn btn-outline btn-sm" onclick="window.bookForMember('${e.name.replace(/'/g,"\\'")}')">Book Appointment for ${e.name}</button>
    </div>`).join("")}

  <span class="eyebrow" style="margin-top:6px; display:block;">Add family member</span>
  <div class="card">
    <input class="med-input" id="famName" placeholder="Name">
    <input class="med-input" id="famRelation" placeholder="Relation, e.g. Mother, Father, Son">
    <input class="med-input" id="famAge" placeholder="Age" type="number">
    <button class="btn btn-marigold" onclick="window.addFamilyMember()">Add Family Member</button>
  </div>
  `}function P(){return`
  ${l("Doctor Login","Select your hospital to sign in",!0)}
  <input class="search-input" placeholder="Search hospital name..." oninput="window.filterDoctorHospitals(this.value)">
  <div id="docHospResults">${ae(a.hospitals||c)}</div>
  `}function ae(e){return e.map(t=>`
    <div class="card" onclick="window.suhaGo('doctorPassword', {pendingDoctorHospital:'${t.id}'})">
      <div style="font-weight:600; font-size:14px; color:var(--teal-deep);">${t.name}</div>
      <div class="fine">${t.area}</div>
    </div>`).join("")}function ie(){const e=(a.hospitals||c).find(t=>t.id===a.pendingDoctorHospital)||c[0];return`
  ${l("Doctor Login",e.name,!0)}
  <div class="card">
    <span class="eyebrow">Enter your password</span>
    <input class="search-input" type="password" id="docPwd" placeholder="Password" onkeydown="if(event.key==='Enter') window.submitDoctorLogin()">
    <button class="btn btn-primary" onclick="window.submitDoctorLogin()">Login</button>
  </div>
  <div class="fine">Demo mode — any password works.</div>
  `}function S(){const e=a.currentDoctor||m[0];return`
  <div class="hero-card">
    <span class="tag tag-marigold" style="margin-bottom:8px; display:inline-block;">${((a.hospitals||c).find(i=>i.id===(a.doctorHospital||e.hospital))||c[0]).name}</span>
    <h3>${e.name}</h3>
    <p>${e.spec} · Today's OP timing 09:00 AM – 06:00 PM</p>
  </div>
  <div class="row" style="margin-bottom:8px;">
    <span class="eyebrow" style="margin:0;">Today's appointments</span>
    <span class="tag">${a.doctorAppointments.length} patients</span>
  </div>
  ${a.doctorAppointments.map((i,s)=>`
    <div class="card">
      <div class="row">
        <div class="row" style="gap:12px;">
          <div class="avatar">${i.patient[0]}</div>
          <div>
            <div style="font-weight:600; font-size:14px;">${i.patient}</div>
            <div class="fine">${i.reason}</div>
          </div>
        </div>
        <div style="text-align:right;">
          <div class="mono" style="font-size:12.5px; font-weight:600;">${i.time}</div>
          <div class="tag tag-marigold" style="margin-top:4px;">Token #${s+1}</div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="row">
        <span class="tag">${i.status}</span>
        <button class="btn btn-ghost btn-sm" onclick="window.suhaGo('reschedule', {rescheduleIdx:${s}, rescheduleNewTime:null})">⚠️ Emergency — Change Time</button>
      </div>
    </div>`).join("")}
  `}function se(){const e=a.doctorAppointments[a.rescheduleIdx]||a.doctorAppointments[0],i=(a.currentDoctor||m[0]).slots.map(n=>n.t),s=a.doctorAppointments.filter((n,o)=>o!==a.rescheduleIdx).map(n=>n.time);return`
  ${l("Change Appointment Time","Emergency reschedule",!0)}
  <div class="card">
    <div class="row" style="gap:12px;">
      <div class="avatar">${e.patient[0]}</div>
      <div>
        <div style="font-weight:600; font-size:14px;">${e.patient}</div>
        <div class="fine">${e.reason}</div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="row"><span class="fine">Current time</span><span class="mono" style="font-size:12.5px;">${e.time}</span></div>
  </div>
  <span class="eyebrow">Choose from your own appointment timings</span>
  <div class="slot-grid">
    ${i.map(n=>{const o=s.includes(n)&&n!==e.time,p=a.rescheduleNewTime===n;return`<div class="slot ${o?"taken":""} ${p?"selected":""}"
        onclick="${o?"":`window.selectRescheduleTime('${n}')`}">${n}</div>`}).join("")}
  </div>
  <div class="fine" style="margin-bottom:14px;">These are your own OP timings for today. The patient will be notified on their phone (SMS if offline) the moment you confirm.</div>
  <button class="btn btn-alert" ${a.rescheduleNewTime?"":'style="opacity:0.45; pointer-events:none;"'} onclick="window.confirmReschedule()">
    Confirm New Time${a.rescheduleNewTime?" · "+a.rescheduleNewTime:""}
  </button>
  `}function ne(){return`
  ${l("My Patients","Search a patient to view their reports",!0)}
  <input class="search-input" placeholder="Search patient name..." oninput="window.filterPatients(this.value)">
  <div id="patientResults">${oe(a.samplePatients||h)}</div>
  `}function oe(e){return e.map(t=>`
    <div class="card" onclick="window.suhaGo('patientRecord', {selPatient:'${t.id}'})">
      <div class="row">
        <div class="row" style="gap:12px;">
          <div class="avatar">${t.name[0]}</div>
          <div>
            <div style="font-weight:600; font-size:14px;">${t.name}</div>
            <div class="fine">Age ${t.age} · Last visit ${t.lastVisit}</div>
          </div>
        </div>
        <span class="tag">${t.reports.length} reports</span>
      </div>
    </div>`).join("")}function re(){const e=(a.samplePatients||h).find(i=>i.id===a.selPatient)||h[0],t=(a.doctors||m).filter(i=>i.id!==(a.currentDoctor?a.currentDoctor.id:""));return`
  ${l(e.name,"Age "+e.age+" · "+e.phone,!0)}
  <span class="eyebrow">Lab reports</span>
  ${e.reports.length?e.reports.map((i,s)=>`
    <div class="card">
      <div class="row">
        <div>
          <div style="font-weight:600; font-size:13.5px;">${i.name}</div>
          <div class="fine">${i.lab} · ${i.date}</div>
        </div>
        <button class="btn btn-outline btn-sm" onclick="window.doctorViewReport('${e.id}', ${s})">View</button>
      </div>
    </div>`).join(""):'<div class="fine">No reports shared yet.</div>'}

  <span class="eyebrow" style="margin-top:6px; display:block;">Prescribe medicine</span>
  <div class="card">
    <input class="med-input" id="medName" placeholder="Medicine name, e.g. Paracetamol 500mg">
    <input class="med-input" id="medDose" placeholder="Dosage, e.g. 2x/day, 5 days">
    <textarea id="medNotes" rows="2" placeholder="Notes for patient (optional)"></textarea>
    <button class="btn btn-marigold" onclick="window.prescribe('${e.id}')">Send Prescription to Patient</button>
  </div>

  ${e.prescriptions&&e.prescriptions.length?'<span class="eyebrow">Past prescriptions</span>'+e.prescriptions.map(i=>`
    <div class="card">
      <div class="fine" style="font-weight:600; color:var(--teal-deep);">${i.date} · ${i.doctor}</div>
      ${i.meds.map(s=>`<div class="fine">• ${s}</div>`).join("")}
    </div>`).join(""):""}

  <span class="eyebrow" style="margin-top:6px; display:block;">⚠️ Refer to a specialist</span>
  <div class="card">
    <select class="search-input" id="referDoctor">
      ${t.map(i=>`<option value="${i.id}">${i.name} — ${i.spec}</option>`).join("")}
    </select>
    <textarea id="referReason" rows="2" placeholder="Reason for referral, e.g. Needs cardiology review"></textarea>
    <button class="btn btn-outline" onclick="window.referPatient('${e.id}')">Send Referral</button>
  </div>
  `}function de(){const e=a.doubts.filter(i=>!i.answer),t=a.doubts.filter(i=>i.answer);return`
  ${l("Patient Doubts","General health questions — asked anonymously, any doctor can answer",!0)}
  <span class="eyebrow">🕓 Waiting for answer (${e.length})</span>
  ${e.length?e.map(i=>`
    <div class="card">
      <div class="row"><span class="tag">${i.id}</span><span class="tag tag-marigold">New</span></div>
      <div style="font-weight:600; font-size:13.5px; margin-top:8px;">${i.question}</div>
      <div class="divider"></div>
      <textarea id="ans_${i.id}" rows="2" placeholder="Type your answer..."></textarea>
      <button class="btn btn-marigold btn-sm" style="margin-top:8px;" onclick="window.answerDoubt('${i.id}')">Post Answer</button>
    </div>`).join(""):'<div class="fine" style="margin-bottom:12px;">No pending doubts right now.</div>'}

  ${t.length?`
  <span class="eyebrow" style="margin-top:10px; display:block;">✅ Answered</span>
  ${t.map(i=>`
    <div class="card">
      <div class="row"><span class="tag">${i.id}</span><span class="tag">${i.answeredBy}</span></div>
      <div style="font-weight:600; font-size:13.5px; margin-top:8px;">${i.question}</div>
      <div class="divider"></div>
      <div class="fine">${i.answer}</div>
    </div>`).join("")}`:""}
  `}function A(){return`
  ${l("Lab Login","Search your lab to sign in",!0)}
  <input class="search-input" placeholder="Search lab name..." oninput="window.filterLabLogin(this.value)">
  <div id="labLoginResults">${le(a.labs||u)}</div>
  `}function le(e){return e.map(t=>`
    <div class="card" onclick="window.suhaGo('labPassword', {pendingLab:'${t.id}'})">
      <div style="font-weight:600; font-size:14px; color:var(--teal-deep);">${t.name}</div>
      <div class="fine">${t.area}</div>
    </div>`).join("")}function ce(){const e=(a.labs||u).find(t=>t.id===a.pendingLab)||u[0];return`
  ${l("Lab Login",e.name,!0)}
  <div class="card">
    <span class="eyebrow">Enter your password</span>
    <input class="search-input" type="password" id="labPwd" placeholder="Password" onkeydown="if(event.key==='Enter') window.submitLabLogin()">
    <button class="btn btn-primary" onclick="window.submitLabLogin()">Login</button>
  </div>
  <div class="fine">Demo mode — any password works.</div>
  `}function M(){const e=(a.labs||u).find(i=>i.id===a.labId)||u[0],t=a.homeCollectionRequests.filter(i=>i.lab===e.name);return`
  <div class="hero-card">
    <span class="tag tag-marigold" style="margin-bottom:8px; display:inline-block;">${a.labLocation||"Sivakasi"}</span>
    <h3>${e.name}</h3>
    <p>${e.area} · ${e.timing}</p>
  </div>

  ${t.length?`
  <span class="eyebrow">🏠 Home collection requests</span>
  ${t.map((i,s)=>`
    <div class="card">
      <div class="row">
        <div>
          <div style="font-weight:600; font-size:13.5px;">${i.patientName}</div>
          <div class="fine">Requested ${i.date}</div>
        </div>
        <span class="tag ${i.status==="Collected"?"":"tag-marigold"}">${i.status}</span>
      </div>
      ${i.status==="Pending"?`<div class="divider"></div><button class="btn btn-ghost btn-sm" onclick="window.markCollected('${e.name.replace(/'/g,"\\'")}', ${s})">Mark Sample Collected</button>`:""}
    </div>`).join("")}
  `:""}

  <span class="eyebrow">Upload a report</span>
  <input class="search-input" placeholder="Search patient name..." oninput="window.filterLabPatients(this.value)">
  <div id="labPatientResults">${pe(a.samplePatients||h)}</div>
  `}function pe(e){return e.map(t=>`
    <div class="card" onclick="window.suhaGo('labPatientRecord', {labSelPatient:'${t.id}'})">
      <div class="row">
        <div class="row" style="gap:12px;">
          <div class="avatar">${t.name[0]}</div>
          <div>
            <div style="font-weight:600; font-size:14px;">${t.name}</div>
            <div class="fine">${t.phone}</div>
          </div>
        </div>
        <span class="tag">${t.reports.length} reports</span>
      </div>
    </div>`).join("")}function ve(){const e=(a.samplePatients||h).find(t=>t.id===a.labSelPatient)||h[0];return`
  ${l(e.name,e.phone,!0)}
  <span class="eyebrow">Existing reports</span>
  ${e.reports.length?e.reports.map(t=>`
    <div class="card">
      <div style="font-weight:600; font-size:13.5px;">${t.name}</div>
      <div class="fine">${t.lab} · ${t.date}</div>
    </div>`).join(""):'<div class="fine">No reports yet.</div>'}

  <span class="eyebrow" style="margin-top:6px; display:block;">Upload new report</span>
  <div class="card">
    <input class="med-input" id="reportName" placeholder="Test name, e.g. Blood Test – CBC">
    <input class="med-input" id="reportDate" placeholder="Date, e.g. 23 Aug 2026" value="23 Aug 2026">
    <button class="btn btn-marigold" onclick="window.uploadReport('${e.id}')">Upload &amp; Send to Patient</button>
  </div>
  <div class="fine">Once uploaded, the report appears instantly in the patient's login and can be shared with their doctor from there.</div>
  `}const a={lang:"en",persona:null,screen:"appHome",history:[],selHospital:null,selDoctor:null,selSlot:null,selReason:"",selLab:null,selPatient:null,doctorHospital:null,currentDoctor:m[0],hospitals:c,doctors:m,labs:u,samplePatients:h,myAppointments:[{hospital:"Sivakasi General Hospital",doctor:"Dr. R. Kavitha",spec:"General Physician",date:"25 Aug 2026",time:"09:30 AM",status:"Upcoming",patientName:"You",token:2}],myPrescriptions:[{doctor:"Dr. R. Kavitha",hospital:"Sivakasi General Hospital",date:"12 Aug 2026",meds:["Amoxicillin 500mg – 3x/day, 5 days","ORS – as needed"]}],myReports:[{name:"Blood Test – CBC",date:"10 Aug 2026",lab:"Sivakasi Diagnostic Centre",sharedWithDoctor:!0,accessLog:[{by:"Dr. R. Kavitha",role:"Doctor",time:"12 Aug 2026, 10:20 AM"}]}],myReferrals:[],doctorAppointments:[{patient:"Muthu Kumar",time:"09:00 AM",reason:"Fever, follow-up",status:"Confirmed"},{patient:"Lakshmi Priya",time:"09:30 AM",reason:"General checkup",status:"Confirmed"},{patient:"Karthik Raja",time:"11:30 AM",reason:"Sugar review",status:"Confirmed"}],referrals:[],familyMembers:[{id:"self",name:"You",relation:"Self",age:31}],bookingFor:"You",homeCollectionRequests:[],pharmacyCart:[],myOrders:[],doubts:[],aiChat:[],aiVoiceLang:"en-IN",aiSpeakReplies:!0,labLocation:"",labId:null,labSelPatient:null,pendingDoctorHospital:null,pendingLab:null,rescheduleIdx:null,rescheduleNewTime:null};function r(e){return B(a.lang,e)}function me(){a.lang=a.lang==="en"?"ta":"en",v()}function f(e,t){a.history.push(a.screen),t&&Object.assign(a,t),a.screen=e,v()}function D(){a.screen=a.history.pop()||"landing",v()}function k(){a.history=[],a.screen="landing",v()}function ue(e){a.persona=e,a.history=[],e==="patient"?a.screen="home":e==="doctor"?a.screen=a.doctorHospital?"doctorDashboard":"doctorLogin":a.screen=a.labId?"labDashboard":"labLogin",v()}function d(e){const t=document.getElementById("toastHost");if(!t)return;const i=document.createElement("div");i.className="toast",i.innerHTML=`<span>✅</span><span>${e}</span>`,t.innerHTML="",t.appendChild(i),setTimeout(()=>{t.contains(i)&&t.removeChild(i)},2800)}function he(e){const t=e.split("–")[0].trim().toLowerCase(),i={paracetamol:20,amoxicillin:65,vitamin:90,ors:25,azithromycin:110,cetirizine:30,pantoprazole:55,calcium:75};for(const n in i)if(t.includes(n))return i[n];let s=0;for(let n=0;n<t.length;n++)s+=t.charCodeAt(n);return 30+s%90}function b(){return a.pharmacyCart.reduce((e,t)=>e+t.price,0)}function ge(e,t){const i=a.pharmacyCart.findIndex(s=>s.name===e);i>-1?(a.pharmacyCart.splice(i,1),d("Removed from cart")):(a.pharmacyCart.push({name:e,price:t}),d(e+" added to cart")),v()}function fe(){const e=a.myPrescriptions.flatMap(t=>t.meds);return`You are the in-app AI assistant for "Suha Health Care" — a hospital search, doctor appointment booking, e-prescription and pharmacy app for Sivakasi and nearby towns in Tamil Nadu, India.
Always reply in the same language and script the patient used. Keep answers short and conversational (2-4 sentences max).
${e.length?`Patient medicines: ${e.join(", ")}.`:""}`}async function R(){if(a.aiChat.some(i=>i.pending))return;const e=document.getElementById("aiInput");if(!e)return;const t=e.value.trim();if(t){e.value="",a.aiChat.push({role:"user",content:t}),a.aiChat.push({role:"assistant",content:"",pending:!0}),v();try{const i=a.aiChat.filter(p=>!p.pending).map(p=>({role:p.role,content:p.content})),n=await(await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:800,system:fe(),messages:i})})).json(),o=(n&&n.content||[]).map(p=>p.text||"").join(`
`).trim()||"I am ready to help you with doctor appointments, medicines and lab reports.";a.aiChat=a.aiChat.filter(p=>!p.pending),a.aiChat.push({role:"assistant",content:o}),ye(o)}catch{a.aiChat=a.aiChat.filter(i=>!i.pending),a.aiChat.push({role:"assistant",content:"You can book appointments, view your prescriptions, and order medicines directly in this app!"})}v()}}function ye(e){if(!a.aiSpeakReplies||!window.speechSynthesis||!e)return;window.speechSynthesis.cancel();const t=new SpeechSynthesisUtterance(e);t.lang=/[\u0B80-\u0BFF]/.test(e)?"ta-IN":"en-IN",window.speechSynthesis.speak(t)}let g=null;function we(){const e=window.SpeechRecognition||window.webkitSpeechRecognition;if(!e){d("Voice input is not supported on this device");return}if(g){g.stop();return}g=new e,g.lang=a.aiVoiceLang,g.onstart=()=>{const t=document.getElementById("aiMicBtn");t&&(t.textContent="🎙️ Listening…")},g.onresult=t=>{const i=t.results[0][0].transcript,s=document.getElementById("aiInput");s&&(s.value=i),i&&i.trim()&&R()},g.onend=()=>{g=null;const t=document.getElementById("aiMicBtn");t&&(t.textContent="🎤 Speak")},g.start()}window.suhaGo=f;window.suhaBack=D;window.suhaToast=d;window.setPersona=ue;window.toggleLang=me;window.goLanding=k;window.toggleCartItem=ge;window.sendAiMessage=R;window.toggleAiMic=we;window.toggleAiVoiceLang=()=>{a.aiVoiceLang=a.aiVoiceLang==="ta-IN"?"en-IN":"ta-IN",v()};window.toggleAiSpeakReplies=()=>{a.aiSpeakReplies=!a.aiSpeakReplies,!a.aiSpeakReplies&&window.speechSynthesis&&window.speechSynthesis.cancel(),v()};window.selectSlot=e=>{a.selSlot=e,v()};window.captureReasonAndContinue=()=>{const e=document.getElementById("visitReason");a.selReason=e?e.value.trim():"",f("payment")};window.confirmBooking=async()=>{const e=(a.doctors||m).find(n=>n.id===a.selDoctor)||m[0],i={hospital:((a.hospitals||c).find(n=>n.id===e.hospital)||c[0]).name,doctor:e.name,spec:e.spec,date:"25 Aug 2026",time:a.selSlot||"09:30 AM",status:"Upcoming",patientName:a.bookingFor||"You",token:0,reason:a.selReason||""},s=await C.addAppointment(i);i.token=s,a.myAppointments.unshift(i),f("confirmation")};window.orderFromPrescription=e=>{const t=c.find(i=>i.name===e)||c[0];f("hospitalPharmacy",{selHospital:t.id})};window.confirmPharmacyOrder=()=>{if(!a.pharmacyCart.length){d("Your cart is empty");return}const e=c.find(i=>i.id===a.selHospital),t={id:"ORD"+(1e3+a.myOrders.length+1),hospital:e?e.name:"SuhaCare Pharmacy",items:a.pharmacyCart.slice(),total:b(),status:"Preparing",date:"23 Aug 2026"};a.myOrders.unshift(t),a.pharmacyCart=[],f("pharmacyOrderConfirm")};window.postDoubt=async()=>{const e=document.getElementById("doubtText"),t=e?e.value.trim():"";if(!t){d("Type your doubt first");return}const i=await C.addDoubt(t);a.doubts.unshift({id:i,question:t,answer:null,answeredBy:null}),d("Your doubt has been posted anonymously"),v()};window.answerDoubt=e=>{const t=document.getElementById("ans_"+e),i=t?t.value.trim():"";if(!i){d("Type an answer first");return}const s=a.doubts.find(n=>n.id===e);s&&(s.answer=i,s.answeredBy=a.currentDoctor?a.currentDoctor.name:"Dr. R. Kavitha",d("Answer posted"),v())};window.bookForMember=e=>{a.bookingFor=e,d("Booking flow set for "+e),f("hospitalSearch")};window.addFamilyMember=()=>{const e=document.getElementById("famName"),t=document.getElementById("famRelation"),i=document.getElementById("famAge"),s=e?e.value.trim():"",n=t&&t.value.trim()||"Family",o=i&&i.value.trim()||"—";if(!s){d("Enter a name first");return}a.familyMembers.push({id:"fam"+Date.now(),name:s,relation:n,age:o}),d(s+" added to your family profile"),v()};window.requestHomeCollection=e=>{const t=u.find(i=>i.id===e)||u[0];a.homeCollectionRequests.unshift({patientName:a.bookingFor||"You",lab:t.name,date:"23 Aug 2026",status:"Pending"}),d("Home sample collection requested from "+t.name)};window.toggleShareReport=e=>{const t=a.myReports.find(i=>i.name===e);t&&(t.sharedWithDoctor=!t.sharedWithDoctor,d(t.sharedWithDoctor?"Report shared with doctor":"Access revoked"),v())};window.filterHospitals=e=>{e=e.toLowerCase();const t=(a.hospitals||c).filter(s=>s.name.toLowerCase().includes(e)||s.area.toLowerCase().includes(e)),i=document.getElementById("hospitalResults");i&&(i.innerHTML=t.length?window.hospitalCards(t):'<div class="empty-state"><h3>No hospitals found</h3></div>')};window.hospitalCards=e=>e.map(t=>`
    <div class="card" onclick="window.suhaGo('hospitalDetail', {selHospital:'${t.id}'})">
      <div class="row">
        <div>
          <div style="font-weight:600; font-size:14.5px; color:var(--teal-deep);">${t.name}</div>
          <div class="fine">${t.area}</div>
        </div>
        <span class="tag">${t.distance}</span>
      </div>
      <div class="divider"></div>
      <div class="row">
        <span class="fine">🕒 ${t.timing}</span>
        <span class="fine">${m.filter(i=>i.hospital===t.id).length} doctors</span>
      </div>
    </div>`).join("");window.filterDoctorHospitals=e=>{e=e.toLowerCase();const t=(a.hospitals||c).filter(s=>s.name.toLowerCase().includes(e)),i=document.getElementById("docHospResults");i&&(i.innerHTML=t.length?window.doctorHospitalCards(t):'<div class="empty-state"><h3>No hospital found</h3></div>')};window.doctorHospitalCards=e=>e.map(t=>`
    <div class="card" onclick="window.suhaGo('doctorPassword', {pendingDoctorHospital:'${t.id}'})">
      <div style="font-weight:600; font-size:14px; color:var(--teal-deep);">${t.name}</div>
      <div class="fine">${t.area}</div>
    </div>`).join("");window.submitDoctorLogin=()=>{var t;if(!((t=document.getElementById("docPwd"))==null?void 0:t.value)){d("Enter your password");return}a.doctorHospital=a.pendingDoctorHospital,a.currentDoctor=m.find(i=>i.hospital===a.doctorHospital)||m[0],d("Logged in as "+a.currentDoctor.name),a.history=[],f("doctorDashboard")};window.selectRescheduleTime=e=>{a.rescheduleNewTime=e,v()};window.confirmReschedule=()=>{const e=a.doctorAppointments[a.rescheduleIdx||0];e&&a.rescheduleNewTime&&(e.time=a.rescheduleNewTime,e.status="Rescheduled",d(e.patient+" appointment moved to "+e.time),a.rescheduleNewTime=null,D())};window.filterPatients=e=>{e=e.toLowerCase();const t=(a.samplePatients||h).filter(s=>s.name.toLowerCase().includes(e)),i=document.getElementById("patientResults");i&&(i.innerHTML=t.length?window.patientCards(t):'<div class="empty-state"><h3>No patient found</h3></div>')};window.patientCards=e=>e.map(t=>`
    <div class="card" onclick="window.suhaGo('patientRecord', {selPatient:'${t.id}'})">
      <div class="row">
        <div class="row" style="gap:12px;">
          <div class="avatar">${t.name[0]}</div>
          <div>
            <div style="font-weight:600; font-size:14px;">${t.name}</div>
            <div class="fine">Age ${t.age} · Last visit ${t.lastVisit}</div>
          </div>
        </div>
        <span class="tag">${(t.reports||[]).length} reports</span>
      </div>
    </div>`).join("");window.doctorViewReport=(e,t)=>{const i=(a.samplePatients||h).find(s=>s.id===e);if(i&&i.reports[t]){const s=i.reports[t];s.accessLog||(s.accessLog=[]),s.accessLog.unshift({by:a.currentDoctor.name,role:"Doctor",time:"Just now"}),d("Opening "+s.name),v()}};window.prescribe=e=>{var n,o;const t=(n=document.getElementById("medName"))==null?void 0:n.value.trim(),i=(o=document.getElementById("medDose"))==null?void 0:o.value.trim();if(!t){d("Enter a medicine name first");return}const s=(a.samplePatients||h).find(p=>p.id===e);s&&(s.prescriptions||(s.prescriptions=[]),s.prescriptions.unshift({doctor:a.currentDoctor.name,date:"23 Aug 2026",meds:[`${t}${i?" – "+i:""}`]}),d("Prescription sent to "+s.name+" app"),v())};window.referPatient=e=>{var o,p;const t=(o=document.getElementById("referDoctor"))==null?void 0:o.value,i=((p=document.getElementById("referReason"))==null?void 0:p.value.trim())||"Specialist review recommended",s=m.find(y=>y.id===t)||m[0],n=(a.samplePatients||h).find(y=>y.id===e);n&&(a.referrals.unshift({patientId:e,patientName:n.name,doctorId:t,fromDoctor:a.currentDoctor.name,reason:i,date:"23 Aug 2026"}),e==="p0"&&a.myReferrals.unshift({doctorId:t,doctorName:s.name,spec:s.spec,hospitalName:"Referred Hospital",fromDoctor:a.currentDoctor.name,reason:i}),d("Referral sent for "+n.name),v())};window.doctorLogout=()=>{a.doctorHospital=null,k()};window.filterLabLogin=e=>{e=e.toLowerCase();const t=u.filter(s=>s.name.toLowerCase().includes(e)),i=document.getElementById("labLoginResults");i&&(i.innerHTML=t.length?window.labLoginCards(t):'<div class="empty-state"><h3>No lab found</h3></div>')};window.labLoginCards=e=>e.map(t=>`
    <div class="card" onclick="window.suhaGo('labPassword', {pendingLab:'${t.id}'})">
      <div style="font-weight:600; font-size:14px; color:var(--teal-deep);">${t.name}</div>
      <div class="fine">${t.area}</div>
    </div>`).join("");window.submitLabLogin=()=>{var i;if(!((i=document.getElementById("labPwd"))==null?void 0:i.value)){d("Enter your password");return}a.labId=a.pendingLab;const t=u.find(s=>s.id===a.labId);d("Logged in as "+(t?t.name:"Lab")),a.history=[],f("labDashboard")};window.markCollected=(e,t)=>{const s=a.homeCollectionRequests.filter(n=>n.lab===e)[t];s&&(s.status="Collected",d("Marked collected for "+s.patientName),v())};window.filterLabPatients=e=>{e=e.toLowerCase();const t=(a.samplePatients||h).filter(s=>s.name.toLowerCase().includes(e)),i=document.getElementById("labPatientResults");i&&(i.innerHTML=t.length?window.labPatientCards(t):'<div class="empty-state"><h3>No patient found</h3></div>')};window.labPatientCards=e=>e.map(t=>`
    <div class="card" onclick="window.suhaGo('labPatientRecord', {labSelPatient:'${t.id}'})">
      <div class="row">
        <div class="row" style="gap:12px;">
          <div class="avatar">${t.name[0]}</div>
          <div>
            <div style="font-weight:600; font-size:14px;">${t.name}</div>
            <div class="fine">${t.phone}</div>
          </div>
        </div>
        <span class="tag">${(t.reports||[]).length} reports</span>
      </div>
    </div>`).join("");window.uploadReport=e=>{var o,p;const t=(o=document.getElementById("reportName"))==null?void 0:o.value.trim(),i=((p=document.getElementById("reportDate"))==null?void 0:p.value.trim())||"23 Aug 2026";if(!t){d("Enter a test name first");return}const s=(a.samplePatients||h).find(y=>y.id===e),n=u.find(y=>y.id===a.labId)||u[0];s&&(s.reports||(s.reports=[]),s.reports.unshift({name:t,date:i,lab:n.name,sharedWithDoctor:!1,accessLog:[]}),d("Report uploaded to "+s.name+" app"),v())};window.labLogout=()=>{a.labId=null,k()};function be(){return[{id:"home",icon:"🏠",label:r("navHome")},{id:"hospitalSearch",icon:"🔍",label:r("navSearch")},{id:"myPrescriptions",icon:"💊",label:r("navPresc")},{id:"labLocation",icon:"🧪",label:r("navReports")},{id:"familyMembers",icon:"👨‍👩‍👧",label:r("navFamily")}].map(t=>`
    <button class="nav-item ${a.screen===t.id?"active":""}" onclick="state.history=[]; window.suhaGo('${t.id}')">
      <span class="nav-dot">${t.icon}</span>${t.label}
    </button>`).join("")}function $e(){const e=a.doctorHospital?[{id:"doctorDashboard",icon:"📋",label:r("navToday")},{id:"myPatients",icon:"🗂️",label:r("navPatients")},{id:"patientDoubts",icon:"❓",label:"Doubts"}]:[],t=a.doctorHospital?`
    <button class="nav-item" onclick="window.doctorLogout()"><span class="nav-dot">↩️</span>${r("navLogout")}</button>`:"";return e.map(i=>`
    <button class="nav-item ${a.screen===i.id?"active":""}" onclick="state.history=[]; window.suhaGo('${i.id}')">
      <span class="nav-dot">${i.icon}</span>${i.label}
    </button>`).join("")+t}function ke(){return a.labId?`
    <button class="nav-item ${a.screen==="labDashboard"?"active":""}" onclick="state.history=[]; window.suhaGo('labDashboard')">
      <span class="nav-dot">🧪</span>${r("navUpload")}
    </button>
    <button class="nav-item" onclick="window.labLogout()"><span class="nav-dot">↩️</span>${r("navLogout")}</button>
  `:""}function xe(){return`
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
  `}function Le(){return`
  <div style="text-align:center; padding:36px 6px 20px;">
    <div style="font-size:44px;">🩺</div>
    <h2 style="margin:12px 0 4px; color:var(--teal-deep);">${r("welcome")}</h2>
    <p class="fine">${r("chooseHow")}</p>
  </div>
  <div class="card" onclick="window.setPersona('patient')">
    <div style="display:flex; align-items:center; gap:12px;">
      <div class="avatar">🧑</div>
      <div>
        <div style="font-weight:700; font-size:15px; color:var(--teal-deep);">${r("patientLogin")}</div>
        <div class="fine">${r("patientLoginSub")}</div>
      </div>
    </div>
  </div>
  <div class="card" onclick="window.setPersona('doctor')">
    <div style="display:flex; align-items:center; gap:12px;">
      <div class="avatar">🩺</div>
      <div>
        <div style="font-weight:700; font-size:15px; color:var(--teal-deep);">${r("doctorLogin")}</div>
        <div class="fine">${r("doctorLoginSub")}</div>
      </div>
    </div>
  </div>
  <div class="card" onclick="window.setPersona('lab')">
    <div style="display:flex; align-items:center; gap:12px;">
      <div class="avatar">🧪</div>
      <div>
        <div style="font-weight:700; font-size:15px; color:var(--teal-deep);">${r("labLogin")}</div>
        <div class="fine">${r("labLoginSub")}</div>
      </div>
    </div>
  </div>
  `}function v(){const e=document.getElementById("screenBody"),t=document.getElementById("bottomNav"),i=document.getElementById("langBtn");if(i&&(i.textContent=r("langBtn")),!(!e||!t)){if(a.screen==="appHome"){e.innerHTML=xe(),t.innerHTML="",e.scrollTop=0;return}if(a.screen==="landing"){e.innerHTML=Le(),t.innerHTML="",e.scrollTop=0;return}if(a.persona==="patient"){switch(a.screen){case"home":e.innerHTML=L();break;case"hospitalSearch":e.innerHTML=z();break;case"hospitalDetail":e.innerHTML=E();break;case"doctorDetail":e.innerHTML=j();break;case"payment":e.innerHTML=G();break;case"confirmation":e.innerHTML=F();break;case"myPrescriptions":e.innerHTML=V();break;case"hospitalPharmacy":e.innerHTML=Y();break;case"pharmacyCheckout":e.innerHTML=W();break;case"pharmacyOrderConfirm":e.innerHTML=_();break;case"myOrders":e.innerHTML=K();break;case"askDoubt":e.innerHTML=U();break;case"aiAssistant":e.innerHTML=J();break;case"labLocation":e.innerHTML=X();break;case"labList":e.innerHTML=Z();break;case"myReports":e.innerHTML=ee();break;case"myAppointments":e.innerHTML=q();break;case"familyMembers":e.innerHTML=te();break;default:e.innerHTML=L()}t.innerHTML=be()}else if(a.persona==="doctor"){switch(a.screen){case"doctorLogin":e.innerHTML=P();break;case"doctorPassword":e.innerHTML=ie();break;case"doctorDashboard":e.innerHTML=S();break;case"reschedule":e.innerHTML=se();break;case"myPatients":e.innerHTML=ne();break;case"patientRecord":e.innerHTML=re();break;case"patientDoubts":e.innerHTML=de();break;default:e.innerHTML=a.doctorHospital?S():P()}t.innerHTML=$e()}else{switch(a.screen){case"labLogin":e.innerHTML=A();break;case"labPassword":e.innerHTML=ce();break;case"labDashboard":e.innerHTML=M();break;case"labPatientRecord":e.innerHTML=ve();break;default:e.innerHTML=a.labId?M():A()}t.innerHTML=ke()}e.scrollTop=0}}document.addEventListener("DOMContentLoaded",()=>{v()});
