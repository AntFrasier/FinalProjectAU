import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get("/refresh", {
            withCredentials: true
        });
        setAuth(prev => {
            console.log("prev in auth", JSON.stringify(prev.user.accessToken));
            // console.log("response", response.data.accessToken);
            // let next = prev;
            prev.user.accessToken = response.data.accessToken;
            console.log("prev after update in auth", JSON.stringify(prev.user.accessToken));
            return { ...prev } 
        });
        return response.data.accessToken
    }

    return refresh;
}

export default useRefreshToken;