import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import Notification from '../../components/Notification/Notification';
import image from '../../images/FinaleLogo.png'

import styles from './RegisterView.module.css';

export default function RegisterView() {
  const navigate = useNavigate();

  const [notification, setNotification] = useState(null);

  // Setup state for the registration data
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();


    // Validate the form data
    if (password !== confirmPassword) {
      // Passwords don't match, so display error notification
      setNotification({ type: 'error', message: 'Passwords do not match.' });
    } else {
      // If no errors, send data to server
      AuthService.register({
        username,
        password,
        confirmPassword,
        role: 'user',
      })
        .then(() => {
          setNotification({ type: 'success', message: 'Registration successful' });
          navigate('/login');
        })
        .catch((error) => {
          // Check for a response message, but display a default if that doesn't exist
          const message = error.response?.data?.message || 'Registration failed.';
          setNotification({ type: 'error', message: message });
        });
    }
  }

  return (
    <div className={styles.maindiv}>
    <div id="view-register" className={styles.form}>
       <div className={styles.formcontainer}>
      <img  className={styles.loginimage} src={image} alt="" />
      <h2 className={styles.logintext}>Register</h2>

      <Notification notification={notification} clearNotification={() => setNotification(null)} />

      <form onSubmit={handleSubmit}>
        <div className={styles.formcontrol}>
          <label htmlFor="username" className={styles.fieldtext}>Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            className={styles.field}
            size="50"
            required
            autoFocus
            autoComplete="username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className={styles.formcontrol}>
          <label htmlFor="password" className={styles.fieldtext}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            className={styles.field}
            size="50"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className={styles.formcontrol}>
          <label htmlFor="confirmPassword" className={styles.fieldtext}>Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            className={styles.field}
            size="50"
            required
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <div className={styles.bottomsection}>
        <button type="submit" className={`btn-primary ${styles.formButton}`}>
          Register
        </button>
        <Link to="/login">Have an account? Log in</Link>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
}
