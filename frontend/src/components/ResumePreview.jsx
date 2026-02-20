import React, { useRef, useMemo } from 'react';
import html2pdf from 'html2pdf.js';
import '../styles/ResumePreview.css';

const ResumePreview = ({ data, onBack, onSave, isSaving }) => {
  const resumeRef = useRef();

  // Parse resume data and handle both formats
  const resumeData = useMemo(() => {
    if (!data) return null;

    let parsed = data;

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

    // Normalize field names (database uses snake_case, app uses camelCase)
    return {
      title: parsed.title || 'My Resume',
      personalInfo: parsed.personalInfo || parsed.personal_info || {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
      },
      professionalSummary: parsed.professionalSummary || parsed.professional_summary || '',
      experience: parsed.experience || [],
      education: parsed.education || [],
      skills: parsed.skills || [],
      certifications: parsed.certifications || [],
      projects: parsed.projects || [],
      languages: parsed.languages || [],
    };
  }, [data]);

  if (!resumeData) {
    return <div>Loading resume...</div>;
  }

  const handleDownloadPDF = () => {
    const element = resumeRef.current;
    const opt = {
      margin: 0.5,
      filename: `${resumeData.title || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(element).save();
  };

  const handlePrint = () => {
    const element = resumeRef.current;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(element.innerHTML);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="preview-container">
      <div className="preview-toolbar">
        {onBack && (
          <button onClick={onBack} className="toolbar-btn back-btn">← Back to Edit</button>
        )}
        <div className="spacer"></div>
        <button onClick={handlePrint} className="toolbar-btn print-btn">🖨️ Print</button>
        <button onClick={handleDownloadPDF} className="toolbar-btn download-btn">⬇️ Download PDF</button>
        {onSave && (
          <button onClick={onSave} className="toolbar-btn save-btn" disabled={isSaving}>
            {isSaving ? 'Saving...' : '💾 Save'}
          </button>
        )}
      </div>

      <div className="preview-page-container">
        <div className="resume-a4" ref={resumeRef}>
          {/* Header */}
          <div className="resume-header">
            <h1 className="resume-name">{resumeData.personalInfo.fullName || 'Your Name'}</h1>
            <div className="resume-contact">
              {resumeData.personalInfo.email && (
                <span className="contact-item">📧 {resumeData.personalInfo.email}</span>
              )}
              {resumeData.personalInfo.phone && (
                <span className="contact-item">📱 {resumeData.personalInfo.phone}</span>
              )}
              {resumeData.personalInfo.location && (
                <span className="contact-item">📍 {resumeData.personalInfo.location}</span>
              )}
            </div>
            {resumeData.personalInfo.summary && (
              <p className="resume-summary">{resumeData.personalInfo.summary}</p>
            )}
          </div>

          {/* Professional Summary */}
          {resumeData.professionalSummary && (
            <section className="resume-section">
              <h2 className="section-title">Professional Summary</h2>
              <p className="professional-summary-text">{resumeData.professionalSummary}</p>
            </section>
          )}

          {/* Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && resumeData.experience[0] && resumeData.experience[0].company && (
            <section className="resume-section">
              <h2 className="section-title">Work Experience</h2>
              {resumeData.experience.map((exp, idx) => (
                (exp.company || exp.position) && (
                  <div key={idx} className="resume-item">
                    <div className="item-header">
                      <h3 className="item-title">{exp.position}</h3>
                      <span className="item-date">
                        {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : '- Present'}
                      </span>
                    </div>
                    <p className="item-subtitle">{exp.company}</p>
                    {exp.description && (
                      <p className="item-description">{exp.description}</p>
                    )}
                  </div>
                )
              ))}
            </section>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && resumeData.education[0] && resumeData.education[0].institution && (
            <section className="resume-section">
              <h2 className="section-title">Education</h2>
              {resumeData.education.map((edu, idx) => (
                (edu.institution || edu.degree) && (
                  <div key={idx} className="resume-item education-item">
                    <div className="item-header">
                      <div className="item-title-group">
                        <h3 className="item-title">{edu.degree}</h3>
                        {edu.field && <p className="item-field">{edu.field}</p>}
                      </div>
                      <div className="item-date-group">
                        {edu.startDate && edu.endDate && (
                          <span className="item-date">{edu.startDate} - {edu.currentlyStudying ? 'Present' : edu.endDate}</span>
                        )}
                        {edu.currentlyStudying && <span className="currently-studying-badge">Currently Studying</span>}
                      </div>
                    </div>
                    <p className="item-subtitle">{edu.institution}</p>
                  </div>
                )
              ))}
            </section>
          )}

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <section className="resume-section">
              <h2 className="section-title">Skills</h2>
              <div className="skills-container">
                {resumeData.skills.map((skill, idx) => {
                  // Handle both string and object formats
                  let skillText = '';
                  if (typeof skill === 'string') {
                    skillText = skill;
                  } else if (typeof skill === 'object' && skill !== null) {
                    skillText = skill.name || skill.skill || '';
                  }
                  
                  return skillText ? (
                    <span key={idx} className="skill-badge">{String(skillText)}</span>
                  ) : null;
                })}
              </div>
            </section>
          )}

          {/* Certifications */}
          {resumeData.certifications && resumeData.certifications.length > 0 && resumeData.certifications[0] && resumeData.certifications[0].name && (
            <section className="resume-section">
              <h2 className="section-title">Certifications</h2>
              {resumeData.certifications.map((cert, idx) =>
                cert.name && (
                  <div key={idx} className="resume-item">
                    <div className="item-header">
                      <h3 className="item-title">{cert.name}</h3>
                      {cert.year && <span className="item-date">{cert.year}</span>}
                    </div>
                    {cert.issuer && <p className="item-subtitle">{cert.issuer}</p>}
                  </div>
                )
              )}
            </section>
          )}

          {/* Projects */}
          {resumeData.projects && resumeData.projects.length > 0 && resumeData.projects[0] && resumeData.projects[0].name && (
            <section className="resume-section">
              <h2 className="section-title">Projects</h2>
              {resumeData.projects.map((proj, idx) =>
                proj.name && (
                  <div key={idx} className="resume-item">
                    <div className="item-header">
                      <h3 className="item-title">{proj.name}</h3>
                    </div>
                    {proj.description && (
                      <p className="item-description">{proj.description}</p>
                    )}
                    {proj.link && (
                      <p className="item-link">
                        <a href={proj.link} target="_blank" rel="noopener noreferrer">
                          {proj.link}
                        </a>
                      </p>
                    )}
                  </div>
                )
              )}
            </section>
          )}

          {/* Languages */}
          {resumeData.languages && resumeData.languages.length > 0 && (
            <section className="resume-section">
              <h2 className="section-title">Languages</h2>
              <div className="languages-container">
                {resumeData.languages.map((lang, idx) => {
                  // Handle both string and object formats
                  const langName = typeof lang === 'string' ? lang : lang?.language;
                  const langProf = typeof lang === 'object' ? lang?.proficiency : 'Intermediate';
                  return langName ? (
                    <div key={idx} className="language-item">
                      <span className="language-name">{langName}</span>
                      {langProf && <span className="language-proficiency">{langProf}</span>}
                    </div>
                  ) : null;
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
