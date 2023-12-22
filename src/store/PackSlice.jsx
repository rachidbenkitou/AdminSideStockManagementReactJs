import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    ajouterProduitToPack,
    deletePack,
    deleteProduitFromPack,
    editPack,
    getPack,
    getPacks,
    savePack
} from "../services/packService.jsx";
import {updateClient} from "./ClientSlice.jsx";
import {searchFournisseur} from "./FournisseurSlice.jsx";
import {toast} from "react-toastify";




export const fetchPacks = createAsyncThunk(
    "pack/fetchPacks",
    async (page) => {
        try {
            const response = await getPacks(page);
            console.log(response)
            if (response.data && response.data.packs && response.data.packs.data && response.data.packs.totalPages) {
                return { data: response.data.packs.data, totalPages: response.data.packs.totalPages };
            }
        } catch (error) {
            console.log(error);
        }
    }
);
export const searchPack = createAsyncThunk(
    "pack/searchPack",
    async (codePack) => {
        try {
            const response = await getPack(codePack);
            console.log(response.data.pack)
            return {data:response.data.pack.data,totalPages:response.data.pack.totalPages};
        } catch (error) {
            console.log(error);
        }
    }
);
export const addPack = createAsyncThunk(
    "pack/addPacks",
    async (pack) => {
        try {
            const response = await savePack(pack);
            console.log(response.data.produit)
            return response.data.produit;
        } catch (error) {
            console.log(error);
            if (error.response?.status === 422) {
                const validationErrors = error.response.data.errors;

                Object.values(validationErrors).forEach((error) => {
                    toast.error(error[0] || 'Erreur de validation');
                });
            } else {
                toast.error(error.response?.data.message || 'Une erreur s\'est produite lors de l\'ajout du fournisseur');
            }
            return rejectWithValue(error.response?.data);
        }
    }
);
export const addProduitToPack = createAsyncThunk(
    "pack/addProduitToPack",
    async ({pack_id,produit_id}, { rejectWithValue }) => {
        try {
            const response = await ajouterProduitToPack(pack_id,produit_id);
            console.log(response.data.pack)
            return response.data.pack;

        } catch (error) {
            console.error(error);

            toast.error(error.response.data.message)
        }
    }
);
//
export const updatePack = createAsyncThunk(
    "pack/updatePack",
    async (pack) => {
        try {
            const response = await editPack(pack);
            console.log(response.data.pack)
            return response.data.pack;
        } catch (error) {
            console.log(error);
        }
    }
);

export const removeProduitFromPack = createAsyncThunk(
    "pack/deletePack",
    async ({packId, produitId}) => {
        try {
            console.log(packId)
            console.log(produitId)
            const response = await deleteProduitFromPack(packId,produitId);
            return produitId
        } catch (error) {
            console.error(error);
        }
    }
);
export const removePack = createAsyncThunk(
    "pack/deletPack",
    async (pack) => {
        try {
            const response = await deletePack(pack);
            return pack;
        } catch (error) {
            console.error(error);
        }
    }
);
const packSlice = createSlice({
    name: "pack",
    initialState: {
        packs: [],
        pack: {},
        totalPages:null,
        status: "",
        errorMessage :"",
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPacks.fulfilled, (state, action) => {
                if (action.payload && action.payload.data) {
                    state.totalPages = action.payload.totalPages;
                    state.packs = action.payload.data;
                }
            })
            .addCase(addPack.fulfilled, (state, action) => {

                    console.log(action.payload)
                    state.packs.push(action.payload);
                    toast.success('Pack ajouter avec succes' || 'Ajout avec succes');

            })
            .addCase(addProduitToPack.fulfilled, (state, action) => {
                console.log(action.payload)
                state.packs = state.packs.map((item) =>
                    item.id === action.payload.id ? { ...item, ...action.payload } : item
                );
                toast.success('Produit  ajouter avec succes dans le pack' || 'Ajout avec succes');
                state.errorMessage="";

            })
            // .addCase(addProduitToPack.rejected, (state, action) => {
            //      // state.errorMessage=action.payload;
            //     // toast.error(action.payload || 'Une erreur s\'est produite lors de l\'ajout du produit');
            //     console.log(state.errorMessage)
            //     // Ajoutez une logique supplémentaire ou des modifications d'état en cas de rejet
            // })
            .addCase(updatePack.fulfilled, (state, action) => {
                console.log(action.payload)
                state.packs = state.packs.map((item) =>
                    item.id === action.payload.id ? { ...item, ...action.payload } : item
                );
                toast.success('Pack modifier avec succes' || 'Pack modifier avec succes');
            })
            .addCase(searchPack.fulfilled, (state, action) => {
                state.totalPages = action.payload.totalPages
                state.packs= action.payload.data;
                console.log(action.payload.totalPages)
                console.log(action.payload.data)
            })
            .addCase(removeProduitFromPack.fulfilled, (state, action) => {
                console.log(action.payload)

                state.packs = state.packs.map((pack) => {
                    return {
                        ...pack,
                        produits: pack.produits.filter((p) => p.id !== action.payload),
                    };
                });
                toast.success('Produit supprimer avec succes' || 'Pack supprimer avec succes');
                console.log(state.packs)
            })
            .addCase(removePack.fulfilled, (state, action) => {
                state.packs = state.packs.filter(
                    (item) => item.id !== action.payload.id
                );
                toast.success('Pack supprimer avec succes' || 'Pack supprimer avec succes');
            });
    },
});
export const selectPacks = (state) => state.pack.packs;
export const selectError= (state) => state.pack.errorMessage;
export const selectPack = (state) => state.pack.pack;
export const totalPages = (state) => state.pack.totalPages;
export const pack = packSlice.reducer;
