import { MainContainer } from '../container/MainContainer';
import { BodyText } from '../body-text/BodyText';

const Comment = ( { username, content} ) => {

    return (
        <MainContainer>
            <BodyText>
                {content}
            </BodyText>
            <BodyText> {username} </BodyText>
        </MainContainer>
    )
}

export { Comment } 