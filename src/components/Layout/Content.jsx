import { useProjectsValue } from "../../context/projects"
import { useSelectedProjectValue } from "../../context/selectedProject"
import { isCollatedProject, isProject } from "../../helpers"
import Task from "../Tasks"
import AddTask from "../AddTask"
import { useState } from "react"
import { useTasks } from "../../hooks"


const Content = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const { projects } = useProjectsValue()
  const { selectedProject } = useSelectedProjectValue()
  const { tasks, settasks } = useTasks(selectedProject)
  
  let projectName = ``

  isCollatedProject(selectedProject)
    ? projectName = isCollatedProject(selectedProject).name
    : projectName = isProject(projects, selectedProject).name

  return (
    <div className="col-md-8 container">
      <div className="mt-4 ms-md-5 ms-3 col-12 justify-content-center">
        <span className="fw-bolder fs-4">{projectName}</span>
        <ul className="list-group list-group-flush mt-3 me-md-5 me-2">
        {tasks.map(task => (
          <Task id={task.docId} setTasks={settasks} archived={task.archived}>{task.task}</Task>
        ))}
      </ul>
        {showAddTask
        ? (<AddTask projects={projects} cancel={setShowAddTask} setTasks={settasks}/>)
        :(<div className="row align-items-center" onClick={() => setShowAddTask(true)}>
            <span className="col-1 fs-2 text-primary text-end p-0">+</span>
            <span className="col">Add Task</span>
          </div>)}
      </div>
    </div>
  )
}

export default Content
