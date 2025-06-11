import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import CampaignService from "../../services/CampaignService";
import NavView from '../../components/MainNav/MainNav';
import styles from './CampaignDetailsView.module.css'
import MainNav from "../../components/MainNav/MainNav";

export default function CampaignDetailsView() {
    const {id} = useParams();
    const [campaign, setCampaign] = useState([]);

    useEffect(() => {
    CampaignService.getCampaignById(id).then(
        (response) => {
            setCampaign(response.data)
        }
    ).catch((error) => 
        alert('could not retrieve campaign')
    )
    },[])

    return(
        <>
        <MainNav/>
        <div className={styles.mainDiv}>
        {JSON.stringify(campaign)}
        </div>
        </>
    )
}