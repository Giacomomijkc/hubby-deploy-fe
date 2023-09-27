import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { uploadAvatar, registerClient } from '../redux/clientsSlice';
import {useNavigate} from 'react-router-dom';
import './SignUpClientForm.css';

const SignUpClientForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        company: '',
        description: '',
        website: '',
        email: '',
        password: '',
        address: '',
        vatOrCf: '',
    });

    const avatarURL = useSelector((state) => state.clients.avatarURL);
    const error = useSelector((state) => state.clients.error);
    const successMessage = useSelector((state) => state.clients.successMessage);
    const avatarInputRef = useRef(null);
    const isUploadLoading = useSelector((state) => state.clients.isUploadLoading);

 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value,
            });
    };


    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const uploadData = new FormData();
        uploadData.append('avatar', file);
    
        try {
            await dispatch(uploadAvatar(uploadData));
        } catch (error) {
            console.error('File upload failed:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
    const clientData = {
            ...formData,
            avatar: avatarURL,
        };
    
        try {
            const response = await dispatch(registerClient(clientData));
            setFormData({
                name: '',
                surname: '',
                company: '',
                description: '',
                website: '',
                email: '',
                password: '',
                address: '',
                vatOrCf: '',
            });
            avatarInputRef.current.value = null;
            if (registerClient.fulfilled.match(response)) {
                setTimeout(() => {
                    navigate('/login');
                  }, 2000);
            }

        } catch (error) {
            console.error('Client registration failed:', error);

        }
    };
  return (
    <>
            <Form style={{ width: '30rem'}} encType='multipart/form-data' className='form' onSubmit={handleSubmit}>
            <h1 className='title me-auto mb-4'>Sign up to Hubby with a Client Profile!</h1>
                <div className='row'>
                    <div className='col-md-6'>
                        <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            className='input'
                            type="text" 
                            placeholder="Your Name" 
                            name="name"  
                            value={formData.name}
                            onChange={handleInputChange}
                            />
                        </Form.Group>
                    </div>
                    <div className='col-md-6'>
                        <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput2">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control 
                            className='input'
                            type="text" 
                            placeholder="Your Surname" 
                            name="surname" 
                            value={formData.surname}
                            onChange={handleInputChange}
                            />
                        </Form.Group>
                    </div>
                    <div className='col-md-6'>
                        <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput3">
                            <Form.Label>Company</Form.Label>
                            <Form.Control 
                            className='input'
                            type="text" 
                            placeholder="Your Company" 
                            name="company"
                            value={formData.company} 
                            onChange={handleInputChange}
                            />
                        </Form.Group>
                    </div>
                    <div className='col-md-6'>
                        <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput4">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                            className='input'
                            type="text" 
                            placeholder="Your Description" 
                            name="description" 
                            value={formData.description}
                            onChange={handleInputChange}
                            />
                        </Form.Group>
                    </div>
                    <div className='col-md-6'>
                        <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput5">
                            <Form.Label>Website</Form.Label>
                            <Form.Control 
                            className='input'
                            type="text" 
                            placeholder="Your website url" 
                            name="website" 
                            value={formData.website}
                            onChange={handleInputChange}
                            />
                        </Form.Group>
                    </div>
                    <div className='col-md-6'>
                        <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput6">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                            className='input'
                            type="text" 
                            placeholder="Your Email" 
                            name="email"  
                            value={formData.email}
                            onChange={handleInputChange}
                            />
                        </Form.Group>
                    </div>
                    <div className='col-md-6'>
                        <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput7">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            className='input'
                            type="text" 
                            placeholder="Your Password" 
                            name="password" 
                            value={formData.password}
                            onChange={handleInputChange}
                            />
                        </Form.Group>
                    </div>
                    <div className='col-md-6'>
                        <Form.Group className="mb-3" controlId="createPostForm.ControlInput8">
                            <Form.Label>Address</Form.Label>
                            <Form.Control 
                            className='input'
                            type="text" 
                            placeholder="Your Address" 
                            name="address" 
                            value={formData.address}
                            onChange={handleInputChange}
                            />
                        </Form.Group>
                    </div>
                    <div className='col-md-6'>
                        <Form.Group className="mb-3" controlId="createPostForm.ControlInput9">
                            <Form.Label>VAT / Fiscal Code</Form.Label>
                            <Form.Control 
                            className='input'
                            type="text" 
                            placeholder="Your Vat or Fiscal Code" 
                            name="vatOrCf"
                            value={formData.vatOrCf}
                            onChange={handleInputChange} 
                            />
                        </Form.Group>
                    </div>
                    <div className='col-md-6'>
                        <Form.Group className="mb-3" controlId="createPostForm.ControlInput10">
                            <Form.Label>Avatar </Form.Label>
                            <Form.Control 
                            className='input'
                            type="file" 
                            placeholder="Upload an image" 
                            name="avatar"
                            ref={avatarInputRef}
                            onChange={handleFileUpload} 
                            />
                        </Form.Group>
                    </div>
                </div>
                <div className='d-flex flex-column'>
                    {isUploadLoading ?
                    <div className="custom-loader"></div>
                   :  <Button 
                   className='form-button my-2' 
                   type="submit" 
                   variant="success">
                       Create Your Client Account
                   </Button>  }
                    {error && (
                        <div className="alert alert-danger me-auto " role="alert">
                            {error}
                        </div>
                    )}
                    {successMessage && (
                         <div className="alert alert-success me-auto">{successMessage}</div>
                    )}
                </div>
            </Form>
    </>
  )
}

export default SignUpClientForm