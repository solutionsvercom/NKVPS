import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true, trim: true },
    date_of_birth: String,
    gender: String,
    program: { type: String, trim: true },
    section: String,
    parent_email: { type: String, lowercase: true, trim: true },
    parent_name: String,
    parent_phone: String,
    address: String,
    status: { type: String, default: 'active' },
  },
  { timestamps: true }
);

export const Student = mongoose.model('Student', studentSchema);
