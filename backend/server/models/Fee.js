import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema(
  {
    student_id: String,
    student_name: String,
    parent_email: String,
    program: String,
    amount: { type: Number, default: 0 },
    month: String,
    year: { type: Number, default: new Date().getFullYear() },
    status: { type: String, default: 'pending' },
    paid_date: String,
  },
  { timestamps: true }
);

export const Fee = mongoose.model('Fee', feeSchema);
