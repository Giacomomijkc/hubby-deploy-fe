import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import SingleProjectDesignerDashboard from '../components/SingleProjectDesignerDashboard';
import SingleDealDesignerDashboard from '../components/SingleDealDesignerDashboard';
import SingleDealClientDashboard from '../components/SingleDealClientDashboard';
import SingleLikedProjectDesignerDashboard from '../components/SingleLikedProjectDesignerDashboard';
import SingleLikedProjectClientDashboard from '../components/SingleLikedProjectClientDashboard';
import SingleJobOfferClientDashboard from '../components/SingleJobOfferClientDashboard';
import EditDesignerData from '../components/EditDesignerData';
import EditClientData from '../components/EditClientData';
import { useSelector, useDispatch } from 'react-redux';
import { getDesignerDetails, getClientDetails } from '../redux/usersSlice';
import { fetchDesigners } from '../redux/designersSlice';
import {  fetchProjectsLikedByDesigner } from '../redux/designersSlice';
import {  fetchProjectsLikedByClient } from '../redux/clientsSlice';
import { fetchDesignerProjects } from '../redux/projectsSlice';
import { fetchClientJobOffers } from '../redux/jobOffersSlice';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();

  const designer = useSelector((state)=> state.users.designer);
  const designerProjects = useSelector((state)=> state.projects.designerProjects);
  const designerDeals = useSelector((state)=> state.deals.designerDeals);
  const client = useSelector((state)=> state.users.client);
  const clientDeals = useSelector((state)=> state.deals.clientDeals);
  const clientJobOffers = useSelector((state)=> state.joboffers.jobOffers);
  const role = useSelector((state)=> state.users.role);
  const designerId = useSelector((state)=> state.users.designerId);
  const clientId = useSelector((state)=> state.users.clientId);
  const designers = useSelector((state) => state.designers.designers);
  const likedProjects = useSelector((state) => state.designers.likedProjects)
  const likedProjectsByClient = useSelector((state) => state.clients.likedProjects)
  const token = localStorage.getItem('userLoggedIn');

  const [showProjectsPosted, setShowProjectsPosted] = useState (false);
  const [showJobOffers, setShowJobOffers] = useState (false);
  const [showProjectsLiked, setShowProjectsLiked] = useState (false);
  const [showProjectsClientLiked, setShowProjectsClientLiked] = useState (false);
  const [showButtons, setShowButtons] = useState(true)
  const [showDesignerModal, setShowDesignerModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);

  const handleShowDesignerModal = () => {
    setShowDesignerModal(true);
  }

  const handleShowClientModal = () => {
    setShowClientModal(true);
  }

  const handleShowProjectsPosted = () => {
    setShowProjectsPosted(true)
    setShowButtons(false)
  }

  const handleShowProjectsLiked = () => {
    setShowProjectsLiked(true)
    setShowButtons(false)
  }

  const handleCloseProjectsPosted = () => {
    setShowProjectsPosted(false)
    setShowButtons(true)
  }

  const handleCloseProjectsLiked = () => {
    setShowProjectsLiked(false)
    setShowButtons(true)
  }

  const handleShowJobOffers = () => {
    setShowJobOffers(true)
    setShowButtons(false)
  }

  const handleCloseJobOffers = () => {
    setShowJobOffers(false)
    setShowButtons(true)
  }

  const handleShowProjectsClientLiked = () => {
    setShowProjectsClientLiked(true)
    setShowButtons(false)
  }
 
  const handleCloseProjectsClientLiked = () => {
    setShowProjectsClientLiked(false)
    setShowButtons(true)
  }

