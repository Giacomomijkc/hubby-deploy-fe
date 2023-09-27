import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { faEnvelope, faGlobe, faLink  } from '@fortawesome/free-solid-svg-icons';

import { fetchProjects } from '../redux/projectsSlice';
import DesignerProjects from './DesignerProjects';
import './DesignerProfile.css';

const DesignerProfile = ({designer, designerProjects}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProjects());
      }, [dispatch, designerProjects]);
    return (
    <>
    <div className='d-flex justify-content-evenly align-items-center border-box border-box-container' >
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <img src={designer?.avatar} alt='designer avatar' className='user-avatar' />
            <span>{designer?.name} {designer?.surname}</span>
        </div>
        <div className='d-flex flex-column justify-content-center align-items-center mt-3 mb-3 title-tags-container'>
        <div>
            <span className='me-2 project-title'>{designer?.description}</span>
        </div>
        <div>
            <span className='ms-2 tags'>
                {designer?.tags?.map((tag, index) => (
                    <React.Fragment key={tag}>
                    {index > 0 && <span className='tag-separator'> | </span>}
                    {tag}
                    </React.Fragment>
                ))}
            </span>
        </div>
    </div>
        <div className='d-flex flex-column justify-content-center align-items-center'>
            {designer?.email && (
            <a href={`mailto:${designer.email}`} className='links'>
                <span><FontAwesomeIcon icon={faEnvelope} className='mx-2 icons' /> {designer?.email}</span>
            </a>
            )}
            {designer?.website && (
                <a href={designer.website} target="_blank" rel="noopener noreferrer" className='links'>
                    <span><FontAwesomeIcon icon={faGlobe} className='mx-2 icons' /> {designer?.website}</span>
                </a>
            )}
            {designer?.instagram && (
                <a href={designer.instagram} target="_blank" rel="noopener noreferrer" className='links'>
                    <span><FontAwesomeIcon icon={faLink} className='mx-2 icons' />{designer?.instagram}</span>
                </a>
            )}
        </div>
    </div>
    <div className='d-flex justify-content-center align-items-center'>
    <DesignerProjects designer={designer} designerProjects={designerProjects}/>
    </div>
    </>
  )
}

export default DesignerProfile