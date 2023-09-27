import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import SingUpDesignerPage from './pages/SingUpDesignerPage';
import SignUpClientPage from './pages/SignUpClientPage';
import SingUpOptionsPage from './pages/SignUpOptionsPage';
import LogInPage from './pages/LogInPage';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/ErrorPage';
import ProtectedRoutes from './middlewares/ProtectedRoutes';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import ProjectUploadPage from './pages/ProjectUploadPage';
import AllProjectsPage from './pages/AllProjectsPage';
import AllDesignersPage from './pages/AllDesignersPage';
import AllCompaniesPage from './pages/AllCompaniesPage';
import AllJobOffersPage from './pages/AllJobOffers';
import DesignerProfilePage from './pages/DesignerProfilePage';
import CreateJobOfferPage from './pages/CreateJobOfferPage';
import ClientProfilePage from './pages/ClientProfilePage';
import SingleJobOfferPage from './pages/SingleJobOfferPage';
import CreateDealPage from './pages/CreateDealPage';
import jwtDecode from 'jwt-decode';
import { setRole, setIsLogged, setToken, setClientId, setDesignerId } from '../src/redux/usersSlice';
import { useDispatch } from 'react-redux';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('userLoggedIn');
    if (token) {
      dispatch(setIsLogged(true));
      dispatch(setToken(token));

      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
      if (userRole === 'Client') {
        dispatch(setRole(userRole));
        dispatch(setClientId(decodedToken._id))
      } else if (userRole === 'Designer') {
        dispatch(setRole(userRole));
        dispatch(setDesignerId(decodedToken._id))
      }
    }
  }, [dispatch]);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage/>}/>
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/dashboard" element={<Dashboard />}/>
          <Route path="/create-project" element={<ProjectUploadPage />}/>
          <Route exact path="/projects/:projectId" element={<ProjectDetailsPage/>}/>
          <Route exact path="/all-projects" element={<AllProjectsPage/>}/>
          <Route exact path="/all-designers" element={<AllDesignersPage />}/>
          <Route exact path="all-companies" element={<AllCompaniesPage/>}/>
          <Route exact path="all-job-offers" element={<AllJobOffersPage/>}/>
          <Route exact path="designers/:designerId" element={<DesignerProfilePage/>}/>
          <Route exact path="create-job-offer" element={<CreateJobOfferPage />}/>
          <Route exact path="clients/:clientId" element={<ClientProfilePage/>}/>
          <Route exact path="job-offers/:jobOfferId" element={<SingleJobOfferPage/>}/>
          <Route exact path="create-deal" element={<CreateDealPage/>}/>
        </Route>
        <Route exact path="/signup-options" element={<SingUpOptionsPage/>}/>
        <Route exact path="/signup-designer" element={<SingUpDesignerPage/>}/>
        <Route exact path="/signup-client" element={<SignUpClientPage/>}/>
        <Route exact path="/login" element={<LogInPage/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
