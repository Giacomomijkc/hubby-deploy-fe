import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobOffers } from '../redux/jobOffersSlice';
import SingleJobOffer from './SingleJobOffer';

const AllJobOffers = () => {

    const dispatch = useDispatch();
    const allJobOffers = useSelector((state) => state.joboffers.allJobOffers);

    useEffect(() => {;
        dispatch(fetchJobOffers())
    }, [dispatch]);
  return (
    <div className='d-flex flex-wrap justify-content-center align-items-center mb-5'>
    {allJobOffers &&
    allJobOffers?.map((jobOffer) => {
        return (
            <SingleJobOffer jobOffer={jobOffer} key={jobOffer._id} showDealButton={true} />
        );
        })
    }
    </div>
  )
}

export default AllJobOffers