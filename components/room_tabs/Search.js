import axios from "axios";
import React, { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import TrackItem from "../TrackItem";

const Search = () => {
  const { accessToken } = useContext(AuthContext);

  const [searchInput, setSearchInput] = useState("");
  const [tracks, setTracks] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const searchTracks = async () => {
    if (searchInput) {
      setLoading(true);
      const result = await axios.post("/api/tracks/search", {
        accessToken,
        search: searchInput,
      });

      console.log(result.status);

      try {
        setTracks(result.data.body.tracks.items);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <input
          className="input input-bordered w-full bg-white"
          type="text"
          placeholder="Search Tracks"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          className={`btn btn-success ${isLoading && "loading"}`}
          onClick={searchTracks}
          disabled={isLoading}
        >
          Search
        </button>
      </div>
      <div className="flex flex-col space-y-4">
        {tracks.map((track, i) => {
          return (
            <TrackItem
              key={track.id}
              name={track.name}
              artists={track.artists.map((a, i) => a.name).join(", ")}
              album={track.album.name}
              albumImg={track.album.images[2].url}
              uri={track.uri}
              isRequest={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Search;
