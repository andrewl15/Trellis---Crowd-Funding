import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavView from '../../components/MainNav/MainNav';
import { UserContext } from '../../context/UserContext';
import styles from '../ManageCampaignsView/ManageCampaignsView.module.css'
import { useState } from 'react';
import CampaignService from '../../services/CampaignService'
import CampaignCard from '../../components/CampaignCard/CampaignCard';

export default function ManageCampaignsView() {
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const [campaigns, setCampaigns] = useState([]);

    function handleClick() {
        if (user) {
            navigate('/createCampaign');
        } else {
            navigate('/login');
        }
    }

    useEffect(() => {
        CampaignService.getCampaignsByUserId(user.id).then(
            (response) => {
                setCampaigns(response.data)
            }).catch((error) =>
                alert('could not get campagains')
            )
    }, [])

    return (
        <>
            <NavView />
            <div className={styles.mainDiv}>
                <div className={styles.headerButtons}>
                    <button className={styles.ccButton} onClick={handleClick}>Create Campaign</button>
                </div>
                <div className={styles.headerSection}>
                    <h1>Your Campaigns</h1>
                </div>
                <div className={styles.campaigngrid}>
                    {campaigns.map(
                        (campaign, index) => (
                            <CampaignCard key={index} campaign={campaign} />
                        )
                    )}
                </div>
            </div>
        </>

    );
}