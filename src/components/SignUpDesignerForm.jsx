import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { uploadAvatar, registerDesigner } from '../redux/designersSlice';
import {useNavigate} from 'react-router-dom';
import './SignUpDesignerForm.css';

const SignUpDesignerForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        nickname: '',
        description: '',
        tags: [],
        website: '',
        instagram: '',
        email: '',
        password: '',
        address: '',
        vatOrCf: '',
    });

    const avatarURL = useSelector((state) => state.designers.avatarURL);
    const error = useSelector((state) => state.designers.error);
    const successMessage = useSelector((state) => state.designers.successMessage);
    const coverInputRef = useRef(null);
    const isUploadLoading = useSelector((state) => state.designers.isUploadLoading);

 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'tags') {
            setFormData({
                ...formData,
                [name]: value.split(',').map(tag => tag.trim()),
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    console.log(formData)

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

    console.log(avatarURL)

    const handleSubmit = async (e) => {
        e.preventDefault();
    
    const designerData = {
            ...formData,
            avatar: avatarURL,
        };

    console.log(successMessage)
    
        try {
            const response = await dispatch(registerDesigner(designerData));
            setFormData({
                name: '',
                surname: '',
                nickname: '',
                description: '',
                tags: [],
                website: '',
                instagram: '',
                email: '',
                password: '',
                address: '',
                vatOrCf: '',
            });
            coverInputRef.current.value = null;
            if (registerDesigner.fulfilled.match(response)) {
                setTimeout(() => {
                    navigate('/login');
                  }, 2000);
            }

        } catch (error) {
            console.error('Designer registration failed:', error);

        }
    };
    

    return (
        <>
                <Form style={{ width: '30rem'}} encType='multipart/form-data' className='form' onSubmit={handleSubmit}>
                <h1 className='title me-auto mb-4'>Sign up to Hubby with a Designer Account!</h1>
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
                                <Form.Label>Nickname</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Your Nickname" 
                                name="nickname"
                                value={formData.nickname} 
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
                                <Form.Label>Tags, separated by comma</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Tags about you" 
                                name="tags" 
                                value={formData.tags}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput6">
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
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput7">
                                <Form.Label>Instagram</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Your Ig url" 
                                name="instagram" 
                                value={formData.instagram}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput8">
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
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput9">
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
                            <Form.Group className="mb-3" controlId="createPostForm.ControlInput10">
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
                            <Form.Group className="mb-3" controlId="createPostForm.ControlInput11">
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
                            <Form.Group className="mb-3" controlId="createPostForm.ControlInput12">
                                <Form.Label>Avatar </Form.Label>
                                <Form.Control 
                                className='input'
                                type="file" 
                                placeholder="Upload an image" 
                                name="avatar"
                                ref={coverInputRef}
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
                           Create Your Designer Account
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

export default SignUpDesignerForm;