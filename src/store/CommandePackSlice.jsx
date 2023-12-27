import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    deleteClients,
    editClient,
    getClientByFirstNameAndLastName,
    getClients,
    saveClient
} from "../services/clientService.jsx";
import {editCommandeStatus, getCommande, getCommands} from "../services/commandeService.jsx";
import {getCommandePack, getPacksCommandes} from "../services/commandePackeService.jsx";
import {searchCommande, updateCommandeStatus} from "./CommandeSlice.jsx";


export const fetchCommandePack = createAsyncThunk(
    "commandePack/fetchcommandePack",
    async (page) => {
        try {
            const response = await getPacksCommandes(page);

            return { data: response.data.commandes.data, totalPages: response.data.commandes.totalPages };

        } catch (error) {
            console.log(error);
        }
    }
);
export const searchCommandePack = createAsyncThunk(
    "commandePack/searchCommandePack",
    async (commande_date) => {
        try {
            const response = await getCommandePack(commande_date);
            return {data:response.data.commande.data,totalPages:response.data.commande.totalPages};
        } catch (error) {
            console.log(error);
        }
    }
);
// export const addClient = createAsyncThunk(
//     "client/addClients",
//     async (client) => {
//         try {
//             const response = await saveClient(client);
//             console.log(response.data)
//             return response.data.client;
//         } catch (error) {
//             console.log(error);
//         }
//     }
// );

export const updateCommandePackStatus = createAsyncThunk(
    "commandePack/updateCommandePack",
    async (commandePack) => {
        try {

            const response = await editCommandeStatus(commandePack);
            console.log(response.data.data)
            return response.data.data;

        } catch (error) {
            console.log(error);
        }
    }
);
//
// export const removeClient = createAsyncThunk(
//     "client/deleteClient",
//     async (client) => {
//         try {
//             const response = await deleteClients(client);
//             return client;
//         } catch (error) {
//             console.error(error);
//         }
//     }
// );
const commandePackSlice = createSlice({
    name: "commandePack",
    initialState: {
        commandePacks: [],  // Assurez-vous que cette propriété est initialisée comme un tableau vide
        commandePack: {},
        totalPages: null,
        status: "",
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommandePack.fulfilled, (state, action) => {
                if (action.payload && action.payload.data) {
                    state.totalPages = action.payload.totalPages;
                    state.commandePacks = action.payload.data;
                    console.log(action.payload.data);
                }
            })
            .addCase(searchCommandePack.fulfilled, (state, action) => {
                state.totalPages = action.payload.totalPages
                state.commandePacks = action.payload.data;
                console.log(action.payload.totalPages)
                console.log(action.payload.data)
            })
            .addCase(updateCommandePackStatus.fulfilled, (state, action) => {
                if (action.payload ) {
                    console.log(action.payload)
                    state.commandePacks = state.commandePacks.map((item) =>
                        item.id === action.payload.id ? { ...item, ...action.payload } : item
                    );}
            })

    },
});
export const selectCommandePacks = (state) => state.commandPack.commandePacks;
export const selectCommandePack = (state) => state.commandPack.commandePack;
export const totalPages = (state) => state.commandPack.totalPages;
export const commandPack = commandePackSlice.reducer;
