import styles from './AlertModal.module.css';

export default function AlertModal({ prompt, color }) {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.alert} style={{ backgroundColor: color }}>
                {prompt}
            </div>
        </div>
    )
}