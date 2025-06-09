import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image from '../../images/FinaleLogo.png'

import AuthService from '../../services/AuthService';
import Notification from '../../components/Notification/Notification';
import axios from 'axios';

import styles from './LoginView.module.css';

export default function LoginView({ onLogin }) {

  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);

  // Setup state for the registration data
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    AuthService.login({ username, password })
      .then((response) => {
        // Grab the user and token
        const user = response.data.user;
        const token = response.data.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Add the login data to local storage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        // Use the callback to add user to state
        onLogin(user);

        // Navigate to the home page
        navigate('/');
      })
      .catch((error) => {
        // Check for a response message, but display a default if that doesn't exist
        const message = error.response?.data?.message || 'Login failed.';
        setNotification({ type: 'error', message: message });
      });
  }

  return (
    <div className={styles.maindiv}>
      <div className={styles.formcontainer}>
      <div id="view-login" className={styles.form}>
        <img  className={styles.loginimage} src={image} alt="" />
        <h2 className={styles.logintext}>Welcome</h2>


        <Notification notification={notification} clearNotification={() => setNotification(null)} />

        <form onSubmit={handleSubmit}>

          <div className={styles.formcontrol}>
            <label htmlFor="username"  className={styles.fieldtext}>Username</label>
            <input type="text" className={styles.field} id="username" value={username} size="50" required autoFocus autoComplete="username"
              onChange={event => setUsername(event.target.value)} />
          </div>

          <div className={styles.formcontrol}>
            <label htmlFor="password" className={styles.fieldtext}>Password</label>
            <input type="password" className={styles.field} id="password" value={password} size="50" required
              onChange={event => setPassword(event.target.value)} />
          </div>
          <div className={styles.bottomsection}>
          <button type="submit" className={`btn-primary ${styles.formButton}`}>Sign in</button>
          <Link to="/register">New User? Register here!</Link>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
