import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import styles from './MainNav.module.css'


export default function MainNav() {
  const user = useContext(UserContext);

  return (
    <nav id="main-nav" className={styles.MainNav}>
      <div className={styles.navlink}>
        <NavLink to="/" className={styles.navtext}>Home</NavLink>
      </div>
      {user ? (
        <>
          <div className={styles.navlink}>
            <NavLink to="/userProfile" className={styles.navtext}>
              Profile
            </NavLink>
          </div>
          <div className={styles.navlink}>
            <NavLink to="/createCampaign" className={styles.navtext}>
              Create Campaign
            </NavLink>
          </div>
          <div className={styles.navlink}>
            <Link to="/logout" className={styles.navtext}>
              Logout
            </Link>
          </div>
        </>
      ) : (
        <div className={styles.navlink}>
          <NavLink to="/login" className={styles.navtext}>
            Login
          </NavLink>
        </div>
      )}
    </nav>
  );
}
