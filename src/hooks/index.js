import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth";
import { firebase } from "../firebase";
import { isCollatedProject } from "../helpers";

const useTasks = (selectedProject) => {
  const [tasks, settasks] = useState([]);
  const currentUser = useContext(AuthContext)

  useEffect(() => {
    let unsubscribe = firebase.firestore().collection('tasks').where('email','==',currentUser.email)

    unsubscribe = 
    selectedProject && !isCollatedProject(selectedProject)
    ? (unsubscribe = unsubscribe.where('projectId','==',selectedProject))
    : selectedProject === 'inbox'
    ? (unsubscribe = unsubscribe.where('projectId','==','inbox'))
    : selectedProject === 'today'
    ? (unsubscribe = unsubscribe.where('date','==','today'))
    : selectedProject === 'upcoming'
    ? (unsubscribe = unsubscribe.where('date','==','upcoming'))
    : unsubscribe
    
    unsubscribe = unsubscribe.onSnapshot(snapshot => {
      const newTasks = snapshot.docs.map(doc => ({
        ...doc.data(),
        docId: doc.id
      }))
      settasks(newTasks)
    })
    return () => unsubscribe()
  }, [selectedProject]);
  return { tasks, settasks };
};

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const currentUser = useContext(AuthContext)
  console.log('Projects Read')

  useEffect(() => {
    firebase
      .firestore()
      .collection("projects")
      .where('email','==',currentUser.email)
      // .orderBy("projectId")
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((doc) => ({
          email: doc.data().email,
          projectId: doc.data().projectId,
          name: doc.data().name,
          docId: doc.id,
        }));
        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          console.log(allProjects !== projects)
          setProjects(allProjects);
        }
      });
  }, [projects]);
  return { projects, setProjects };
};

export { useProjects, useTasks };