import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth as getAdminAuth, createUser } from 'firebase-admin/auth';
import { Pool } from 'pg';
import express from 'express';
import dotenv from 'dotenv';
import admin from 'firebase-admin';

dotenv.config();
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
initializeApp(firebaseConfig);
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:password@db:5432/ecommerce'
});

const router = express.Router();

async function signUp(email, password, userData) {
  try {
    const userRecord = await admin.auth().createUser({ email, password });
    await setDoc(doc(getFirestore(), 'users', userRecord.uid), {
      user_id: userRecord.uid,
      name: userData.name,
      surname: userData.surname,
      phone_number: userData.phone_number || null,
      date_of_birth: userData.date_of_birth,
      gender: userData.gender,
      role: userData.role
    });
    await pool.query('INSERT INTO users (user_id, role) VALUES ($1, $2)', [userRecord.uid, userData.role]);
    return { success: true, userId: userRecord.uid };
  } catch (error) {
    throw new Error('Failed to sign up: ' + error.message);
  }
}

router.post('/signup', async (req, res) => {
  const { email, password, name, surname, phone_number, date_of_birth, gender, role } = req.body;
  if (!email || !password || !name || !surname || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (['employee', 'admin'].includes(role) && (!date_of_birth || !gender)) {
    return res.status(400).json({ error: 'date_of_birth and gender required for employee/admin' });
  }
  if (gender && ![1, 2, 3].includes(Number(gender))) {
    return res.status(400).json({ error: 'Invalid gender value' });
  }
  try {
    const result = await signUp(email, password, {
      name,
      surname,
      phone_number,
      date_of_birth: date_of_birth ? new Date(date_of_birth) : null,
      gender: gender ? Number(gender) : null,
      role
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;