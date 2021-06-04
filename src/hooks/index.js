import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth";
import { firebase } from "../firebase";
import { isCollatedProject } from "../helpers";

const useTasks = (selectedProject) => {
  const [tasks, settasks] = useState([]);
  const {email} = useContext(AuthContext)

  useEffect(() => {
    let unsubscribe = firebase.firestore().collection('tasks').where('email','==',email)

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
  }, [selectedProject, email]);
  return { tasks, settasks };
};

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const {email} = useContext(AuthContext)

  useEffect(() => {
    firebase
      .firestore()
      .collection("projects")
      .where('email','==',email)
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((doc) => ({
          email: doc.data().email,
          projectId: doc.data().projectId,
          name: doc.data().name,
          docId: doc.id,
        }));
        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      });
  }, [projects, email]);
  return { projects, setProjects };
};

export { useProjects, useTasks };