import { useRouter } from "next/router";
import React, { useState } from "react";

const Info = () => {
  const router = useRouter();
  const [isDeleting, setDeleting] = useState(false);

  const deleteRoom = async () => {
    setDeleting(true);

    setDeleting(false);
  };

  return (
    <div>
      <button
        className={`btn btn-sm btn-outline ${isDeleting && "loading"}`}
        onClick={deleteRoom}
        disabled={isDeleting}
      >
        Delete room
      </button>
    </div>
  );
};

export default Info;
