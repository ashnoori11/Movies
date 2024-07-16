import axios from "axios";
import { getToken } from "../auth/handleJwt";
import Authorized from '../auth/Authorized';

export default function configureInterceptors() {
    axios.interceptors.request.use(
        function (config) {
            const token = getToken();
            if (token) {
                config.headers.Authorization = `bearer ${token}`;
            }

            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );
}