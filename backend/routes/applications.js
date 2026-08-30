import express from 'express';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import Resume from '../models/Resume.js';
import { verifyToken } from './auth.js';

const router = express.Router();

// Create application
router.post('/', verifyToken, async (req, res) => {
  try {
    const { jobId, resumeId, status = 'draft', coverLetter, customizedAnswers } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if resume exists and belongs to user
    if (resumeId) {
      const resume = await Resume.findOne({ _id: resumeId, userId: req.userId });
      if (!resume) {
        return res.status(404).json({ error: 'Resume not found' });
      }
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      userId: req.userId,
      jobId: jobId
    });

    if (existingApplication) {
      return res.status(400).json({ error: 'Already applied to this job' });
    }

    const application = new Application({
      userId: req.userId,
      jobId,
      resumeUsed: resumeId,
      status,
      coverLetter,
      customizedAnswers: customizedAnswers ? new Map(Object.entries(customizedAnswers)) : undefined,
      appliedDate: status === 'submitted' ? new Date() : undefined
    });

    await application.save();
    await application.populate(['jobId', 'resumeUsed']);

    res.status(201).json({
      message: 'Application created successfully',
      application
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all applications for user
router.get('/', verifyToken, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const filter = { userId: req.userId };
    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;
    const applications = await Application.find(filter)
      .populate('jobId')
      .populate('resumeUsed')
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Application.countDocuments(filter);

    res.json({
      applications,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get application details
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      userId: req.userId
    })
      .populate('jobId')
      .populate('resumeUsed');

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update application status
router.patch('/:id/status', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ['draft', 'submitted', 'viewed', 'rejected', 'interview', 'offer', 'accepted'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { status, updatedAt: new Date() },
      { new: true }
    )
      .populate('jobId')
      .populate('resumeUsed');

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json({ message: 'Application status updated', application });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update application notes and details
router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const { notes, interviewDate, interviewType, feedbackReceived, offerDetails } = req.body;

    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      {
        ...(notes && { notes }),
        ...(interviewDate && { interviewDate }),
        ...(interviewType && { interviewType }),
        ...(feedbackReceived && { feedbackReceived }),
        ...(offerDetails && { offerDetails }),
        updatedAt: new Date()
      },
      { new: true }
    )
      .populate('jobId')
      .populate('resumeUsed');

    res.json({ message: 'Application updated successfully', application });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get application stats
router.get('/stats/summary', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const stats = await Application.aggregate([
      { $match: { userId: { $oid: userId.toString() } } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const result = {};
    stats.forEach(stat => {
      result[stat._id] = stat.count;
    });

    const total = Object.values(result).reduce((a, b) => a + b, 0);
    
    res.json({
      total,
      ...result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete application
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
