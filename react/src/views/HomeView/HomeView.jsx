import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavView from '../../components/MainNav/MainNav';
import { UserContext } from '../../context/UserContext';
import styles from '../HomeView/HomeView.module.css';
import { useState } from 'react';
import image from '../../images/FinaleLogo.png'


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
            trigger="hover"
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
          <p className={styles.getStarted}>Get Started</p>
        </div>
        <div className={styles.rightSection}>
          <p>dddddd ddddddd dddddddddddddd dddddddddd ddddddddd ddddd dddddd dddddddd ddddd dddddddd d dddd dd ddd dd dddddd ddddd ddd ddddd ddddd dddd ddd</p>
        </div>
        <div className={styles.rightTrellis}></div>
        <div className={styles.leftTrellis}></div>
      </div>
    </>

  );
}