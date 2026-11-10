import express from 'express';
import cors from 'cors';
import { dbAll, dbRun, dbGet } from './database.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 1. Hospitals API
app.get('/api/hospitals', async (req, res) => {
  try {
    const hospitals = await dbAll('SELECT * FROM hospitals');
    for (const h of hospitals) {
      const doctors = await dbAll('SELECT * FROM doctors WHERE hospital_id = ?', [h.id]);
      h.doctors = doctors;
    }
    res.json(hospitals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Doctors API
app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await dbAll('SELECT * FROM doctors');
    for (const d of doctors) {
      const slots = await dbAll('SELECT time_slot as t, is_open as open FROM doctor_slots WHERE doctor_id = ?', [d.id]);
      d.slots = slots.map(s => ({ t: s.t, open: Boolean(s.open) }));
    }
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/doctors/:id', async (req, res) => {
  try {
    const doctor = await dbGet('SELECT * FROM doctors WHERE id = ?', [req.params.id]);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    const slots = await dbAll('SELECT time_slot as t, is_open as open FROM doctor_slots WHERE doctor_id = ?', [doctor.id]);
    doctor.slots = slots.map(s => ({ t: s.t, open: Boolean(s.open) }));
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Appointments API
app.get('/api/appointments', async (req, res) => {
  try {
    const rows = await dbAll('SELECT * FROM appointments ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/appointments', async (req, res) => {
  try {
    const { hospital_name, doctor_name, spec, patient_name, appointment_date, appointment_time, reason } = req.body;
    const countRow = await dbGet('SELECT COUNT(*) as count FROM appointments');
    const token = (countRow ? countRow.count : 0) + 2;

    const result = await dbRun(
      `INSERT INTO appointments (hospital_name, doctor_name, spec, patient_name, appointment_date, appointment_time, status, token, reason)
       VALUES (?, ?, ?, ?, ?, ?, 'Upcoming', ?, ?)`,
      [hospital_name, doctor_name, spec, patient_name || 'You', appointment_date || '25 Aug 2026', appointment_time, token, reason || '']
    );

    res.json({ success: true, id: result.id, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/appointments/:id/reschedule', async (req, res) => {
  try {
    const { new_time } = req.body;
    await dbRun(`UPDATE appointments SET appointment_time = ?, status = 'Rescheduled' WHERE id = ?`, [new_time, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Prescriptions API
app.get('/api/prescriptions', async (req, res) => {
  try {
    const rows = await dbAll('SELECT * FROM prescriptions ORDER BY id DESC');
    const parsed = rows.map(r => ({
      ...r,
      meds: JSON.parse(r.meds_json || '[]')
    }));
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/prescriptions', async (req, res) => {
  try {
    const { patient_id, doctor_name, hospital_name, prescription_date, meds } = req.body;
    const result = await dbRun(
      `INSERT INTO prescriptions (patient_id, doctor_name, hospital_name, prescription_date, meds_json)
       VALUES (?, ?, ?, ?, ?)`,
      [patient_id, doctor_name, hospital_name, prescription_date || '23 Aug 2026', JSON.stringify(meds || [])]
    );
    res.json({ success: true, id: result.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Pharmacy Stock & Orders API
app.get('/api/pharmacy/stock', async (req, res) => {
  try {
    const stock = await dbAll('SELECT * FROM pharmacy_stock');
    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/pharmacy/orders', async (req, res) => {
  try {
    const rows = await dbAll('SELECT * FROM pharmacy_orders ORDER BY created_at DESC');
    const parsed = rows.map(r => ({
      ...r,
      items: JSON.parse(r.items_json || '[]')
    }));
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/pharmacy/orders', async (req, res) => {
  try {
    const { hospital_name, items, total } = req.body;
    const orderId = 'ORD' + (1000 + Math.floor(Math.random() * 9000));
    await dbRun(
      `INSERT INTO pharmacy_orders (id, hospital_name, items_json, total, status, order_date)
       VALUES (?, ?, ?, ?, 'Preparing', '23 Aug 2026')`,
      [orderId, hospital_name, JSON.stringify(items || []), total]
    );
    res.json({ success: true, id: orderId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Lab Reports API
app.get('/api/labs', async (req, res) => {
  try {
    const labs = await dbAll('SELECT * FROM labs');
    res.json(labs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/reports', async (req, res) => {
  try {
    const rows = await dbAll('SELECT * FROM lab_reports ORDER BY id DESC');
    const parsed = rows.map(r => ({
      ...r,
      sharedWithDoctor: Boolean(r.shared_with_doctor),
      accessLog: JSON.parse(r.access_log_json || '[]')
    }));
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/reports', async (req, res) => {
  try {
    const { patient_id, name, lab_name, report_date } = req.body;
    const result = await dbRun(
      `INSERT INTO lab_reports (patient_id, name, lab_name, report_date, shared_with_doctor, access_log_json)
       VALUES (?, ?, ?, ?, 0, '[]')`,
      [patient_id || 'p0', name, lab_name, report_date || '23 Aug 2026']
    );
    res.json({ success: true, id: result.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Doubts API
app.get('/api/doubts', async (req, res) => {
  try {
    const doubts = await dbAll('SELECT * FROM doubts ORDER BY created_at DESC');
    res.json(doubts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/doubts', async (req, res) => {
  try {
    const { question } = req.body;
    const countRow = await dbGet('SELECT COUNT(*) as count FROM doubts');
    const id = 'Q' + (1001 + (countRow ? countRow.count : 0));
    await dbRun(`INSERT INTO doubts (id, question) VALUES (?, ?)`, [id, question]);
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/doubts/:id/answer', async (req, res) => {
  try {
    const { answer, answered_by } = req.body;
    await dbRun(`UPDATE doubts SET answer = ?, answered_by = ? WHERE id = ?`, [answer, answered_by, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Family Members API
app.get('/api/family', async (req, res) => {
  try {
    const rows = await dbAll('SELECT * FROM family_members');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/family', async (req, res) => {
  try {
    const { name, relation, age } = req.body;
    const id = 'fam' + Date.now();
    await dbRun(`INSERT INTO family_members (id, name, relation, age) VALUES (?, ?, ?, ?)`, [id, name, relation, age]);
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Suha Care SQLite Backend running at http://localhost:${PORT}`);
});
