import { useRouter } from "next/router";
import React, { useState } from "react";
import axios from "axios";

const Info = ({ isHost }) => {
  const router = useRouter();
  const [isDeleting, setDeleting] = useState(false);

  const deleteRoom = async () => {
    setDeleting(true);

    const result = await axios.post("/api/rooms/delete", {roomId: router.query.id});

    try {
      console.log(result.data);
      router.push("/");
    } catch (error) {
      console.log(error);
    }

    setDeleting(false);
  };

  return (
    <div>
      {isHost && (
        <button
          className={`btn btn-sm btn-outline ${isDeleting && "loading"}`}
          onClick={deleteRoom}
          disabled={isDeleting}
        >
          Delete room
        </button>
      )}
    </div>
  );
};

export default Info;
