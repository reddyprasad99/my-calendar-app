import { configureStore } from "@reduxjs/toolkit";
import communicationReducer from "./communicationList";
import companyReducer from "./companyList";

const store = configureStore({
  reducer: {
    company: companyReducer,
    communication: communicationReducer,
  },
});

export default store;
