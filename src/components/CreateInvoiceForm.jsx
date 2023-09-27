import React, { useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { getDesignerInvoices } from '../redux/invoicesSlice';
import { createInvoice } from '../redux/invoicesSlice'

const CreateInvoiceForm = ({ show, onClose, dealId }) => {

    const modalStyle = {
        display: show ? 'block' : 'none',
      };

    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const successCreationInvoiceMessage = useSelector((state) => state.invoices.successCreationInvoiceMessage)
    const errorCreationInvoiceMessage = useSelector((state) => state.invoices.errorCreationInvoiceMessage)
    const isNewInvoiceLoading = useSelector((state) => state.invoices.isNewInvoiceLoading)
    const designerId = useSelector((state) => state.users.designerId)

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        description: '',
        invoiceNumber: '',
        fiscalNotes: '',
        VAT: '',
        totalAmount: ''
    });

    const handleCloseModal = () => {
        onClose()
        setShowSuccessMessage(false)
        setShowErrorMessage(false)
    }


      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataWithDealId = {
                ...formData,
                dealId: dealId,
              };
            const response = await dispatch(createInvoice(formDataWithDealId ));
            setFormData({
                description: '',
                invoiceNumber: '',
                fiscalNotes: '',
                VAT: '',
                totalAmount: ''
            });
            if (createInvoice.fulfilled.match(response)) {
                setShowSuccessMessage(true)
                await dispatch(getDesignerInvoices(designerId));
            }
        } catch (error) {
            setShowErrorMessage(true)
          console.error('Creazione invoice fallita:', error);
        }
      };
  return (
    <>
    <div>
      <div className={`overlay ${show ? 'active' : ''}`} style={modalStyle} onClick={handleCloseModal}></div>
      <div className={`container-job-offer ${show ? 'active' : ''}`} style={modalStyle}>
        <Modal.Body>
        <Form style={{ width: '30rem'}} className='form' onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput1">
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
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput2">
                                <Form.Label>Invoice Number</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                name="invoiceNumber" 
                                value={formData.invoiceNumber}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput3">
                                <Form.Label>Fiscale Notes</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                name="fiscalNotes" 
                                value={formData.fiscalNotes}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput4">
                                <Form.Label>VAT</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                name="VAT" 
                                value={formData.VAT}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput5">
                                <Form.Label>totalAmount</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                name="totalAmount" 
                                value={formData.totalAmount}
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
                                Create Invoice
                        </Button>  
                        <Button className='close-button my-3' onClick={handleCloseModal}>
                            Close
                        </Button>
                        {showErrorMessage && errorCreationInvoiceMessage && !isNewInvoiceLoading && (
                            <div className="alert alert-danger me-auto " role="alert">
                                {errorCreationInvoiceMessage}
                            </div>
                        )}
                        {showSuccessMessage && successCreationInvoiceMessage && isNewInvoiceLoading && (
                             <div className="alert alert-success me-auto">{successCreationInvoiceMessage}</div>
                        )}
                    </div>
                </Form>
        </Modal.Body>
      </div>
    </div>
    </>
  )
}

export default CreateInvoiceForm