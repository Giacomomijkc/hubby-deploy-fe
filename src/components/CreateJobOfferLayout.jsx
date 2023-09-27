import React from 'react'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import ProjectUploadCover from '../assets/project-upload-cover.jpg';
import CreateJobOfferForm from './CreateJobOfferForm';
import './SignUpDesignerLayout.css';

const CreateJobOfferLayout = () => {
  return (
        <Row className="full-height">
            <Col md={4} className='col-md-4 p-0'>
                <img src={ProjectUploadCover} alt="Project Upload Cover" className='signup-cover full-height'/>
            </Col>
            <Col md={8} className='signup-form-container col-md-8 p-0 d-flex justify-content-center align-items-center'>
                <CreateJobOfferForm/>
            </Col>
        </Row>
  )
}

export default CreateJobOfferLayout