import { useState, useContext } from 'react';
import CampaignService from '../../services/CampaignService';
import { Link, useNavigate } from 'react-router-dom';
import styles from './CreateCampaignView.module.css';
import { UserContext } from '../../context/UserContext';
import { TypeAnimation } from 'react-type-animation';
import { Input } from '@base-ui-components/react/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-dropdown';
import { categories } from '../../assets/catagories';
import 'react-dropdown/style.css';
import CurrencyInput from 'react-currency-input-field';
import { set } from 'date-fns';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import AlertModal from '../../components/Modals/AlertModal';


export default function CreateCampaignView() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useState(categories[0]);
    const [imageUrl, setImageUrl] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [donation, setDonation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const user = useContext(UserContext);

    function parseDateAsLocal(dateString) {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!user || !user.id) {
            alert('User is not authenticated or ID is missing.');
            return;
        }

        const start = parseDateAsLocal(startDate);
        const end = parseDateAsLocal(endDate);

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (start < currentDate) {
            alert('Start date must be today or in the future.');
            return;
        }

        if (end <= start) {
            alert('End date must be after start date.');
            return;
        }

        const campaignData = {
            imageUrl,
            name,
            description,
            category,
            goalAmount: donation ? parseFloat(donation) : null,
            startDate,
            endDate
        };
        CampaignService.createCampaign(user.id, campaignData)
            .then(response => {
                if (response.status === 201) {
                    setIsOpen(true);   
                    setTimeout(() => {
                        navigate('/');           
                    }, 1000); 
                }
            })
            .catch(error => {
                console.error('Error creating campaign:', error);
            });
    }

    return (
        <div className={styles.mainDiv}>

            <div className={styles.innerDiv}>
                <Link to="/" >
                    <div className={styles.backButton}>
                        <FontAwesomeIcon icon={faArrowLeft} className={styles.backArrow} />
                    </div>
                </Link>
                <div className={styles.leftPanel}>
                    <p className={styles.campaigntext}>Create Campaign</p>
                    <TypeAnimation
                        sequence={[
                            'Ready to grow your campagin?',
                            1000, // Waits 1 second
                            'Germinate your dreams!',
                            1000, // Waits 1 second
                            'Propagate your ideas!',
                            1000, // Waits 1 second
                            'Fertilize your vision!',
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

                </div>
                <div className={styles.rightPanel}>
                    <p className={styles.header}>The right campaign can change your life.<br></br> Make yours stand out.</p>
                    <form onSubmit={handleSubmit}>

                        <div className={styles.form}>
                            <ImageUpload setImageUrl={setImageUrl} />
                        </div>

                        <div className={styles.form}>
                            <div className={styles.formtitle}>Purpose</div>
                            <Dropdown
                                options={categories}
                                onChange={(selected) => setCategory(selected.value)}
                                value={categories[0]}
                                placeholder="Select a category"
                                controlClassName={styles.dropdownControl}
                                menuClassName={styles.dropdownMenu}
                            />

                        </div>
                        <div className={styles.form}>
                            <div className={styles.formtitle}>Campaign Name</div>
                            <Input className={styles.Input} value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                        <div className={styles.form}>
                            <div className={styles.formtitle}>Description</div>
                            <textarea className={styles.description} value={description} onChange={e => setDescription(e.target.value)} minLength={250}></textarea>
                        </div>
                        <div className={styles.form}>
                            <div className={styles.formtitle}>Donation Goal</div>
                            <CurrencyInput
                                id="input-example"
                                name="input-name"
                                prefix='$'
                                placeholder="Please enter an amount"
                                decimalsLimit={2}
                                onValueChange={(value) => setDonation(value)}
                                className={styles.currencyInput}

                            />
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
                            <button type="submit" className={styles.formButton}>Propagate</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={styles.alerts}>
                {isOpen && <AlertModal prompt={"Campaign Created!"} color={"green"} />}
            </div>
        </div >
    );
}

