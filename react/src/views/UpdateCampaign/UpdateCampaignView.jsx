import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import CampaignService from "../../services/CampaignService";
import { set } from "date-fns";
import styles from './UpdateCampaignView.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { TypeAnimation } from 'react-type-animation';
import Dropdown from 'react-dropdown';
import { categories } from '../../assets/catagories';
import 'react-dropdown/style.css';
import CurrencyInput from 'react-currency-input-field';
import { Input } from '@base-ui-components/react/input';

export default function UpdateCampaignView() {
    const { id } = useParams();
    const { user } = useContext(UserContext)
    const [campaign, setCampaign] = useState({});

    useEffect(() => {
        CampaignService.getCampaignById(id).then(
            (response) => {
                setCampaign(response.data)
            }
        ).catch((error) =>
            alert('could not retrieve campaign')
        )
    }, [])

    function handleSubmit(event) {
    }
    return (
        <>
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
                                <Input className={styles.Input} value={campaign.name} onChange={e => setCampaign(campaign => ({ ...campaign, name: e.target.value }))} required />
                            </div>
                            <div className={styles.form}>
                                <div className={styles.formtitle}>Description</div>
                                {/* <Input className={styles.Input} value={description} onChange={e => setDescription(e.target.value)} required /> */}
                                <textarea className={styles.description} value={campaign.description} onChange={e => setCampaign(campaign => ({ ...campaign, description: e.target.value }))}></textarea>
                            </div>
                            <div className={styles.form}>
                                <div className={styles.formtitle}>Donation Goal</div>
                                <CurrencyInput
                                    id="input-example"
                                    name="input-name"
                                    prefix='$'
                                    placeholder="Please enter an amount"
                                    decimalsLimit={2}
                                    value={campaign.goalAmount}
                                    onValueChange={(value) => setCampaign(campaign => ({ ...campaign, goalAmount: value }))}
                                    className={styles.currencyInput}

                                />
                            </div>
                            <div className={styles.datefields}>
                                <div className={styles.datefield}>
                                    <div className={styles.formtitle}>Start Date</div>
                                    <input type="date" value={campaign.startDate} onChange={e => setCampaign(campaign => ({ ...campaign, startDate: e.target.value }))} required />
                                </div>
                                <div className={styles.datefield}>
                                    <div className={styles.formtitle}>End Date</div>
                                    <input type="date" value={campaign.endDate} onChange={e => setCampaign(campaign => ({ ...campaign, endDate: e.target.value }))} required />
                                </div>
                            </div>
                            <div className={styles.bottomsection}>
                                <button type="submit" className={styles.formButton}>Propagate</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </>
    )
}