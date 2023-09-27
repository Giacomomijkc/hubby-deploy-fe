import React, {useEffect} from 'react';
import NavigationBar from '../components/NavigationBar';
import CompanyProfile from '../components/CompanyProfile';
import Footer from '../components/Footer';
import {fetchClientById} from '../redux/clientsSlice';
import { fetchClientJobOffers } from '../redux/jobOffersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const ClientProfilePage = () => {

    const dispatch = useDispatch();
    const {clientId} = useParams();
    const client = useSelector((state) => state.clients.client);
    const jobOffers = useSelector((state) => state.joboffers.jobOffers);

    useEffect(() => {
        dispatch(fetchClientById(clientId));
        dispatch(fetchClientJobOffers(clientId));
      }, [dispatch, clientId]);



  return (
    <>
    <NavigationBar/>
    <CompanyProfile client={client} jobOffers={jobOffers}/>
    <Footer/>
    </>
  )
}

export default ClientProfilePage