import React from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import ProjectUploadCover from '../assets/project-upload-cover.jpg';
import ProjectUploadForm from './ProjectUploadForm';
import './ProjectUploadLayout.css'

const ProjectUploadLayout = () => {
  return (
    <Row className="full-height">
            <Col md={4} className='col-md-4 p-0'>
                <img src={ProjectUploadCover} alt="ProjectUploadCover" className='project-upload-cover full-height'/>
            </Col>
            <Col md={8} className='signup-form-container col-md-8 p-0 d-flex justify-content-center align-items-center'>
            <ProjectUploadForm/>
            </Col>
        </Row>
  )
}

export default ProjectUploadLayout;