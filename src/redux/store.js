import {configureStore} from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';
import designersReducer from './designersSlice';
import loginReducer from './usersSlice';
import clientsReducer from './clientsSlice';
import dealsReducer from './dealsSlice';
import jobOffersReducer from './jobOffersSlice';
import invoicesReducer from './invoicesSlice';

export const store = configureStore({
    reducer: {
      projects: projectsReducer,
      designers: designersReducer,
      users: loginReducer,
      clients: clientsReducer,
      deals: dealsReducer,
      joboffers: jobOffersReducer,
      invoices: invoicesReducer
    },
  });