import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { patchJobOffer, fetchSingleJobOffer, deleteJobOffer } from '../redux/jobOffersSlice';
import './EditJobOffer.css'

const EditJobOffer = ({setShowJobOfferModal, show, onSuccessCallback, jobOfferId}) => {

    const dispatch = useDispatch();
    const singleJobOffer = useSelector((state) => state.joboffers.singleJobOffer)


      useEffect(() => {
        const fetchData = async () => {
          try {
            await dispatch(fetchSingleJobOffer(jobOfferId));
          } catch (error) {
            console.error('Failed to fetch single Job Offer:', error);
          }
        };
      
        fetchData();
      }, [jobOfferId, dispatch]);

      useEffect(() => {
        setFormData({
            title: singleJobOffer?.title || '',
            tags: singleJobOffer?.tags || [],
            budget: {
                budget_value: singleJobOffer?.budget.budget_value || '',
                budget_unit: singleJobOffer?.budget.budget_unit || ''
            },
            description: singleJobOffer?.description || '',
            deadline: singleJobOffer?.deadline || '',
        });
      }, [singleJobOffer]);

    const handleCloseModal = () => {
        setShowJobOfferModal(false)
        setShowSuccessMessage(false)
    }

    const handleDeleteJobOffer = async() => {
        try {
            const response = await dispatch(deleteJobOffer(jobOfferId))
            if (deleteJobOffer.fulfilled.match(response)) {
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
        title: singleJobOffer?.title || '',
        tags: singleJobOffer?.tags || [],
        budget: {
            budget_value: singleJobOffer?.budget.budget_value || '',
            budget_unit: singleJobOffer?.budget.budget_unit || ''
        },
        description: singleJobOffer?.description || '',
        deadline: singleJobOffer?.deadline || '',
    });

    const patchedJobOffer = useSelector((state) => state.joboffers.patchedJobOffer);
    const isPatchedJobOfferLoading = useSelector((state) => state.joboffers.isPatchedJobOfferLoading);
    const error = useSelector((state) => state.joboffers.error);
    const successPatchMessage = useSelector((state) => state.joboffers.successPatchMessage);
    const successDeleteMessage = useSelector((state) => state.joboffers.successDeleteMessage);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'tags') {
            setFormData({
                ...formData,
                [name]: value.split(',').map(tag => tag.trim()),
            });
        } else if (name === 'budget_value' || name === 'budget_unit') {
            setFormData({
                ...formData,
                budget: {
                    ...formData.budget,
                    [name]: value,
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
    const jobOfferData = {
            ...formData,
        };

    
        try {
            const response = await dispatch(patchJobOffer({jobOfferId: jobOfferId, jobOfferData}));
            setFormData({
                title: '',
                deadline: '',
                description: '',
                tags: [],
                budget:{
                    budget_value: '',
                    budget_unit: ''
                }
            });
            if (patchJobOffer.fulfilled.match(response)) {
                onSuccessCallback();
                setShowSuccessMessage(true)
            }

        } catch (error) {
            console.error('Job Offer creation failed:', error);

        }
    };

  return (
    <>
    <div>
      <div className={`overlay ${show ? 'active' : ''}`} style={modalStyle} onClick={handleCloseModal}></div>
      <div className={`container-job-offer ${show ? 'active' : ''}`} style={modalStyle}>
        <Modal.Body>
        <Form style={{ width: '30rem'}} encType='multipart/form-data' className='form' onSubmit={handleSubmit}>
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
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput3">
                                <Form.Label>Budget value</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                name="budget_value" 
                                value={formData.budget.budget_value}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput4">
                                <Form.Label>Budget unit</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                name="budget_unit" 
                                value={formData.budget.budget_unit}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput5">
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
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput6">
                                <Form.Label>Deadline</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                name="deadline" 
                                value={formData.deadline}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='d-flex flex-column'>
                        <Button 
                            className='form-button my-2' 
                            type="submit" 
                            variant="success">
                                Save Changes
                        </Button>  
                        <Button className='close-button my-3' onClick={handleDeleteJobOffer}>
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

export default EditJobOffer