import { CommentContainer } from '../container/MainContainer';
import { BodyText } from '../body-text/BodyText';
import { useState, useEffect } from 'react';
import { Auth, Storage } from 'aws-amplify';
import { Image, Flex } from '@aws-amplify/ui-react';

import './comment.scss';

const Comment = ({ username, content }) => {

    const [profileImage, setProfileImage] = useState(null);

    async function fetchProfilePicture() {
        const profileImage = await Storage.get(Auth.user.attributes.picture);
        setProfileImage(profileImage);
    }

    useEffect(() => {
        fetchProfilePicture();
    })

    return (
        <CommentContainer>
            <Flex direction="row" className="flexColumn">
                <div style={{marginRight: "1rem"}}>
                {profileImage !== null &&
                    <div style={{alignItems: "column", justifyContent: "center"}}>
                        <Image
                            src={profileImage}
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
                <BodyText> {content} </BodyText>
            </Flex>
        </CommentContainer>
    )
}

export { Comment } 