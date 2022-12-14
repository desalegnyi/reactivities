import * as React from 'react';
import { Button, Card, Icon } from 'semantic-ui-react';
import { Activity } from '../../../App/models/activity';

interface Props{
    activity: Activity;
    cancelSelectedActivity:() => void;
    openForm: (id: string) =>void;
}

export default function ActivityDetails({activity, cancelSelectedActivity, openForm}: Props){
    return(
        <Card fluid>
        {/* <Image src={`/assets/categoryImages/${activity.category}.png`} /> */}
        <Card.Content>
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>
            <span className='date'>{activity.date}</span>
          </Card.Meta>
          <Card.Description>
            {activity.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
         <Button.Group widths='2'>
            <Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit'/>
            <Button onClick={()=>cancelSelectedActivity()} basic color='grey' content='Cancel'/>
         </Button.Group>
        </Card.Content>
      </Card>
    )
}