import { useLocation } from "react-router-dom";
import { getNote, listNotes } from "../../graphql/queries";
import { API, Storage, Auth, graphqlOperation } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { ThreadCard } from '../thread-card/ThreadCard';

import './thread.scss';
import { MainContainer } from "../container/MainContainer";
import { Heading } from '../heading/Heading';
import { createComments, updateNote } from '../../graphql/mutations'
import { BodyText } from "../body-text/BodyText";
import { Comment } from '../comment/comment';
const Thread = () => {
    const location = useLocation();
    const noteId = location.search.substring(8);
    const [note, setNote] = useState(null);
    const [commentInput, setCommentInput] = useState('');
    const [comments, setComments] = useState([]);

    async function createNewComment(content) {
        try {

            const createCommentResult = await API.graphql(graphqlOperation(createComments, {
                input: {
                    userId: Auth.user.username,
                    text: content,
                    userProfilePictureUrl: Auth.user.attributes.picture
                }
            }));

            const newComment = createCommentResult.data.createComments;

            const result2 = await API.graphql(graphqlOperation(updateNote, {
                input: {
                    id: noteId,
                    comments: [...comments, newComment.id]
                  }
                }));
            
            console.log(createCommentResult)
            setComments([...comments, newComment.id])
            return result2;
        } catch (error) {
            console.error('Error creating comment:', error);
            return null;
        }
    }
    const fetchNote = async () => {
        try {
            const { data } = await API.graphql({ query: getNote, variables: { id: noteId } });
            if (data.getNote) {
                const url = await Storage.get(data.getNote.name);
                data.getNote.image = url;
            }
            setNote(data.getNote);
            setComments(data.getNote.comments);
            console.log(comments);
        } catch (error) {
            console.log('error fetching note', error);
        }
    };


    useEffect(() => {
        fetchNote();
        //fetchProfilePicture();
    }, []);

    return (
        <div className="threadContainer">
            {note != null && <ThreadCard note={note} compressed={false} />}
            <MainContainer>
                <input onChange={event => setCommentInput(event.target.value)} />
                <button onClick={() => { createNewComment(commentInput) }} className="createCommentAction">Create Comment</button>
            </MainContainer>
            <MainContainer>
                <Heading> Comments </Heading>
            </MainContainer>
            {comments.length > 0 && comments.map((comment, index) => {
                console.log(comment);
                return (
                    <Comment id={comment}/>
                );

            })}
        </div>
    );
}

export { Thread } 