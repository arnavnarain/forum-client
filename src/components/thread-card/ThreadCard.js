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
const ThreadCard = (props) => {
    const { id, title, content, image, ownerId, createdAt, upvotes, downvotes } = props;
    let date = moment(createdAt);
    date = date.format('MMMM D, YYYY [at] h:mm A');

    const userId = Auth.user.attributes.sub;
    console.log(Auth.user.attributes.sub);

    const [totalVotes, setTotalVotes] = useState(upvotes.length - downvotes.length);
    const [upvoteActive, setUpvoteActive] = useState(upvotes.includes(userId));
    const [downvoteActive, setDownvoteActive] = useState(downvotes.includes(userId))

    async function addUpvote(noteId, userId) {
        try {
            if(!downvoteActive) { 
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
        <MainContainer>
            <div className="voteCol">
                <ImageIcon src={upvoteActive ? FilledUpvote : EmptyUpvote} onClick={() => addUpvote(id, userId)} customContainerClass="voteIcon" />
                <b> {totalVotes} </b>
                <ImageIcon src={downvoteActive ? FilledDownvote : EmptyDownvote} onClick={() => addDownvote(id, userId)} customContainerClass="voteIcon" />
            </div>
            <div className="contentCol">
                <Heading className="heading"> {title} </Heading>
                <BodyText className="body"> {content} </BodyText>
                {image && (<Image
                    src={image}
                    alt={`visual aid for ${title}`}
                    style={{ width: 400 }}
                />)}
                <BodyText className="caption"> Created by {ownerId ? ownerId : 'Default'} on {date} </BodyText>
            </div>

        </MainContainer>
    );
}

export { ThreadCard } 