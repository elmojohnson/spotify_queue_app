import { createContext } from "react";

const AuthContext = createContext({
    accessToken: typeof window !== "undefined" && sessionStorage.getItem("accessToken"),
    refreshToken: typeof window !== "undefined" && sessionStorage.getItem("refreshToken"),
    expiresIn: typeof window !== "undefined" && sessionStorage.getItem("expiresIn"),
    currentUser: typeof window !== "undefined" && JSON.parse(sessionStorage.getItem("currentUser"))
});

export default AuthContext;