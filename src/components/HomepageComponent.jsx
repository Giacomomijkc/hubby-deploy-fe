import React from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import './HomepageComponent.css';

const HomepageComponent = () => {
    const designer = useSelector((state)=> state.users.designer);
    const client = useSelector((state)=> state.users.client);  
     
  return (
    <div>
    {client ? (
        <>
        <Container>
        <Row>
            <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
                <h1 className='homepage-title'>Easily Manage Your Creative Deals</h1>
                <span className='homepage-body mt-2'>Hubby is your personal hub where you can receive and interact with deals from designers you want to work with.</span>
            </div>
            <div className='d-flex justify-content-center align-items-center mt-4 mb-5 buttons-container'>
            <Link to="/dashboard" className='links'>
                <Button className='homepage-button'>See your Deals</Button>
            </Link>
            </div>
        </Row>
        </Container>
        </>
    ) : designer ? (
        <>
        <Container>
            <Row >
                <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
                    <h1 className='homepage-title'>Easily Manage Your Creative Deals</h1>
                    <span className='homepage-body mt-2'>Hubby is your personal hub where you can create and interact with creative deals for your clients.</span>
                </div>
                <div className='d-flex justify-content-center align-items-center mt-4 mb-5 buttons-container'>
                <Link to="/dashboard" className='links'>
                    <Button className='homepage-button'>See your Deals</Button>
                </Link>
                </div>
            </Row>
        </Container>
        </>
    ) : (
        <>
        <Container>
            <Row >
                <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
                    <h1 className='homepage-title'>Easily Manage Your Creative Deals</h1>
                    <span className='homepage-body mt-2'>Hubby is your personal hub where you can manage your creative deals, whether you're a company or a designer.</span>
                </div>
                <div className='d-flex justify-content-center align-items-center mt-4 mb-5 buttons-container'>
                <Link to="/signup-designer" className='links'>
                    <Button className='homepage-button mx-2 my-2'>Sign Up as Designer</Button>
                </Link>
                <Link to="/signup-client" className='links'>
                    <Button className='homepage-button-2 mx-2 my-2'>Sign Up as Client</Button>
                </Link>
                </div>
            </Row>
        </Container>
        </>
    )}
  </div>
  )
}

export default HomepageComponent