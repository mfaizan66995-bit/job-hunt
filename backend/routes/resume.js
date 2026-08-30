import express from 'express';
import Resume from '../models/Resume.js';
import { verifyToken } from './auth.js';
import { upload } from '../server.js';

const router = express.Router();

// Upload resume
router.post('/upload', verifyToken, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const resume = new Resume({
      userId: req.userId,
      filename: req.file.originalname,
      filepath: req.file.path,
      filesize: req.file.size,
      mimetype: req.file.mimetype
    });

    await resume.save();

    res.status(201).json({
      message: 'Resume uploaded successfully',
      resume: {
        id: resume._id,
        filename: resume.filename,
        uploadedAt: resume.uploadedAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all resumes for user
router.get('/', verifyToken, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userId })
      .select('-extractedText')
      .sort({ uploadedAt: -1 });

    res.json(resumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get resume details
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.userId });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update resume (add extracted information)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.userId });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    const { skills, experience, education, languages, certifications, summary } = req.body;

    if (skills) resume.skills = skills;
    if (experience) resume.experience = experience;
    if (education) resume.education = education;
    if (languages) resume.languages = languages;
    if (certifications) resume.certifications = certifications;
    if (summary) resume.summary = summary;

    resume.updatedAt = new Date();
    await resume.save();

    res.json({ message: 'Resume updated successfully', resume });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Set default resume
router.patch('/:id/set-default', verifyToken, async (req, res) => {
  try {
    // Remove default from all user's resumes
    await Resume.updateMany({ userId: req.userId }, { isDefault: false });

    // Set current as default
    const resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { isDefault: true },
      { new: true }
    );

    res.json({ message: 'Default resume updated', resume });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete resume
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
