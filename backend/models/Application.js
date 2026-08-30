import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  resumeUsed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume'
  },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'viewed', 'rejected', 'interview', 'offer', 'accepted'],
    default: 'draft'
  },
  appliedDate: Date,
  coverLetter: String,
  customizedAnswers: {
    type: Map,
    of: String,
    description: 'Answers to custom application questions'
  },
  notes: String,
  followUpDate: Date,
  feedbackReceived: String,
  matchScore: {
    type: Number,
    min: 0,
    max: 100
  },
  interviewDate: Date,
  interviewType: String, // phone, video, in-person
  offerDetails: {
    salary: Number,
    currency: String,
    startDate: Date,
    benefits: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index for user and job
applicationSchema.index({ userId: 1, jobId: 1 }, { unique: true });

export default mongoose.model('Application', applicationSchema);
