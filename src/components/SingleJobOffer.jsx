import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';  
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients } from '../redux/clientsSlice';
import Button from "react-bootstrap/Button";
import './SingleJobOffer.css';

const SingleJobOffer = ({jobOffer, showDealButton}) => {
    const dispatch = useDispatch();
    const clients = useSelector((state) => state.clients.clients)

    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch,]);
  return (
    <div className='d-flex flex-column my-5 mx-2 single-job-offer' style={{ width: '350px' }} key={jobOffer?._id} >
            <div className='d-flex justify-content-center align-items-center p-2'>
            {clients?.map((client) => {
            if (client?._id === jobOffer?.client) {
                return (
                <Link className='links' to={`/clients/${client?._id}`} key={client?._id}>
                    <div>
                    <img className='user-avatar' src={client.avatar} alt="client img" />
                    </div> 
                    <div>
                    <span className='user-nickname'>{client.company}</span>  
                    </div> 
                </Link>
                );
            }
            })}
                <span className='single-job-offer-title'>{jobOffer?.title.toUpperCase()}</span>
            </div>
          <div className='d-flex flex-column justify-content-between align-items-center'>
            <div className='mt-1'>
            <span className='tags'>                  
            {jobOffer?.tags?.map((tag, index) => (
                        <>
                        {index > 0 && <span className='tag-separator' > | </span>}
                        {tag}
                        </>
                    ))}
            </span>
            </div>
            <div className='mt-1 d-flex flex-column justify-content-between align-items-center'>
                <span className='offer-description info mx-2 p-2 text-center'>{jobOffer?.description}</span>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <div>
                    <span className='price'>{jobOffer?.budget.budget_value} {jobOffer?.budget.budget_unit}</span>
                </div>
                <div>
                    <span className='info'>Deadline: {jobOffer?.deadline}</span>
                </div>
                <div>
                    <span className='accepted-status'>Last edit on: {jobOffer?.updatedAt.slice(0, 10)}</span>
                </div>
            </div>
            {showDealButton && (
            <div className='mt-2 d-flex justify-content-center align-items-center'>
                <Link to={`/job-offers/${jobOffer?._id}`}>
                    <Button className='make-deal-button my-2'>Make Deal</Button>
                </Link>
            </div>)}
          </div>
        </div>
  )
}

export default SingleJobOffer