import styles from './PollCard.module.css'
import { useState } from 'react'

export default function PollCard({ poll }) {
    const [yesvalue, setYesValue] = useState(0)
    const [novalue, setNoValue] = useState(0)
    const [pollAmount, setPollAmount] = useState(0)
    const [yesdisabled, setYesDisabled] = useState(false)
    const [nodisabled, setNoDisabled] = useState(false)

    function handleYes(){
        setYesValue(yesvalue + 1)
        setPollAmount(pollAmount + 1)
        setYesDisabled(true)
        setNoDisabled(false)
    }

    function handleNo(){
        setNoValue(novalue + 1)
        setPollAmount(pollAmount + 1)
        setNoDisabled(true)
        setYesDisabled(false)
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
                        <div className={styles.pollitem}>
                            <div>
                            <input type="radio" onClick={handleYes} className={styles.pollbutton} disabled={yesdisabled} id="Choice1" name="contact" value="email" />
                            <label for="Choice1" className={styles.pollLabel}>Yes</label>
                            </div>
                            <div className={styles.loading}>
                            <progress value={yesvalue/pollAmount * 100} className={styles.loadingbar} max={100} />
                            <p>{yesvalue < 1? "0" : Math.round(yesvalue/pollAmount * 100)}%</p>
                            </div>
                        </div>
                        <div className={styles.pollitem}>
                            <div>
                            <input type="radio" onClick={handleNo} className={styles.pollbutton} disabled={nodisabled} id="Choice2" name="contact" value="email" />
                            <label for="Choice2" className={styles.pollLabel}>No</label>
                            </div>
                            <div className={styles.loading}>
                            <progress value={novalue/pollAmount * 100} className={styles.loadingbar} max={100} />
                            <p>{novalue < 1? "0" : Math.round(novalue/pollAmount * 100)}%</p>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>

        </>
    )
}