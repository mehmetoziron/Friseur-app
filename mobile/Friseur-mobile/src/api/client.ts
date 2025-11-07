import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const client = axios.create({
    baseURL: "http://192.168.0.227:4000", // Replace with your API base URL
});

client.interceptors.request.use(
    async config => {
        const user = await AsyncStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            if (parsedUser.token){
                config.headers.Authorization = `Bearer ${parsedUser.token}`;
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);  


client.interceptors.response.use(
    response =>{
        const {data ,errors}= response.data;
        if (errors &&errors.legnth > 0) {
            return Promise.reject({message:errors.join(', '),raw:response.data});
        } 
        return data;
    },
    error => {
        Promise.reject({error});
    }
);

export default client;