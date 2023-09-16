import { CommentContainer } from '../container/MainContainer';
import { BodyText } from '../body-text/BodyText';
import { useState, useEffect } from 'react';
import { Auth, Storage } from 'aws-amplify';
import { Image, Flex } from '@aws-amplify/ui-react';

import './comment.scss';
import { getComments } from '../../graphql/queries';
import { API } from 'aws-amplify';

const Comment = (props) => {
    const { id } = props

    const [picture, setPicture] = useState('')
    const [username, setUsername] = useState('TEST')
    const [content, setContent] = useState('')
    const [profileImage, setProfileImage] = useState('')

    async function fetchComment() { 
        if (id !== undefined) {
            const { data } = await API.graphql({ query: getComments, variables: { id: id } });
            console.log(data);
            setUsername(data.getComments.userId);
            console.log(data.getComments.userId);
            setContent(data.getComments.text);
            setProfileImage(data.getComments.userProfilePictureUrl);
        }
    }

    async function fetchProfilePicture() {
        setPicture(await Storage.get(profileImage));
    }

    useEffect(() => {
        fetchComment();
        fetchProfilePicture();
        console.log(username);
    }, [username])

    return (
        <CommentContainer>
            <Flex direction="row" className="flexColumn">
                <div style={{marginRight: "1rem"}}>
                {profileImage !== null &&
                    <div style={{alignItems: "column", justifyContent: "center"}}>
                        <Image
                            src={picture}
                            alt="Profile picture"
                            width="50px"
                            height="50px"
                            objectFit="cover"
                            style={{ borderRadius: "50%", minWidth: "50px" }}
                        />
                        <BodyText className="usernameLine">{username} </BodyText>
                    </div>
                }
                </div>
                <BodyText className="content"> {content} </BodyText>
            </Flex>
        </CommentContainer>
    )
}

export { Comment } 