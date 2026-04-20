import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    date: String,
    time: String,
    location: String,
    type: { type: String, default: 'celebration' },
    is_public: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Event = mongoose.model('Event', eventSchema);
