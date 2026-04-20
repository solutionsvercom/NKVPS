import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    full_name: { type: String, required: true, trim: true },
    role: { type: String, enum: ['admin', 'teacher', 'parent'], default: 'parent' },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
