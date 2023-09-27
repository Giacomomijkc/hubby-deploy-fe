import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrlFetchProjects = `${process.env.REACT_APP_SERVER_BASE_URL}/projects/`;
const apirUrlFetchCoverProjectUpload = `${process.env.REACT_APP_SERVER_BASE_URL}/projects/cover/upload`;
const apiUrlFetchImagesProjectUpload = `${process.env.REACT_APP_SERVER_BASE_URL}/projects/images/upload`;
const apiUrlFetchProjectUpload = `${process.env.REACT_APP_SERVER_BASE_URL}/projects/create`;


export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  try {
    const response = await axios.get('http://localhost:5050/projects/');
    return response.data.projects;
  } catch (error) {
    console.log(error)
    throw new Error('Errors uploading cover'); 
  }
});

export const uploadCover = createAsyncThunk('projects/uploadCover', async (coverFormData) => {
  try {
    const response = await axios.post(apirUrlFetchCoverProjectUpload, coverFormData);
    return response.data.cover;
  } catch (error) {
    console.log(error)
        throw new Error('Errors uploading cover');
  }
});


export const updateCover = createAsyncThunk('projects/updateCover', async ({ projectId, coverFormData }) => {
  try {
    const response = await axios.patch(`${apiUrlFetchProjects}${projectId}/cover/update`, coverFormData);
    return response.data.result.cover;
  } catch (error) {
    console.log(error)
        throw new Error('Errors updating cover');
  }
});


export const uploadImages = createAsyncThunk('projects/uploadImages', async (imagesFormData) => {
    try {
      const response = await axios.post(apiUrlFetchImagesProjectUpload, imagesFormData);
      return response.data.images;
    } catch (error) {
      console.log(error)
      throw new Error('Errors uploading images');
    }
});


export const updateImages = createAsyncThunk('projects/updateImages', async ({ projectId, imagesFormData }) => {
  try {
    const response = await axios.patch(`${apiUrlFetchProjects}${projectId}/images/update`, imagesFormData);
    return response.data.result.images;
    
  } catch (error) {
    console.log(error)
    throw new Error('Errors updating images');
  }
});


export const createProject = createAsyncThunk('projects/createProject', async (projectData,{ rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("userLoggedIn"));
      const response = await axios.post(apiUrlFetchProjectUpload, projectData, {
        headers: { 'Authorization': `${token}` }
    })
    console.log(response)
      return response.data.createdProject
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log(error.response.data.error.errors)
        return rejectWithValue(error.response.data.message);
      } else {
        throw error;
      }
    }
});


export const patchProject = createAsyncThunk('projects/patchProject', async ({projectId, projectData}) => {
  try {
    const token = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await axios.patch(`${apiUrlFetchProjects}${projectId}/update`, projectData, {
      headers: { 'Authorization': `${token}` }
  })
    return response.data.createdProject
  } catch (error) {
    console.log(error)
      throw new Error('Errors uploading images');
  }
});


export const fetchSingleProject = createAsyncThunk('projects/fetchSingleProject', async (projectId) => {
  try {
    const response = await axios.get(`${apiUrlFetchProjects}${projectId}`);
    console.log(response.data.project)
    return response.data.project;
  } catch (error) {
    console.error('Errore durante il recupero dei dati del progetto', error);
    throw new Error('Errore durante il recupero dei dati del progetto');
  }
});


export const fetchDesignerProjects = createAsyncThunk('projects/fetchDesignerProjects', async (designerId) =>{
  try {
    const response = await axios.get(`${apiUrlFetchProjects}designer/${designerId}`);
    return response.data.projects;
  } catch (error) {
    console.error('Errore durante il recupero dei progetti del designer', error);
    throw new Error('Errore durante il recupero dei progetti del designer');
  }
})

export const fetchDesignerLikedProjects = createAsyncThunk('projects-liked/fetchDesignerLikedProjects', async (designerId) =>{
  try {
    const response = await axios.get(`${apiUrlFetchProjects}liked/designer/${designerId}`);
    return response.data.liked_projects;
  } catch (error) {
    console.error('Errore durante il recupero dei progetti del designer', error);
    throw new Error('Errore durante il recupero dei progetti del designer');
  }
})


export const toggleLike = createAsyncThunk('projects/toggleLike', async (projectId, { rejectWithValue, getState }) => {
  try {
      const token = JSON.parse(localStorage.getItem("userLoggedIn"));
      const response = await axios.post(`${apiUrlFetchProjects}${projectId}/like`, {}, {
          headers: { 'Authorization': `${token}` }
      });
      const {updatedProject} = response.data;
      console.log(response);
      console.log(updatedProject)
      return updatedProject
  } catch (error) {
    console.log(error)
      if (error.response && error.response.data && error.response.data.message){
          return rejectWithValue(error.response.data.message);
      } else {
          throw error;
      }
  }
})


export const toggleSingleProjectLike = createAsyncThunk('projects/toggleSingleProjectLike', async (projectId, { rejectWithValue, getState }) => {
  try {
      const token = JSON.parse(localStorage.getItem("userLoggedIn"));
      const response = await axios.post(`${apiUrlFetchProjects}${projectId}/like`, {}, {
          headers: { 'Authorization': `${token}` }
      });
      const {updatedSingleProject} = response.data;
      console.log(response);
      console.log(updatedSingleProject)
      return updatedSingleProject
  } catch (error) {
    console.log(error)
      if (error.response && error.response.data && error.response.data.message){
        console.log(error.response)
          return rejectWithValue(error.response.data.message);
      } else {
          throw error;
      }
  }
})


