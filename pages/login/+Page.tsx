import React from 'react';
import { FaGoogle, FaTwitter, FaGithub, FaFacebook } from 'react-icons/fa';
import '../../layouts/login.css';

export function Page() {
  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Welcome Back</h1>
        <form>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="login-button">Log In</button>
        </form>
        <div className="forgot-password">
          <a href="/forgot-password">Forgot your password?</a>
        </div>
        <div className="social-login">
          <p>Or log in with:</p>
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
              <FaFacebook /> Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const documentProps = {
  title: 'Login',
  description: 'Log in to your account'
};