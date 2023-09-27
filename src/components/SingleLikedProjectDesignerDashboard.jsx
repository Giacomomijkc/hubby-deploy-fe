import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';  
import { fetchSingleProject } from '../redux/projectsSlice';

const SingleLikedProjectDesignerDashboard = ({ projectId, designers }) => {
    const dispatch = useDispatch();
    const [projectData, setProjectData] = useState(null);


    useEffect(() => {
        dispatch(fetchSingleProject(projectId))
            .then((response) => {
                setProjectData(response.payload);
            });
    }, [projectId, dispatch]);

    const authorDesigner = designers?.find((designer) => designer._id === projectData?.author);

    return (
        <>
            {projectData && authorDesigner && (
                
                <div className='d-flex flex-column my-5 mx-2' style={{ width: '250px' }}>
      <Link to={`/projects/${projectData._id}`}>
        <img className='project-cover' alt='project-cover' src={projectData.cover} />
      </Link>
        <div className='d-flex justify-content-between align-items-center'>
            <div className='mt-2'>
                {authorDesigner && (
                <>
                <div className='d-flex justify-content-between align-items-center'>
                    <Link to={`/designers/${authorDesigner._id}`}>
                    <img className='author-avatar mx-2' alt="Author Avatar" src={authorDesigner.avatar} />
                    </Link>
                    <span className='author-nickname mx-2'>{authorDesigner.nickname}</span>
                    <span className='info mx-2'>{projectData.title}</span>
                </div>
                </>
            )} 
            </div>
        </div>
      </div>
            )}
        </>
    );
};

export default SingleLikedProjectDesignerDashboard;
