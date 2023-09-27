import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { patchAvatar, patchClient } from '../redux/clientsSlice';
import './EditClientData.css'

const EditClientData = ({setShowClientModal, show, onSuccessCallback}) => {

    const client = useSelector((state)=> state.users.client.client);

    const handleCloseModal = () => {
        setShowClientModal(false)
        setShowSuccessMessage(false)
    }

    const modalStyle = {
        display: show ? 'block' : 'none',
      };


    
    const [formData, setFormData] = useState({
        name: client.name || '',
        surname: client.surname || '',
        company: client.company || '',
        description: client.description || '',
        website: client.website || '',
        email: client.email || '',
        address: client.address || '',
        vatOrCf: client.vatOrCf || '',
    });

    const patchedAvatar = useSelector((state) => state.clients.patchedAvatar);
    const isPatchedAvatarLoading = useSelector((state) => state.clients.isPatchedAvatarLoading);
    const error = useSelector((state) => state.clients.error);
    const successPatchMessage = useSelector((state) => state.clients.successPatchMessage);
    const coverInputRef = useRef(client.avatar);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isFileInputEmpty, setFileInputEmpty] = useState(true);


    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value,
            });
    };

    console.log(formData)

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        setFileInputEmpty(!file);

        if(file){
            const uploadData = new FormData();
            uploadData.append('avatar', file);

            try {
                await dispatch(patchAvatar({ clientId: client._id, avatarFormData: uploadData }));
            } catch (error) {
                console.error('File upload failed:', error);
            }
        }   
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const clientData = {
            ...formData,
            avatar: patchedAvatar || client.avatar,
        };
    
        try {
            const response = await dispatch(patchClient({ clientId: client._id, clientData }));
            if (patchClient.fulfilled.match(response)) {
                onSuccessCallback();
                setShowSuccessMessage(true)
            }
    
        } catch (error) {
            console.error('Designer update failed:', error);
        }
    };
    
  return (
    <>
    <div>
      <div className={`overlay ${show ? 'active' : ''}`} style={modalStyle} onClick={handleCloseModal}></div>
      <div className={`container-client ${show ? 'active' : ''}`} style={modalStyle}>
        <Modal.Body>
        <Form style={{ width: '30rem'}} encType='multipart/form-data' className='form' onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
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
                                name="description" 
                                value={formData.description}
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
                                name="website" 
                                value={formData.website}
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
                                name="email"  
                                value={formData.email}
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
                                name="avatar"
                                ref={coverInputRef}
                                onChange={handleFileUpload} 
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='d-flex flex-column'>
                        {
                            isPatchedAvatarLoading && !isFileInputEmpty
                                ? <div className="custom-loader"></div>
                                : <Button 
                                className='form-button my-2' 
                                type="submit" 
                                variant="success">
                                    Save Changes
                                </Button>  
                        }
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
                    </div>
                </Form>
        </Modal.Body>
      </div>
    </div>
    </>
  )
}

export default EditClientData