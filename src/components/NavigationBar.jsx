import React, { useEffect } from 'react';
import logoImage from '../assets/logo.png';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getDesignerDetails, getClientDetails } from '../redux/usersSlice';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './NavigationBar.css';

const NavigationBar = () => {

  const handleLogOut = () => {
    localStorage.removeItem("userLoggedIn");
    window.location.href = "/";
  }

  const isLogged = useSelector((state)=> state.users.isLogged);
  const designer = useSelector((state)=> state.users.designer);
  const client = useSelector((state)=> state.users.client);
  const role = useSelector((state)=> state.users.role);
  const designerId = useSelector((state)=> state.users.designerId);
  const clientId = useSelector((state)=> state.users.clientId);

  const dispatch = useDispatch();
  const token = localStorage.getItem('userLoggedIn');

  useEffect(() => {
      if (token) {
          if (role === 'Designer') {
              dispatch(getDesignerDetails(designerId));
          } else if (role === 'Client') {
              dispatch(getClientDetails(clientId));
          }
      }
  }, [dispatch, token, designerId, clientId, role]);



  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <div className='container d-flex justify-content-between align-items-center w-100'>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            {isLogged && (
              <Nav className="me-auto">
                {role === 'Designer' ? (
                  <>
                    <Link className='links' to="/all-companies">
                      <Nav.Item className='links mx-2'>Companies</Nav.Item>
                    </Link>
                    <Link className='links' to="/all-job-offers">
                      <Nav.Item className='links mx-2'>Job Offers</Nav.Item>
                    </Link>
                    <Link className='links' to="/all-projects">
                      <Nav.Item className='mx-2'>All Projects</Nav.Item>
                    </Link>
                  </>
                ) : role === 'Client' ? (
                  <>
                    <Link className='links' to="/all-designers">
                      <Nav.Item className='links mx-2'>All Designers</Nav.Item>
                    </Link>
                    <Link className='links' to="/all-projects">
                      <Nav.Item className='mx-2'>All Projects</Nav.Item>
                    </Link>
                  </>
                ) : null}
              </Nav>
            )}
          </Navbar.Collapse>
          <div className="d-flex justify-content-center" >
            <Link to="/">
              <Navbar.Brand><img src={logoImage} alt="Logo" className="logo"/></Navbar.Brand>
            </Link>
          </div>
          <Navbar.Collapse id="basic-navbar-nav ">
            <div className='ms-auto'>
              {isLogged ? (
                <div className='d-flex justify-content-center align-items-center'>
                  {role === 'Designer' ? (
                    <>
                      <Link to="/create-project">
                        <Button className='nav-buttons mx-2'>Project+</Button>
                      </Link>
                      <Button className='logout-button mx-2' onClick={handleLogOut}>LogOut</Button>
                      {designer && (
                        <>
                        <Link to="/dashboard" className='links'>
                          <span className='user-hi me-2'>Hi <span className='user-nickname'>{designer.designer.nickname}</span></span>
                          <img src={designer.designer.avatar} alt="User Avatar" className="user-avatar" />
                        </Link>
                        </>
                      )}
                    </>
                  ) : role === 'Client' ? (
                    <>
                      <Link className='links' to="/create-job-offer">
                        <Button className='nav-buttons mx-2'>Job+</Button>
                      </Link>
                      <Button className='logout-button mx-2' onClick={handleLogOut}>LogOut</Button>
                      {client && (
                        <>
                        <Link className='links' to="/dashboard">
                          <span className='user-hi me-2'>Hi <span className='user-company'>{client.client.company}</span></span>
                          <img src={client.client.avatar} alt="User Avatar" className="user-avatar" />
                        </Link>
                        </>
                      )}
                    </>
                  ) : null}
                </div>
              ) : (
                <Form className="d-flex mx-2">
                  <Link to="/signup-options">
                    <Button className='nav-buttons mx-2'>SignUp</Button>
                  </Link>
                  <Link to="/login">
                    <Button className='nav-buttons mx-2'>LogIn</Button>
                  </Link>
                </Form>
              )}
            </div>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
