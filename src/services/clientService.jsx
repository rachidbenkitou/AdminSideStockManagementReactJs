import {instance} from "../apis/AxiosInstance.js";




export const getClients = async (page)=> {
    return await instance.get(`clients?page=${page}`);
}
export const deleteClients = (client)=> {
    return instance.delete(`clients/${client.id}`);
}
export const getClient = async (id)=> {
    return instance.get(`clients/id/${id}`);
}
export const getClientByFirstNameAndLastName = async (firstName,lastName)=> {
    return instance.get(`clients/firstName/${firstName}/lastName/${lastName}`);
    console.log("testsdfs")
}
export const saveClient = (client)=> {
    return instance.post(`registerClient`,client);
}

export const editClient = (client)=> {
    console.log(client)
    return instance.put(`clients/${client.id}`,client);
}

