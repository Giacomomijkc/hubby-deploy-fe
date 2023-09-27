import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
const apiUrlLogin = `${process.env.REACT_APP_SERVER_BASE_URL}/login`;
const apiUrlFetchDesigners = `${process.env.REACT_APP_SERVER_BASE_URL}/designers/`;
const apiUrlFetchClients = `${process.env.REACT_APP_SERVER_BASE_URL}/clients/`;

export const login = createAsyncThunk('users/login', async (userLoginData,{ rejectWithValue }) => {
    try {
        const response = await axios.post(apiUrlLogin, userLoginData);
        const { data } = response;
        console.log(response)
    
        localStorage.setItem('userLoggedIn', JSON.stringify(data.token));
    
        return data;
    } catch (error) {
      console.log(error)
        if (error.response && error.response.data && error.response.data.message){
          return rejectWithValue(error.response.data.message);
        } else {
          throw error;
        }
    }
}) 

export const getDesignerDetails = createAsyncThunk('users/getDesignerDetails', async (designerId, { rejectWithValue }) => {
  try {
      const response = await axios.get(`${apiUrlFetchDesigners}${designerId}`);
      return response.data;
  } catch (error) {
      if (error.response && error.response.data && error.response.data.message){
          return rejectWithValue(error.response.data.message);
      } else {
          throw error;
      }
  }
})

export const getClientDetails = createAsyncThunk('users/getClientDetails', async (clientId, { rejectWithValue }) => {
  try {
      const response = await axios.get(`${apiUrlFetchClients}${clientId}`);
      return response.data;
  } catch (error) {
      if (error.response && error.response.data && error.response.data.message){
          return rejectWithValue(error.response.data.message);
      } else {
          throw error;
      }
  }
})

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        designer: null,
        client: null,
        token: null,
        loading: false,
        successMessage: null,
        error: null,
        role: null,
        clientId: '', 
        designerId: '',
        isLogged: false,
    },
    reducers: {
        setRole: (state, action) => {
          state.role = action.payload;
        },
        setIsLogged: (state, action) => {
          state.isLogged = action.payload
        },
        setToken: (state, action) => {
          state.token = action.payload
        },
        setClientId: (state, action) => {
          state.clientId = action.payload
        },
        setDesignerId: (state, action) => {
          state.designerId = action.payload
        }
      },
      extraReducers: (builder) => {
        builder
          .addCase(login.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.successMessage = action.payload.message;

            const token = localStorage.getItem('userLoggedIn');
            const decodedToken = jwtDecode(token);
            const userRole = decodedToken.role;

            state.role = userRole;

            if (userRole === 'Client') {
              state.clientId = decodedToken._id;
            } else if (userRole === 'Designer') {
              state.designerId = decodedToken._id;
            }

            state.isLogged = true;
          })
          .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(getDesignerDetails.fulfilled, (state, action) => {
            state.designer = action.payload;
        })
        .addCase(getDesignerDetails.rejected, (state, action) => {
            state.error = action.payload;
        })
        .addCase(getClientDetails.fulfilled, (state, action) => {
          state.client = action.payload;
      })
      .addCase(getClientDetails.rejected, (state, action) => {
          state.error = action.payload;
      });
      },
});

export const { setRole, setIsLogged, setToken, setClientId, setDesignerId } = loginSlice.actions;

export default loginSlice.reducer;