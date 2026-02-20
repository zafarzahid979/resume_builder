import React, { useState, useMemo, useEffect } from 'react';
import { resumeAPI } from '../api/axiosConfig';
import ResumePreview from './ResumePreview.jsx';
import '../styles/ResumeForm.css';

const ResumeForm = ({ resume, onClose }) => {
  // Parse resume data from database format
  const initialFormData = useMemo(() => {
    if (!resume) {
      return {
        title: 'My Resume',
        personalInfo: {
          fullName: '',
          email: '',
          phone: '',
          location: '',
          summary: '',
        },
        professionalSummary: '',
        experience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
        education: [{ institution: '', degree: '', field: '', startDate: '', endDate: '', currentlyStudying: false }],
        skills: [''],
        certifications: [{ name: '', issuer: '', year: '' }],
        projects: [{ name: '', description: '', link: '' }],
        languages: [{ language: '', proficiency: 'Intermediate' }],
      };
    }

    // Parse the resume from database format
    let parsed = { ...resume };

    // Parse JSON fields if they're strings
    if (typeof parsed.personal_info === 'string') {
      try {
        parsed.personal_info = JSON.parse(parsed.personal_info);
      } catch (e) {
        console.error('Error parsing personal_info:', e);
      }
    }
    if (typeof parsed.experience === 'string') {
      try {
        parsed.experience = JSON.parse(parsed.experience);
      } catch (e) {
        console.error('Error parsing experience:', e);
      }
    }
    if (typeof parsed.education === 'string') {
      try {
        parsed.education = JSON.parse(parsed.education);
      } catch (e) {
        console.error('Error parsing education:', e);
      }
    }
    if (typeof parsed.skills === 'string') {
      try {
        parsed.skills = JSON.parse(parsed.skills);
      } catch (e) {
        console.error('Error parsing skills:', e);
      }
    }
    if (typeof parsed.certifications === 'string') {
      try {
        parsed.certifications = JSON.parse(parsed.certifications);
      } catch (e) {
        console.error('Error parsing certifications:', e);
      }
    }
    if (typeof parsed.projects === 'string') {
      try {
        parsed.projects = JSON.parse(parsed.projects);
      } catch (e) {
        console.error('Error parsing projects:', e);
      }
    }
    if (typeof parsed.languages === 'string') {
      try {
        parsed.languages = JSON.parse(parsed.languages);
      } catch (e) {
        console.error('Error parsing languages:', e);
      }
    }

    return {
      id: parsed.id,
      title: parsed.title || 'My Resume',
      personalInfo: parsed.personalInfo || parsed.personal_info || {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
      },
      professionalSummary: parsed.professionalSummary || parsed.professional_summary || '',
      experience: parsed.experience || [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
      education: parsed.education || [{ institution: '', degree: '', field: '', startDate: '', endDate: '', currentlyStudying: false }],
      skills: parsed.skills || [''],
      certifications: parsed.certifications || [{ name: '', issuer: '', year: '' }],
      projects: parsed.projects || [{ name: '', description: '', link: '' }],
      languages: parsed.languages || [{ language: '', proficiency: 'Intermediate' }],
    };
  }, [resume]);

  const [formData, setFormData] = useState(initialFormData);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    console.log('ResumeForm loaded with resume:', resume);
    console.log('Form data initialized:', initialFormData);
  }, [resume, initialFormData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePersonalInfoChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index
          ? typeof field === 'string'
            ? { ...item, [field]: value }
            : { ...item, ...field }
          : item
      ),
    }));
  };

  const handleArrayAdd = (section) => {
    const templates = {
      experience: { company: '', position: '', startDate: '', endDate: '', description: '' },
      education: { institution: '', degree: '', field: '', startDate: '', endDate: '', currentlyStudying: false },
      skills: '',
      certifications: { name: '', issuer: '', year: '' },
      projects: { name: '', description: '', link: '' },
      languages: { language: '', proficiency: 'Intermediate' },
    };

    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], templates[section]],
    }));
  };

  const handleArrayRemove = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      if (formData.id) {
        await resumeAPI.updateResume(formData.id, formData);
      } else {
        await resumeAPI.createResume(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Error saving resume. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (preview) {
    return (
      <ResumePreview 
        data={formData}
        onBack={() => setPreview(false)}
        onSave={handleSubmit}
        isSaving={saving}
      />
    );
  }

  return (
    <div className="resume-form-container">
      <div className="form-header">
        <h2>Create/Edit Resume</h2>
        <button onClick={onClose} className="close-btn">✕</button>
      </div>

      <div className="form-wrapper">
        <div className="form-section">
          {/* Basic Info */}
          <div className="section">
            <h3>Resume Title</h3>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., Software Engineer Resume"
              className="form-input"
            />
          </div>

          {/* Personal Info */}
          <div className="section">
            <h3>Personal Information</h3>
            <div className="form-grid">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.personalInfo.fullName}
                onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                className="form-input"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.personalInfo.email}
                onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                className="form-input"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.personalInfo.phone}
                onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Location"
                value={formData.personalInfo.location}
                onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                className="form-input"
              />
            </div>
            <textarea
              placeholder="Professional Summary"
              value={formData.personalInfo.summary}
              onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
              className="form-textarea"
              rows="4"
            />
          </div>

          {/* Experience */}
          <div className="section">
            <div className="section-header">
              <h3>Work Experience</h3>
              <button onClick={() => handleArrayAdd('experience')} className="add-btn">+ Add</button>
            </div>
            {formData.experience.map((exp, idx) => (
              <div key={idx} className="form-group">
                <div className="form-grid">
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleArrayChange('experience', idx, 'company', e.target.value)}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    value={exp.position}
                    onChange={(e) => handleArrayChange('experience', idx, 'position', e.target.value)}
                    className="form-input"
                  />
                  <input
                    type="month"
                    placeholder="Start Date"
                    value={exp.startDate}
                    onChange={(e) => handleArrayChange('experience', idx, 'startDate', e.target.value)}
                    className="form-input"
                  />
                  <input
                    type="month"
                    placeholder="End Date"
                    value={exp.endDate}
                    onChange={(e) => handleArrayChange('experience', idx, 'endDate', e.target.value)}
                    className="form-input"
                  />
                </div>
                <textarea
                  placeholder="Description of responsibilities and achievements"
                  value={exp.description}
                  onChange={(e) => handleArrayChange('experience', idx, 'description', e.target.value)}
                  className="form-textarea"
                  rows="3"
                />
                {formData.experience.length > 1 && (
                  <button 
                    onClick={() => handleArrayRemove('experience', idx)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="section">
            <div className="section-header">
              <h3>Education</h3>
              <button onClick={() => handleArrayAdd('education')} className="add-btn">+ Add</button>
            </div>
            {formData.education.map((edu, idx) => (
              <div key={idx} className="form-group">
                <div className="form-grid">
                  <input
                    type="text"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => handleArrayChange('education', idx, 'institution', e.target.value)}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => handleArrayChange('education', idx, 'degree', e.target.value)}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="Field of Study"
                    value={edu.field}
                    onChange={(e) => handleArrayChange('education', idx, 'field', e.target.value)}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="Start Date (e.g., Jan 2020)"
                    value={edu.startDate}
                    onChange={(e) => handleArrayChange('education', idx, 'startDate', e.target.value)}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="End Date (e.g., May 2023)"
                    value={edu.endDate}
                    onChange={(e) => handleArrayChange('education', idx, 'endDate', e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={edu.currentlyStudying || false}
                      onChange={(e) => handleArrayChange('education', idx, 'currentlyStudying', e.target.checked)}
                      className="form-checkbox"
                    />
                    Currently Studying
                  </label>
                </div>
                {formData.education.length > 1 && (
                  <button 
                    onClick={() => handleArrayRemove('education', idx)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="section">
            <div className="section-header">
              <h3>Skills</h3>
              <button onClick={() => handleArrayAdd('skills')} className="add-btn">+ Add</button>
            </div>
            {formData.skills.map((skill, idx) => (
              <div key={idx} className="skill-input-group">
                <input
                  type="text"
                  placeholder="Enter a skill"
                  value={skill}
                  onChange={(e) => handleArrayChange('skills', idx, '', e.target.value)}
                  className="form-input"
                />
                {formData.skills.length > 1 && (
                  <button 
                    onClick={() => handleArrayRemove('skills', idx)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="section">
            <div className="section-header">
              <h3>Certifications</h3>
              <button onClick={() => handleArrayAdd('certifications')} className="add-btn">+ Add</button>
            </div>
            {formData.certifications.map((cert, idx) => (
              <div key={idx} className="form-group">
                <div className="form-grid">
                  <input
                    type="text"
                    placeholder="Certification Name"
                    value={cert.name}
                    onChange={(e) => handleArrayChange('certifications', idx, 'name', e.target.value)}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="Issuing Organization"
                    value={cert.issuer}
                    onChange={(e) => handleArrayChange('certifications', idx, 'issuer', e.target.value)}
                    className="form-input"
                  />
                  <input
                    type="number"
                    placeholder="Year"
                    value={cert.year}
                    onChange={(e) => handleArrayChange('certifications', idx, 'year', e.target.value)}
                    className="form-input"
                  />
                </div>
                {formData.certifications.length > 1 && (
                  <button 
                    onClick={() => handleArrayRemove('certifications', idx)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="section">
            <div className="section-header">
              <h3>Projects</h3>
              <button onClick={() => handleArrayAdd('projects')} className="add-btn">+ Add</button>
            </div>
            {formData.projects.map((proj, idx) => (
              <div key={idx} className="form-group">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={proj.name}
                  onChange={(e) => handleArrayChange('projects', idx, 'name', e.target.value)}
                  className="form-input"
                />
                <textarea
                  placeholder="Project Description"
                  value={proj.description}
                  onChange={(e) => handleArrayChange('projects', idx, 'description', e.target.value)}
                  className="form-textarea"
                  rows="2"
                />
                <input
                  type="url"
                  placeholder="Project Link (optional)"
                  value={proj.link}
                  onChange={(e) => handleArrayChange('projects', idx, 'link', e.target.value)}
                  className="form-input"
                />
                {formData.projects.length > 1 && (
                  <button 
                    onClick={() => handleArrayRemove('projects', idx)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Languages */}
          <div className="section">
            <div className="section-header">
              <h3>Languages</h3>
              <button onClick={() => handleArrayAdd('languages')} className="add-btn">+ Add</button>
            </div>
            {formData.languages.map((lang, idx) => (
              <div key={idx} className="form-group">
                <div className="form-grid">
                  <input
                    type="text"
                    placeholder="Language"
                    value={lang.language}
                    onChange={(e) => handleArrayChange('languages', idx, 'language', e.target.value)}
                    className="form-input"
                  />
                  <select
                    value={lang.proficiency}
                    onChange={(e) => handleArrayChange('languages', idx, 'proficiency', e.target.value)}
                    className="form-input"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Fluent</option>
                  </select>
                </div>
                {formData.languages.length > 1 && (
                  <button 
                    onClick={() => handleArrayRemove('languages', idx)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button onClick={() => setPreview(true)} className="preview-btn">Preview Resume</button>
          <button onClick={handleSubmit} className="save-btn" disabled={saving}>
            {saving ? 'Saving...' : 'Save Resume'}
          </button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
