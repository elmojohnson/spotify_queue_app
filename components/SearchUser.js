import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SearchUserItem from "../components/SearchUserItem";

const SearchUser = () => {
  const router = useRouter();

  const [roomId, setRoomId] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState({
    id: 0,
    name: "",
    avatar: "",
    spotifyId: "",
    isMember: false,
  });

  const searchUser = async () => {
    setLoading(true);

    const result = await axios.post("/api/members/search_user", {
      id: searchInput,
      roomId: roomId,
    });

    try {
      setUser({
        id: result.data.user.id,
        name: result.data.user.displayName,
        avatar: result.data.user.avatar,
        spotifyId: result.data.user.spotifyId,
        isMember: result.data.isMember,
      });
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    router.isReady && setRoomId(router.query.id);
  }, [router]);

  return (
    <div className="py-2 flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="User ID"
          className="input input-bordered w-full bg-white"
          disabled={isLoading}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          className={`btn btn-success ${isLoading && "loading"}`}
          disabled={isLoading}
          onClick={searchUser}
        >
          Search
        </button>
      </div>
      {user.name && (
        <SearchUserItem
          id={user.id}
          name={user.name}
          avatar={user.avatar}
          spotifyId={user.spotifyId}
          isMember={user.isMember}
        />
      )}
    </div>
  );
};

export default SearchUser;
