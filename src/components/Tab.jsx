import { useSelectedProjectValue } from "../context/selectedProject";

const Tab = ({ children, icon }) => {
  const Icon = icon
  const { selectedProject, setSelectedProject } = useSelectedProjectValue();
  const isActive = selectedProject === children.toLowerCase()? 'active' : ''

  return (
    <div 
      className={['p-2',isActive].join(' ')}
      onClick={()=> setSelectedProject(children.toLowerCase())}
    >
      <Icon/>
      <span className="m-2">{children}</span>
    </div>
  );
};

export default Tab;
