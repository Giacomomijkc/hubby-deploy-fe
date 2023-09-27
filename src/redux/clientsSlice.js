import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getState } from '@reduxjs/toolkit';
import axios from 'axios';
const apirUrlFetchClients = `${process.env.REACT_APP_SERVER_BASE_URL}/clients/`;
const apiUrlUploadAvatar = `${process.env.REACT_APP_SERVER_BASE_URL}/clients/cloudUpload`;
const apiUrlRegisterClient = `${process.env.REACT_APP_SERVER_BASE_URL}/clients/create`;

export const uploadAvatar = createAsyncThunk('clients/uploadAvatar', async (avatarFormData) => {
    try {
        const response = await axios.post(apiUrlUploadAvatar, avatarFormData);
        return response.data.avatar;
    } catch (error) {
        console.log(error)
        throw new Error('Errore durante l\'upload dell\'avatar');
    }
});

export const patchAvatar = createAsyncThunk('clients/patchAvatar', async ({ clientId, avatarFormData }) => {
  try {
    const response = await axios.patch(`${apirUrlFetchClients}${clientId}/cloudUpdateImg`, avatarFormData);
    return response.data.result.avatar;
  } catch (error) {
    console.log(error);
    throw new Error('Errore durante l\'aggiornamento dell\'avatar');
  }
});

export const registerClient = createAsyncThunk('clients/registerDesigner', async (clientData,{ rejectWithValue }) => {
    try {
        const response = await axios.post(apiUrlRegisterClient, clientData);
        return response.data;
    } catch (error) {
        console.log(error)
        if (error.response && error.response.data && error.response.data.message) {
          console.log(error.response.data.error.errors)
          return rejectWithValue(error.response.data.message);
        } else {
          throw error;
        }
    }
});

export const patchClient = createAsyncThunk('clients/patchDesigner', async ({ clientId, clientData }) => {
  try {
    const token = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await axios.patch(`${apirUrlFetchClients}${clientId}/update`, clientData, {
      headers: { 'Authorization': `${token}` }
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Errore durante l\'aggiornamento del designer');
  }
});

export const fetchClientById = createAsyncThunk('clients/fetchClientById', async (clientId) => {
  try {
      const response = await axios.get(`${apirUrlFetchClients}${clientId}`);
      return response.data.client;
  } catch (error) {
    console.error('Errors occuring while fetching Client', error);
    throw new Error('Errors occuring while fetching Client');
  }
});

export const selectClientById = (state, clientId) => {
  return state.clients.clients?.find(client => client.id === clientId)
}

export const fetchClients= createAsyncThunk('clients/fetchClients', async () => {
  try {
      const response = await axios.get(`${apirUrlFetchClients}`);
      return response.data.clients;
  } catch (error) {
    console.error('Errors occuring while fetching Client', error);
    throw new Error('Errors occuring while fetching Client');
  }
});

export const fetchProjectsLikedByClient = createAsyncThunk('designers/fetchProjectsLikedByClient', async (clientId) => {
  try {
    const token = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await axios.get(`${apirUrlFetchClients}${clientId}/liked_projects`, {
      headers: { 'Authorization': `${token}` }
  });
    console.log(response.data.likedProjects)
    return response.data.likedProjects;
  } catch (error) {
    console.log(error)
    console.error('Errors occuring while fetching liked projects', error);
    throw new Error('Errors occuring while fetching liked projects');
  }
});

const clientsSlice = createSlice({
    name: 'client',
    initialState: {
      avatarURL: null,
      successMessage: null,
      successPatchMessage: null,
      isUploadLoading: true,
      client: null,
      clientIsLoading: true,
      likedProjects: [],
      isLikedProjectsLoading: true,
      clients: null,
      isClientsLoading: true,
      patchedAvatar: null,
      isPatchedAvatarLoading: true,
      patchedClient: null,
      isPatchedClientLoading: true,
    },
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(uploadAvatar.pending, (state, action) => {
          state.isUploadLoading = true;
        })
        .addCase(uploadAvatar.fulfilled, (state, action) => {
          state.avatarURL = action.payload;
          state.isUploadLoading = false;
        })
        .addCase(uploadAvatar.rejected, (state, action) => {
          state.isUploadLoading = false;
        })
        .addCase(registerClient.fulfilled, (state, action) => {
          state.successMessage = action.payload.message;
        })
        .addCase(registerClient.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(fetchClientById.fulfilled, (state, action) => {
          state.client = action.payload;
          state.clientIsLoading = false;
        })
        .addCase(fetchClientById.pending, (state, action) => {
          state.clientIsLoading = true;
        })
        .addCase(fetchClientById.rejected, (state, action) => {
          state.error = action.payload;
          state.clientIsLoading = false;
        })
        .addCase(fetchProjectsLikedByClient.fulfilled, (state, action) =>{
          state.likedProjects = action.payload
          state.isLikedProjectsLoading = false
        })
        .addCase(fetchProjectsLikedByClient.pending, (state, action) =>{
          state.likedProjects = action.payload
          state.isLikedProjectsLoading = true
        })
        .addCase(fetchProjectsLikedByClient.rejected, (state, action) =>{
          state.error = action.payload
          state.isLikedProjectsLoading = false
        })
        .addCase(fetchClients.fulfilled, (state, action) =>{
          state.clients = action.payload
          state.isClientsLoading = false
        })
        .addCase(fetchClients.pending, (state, action) => {
          state.isClientsLoading = true
        })
        .addCase(fetchClients.rejected, (state, action) => {
          state.error = action.payload
          state.isClientsLoading = false
        })
        .addCase(patchAvatar.fulfilled, (state, action) =>{
          state.patchedAvatar = action.payload
          state.isPatchedAvatarLoading = false
        })
        .addCase(patchAvatar.pending, (state, action) =>{
          state.isPatchedAvatarLoading = true
        })
        .addCase(patchAvatar.rejected, (state, action) =>{
          state.error = action.payload
          state.isPatchedAvatarLoading = false
        })
        .addCase(patchClient.fulfilled, (state, action) =>{
          state.patchedClient = action.payload.result
          state.successPatchMessage = action.payload.message;
          state.isPatchedClientLoading = false
        })
        .addCase(patchClient.pending, (state, action) =>{
          state.isPatchedClientLoading = true
        })
        .addCase(patchClient.rejected, (state, action) =>{
          state.error = action.payload
          state.isPatchedClientLoading = false
        })
    },
  });
  
  export default clientsSlice.reducer;