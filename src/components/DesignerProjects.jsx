import React from 'react';
import SingleProject from './SingleProject';

const DesignerProjects = ({ designer, designerProjects }) => {

  return (
    <div>
      <div className='d-flex flex-wrap justify-content-center align-items-center'>
        {designerProjects.length > 0 ? (
          designerProjects.map((project) => (
            <SingleProject
              key={project._id}
              projectToRender={project}
              authorDesigner={designer } 
            />
          ))
        ) : (
          <p>No other projects found</p>
        )}
      </div>
    </div>
  );
};

export default DesignerProjects;
