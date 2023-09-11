import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import GameProgressTable from "../../components/GameProgressTable/GameProgressTable";
import { Heading } from '../../components/heading/Heading'
import './livematches.scss'
const LiveMatches = () => { 

  const [matches, setMatches] = useState([])

  var AWS = require('aws-sdk')

  const accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID.replace(/['"]+/g, '');
  const secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY.replace(/['"]+/g, '');
  AWS.config.update({ accessKeyId: accessKeyId, secretAccessKey: secretAccessKey });
  AWS.config.update({ region: 'us-east-1' })


  const getLiveMatches = () => { 
    var lambda = new AWS.Lambda()
    var params = {
      FunctionName: 'LiveMatch-staging',
    }

    lambda.invoke(params, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        const body = JSON.parse(data.Payload)
        setMatches(body.data)
      }
    });
  }


  useEffect(() => { 
    getLiveMatches()
  }, [])

  return (
    <div className="live-matches-container">
      <div className="matches-content">
        {matches?.map((match, index) => (
          <div key={index} className="game-progress-pair">
            <GameProgressTable
              tournamentTitle={match.Tournament}
              surface={match.Surface}
              players={[match["Home Player"], match["Away Player"]]}
              score={[
                match["Set1 Player 1"],
                match["Set1 Player 2"],
                match["Set2 Player 1"],
                match["Set2 Player 2"],
                match["Set3 Player 1"],
                match["Set3 Player 2"],
                match["Set4 Player 1"],
                match["Set4 Player 2"],
                match["Set5 Player 1"],
                match["Set5 Player 2"],
              ]}
            />
          </div>
        ))}
        {matches?.length === 0 && <Heading> No notable matches are happening right now, stay tuned!</Heading>}
      </div>
    </div>
  );
 
}

export { LiveMatches } 