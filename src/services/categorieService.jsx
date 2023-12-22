import {instance} from "../apis/AxiosInstance.js";


export const getCategories = async (page)=> {
    return await instance.get(`categories?page=${page}`);
}

export const getAllCategories = async ()=> {
    return await instance.get(`categories/all`);
}

export const search = async (search, page)=> {
    return await instance.get(`categories/nom/${search}?page=${page}`);
}

export const saveCategories = async (categorie)=> {
    return await instance.post('categories',categorie);
}

export const editCategories = async (categorie)=> {
    return await instance.put(`categories/${categorie.id}`,categorie);
}
export const deleteCategories = async (id)=> {
    return await instance.delete(`categories/${id}`);
}