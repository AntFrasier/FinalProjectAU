import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        console.log("auth :",auth)
        const accessToken = JSON.parse(localStorage.getItem("connectedUser"))?.accessToken;
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers["authorization"]) {
                    config.headers["authorization"] = `Bearer ${accessToken}`; //not sure 
                    console.log("i'm in the config", config.headers["authorization"])
                }
                return config;

            }, (err) => Promise.reject(err)
        );
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (err) => {
                const prevRequest = err?.config;
                if(err?.response?.status === 403 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers["authorization"] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(err);
            }
        );


            return () => {
                axiosPrivate.interceptors.response.eject(responseIntercept)
                axiosPrivate.interceptors.request.eject(requestIntercept)
            }
    },[auth, refresh])
    return axiosPrivate;
}

export default useAxiosPrivate;
