import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import CampaignService from "../../services/CampaignService";
import NavView from '../../components/MainNav/MainNav';
import styles from './CampaignDetailsView.module.css'
import MainNav from "../../components/MainNav/MainNav";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import DonateService from "../../services/DonateService";


export default function CampaignDetailsView() {
    const { id } = useParams();
    const user = useContext(UserContext);
    const [campaign, setCampaign] = useState([]);
    const donations = 120; // This should be dynamic based on user input or state
    const percentage = Math.round(campaign.amountRaised / campaign.goalAmount * 100);
    const [creator, Setcreator] = useState("");
    const donationData = {
        "campaignId": id,
        "userId": user.id,
        "amount": 5000.50,
        "donationDate": "2025-06-13",
        "firstName": "Peter",
        "lastName": "Parker",
        "email": "peterParker@example.com"
    }; 

    function handleDonate() {
        const campaignData = {
            ...campaign, amountRaised: campaign.amountRaised + donationData.amount
        };
           
        DonateService.createDonation(donationData).then(
            (response) => {
                if (response.status === 201) {
                    alert('Donation successful!');
                }
            }).catch(error => {
                console.error('Error creating campaign:', error);
            });

        CampaignService.updateCampaign(id, campaignData)
            .then(response => {
                if (response.status === 200) {
                  console.log('Campaign updated successfully!');
                }
            })
            .catch(error => {
                console.error('Error updating campaign:', error);
            });
        
    }

    useEffect(() => {
        CampaignService.getCampaignById(id).then(
            (response) => {
                setCampaign(response.data)
            }
        ).catch((error) =>
            alert('could not retrieve campaign')
        )
        CampaignService.getCampaignCreatorById(id).then(
            (response) => {
                Setcreator(response.data)
            }
        ).catch((error) =>
            alert('could not retrieve creator'))
    }, [donationData])

    return (
        <>
            <MainNav />
            <div className={styles.mainDetails}>

                <div className={styles.campaignInfo}>
                    <div className={styles.infoBox}>
                        <div className={styles.infoHeader}>
                            <h1 className={styles.title}>{campaign.name}</h1>
                        </div>
                        <img className={styles.image} src="https://placehold.co/500x300" alt="" />
                        <p className={styles.creator}>{`${creator.firstName} ${creator.lastName} created this campaign`}</p>
                        <hr className={styles.line}></hr>
                        <p className={styles.desc}>{campaign.description}</p>
                    </div>
                </div>
                <div className={styles.campaignDonate}>
                    <div className={styles.donateBox}>

                        <div className={styles.boxHeader}>
                            <div className={styles.progressText}>
                                <p className={styles.raisedAmount}>${campaign.amountRaised} Raised</p>
                                <p className={styles.donationGoal}>{`$${campaign.goalAmount} | ${donations} donations`}</p>
                            </div>
                            <div className={styles.emptySection}></div>
                            <CircularProgressbar
                                className={styles.progressCircle}
                                value={campaign.amountRaised}
                                maxValue={campaign.goalAmount}
                                text={`${percentage}%`}
                                styles={buildStyles({
                                    // Rotation of path and trail, in number of turns (0-1)

                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',

                                    // Text size
                                    textSize: '16px',

                                    // How long animation takes to go from one percentage to another, in seconds
                                    pathTransitionDuration: 0.5,

                                    // Can specify path transition in more detail, or remove it entirely
                                    // pathTransition: 'none',

                                    // Colors
                                    pathColor: `green`,
                                    textColor: 'black',
                                    trailColor: '#C9C8C7'
                                })}
                            />
                        </div>

                        TODO DONATE POPUP
                        <button className={styles.donateButton} onClick={handleDonate}>Donate</button>
                        {user && user.id === creator.id ?
                            <Link to={`/campaign/${id}/update`}><button type="submit" className={styles.editButton}>Edit Campaign</button> </Link>
                            : <></>
                        }
                        <div className={styles.donors}>
                            <p> Top Donor</p>
                        </div>
                    </div>
                </div>
                {/* {JSON.stringify(campaign)} */}
            </div>
        </>
    )
}