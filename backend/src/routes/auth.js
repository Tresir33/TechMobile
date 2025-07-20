import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Pool } from 'pg';
const pool = new Pool({ user: 'postgres', database: 'ecommerce', password: 'your_password' });
async function signUp(email, password, userData) {
  const { user } = await createUserWithEmailAndPassword(getAuth(), email, password);
  // Add to Firestore
  await setDoc(doc(getFirestore(), 'users', user.uid), {
    user_id: user.uid,
    name: userData.name,
    surname: userData.surname,
    phone_number: userData.phone_number || null,
    date_of_birth: userData.date_of_birth,
    gender: userData.gender,
    role: userData.role
  });
  // Add to PostgreSQL
  await pool.query('INSERT INTO users (user_id, role) VALUES ($1, $2)', [user.uid, userData.role]);
}