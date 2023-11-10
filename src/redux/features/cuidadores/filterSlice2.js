import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredCuidadores: [],
};

const filterSlice2 = createSlice({
  name: "filter2",
  initialState,
  reducers: {
    FILTER_CUIDADORES(state, action) {
      const { cuidadores, search } = action.payload;
      const tempCuidadores = cuidadores.filter(
        (cuidador) =>
          cuidador.name?.toLowerCase().includes(search.toLowerCase()) ||
          cuidador.telefono?.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredCuidadores = tempCuidadores;
      
      console.log("filteredCuidadores en el reducer:", state.filteredCuidadores);
    },
  },
});

export const { FILTER_CUIDADORES } = filterSlice2.actions;

export const selectFilteredCuidadores = (state) => state.filter2.filteredCuidadores; // Asegúrate de que el nombre del slice sea correcto

export default filterSlice2.reducer;