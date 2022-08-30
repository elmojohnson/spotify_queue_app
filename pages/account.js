import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import Wrapper from "../layouts/Wrapper";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Account = () => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  return (
    <Wrapper title="Account">
      <div className="card card-compact bg-white">
        <div className="card-body">
          <div className="flex flex-col space-y-4 items-center">
            <img src={currentUser.avatar} className="rounded-full w-24 h-24" />
            <div className="flex flex-col items-center">
              <h3 className="font-bold text-xl text-primary">
                {currentUser.displayName}
              </h3>
              <p>{currentUser.email}</p>
              <div className="flex space-x-2 items-center">
                <span>ID: {currentUser.spotifyId}</span>
                <MdContentCopy
                  className="hover:cursor-pointer hover:text-gray-600"
                  onClick={() => {
                    navigator.clipboard.writeText(currentUser.spotifyId);
                    toast.info("Copied to clipboard!");
                  }}
                />
              </div>
            </div>
            <button className="btn btn-sm btn-outline"
            onClick={() => {
              sessionStorage.clear();
              router.push("/login")
            }}
            >Logout</button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Account;
