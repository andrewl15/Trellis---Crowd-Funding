import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavView from '../../components/MainNav/MainNav';
import { UserContext } from '../../context/UserContext';
import styles from '../HomeView/HomeView.module.css';
import { useState } from 'react';
import CampaignCard from '../../components/CampaignCard/CampaignCard';

export default function HomeView() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [campaigns, setCampaigns] = useState([]);

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
        <div className={styles.headerButtons}>
      
          <button className={styles.ccButton} onClick={handleClick}>Create Campaign</button>
    
        </div>
      </div>
    </>

  );
}