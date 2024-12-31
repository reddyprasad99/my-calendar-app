import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  communications: [
    { name: "LinkedIn Post", description: "Post on LinkedIn", sequence: 1, mandatory: true },
    { name: "LinkedIn Message", description: "Send a message on LinkedIn", sequence: 2, mandatory: true },
    { name: "Email", description: "Send an email", sequence: 3, mandatory: true },
    { name: "Phone Call", description: "Call the company", sequence: 4, mandatory: false },
    { name: "Other", description: "Other methods of communication", sequence: 5, mandatory: false },
  ],
};

const communicationSlice = createSlice({
  name: "communication",
  initialState,
  reducers: {
    logCommunication: (state: any, action: any) => {
      state.communications.push(action.payload);
    },
    updateCommunication: (state: any, action) => {
      const index = state.communications.findIndex((c: any) => c.name === action.payload.name);
      if (index !== -1) {
        state.communications[index] = action.payload;
      }
    },
    deleteCommunication: (state, action) => {
      state.communications = state.communications.filter((c: any) => c.name !== action.payload.name);
    },
  },
});

export const { logCommunication, updateCommunication, deleteCommunication } =
  communicationSlice.actions;
export default communicationSlice.reducer;
