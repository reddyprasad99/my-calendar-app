import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  communications: [],
};

const communicationSlice = createSlice({
  name: "communication",
  initialState,
  reducers: {
    logCommunication: (state: any, action: any) => {
      state.communications.push(action.payload);
    },
    updateCommunication: (state: any, action) => {
      const index = state.communications.findIndex((c: any) => c.id === action.payload.id);
      if (index !== -1) {
        state.communications[index] = action.payload;
      }
    },
    deleteCommunication: (state, action) => {
      state.communications = state.communications.filter((c: any) => c.id !== action.payload);
    },
  },
});

export const { logCommunication, updateCommunication, deleteCommunication } =
  communicationSlice.actions;
export default communicationSlice.reducer;
