import express from 'express';
import Job from '../models/Job.js';
import User from '../models/User.js';
import { verifyToken } from './auth.js';

const router = express.Router();

// Search jobs
router.get('/search', verifyToken, async (req, res) => {
  try {
    const { keyword, location, jobType, remoteStatus, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (keyword) {
      filter.$text = { $search: keyword };
    }
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    if (jobType) {
      filter.jobType = jobType;
    }
    if (remoteStatus) {
      filter.remoteStatus = remoteStatus;
    }

    const skip = (page - 1) * limit;
    const jobs = await Job.find(filter)
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ postedDate: -1 });

    const total = await Job.countDocuments(filter);

    res.json({
      jobs,
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

// Get recommended jobs
router.get('/recommended', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user.jobPreferences) {
      return res.json({ jobs: [] });
    }

    const filter = {};
    if (user.jobPreferences.titles && user.jobPreferences.titles.length > 0) {
      filter.title = { $in: user.jobPreferences.titles };
    }
    if (user.jobPreferences.locations && user.jobPreferences.locations.length > 0) {
      filter.location = { $in: user.jobPreferences.locations };
    }

    const jobs = await Job.find(filter)
      .limit(50)
      .sort({ matchScore: -1 });

    res.json({ jobs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get job details
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save job
router.post('/:id/save', verifyToken, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { savedBy: req.userId } },
      { new: true }
    );

    res.json({ message: 'Job saved successfully', job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Unsave job
router.post('/:id/unsave', verifyToken, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { $pull: { savedBy: req.userId } },
      { new: true }
    );

    res.json({ message: 'Job unsaved successfully', job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get saved jobs
router.get('/saved/list', verifyToken, async (req, res) => {
  try {
    const jobs = await Job.find({ savedBy: req.userId })
      .sort({ createdAt: -1 });

    res.json({ jobs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
