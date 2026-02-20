import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResumePreview from '../components/ResumePreview.jsx';
import '../styles/ResumePreview.css';

const ResumeViewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resume = location.state?.resume;

  useEffect(() => {
    console.log('ResumeViewPage mounted with resume:', resume);
  }, [resume]);

  if (!resume) {
    return (
      <div className="resume-view-page">
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Resume Not Found</h2>
          <p>The resume you're trying to view doesn't exist.</p>
          <button onClick={() => navigate('/dashboard')} style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Parse the resume data if it's stored as JSON string
  let resumeData = resume;
  if (typeof resume === 'string') {
    try {
      resumeData = JSON.parse(resume);
    } catch (e) {
      console.error('Error parsing resume:', e);
    }
  }

  console.log('Rendered resume data:', resumeData);

  return (
    <ResumePreview 
      data={resumeData} 
      onBack={() => navigate('/dashboard')}
    />
  );
};

export default ResumeViewPage;
