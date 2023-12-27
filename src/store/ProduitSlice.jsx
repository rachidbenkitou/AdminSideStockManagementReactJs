import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    deleteProduits,
    getProduits,
    saveProduits,
    editProduits,
    addQuantite,
    search, getAllProduits
} from "../services/produitService";
import { toast } from "react-toastify";

export const fetchProduits = createAsyncThunk(
  "produits/fetchProduits",
  async (page) => {
    try {
      const response = await getProduits(page);
      console.log(response.data.produits.data)
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
  async (produit, {rejectWithValue}) => {
    try {
      const response = await saveProduits(produit);
      console.log(response.data.produit)
      return response.data.produit;
    } catch (error) {
      if (error.response?.status === 422) {
        const validationErrors = error.response.data.erreurs;

        Object.values(validationErrors).forEach((error) => {
          toast.error(error[0] || "Erreur de validation");
        });
      } else if(error.response?.status === 409){
        toast.error(
          error.response?.data.message ||
            "Une erreur s'est produite lors de l'ajout du produit"
        );
      }else{
        toast.error(
          error.response?.data.message ||
            "Une erreur s'est produite lors de l'ajout du produit"
        );
      }
      return rejectWithValue(error.response?.data);
    
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
        toast.success('Produit ajouté avec succès');
      })
      .addCase(addproductQuantite.fulfilled, (state, action)=>{
        console.log(action.payload.id)
        state.produits = state.produits.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
      toast.success('Quantite ajouté avec succès');
      })
      .addCase(updateProduit.fulfilled, (state, action) => {
        state.produits = state.produits.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        );
        console.log(state.produits)
        toast.success('Produit modifier avec succès');
      })
      .addCase(removeProduit.fulfilled, (state, action) => {
        state.produits = state.produits.filter(
          (item) => item.id !== action.payload.id
        );
        toast.success('Produit supprimé avec succès');
      });
  },
});
export const selectProduits = (state) => state.produit.produits;
export const selectProduit = (state) => state.produit.produit;
export const totalPages = (state) => state.produit.totalPages;
export const produit = ProduitSlice.reducer;
