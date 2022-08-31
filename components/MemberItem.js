import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";

const MemberItem = ({
  userId,
  roomId,
  name,
  avatar,
  spotifyId,
  isHost,
  hostId,
}) => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const [isRemoving, setRemoving] = useState(false);
  const [isRemoved, setRemoved] = useState(false);

  const removeUser = async () => {
    setRemoving(true);
    const result = await axios.post("/api/members/remove", { userId, roomId });

    try {
      console.log(result.data);
      setRemoved(true);
    } catch (error) {
      console.error(error);
    }

    setRemoving(false);
    router.reload();
  };

  return (
    <div className="card card-compact bg-white">
      <div className="card-body">
        <div className="flex flex-row space-x-2">
          <img src={avatar} alt={name} className="rounded-full w-16" />
          <div className="flex flex-col flex-1">
            <h5 className="font-semibold text-lg">{`${name} ${
              isHost ? "(Host)" : ""
            }`}</h5>
            <span>{spotifyId}</span>
          </div>

          {currentUser.id === hostId ? (
            <button className={`btn btn-sm btn-error ${isRemoving && "loading"}`} disabled={isHost || isRemoving || isRemoved} onClick={removeUser}>
              Remove
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MemberItem;
