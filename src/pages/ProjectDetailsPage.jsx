import React, {useEffect} from 'react';
import ProjectDetails from '../components/ProjectDetails';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { fetchSingleProject} from '../redux/projectsSlice';
import { fetchDesigners } from '../redux/designersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './ProjectDetailsPage.css';

const ProjectDetailsPage = () => {

  const { projectId } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projects.singleProject);
  const designers = useSelector((state) => state.designers.designers);
  const isSingleProjectLoading = useSelector((state) => state.projects.isSingleProjectLoading);
  const designer = designers?.find((designer) => designer._id === project?.author);
  

  useEffect(() => {
    dispatch(fetchSingleProject(projectId));
    console.log('sto chiamando fetchSingleProject')
    console.log('sto chiamando fetchProjects')
    dispatch(fetchDesigners())
    console.log('sto chiamando fetchDesigners')
  }, [dispatch, projectId]);

  if (isSingleProjectLoading) {
    return <div className="custom-loader-single-project"></div>;
  }

  return (
    <>
    <NavigationBar/>
    <ProjectDetails 
    project={project}
    designer={designer}
    />
    <Footer/>
    </>
  )
}

export default ProjectDetailsPage