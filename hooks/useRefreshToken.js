import axios from "axios";

const useRefreshToken = async (originalConfig) => {
  const result = await axios.post("/api/auth/refresh_token", {
    refreshToken: typeof window !== "undefined" && sessionStorage.getItem("refreshToken"),
  });

  try {
    typeof window !== "undefined" &&
      sessionStorage.setItem("accessToken", result.data.accessToken);
    console.log(result);
    return axios(originalConfig)
  } catch (error) {
    console.log(error);
  }
};

export default useRefreshToken;
