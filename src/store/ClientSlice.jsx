import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    deleteClients,
    editClient,
    getClientByFirstNameAndLastName,
    getClients,
    saveClient
} from "../services/clientService.jsx";
import {toast} from "react-toastify";


export const fetchClients = createAsyncThunk(
    "client/fetchClients",
    async (page) => {
        try {
            const response = await getClients(page);
            if (response.data && response.data.clients && response.data.clients.data && response.data.clients.totalPages) {
                return { data: response.data.clients.data, totalPages: response.data.clients.totalPages };
            }
        } catch (error) {
            console.log(error);
        }
    }
);
export const searchClient = createAsyncThunk(
    "client/searchClient",
    async ({firstName,lastName}) => {
        try {
            const response = await getClientByFirstNameAndLastName(firstName,lastName);
            return {data:response.data.client.data,totalPages:response.data.client.totalPages};
        } catch (error) {
            console.log(error);
        }
    }
);
export const addClient = createAsyncThunk(
    "client/addClients",
    async (client,{ rejectWithValue }) => {
        try {
            const response = await saveClient(client);
            console.log(response.data)
            return response.data.client;
        } catch (error) {
            console.error(error);

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

export const updateClient = createAsyncThunk(
    "client/updateClient",
    async (client) => {
        try {
            const response = await editClient(client);
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const removeClient = createAsyncThunk(
    "client/deleteClient",
    async (client) => {
        try {
            const response = await deleteClients(client);
            return client;
        } catch (error) {
            console.error(error);
        }
    }
);
const clientSlice = createSlice({
    name: "client",
    initialState: {
        clients: [],
        client: {},
        totalPages:null,
        status: "",
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchClients.fulfilled, (state, action) => {
                if (action.payload && action.payload.data) {
                    state.totalPages = action.payload.totalPages;
                    state.clients = action.payload.data;
                }
            })
            .addCase(searchClient.fulfilled, (state, action) => {
                state.totalPages = action.payload.totalPages
                state.clients = action.payload.data;
            })
            .addCase(addClient.fulfilled, (state, action) => {
                console.log(action.payload)
                state.clients.push(action.payload);
                toast.success('Client ajouter avec succes');
            })
            .addCase(updateClient.fulfilled, (state, action) => {
                console.log(action.payload)
                state.clients = state.clients.map((item) =>
                    item.id === action.payload.id ? { ...item, ...action.payload } : item
                );
                toast.success('Client modifier avec succes' || 'Client modifier avec succes');
            })
            .addCase(removeClient.fulfilled, (state, action) => {
                state.clients = state.clients.filter(
                    (item) => item.id !== action.payload.id
                );
                toast.success('Client supprimer avec succes' || 'Client supprimer avec succes');
            });
    },
});
export const selectClients = (state) => state.client.clients;
export const selectClient = (state) => state.client.client;
export const totalPages = (state) => state.client.totalPages;
export const client = clientSlice.reducer;
