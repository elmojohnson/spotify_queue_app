import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import TrackItem from "../TrackItem";

const Tracks = ({ isHost }) => {
  const router = useRouter();
  const [tracks, setTracks] = useState([]);
  const [isDeleting, setDeleting] = useState(false);

  const getTracks = async () => {
    const result = await axios.get(`/api/tracks?roomId=${router.query.id}`);
    setTracks(result.data);
  };

  const deleteTracks = async () => {
    setDeleting(true);
    await axios.post("/api/tracks/clear_queue", { roomId: router.query.id });

    try {
      getTracks();
    } catch (error) {
      console.log(error);
    }

    setDeleting(false);
  };

  useEffect(() => {
    router.isReady && getTracks();
  }, [router]);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-start space-x-2">
        <button className="btn btn-success btn-sm" onClick={getTracks}>
          Refresh List
        </button>
        {isHost && (
          <button
            className={`btn btn-error btn-sm ${isDeleting && "loading"}`}
            onClick={deleteTracks}
            disabled={isDeleting}
          >
            Delete queued tracks
          </button>
        )}
      </div>
      <div className="flex flex-col space-y-4">
        {tracks.map((track, i) => {
          return (
            <TrackItem
              key={track.id}
              id={track.id}
              name={track.name}
              artists={track.artists}
              albumImg={track.albumImg}
              requestedBy={track.requestedBy}
              uri={track.uri}
              isHost={isHost}
              isApproved={track.isQueued}
              addedAt={track.addedAt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Tracks;
