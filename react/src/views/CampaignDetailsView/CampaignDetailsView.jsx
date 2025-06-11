import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import CampaignService from "../../services/CampaignService";
import NavView from '../../components/MainNav/MainNav';
import styles from './CampaignDetailsView.module.css'
import MainNav from "../../components/MainNav/MainNav";

export default function CampaignDetailsView() {
    const { id } = useParams();
    const [campaign, setCampaign] = useState([]);

    useEffect(() => {
        CampaignService.getCampaignById(id).then(
            (response) => {
                setCampaign(response.data)
            }
        ).catch((error) =>
            alert('could not retrieve campaign')
        )
    }, [])

    return (
        <>
            <MainNav />
            <div className={styles.mainDetails}>
                <div className={styles.campaignInfo}>
                    <div className={styles.infoBox}>
                        <h1 className={styles.title}>{campaign.name}</h1>
                        <img className={styles.image} src="https://placehold.co/500x300" alt="" />
                        <p className={styles.desc}>{campaign.description}</p>
                    </div>
                </div>
                <div className={styles.campaignDonate}>
                    <div className={styles.donateBox}>
                        <p className={styles.raisedAmount}></p>
                        <p className={styles.donationGoal}></p>
                        <progress className={styles.progressBar} value={250} max={campaign.goalAmount} />
                        <button className={styles.donateButton}></button>
                    </div>
                </div>
                {/* {JSON.stringify(campaign)} */}
            </div>
        </>
    )
}