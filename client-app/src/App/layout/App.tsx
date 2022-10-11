import React, { Fragment, useEffect, useState } from "react";
import "./styles.css";
import "semantic-ui-css/semantic.min.css";
import { Container, Header, List } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./loadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loadingState, setLoading] = useState(true);
  const [submiting, setSubmit] = useState(false);



  useEffect(() => {
    agent.Activities.list().then(res => {

      let activities: Activity[] = [];
      res.forEach( activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);
    })
  }, [])

  function handleSelectedActivity(id: string) {
    setSelectedActivity(activities.find((i) => i.id === id));
  }

  function handleCancelActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectedActivity(id) : handleCancelActivity();
    setEditMode(true);
  }
  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOdEditActivity(activity: Activity) {
    setSubmit(true);
    if(activity.id){
      agent.Activities.update(activity).then( () => {
        setActivities([...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
          setSelectedActivity(activity);
          setEditMode(false);
          setSubmit(false);
      })
    }else{
      activity.id = uuid();
      agent.Activities.create(activity).then( () => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmit(false);
      })
    }
 
  }

  function handleDeleteActivity(id: string) {
    setSubmit(true);
    agent.Activities.delete(id).then( ()=>{      
      setActivities([...activities.filter((i) => i.id !== id)]);
      setSubmit(false);
    });
  }

  if(loadingState) return <LoadingComponent content="Loading app"/>
  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          handleSelectedActivity={handleSelectedActivity}
          cancelSelectedActivity={handleCancelActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOdEditActivity}
          deleteActvity={handleDeleteActivity}
          submiting = {submiting}
        />
      </Container>
    </Fragment>
  );
}

export default App;
