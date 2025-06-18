import styles from './PollModal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@base-ui-components/react/input';
import { useState } from 'react';
import AlertModal from './AlertModal';

export default function PollModal({ pollOpen, poll, setPoll, onClose }) {
    const [options, setOptions] = useState([
        {
            id: 1,
            title: `Option 1`
        },
        {
            id: 2,
            title: `Option 2`
        }
    ]);
    const [message, setMessage] = useState("");

    const addSection = () => {
        if (options.length < 4) {
            const newOption = { id: options.length, title: `Option ${options.length + 1}` }
            setOptions([...options, newOption])
            console.log(options)
        } else {
            setMessage("you can only add up to 4 options");
        }
    }

    const handleInputChange = (event) => {
        const payload = {
            poll_option_title: event.target.value
        }
    }

    return (
        <>
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <h1>Create Poll</h1>

                    <div>
                        <button className={styles.closeButton} onClick={onClose}>
                            <FontAwesomeIcon icon={faCircleXmark} className={styles.closeIcon} />
                        </button>
                    </div>

                    <div>
                        <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>
                    </div>

                    <div className={styles.inputSection}>
                        <div id="options" className={styles.form}>
                            <div>
                                <div className={styles.formtitle}>Poll Title</div>
                                <Input className={styles.Input} required />
                            </div>

                            <div className={styles.options}>
                                {options.map(
                                    (option, index) => (
                                        <div key={index}>
                                            <div className={styles.formtitle}>{option.title}</div>
                                            <Input className={styles.Input} required onChange={(event) => handleInputChange(event)}/>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                    <button onClick={addSection} className={styles.formbutton}>Add New Option</button>
                    <div>
                    <button  className={styles.createbutton}>Create Poll</button>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </>
    )
}