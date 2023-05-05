import { MainContainer } from "../../components/container/MainContainer";
import { Heading } from '../../components/heading/Heading';
import { BodyText } from '../../components/body-text/BodyText';
import { Auth, Storage } from 'aws-amplify';
import { View, Flex, Button, Image } from '@aws-amplify/ui-react';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';


import './my-profile.scss';

const MyProfile = () => {

    const uniqueId = uuidv4();

    const [profileImage, setProfileImage] = useState(null);

    async function fetchProfilePicture() {
        const profileImage = await Storage.get(Auth.user.attributes.picture);
        setProfileImage(profileImage);
    }


    async function addProfilePicture(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const currentUser = await Auth.currentAuthenticatedUser();
        const image = form.get("image");

        const imageName = `${image.name}-${uniqueId}`;

        try {
            const result = await Auth.updateUserAttributes(currentUser, {
                picture: imageName
            })
            await Storage.put(imageName, image);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchProfilePicture();
    })

    return (
        <div className="mainContainer">
            <MainContainer>
                <Flex direction="row">
                    <div className="fieldContainer">
                        <Heading>
                            {Auth.user.username}'s profile
                        </Heading>
                        <br />
                        <BodyText className="addText">
                            Add a profile picture:
                        </BodyText>
                        <View as="form" margin="1rem 0" onSubmit={addProfilePicture}>
                            <Flex direction="column" justifyContent="center">
                                <View
                                    name="image"
                                    as="input"
                                    type="file"
                                    style={{ alignSelf: "end" }}
                                />
                                <Button type="submit" variation="primary">
                                    Add profile picture
                                </Button>
                            </Flex>
                        </View>
                    </div>
                    <div className="profilePicture">
                        {profileImage != null &&
                            <Image
                                src={profileImage}
                                alt="Profile picture"
                                width="200px"
                                height="200px"
                                objectFit="cover"
                            />
                        }
                    </div>
                </Flex>
            </MainContainer>
        </div>
    )
}

export { MyProfile };