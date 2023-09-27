import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrlFetchDeals = `${process.env.REACT_APP_SERVER_BASE_URL}/deals/`;

export const fetchDesignerDeals = createAsyncThunk('deals/fetchDesignerDeals', async (designerId) =>{
    try {
      const response = await axios.get(`${apiUrlFetchDeals}designer/${designerId}`);
      console.log(response.data.deals)
      return response.data.deals;
    } catch (error) {
      console.error('Errors occuring while loading designer deals', error);
      throw new Error('Errors occuring while loading designer deals');
    }
  })

export const fetchClientDeals = createAsyncThunk('deals/fetchClientDeals', async (clientId) =>{
    try {
      const response = await axios.get(`${apiUrlFetchDeals}client/${clientId}`);
      console.log(response.data.deals)
      return response.data.deals;
    } catch (error) {
      console.error('Errors occuring while loading client deals', error);
      throw new Error('Errors occuring while loading client deals');
    }
})

export const createDeal = createAsyncThunk('deals/createDeal', async (dealData,{ rejectWithValue }) =>{
  try {
      const token = JSON.parse(localStorage.getItem("userLoggedIn"));
      const response = await axios.post(`${apiUrlFetchDeals}create`, dealData, {
        headers: { 'Authorization': `${token}` }
      });
      console.log(response)
      return response.data.savedDeal;

  } catch (error) {
    console.log(error)
    if (error.response && error.response.data && error.response.data.message){
        return rejectWithValue(error.response.data.message);
    } else {
        throw error;
    }
  }
})

export const acceptDeal = createAsyncThunk('deals/acceptDeal', async (dealId,{ rejectWithValue }) =>{
  try {
      const token = JSON.parse(localStorage.getItem("userLoggedIn"));
      const response = await axios.patch(`${apiUrlFetchDeals}${dealId}/accept`, null, {
        headers: { 'Authorization': `${token}` }
      });
      console.log(response)
      return response.data.deal;

  } catch (error) {
    console.log(error)
    if (error.response && error.response.data && error.response.data.message){
        return rejectWithValue(error.response.data.message);
    } else {
        throw error;
    }
  }
})

export const denyDeal = createAsyncThunk('deals/denyDeal', async (dealId,{ rejectWithValue }) =>{
  try {
      const token = JSON.parse(localStorage.getItem("userLoggedIn"));
      const response = await axios.patch(`${apiUrlFetchDeals}${dealId}/deny`, null, {
        headers: { 'Authorization': `${token}` }
      });
      console.log(response)
      return response.data.deal;

  } catch (error) {
    console.log(error)
    if (error.response && error.response.data && error.response.data.message){
        return rejectWithValue(error.response.data.message);
    } else {
        throw error;
    }
  }
})

export const startDeal = createAsyncThunk('deals/startDeal', async (dealId,{ rejectWithValue }) =>{
  try {
      const token = JSON.parse(localStorage.getItem("userLoggedIn"));
      const response = await axios.patch(`${apiUrlFetchDeals}${dealId}/start`, null, {
        headers: { 'Authorization': `${token}` }
      });
      console.log(response)
      return response.data.deal;

  } catch (error) {
    console.log(error)
    if (error.response && error.response.data && error.response.data.message){
        return rejectWithValue(error.response.data.message);
    } else {
        throw error;
    }
  }
})

export const endDeal = createAsyncThunk('deals/endDeal', async (dealId,{ rejectWithValue }) =>{
  try {
      const token = JSON.parse(localStorage.getItem("userLoggedIn"));
      const response = await axios.patch(`${apiUrlFetchDeals}${dealId}/end`, null, {
        headers: { 'Authorization': `${token}` }
      });
      console.log(response)
      return response.data.deal;

  } catch (error) {
    console.log(error)
    if (error.response && error.response.data && error.response.data.message){
        return rejectWithValue(error.response.data.message);
    } else {
        throw error;
    }
  }
})

export const deleteDeal = createAsyncThunk('deals/deleteDeal', async (dealId,{ rejectWithValue }) =>{
  try {
      const token = JSON.parse(localStorage.getItem("userLoggedIn"));
      const response = await axios.delete(`${apiUrlFetchDeals}${dealId}/delete`, {
        headers: { 'Authorization': `${token}` }
      });
      console.log(response)
      return response.data.dealDeleted;

  } catch (error) {
    console.log(error)
    if (error.response && error.response.data && error.response.data.message){
        return rejectWithValue(error.response.data.message);
    } else {
        throw error;
    }
  }
})

