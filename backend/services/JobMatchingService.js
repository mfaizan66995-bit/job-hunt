/**
 * Job Matching Service
 * Calculates match score between resume and job posting
 */

class JobMatchingService {
  
  /**
   * Calculate match score between resume and job
   * @param {object} resume - Resume data
   * @param {object} job - Job data
   * @returns {number} Match score (0-100)
   */
  static calculateMatchScore(resume, job) {
    let score = 0;
    let criteria = 0;

    // 1. Skills Match (30 points)
    const skillsScore = this.calculateSkillsMatch(resume.skills, job.requirements);
    score += skillsScore * 0.30;
    criteria += 30;

    // 2. Experience Level Match (20 points)
    const expScore = this.calculateExperienceMatch(resume.experience, job.level);
    score += expScore * 0.20;
    criteria += 20;

    // 3. Location Match (15 points)
    if (job.remoteStatus === 'remote' || this.isLocationMatch(resume, job)) {
      score += 15;
    }
    criteria += 15;

    // 4. Job Type Match (15 points)
    if (this.isJobTypeMatch(resume, job)) {
      score += 15;
    }
    criteria += 15;

    // 5. Salary Expectation Match (10 points)
    if (this.isSalaryAcceptable(resume, job)) {
      score += 10;
    }
    criteria += 10;

    // 5. Education Match (10 points)
    const eduScore = this.calculateEducationMatch(resume.education, job.description);
    score += eduScore * 0.10;
    criteria += 10;

    // Normalize to 0-100
    return Math.round((score / criteria) * 100);
  }

  /**
   * Calculate skills match percentage
   */
  static calculateSkillsMatch(resumeSkills, jobRequirements) {
    if (!resumeSkills || !jobRequirements) return 0;

    const resumeSkillsLower = resumeSkills.map(s => s.toLowerCase());
    const matchedSkills = jobRequirements.filter(req => {
      const reqLower = req.toLowerCase();
      return resumeSkillsLower.some(skill => 
        reqLower.includes(skill) || skill.includes(reqLower)
      );
    });

    return matchedSkills.length / jobRequirements.length;
  }

  /**
   * Calculate experience match
   */
  static calculateExperienceMatch(resumeExperience, jobLevel) {
    if (!resumeExperience || resumeExperience.length === 0) return 0.5;

    const yearsOfExperience = this.calculateYearsOfExperience(resumeExperience);

    const levelRequirements = {
      'entry': { min: 0, max: 2 },
      'mid': { min: 2, max: 5 },
      'senior': { min: 5, max: 10 },
      'lead': { min: 8, max: 15 },
      'manager': { min: 10, max: 20 }
    };

    if (!levelRequirements[jobLevel]) return 0.5;

    const { min, max } = levelRequirements[jobLevel];
    if (yearsOfExperience >= min && yearsOfExperience <= max) {
      return 1.0; // Perfect match
    } else if (yearsOfExperience >= min) {
      return 0.8; // More experienced than required
    } else if (yearsOfExperience >= min - 1) {
      return 0.6; // Close to requirement
    }
    
    return 0.3; // Below requirement
  }

  /**
   * Calculate years of experience from resume
   */
  static calculateYearsOfExperience(experience) {
    if (!experience || experience.length === 0) return 0;

    let totalMonths = 0;
    const now = new Date();

    experience.forEach(exp => {
      const start = new Date(exp.startDate);
      const end = exp.endDate ? new Date(exp.endDate) : now;
      const months = (end - start) / (1000 * 60 * 60 * 24 * 30.44);
      totalMonths += months;
    });

    return Math.round(totalMonths / 12);
  }

  /**
   * Check location match
   */
  static isLocationMatch(resume, job) {
    // Implement location matching logic
    return true; // Placeholder
  }

  /**
   * Check job type compatibility
   */
  static isJobTypeMatch(resume, job) {
    // Implement job type matching logic
    return true; // Placeholder
  }

  /**
   * Check salary acceptability
   */
  static isSalaryAcceptable(resume, job) {
    if (!job.salary) return true;
    // Compare with user's minimum salary expectation
    // This would be stored in user preferences
    return true; // Placeholder
  }

  /**
   * Calculate education match
   */
  static calculateEducationMatch(resumeEducation, jobDescription) {
    if (!resumeEducation || resumeEducation.length === 0) return 0.5;

    const educationKeywords = [
      'bachelor', 'bachelors', 'master', 'masters', 'phd',
      'degree', 'diploma', 'certification', 'bs', 'ms'
    ];

    const hasRelevantEducation = resumeEducation.some(edu =>
      educationKeywords.some(keyword => 
        edu.degree?.toLowerCase().includes(keyword) ||
        edu.school?.toLowerCase().includes(keyword)
      )
    );

    return hasRelevantEducation ? 1.0 : 0.5;
  }

  /**
   * Get match summary
   */
  static getMatchSummary(resume, job, score) {
    const summary = {
      score,
      verdict: this.getVerdict(score),
      strengths: [],
      weaknesses: [],
      recommendations: []
    };

    // Calculate component scores
    const skillsScore = Math.round(this.calculateSkillsMatch(resume.skills, job.requirements) * 100);
    const expScore = Math.round(this.calculateExperienceMatch(resume.experience, job.level) * 100);

    if (skillsScore > 70) {
      summary.strengths.push('Strong skills match');
    } else {
      summary.weaknesses.push('Limited skills match');
      summary.recommendations.push('Consider learning the missing skills');
    }

    if (expScore > 70) {
      summary.strengths.push('Experience level matches');
    } else {
      summary.weaknesses.push('Experience level may not match');
    }

    return summary;
  }

  /**
   * Get verdict based on score
   */
  static getVerdict(score) {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Fair Match';
    return 'Poor Match';
  }
}

export default JobMatchingService;
