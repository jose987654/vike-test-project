import React, { useState } from 'react';
import { FaGoogle, FaTwitter, FaGithub, FaFacebook } from 'react-icons/fa';
import '../../layouts/register.css';

export function Page() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Create an Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <button type="submit" className="register-button">Sign Up</button>
        </form>
        <div className="login-link">
          <p>Already have an account? <a href="/login">Log in</a></p>
        </div>
        <div className="social-signup">
          <p>Or sign up with:</p>
          <div className="social-buttons">
            <button className="social-button google">
              <FaGoogle /> Google
            </button>
            <button className="social-button twitter">
              <FaTwitter /> Twitter
            </button>
            <button className="social-button github">
              <FaGithub /> GitHub
            </button>
            <button className="social-button facebook">
              <FaFacebook /> Meta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const documentProps = {
  title: 'Register',
  description: 'Create a new account'
};