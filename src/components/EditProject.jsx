import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {updateCover, updateImages, patchProject, fetchSingleProject, deleteProject} from '../redux/projectsSlice';
import './EditProject.css';

const EditProject = ({setShowProjectModal, show, onSuccessCallback, projectId}) => {
    const dispatch = useDispatch();

    const singleProject = useSelector((state) => state.projects.singleProject)
    

    useEffect(() => {
        const fetchData = async () => {
          try {
            await dispatch(fetchSingleProject(projectId));
            console.log(singleProject)
          } catch (error) {
            console.error('Failed to fetch single project:', error);
          }
        };
      
        fetchData();
      }, [projectId, dispatch]);


      useEffect(() => {
        setFormData({
          title: singleProject?.title || '',
          description: singleProject?.description || '',
          tags: singleProject?.tags || [],
        });
      }, [singleProject]);

    const handleCloseModal = () => {
        setShowProjectModal(false)
        setShowSuccessMessage(false)
    }

    const handleDeleteProject = async() => {
        try {
            const response = await dispatch(deleteProject(projectId))
            if (deleteProject.fulfilled.match(response)) {
                onSuccessCallback();
                setShowSuccessMessage(true)
            }
        } catch (error) {
            console.error('Job Offer creation failed:', error);
        }
        
    }

    const modalStyle = {
        display: show ? 'block' : 'none',
      };

      const [formData, setFormData] = useState({
        title: singleProject?.title || '',
        description: singleProject?.description || '',
        tags: singleProject?.tags || [],
    });

    const patchedCover = useSelector((state) => state.projects.patchedCover);
    const patchedImages = useSelector((state) => state.projects.patchedImages);
    const isPatchedCoverLoading = useSelector((state) => state.projects.isPatchedCoverLoading);
    const isPatchedImagesLoading = useSelector((state) => state.projects.isPatchedImagesLoading);
    const error = useSelector((state) => state.projects.error);
    const successPatchMessage = useSelector((state) => state.projects.successPatchMessage);
    const successDeleteMessage = useSelector((state) => state.projects.successDeleteMessage);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isFileInputEmpty, setFileInputEmpty] = useState(true);

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
        setFileInputEmpty(!file);

        if(file){
            const uploadData = new FormData();
            uploadData.append('cover', file);

            try {
                await dispatch(updateCover({ projectId: projectId, coverFormData: uploadData }));
            } catch (error) {
                console.error('File upload failed:', error);
            }
        }   
    };

    const handleImagesUpload = async (e) => {
        const files = e.target.files;
        setFileInputEmpty(files.length === 0);
      
        if (files.length > 0) {
          const uploadData = new FormData();
      
          for (let i = 0; i < files.length; i++) {
            uploadData.append('images', files[i]);
          }
      
          try {
            await dispatch(updateImages({projectId: projectId, imagesFormData: uploadData}));
          } catch (error) {
            console.error('Images upload failed:', error);
          }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
    const projectData = {
            ...formData,
            cover: patchedCover || singleProject?.cover,
            images: patchedImages || singleProject?.images,
        };

    
        try {
            const response = await dispatch(patchProject({projectId, projectData}));
            if (patchProject.fulfilled.match(response)) {
                onSuccessCallback();
                setShowSuccessMessage(true)
            }

        } catch (error) {
            console.error('Project creation failed:', error);

        }
    };

  return (
    <>
    <div>
      <div className={`overlay ${show ? 'active' : ''}`} style={modalStyle} onClick={handleCloseModal}></div>
      <div className={`container-edit-project ${show ? 'active' : ''}`} style={modalStyle}>
        <Modal.Body>
        <Form style={{ width: '30rem'}} encType='multipart/form-data' className='form' onSubmit={handleSubmit} >
                    <div className='row'>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput1">
                                <Form.Label>Title</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
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
                                name="cover"
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
                                name="images"
                                onChange={handleImagesUpload}
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='d-flex flex-column'>
                    {
                        (isPatchedCoverLoading && !isFileInputEmpty) || (isPatchedImagesLoading && !isFileInputEmpty)
                            ? <div className="custom-loader"></div>
                            : (
                                <Button 
                                className='form-button my-2' 
                                type="submit" 
                                variant="success"
                                >
                                Save Changes
                                </Button>  
                            )
                    }
                        <Button className='close-button my-3' onClick={handleDeleteProject} >
                            Delete
                        </Button>
                        <Button className='close-button my-3' onClick={handleCloseModal}>
                            Close
                        </Button>
                        {error && (
                            <div className="alert alert-danger me-auto " role="alert">
                                {error}
                            </div>
                        )}
                        {showSuccessMessage && successPatchMessage && (
                             <div className="alert alert-success me-auto">{successPatchMessage}</div>
                        )}
                        {showSuccessMessage && successDeleteMessage && (
                             <div className="alert alert-success me-auto">{successDeleteMessage}</div>
                        )}
                    </div>
                </Form>
        </Modal.Body>
      </div>
    </div>
    </>
  )
}

export default EditProject