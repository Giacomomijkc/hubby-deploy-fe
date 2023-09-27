import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import LogInPage from "../pages/LogInPage";
import { Outlet, useNavigate } from 'react-router-dom';

const auth = () => {
    return JSON.parse(localStorage.getItem('userLoggedIn'));
};

const useSession = () => {
    const session = auth();
    const decodedSession = session ? jwtDecode(session) : null;

    const navigate = useNavigate();
    
    useEffect(() => {

        if(!session){
            navigate('/', {replace: true});
        }
    }, [navigate, session]);

    return decodedSession;
};

const ProtectedRoutes = () => {
    const isAuthorized = auth();
    const session = useSession();

    return isAuthorized ? <Outlet /> : <LogInPage />;
}

export default ProtectedRoutes;