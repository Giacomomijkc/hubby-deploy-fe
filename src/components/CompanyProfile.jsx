import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGlobe, faUser  } from '@fortawesome/free-solid-svg-icons';
import SingleJobOffer from '../components/SingleJobOffer';

const CompanyProfile = ({client, jobOffers}) => {
  return (
    <>
    <div className='d-flex justify-content-evenly align-items-center border-box border-box-container' >
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <img src={client?.avatar} alt='designer avatar' className='user-avatar' />
            <span>{client?.company}</span>
        </div>
        <div className='d-flex flex-column justify-content-center align-items-center mt-3 mb-3 title-tags-container'>
        <div>
            <span className='me-2 project-title'>{client?.description}</span>
        </div>
    </div>
        <div className='d-flex flex-column justify-content-center align-items-center'>
            {client?.email && (
            <a href={`mailto:${client.email}`} className='links'>
                <span><FontAwesomeIcon icon={faEnvelope} className='mx-2 icons' /> {client?.email}</span>
            </a>
            )}
            {client?.website && (
            <a href={client.website} target="_blank" rel="noopener noreferrer" className='links'>
                <span><FontAwesomeIcon icon={faGlobe} className='mx-2 icons' /> {client?.website}</span>
            </a>
            )}
            {client?.name && client?.surname &&
                <span><FontAwesomeIcon icon={faUser} className='mx-2 icons' /> {client?.name} {client?.surname}</span>
            }
        </div>
    </div>
    <div className='d-flex flex-wrap justify-content-center align-items-center mt-3 mb-5'>
        {jobOffers && jobOffers.length > 0 ? (
            jobOffers.map((jobOffer) => (
                <SingleJobOffer jobOffer={jobOffer} key={jobOffer._id} showDealButton={true} />
            ))
            ) : (
            <p>No Job Offers found for this company</p>
            )}
    </div>
    </>
  )
}

export default CompanyProfile