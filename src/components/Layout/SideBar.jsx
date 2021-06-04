import {
  FaChevronDown,
  FaInbox,
  FaRegCalendar,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { firebase } from '../../firebase';
import Tab from "../Tab";
import ProjectTab from "../ProjectTab";
import { useProjectsValue } from "../../context/projects";
import AddProject from "../AddProject";


const SideBar = ({sideDrawer}) => {
  const { projects } = useProjectsValue()

  const colors = ["blue", "yellow", "orange", "pink", "green", "maroon", "red"];

  return (
    <div className={`col-lg-3 col-md-4 ${sideDrawer? 'd-block': 'd-none'} d-md-block bg-secondary ps-4`} tabindex="-1">
      <div className="row mt-lg-4 ms-lg-5 mt-md-3 ms-md-2">
        <Tab icon={FaInbox}>Inbox</Tab>
        <Tab icon={FaRegCalendar}>Today</Tab>
        <Tab icon={FaRegCalendarAlt}>UpComing</Tab>
      </div>
      <div className="row mt-lg-4 ms-lg-4 mt-md-3 ms-md-2">
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
      <AddProject />
      <span className="ms-3 mt-3 btn btn-primary text-white d-block d-md-none" onClick={() => { firebase.auth().signOut() }}>
        Sign Out
      </span>
    </div>
  );
};

export default SideBar;
