import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cuidadorService from "./cuidadoresService";
import { toast } from "react-toastify";

const initialState = {
  cuidador: null,
  cuidadores: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  category: [],
};

// Create New Product
export const createCuidador = createAsyncThunk(
  "cuidadores/add-cuidador",
  async (formData, thunkAPI) => {
    try {
      // Realiza la solicitud POST al servidor para crear un nuevo producto
      const response = await cuidadorService.createCuidador(formData);

      // El servidor debe devolver los datos del nuevo producto creado
      const newCuidador = response.data;

      // Retorna los nuevos datos del producto para actualizar el estado
      return newCuidador;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      // Si la solicitud falla, rechaza la acción con el mensaje de error
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all cuidadores
export const getCuidadores = createAsyncThunk(
  "cuidadores/getAll",
  async (_, thunkAPI) => {
    try {
      return await cuidadorService.getCuidadores();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a Product
export const deleteCuidador = createAsyncThunk(
  "cuidadores/delete",
  async (id, thunkAPI) => {
    try {
      return await cuidadorService.deleteCuidador(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get a product
export const getCuidador = createAsyncThunk(
  "cuidadores/getCuidador",
  async (id, thunkAPI) => {
    try {
      return await cuidadorService.getCuidador(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Update product
export const updateCuidador = createAsyncThunk(
  "cuidadores/updateCuidador",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await cuidadorService.updateCuidador(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const cuidadorSlice = createSlice({
  name: "cuidador",
  initialState,
  reducers: {
    CALC_CATEGORY2(state, action) {
      const cuidadores = action.payload;
      if (Array.isArray(cuidadores)) {
        const array = [];
        cuidadores.forEach((item) => {
          const { category2 } = item;
          if (category2) {
            array.push(category2);
          }
        });
        const uniqueCategory = [...new Set(array)];
        state.category2= uniqueCategory;
      } else {
        console.error("El argumento de CALC_CATEGORY2 no es un arreglo válido.");
      }
    },
  }, 
  extraReducers: (builder) => {
    builder
    .addCase(createCuidador.pending, (state) => {
      // Marca que la solicitud está en progreso si lo necesitas
      state.isLoading = true;
    })
    .addCase(createCuidador.fulfilled, (state, action) => {
      // Marca que la solicitud se completó con éxito
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

      // Agrega el nuevo producto a la lista de productos en el estado
      state.cuidadores.push(action.payload);

      // Muestra una notificación de éxito
      toast.success("El producto se ha creado con éxito");
    })
    .addCase(createCuidador.rejected, (state, action) => {
      // Marca que la solicitud ha sido rechazada y almacena el mensaje de error
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;

      // Muestra una notificación de error
      toast.error(action.payload);
    })
      .addCase(getCuidadores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.cuidadores = action.payload;
      })
      .addCase(getCuidadores.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteCuidador.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCuidador.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(" eliminado");
      })
      .addCase(deleteCuidador.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getCuidador.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCuidador.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.cuidador = action.payload;
      })
      .addCase(getCuidador.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateCuidador.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCuidador.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Paciente actualizado");
      })
      .addCase(updateCuidador.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CALC_STORE_VALUE, CALC_OUTOFSTOCK, CALC_CATEGORY2 } =
  cuidadorSlice.actions;

export const selectIsLoading = (state) => state.cuidador.isLoading;
export const selectCuidador = (state) => state.cuidador.cuidador;
export const selectTotalStoreValue = (state) => state.cuidador.totalStoreValue;
export const selectOutOfStock = (state) => state.cuidador.outOfStock;
export const selectCategory2 = (state) => state.cuidador.category;

export default cuidadorSlice.reducer;