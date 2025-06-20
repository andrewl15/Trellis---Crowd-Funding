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
import PollCard from "../../components/PollCard/PollCard";
import DonateModal from "../../components/Modals/DonateModal";
import AlertModal from "../../components/Modals/AlertModal";
import PollModal from "../../components/Modals/PollModal";
import PollService from "../../services/PollService";


export default function CampaignDetailsView() {
    const [isOpen, setIsOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const { id } = useParams();
    const user = useContext(UserContext);
    const [campaign, setCampaign] = useState([]);
    const [donation, setDonation] = useState({
        campaignId: '',
        userId: null,
        amount: '',
        donationDate: new Date().toISOString().split('T')[0],
        firstName: "",
        lastName: "",
    });
    const [donationCount, setDonationCount] = useState(0);
    const percentage = Math.round(campaign.amountRaised / campaign.goalAmount * 100);
    const [creator, Setcreator] = useState("");
    const [poll, setPoll] = useState([]);
    const [pollOptions, setPollOptions] = useState([]);
    const [nameOpen, setNameOpen] = useState(false);
    const [pollOpen, setPollOpen] = useState(false)
    const [topDonations, setTopDonations] = useState([])

    function handleDonate() {
        if (!donation.amount) {
            setAlertOpen(true);
            return;
        } else if (!donation.firstName || !donation.lastName) {
            setNameOpen(true);
            return;
        }
        console.log(donation.amount)
        DonateService.createDonation(donation).then(
            (response) => {
                console.log('Donation created successfully:');
            }).catch(error => {
                console.error('Error creating donation:', error);
            });
        CampaignService.updateCampaignRaisedAmountById(donation.amount, id)
            .then(response => {
                if (response.status === 200) {
                    console.log('Campaign updated successfully!');
                    window.location.reload();
                }

            })
            .catch(error => {
                console.error('Error updating campaign:', error);
            });
        setIsOpen(false);
        setAlertOpen(false);
        setNameOpen(false);
    }

    //    function handleAddPoll()  {
    //             PollService.createPoll({
    //             campaignId: id,
    //           });
    //           setPoll(response.data);      
    //           setPollOpen(true);             
    //         } catch (error) {
    //           console.error("Error creating poll:", error);
    //         }
    //       };

    function handleAddPoll() {
        setPollOpen(true);
        // const pollData = {
        //     campaignId: id
        // }
        // PollService.createPoll(pollData).then(
        //     (response) => {
        //         if(response.status === 201){
        //             setPoll(response.data);
        //             setPollOpen(true);
        //         }
        //     }).catch(error => {
        //         console.error('Error creating poll:', error);
        //     });
    }



    useEffect(() => {

        CampaignService.getCampaignById(id).then(
            (response) => {
                setCampaign(response.data)
                // setPoll({ ...poll, title: "poll 1" })
                if (user) {
                    setDonation({ ...donation, campaignId: response.data.id, userId: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email })
                } else {
                    setDonation({ ...donation, campaignId: response.data.id })
                }
            }
        ).catch((error) =>
            alert('could not retrieve campaign')
        )
   
            DonateService.getDonationsByCampaignId(id).then(
                (response) => {
                    setDonationCount(response.data)
                }
    
            ).catch((error) =>
                alert('could not retrieve donations')
            )
        
        
            DonateService.getThreeHighestDonationsByCampaignId(id).then(
                (response) => {
                    setTopDonations(response.data)
                }
            ).catch((error) =>
                alert('could not retrieve top donations')
            )


        CampaignService.getCampaignCreatorById(id).then(
            (response) => {
                Setcreator(response.data)
            }
        ).catch((error) =>
            alert('could not retrieve creator'))
        // PollService.getPollByCampaignId(id)
        //     .then((response) => {
        //         const fetchedPoll = response.data;

        //         // Guard: stop if there's no poll (null or empty object)
        //         if (!fetchedPoll || !fetchedPoll.id) {
        //             console.log("No poll found for this campaign.");
        //             return;
        //         }

        //         setPoll(fetchedPoll);

        //         PollService.getPollOptionsByPollId(fetchedPoll.id)
        //             .then((optionsResponse) => {
        //                 setPollOptions(optionsResponse.data);
        //             })
        //             .catch((error) => {
        //                 console.error('Error retrieving poll options:', error);
        //             });
        //     })
        //     .catch((error) => {
        //         console.error('Error retrieving poll:', error);
        //     });



    }, [])

    return (
        <>
            <MainNav />
            <div className={styles.mainDetails}>

                <div className={styles.campaignInfo}>
                    <div className={styles.infoBox}>
                        <div className={styles.infoHeader}>
                            <h1 className={styles.title}>{campaign.name}</h1>
                        </div>
                        <div>
                            <img className={styles.image} src={campaign.imageUrl} alt="" />
                            <p className={styles.creator}>{`${creator.firstName} ${creator.lastName} created this campaign`}</p>
                            <hr className={styles.line}></hr>
                            <p className={styles.desc}>{campaign.description}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.campaignDonate}>
                    <div className={styles.donateBox}>

                        <div className={styles.boxHeader}>
                            <div className={styles.progressText}>
                                <p className={styles.raisedAmount}>${campaign.amountRaised} Raised</p>
                                <p className={styles.donationGoal}>{`$${campaign.goalAmount} | ${donationCount} donation(s)`}</p>
                            </div>
                            <div className={styles.emptySection}></div>
                            <CircularProgressbar
                                className={styles.progressCircle}
                                value={campaign.amountRaised}
                                maxValue={campaign.goalAmount}
                                text={`${percentage}%`}
                                styles={buildStyles({
                                    strokeLinecap: 'butt',
                                    textSize: '16px',
                                    pathTransitionDuration: 0.5,
                                    pathColor: `green`,
                                    textColor: 'black',
                                    trailColor: '#C9C8C7'
                                })}
                            />
                        </div>

                        <button className={styles.donateButton} onClick={() => setIsOpen(!isOpen)}>Donate</button>
                        {user && user.id === creator.id ?
                            <Link to={`/campaign/${id}/update`}><button type="submit" className={styles.editButton}>Edit Campaign</button> </Link>
                            : <></>
                        }
                        <div className={styles.donors}>
                            <p>Top Donors</p>
                            {topDonations.map(
                                (donation, index) => (
                                    <div key={index} className={styles.donor}>
                                        <div>{donation.firstName} {donation.lastName}</div>
                                        <div>${donation.amount}</div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* {user && user.id === creator.id && poll.name ? <div className={styles.pollbox}>
                        <PollCard poll={poll} owner={user.id === creator.id} pollOptions={pollOptions} /></div> :
                        user && user.id === creator.id ? <div className={styles.polleditbox}><button className={styles.polleditButton} onClick={handleAddPoll}>Add Poll</button></div> :
                            user ?
                                poll.name ? <div className={styles.pollbox}>
                                    <PollCard poll={poll} pollOptions={pollOptions} /></div> : <></> : <div className={styles.cantvotebox}>you must be logged in to view polls</div>} */}
                </div>
                {isOpen && <DonateModal donation={donation} setDonation={setDonation} isOpen={isOpen} onClose={() => {
                    setIsOpen(false);
                    setAlertOpen(false);
                    setNameOpen(false);
                }} onDonate={handleDonate} />}
                {/* {pollOpen && <PollModal isOpen={pollOpen} poll={poll} campaign={campaign} setPoll={setPoll} onClose={() => { setPollOpen(false) }} />} */}
            </div>
            <div className={styles.alerts}>
                {alertOpen && <AlertModal prompt={"Please enter a donation amount of greater than $0"} color={"#bd4037"} />}
                {nameOpen && <AlertModal prompt={"Please enter a first and last name"} color={"#bd4037"} />}
            </div>

        </>
    )
}