import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Login = () => {
  const accessToken =
    typeof window !== "undefined" && sessionStorage.getItem("accessToken");
  const [url, setUrl] = useState();
  const router = useRouter();
  const code = router.query.code;

  const getUrl = async () => {
    const result = await axios.get("/api/auth/login");
    setUrl(result.data.loginUrl);
  };

  const getAccessToken = async (code) => {
    const result = await axios.post("/api/auth/access_token", { code });

    console.log(result);

    if (typeof window !== "undefined") {
      sessionStorage.setItem("accessToken", result.data.accessToken);
      sessionStorage.setItem("refreshToken", result.data.refreshToken);
      sessionStorage.setItem("expiresIn", result.data.expiresIn);
      sessionStorage.setItem("currentUser", JSON.stringify(result.data.currentUser));
    }

    router.push("/");
  };

  useEffect(() => {
    if (accessToken) {
      router.push("/");
    }

    getUrl();

    if (code) {
      getAccessToken(code);
    }
  }, [code]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="h-screen bg-base-100 flex items-center justify-center">
        <div className="flex flex-col space-y-4 items-center">
          {url && (
            <a href={url} className="btn btn-success text-white rounded-full">
              Login with Spotify
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
