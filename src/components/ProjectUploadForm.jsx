import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { uploadCover, uploadImages, createProject } from '../redux/projectsSlice';
import './ProjectUploadForm.css';

const ProjectUploadForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: [],
    });

    const coverURL = useSelector((state) => state.projects.coverURL);
    const imagesURL = useSelector((state) => state.projects.imagesURL);
    const error = useSelector((state) => state.projects.error);
    const successMessage = useSelector((state) => state.projects.successMessage);
    const coverInputRef = useRef(null);
    const imagesInputRef = useRef(null);
    const isUploadingCover = useSelector((state) => state.projects.isUploadingCover);
    const isUploadingImages = useSelector((state) => state.projects.isUploadingImages);
    const designerLogged = useSelector((state)=> state.users.designer);
    

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

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const uploadData = new FormData();
        uploadData.append('cover', file);
    
        try {
            await dispatch(uploadCover(uploadData));
        } catch (error) {
            console.error('File upload failed:', error);
        }
    };

    const handleImagesUpload = async (e) => {
        const files = e.target.files;
        const uploadData = new FormData();

        for (let i = 0; i < files.length; i++) {
            uploadData.append('images', files[i]);
        }

        try {
            await dispatch(uploadImages(uploadData));
        } catch (error) {
            console.error('Images upload failed:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
    const projectData = {
            ...formData,
            cover: coverURL,
            images: imagesURL,
            author: designerLogged?.designer?._id
        };

    
        try {
            const response = await dispatch(createProject(projectData));
            setFormData({
                title: '',
                description: '',
                tags: [],
            });
            coverInputRef.current.value = null;
            imagesInputRef.current.value = null;
            if (createProject.fulfilled.match(response)) {
                setTimeout(() => {
                    navigate(`/dashboard`);
                  }, 2000);
            }

        } catch (error) {
            console.error('Project creation failed:', error);

        }
    };

  return (
    <Form style={{ width: '30rem'}} encType='multipart/form-data' className='form' onSubmit={handleSubmit} >
                    <div className='row'>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput1">
                                <Form.Label>Title</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Project Title" 
                                name="title"  
                                value={formData.title}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput2">
                                <Form.Label>Description</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Project Description" 
                                name="description" 
                                value={formData.description}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput3">
                                <Form.Label>Tags</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Tags about the Project" 
                                name="tags" 
                                value={formData.tags}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createPostForm.ControlInput4">
                                <Form.Label>Cover </Form.Label>
                                <Form.Control 
                                className='input'
                                type="file" 
                                placeholder="Upload a cover" 
                                name="cover"
                                ref={coverInputRef}
                                onChange={handleFileUpload} 
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createPostForm.ControlInput5">
                                <Form.Label>Images </Form.Label>
                                <Form.Control 
                                className='input'
                                type="file" 
                                multiple
                                placeholder="Upload at least 3 images" 
                                name="images"
                                ref={imagesInputRef}
                                onChange={handleImagesUpload}
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='d-flex flex-column'>
                        {isUploadingCover || isUploadingImages ?
                        <div className="custom-loader"></div>
                       :  <Button 
                       className='form-button my-2' 
                       type="submit" 
                       variant="success">
                           Create Your Project
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
  )
}

export default ProjectUploadForm