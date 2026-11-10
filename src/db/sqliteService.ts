import { Hospital, Doctor, Appointment, Prescription, PharmacyItem, PharmacyOrder, LabReport, Doubt, FamilyMember, Lab, Patient } from '../types';

const API_BASE = 'http://localhost:5000/api';

// Initial fallback dataset if offline or standalone APK
export const defaultHospitals: Hospital[] = [
  { id: 'h1', name: 'Sivakasi General Hospital', area: 'Main Road, Sivakasi', distance: '1.2 km', timing: '8:00 AM – 9:00 PM' },
  { id: 'h2', name: 'Sri Lakshmi Multispeciality', area: 'Thiruthangal Road, Sivakasi', distance: '2.4 km', timing: '9:00 AM – 8:00 PM' },
  { id: 'h3', name: 'Aravind Eye & General Hospital', area: 'Virudhunagar Bypass, Sivakasi', distance: '3.1 km', timing: 'Open 24 Hours' },
];

export const defaultDoctors: Doctor[] = [
  { id: 'd1', name: 'Dr. R. Kavitha', spec: 'General Physician', hospital: 'h1', fee: 200, slots: [
    { t: '09:00 AM', open: true }, { t: '09:30 AM', open: true }, { t: '10:00 AM', open: false },
    { t: '11:30 AM', open: true }, { t: '04:00 PM', open: true }, { t: '04:30 PM', open: false }
  ]},
  { id: 'd2', name: 'Dr. M. Senthil', spec: 'Orthopedic', hospital: 'h1', fee: 350, slots: [
    { t: '10:00 AM', open: true }, { t: '10:30 AM', open: false }, { t: '02:00 PM', open: true }, { t: '02:30 PM', open: true }
  ]},
  { id: 'd3', name: 'Dr. P. Anitha', spec: 'Pediatrician', hospital: 'h1', fee: 250, slots: [
    { t: '09:00 AM', open: true }, { t: '09:30 AM', open: true }, { t: '05:00 PM', open: true }
  ]},
  { id: 'd4', name: 'Dr. S. Muthuraj', spec: 'Cardiologist', hospital: 'h2', fee: 500, slots: [
    { t: '11:00 AM', open: true }, { t: '11:30 AM', open: false }, { t: '03:00 PM', open: true }
  ]},
  { id: 'd5', name: 'Dr. K. Devi', spec: 'Gynecologist', hospital: 'h2', fee: 400, slots: [
    { t: '10:00 AM', open: true }, { t: '10:30 AM', open: true }, { t: '06:00 PM', open: true }
  ]},
  { id: 'd6', name: 'Dr. A. Ramesh', spec: 'Ophthalmologist', hospital: 'h3', fee: 300, slots: [
    { t: '09:00 AM', open: true }, { t: '01:00 PM', open: true }, { t: '01:30 PM', open: false }
  ]},
  { id: 'd7', name: 'Dr. J. Priya', spec: 'Dermatologist', hospital: 'h3', fee: 350, slots: [
    { t: '12:00 PM', open: true }, { t: '12:30 PM', open: true }, { t: '05:30 PM', open: true }
  ]},
];

export const defaultLabs: Lab[] = [
  { id: 'l1', name: 'Sivakasi Diagnostic Centre', area: 'Main Road, Sivakasi', distance: '0.8 km', timing: '7:00 AM – 8:00 PM' },
  { id: 'l2', name: 'Metro Scans & Labs', area: 'Sattur Road, Sivakasi', distance: '1.9 km', timing: '8:00 AM – 9:00 PM' },
  { id: 'l3', name: 'City Clinical Labs', area: 'Virudhunagar Bypass, Sivakasi', distance: '2.7 km', timing: '6:30 AM – 7:00 PM' },
];

export const defaultPharmacyStock: PharmacyItem[] = [
  { name: 'Paracetamol 500mg (strip of 10)', price: 20 },
  { name: 'ORS Sachets (pack of 5)', price: 25 },
  { name: 'Vitamin C Tablets (strip of 15)', price: 70 },
  { name: 'Cough Syrup 100ml', price: 60 },
  { name: 'Antiseptic Cream', price: 45 },
];

