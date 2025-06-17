import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavView from '../../components/MainNav/MainNav';
import { UserContext } from '../../context/UserContext';
import styles from '../HomeView/HomeView.module.css';
import { useState } from 'react';


export default function HomeView() {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  function handleClick() {
    if (user) {
      navigate('/createCampaign');
    } else {
      navigate('/login');
    }
  }
  return (
    <>
      <NavView />
      <div className={styles.mainDiv}>
        <div>

        </div>

        <div className={styles.createDiv} onClick={handleClick}>
          <lord-icon
            src="https://cdn.lordicon.com/dwhxbrvz.json"
            trigger="hover"
            delay="0"
            colors="primary:#5c230a,secondary:#407440"
            style={{ width: "200px", height: "200px", margin: "0", padding: "0" }}
          ></lord-icon>
          <p className={styles.getStarted}>Click to get started</p>
        </div>

      </div>
    </>

  );
}