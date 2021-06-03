import { useContext, useState } from "react";
import { AuthContext } from "../context/Auth";
import { useProjectsValue } from "../context/projects";
import { firebase } from "../firebase";
import { useTasks } from "../hooks";

const AddTask = ({projects, cancel}) => {
  const [taskName, setTaskName] = useState('')
  const [project, setProject] = useState('inbox')
  const [date, setDate] = useState('')
  const {selectedProject} = useProjectsValue()
  const {settasks} = useTasks(selectedProject)
  const currentUser = useContext(AuthContext)

  const addTask = () => {
    firebase.firestore().collection('tasks').add({
      archived: false,
      date,
      email: currentUser.email,
      projectId: project? project: selectedProject,
      task:taskName,
    }).then(() => {
      setTaskName('')
      settasks([])
      cancel(false)
    })
  }
  return (
    <>
      <div className="card p-0 col-10">
      <div className="card-body">
        <input type="text" className="form-control mb-3" placeholder="Enter your task ..." value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
        <div className="row">
          <div className="col-3">
            <select className="form-select" id="autoSizingSelect" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Schedule">
              <option value="">Schedule</option>
              <option value="today">Today</option>
              <option value="upcoming">UpComing</option>
            </select>
          </div>
          <div className="col-3">
            <select className="form-select col-3" id="autoSizingSelect" value={project} onChange={(e) => setProject(e.target.value)}>
              <option defaultValue>Inbox</option>
              {projects.map((project) => (
                <option value={project.projectId}>{project.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-3">
      <button className="btn btn-primary text-light fw-bold" onClick={() => addTask()}>Add Task</button>
      <button className="btn fw-bold ms-3" onClick={() => cancel(false)}>Cancel</button>
    </div>
    </>
  )
}

export default AddTask
