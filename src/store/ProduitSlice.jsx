import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    deleteProduits,
    getProduits,
    saveProduits,
    editProduits,
    addQuantite,
    search, getAllProduits
} from "../services/produitService";

export const fetchProduits = createAsyncThunk(
  "produits/fetchProduits",
  async (page) => {
    try {
      const response = await getProduits(page);
      return {data:response.data.produits.data,totalPages:response.data.produits.totalPages};
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAllProduits = createAsyncThunk(
    "produits/fetchAllProduits",
    async () => {
        try {
            const response = await getAllProduits();
            return {data:response.data.produits};
        } catch (error) {
            console.log(error);
        }
    }
);
export const searchProduits  = createAsyncThunk(
  "produits/searchProduits ",
  async ({ words, page }) => {
    try {
      const response = await search(words, page);
      return {data:response.data.produits.data,totalPages:response.data.produits.totalPages};
    } catch (error) {
      console.log(error);
    }
  }
);
export const addProduit = createAsyncThunk(
  "produits/addProduit",
  async (produit) => {
    try {
      const response = await saveProduits(produit);
      console.log(response.data.produit)
      return response.data.produit;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addproductQuantite = createAsyncThunk(
  "produits/addproductQuantite",
  async ({qte_entree, produitId, fournisseur_id}) => {
    try {
      const response = await addQuantite(qte_entree, produitId, fournisseur_id);
      return response.data.produit;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateProduit = createAsyncThunk(
  "produits/updateProduit",
  async ({produit}) => {
    try {
      const response = await editProduits(produit);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeProduit = createAsyncThunk(
  "produits/removeProduit",
  async (produit) => {
    try {
      const response = await deleteProduits(produit.id);
      return produit;
    } catch (error) {
      console.error(error);
    }
  }
);
const ProduitSlice = createSlice({
  name: "produit",
  initialState: {
    produits: [],
    produit: {},
    totalPages:null,
    status: "",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduits.fulfilled, (state, action) => {
        state.produits = action.payload.data;
        state.totalPages = action.payload.totalPages
      })
        .addCase(fetchAllProduits.fulfilled, (state, action) => {
            state.produits = action.payload.data;
        })
      .addCase(searchProduits.fulfilled, (state, action) => {
        state.totalPages = action.payload.totalPages
        state.produits = action.payload.data;
      })
      .addCase(addProduit.fulfilled, (state, action) => {
        state.produits.push(action.payload);
      })
      .addCase(addproductQuantite.fulfilled, (state, action)=>{
        console.log(action.payload.id)
        state.produits = state.produits.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
      // console.log(state.produits)
      })
      .addCase(updateProduit.fulfilled, (state, action) => {
        state.produits = state.produits.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        );
        console.log(state.produits)

      })
      .addCase(removeProduit.fulfilled, (state, action) => {
        state.produits = state.produits.filter(
          (item) => item.id !== action.payload.id
        );
      });
  },
});
export const selectProduits = (state) => state.produit.produits;
export const selectProduit = (state) => state.produit.produit;
export const totalPages = (state) => state.produit.totalPages;
export const produit = ProduitSlice.reducer;
