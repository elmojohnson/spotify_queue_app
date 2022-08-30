import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Container from "../components/Container";

import AuthContext from "../contexts/AuthContext";
import axios from "axios";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Wrapper = ({ children, title }) => {
  const router = useRouter();

  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    if (!sessionStorage.getItem("accessToken")) {
      router.push("/login");
    }
    // Set credentials if existed
    setAccessToken(
      typeof window !== "undefined" && sessionStorage.getItem("accessToken")
    );
    setRefreshToken(
      typeof window !== "undefined" && sessionStorage.getItem("refreshToken")
    );
    setExpiresIn(
      typeof window !== "undefined" && sessionStorage.getItem("expiresIn")
    );
    setCurrentUser(
      typeof window !== "undefined" &&
        JSON.parse(sessionStorage.getItem("currentUser"))
    );
  }, [accessToken]);

  useEffect(() => {
    // Interceptor
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalConfig = error.config;
        const status = error?.response?.status;

        if (status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          // Refresh Token
          const result = await axios.post("/api/auth/refresh_token", {
            refreshToken:
              typeof window !== "undefined" &&
              sessionStorage.getItem("refreshToken"),
          });

          try {
            setAccessToken(
              typeof window !== "undefined" &&
                sessionStorage.setItem("accessToken", result.data.accessToken)
            );
            console.log(result);
            if (result.status === 200) {
              return axios(originalConfig);
            }
          } catch (error) {
            console.log(error);
          }
        }

        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, expiresIn, currentUser }}
    >
      {accessToken && (
        <>
          <Head>
            <title>{title || "App"}</title>
          </Head>
          <div className="drawer drawer-mobile h-screen bg-base-100">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
              <Navbar title={title} />
              <Container>
                <div className="py-4">{children}</div>
              </Container>
            </div>
            <Sidebar />
          </div>
          <ToastContainer position="top-right" autoClose={3000} limit={3} />
        </>
      )}
    </AuthContext.Provider>
  );
};

export default Wrapper;
