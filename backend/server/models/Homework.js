import mongoose from 'mongoose';

const homeworkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    program: String,
    subject: String,
    due_date: String,
    status: { type: String, default: 'active' },
  },
  { timestamps: true }
);

export const Homework = mongoose.model('Homework', homeworkSchema);
