import { Link } from "react-router-dom"
import styles from './CampaignCard.module.css'
import { style } from "@mui/system"
import { CardImgOverlay } from "react-bootstrap";

export default function CampaignCard({ campaign }) {
    let timeRemaining = JSON.stringify(campaign.endDate);
    let string = timeRemaining.substring(1, 11)
    let desc = campaign.description;
    let shortdesc = desc.substring(0, 250)


    return (
        <>
            <div className={styles.card}>
                <Link to={`/campaign/${campaign.id}`} className={styles.link}>
                    <p className={styles.campaignTitle}>{campaign.name}</p>
                    <p className={styles.title}>End Date: {string}</p>
                    <div className={styles.imageSection}>
                        <img className={styles.image} src={campaign.imageUrl} alt="" />
                    </div>
                    <p className={styles.category}>{campaign.category}</p>
                    <hr className={styles.line}></hr>
                    <p className={styles.desc}>{shortdesc}...</p>
                </Link>
            </div>
        </>
    )
}