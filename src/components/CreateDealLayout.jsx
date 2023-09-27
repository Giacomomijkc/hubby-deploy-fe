import React from 'react'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import ProjectUploadCover from '../assets/project-upload-cover.jpg';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {createDeal} from '../redux/dealsSlice';
import './SignUpDesignerLayout.css';

const CreateDealLayout = () => {
  const error = useSelector((state) => state.deals.error);
  const successMessage = useSelector((state) => state.deals.successMessage);


  const [formData, setFormData] = useState({
      client:'',
      rework_limit:'',
      description: '',
      tags: [],
      amount:{
          amount_value: '',
          amount_unit: ''
      },
      timing:{
          timing_value: '',
          timing_unit: ''
      }
  });

  console.log(formData)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name === 'tags') {
          setFormData({
              ...formData,
              [name]: value.split(',').map(tag => tag.trim()),
          });
      } else if (name === 'amount_value' || name === 'amount_unit') {
          setFormData({
              ...formData,
              amount: {
                  ...formData.amount,
                  [name]: value,
              }
          });
      } else if (name === 'timing_value' || name === 'timing_unit') {
          setFormData({
              ...formData,
              timing: {
                  ...formData.timing,
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
  
  const dealData = {
          ...formData,
      };


  console.log(successMessage)
  
      try {
          const response = await dispatch(createDeal(dealData));
          setFormData({
              client: '',
              rework_limit:'',
              description: '',
              tags: [],
              amount:{
                  amount_value: '',
                  amount_unit: ''
              },
              timing:{
                  timing_value: '',
                  timing_unit: ''
              }
          });
          if (createDeal.fulfilled.match(response)) {
              setTimeout(() => {
                  navigate(`/dashboard`);
                }, 2000);
          }

      } catch (error) {
          console.error('Job Offer creation failed:', error);

      }
  };
  return (
  <Row className="full-height">
    <Col md={4} className='col-md-4 p-0'>
        <img src={ProjectUploadCover} alt="Project Upload Cover" className='signup-cover full-height'/>
    </Col>
    <Col md={8} className='signup-form-container col-md-8 p-0 d-flex justify-content-center align-items-center'>
    <Form style={{ width: '30rem'}} className='form' onSubmit={handleSubmit}>
                    <div className='row'>
                    <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput1">
                                <Form.Label>Client</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Client Id" 
                                name="client" 
                                value={formData.client}
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
                                placeholder="Tags about Deal" 
                                name="tags" 
                                value={formData.tags}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput3">
                                <Form.Label>Amount value</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Deal Amount Value" 
                                name="amount_value" 
                                value={formData.amount.amount_value}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput4">
                                <Form.Label>Amount unit</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Deal Amount Unit" 
                                name="amount_unit" 
                                value={formData.amount.amount_unit}
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
                                placeholder="Deal description" 
                                name="description" 
                                value={formData.description}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput6">
                                <Form.Label>Rework Limit</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Job Offer deadline" 
                                name="rework_limit" 
                                value={formData.rework_limit}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput7">
                                <Form.Label>Timing value</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Deal Timing Value" 
                                name="timing_value" 
                                value={formData.timing.timing_value}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput8">
                                <Form.Label>Timing unit</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Deal Timing Unit" 
                                name="timing_unit" 
                                value={formData.timing.timing_unit}
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
                            Create Your Deal
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
    </Col>
  </Row>
  )
}

export default CreateDealLayout