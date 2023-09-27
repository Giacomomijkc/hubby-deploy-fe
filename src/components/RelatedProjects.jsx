import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../redux/projectsSlice';
import { fetchDesigners } from '../redux/designersSlice';
import SingleProject from './SingleProject';

const RelatedProject = ({ projectTags, projectId }) => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const designers = useSelector((state) => state.designers.designers);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchDesigners());
  }, [dispatch]);

  const matchingProjects = projects.filter((project) =>
    project.tags.some((tag) => projectTags.includes(tag))
  );

  const filteredProjects = matchingProjects.filter(
    (project) => project._id !== projectId
  );

  return (
    <div>
      <div className='d-flex flex-wrap justify-content-center align-items-center'>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => {
            const authorDesigner = designers.find(
              (designer) => designer._id === project.author
            );

            return (
              <SingleProject
                key={project._id}
                projectToRender={project}
                authorDesigner={authorDesigner}
              />
            );
          })
        ) : (
          <p>No related projects found</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProject;