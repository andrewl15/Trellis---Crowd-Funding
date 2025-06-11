import { useContext } from 'react';
import { Link } from 'react-router-dom';
import NavView from '../../components/MainNav/MainNav';
import { UserContext } from '../../context/UserContext';
import styles from '../HomeView/HomeView.module.css';

export default function HomeView() {
  const user = useContext(UserContext);

  return (
    <>
      <NavView />
      <div className={styles.mainDiv}>
        <h1>Home</h1>
        <br />
        <p>Welcome to the home page!</p>
      </div>
    </>

  );
}