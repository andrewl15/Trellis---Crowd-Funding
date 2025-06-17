import styles from './AlertModal.module.css';

export default function AlertModal({prompt}) {
    return (
        <div className={styles.alert}>
           {prompt}
        </div>
    )
}