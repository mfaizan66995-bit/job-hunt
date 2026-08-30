import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  filepath: {
    type: String,
    required: true
  },
  filesize: Number,
  mimetype: String,
  extractedText: {
    type: String,
    description: 'Extracted text from resume'
  },
  skills: [String],
  experience: [
    {
      company: String,
      position: String,
      startDate: Date,
      endDate: Date,
      description: String
    }
  ],
  education: [
    {
      school: String,
      degree: String,
      field: String,
      graduationDate: Date
    }
  ],
  languages: [String],
  certifications: [String],
  summary: String,
  isDefault: {
    type: Boolean,
    default: false
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Resume', resumeSchema);
