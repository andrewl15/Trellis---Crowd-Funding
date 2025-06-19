import { set } from '@lordicon/helpers'
import styles from './PollCard.module.css'
import { useEffect, useState } from 'react'
import PollService from '../../services/PollService'

export default function PollCard({ poll, owner, pollOptions }) {
    const [yesvalue, setYesValue] = useState(0)
    const [novalue, setNoValue] = useState(0)
    const [pollAmount, setPollAmount] = useState(0)
    const [yesdisabled, setYesDisabled] = useState(false)
    const [nodisabled, setNoDisabled] = useState(false)
    const [hasVoted, setHasVoted] = useState(null)
    const [options, setOptions] = useState([]);

    function handleYes() {
        if (hasVoted === 'yes') { //1
            return;
        }
        if (hasVoted === 'no') {    //2
            setYesValue(yesvalue + 1)
            setNoValue(novalue - 1)
            setHasVoted('yes')
            return;
        } //0
        setYesValue(yesvalue + 1)
        setPollAmount(pollAmount + 1)
        setHasVoted('yes')


    }

    function handleNo() {
        if (hasVoted === 'no') {
            return;
        }
        if (hasVoted === 'yes') {
            setNoValue(novalue + 1)

            setYesValue(yesvalue - 1)
            setHasVoted('no')
            return;
        }
        setNoValue(novalue + 1)
        setPollAmount(pollAmount + 1)
        setHasVoted('no')

    }

    function handleClick(e) {
        const option = { title: `Option`, value: 1 }
        setOptions([...options, option])
        e.preventDefault();

    }

    // useEffect(() => {
    //     if (!poll?.id) return;

    //     PollService.getPollOptionsByPollId(poll.id)
    //         .then((res) => {
    //             const options = res.data;

    //             // Fetch vote counts for each option
    //             Promise.all(
    //                 options.map(async (option) => {
    //                     try {
    //                         const countRes = await PollService.getPollUserCountByPollOption(option.id);
    //                         return { ...option, voteCount: countRes.data };
    //                     } catch (error) {
    //                         console.error(`Error fetching count for option ${option.id}:`, error);
    //                         return { ...option, voteCount: 0 };
    //                     }
    //                 })
    //             ).then((optionsWithCounts) => {

    //                 // Calculate total vote count
    //                 const total = optionsWithCounts.reduce((sum, opt) => sum + opt.voteCount, 0);
    //                 setPollAmount(total);
    //             });
    //         })
    //         .catch((error) => {
    //             console.error('Error retrieving poll options:', error);
    //         });
    // }, [poll]);


    return (
        <>
            <form>
                <div className={styles.header}>
                    <div className={styles.title}>{poll.name}</div>
                    <hr className={styles.line}></hr>
                </div>
                <fieldset>
                    <div className={styles.answer}>
                        {/* {pollOptions && pollOptions.length > 0 ? (
                            pollOptions.map((option, index) => (
                                <div className={styles.pollitem} key={option.id || index}>
                                    <div className={styles.formbutton}>
                                        <input
                                            type="radio"
                                            onClick={() => handleClick} // Pass which option was clicked
                                            className={styles.pollbutton}
                                            disabled={yesdisabled}
                                            id={`choice-${option.id}`}
                                            name="pollOption"
                                            value={option.name}
                                        />
                                        <label htmlFor={`choice-${option.id}`} className={styles.pollLabel}>
                                            {option.name}
                                        </label>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No poll options available.</p>
                        )}
                        {owner ? <div className={styles.percentage}>{pollAmount}</div> : <></>} */}
                        <div className={styles.pollitem} >
                            <div className={styles.formbutton}>
                                <input
                                    type="radio"
                                    onClick={() => handleClick} // Pass which option was clicked
                                    className={styles.pollbutton}
                                    disabled={yesdisabled}
                                    name="pollOption"
                                />
                                <label className={styles.pollLabel}>
                                    Yes
                                </label>
                            </div>
                        </div>
                        <div className={styles.pollitem} >
                            <div className={styles.formbutton}>
                                <input
                                    type="radio"
                                    onClick={() => handleClick} // Pass which option was clicked
                                    className={styles.pollbutton}
                                    disabled={yesdisabled}
                                    name="pollOption"
                                />
                                <label className={styles.pollLabel}>
                                    No
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <div className={styles.buttondiv}>
                    {owner ? <button className={styles.deleteButton} onClick={handleClick}>Delete Poll</button> : <></>}
                </div>
            </form>

        </>
    )
}