export const defaultSamplePatients: Patient[] = [
  {
    id: 'p0', name: 'You (Patient App Account)', age: 31, phone: '98••••••00', lastVisit: '20 Aug 2026',
    reports: [
      { name: 'Blood Test – CBC', date: '10 Aug 2026', lab: 'Sivakasi Diagnostic Centre', sharedWithDoctor: true, accessLog: [{ by: 'Dr. R. Kavitha', role: 'Doctor', time: '12 Aug 2026, 10:20 AM' }] }
    ],
    prescriptions: [
      { doctor: 'Dr. R. Kavitha', hospital: 'Sivakasi General Hospital', date: '12 Aug 2026', meds: ['Amoxicillin 500mg – 3x/day, 5 days', 'ORS – as needed'] }
    ]
  },
  {
    id: 'p1', name: 'Muthu Kumar', age: 45, phone: '98••••••01', lastVisit: '12 Aug 2026',
    reports: [
      { name: 'Blood Test – CBC', date: '10 Aug 2026', lab: 'Sivakasi Diagnostic Centre', sharedWithDoctor: false, accessLog: [] },
      { name: 'X-Ray Chest', date: '11 Aug 2026', lab: 'Metro Scans & Labs', sharedWithDoctor: false, accessLog: [] }
    ],
    prescriptions: [{ doctor: 'Dr. R. Kavitha', date: '12 Aug 2026', meds: ['Paracetamol 500mg – 2x/day, 5 days', 'Vitamin D3 – 1x/week, 4 weeks'] }]
  },
  {
    id: 'p2', name: 'Lakshmi Priya', age: 29, phone: '98••••••02', lastVisit: '15 Aug 2026',
    reports: [{ name: 'Lipid Profile', date: '14 Aug 2026', lab: 'City Clinical Labs', sharedWithDoctor: false, accessLog: [] }],
    prescriptions: []
  },
  {
    id: 'p3', name: 'Karthik Raja', age: 34, phone: '98••••••03', lastVisit: '18 Aug 2026',
    reports: [
      { name: 'Sugar Test (Fasting)', date: '17 Aug 2026', lab: 'Sivakasi Diagnostic Centre', sharedWithDoctor: false, accessLog: [] },
      { name: 'ECG', date: '17 Aug 2026', lab: 'Sivakasi Diagnostic Centre', sharedWithDoctor: false, accessLog: [] }
    ],
    prescriptions: []
  }
];

class SQLiteService {
  private hasBackend = false;

  constructor() {
    this.checkBackend();
  }

  private async checkBackend() {
    try {
      const res = await fetch(`${API_BASE}/hospitals`, { signal: AbortSignal.timeout(1200) });
      if (res.ok) this.hasBackend = true;
    } catch {
      this.hasBackend = false;
    }
  }

  // Get Hospitals
  async getHospitals(): Promise<Hospital[]> {
    if (this.hasBackend) {
      try {
        const res = await fetch(`${API_BASE}/hospitals`);
        return await res.json();
      } catch (e) {
        console.warn('Backend fetch failed, using local store');
      }
    }
    const local = localStorage.getItem('suha_hospitals');
    return local ? JSON.parse(local) : defaultHospitals;
  }

  // Get Doctors
  async getDoctors(): Promise<Doctor[]> {
    if (this.hasBackend) {
      try {
        const res = await fetch(`${API_BASE}/doctors`);
        return await res.json();
      } catch (e) {
        console.warn('Backend fetch failed, using local store');
      }
    }
    const local = localStorage.getItem('suha_doctors');
    return local ? JSON.parse(local) : defaultDoctors;
  }

  // Add Appointment
  async addAppointment(appointment: Appointment): Promise<number> {
    if (this.hasBackend) {
      try {
        const res = await fetch(`${API_BASE}/appointments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            hospital_name: appointment.hospital,
            doctor_name: appointment.doctor,
            spec: appointment.spec,
            patient_name: appointment.patientName,
            appointment_date: appointment.date,
            appointment_time: appointment.time,
            reason: appointment.reason
          })
        });
        const data = await res.json();
        return data.token;
      } catch (e) {
        console.warn('Backend appointment add failed, saving locally');
      }
    }
    const local = JSON.parse(localStorage.getItem('suha_my_appointments') || '[]');
    const token = local.length + 2;
    appointment.token = token;
    local.unshift(appointment);
    localStorage.setItem('suha_my_appointments', JSON.stringify(local));
    return token;
  }

  // Add Doubt
  async addDoubt(question: string): Promise<string> {
    if (this.hasBackend) {
      try {
        const res = await fetch(`${API_BASE}/doubts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question })
        });
        const data = await res.json();
        return data.id;
      } catch (e) {
        console.warn('Backend doubt add failed, saving locally');
      }
    }
    const doubts = JSON.parse(localStorage.getItem('suha_doubts') || '[]');
    const id = 'Q' + (1001 + doubts.length);
    doubts.unshift({ id, question, answer: null, answeredBy: null });
    localStorage.setItem('suha_doubts', JSON.stringify(doubts));
    return id;
  }
}

export const sqliteService = new SQLiteService();
