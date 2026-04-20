import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    sender_email: String,
    sender_name: String,
    receiver_email: String,
    receiver_name: String,
    content: { type: String, required: true },
    conversation_id: String,
  },
  { timestamps: true }
);

export const Message = mongoose.model('Message', messageSchema);
