import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true, trim: true },
    email: String,
    phone: String,
    program: String,
    qualification: String,
    specialization: String,
    status: { type: String, default: 'active' },
  },
  { timestamps: true }
);

export const Teacher = mongoose.model('Teacher', teacherSchema);
