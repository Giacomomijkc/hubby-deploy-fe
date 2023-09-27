import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrlFetchJobOffers = `${process.env.REACT_APP_SERVER_BASE_URL}/joboffers/`;


export const fetchClientJobOffers = createAsyncThunk('joboffers/fetchClientJobOffers', async (clientId, {rejectWithValue}) =>{
    try {
        const token = JSON.parse(localStorage.getItem("userLoggedIn"));
        const response = await axios.get(`${apiUrlFetchJobOffers}client/${clientId}`, {
            headers: { 'Authorization': `${token}` }
        });
        console.log(response)
        return response.data.jobOffers;

    } catch (error) {
      console.log(error)
      if (error.response && error.response.data && error.response.data.message){
          return rejectWithValue(error.response.data.message);
      } else {
          throw error;
      }
    }
  })

  export const fetchJobOffers = createAsyncThunk('joboffers/fetchJobOffers', async (_, {rejectWithValue}) =>{
    try {
        const response = await axios.get(`${apiUrlFetchJobOffers}`);
        console.log(response)
        return response.data.jobOffers;

    } catch (error) {
      console.log(error)
      if (error.response && error.response.data && error.response.data.message){
          return rejectWithValue(error.response.data.message);
      } else {
          throw error;
      }
    }
  })

  export const createJobOffer = createAsyncThunk('joboffers/createJobOffer', async (jobOfferData,{ rejectWithValue }) =>{
    try {
        const token = JSON.parse(localStorage.getItem("userLoggedIn"));
        const response = await axios.post(`${apiUrlFetchJobOffers}create`, jobOfferData, {
          headers: { 'Authorization': `${token}` }
        });
        console.log(response)
        return response.data;

    } catch (error) {
      console.log(error)
      if (error.response && error.response.data && error.response.data.message){
          return rejectWithValue(error.response.data.message);
      } else {
          throw error;
      }
    }
  })

  export const fetchSingleJobOffer = createAsyncThunk('joboffers/fetchSignleJobOffer', async (jobOfferId, {rejectWithValue}) =>{
    try {
        const response = await axios.get(`${apiUrlFetchJobOffers}${jobOfferId}`);
        console.log(response)
        return response.data.jobOffer;

    } catch (error) {
      console.log(error)
      if (error.response && error.response.data && error.response.data.message){
          return rejectWithValue(error.response.data.message);
      } else {
          throw error;
      }
    }
  })

  export const patchJobOffer = createAsyncThunk('joboffers/patchJobOffer', async ({jobOfferId, jobOfferData}) => {
    try {
      const token = JSON.parse(localStorage.getItem("userLoggedIn"));
      const response = await axios.patch(`${apiUrlFetchJobOffers}${jobOfferId}/update`, jobOfferData, {
        headers: { 'Authorization': `${token}` }
      });
      console.log(response)
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Errore durante l\'aggiornamento della Job Offer');
    }
  });

  export const deleteJobOffer = createAsyncThunk('joboffers/deleteJobOffer', async (jobOfferId) => {
    try {
      const token = JSON.parse(localStorage.getItem("userLoggedIn"));
      const response = await axios.delete(`${apiUrlFetchJobOffers}${jobOfferId}/delete`, {
        headers: { 'Authorization': `${token}` }
      });
      console.log(response)
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Errore durante l\'aggiornamento della Job Offer');
    }
  });


  const jobOffersSlice = createSlice({
    name: 'joboffers',
    initialState: {
      successMessage: null,
      jobOffers: [],
      isJobOffersLoading: true,
      allJobOffers: [],
      isAllJobOffersLoading: true,
      newJobOffer: null,
      isNewJobOfferLoading: true,
      singleJobOffer: null,
      singleJobOfferIsLoading: true,
      patchedJobOffer: null,
      isPatchedJobOfferLoading: true,
      successPatchMessage: null,
      deletedJobOffer: null,
      isDeletedJobOfferLoading: true,
      successDeleteMessage: null
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchClientJobOffers.pending, (state, action) => {
        state.isJobOffersLoading = true
      })
      .addCase(fetchClientJobOffers.fulfilled, (state, action) => {
        state.jobOffers = action.payload
        state.isJobOffersLoading = false
      })
      .addCase(fetchClientJobOffers.rejected, (state, action) => {
        state.error = action.payload
        state.isJobOffersLoading = false
      })
      .addCase(fetchJobOffers.pending, (state, action) => {
        state.isAllJobOffersLoading = true
      })
      .addCase(fetchJobOffers.fulfilled, (state, action) => {
        state.allJobOffers = action.payload
        state.isAllJobOffersLoading = false
      })
      .addCase(fetchJobOffers.rejected, (state, action) => {
        state.error = action.payload
        state.isAllJobOffersLoading = false
      })
      .addCase(createJobOffer.fulfilled, (state, action) => {
        state.newJobOffer = action.payload
        state.successMessage = action.payload.message
        state.isNewJobOfferLoading = false
      })
      .addCase(createJobOffer.pending, (state, action) => {
        state.isNewJobOfferLoading = true
      })
      .addCase(createJobOffer.rejected, (state, action) => {
        state.error = action.payload.message
        state.isNewJobOfferLoading = false
      })
      .addCase(fetchSingleJobOffer.fulfilled, (state, action) => {
        state.singleJobOffer = action.payload
        state.successMessage = action.payload.message
        state.singleJobOfferIsLoading = false
      })
      .addCase(fetchSingleJobOffer.pending, (state, action) => {
        state.singleJobOfferIsLoading = true
      })
      .addCase(fetchSingleJobOffer.rejected, (state, action) => {
        state.error = action.payload.message
        state.singleJobOfferIsLoading = false
      })
      .addCase(patchJobOffer.fulfilled, (state, action) => {
        state.patchedJobOffer = action.payload.result
        state.successPatchMessage = action.payload.message
        state.isPatchedJobOfferLoading = false
      })
      .addCase(patchJobOffer.pending, (state, action) => {
        state.isPatchedJobOfferLoading = true
      })
      .addCase(patchJobOffer.rejected, (state, action) => {
        state.error = action.payload.message
        state.isPatchedJobOfferLoading = false
      })
      .addCase(deleteJobOffer.fulfilled, (state, action) => {
        state.deletedJobOffer = action.payload
        state.successDeleteMessage = action.payload.message
        state.isDeletedJobOfferLoading = false
      })
      .addCase(deleteJobOffer.pending, (state, action) => {
        state.isDeletedJobOfferLoading = true
      })
      .addCase(deleteJobOffer.rejected, (state, action) => {
        state.error = action.payload.message
        state.isDeletedJobOfferLoading = false
      })
    },
  });
  
  export default jobOffersSlice.reducer;
  