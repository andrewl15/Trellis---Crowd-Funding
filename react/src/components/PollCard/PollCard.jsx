import { set } from '@lordicon/helpers'
import styles from './PollCard.module.css'
import { useState } from 'react'

export default function PollCard({ poll, owner }) {
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
        const option = {title: `Option`, value: 1}
        setOptions([...options, option])
        e.preventDefault();

    }

    return (
        <>
            <form>
                <div className={styles.header}>
                    <div className={styles.title}>{poll.title}</div>
                    <hr className={styles.line}></hr>
                    <div className={styles.subheading}>{pollAmount} people voted</div>
                </div>
                <fieldset>
                    <div className={styles.answer}>
                        {options.map(
                            (option) => (
                                <div className={styles.pollitem}>
                                    <div className={styles.formbutton}>
                                        <input type="radio" onClick={handleYes} className={styles.pollbutton} disabled={yesdisabled} id="Choice1" name="contact" value="email" />
                                        <label htmlFor="Choice1" className={styles.pollLabel}>{option.title}</label>
                                    </div>
                                    <div className={styles.loading}>
                                        <progress value={pollAmount === 0 ? 0 : (option.value / pollAmount * 100)} className={styles.loadingbar} max={100} />
                                        <p>{0 < 1 ? "0" : Math.round(option.value / pollAmount * 100)}%</p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </fieldset>
                <div className={styles.buttondiv}>
                    {owner ? <button className={styles.deleteButton} onClick={handleClick}>Delete Poll</button> : <></>}
                </div>
            </form>

        </>
    )
}