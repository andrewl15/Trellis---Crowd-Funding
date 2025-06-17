import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import styles from './MainNav.module.css'
import image from '../../images/FinaleLogo.png'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function MainNav() {
  const user = useContext(UserContext);

  return (
    <nav id="main-nav" className={styles.MainNav}>
      <div className={styles.leftsection}>
        <Link to="/" className={styles.logo}>
          <img className={styles.loginimage} src={image} alt="" />
        </Link>

      </div>
      <div className={styles.navlink}>
        <NavLink to="/" className={styles.navtext}>Home</NavLink>
      </div>
      {user ? (
        <>
          <div className={styles.navlink}>
            <NavLink to="/campaign/user/:id" className={styles.navtext}>Manage Campaigns</NavLink>
          </div>
        </>
      ) : (
        <div className={styles.navlink}>
          <NavLink to="/login" className={styles.navtext}>
            Login
          </NavLink>
        </div>
      )}
      <div className={styles.rightsection}>
        {user ? <div className={styles.section}> <NavLink to="/userProfile" className={styles.navtext}>
          <FontAwesomeIcon className={styles.usericon} icon={faCircleUser} /></NavLink>
          <Link to="/logout" className={styles.navtext}>
            <FontAwesomeIcon className={styles.usericon} icon={faRightFromBracket} />
          </Link></div>
          : <></>}
      </div>
    </nav>
  );
}
