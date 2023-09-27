import React from 'react'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import SignUpCover from '../assets/singup-cover.jpg';
import './SingUpOptionsLayout.css';

const SignUpOptionsLayout = () => {
  return (
        <Row className="full-height">
            <Col md={4} className='col-md-4 p-0'>
                <img src={SignUpCover} alt="SingUpCover" className='signup-cover full-height'/>
            </Col>
            <Col md={8} className='col-md-8 p-0 d-flex justify-content-center align-items-center'>
                <div className='d-flex flex-column align-items-center account-selection'>
                    <h1 className='title me-auto mb-4'>Select a type of account!</h1>
                    <Link to="/signup-designer">
                        <Button className='button-google-singup'>
                            Sign up as Designer
                        </Button>
                    </Link>
                        <p className='my-3'>OR</p>
                    <Link to="/signup-client">
                        <Button className='button-email-singup'>
                            Sign up as Client
                        </Button>
                    </Link>
                    <div>
                        <Link to="/login" className='links'>
                        <span className='info'>Already registered? Click to LogIn</span>
                        </Link>
                    </div>
                </div>
            </Col>
        </Row>
  )
}

export default SignUpOptionsLayout