import {instance} from "../apis/AxiosInstance.js";




export const getPacksCommandes = async (page)=> {
    return await instance.get(`commandepacks?page=${page}`);
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
export const getCommandePack = async (commande_date)=> {
    return instance.get(`commandepacks/date_commande/${commande_date}`);
}
// export const editCommandeStatus = (commande)=> {
//     console.log(commande)
//     return instance.put(`commandes/${commande.id}`,commande);
// }

