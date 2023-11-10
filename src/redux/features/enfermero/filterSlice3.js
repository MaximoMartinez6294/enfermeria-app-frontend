import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredEnfermeros: [],
};

const filterSlice3 = createSlice({
  name: "filter3",
  initialState,
  reducers: {
    FILTER_ENFERMEROS(state, action) {
      const { enfermeros, search } = action.payload;
      const tempEnfermeros = enfermeros.filter(
        (enfermero) =>
            enfermero.name?.toLowerCase().includes(search.toLowerCase()) ||
            enfermero.telefono?.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredEnfermeros = tempEnfermeros;
      
      console.log("filteredEnfermeros en el reducer:", state.filteredEnfermeros);
    },
  },
});

export const { FILTER_ENFERMEROS } = filterSlice3.actions;

export const selectFilteredEnfermeros = (state) => state.filter3.filteredEnfermeros; // Asegúrate de que el nombre del slice sea correcto

export default filterSlice3.reducer;