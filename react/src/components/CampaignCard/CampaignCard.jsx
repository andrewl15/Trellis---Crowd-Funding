import { Link } from "react-router-dom"
import styles from './CampaignCard.module.css'
import { style } from "@mui/system"
import { CardImgOverlay } from "react-bootstrap";

export default function CampaignCard({campaign}){
    let timeRemaining = JSON.stringify(campaign.endDate);
    let string = timeRemaining.substring(1,11)
    let desc = campaign.description;
    let shortdesc = desc.substring(0,50)


    return (
        <>
        <div className={styles.card}>
        <Link to={`Campaign/${campaign.id}`} className={styles.link}>
        <p className={styles.title}>{campaign.name}</p>
        <p className={styles.title}>End Date: {string}</p>
        <img className={styles.image} src="https://placehold.co/400x400" alt="" />
        <p className={styles.category}>{campaign.category}</p>
        <hr className={styles.line}></hr>
        <p className={styles.desc}>{shortdesc}...</p>
        </Link>
        </div>
        </>
    )
}