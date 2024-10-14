import axios from "../api/axios";
import { useAuth } from "./useAuth";

export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return { ...prev, ...response.data.data };
    });
    return response.data.data.accessToken;
  };
  return refresh;
};
