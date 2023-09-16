import React, { useEffect, useState, useRef } from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";

var AWS = require('aws-sdk');

const MatchModal = ({ setIsOpen, matchId }) => {
    const [matchData, setMatchData] = useState([]);
    const contentRef = useRef(null); // Reference to the modal content element

    const accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID.replace(/['"]+/g, '');
    const secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY.replace(/['"]+/g, '');
    AWS.config.update({ accessKeyId: accessKeyId, secretAccessKey: secretAccessKey });
    AWS.config.update({ region: 'us-east-1' });

    async function getLiveRankings(matchId) {
        var lambda = new AWS.Lambda();
        var params = {
            FunctionName: 'MatchStats-staging',
            Payload: JSON.stringify({
                matchId: matchId
            })
        }

        lambda.invoke(params, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const body = JSON.parse(data.Payload);
                setMatchData(body.data.statistics[0])
            }
        });
    }

    useEffect(() => {
        getLiveRankings(matchId);
    }, []);

    return (
        <>
            <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h5 className={styles.heading}>Match Statistics</h5>
                    </div>
                    <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                        <RiCloseLine style={{ marginBottom: "-3px" }} />
                    </button>
                    <div className={styles.modalContent} ref={contentRef}>
                        {matchData['P1 name']} Aces : {matchData['Aces P1']}
                        <br></br>
                        {matchData['P2 name']} Aces : {matchData['Aces P2']}
                        <br></br>

                        <br></br>


                        {matchData['P1 name']} Tiebreaks : {matchData['Tiebreaks P1']}
                        <br></br>
                        {matchData['P2 name']} Tiebreaks : {matchData['Tiebreaks P2']}
                        <br></br>

                        {matchData['P1 name']} First serve points : {matchData['First serve points P1']}
                        <br></br>
                        {matchData['P2 name']} First serve points : {matchData['First serve points P2']}
                        <br></br>

                        <br></br>


                        {matchData['P1 name']} Second serve points : {matchData['Second serve points P1']}
                        <br></br>
                        {matchData['P2 name']} Second serve points : {matchData['Second serve points P2']}
                        <br></br>

                        <br></br>

                        
                        {matchData['P1 name']} Break points converted : {matchData['Break points converted P1']}
                        <br></br>
                        {matchData['P2 name']} Break points converted : {matchData['Break points converted P2']}
                        <br></br>

                        <br></br>

                        {matchData['P1 name']} Break points saved : {matchData['Break points saved P1']}
                        <br></br>
                        {matchData['P2 name']} Break points saved : {matchData['Break points saved P2']}
                        <br></br>


                    </div>
                </div>
            </div>
        </>
    );
};

export default MatchModal;
