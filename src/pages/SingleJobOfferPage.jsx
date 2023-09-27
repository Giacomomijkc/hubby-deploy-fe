import React, {useEffect} from 'react';
import NavigationBar from '../components/NavigationBar';
import JobOfferDetails from '../components/JobOfferDetails';
import Footer from '../components/Footer';
import {fetchSingleJobOffer} from '../redux/jobOffersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const SingleJobOfferPage = () => {

    const dispatch = useDispatch();
    const {jobOfferId} = useParams();
    const jobOffer = useSelector((state) => state.joboffers.singleJobOffer);

    useEffect(() => {
        dispatch(fetchSingleJobOffer(jobOfferId));
      }, [dispatch, jobOfferId]);

  return (
    <>
    <NavigationBar/>
    <JobOfferDetails jobOffer={jobOffer}/>
    <Footer/>
    </>
  )
}

export default SingleJobOfferPage