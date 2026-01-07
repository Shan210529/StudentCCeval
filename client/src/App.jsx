import { useState } from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    course: '',
    address: ''
  });

  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      // Connecting to the backend running on port 5000
      const res = await axios.post('http://localhost:5000/api/register', formData);
      setStatus({ type: 'success', message: 'Registration Successful! Welcome aboard.' });
      // Reset form
      setFormData({
        firstName: '', lastName: '', email: '', phone: '',
        dob: '', gender: '', course: '', address: ''
      });
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
      setStatus({ type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="registration-card">
        <div className="header">
          <h1>Student Registration</h1>
          <p>Join our futuristic learning platform today.</p>
        </div>

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text" name="firstName" className="form-input"
              value={formData.firstName} onChange={handleChange} required
              placeholder="Jane"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text" name="lastName" className="form-input"
              value={formData.lastName} onChange={handleChange} required
              placeholder="Doe"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email" name="email" className="form-input"
              value={formData.email} onChange={handleChange} required
              placeholder="jane@example.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel" name="phone" className="form-input"
              value={formData.phone} onChange={handleChange} required
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date of Birth</label>
            <input
              type="date" name="dob" className="form-input"
              value={formData.dob} onChange={handleChange} required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Gender</label>
            <select name="gender" className="form-select" value={formData.gender} onChange={handleChange} required>
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label className="form-label">Select Course</label>
            <select name="course" className="form-select" value={formData.course} onChange={handleChange} required>
              <option value="" disabled>Select Desired Course</option>
              <option value="Artificial Intelligence">Artificial Intelligence & ML</option>
              <option value="Full Stack Development">Full Stack Web Development</option>
              <option value="Cloud Engineering">Cloud Engineering</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Blockchain">Blockchain Architecture</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label className="form-label">Address</label>
            <textarea
              name="address" className="form-textarea" rows="3"
              value={formData.address} onChange={handleChange} required
              placeholder="123 Tech Avenue, Silicon Valley, CA"
            ></textarea>
          </div>

          <div className="form-group full-width">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Processing...' : 'Complete Registration'}
            </button>
          </div>
        </form>

        {status.message && (
          <div className={`status-message ${status.type}`}>
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
}
