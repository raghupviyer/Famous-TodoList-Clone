import { useContext, useState } from "react"
import { generatePushId } from "../helpers"
import { firebase } from '../firebase'
import { useProjectsValue } from "../context/projects"
import { AuthContext } from "../context/Auth"

const AddProject = () => {
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const pushId = generatePushId()
  const {projects, setProjects} = useProjectsValue()
  const currentUser = useContext(AuthContext)

  const addProject = () => {
    firebase.firestore().collection('projects').add({
      email: currentUser.email,
      name,
      projectId: pushId,
    }).then(() => {
      setName('')
      setProjects([...projects])
      setShow(false)
    })
  }
  return (
    <>
      {show ? (
        <div className="card">
          <div className="card-body">
            <input type="text" className="form-control mb-3" placeholder="Enter Project Name ..." onChange={(e) => setName(e.target.value)} value={name}/>
            <div className="mt-3">
              <button className="btn btn-primary text-light fw-bold" onClick={() => addProject()}>Add Project</button>
              <button className="btn fw-bold ms-3" onClick={()=> setShow(false)}>Cancel</button>
            </div>
          </div>
        </div>
      ) : (<div className="row align-items-center mt-4 ms-5" onClick={() => setShow(true)}>
        <span className="col-1 fs-2 text-primary text-end p-0">+</span>
        <span className="col">Add Project</span>
      </div>)}
    </>
  )
}

export default AddProject
