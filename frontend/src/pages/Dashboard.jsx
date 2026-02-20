import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { resumeAPI } from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext.jsx';
import ResumeForm from '../components/ResumeForm.jsx';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [resumes, setResumes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingResume, setEditingResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      loadResumes();
    }
  }, [user, navigate]);

  const loadResumes = async () => {
    setLoading(true);
    try {
      const response = await resumeAPI.getResumes();
      setResumes(response.data);
    } catch (error) {
      console.error('Error loading resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreateNew = () => {
    setEditingResume(null);
    setShowForm(true);
  };

  const handleEditResume = (resume) => {
    setEditingResume(resume);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingResume(null);
    loadResumes();
  };

  const handleDeleteResume = async (resumeId) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await resumeAPI.deleteResume(resumeId);
        loadResumes();
      } catch (error) {
        console.error('Error deleting resume:', error);
      }
    }
  };

  const handleViewResume = (resume) => {
    navigate('/resume-preview', { state: { resume } });
  };

  if (showForm) {
    return (
      <ResumeForm 
        resume={editingResume} 
        onClose={handleFormClose} 
      />
    );
  }

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-content">
          <div className="nav-logo">
            <img src="/za-logo.svg" alt="ZA Logo" className="nav-logo-img" />
            <h1>ZA Resume Builder</h1>
          </div>
          <div className="nav-actions">
            <span className="user-info">Welcome, {user?.firstName}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </nav>

      <main className="dashboard-content">
        <div className="dashboard-header">
          <h2>My Resumes</h2>
          <button onClick={handleCreateNew} className="create-btn">
            + Create New Resume
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading your resumes...</div>
        ) : resumes.length === 0 ? (
          <div className="empty-state">
            <p>You haven't created any resumes yet</p>
            <button onClick={handleCreateNew} className="create-btn-large">
              Create Your First Resume
            </button>
          </div>
        ) : (
          <div className="resumes-grid">
            {resumes.map((resume) => (
              <div key={resume.id} className="resume-card">
                <div className="resume-header">
                  <h3>{resume.title}</h3>
                  <span className="resume-date">
                    {new Date(resume.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="resume-actions">
                  <button 
                    onClick={() => handleViewResume(resume)}
                    className="action-btn view-btn"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => handleEditResume(resume)}
                    className="action-btn edit-btn"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteResume(resume.id)}
                    className="action-btn delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
