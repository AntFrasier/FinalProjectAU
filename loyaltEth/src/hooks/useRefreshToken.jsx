import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get("/refresh", {
            withCredentials: true
        });
        setAuth(prev => {
            prev.user.accessToken = response.data.accessToken;
            return { ...prev } 
        });
        return response.data.accessToken
    }

    return refresh;
}

export default useRefreshToken;