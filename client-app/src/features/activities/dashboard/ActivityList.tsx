import * as React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../App/models/activity";

    
interface Props {
  activities: Activity[];
  handleSelectedActivity: (id: string) => void;
  deleteActvity: (id: string) => void;
  submiting: boolean;
}


export default function ActivityList({
  activities,
  handleSelectedActivity,
  deleteActvity,
  submiting,
}: Props) {

  const [target, setTarget] = React.useState('');
  function handleDeletingItem(e: React.SyntheticEvent<HTMLButtonElement>, id: string){
    setTarget(e.currentTarget.name);
    deleteActvity(id);
  }


  return ( 
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as={"a"}> {activity.title} </Item.Header>
              <Item.Meta> {activity.date} </Item.Meta>
              <Item.Description>
                <div>{activity.description} </div>
                <div>
                  {activity.city}, {activity.venue}{" "}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => handleSelectedActivity(activity.id)}
                  floated="right"
                  content="View"
                  color="blue"
                ></Button>
                <Button
                  loading={submiting && target === activity.id}
                  onClick={(e) => handleDeletingItem(e, activity.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                  name = {activity.id}
                ></Button>
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
