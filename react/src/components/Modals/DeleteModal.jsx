import React from 'react';
import styles from './DeleteModal.module.css';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function DeleteModal({ isOpen, onClose, onDelete }) {
    if (!isOpen) return null;
    const modalPrompt = 
        'Are you sure you want to delete this campaign? This action cannot be undone,\n' + "\n" +
        "and any associated donations will be refunded to sender";

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div><button className={styles.closeButton} onClick={onClose}>
                    <FontAwesomeIcon icon={faCircleXmark} className={styles.closeIcon} />
                </button></div>
                <div className={styles.topSection}>
                    <h2 className={styles.modalTitle}>{modalPrompt}</h2>
                </div>

                <div className={styles.bottomSection}>
                    <button className={styles.deleteButton} onClick={onDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};
