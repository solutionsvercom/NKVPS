import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    student_id: { type: String, required: true },
    student_name: String,
    program: String,
    date: { type: String, required: true },
    status: { type: String, default: 'present' },
  },
  { timestamps: true }
);

attendanceSchema.index({ student_id: 1, date: 1 }, { unique: true });

export const Attendance = mongoose.model('Attendance', attendanceSchema);
