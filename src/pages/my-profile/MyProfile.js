import { MainContainer } from "../../components/container/MainContainer";
import { Heading } from '../../components/heading/Heading';
import { Auth } from 'aws-amplify';

const MyProfile = () => {
    
    return (
        <MainContainer>
            <Heading>
                {Auth.user.username}
            </Heading>
        </MainContainer>
    )
}

export { MyProfile };