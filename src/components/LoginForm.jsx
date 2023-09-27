import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { login } from '../redux/usersSlice';
import './LoginForm.css';

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const error = useSelector((state) => state.users.error);
    const successMessage = useSelector((state) => state.users.successMessage);

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          const response = await dispatch(login({ email, password }))

          if (login.fulfilled.match(response)) {
            setTimeout(() => {
                navigate('/dashboard');
              }, 2000);
        }
        } catch (error) {
        }
      };


  return (
    <Form style={{ width: '30rem'}} className='form' onSubmit={handleLogin}>
        <div className='row'>
            <div className='col-md-6'>
                <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    className='input'
                    type="text" 
                    placeholder="Your Email" 
                    name="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
            </div>
            <div className='col-md-6'>
                <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    className='input'
                    type="text" 
                    placeholder="Your Password" 
                    name="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
            </div>
            <div>
                <Button 
                className='form-button' 
                type="submit" 
                variant="success">
                    Login
                </Button>
                {error && (
                     <div className="alert alert-danger me-auto mt-2" role="alert">
                        {error}
                    </div>
                )}
                {successMessage && (
                     <div className="alert alert-success me-auto mt-2" role="alert">
                        {successMessage}
                    </div>
                )}
            </div>
        </div>
    </Form>
  )
}

export default LoginForm