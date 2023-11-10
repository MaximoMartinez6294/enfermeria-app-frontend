import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import productReducer from "../redux/features/product/productSlice";
import enfermeroReducer from "../redux/features/enfermero/enfermeroSlice";
import cuidadorReducer from "../redux/features/cuidadores/cuidadorSlice";
import filterReducer from "../redux/features/product/filterSlice";
import filterReducer2 from "./features/cuidadores/filterSlice2";
import filterReducer3 from "./features/enfermero/filterSlice3";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    cuidador: cuidadorReducer,
    product: productReducer,
    filter: filterReducer,
    filter2: filterReducer2,
    enfermero: enfermeroReducer,
    filter3: filterReducer3
  },
});