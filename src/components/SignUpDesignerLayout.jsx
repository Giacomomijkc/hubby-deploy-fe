import React from 'react'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import SignUpCover from '../assets/singup-cover.jpg';
import SignUpDesignerForm from './SignUpDesignerForm';
import './SignUpDesignerLayout.css';

const SignUpDesignerLayout = () => {
  return (
        <Row className="full-height">
            <Col md={4} className='col-md-4 p-0'>
                <img src={SignUpCover} alt="SingUpCover" className='signup-cover full-height'/>
            </Col>
            <Col md={8} className='signup-form-container col-md-8 p-0 d-flex justify-content-center align-items-center'>
                <SignUpDesignerForm/>
            </Col>
        </Row>
  )
}

export default SignUpDesignerLayout