import { useState, useContext } from 'react';
import CampaignService from '../../services/CampaignService';
import { useNavigate } from 'react-router-dom';
import styles from './CreateCampaignView.module.css';
import { UserContext } from '../../context/UserContext';

export default function CampaignView() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const user = useContext(UserContext);

    function handleSubmit(event) {
        event.preventDefault();
        if (!user || !user.id) {
            alert('User is not authenticated or ID is missing.');
            return;
        }
    
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (start >= end) {
            alert('End date must be after start date.');
            return;
        }

        const campaignData = {
            name,
            description,
            startDate,
            endDate
        };
        CampaignService.createCampaign(user.id, campaignData)
            .then(response => {
                if(response.status === 201) {
                    console.log("here");
                    alert('Campaign Created!');
                    navigate('/');
                }
            })
            .catch(error => {
                console.error('Error creating campaign:', error);
            });
    }

    return (
        <div className={styles.maindiv}>
            <div className={styles.formcontainer}>
                <div id='left-panel'>left panel</div>
                <div id="right-panel" className={styles.form}>
                    <h2 className={styles.campaigntext}>Create Campgain</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formcontrol}>
                            <label className={styles.fieldtext}>Campaign Name</label>
                            <input type="text" className={styles.field} name="name" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                        <div className={styles.formcontrol}>
                            <label className={styles.fieldtext}>Description</label>
                            <textarea name="description" className={styles.field} value={description} onChange={e => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className={styles.formcontrol}>
                            <label className={styles.fieldtext}>Start Date</label>
                            <input type="date" className={styles.field} name="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} required />
                        </div>
                        <div className={styles.formcontrol}>
                            <label className={styles.fieldtext}>End Date</label>
                            <input type="date" className={styles.field} name="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} required />
                        </div>
                        <div className={styles.bottomsection}>
                            <button type="submit" className={`btn-primary ${styles.formButton}`}>Propagate</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
