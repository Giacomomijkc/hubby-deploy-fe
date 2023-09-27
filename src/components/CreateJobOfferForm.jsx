import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {createJobOffer}  from '../redux/jobOffersSlice';
import './CreateJobOfferForm.css';

const CreateJobOfferForm = () => {

    const [formData, setFormData] = useState({
        title: '',
        deadline: '',
        description: '',
        tags: [],
        budget:{
            budget_value: '',
            budget_unit: ''
        }
    });

    console.log(formData)

    const error = useSelector((state) => state.joboffers.error);
    const successMessage = useSelector((state) => state.joboffers.successMessage);

    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    console.log(successMessage)
    
        try {
            const response = await dispatch(createJobOffer(jobOfferData));
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
            if (createJobOffer.fulfilled.match(response)) {
                setTimeout(() => {
                    navigate(`/dashboard`);
                  }, 2000);
            }

        } catch (error) {
            console.error('Job Offer creation failed:', error);

        }
    };
    

  return (
    <Form style={{ width: '30rem'}} className='form' onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput1">
                                <Form.Label>Title</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Job Offer Title" 
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
                                placeholder="Tags about Job Offer" 
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
                                placeholder="Job Offer budget Value" 
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
                                placeholder="Job Offer budget Unit" 
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
                                placeholder="Job Offer description" 
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
                                placeholder="Job Offer deadline" 
                                name="deadline" 
                                value={formData.deadline}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='d-flex flex-column'>
                    {Object.values(formData).some((value) => value === '') ? (
                        <div className="custom-loader"></div>
                        ) : (
                        <Button
                            className='form-button my-2'
                            type="submit"
                            variant="success"
                        >
                            Create Job Offer
                        </Button>
                    )}                 
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

export default CreateJobOfferForm