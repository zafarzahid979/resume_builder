import pool from '../config/database.js';

export const createResume = async (req, res) => {
  const userId = req.userId;
  const { title, personalInfo, professionalSummary, experience, education, skills, certifications, projects, languages } = req.body;

  if (!title || !personalInfo) {
    return res.status(400).json({ message: 'Title and personal info are required' });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO resumes (user_id, title, personal_info, professional_summary, experience, education, skills, certifications, projects, languages) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        userId,
        title,
        JSON.stringify(personalInfo),
        professionalSummary || '',
        JSON.stringify(experience || []),
        JSON.stringify(education || []),
        JSON.stringify(skills || []),
        JSON.stringify(certifications || []),
        JSON.stringify(projects || []),
        JSON.stringify(languages || []),
      ]
    );
    connection.release();

    return res.status(201).json({
      message: 'Resume created successfully',
      resumeId: result.insertId,
    });
  } catch (error) {
    console.error('Create resume error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getResumes = async (req, res) => {
  const userId = req.userId;

  try {
    const connection = await pool.getConnection();
    const [resumes] = await connection.execute(
      'SELECT * FROM resumes WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    connection.release();

    const parsedResumes = resumes.map(resume => ({
      ...resume,
      personal_info: JSON.parse(resume.personal_info),
      experience: JSON.parse(resume.experience),
      education: JSON.parse(resume.education),
      skills: JSON.parse(resume.skills),
      certifications: JSON.parse(resume.certifications),
      projects: JSON.parse(resume.projects),
      languages: JSON.parse(resume.languages),
    }));

    return res.json(parsedResumes);
  } catch (error) {
    console.error('Get resumes error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getResumeById = async (req, res) => {
  const userId = req.userId;
  const resumeId = req.params.id;

  try {
    const connection = await pool.getConnection();
    const [resumes] = await connection.execute(
      'SELECT * FROM resumes WHERE id = ? AND user_id = ?',
      [resumeId, userId]
    );
    connection.release();

    if (resumes.length === 0) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const resume = resumes[0];
    return res.json({
      ...resume,
      personal_info: JSON.parse(resume.personal_info),
      experience: JSON.parse(resume.experience),
      education: JSON.parse(resume.education),
      skills: JSON.parse(resume.skills),
      certifications: JSON.parse(resume.certifications),
      projects: JSON.parse(resume.projects),
      languages: JSON.parse(resume.languages),
    });
  } catch (error) {
    console.error('Get resume error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateResume = async (req, res) => {
  const userId = req.userId;
  const resumeId = req.params.id;
  const { title, personalInfo, professionalSummary, experience, education, skills, certifications, projects, languages } = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.execute(
      'UPDATE resumes SET title = ?, personal_info = ?, professional_summary = ?, experience = ?, education = ?, skills = ?, certifications = ?, projects = ?, languages = ? WHERE id = ? AND user_id = ?',
      [
        title,
        JSON.stringify(personalInfo),
        professionalSummary || '',
        JSON.stringify(experience || []),
        JSON.stringify(education || []),
        JSON.stringify(skills || []),
        JSON.stringify(certifications || []),
        JSON.stringify(projects || []),
        JSON.stringify(languages || []),
        resumeId,
        userId,
      ]
    );
    connection.release();

    return res.json({ message: 'Resume updated successfully' });
  } catch (error) {
    console.error('Update resume error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteResume = async (req, res) => {
  const userId = req.userId;
  const resumeId = req.params.id;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'DELETE FROM resumes WHERE id = ? AND user_id = ?',
      [resumeId, userId]
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    return res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Delete resume error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
