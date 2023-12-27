import {instance} from "../apis/AxiosInstance.js";




export const getPacks= async (page)=> {
    return await instance.get(`packProduits?page=${page}`);
}
export const deletePack = (pack)=> {
    return instance.delete(`packs/${pack.id}`);
}
export const deleteProduitFromPack = (packId,produitId)=> {
    return instance.delete(`packProduits/${packId}/${produitId}`);
}
export const getPack = async (codePack)=> {
    return instance.get(`packProduits/codePack/${codePack}`);
}
// export const getClientByFirstNameAndLastName = async (firstName,lastName)=> {
//     return instance.get(`clients/firstName/${firstName}/lastName/${lastName}`);
//     console.log("testsdfs")
// }
export const savePack = (pack)=> {
    return instance.post(`packs`,pack);
}
export const ajouterProduitToPack = (pack_id,produit_id)=> {

    return instance.post(`packProduits`, { pack_id, produit_id })
        .catch(error => {
            // Ignorer les messages d'erreur spécifiques que vous ne souhaitez pas voir dans la console
            if (!error.message.includes('400 (Bad Request)')) {
                console.error("Erreur de la requête :", error);
            }

            // Vous pouvez ajouter un traitement supplémentaire ici si nécessaire
            throw error; // Rejeter la promesse avec l'erreur pour que le composant puisse la gérer
        });


}

export const editPack = (pack)=> {
    console.log(pack)
    return instance.put(`packs/${pack.id}`,pack);
}