export const deleteProject = createAsyncThunk('projects/deleteProject', async (projectId,{ rejectWithValue }) => {
  try {
    const token = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await axios.delete(`${apiUrlFetchProjects}${projectId}`, {
      headers: { 'Authorization': `${token}` }
  })
    return response.data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log(error.response.data.error.errors)
      return rejectWithValue(error.response.data.message);
    } else {
      throw error;
    }
  }
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    singleProject: {},
    isSingleProjectLoading: true,
    singleProjectComponent: {},
    projects: [],
    liked_projects: [],
    isLikedProjectsLoading: true,
    isDesignerProjectsLoading: true,
    designerProjects: [],
    isUploadingCover: true,
    isUploadingImages: true,
    coverURL: null,
    imagesURL: null,
    successMessage: null,
    createdProject: null,
    patchedCover: null,
    patchedImages: null,
    patchedProject: null,
    isPatchedCoverLoading: true,
    isPatchedImagesLoading: true,
    isPatchedProjectLoading: true,
    successPatchMessage: null,
    deletedProject: null,
    isDeletedProjectLoading: true,
    successDeleteMessage: null
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
    })
    .addCase(fetchSingleProject.fulfilled, (state, action) => {
      state.singleProject = action.payload
      state.isSingleProjectLoading = false
    })
    .addCase(fetchSingleProject.pending, (state, action) => {
      state.isSingleProjectLoading = true
    })
    .addCase(fetchSingleProject.rejected, (state, action) => {
      state.isSingleProjectLoading = false
    })
    .addCase(fetchDesignerProjects.fulfilled, (state, action) => {
      state.designerProjects = action.payload
      state.isDesignerProjectsLoading= false
    })
    .addCase(fetchDesignerProjects.pending, (state, action) => {
      state.isDesignerProjectsLoading= true
    })
    .addCase(fetchDesignerProjects.rejected, (state, action) => {
      state.error= action.payload
      state.isDesignerProjectsLoading= false
    })
    .addCase(toggleLike.fulfilled, (state, action) => {
      state.singleProject = action.payload;
    })
    .addCase(toggleLike.rejected, (state, action) => {
      state.error = action.payload;
    })
    .addCase(toggleSingleProjectLike.fulfilled, (state, action) => {
      state.singleProjectComponent = action.payload;
    })
    .addCase(toggleSingleProjectLike.rejected, (state, action) => {
      state.error = action.payload;
    })
    .addCase(uploadCover.rejected, (state, action) => {
      state.error = action.payload;
      state.isUploadingCover = false;
    })
    .addCase(uploadCover.pending, (state, action) => {
      state.isUploadingCover = true;
    })
    .addCase(uploadCover.fulfilled, (state, action) => {
      state.coverURL = action.payload;
      state.isUploadingCover = false;
    })
    .addCase(uploadImages.rejected, (state, action) =>{
      state.error = action.payload;
      state.isUploadingImages = false;
    })
    .addCase(uploadImages.pending, (state, action) =>{
      state.isUploadingImages = true;
    })
    .addCase(uploadImages.fulfilled, (state, action) =>{
      state.imagesURL = action.payload;
      state.isUploadingImages = false;
    })
    .addCase(createProject.fulfilled, (state, action) =>{
      state.createdProject = action.payload;
    })
    .addCase(fetchDesignerLikedProjects.fulfilled, (state, action) => {
      state.liked_projects = action.payload;
      state.isLikedProjectsLoading = false;
    })
    .addCase(fetchDesignerLikedProjects.rejected, (state, action) => {
      state.error = action.payload;
      state.isLikedProjectsLoading = false;
    })
    .addCase(fetchDesignerLikedProjects.pending, (state, action) => {
      state.isLikedProjectsLoading = true;
    })
    .addCase(updateCover.fulfilled, (state, action) => {
      state.patchedCover = action.payload;
      state.isPatchedCoverLoading = false;
    })
    .addCase(updateCover.rejected, (state, action) => {
      state.error = action.payload;
      state.isPatchedCoverLoading = false;
    })
    .addCase(updateCover.pending, (state, action) => {
      state.isPatchedCoverLoading = true;
    })
    .addCase(updateImages.fulfilled, (state, action) => {
      state.patchedImages = action.payload;
      state.isPatchedImagesLoading = false;
    })
    .addCase(updateImages.rejected, (state, action) => {
      state.error = action.payload;
      state.isPatchedImagesLoading = false;
    })
    .addCase(updateImages.pending, (state, action) => {
      state.isPatchedImagesLoading = true;
    })
    .addCase(patchProject.fulfilled, (state, action) => {
      state.patchedProject = action.payload.result;
      state.successPatchMessage = action.payload.message;
      state.isPatchedProjectLoading = false;
    })
    .addCase(patchProject.rejected, (state, action) => {
      state.error = action.payload;
      state.isPatchedProjectLoading = false;
    })
    .addCase(patchProject.pending, (state, action) => {
      state.isPatchedProjectLoading = true;
    })
    .addCase(deleteProject.fulfilled, (state, action) => {
      state.deletedProject = action.payload;
      state.successDeleteMessage = action.payload.message;
      state.isDeletedProjectLoading = false;
    })
    .addCase(deleteProject.rejected, (state, action) => {
      state.error = action.payload;
      state.isDeletedProjectLoading = false;
    })
    .addCase(deleteProject.pending, (state, action) => {
      state.isDeletedProjectLoading = true;
    })
  },
});

export const { setCurrentPage } = projectsSlice.actions;

export default projectsSlice.reducer;
