import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDesignerProjects } from '../redux/projectsSlice';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import EditProject from './EditProject';
import './SingleProjectDesignerDashboard.css';

const SingleProjectDesignerDashboard = ({ designerId }) => {
  const dispatch = useDispatch();
  const designerProjects = useSelector((state) => state.projects.designerProjects)

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState();

  const handleShowProjectModal = (projectId) => {
    setSelectedProjectId(projectId); 
    setShowProjectModal(true);
  }

  const handleProjectUpdateSuccess = () => {
    dispatch(fetchDesignerProjects(designerId))
      .then(() => {
        // valutare azioni da fare
      })
      .catch((error) => {
        console.error('Failed to fetch updated designer data:', error);
      });
  };

  useEffect(() => {
        dispatch(fetchDesignerProjects(designerId));
  }, [designerId, dispatch]);

  return (
    <>
      {designerProjects && designerProjects.map(designerProject => (
        <div className='d-flex flex-column my-5 mx-2' style={{ width: '250px' }} key={designerProject._id}>
          <Link to={`/projects/${designerProject._id}`}>
            <img className='project-cover' alt='project-cover' src={designerProject.cover} />
          </Link>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='mt-2'>
              <span className='author-nickname mx-2'>{designerProject.title}</span>
            </div>
            <div className='mt-2'>
                <Button className='edit-project-button' onClick={() => handleShowProjectModal(designerProject._id)}>Edit</Button>
            </div>
            <div>
              {showProjectModal &&
              <EditProject
              setShowProjectModal={setShowProjectModal}
              show={showProjectModal}
              onSuccessCallback={handleProjectUpdateSuccess}
              projectId={selectedProjectId}
              />}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SingleProjectDesignerDashboard;
