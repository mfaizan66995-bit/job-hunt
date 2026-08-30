import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  source: {
    type: String,
    enum: ['linkedin', 'indeed', 'github', 'custom'],
    required: true
  },
  externalId: {
    type: String,
    description: 'ID from the original job board'
  },
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: [String],
  salary: {
    min: Number,
    max: Number,
    currency: String
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'temporary']
  },
  postedDate: Date,
  url: String,
  companyLogoUrl: String,
  skills: [String],
  level: {
    type: String,
    enum: ['entry', 'mid', 'senior', 'lead', 'manager']
  },
  industry: String,
  remoteStatus: {
    type: String,
    enum: ['remote', 'hybrid', 'on-site']
  },
  matchScore: {
    type: Number,
    min: 0,
    max: 100,
    description: 'Calculated match score with user resume'
  },
  savedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster searches
jobSchema.index({ title: 'text', description: 'text', company: 'text' });
jobSchema.index({ source: 1, externalId: 1 }, { unique: true, sparse: true });

export default mongoose.model('Job', jobSchema);
