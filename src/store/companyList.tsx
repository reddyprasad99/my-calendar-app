import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companies: [],
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    addCompany: (state: any, action: any) => {
      state.companies.push(action.payload);
    },
    editCompany: (state: any, action: any) => {
      const index = state.companies.findIndex((c: any) => c.id === action.payload.id);
      if (index !== -1) {
        state.companies[index] = action.payload;
      }
    },
    deleteCompany: (state: any, action: any) => {
      state.companies = state.companies.filter((c: any) => c.id !== action.payload);
    },
  },
});

export const { addCompany, editCompany, deleteCompany } = companySlice.actions;
export default companySlice.reducer;
