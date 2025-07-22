import admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase-admin/auth';
import { Pool } from 'pg';
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
initializeApp(firebaseConfig);
console.log('Initializing Firebase Admin...');
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS))
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:Tresilaho%4010@localhost:5432/ecommerce'
});

const router = express.Router();

async function verifyRecaptcha(token) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Add to .env
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secretKey}&response=${token}`
  });
  const data = await response.json();
  return data.success;
}

async function signUp(email, password, userData, recaptchaToken) {
  try {
    console.log('Creating user with email:', email);
    // Verify reCAPTCHA
    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      throw new Error('Invalid reCAPTCHA token');
    }

    const auth = getAuth();
    const userRecord = await auth.createUser({ email, password });
    console.log('User created, UID:', userRecord.uid);
    console.log('Writing to Firestore: users/', userRecord.uid);
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      user_id: userRecord.uid,
      name: userData.name,
      surname: userData.surname,
      phone_number: userData.phone_number || null,
      date_of_birth: userData.date_of_birth,
      gender: userData.gender,
      role: userData.role
    });
    console.log('Writing to PostgreSQL: user_id=', userRecord.uid, 'role=', userData.role);
    await pool.query('INSERT INTO users (user_id, role) VALUES ($1, $2)', [userRecord.uid, userData.role]);
    return { success: true, userId: userRecord.uid };
  } catch (error) {
    console.error('Signup error:', error);
    throw new Error('Failed to sign up: ' + error.message);
  }
}

router.post('/signup', async (req, res) => {
  const { email, password, name, surname, phone_number, date_of_birth, gender, role, recaptchaToken } = req.body;
  console.log('Signup request body:', req.body);
  if (!email || !password || !name || !surname || !role || !recaptchaToken) {
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
    }, recaptchaToken);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;