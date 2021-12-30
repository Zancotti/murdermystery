import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fileList: [],
  selectedFile: null,
  accessedFileList: [],
  fileSearchResult: null,
};

export const files = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setFileList: (state, action) => {
      const { fileList } = action.payload;
      state.fileList = fileList;
    },

    setSelectedFile: (state, action) => {
      const { selectedFile } = action.payload;
      state.selectedFile = selectedFile;
    },

    addAccessedFile: (state, action) => {
      const { file } = action.payload;
      if (!state.accessedFileList.find(f => f.id === file.id)) {
        state.accessedFileList = [...state.accessedFileList, file];
      }
    },

    setFileSearchResult: (state, action) => {
      const { file } = action.payload;
      state.fileSearchResult = file;
    },
  },
});
