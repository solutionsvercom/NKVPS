import mongoose from 'mongoose';

const admissionInquirySchema = new mongoose.Schema(
  {
    child_name: { type: String, required: true },
    child_age: Number,
    parent_name: { type: String, required: true },
    email: String,
    phone: String,
    program_interest: String,
    message: String,
    source: { type: String, default: 'website' },
    status: { type: String, default: 'new' },
  },
  { timestamps: true }
);

export const AdmissionInquiry = mongoose.model('AdmissionInquiry', admissionInquirySchema);
