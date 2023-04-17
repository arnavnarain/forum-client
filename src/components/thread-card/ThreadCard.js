import { MainContainer } from '../container/MainContainer';
import { Image } from '@aws-amplify/ui-react';
import { Heading } from '../heading/Heading';
import { BodyText } from '../body-text/BodyText';
import './thread-card.scss';
const ThreadCard = (props) => {
    const { title, content, image } = props;
    return (
        <MainContainer>
            <Heading className="heading"> {title} </Heading>
            <BodyText className="body"> {content} </BodyText>
            {image && (<Image
                src={image}
                alt={`visual aid for ${title}`}
                style={{ width: 400 }}
            />)}
        </MainContainer>
    );
}

export { ThreadCard } 