import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import styles from './UserProfileView.module.css';
import NavView from '../../components/MainNav/MainNav';
import trellisImage from '../../images/trellisSideLeft.png'; 

export default function UserProfileView() {
  const user = useContext(UserContext);

  return (
    <>
      <NavView />
      <div className={styles.pageWrapper}>
        <div className={styles.leftColumn}>
          
        </div>

        <div className={styles.rightColumn}>
          <h1 className={styles.greeting}>Hello, {user.firstName}!</h1>
          <p className={styles.inspiration}>
            At Trellis, we believe in nurturing ideas just like plants — with patience, care, and a place to grow.<br /><br />
            You're not just here to start a campaign — you're here to start something meaningful. 🌱
          </p>
        </div>
      </div>
    </>
  );
}
