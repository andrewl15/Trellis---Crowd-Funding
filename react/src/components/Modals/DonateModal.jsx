import React, { useContext } from 'react';
import styles from './DonateModal.module.css';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from '@base-ui-components/react/input';
import CurrencyInput from 'react-currency-input-field';
import { UserContext } from '../../context/UserContext';

export default function DonateModal({ donation, setDonation, isOpen, onClose, onDonate }) {
    const user = useContext(UserContext);
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h1>Create Donation</h1>

                <div><button className={styles.closeButton} onClick={onClose}>
                    <FontAwesomeIcon icon={faCircleXmark} className={styles.closeIcon} />
                </button></div>
                <div className={styles.inputSection}>
                    {!user &&
                        <>
                            <div className={styles.form}>
                                <div className={styles.formtitle}>First Name</div>
                                <Input className={styles.Input} value={donation.firstName} onChange={(e) => setDonation(donation => ({ ...donation, firstName: e.target.value }))} required />
                            </div>
                            <div className={styles.form}>
                                <div className={styles.formtitle}>Last Name</div>
                                <Input className={styles.Input} value={donation.lastName} onChange={(e) => setDonation(donation => ({ ...donation, lastName: e.target.value }))} required />
                            </div>
                        </>
                    }
                    <div className={styles.form}>
                        <div className={styles.formtitle}>Donation Amount</div>
                        <CurrencyInput
                            id="input-example"
                            name="input-name"
                            prefix='$'
                            placeholder="Please enter an amount"
                            decimalsLimit={2}
                            value={donation.amount}
                            onValueChange={(value) => setDonation(donation => ({ ...donation, amount: value }))}
                            className={styles.currencyInput}
                        />

                    </div>
                </div>

                <div className={styles.bottomSection}>
                    <button className={styles.donateButton} onClick={onDonate}>Donate</button>
                </div>
            </div>
        </div>
    );
};
