import { useState, useContext } from 'react';
import CampaignService from '../../services/CampaignService';
import { useNavigate } from 'react-router-dom';
import styles from './CreateCampaignView.module.css';
import { UserContext } from '../../context/UserContext';
import { TypeAnimation } from 'react-type-animation';
import { Input } from '@base-ui-components/react/input';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';




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
                if (response.status === 201) {
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
        <div className={styles.mainDiv}>
            <div className={styles.innerDiv}>
                <div className={styles.leftPanel}>
                    <p className={styles.campaigntext}>Create Campaign</p>
                    <TypeAnimation
                        sequence={[
                            'Ready to grow your campagin?',
                            1000, // Waits 1 second
                            'Germinate your dreams',
                            1000, // Waits 1 second
                            'Propagate your ideas',
                            1000, // Waits 1 second
                            'Fertilize your vision',
                            1000, // Waits 1 second

                        ]}
                        wrapper="h3"
                        cursor={true}
                        repeat={Infinity}
                        style={{ fontSize: '2em', marginBottom: '-50px' }}
                    />
                    <lord-icon
                        src="https://cdn.lordicon.com/hlfocnwl.json"
                        trigger="loop"
                        delay="100"
                        colors="primary:#5c230a,secondary:#407440"
                        style={{ width: "40%", height: "40%", margin: "0", padding: "0" }}
                    ></lord-icon>
                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker

                        />
                    </LocalizationProvider> */}
                </div>
                <div className={styles.rightPanel}>
                    <p className={styles.header}>The right campaign can change your life.<br></br> Make yours stand out.</p>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.form}>
                            <div className={styles.formtitle}>Campaign Name</div>
                            <Input className={styles.Input} value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                        <div className={styles.form}>
                            <div className={styles.formtitle}>Description</div>
                            <Input className={styles.Input} value={description} onChange={e => setDescription(e.target.value)} required />
                        </div>
                        <div className={styles.datefields}>
                            <div className={styles.datefield}>
                                <div className={styles.formtitle}>Start Date</div>
                                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
                            </div>
                            <div className={styles.datefield}>
                                <div className={styles.formtitle}>End Date</div>
                                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
                            </div>
                        </div>
                        <div className={styles.bottomsection}>
                            <button type="submit" className={styles.formButtonRight}>Propagate</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
{/* <form onSubmit={handleSubmit} className={styles.campaignForm}>
                    <div className={styles.controlFields}>

                        <div className={styles.formControlRight}>
                            <label className={styles.fieldTextRight}>Campaign Name</label>
                            <input type="text" className={styles.fieldRight} name="name" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                        <div className={styles.formControlRight}>
                            <label className={styles.fieldTextRight}>Description</label>
                            <textarea name="description" className={styles.fieldRight} value={description} onChange={e => setName(e.target.value)} required}></textarea>
                        </div>
                        <div className={styles.formControlRight}>
                            <label className={styles.fieldTextRight}>Start Date</label>
                            <input type="date" className={styles.fieldRight} name="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} required />
                        </div>
                        <div className={styles.formControlRight}>
                            <label className={styles.fieldTextRight}>End Date</label>
                            <input type="date" className={styles.fieldRight} name="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} required />
                        </div>
                        <div className={styles.bottomsection}>
                            <button type="submit" className={`btn-primary ${styles.formButtonRight}`}>Propagate</button>
                        </div>
                    </div>
                </form> */}