const handleDesignerUpdateSuccess = () => {
  dispatch(getDesignerDetails(designerId))
    .then(() => {
      // valutare azioni da fare
    })
    .catch((error) => {
      console.error('Failed to fetch updated designer data:', error);
    });
};

  const handleClientUpdateSuccess = () => {
    dispatch(getClientDetails(clientId))
      .then(() => {
        // valutare azioni da fare
      })
      .catch((error) => {
        console.error('Failed to fetch updated designer data:', error);
      });
  };

  useEffect(() => {
    dispatch(fetchDesigners());
    if (token) {
        if (role === 'Designer') {
            dispatch(getDesignerDetails(designerId));
            dispatch(fetchDesignerProjects(designerId));
            dispatch(fetchProjectsLikedByDesigner(designerId));
        } else if (role === 'Client') {
            dispatch(getClientDetails(clientId));
            dispatch(fetchClientJobOffers(clientId));
            dispatch(fetchProjectsLikedByClient(clientId));
        }
    }
}, [dispatch, token, designerId, clientId, role]);


  return (
    <>
    <NavigationBar/>
    <div className='container-dashboard mt-5'>
      {designer && role === 'Designer' && (
        <>
          <div className='d-flex justify-content-evenly align-items-center border-box-container border-box'>
            <div className='d-flex flex-column justify-content-center algin-items-center'>
              <span className='welcome'>Welcome</span>
              <span className='nickname'>{designer.designer.nickname}</span>
            </div>
            <div className='d-flex flex-column justify-content-center algin-items-center'>
              <Button className='edit-datas-button mb-2' onClick={handleShowDesignerModal}>Edit personal info</Button>
              <Link className='links' to="/create-deal">
                <Button className='make-deal-button mt-2'>Make a Deal</Button>
              </Link>
            </div>
            <div>
              {showDesignerModal &&
              <EditDesignerData
              setShowDesignerModal={setShowDesignerModal}
              show={showDesignerModal}
              onSuccessCallback={handleDesignerUpdateSuccess}
            />}
            </div>
          </div>
          <div className='d-flex justify-content-center algin-items-center mt-5' >
            <h2 className=''>You Made <span  className='nickname'>{designerDeals?.length}</span> Deals</h2>
          </div>
          <div className='d-flex flex-wrap justify-content-center algin-items-center'>
            <SingleDealDesignerDashboard designerId={designerId} />
          </div>
          {showButtons &&
            <div className='d-flex justify-content-center algin-items-center buttons-show-container'>
              <div className='d-flex justify-content-center algin-items-center container-button'>
                <Button className='show-close-button mx-2 mb-5' onClick={handleShowProjectsPosted}>Your Projects</Button>
                <Button className='show-close-button mx-2 mb-5'onClick={handleShowProjectsLiked}>Projects Liked</Button>
              </div>
            </div>
          }
          {showProjectsPosted &&
          <>
            <div className='d-flex justify-content-center algin-items-center mt-5' >
              <h2 className=''>You Posted <span  className='nickname'>{designerProjects?.length}</span> project</h2>
            </div>
            <div className='d-flex flex-wrap justify-content-center algin-items-center mb-5'>
              <SingleProjectDesignerDashboard designerId={designerId} />
            </div>
            <div className='d-flex justify-content-center algin-items-center button-close-container'>
              <Button className='show-close-button' onClick={handleCloseProjectsPosted}>Close</Button>
            </div>
          </>
          }
          { showProjectsLiked &&
            <>
             <div className='d-flex justify-content-center algin-items-center mt-5' >
             <h2 className=''>You Liked <span  className='nickname'>{likedProjects?.length}</span> Projects</h2>
           </div>
           <div className='d-flex flex-wrap justify-content-center algin-items-center mb-5'>
             {likedProjects && likedProjects.map((project) => (
               <SingleLikedProjectDesignerDashboard projectId={project.project_id} designers={designers} />
             ))}
           </div>
           <div className='d-flex justify-content-center algin-items-center button-close-container'>
              <Button className='show-close-button' onClick={handleCloseProjectsLiked}>Close</Button>
            </div>
             </>
          }
        </>
      )}

      {client && role === 'Client' && (
        <>
          <div className='d-flex justify-content-evenly align-items-center border-box-container border-box'>
            <div className='d-flex flex-column justify-content-center algin-items-center'>
              <span className='welcome'>Welcome</span>
              <span className='nickname'>{client.client.name}</span>
            </div>
            <div className='d-flex flex-column justify-content-center algin-items-center'>
              <Button className='edit-datas-button mb-2' onClick={handleShowClientModal}>Edit personal info</Button>
              <Link className="links" to="/create-job-offer">
                <Button className='make-deal-button mt-2'>Make a Job offer</Button>
              </Link>
              <span className='tags my-2'>Your Id: {client?.client._id}</span>
            </div>
            <div>
              {showClientModal &&
              <EditClientData
              setShowClientModal={setShowClientModal}
              show={showClientModal}
              onSuccessCallback={handleClientUpdateSuccess}
            />}
            </div>
          </div>
          <div className='d-flex justify-content-center algin-items-center mt-5' >
            <h2 className=''>You Have <span  className='nickname'>{clientDeals?.length}</span> Deals</h2>
          </div>
          <div className='d-flex flex-wrap justify-content-center algin-items-center mb-5'>
            <SingleDealClientDashboard clientId={clientId} />
          </div>
          {showButtons &&
            <div className='d-flex justify-content-center algin-items-center buttons-show-container'>
              <div className='d-flex justify-content-center algin-items-center container-button'>
                <Button className='show-close-button mx-2 mb-5' onClick={handleShowJobOffers}>Your JobOffer</Button>
                <Button className='show-close-button mx-2 mb-5'onClick={handleShowProjectsClientLiked}>Projects Liked</Button>
              </div>
            </div>
          }
          {showJobOffers &&
          <>
            <div className='d-flex justify-content-center algin-items-center mt-5' >
              <h2 className=''>You Posted <span  className='nickname'>{clientJobOffers?.length}</span> Job Offer</h2>
            </div>
            <div className='d-flex flex-wrap justify-content-center algin-items-center mb-5'>
              <SingleJobOfferClientDashboard clientId={clientId} />
            </div>
            <div className='d-flex justify-content-center algin-items-center button-close-container'>
              <Button className='show-close-button' onClick={handleCloseJobOffers}>Close</Button>
            </div>
          </>
          }
          {showProjectsClientLiked &&
          <>
          <div className='d-flex justify-content-center algin-items-center mt-5' >
            <h2 className=''>You Liked <span  className='nickname'>{likedProjectsByClient?.length}</span> Projects</h2>
          </div>
          <div className='d-flex flex-wrap justify-content-center algin-items-center mb-5'>
            {likedProjectsByClient && likedProjectsByClient.map((project) => (
              <SingleLikedProjectClientDashboard projectId={project.project_id} designers={designers} />
            ))}
          </div>
          <div className='d-flex justify-content-center algin-items-center button-close-container'>
              <Button className='show-close-button' onClick={handleCloseProjectsClientLiked}>Close</Button>
          </div>
          </>
          }
        </>
      )}
    </div>
    <Footer/>
    </>
  )
}

export default Dashboard;