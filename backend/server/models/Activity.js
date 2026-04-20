import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    program: String,
    type: { type: String, default: 'learning' },
    date: String,
    notes: String,
  },
  { timestamps: true }
);

export const Activity = mongoose.model('Activity', activitySchema);
