import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrlFetchInvoices = `${process.env.REACT_APP_SERVER_BASE_URL}/invoices/`;

export const createInvoice = createAsyncThunk('invoices/create', async (invoiceData, { rejectWithValue }) => {
    try {
        const token = JSON.parse(localStorage.getItem("userLoggedIn"));
        const response = await axios.post(`${apiUrlFetchInvoices}create`, invoiceData , {
            headers: { 'Authorization': `${token}` }
          });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getDesignerInvoices = createAsyncThunk('invoices/designerInvoices', async (designerId, { rejectWithValue }) => {
    try {
        const token = JSON.parse(localStorage.getItem("userLoggedIn"));
        const response = await axios.get(`${apiUrlFetchInvoices}designer/${designerId}`, {
            headers: { 'Authorization': `${token}` }
          });
          console.log(response)
        return response.data.invoices;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getClientInvoices = createAsyncThunk('invoices/clientInvoices', async (clientId, { rejectWithValue }) => {
    try {
        const token = JSON.parse(localStorage.getItem("userLoggedIn"));
        const response = await axios.get(`${apiUrlFetchInvoices}client/${clientId}`, {
            headers: { 'Authorization': `${token}` }
          });
          console.log(response)
        return response.data.invoices;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const downloadInvoicePDF = createAsyncThunk('invoices/downloadInvoicePDF', async (invoiceId, { rejectWithValue }) => {
      try {
        const token = JSON.parse(localStorage.getItem('userLoggedIn'));
        const response = await axios.get(`${apiUrlFetchInvoices}${invoiceId}/pdf`, {
          headers: { 'Authorization': `${token}` },
          responseType: 'arraybuffer', 
        });
  
        if (response.status === 200) {
            const blob = new Blob([response.data], { type: 'application/pdf' });
            return URL.createObjectURL(blob);
          } else {
            return rejectWithValue('Errore durante il download del PDF');
          }
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Errore generale durante il download del PDF');
      }
    }
  );    

const invoicesSlice = createSlice({
    name: 'invoices',
    initialState:{
        newInvoice: null,
        isNewInvoiceLoading: true,
        successCreationInvoiceMessage: null,
        errorCreationInvoiceMessage: null,
        designerInvoices: [],
        isDesignerInvoicesLoading: true,
        clientInvoices: [],
        isClientInvoicesLoading: true,
        pdfURL: null,
        errorPDFMessage: null
    },
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(createInvoice.pending, (state) => {
                state.isNewInvoiceLoading = true
            })
            .addCase(createInvoice.fulfilled, (state, action) => {
                state.isNewInvoiceLoading = false
                state.newInvoice = action.payload.invoice
                state.successCreationInvoiceMessage = action.payload.message

            })
            .addCase(createInvoice.rejected, (state, action) => {
                state.isNewInvoiceLoading = false
                state.errorCreationInvoiceMessage = action.payload.message
            })
            .addCase(getDesignerInvoices.pending, (state) => {
                state.isDesignerInvoicesLoading = true
            })
            .addCase(getDesignerInvoices.fulfilled, (state, action) => {
                state.isDesignerInvoicesLoading = false
                state.designerInvoices = action.payload

            })
            .addCase(getDesignerInvoices.rejected, (state, action) => {
                state.isDesignerInvoicesLoading = false
            })
            .addCase(getClientInvoices.pending, (state) => {
                state.isClientInvoicesLoading = true
            })
            .addCase(getClientInvoices.fulfilled, (state, action) => {
                state.isClientInvoicesLoading = false
                state.clientInvoices = action.payload
            })
            .addCase(getClientInvoices.rejected, (state, action) => {
                state.isClientInvoicesLoading = false
            })
            .addCase(downloadInvoicePDF.fulfilled, (state, action) => {
                state.pdfURL = action.payload;
            })
            .addCase(downloadInvoicePDF.rejected, (state, action) => {
                state.pdfURL = null;
                state.errorPDFMessage = action.payload;
            });
    },
});

export default invoicesSlice.reducer;