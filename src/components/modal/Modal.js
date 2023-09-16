import React, { useEffect, useState, useRef } from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";

var AWS = require('aws-sdk');

const Modal = ({ setIsOpen, playerId }) => {
    const [playerData, setPlayerData] = useState([]);
    const contentRef = useRef(null); // Reference to the modal content element

    const accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID.replace(/['"]+/g, '');
    const secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY.replace(/['"]+/g, '');
    AWS.config.update({ accessKeyId: accessKeyId, secretAccessKey: secretAccessKey });
    AWS.config.update({ region: 'us-east-1' });

    async function getLiveRankings(playerId) {
        var lambda = new AWS.Lambda();
        var params = {
            FunctionName: 'PlayerStats-staging',
            Payload: JSON.stringify({
                playerId: playerId
            })
        }

        lambda.invoke(params, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const body = JSON.parse(data.Payload);
                setPlayerData(body.data['player_data']['0']);
            }
        });
    }

    useEffect(() => {
        getLiveRankings(playerId);
    }, []);



    return (
        <>
            <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h5 className={styles.heading}>{playerData?.Name}</h5>
                    </div>
                    <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                        <RiCloseLine style={{ marginBottom: "-3px" }} />
                    </button>
                    <div className={styles.modalContent} ref={contentRef}>
                        Age: {playerData?.Age}
                        <br />
                        Birthplace: {playerData?.Birthplace}
                        <br />
                        Country: {playerData['Flag Code']}
                        <br />
                        Coach: {playerData.Coach}
                        <br />
                        Play Style: {playerData['Play Style']}
                        <br />
                        Career W-L: {playerData['W-L Career']}
                        <br />

                    </div>
                    <img src={playerData?.Image} alt={playerData?.Name} style={{ width: '50%' }} /> {/* Adjust the width percentage as needed */}
                </div>
            </div>
        </>
    );
};

export default Modal;