export const getSingleDeal = createAsyncThunk('deals/getSingleDeal', async (dealId,{ rejectWithValue }) =>{
  try {
      const token = JSON.parse(localStorage.getItem("userLoggedIn"));
      const response = await axios.get(`${apiUrlFetchDeals}${dealId}`, null, {
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

  const dealsSlice = createSlice({
    name: 'deals',
    initialState: {
      successMessage: null,
      designerDeals: [],
      isLoadingDesignerDeals: true,
      clientDeals: [],
      isLoadingClientDeals: true,
      newDeal: null,
      isNewDealLoading: true, 
      acceptDeal: null,
      isAcceptDealLoading: true,
      denyDeal: null,
      isDenyDealLoading: true,
      startDeal: null,
      isStartDealLoading: true,
      endDeal: null,
      isEndDealLoading: true,
      dealDeleted: null,
      isDealDeletedLoading: true,
      singleDeal: null,
      isSingleDealLoading: true,
    },
    reducers: {
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchDesignerDeals.fulfilled, (state, action) => {
        state.designerDeals = action.payload;
        state.isLoadingDesignerDeals = false;
        state.successMessage = action.payload.message
      })
      .addCase(fetchDesignerDeals.pending, (state, action) => {
        state.isLoadingDesignerDeals = true;
      })
      .addCase(fetchDesignerDeals.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoadingDesignerDeals = false;
      })
      .addCase(fetchClientDeals.fulfilled, (state, action) => {
        state.clientDeals = action.payload;
        state.isLoadingClientDeals = false;
        state.successMessage = action.payload.message
      })
      .addCase(fetchClientDeals.pending, (state, action) => {
        state.isLoadingClientDeals = true;
      })
      .addCase(fetchClientDeals.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoadingClientDeals = false;
      })
      .addCase(createDeal.fulfilled, (state, action) => {
        state.newDeal = action.payload;
        state.isNewDealLoading = false;
        state.successMessage = action.payload.message
      })
      .addCase(createDeal.pending, (state, action) => {
        state.isNewDealLoading = true;
      })
      .addCase(createDeal.rejected, (state, action) => {
        state.error = action.payload;
        state.isNewDealLoading = false;
      })
      .addCase(acceptDeal.fulfilled, (state, action) => {
        state.acceptDeal = action.payload;
        state.isAcceptDealLoading = false;
        state.successMessage = action.payload.message
      })
      .addCase(acceptDeal.pending, (state, action) => {
        state.isAcceptDealLoading = true;
      })
      .addCase(acceptDeal.rejected, (state, action) => {
        state.error = action.payload;
        state.isAcceptDealLoading = false;
      })
      .addCase(denyDeal.fulfilled, (state, action) => {
        state.denyDeal = action.payload;
        state.isDenyDealLoading = false;
        state.successMessage = action.payload.message
      })
      .addCase(denyDeal.pending, (state, action) => {
        state.isDenyDealLoading = true;
      })
      .addCase(denyDeal.rejected, (state, action) => {
        state.error = action.payload;
        state.isDenyDealLoading = false;
      })
      .addCase(startDeal.fulfilled, (state, action) => {
        state.startDeal = action.payload;
        state.isStartDealLoading = false;
        state.successMessage = action.payload.message
      })
      .addCase(startDeal.pending, (state, action) => {
        state.isStartDealLoading = true;
      })
      .addCase(startDeal.rejected, (state, action) => {
        state.error = action.payload;
        state.isStartDealLoading = false;
      })
      .addCase(endDeal.fulfilled, (state, action) => {
        state.endDeal = action.payload;
        state.isEndDealLoading = false;
        state.successMessage = action.payload.message
      })
      .addCase(endDeal.pending, (state, action) => {
        state.isEndDealLoading = true;
      })
      .addCase(endDeal.rejected, (state, action) => {
        state.error = action.payload;
        state.isEndDealLoading = false;
      })
      .addCase(deleteDeal.fulfilled, (state, action) => {
        state.deleteDeal = action.payload;
        state.isDealDeletedLoading = false;
        state.successMessage = action.payload.message
      })
      .addCase(deleteDeal.pending, (state, action) => {
        state.isDealDeletedLoading = true;
      })
      .addCase(deleteDeal.rejected, (state, action) => {
        state.error = action.payload;
        state.isDealDeletedLoading   = false;
      })
      .addCase(getSingleDeal.fulfilled, (state, action) => {
        state.singleDeal = action.payload.deal;
        state.isSingleDealLoading = false;
      })
      .addCase(getSingleDeal.pending, (state, action) => {
        state.isSingleDealLoading = true;
      })
      .addCase(getSingleDeal.rejected, (state, action) => {
        state.error = action.payload.message;
        state.isSingleDealLoading   = false;
      })
    },
  });
  
  
  export default dealsSlice.reducer;