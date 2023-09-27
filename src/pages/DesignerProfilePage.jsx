import React, {useEffect} from 'react';
import DesignerProfile from '../components/DesignerProfile';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { fetchDesignerById } from '../redux/designersSlice';  
import { fetchDesignerProjects } from '../redux/projectsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './ProjectDetailsPage.css';

const DesignerProfilePage = () => {

    const dispatch = useDispatch();
    const {designerId} = useParams();
    const singleDesigner = useSelector((state) => state.designers.singleDesigner);
    const designerProjects = useSelector((state) => state.projects.designerProjects);
    


    useEffect(() => {
        dispatch(fetchDesignerById(designerId));
        dispatch(fetchDesignerProjects(designerId));
        console.log('ho chiamato fetchDesignerProjects')
      }, [dispatch, designerId]);

  return (
    <>
    <NavigationBar/>
    <DesignerProfile
    designer={singleDesigner}
    designerProjects={designerProjects}
    />
    <Footer/>
    </>
  )
}

export default DesignerProfilePage