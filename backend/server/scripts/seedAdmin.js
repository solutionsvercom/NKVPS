import '../../load-env.js';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { connectDB, disconnectDB } from '../config/db.js';

const email = process.env.SEED_ADMIN_EMAIL || 'admin@littlestars.local';
const password = process.env.SEED_ADMIN_PASSWORD || 'Admin123!';
const full_name = process.env.SEED_ADMIN_NAME || 'School Admin';

async function run() {
  await connectDB();
  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Admin already exists:', email);
    await disconnectDB();
    return;
  }
  const passwordHash = await bcrypt.hash(password, 12);
  await User.create({ email, passwordHash, full_name, role: 'admin' });
  console.log('Created admin user:', email, '| password:', password);
  await disconnectDB();
}

run().catch((e) => {
  console.error(e);
  disconnectDB().finally(() => process.exit(1));
});
