import { useEffect, useState } from "react"
import { MdDelete, MdEdit } from 'react-icons/md'
import {firebase} from '../firebase'

const Task = ({children, id, archived}) => {
  const [isChecked, setIsChecked] = useState(archived)
  const [editing, setEditing] = useState(false)
  const [editedText, setEditedText] = useState(children)

  useEffect(() => {
    setIsChecked(archived)
  }, [archived])

  useEffect(() => {
    setEditedText(children)
  }, [children])

  const deleteTask = () => {
    firebase.firestore().collection('tasks').doc(id).delete()
  }
  const editTask = () => {
    firebase.firestore().collection('tasks').doc(id).update({task: editedText})
    setEditing(false)
  }

  const archiveTask = () => {
    firebase.firestore().collection('tasks').doc(id).update({archived: true})
  }
  const unArchiveTask = () => {
    firebase.firestore().collection('tasks').doc(id).update({archived: false})
  }

  return (
    <li className="list-group-item d-flex justify-content-between">
      <div className="align-items-center">
        {editing
        ?(<div className="d-flex pt-2">
          <input type="text" className="form-control me-3" value={editedText} onChange={e => setEditedText(e.target.value)}/>
          <div className="btn btn-primary text-white" onClick={editTask}>Update</div>
        </div>)
        :isChecked
          ?(<div className="pt-2">
            <input className="form-check-input me-3" type="checkbox" checked={isChecked} onChange={!isChecked?archiveTask:unArchiveTask} onClick={() => setIsChecked(!isChecked)}/>
            <del>{children}</del>
            </div>)
        :(
          <div className="pt-2">
          <input className="form-check-input align-self-center me-3" type="checkbox" checked={isChecked} onChange={!isChecked?archiveTask:unArchiveTask} onClick={() => setIsChecked(!isChecked)}/>
          {children}
          </div>
        )}
      </div>
      <div className="">
      <div className="btn justify-content-end" onClick={() => setEditing(!editing)}><MdEdit/></div>
      <div className="btn justify-content-end" onClick={() => deleteTask()}><MdDelete/></div>
      </div>
    </li>
  )
}

export default Task