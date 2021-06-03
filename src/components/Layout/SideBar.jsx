import {
  FaChevronDown,
  FaInbox,
  FaRegCalendar,
  FaRegCalendarAlt,
} from "react-icons/fa";

import Tab from "../Tab";

import ProjectTab from "../ProjectTab";
import { useProjectsValue } from "../../context/projects";
import AddProject from "../AddProject";

const SideBar = () => {
  const { projects } = useProjectsValue()
  
  const colors = ["blue", "yellow", "orange", "pink", "green", "maroon", "red"];

  return (
    <div className="col-3 bg-secondary">
      <div className="row mt-4 ms-5 ">
        <Tab icon={FaInbox}>Inbox</Tab>
        <Tab icon={FaRegCalendar}>Today</Tab>
        <Tab icon={FaRegCalendarAlt}>UpComing</Tab>
      </div>
      <div className="row mt-4 ms-4">
        <div className="mb-2">
          <FaChevronDown />
          <span className="fw-bolder fs-5 p-3">
            Projects
            <span class="badge bg-primary ms-3 flex-end">
              {projects.length}
            </span>
          </span>
        </div>
        {projects.map((project) => (
          <ProjectTab
            color={colors[Math.floor(Math.random() * 6)]}
            key={project.docId}
            docId={project.docId}
            id={project.projectId}
          >
            {project.name}
          </ProjectTab>
        ))}
      </div>
      <AddProject/>
    </div>
  );
};

export default SideBar;
