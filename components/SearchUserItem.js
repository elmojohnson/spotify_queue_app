import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SearchUserItem = ({ id, name, avatar, spotifyId, isMember }) => {
  const router = useRouter();
  const [roomId, setRoomId] = useState(0);
  const [isAdded, setAdded] = useState(false);
  const [isAdding, setAdding] = useState(false);

  const addUser = async () => {
    setAdding(true);

    const result = await axios.post("/api/members/add", {
      userId: id,
      roomId,
    });

    try {
      console.log(result);
      setAdded(true);
    } catch (error) {
      console.error(error);
    }

    setAdding(false);
  };

  useEffect(() => {
    router.isReady && setRoomId(router.query.id);
  }, [router]);

  return (
    <div className="flex flex-row space-x-2">
      <img src={avatar} alt={name} className="rounded-full w-16" />
      <div className="flex flex-col flex-1">
        <h5 className="font-semibold text-lg">{name}</h5>
        <span>{spotifyId}</span>
      </div>

      {!isMember && (
        <button
          className={`btn btn-sm ${isAdding && "loading"}`}
          disabled={isAdding || isAdded}
          onClick={addUser}
        >
          Add
        </button>
      )}
    </div>
  );
};

export default SearchUserItem;
