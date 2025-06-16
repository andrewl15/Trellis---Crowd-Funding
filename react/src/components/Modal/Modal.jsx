import React from 'react';
import styles from './Modal.module.css';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Modal({ prompt, isOpen, onClose, onDelete }) {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div><button className={styles.closeButton} onClick={onClose}>
                    <FontAwesomeIcon icon={faCircleXmark} className={styles.closeIcon} />
                </button></div>
                <div className={styles.topSection}>
                    <h2 className={styles.modalTitle}>{prompt}</h2>
                </div>

                <div className={styles.bottomSection}>
                    <button className={styles.deleteButton} onClick={onDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};
