import { useState } from "react";
import { BsDot } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdDelete, MdEdit} from 'react-icons/md'
import { useSelectedProjectValue } from "../context/selectedProject";
import { firebase } from '../firebase'
import { useTasks } from "../hooks";
import { useProjectsValue } from "../context/projects";

const ProjectTab = ({ children, color, id, docId}) => {
  const { selectedProject, setSelectedProject } = useSelectedProjectValue();
  const [ShowOptions, setShowOptions] = useState(false)
  const [showEditing, setShowEditing] = useState(false)
  const [editedText, setEditedText] = useState(children)

  const {tasks} = useTasks(selectedProject)
  const {setProjects} = useProjectsValue()

  const deleteProject = () => {
    setShowOptions(false)
    tasks.forEach(task => {
      firebase.firestore().collection('tasks').doc(task.docId).delete()
    })
    firebase.firestore().collection('projects').doc(docId).delete().then(() => {
      setSelectedProject('inbox')
      setProjects([])
    })
  }
  const editProject = () => {
    firebase.firestore().collection('projects').doc(docId).update({name: editedText}).then(() => {
      setSelectedProject('inbox')
      setProjects([])
      setShowEditing(false)
      setEditedText('')
      setShowOptions(false)
    })
  }



  return (
    <div 
      className={`${selectedProject === id?'active': ''} d-flex justify-content-between position-relative`}
      onClick={()=> setSelectedProject(id)}
    >
      {showEditing
      ?(<span>
        <input type="text" className="form-control me-3" value={editedText} onChange={e => setEditedText(e.target.value)}/>
        <div className="btn btn-primary text-white" onClick={editProject}>Update</div>
      </span>)
      :(<span className="">
        <BsDot size="50" color={color} />
        {children}
      </span>)}
      <span className="align-self-center" onClick={() => setShowOptions(!ShowOptions)}><BiDotsVerticalRounded/></span>
      {(selectedProject === id && ShowOptions) && (<div class="card d-inline btn-group position-absolute top-100 end-0 dropdown" role="group" aria-label="Basic example">
        <button type="button" class="btn" onClick={() => setShowEditing(!showEditing)}><MdEdit/></button>
        <button type="button" class="btn btn-danger" onClick={deleteProject}><MdDelete/></button>
      </div>)}
    </div>
  );
};

export default ProjectTab;


// I am passionate about web development in Reactjs. Love to code. Also, I love to work with Node.js and MongoDB.

// I have 3 intermediate projects in Reactjs and a few small projects
// - Burgerio — A burger builder app
// - GGTube (It's a Youtube app for my Church)
// - ToDo List Clone( It is a clone for a very famous Todo List)

// I have done a React.js course.

// I believe that I should be hired for this role because I love to learn new things.
// It would be a privilege to work with IIT Bombay as my goal is to learn and be helpful to my team.
// This role excites me a lot because I have huge expectation for learning growth after working with IIT Bombay.

// I am a friendly man and can get along with anyone and a team player.

// It would my pleasure and a privilege to work with such a prestigious institute as IIT Bombay.


// ----------


// Yes, I have experience in the field of react js.
// I have been working on it since last year
// I have completed 3 projects build them completely myself

// 1. GGTube — A YouTube app for my church (Greater Grace)

// My Church has many branches all across Mumbai. We all know each other
// and watch the sermons of other branches on youtube. Each branch has
// its own youtube channel and this app brings all of them in one place.
// The congregation can follow whichever branch they want and will receive
// videos of only those branches. They can not just watch the video from
// the app, but they can also put a like and comment on the video on youtube
// from this app itself.
// It uses the YouTube API, React & Redux, Firebase

// Demo Link - youtu.be/0ExuJqOHYHk

// 2. Burgerio — A burger builder app
// If you have been to McDonald's, you can order your burger yourself, there
// is a screen where you can keep selecting the ingredients you want and a
// burger will be built live on the screen with the ingredients you selected.
// This does the same and allows you to order the burger from home.
// It uses - React & Redux, Firebase

// Link - burger-app-react-udemy-3349d.web.app/

// 3. Todo list
// this is a clone of a famous todo list and is much more complex than a simple todo list

// it uses React, context API for state management, and firebase