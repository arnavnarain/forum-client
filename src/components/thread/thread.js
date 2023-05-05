import { useLocation } from "react-router-dom";
import { getNote, listNotes } from "../../graphql/queries";
import { API, Storage, Auth, graphqlOperation } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { ThreadCard } from '../thread-card/ThreadCard';

import './thread.scss';
import { MainContainer } from "../container/MainContainer";
import { Heading } from '../heading/Heading';
import { createComment, updateNote } from '../../graphql/mutations'
import { BodyText } from "../body-text/BodyText";
import { Comment } from '../comment/comment';
const Thread = () => {
    const location = useLocation();
    const noteId = location.search.substring(8);
    const [note, setNote] = useState(null);
    const [commentInput, setCommentInput] = useState('');
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);

    async function createNewComment(username, content, noteId) {
        try {

            const result = await API.graphql(graphqlOperation(updateNote, {
                input: {
                    id: noteId,
                    comments: note.comments ? [...note.comments, content] : [content]
                }
            }));


            const result2 = await API.graphql(graphqlOperation(updateNote, {
                input: {
                    id: noteId,
                    users: note.users ? [...note.users, username] : [username]
                }
            }));
            setUsers([...users, username])
            setComments([...comments, content])
            return result2;
        } catch (error) {
            console.error('Error creating comment:', error);
            return null;
        }
    }


    useEffect(() => {
        const fetchNote = async () => {
            try {
                const { data } = await API.graphql({ query: getNote, variables: { id: noteId } });
                if (data.getNote) {
                    const url = await Storage.get(data.getNote.name);
                    data.getNote.image = url;
                }
                setNote(data.getNote);
                if (data?.getNote?.comments) { 
                    setComments(data.getNote.comments);
                }
                if (data?.getNote?.users) { 
                    setUsers(data.getNote.users);
                }
            } catch (error) {
                console.log('error fetching note', error);
            }
        };

        fetchNote();
    }, [noteId]);

    return (
        <div className="threadContainer">
            {note != null && <ThreadCard note={note} compressed={false} />}
            <MainContainer>
                <input onChange={event => setCommentInput(event.target.value)} />
                <button onClick={() => { createNewComment(Auth.user.username, commentInput, note.id) }} className="createCommentAction">Create Comment</button>
            </MainContainer>
            <MainContainer>
                <Heading> Comments </Heading>
            </MainContainer>
            {users.map((str, index) => {
                return (
                    <Comment key={index} username={str} content={comments[index]} />
                );

            })}
        </div>
    );
}

export { Thread } 