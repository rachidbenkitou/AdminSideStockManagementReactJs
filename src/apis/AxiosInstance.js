import axios from "axios";
import Cookie from 'cookie-universal';

export const instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
});

// Ajout d'un intercepteur pour les requêtes sortantes
instance.interceptors.request.use(
    async (config) => {
        // Récupération du token de manière asynchrone
        const token = await getToken();

        // Ajout du token aux en-têtes de la requête
        config.headers['Authorization'] = `Bearer ${token}`;

        return config;
    },
    (error) => {
        // Gestion des erreurs de requête
        return Promise.reject(error);
    }
);

// Fonction pour obtenir le token à partir des cookies
async function getToken() {
    const cookies = Cookie();
    const loginToken = cookies.get('login_token');
    return loginToken || '';
}

