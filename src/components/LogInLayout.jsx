import React from 'react'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import LoginCover from '../assets/login-cover.jpg';
import LoginForm from './LoginForm';
import './LoginLayout.css';

const LogInLayout = () => {
  return (
    <Row className="full-height">
            <Col md={4} className='col-md-4 p-0'>
                <img src={LoginCover} alt="LoginCover" className='login-cover full-height'/>
            </Col>
            <Col md={8} className='col-md-8 p-0 d-flex justify-content-center align-items-center'>
                <LoginForm/>
            </Col>
        </Row>
  )
}

export default LogInLayout