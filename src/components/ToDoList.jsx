import Content from "./Layout/Content";
import NavBar from "./Layout/NavBar";
import SideBar from "./Layout/SideBar";
import {SelectedProjectProvider} from '../context/selectedProject'
import { ProjectsProvider } from "../context/projects";
import { useState } from "react";

function ToDoList() {
  const [SideDrawer, setSideDrawer] = useState(false)
  return (
    <>
      <SelectedProjectProvider>
      <ProjectsProvider>
      <NavBar sideDrawer={SideDrawer} setSideDrawer={setSideDrawer}/>
      <div className="container-fluid" style={{ height: "93vh" }}>
        <div className="row h-100 position-relative">
          <SideBar sideDrawer={SideDrawer} />
          <Content />
        </div>
      </div>
      </ProjectsProvider>
      </SelectedProjectProvider>
    </>
  );
}

export default ToDoList;
