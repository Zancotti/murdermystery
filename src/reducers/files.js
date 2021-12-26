import { createSlice } from '@reduxjs/toolkit';

const fileList = [
  {
    id: 1,
    name: 'Crime Scene report',
    content: 'hej hej',
  },
  {
    id: 2,
    name: 'Autopicy report',
    content: 'hej hej',
  },
  {
    id: 3,
    name: 'Witness report',
    content: 'hej hej',
  },
];

const initialState = {
  list: fileList,
  selectedFile: null,
  accessedFileList: [],
  fileSearchResult: null,
};

export const files = createSlice({
  name: 'files',
  initialState,
  reducers: {
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
