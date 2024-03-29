import { MainContainer } from '../container/MainContainer';
import { Image } from '@aws-amplify/ui-react';
import { Heading } from '../heading/Heading';
import { BodyText } from '../body-text/BodyText';
import { ImageIcon } from '../image-icon/ImageIcon'
import EmptyUpvote from '../../assets/icons/empty_upvote.png'
import FilledUpvote from '../../assets/icons/filled_upvote.png'
import EmptyDownvote from '../../assets/icons/empty_downvote.png'
import FilledDownvote from '../../assets/icons/filled_downvote.png'
import moment from 'moment';
import './thread-card.scss';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { updateNote } from '../../graphql/mutations';


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ThreadCard = (props) => {
    const { note, compressed } = props;
    console.log(note);
    const { id, name: title, description: content, ownerId, created_date:createdAt, upvotes, downvotes } = note;
    console.log(createdAt);

    var AWS = require('aws-sdk')

    const TwitterOAuth = () => {
        console.log("TEST")
        const accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID.replace(/['"]+/g, '');
        const secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY.replace(/['"]+/g, '');
        AWS.config.update({ accessKeyId: accessKeyId, secretAccessKey: secretAccessKey });
        AWS.config.update({ region: 'us-east-1' })

        var lambda = new AWS.Lambda()
        var params = {
            FunctionName: 'TwitterAuthenticate-staging',
        }

        lambda.invoke(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
            } else {
                const body = JSON.parse(data.Payload)
                sessionStorage.setItem('codeVerifier', body.codeVerifier)
                sessionStorage.setItem('state', body.state)
                sessionStorage.setItem('body', content)
                window.location.replace(body.url)
            }
        });
    }
    const navigate = useNavigate()

    let date = moment(createdAt);
    date = date.format('MMMM D, YYYY [at] h:mm A');

    const userId = Auth.user.attributes.sub;

    const [totalVotes, setTotalVotes] = useState(upvotes.length - downvotes.length);
    const [upvoteActive, setUpvoteActive] = useState(upvotes.includes(userId));
    const [downvoteActive, setDownvoteActive] = useState(downvotes.includes(userId))

    const navigateToThread = () => {
        navigate(`/r/${note.id}?search=${note.id}`);
    }
    async function addUpvote(noteId, userId) {
        try {
            if (!downvoteActive) {
                const result = await API.graphql(graphqlOperation(updateNote, {
                    input: {
                        id: noteId,
                        upvotes: upvoteActive ? upvotes.filter((id) => id !== userId) : [...upvotes, userId]
                    }
                }));

                if (upvoteActive) {
                    setTotalVotes(totalVotes - 1);
                } else {
                    setTotalVotes(totalVotes + 1);
                }

                setUpvoteActive(!upvoteActive);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function addDownvote(noteId, userId) {
        try {
            if (!upvoteActive) {
                const result = await API.graphql(graphqlOperation(updateNote, {
                    input: {
                        id: noteId,
                        downvotes: downvoteActive ? downvotes.filter((id) => id !== userId) : [...downvotes, userId]
                    }
                }));

                if (downvoteActive) {
                    setTotalVotes(totalVotes + 1);
                } else {
                    setTotalVotes(totalVotes - 1);
                }
                setDownvoteActive(!downvoteActive);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <MainContainer className="mainContainer">
            <div className="voteCol">
                <ImageIcon src={upvoteActive ? FilledUpvote : EmptyUpvote} onClick={() => addUpvote(id, userId)} customContainerClass="voteIcon" />
                <b> {totalVotes} </b>
                <ImageIcon src={downvoteActive ? FilledDownvote : EmptyDownvote} onClick={() => addDownvote(id, userId)} customContainerClass="voteIcon" />
            </div>
            <div onClick={navigateToThread} className="contentCol">
                <Heading className="heading"> {title} </Heading>
                <BodyText className="bodyTitle"> {content} </BodyText>
                <div style={compressed ? { width: 400, maxHeight: 400, overflow: "hidden" } : {}}>
                    {note.image && (
                        <Image
                            src={note.image}
                            style={{ width: "100%", height: "auto" }} />
                    )}
                </div>
                <BodyText className="caption"> Created by {ownerId ? ownerId : 'Default'} on {date} </BodyText>
                <a className="twitter-button" onClick={TwitterOAuth}>
                    Tweet
                    <span className="twitter-logo"></span>
                </a>
            </div>

        </MainContainer>
    );
}

export { ThreadCard } 