import Content from "./Layout/Content";
import NavBar from "./Layout/NavBar";
import SideBar from "./Layout/SideBar";
import {SelectedProjectProvider} from '../context/selectedProject'
import { ProjectsProvider } from "../context/projects";

function ToDoList() {
  return (
    <>
      <SelectedProjectProvider>
      <ProjectsProvider>
      <NavBar />
      <div className="container-fluid" style={{ height: "93vh" }}>
        <div className="row h-100">
          <SideBar />
          <Content />
        </div>
      </div>
      </ProjectsProvider>
      </SelectedProjectProvider>
    </>
  );
}

export default ToDoList;
