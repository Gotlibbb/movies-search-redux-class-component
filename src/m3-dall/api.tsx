import axios from  "axios";

const instance = {
    baseURL: 'https://www.omdbapi.com/',

};
const apikey = '&apikey=ff4140ae';
const axiosInstance = axios.create(instance);


export const api = {

    getFilmsByName: (name: string|undefined, page :string="1" ) => axiosInstance.get(`?s=${name}&page=${page}${apikey}`).then(res=>res.data),

    getFilmByImdbId: (id: string) => axiosInstance.get(`?i=${id}${apikey}`).then(res=>res),

};

