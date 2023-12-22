import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    deleteClients,
    editClient,
    getClientByFirstNameAndLastName,
    getClients,
    saveClient
} from "../services/clientService.jsx";
import {editCommandeStatus, getCommande, getCommands} from "../services/commandeService.jsx";


export const fetchCommands = createAsyncThunk(
    "command/fetchCommands",
    async (page) => {
        try {
            const response = await getCommands(page);

                return { data: response.data.commandes.data, totalPages: response.data.commandes.totalPages };


        } catch (error) {
            console.log(error);
        }
    }
);
export const searchCommande = createAsyncThunk(
    "commande/searchCommande",
    async (commande_date) => {
        try {
            const response = await getCommande(commande_date);
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
//
export const updateCommandeStatus = createAsyncThunk(
    "command/updateCommand",
    async (commande) => {
        try {

            const response = await editCommandeStatus(commande);
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
const commandSlice = createSlice({
    name: "command",
    initialState: {
        commands: [],
        command: {},
        totalPages:null,
        status: "",
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommands.fulfilled, (state, action) => {
                if (action.payload && action.payload.data) {
                    state.totalPages = action.payload.totalPages;
                    state.comands = action.payload.data;
                }
            })
            .addCase(searchCommande.fulfilled, (state, action) => {
                state.totalPages = action.payload.totalPages
                state.comands = action.payload.data;
                console.log(action.payload.totalPages)
                console.log(action.payload.data)
            })
            // .addCase(addClient.fulfilled, (state, action) => {
            //     console.log(action.payload)
            //     state.clients.push(action.payload);
            // })
            .addCase(updateCommandeStatus.fulfilled, (state, action) => {
                if (action.payload ) {
                console.log(action.payload)
                state.comands = state.comands.map((item) =>
                    item.id === action.payload.id ? { ...item, ...action.payload } : item
                );}
            })
            // .addCase(removeClient.fulfilled, (state, action) => {
            //     state.clients = state.clients.filter(
            //         (item) => item.id !== action.payload.id
            //     );
            // });
    },
});
export const selectCommands = (state) => state.command.comands;
export const selectCommand = (state) => state.command.commands;
export const totalPages = (state) => state.command.totalPages;
export const command = commandSlice.reducer;
