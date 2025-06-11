import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import styles from './UserProfileView.module.css';
import NavView from '../../components/MainNav/MainNav';
export default function UserProfileView() {
  const user = useContext(UserContext);

  return (
    <>
    < NavView />
    <div className={styles.maindiv}>
      <h1>User Profile</h1>
      <br />
      <p>Hello, {user.firstName}!</p>
    </div>
    </>
  );
}