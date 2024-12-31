import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companies: [
    {
      id: 1,
      name: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      linkedinProfile: "https://www.linkedin.com/company/tech-innovations",
      emails: ["info@techinnovations.com", "support@techinnovations.com"],
      phoneNumbers: ["+1 234 567 8901", "+1 234 567 8902"],
      comments: "",
      communicationPeriodicity: "2 weeks",
    },
    {
      id: 2,
      name: "Green Energy Solutions",
      location: "New York, NY",
      linkedinProfile: "https://www.linkedin.com/company/green-energy-solutions",
      emails: ["contact@greenenergy.com"],
      phoneNumbers: ["+1 345 678 9012"],
      comments: "",
      communicationPeriodicity: "1 month",
    },
    {
      id: 3,
      name: "HealthTech Solutions",
      location: "Boston, MA",
      linkedinProfile: "https://www.linkedin.com/company/healthtech-solutions",
      emails: ["contact@healthtechsolutions.com"],
      phoneNumbers: ["+1 456 789 0123"],
      comments: "",
      communicationPeriodicity: "3 weeks",
    },
  ],
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    addCompany: (state: any, action: any) => {
      state.companies.push(action.payload);
    },
    editCompany: (state: any, action: { payload: { companyId: any, type: string, date: string, comments: string } }) => {
      const { companyId, type, date, comments } = action.payload;
      const index = state.companies.findIndex((c: any) => c.id === companyId);
      if (index !== -1) {
        // Update the company data
        state.companies[index] = {
          ...state.companies[index],
          type,
          date,
          comments,
        };
      }
    },
    deleteCompany: (state: any, action: any) => {
      state.companies = state.companies.filter((c: any) => c.id !== action.payload.id);
    },
  },
});

export const { addCompany, editCompany, deleteCompany } = companySlice.actions;
export default companySlice.reducer;
