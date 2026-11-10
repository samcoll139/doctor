import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'suhacare.db');

export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
    initSchemaAndSeed();
  }
});

// Helper for promise-based queries
export function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

export function dbAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export function dbGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

export async function initSchemaAndSeed() {
  db.serialize(async () => {
    // 1. Hospitals Table
    db.run(`CREATE TABLE IF NOT EXISTS hospitals (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      area TEXT NOT NULL,
      distance TEXT,
      timing TEXT
    )`);

    // 2. Doctors Table
    db.run(`CREATE TABLE IF NOT EXISTS doctors (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      spec TEXT NOT NULL,
      hospital_id TEXT,
      fee INTEGER,
      FOREIGN KEY(hospital_id) REFERENCES hospitals(id)
    )`);

    // 3. Doctor Slots Table
    db.run(`CREATE TABLE IF NOT EXISTS doctor_slots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      doctor_id TEXT,
      time_slot TEXT,
      is_open INTEGER DEFAULT 1,
      FOREIGN KEY(doctor_id) REFERENCES doctors(id)
    )`);

    // 4. Appointments Table
    db.run(`CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hospital_name TEXT,
      doctor_name TEXT,
      spec TEXT,
      patient_name TEXT,
      appointment_date TEXT,
      appointment_time TEXT,
      status TEXT,
      token INTEGER,
      reason TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // 5. Prescriptions Table
    db.run(`CREATE TABLE IF NOT EXISTS prescriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id TEXT,
      doctor_name TEXT,
      hospital_name TEXT,
      prescription_date TEXT,
      meds_json TEXT
    )`);

    // 6. Pharmacy Stock Table
    db.run(`CREATE TABLE IF NOT EXISTS pharmacy_stock (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price INTEGER NOT NULL
    )`);

    // 7. Pharmacy Orders Table
    db.run(`CREATE TABLE IF NOT EXISTS pharmacy_orders (
      id TEXT PRIMARY KEY,
      hospital_name TEXT,
      items_json TEXT,
      total INTEGER,
      status TEXT,
      order_date TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // 8. Lab Reports Table
    db.run(`CREATE TABLE IF NOT EXISTS lab_reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id TEXT,
      name TEXT,
      lab_name TEXT,
      report_date TEXT,
      shared_with_doctor INTEGER DEFAULT 0,
      access_log_json TEXT
    )`);

    // 9. Home Collections Table
    db.run(`CREATE TABLE IF NOT EXISTS home_collections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_name TEXT,
      lab_name TEXT,
      request_date TEXT,
      status TEXT
    )`);

    // 10. Doubts Table
    db.run(`CREATE TABLE IF NOT EXISTS doubts (
      id TEXT PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT,
      answered_by TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // 11. Family Members Table
    db.run(`CREATE TABLE IF NOT EXISTS family_members (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      relation TEXT,
      age INTEGER
    )`);

    // 12. Labs Table
    db.run(`CREATE TABLE IF NOT EXISTS labs (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      area TEXT NOT NULL,
      distance TEXT,
      timing TEXT
    )`);

    // Check if initial seeding needed
    db.get(`SELECT COUNT(*) as count FROM hospitals`, async (err, row) => {
      if (!err && row && row.count === 0) {
        console.log('Seeding SQLite database with initial Suha Care data...');
        await seedData();
      }
    });
  });
}

async function seedData() {
  // Seed Hospitals
  const hospitals = [
    { id: 'h1', name: 'Sivakasi General Hospital', area: 'Main Road, Sivakasi', distance: '1.2 km', timing: '8:00 AM – 9:00 PM' },
    { id: 'h2', name: 'Sri Lakshmi Multispeciality', area: 'Thiruthangal Road, Sivakasi', distance: '2.4 km', timing: '9:00 AM – 8:00 PM' },
    { id: 'h3', name: 'Aravind Eye & General Hospital', area: 'Virudhunagar Bypass, Sivakasi', distance: '3.1 km', timing: 'Open 24 Hours' }
  ];
  for (const h of hospitals) {
    await dbRun(`INSERT INTO hospitals (id, name, area, distance, timing) VALUES (?, ?, ?, ?, ?)`,
      [h.id, h.name, h.area, h.distance, h.timing]);
  }

  // Seed Labs
  const labs = [
    { id: 'l1', name: 'Sivakasi Diagnostic Centre', area: 'Main Road, Sivakasi', distance: '0.8 km', timing: '7:00 AM – 8:00 PM' },
    { id: 'l2', name: 'Metro Scans & Labs', area: 'Sattur Road, Sivakasi', distance: '1.9 km', timing: '8:00 AM – 9:00 PM' },
    { id: 'l3', name: 'City Clinical Labs', area: 'Virudhunagar Bypass, Sivakasi', distance: '2.7 km', timing: '6:30 AM – 7:00 PM' }
  ];
  for (const l of labs) {
    await dbRun(`INSERT INTO labs (id, name, area, distance, timing) VALUES (?, ?, ?, ?, ?)`,
      [l.id, l.name, l.area, l.distance, l.timing]);
  }

  // Seed Doctors
  const doctors = [
    { id: 'd1', name: 'Dr. R. Kavitha', spec: 'General Physician', hospital_id: 'h1', fee: 200, slots: [
      { t: '09:00 AM', open: 1 }, { t: '09:30 AM', open: 1 }, { t: '10:00 AM', open: 0 },
      { t: '11:30 AM', open: 1 }, { t: '04:00 PM', open: 1 }, { t: '04:30 PM', open: 0 }
    ]},
    { id: 'd2', name: 'Dr. M. Senthil', spec: 'Orthopedic', hospital_id: 'h1', fee: 350, slots: [
      { t: '10:00 AM', open: 1 }, { t: '10:30 AM', open: 0 }, { t: '02:00 PM', open: 1 }, { t: '02:30 PM', open: 1 }
    ]},
    { id: 'd3', name: 'Dr. P. Anitha', spec: 'Pediatrician', hospital_id: 'h1', fee: 250, slots: [
      { t: '09:00 AM', open: 1 }, { t: '09:30 AM', open: 1 }, { t: '05:00 PM', open: 1 }
    ]},
    { id: 'd4', name: 'Dr. S. Muthuraj', spec: 'Cardiologist', hospital_id: 'h2', fee: 500, slots: [
      { t: '11:00 AM', open: 1 }, { t: '11:30 AM', open: 0 }, { t: '03:00 PM', open: 1 }
    ]},
    { id: 'd5', name: 'Dr. K. Devi', spec: 'Gynecologist', hospital_id: 'h2', fee: 400, slots: [
      { t: '10:00 AM', open: 1 }, { t: '10:30 AM', open: 1 }, { t: '06:00 PM', open: 1 }
    ]},
    { id: 'd6', name: 'Dr. A. Ramesh', spec: 'Ophthalmologist', hospital_id: 'h3', fee: 300, slots: [
      { t: '09:00 AM', open: 1 }, { t: '01:00 PM', open: 1 }, { t: '01:30 PM', open: 0 }
    ]},
    { id: 'd7', name: 'Dr. J. Priya', spec: 'Dermatologist', hospital_id: 'h3', fee: 350, slots: [
      { t: '12:00 PM', open: 1 }, { t: '12:30 PM', open: 1 }, { t: '05:30 PM', open: 1 }
    ]}
  ];
  for (const d of doctors) {
    await dbRun(`INSERT INTO doctors (id, name, spec, hospital_id, fee) VALUES (?, ?, ?, ?, ?)`,
      [d.id, d.name, d.spec, d.hospital_id, d.fee]);
    for (const s of d.slots) {
      await dbRun(`INSERT INTO doctor_slots (doctor_id, time_slot, is_open) VALUES (?, ?, ?)`,
        [d.id, s.t, s.open]);
    }
  }

  // Seed Pharmacy Stock
  const stock = [
    { name: 'Paracetamol 500mg (strip of 10)', price: 20 },
    { name: 'ORS Sachets (pack of 5)', price: 25 },
    { name: 'Vitamin C Tablets (strip of 15)', price: 70 },
    { name: 'Cough Syrup 100ml', price: 60 },
    { name: 'Antiseptic Cream', price: 45 }
  ];
  for (const s of stock) {
    await dbRun(`INSERT INTO pharmacy_stock (name, price) VALUES (?, ?)`, [s.name, s.price]);
  }

  // Seed Initial Appointments
  await dbRun(`INSERT INTO appointments (hospital_name, doctor_name, spec, patient_name, appointment_date, appointment_time, status, token, reason)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ['Sivakasi General Hospital', 'Dr. R. Kavitha', 'General Physician', 'You', '25 Aug 2026', '09:30 AM', 'Upcoming', 2, 'Follow-up checkup']);

  // Seed Prescriptions
  await dbRun(`INSERT INTO prescriptions (patient_id, doctor_name, hospital_name, prescription_date, meds_json)
    VALUES (?, ?, ?, ?, ?)`,
    ['p0', 'Dr. R. Kavitha', 'Sivakasi General Hospital', '12 Aug 2026', JSON.stringify(['Amoxicillin 500mg – 3x/day, 5 days', 'ORS – as needed'])]);

  // Seed Lab Reports
  await dbRun(`INSERT INTO lab_reports (patient_id, name, lab_name, report_date, shared_with_doctor, access_log_json)
    VALUES (?, ?, ?, ?, ?, ?)`,
    ['p0', 'Blood Test – CBC', 'Sivakasi Diagnostic Centre', '10 Aug 2026', 1, JSON.stringify([{ by: 'Dr. R. Kavitha', role: 'Doctor', time: '12 Aug 2026, 10:20 AM' }])]);

  // Seed Family Members
  await dbRun(`INSERT INTO family_members (id, name, relation, age) VALUES (?, ?, ?, ?)`,
    ['self', 'You', 'Self', 31]);

  console.log('Seeding complete!');
}
