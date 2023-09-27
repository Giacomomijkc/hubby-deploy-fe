import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../redux/projectsSlice';
import { fetchDesigners } from '../redux/designersSlice';
import SingleProject from './SingleProject';

const AllProjects = () =>{
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.projects.projects);
    const designers = useSelector((state) => state.designers.designers);

    useEffect(() => {
        dispatch(fetchProjects());
        dispatch(fetchDesigners())
    }, [dispatch]);

    return (
        <div>
            <div className='d-flex flex-wrap justify-content-center align-items-center mb-5'>
            {designers && projects &&
            projects.map((project) => {
                const authorDesigner = designers.find(
                    (designer) => designer._id === project.author
                  );
                return (
                    <SingleProject key={project._id} projectToRender={project} authorDesigner={authorDesigner} />
                );
                })
            }
            </div>
        </div>
    );
}

export default AllProjects;