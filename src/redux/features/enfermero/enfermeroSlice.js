import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import enfermeroService from "./enfermeroService";
import { toast } from "react-toastify";

const initialState = {
  enfermero: null,
  enfermeros: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  category: [],
};

// Create New Product
export const createEnfermero = createAsyncThunk(
  "enfermeros/add-enfermero",
  async (formData, thunkAPI) => {
    try {
      // Realiza la solicitud POST al servidor para crear un nuevo producto
      const response = await enfermeroService.createEnfermero(formData);

      // El servidor debe devolver los datos del nuevo producto creado
      const newEnfermero = response.data;

      // Retorna los nuevos datos del producto para actualizar el estado
      return newEnfermero;
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

// Get all enfermeros
export const getEnfermeros = createAsyncThunk(
  "enfermeros/getAll",
  async (_, thunkAPI) => {
    try {
      return await enfermeroService.getEnfermeros();
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

// Delete a Enfermero
export const deleteEnfermero = createAsyncThunk(
  "enfermeros/delete",
  async (id, thunkAPI) => {
    try {
      return await enfermeroService.deleteEnfermero(id);
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

// Get a Enfermero
export const getEnfermero = createAsyncThunk(
  "enfermeros/getEnfermero",
  async (id, thunkAPI) => {
    try {
      return await enfermeroService.getEnfermero(id);
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
export const updateEnfermero = createAsyncThunk(
  "enfermeros/updateEnfermero",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await enfermeroService.updateEnfermero(id, formData);
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

const enfermeroSlice = createSlice({
  name: "enfermero",
  initialState,
  reducers: {
    CALC_CATEGORY3(state, action) {
      const enfermeros = action.payload;
      const array = [];
      enfermeros.map((item) => {
        const { category } = item;

        return array.push(category);
      });
      const uniqueCategory = [...new Set(array)];
      state.category = uniqueCategory;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createEnfermero.pending, (state) => {
      // Marca que la solicitud está en progreso si lo necesitas
      state.isLoading = true;
    })
    .addCase(createEnfermero.fulfilled, (state, action) => {
      // Marca que la solicitud se completó con éxito
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

      // Agrega el nuevo producto a la lista de productos en el estado
      state.enfermeros.push(action.payload);

      // Muestra una notificación de éxito
      toast.success("El enfermero se ha creado con éxito");
    })
    .addCase(createEnfermero.rejected, (state, action) => {
      // Marca que la solicitud ha sido rechazada y almacena el mensaje de error
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;

      // Muestra una notificación de error
      toast.error(action.payload);
    })
      .addCase(getEnfermeros.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.enfermeros = action.payload;
      })
      .addCase(getEnfermeros.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteEnfermero.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEnfermero.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(" eliminado correctamente");
      })
      .addCase(deleteEnfermero.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getEnfermero.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnfermero.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.enfermero = action.payload;
      })
      .addCase(getEnfermero.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateEnfermero.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEnfermero.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Enfermero actualizado");
      })
      .addCase(updateEnfermero.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CALC_STORE_VALUE, CALC_OUTOFSTOCK, CALC_CATEGORY3 } =
  enfermeroSlice.actions;

export const selectIsLoading = (state) => state.enfermero.isLoading;
export const selectEnfermero = (state) => state.enfermero.enfermero;
export const selectTotalStoreValue = (state) => state.enfermero.totalStoreValue;
export const selectOutOfStock = (state) => state.enfermero.outOfStock;
export const selectCategory3 = (state) => state.enfermero.category;

export default enfermeroSlice.reducer;