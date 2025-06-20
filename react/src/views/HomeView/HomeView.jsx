import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavView from '../../components/MainNav/MainNav';
import { UserContext } from '../../context/UserContext';
import styles from '../HomeView/HomeView.module.css';
import { useState } from 'react';
import image from '../../images/FinaleLogo.png'
import { style } from '@mui/system';


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
        <div className={styles.topSection}>
          <img className={styles.logo} src={image} alt="" />
        </div>
        <div className={styles.leftSection}>
          <lord-icon
            src="https://cdn.lordicon.com/btvefodi.json"
            trigger="loop"
            delay="0"
            colors="primary:#5c230a,secondary:#407440"
            style={{ width: "100px", height: "100px", margin: "0", padding: "0" }}
          ></lord-icon>
          <p>At Trellis we are here to support your dreams to grow your ideas!</p>
        </div>
        <div className={styles.middleSection} onClick={handleClick}>
          <lord-icon
            src="https://cdn.lordicon.com/dwhxbrvz.json"
            trigger="hover"
            delay="0"
            colors="primary:#5c230a,secondary:#407440"
            style={{ width: "200px", height: "200px", margin: "0", padding: "0" }}
          ></lord-icon>
          <p className={styles.getStarted}>Create Campaign</p>
        </div>
        <div className={styles.rightSection}>
          <lord-icon
            src="https://cdn.lordicon.com/rxdjhpeg.json"
            trigger="loop"
            delay="0"
            colors="primary:#5c230a,secondary:#407440"
            style={{ width: "100px", height: "100px", margin: "0", padding: "0" }}
          ></lord-icon>
          <p>Sow the seeds of your dreams!</p>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.rightInfo}>
            At Trellis, we believe every great idea starts with a seed. 
            Whether you're launching a passion project, rallying support
            for a cause, or building something entirely new, we're here to
            help your campaign take root and flourish.
            With an easy-to-use
            platform and a supportive community, Trellis is where ambitious
            campaigns grow into something extraordinary. Let's cultivate your vision—one supporter at a time.
          </div>
        </div>
        <div className={styles.rightTrellis}></div>
        <div className={styles.leftTrellis}></div>
      </div>
    </>

  );
}