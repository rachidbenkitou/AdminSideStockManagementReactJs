import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  deleteCategories,
  getCategories,
  saveCategories,
  editCategories,
  search,
  getAllCategories,
} from "../services/categorieService";
import { toast } from "react-toastify";
export const fetchCategories = createAsyncThunk(
  "categorie/fetchCategories",
  async (page) => {
    try {
      const response = await getCategories(page);
      return {
        data: response.data.categories.data,
        totalPages: response.data.categories.totalPages,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAllCategories = createAsyncThunk(
  "categorie/fetchAllCategories",
  async () => {
    try {
      const response = await getAllCategories();
      return response.data.categories;
    } catch (error) {
      console.log(error);
    }
  }
);

export const searchCategories = createAsyncThunk(
  "categorie/searchCategories",
  async ({ words, page }) => {
    try {
      const response = await search(words, page);
      return {
        data: response.data.categories.data,
        totalPages: response.data.categories.totalPages,
      };
    } catch (error) {
      console.log(error);
    }
  }
);
export const addCategorie = createAsyncThunk(
  "categorie/addCategorie",
  async (categorie, { rejectWithValue }) => {
    try {
      const response = await saveCategories(categorie);
      return response.data.categorie;
    } catch (error) {

      if (error.response?.status === 422) {
        const validationErrors = error.response.data.erreurs;

        Object.values(validationErrors).forEach((error) => {
          toast.error(error[0] || "Erreur de validation");
        });
      } else if(error.response?.status === 409){
        toast.error(
          error.response?.data.message ||
            "Une erreur s'est produite lors de l'ajout du catégorie"
        );
      }else{
        toast.error(
          error.response?.data.message ||
            "Une erreur s'est produite lors de l'ajout du catégorie"
        );
      }
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateCategorie = createAsyncThunk(
  "categorie/updateCategorie",
  async (categorie) => {
    try {
      const response = await editCategories(categorie);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeCtegorie = createAsyncThunk(
  "categorie/deleteCategories",
  async (categorie) => {
    try {
      const response = await deleteCategories(categorie.id);
      return categorie;
    } catch (error) {
      console.error(error);
    }
  }
);
const categorieSlice = createSlice({
  name: "categorie",
  initialState: {
    categories: [],
    categorie: {},
    totalPages: null,
    status: "",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.totalPages = action.payload.totalPages;
        state.categories = action.payload.data;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(searchCategories.fulfilled, (state, action) => {
        state.totalPages = action.payload.totalPages;
        state.categories = action.payload.data;
      })
      .addCase(addCategorie.fulfilled, (state, action) => {
        state.categories.push(action.payload);
        toast.success('Catégorie ajouté avec succès');
      })
      .addCase(updateCategorie.fulfilled, (state, action) => {
        state.categories = state.categories.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        );
        toast.success('Catégorie modifier avec succès');
      })
      .addCase(removeCtegorie.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (item) => item.id !== action.payload.id
        );
        toast.success('Catégorie supprimé avec succès');
      });
  },
});
export const selectCategories = (state) => state.categorie.categories;
export const selectFournisseur = (state) => state.categorie.categorie;
export const totalPages = (state) => state.categorie.totalPages;
export const categorie = categorieSlice.reducer;
