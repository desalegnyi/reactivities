import React, { Component } from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../App/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props{
  activities: Activity[];
  selectedActivity: Activity | undefined;
  handleSelectedActivity: (id: string) => void;
  cancelSelectedActivity:() => void;
  editMode : boolean;
  openForm : (id : string) => void;
  closeForm: () => void;
  createOrEdit: (activity :Activity) => void;
  deleteActvity: (id: string) => void;
}
export default function ActivityDashboard({activities, 
  selectedActivity, handleSelectedActivity, cancelSelectedActivity,
editMode, openForm, closeForm, createOrEdit, deleteActvity}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
       <ActivityList activities={activities} handleSelectedActivity={handleSelectedActivity} deleteActvity = {deleteActvity}/>
      </Grid.Column>
      <Grid.Column width='6'>
        {selectedActivity && !editMode &&
        <ActivityDetails activity={selectedActivity} cancelSelectedActivity = {cancelSelectedActivity}
        openForm = {openForm}/>}
        {editMode &&
        <ActivityForm closeForm = {closeForm} activity = {selectedActivity} createOrEdit = {createOrEdit}/>
}
      </Grid.Column>
    </Grid>
  );
}
