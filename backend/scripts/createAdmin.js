import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('admin123', salt);

    await User.findOneAndUpdate(
      { email: 'admin@nexus.com' },
      { 
        firstName: 'Nexus',
        lastName: 'Admin',
        email: 'admin@nexus.com', 
        password: password, 
        role: 'admin',
        isVerified: true
      },
      { upsert: true, new: true }
    );

    console.log('Admin account created! Email: admin@nexus.com | Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();
