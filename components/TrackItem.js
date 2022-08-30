import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { MdVerified } from "react-icons/md";
import moment from "moment";

const TrackItem = ({
  id,
  name,
  artists,
  album,
  albumImg,
  uri,
  requestedBy,
  isRequest,
  isHost,
  isApproved,
  addedAt
}) => {
  const router = useRouter();
  const { currentUser, accessToken } = useContext(AuthContext);

  const [isAdding, setAdding] = useState(false);
  const [isAdded, setAdded] = useState(false);

  const [isQueueing, setQueueing] = useState(false);
  const [isQueued, setQueued] = useState(false);

  const addTrack = async () => {
    setAdding(true);

    const track = await axios.post("/api/tracks/request_track", {
      name,
      artists,
      album,
      albumImg,
      roomId: router.query.id,
      userId: currentUser.id,
      uri,
      user: currentUser.displayName,
    });

    try {
      console.log(track.data);
      setAdded(true);
    } catch (error) {
      console.log(error);
    }

    setAdding(false);
  };

  const queueTrack = async () => {
    setQueueing(true);
    const result = await axios.post("/api/tracks/queue", { id, accessToken: typeof window !== "undefined" && sessionStorage.getItem("accessToken") });

    try {
      console.log(result.data);
      setQueued(true);
    } catch (error) {
      console.error(error);
    }
    setQueueing(false);
  };

  return (
    <div className="card card-compact bg-white">
      <div className="card-body">
        <div className="flex flex-row space-x-2 items-start">
          <img src={albumImg} className="w-16" />
          <div className="flex flex-col flex-1">
            <h5 className="font-semibold text-lg text-primary flex items-center space-x-1">
              {isApproved && <MdVerified className="text-success" />}
              <span>{name}</span>
            </h5>
            <p>{artists}</p>
            {requestedBy && (
              <small className="text-gray-400">
                Requested by: <b>{requestedBy}</b> {moment(addedAt).fromNow()}
              </small>
            )}
          </div>

          {isRequest && (
            <button
              className={`btn btn-success btn-sm ${isAdding && "loading"}`}
              disabled={isAdded || isAdding}
              onClick={addTrack}
            >
              {isAdded ? "Requested" : "Request"}
            </button>
          )}

          {isHost && (
            <button
              className={`btn btn-sm ${isQueueing && "loading"}`}
              disabled={isQueued || isQueueing || isApproved}
              onClick={queueTrack}
            >
              {isQueued || isApproved ? "Queued" : "Add to queue"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackItem;
