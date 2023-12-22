import {instance} from "../apis/AxiosInstance.js";




export const getCommands = async (page)=> {
    return await instance.get(`commandes?page=${page}`);
}
// export const deleteClients = (client)=> {
//     return instance.delete(`clients/${client.id}`);
// }
// export const getClient = async (id)=> {
//     return instance.get(`clients/id/${id}`);
// }
// export const getClientByFirstNameAndLastName = async (firstName,lastName)=> {
//     return instance.get(`clients/firstName/${firstName}/lastName/${lastName}`);
//     console.log("testsdfs")
// }
// export const saveClient = (client)=> {
//     return instance.post(`clients`,client);
// }
//
export const getCommande = async (commande_date)=> {
    return instance.get(`commandes/date_commande/${commande_date}`);
}
export const editCommandeStatus = (commande)=> {
    console.log(commande)
    return instance.put(`commandes/${commande.id}`,commande);
}

