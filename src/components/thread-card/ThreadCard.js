import { MainContainer } from '../container/MainContainer';
import { Image } from '@aws-amplify/ui-react';
import { Heading } from '../heading/Heading';
import { BodyText } from '../body-text/BodyText';
import moment from 'moment';
import './thread-card.scss';
const ThreadCard = (props) => {
    const { title, content, image, ownerId, createdAt } = props;
    
    let date = moment(createdAt);
    date = date.format('MMMM D, YYYY [at] h:mm A');
    return (
        <MainContainer> 
            <Heading className="heading"> {title} </Heading>
            <BodyText className="body"> {content} </BodyText>
            {image && (<Image
                src={image}
                alt={`visual aid for ${title}`}
                style={{ width: 400 }}
            />)}
            <BodyText className="caption"> Created by {ownerId ? ownerId : 'Default' } on {date} </BodyText>
        </MainContainer>
    );
}

export { ThreadCard } 