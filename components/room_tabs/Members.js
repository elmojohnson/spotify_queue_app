import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MemberItem from "../MemberItem";
import SearchUser from "../SearchUser";

const Members = () => {
  const router = useRouter();
  const [members, setMembers] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getMembers = async () => {
    setLoading(true);
    const result = await axios.get(`/api/members?roomId=${router.query.id}`);

    try {
      setMembers(result.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    router.isReady && getMembers();
  }, [router]);
  return (
    <div className="flex flex-col space-y-4">
      <div className="collapse collapse-plus bg-white rounded-lg">
        <input type="checkbox" className="peer" />
        <div className="collapse-title">Add new member</div>
        <div className="collapse-content">
          <SearchUser />
        </div>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col space-y-4">
          {members.map((member, i) => {
            return (
              <MemberItem
                key={member.id}
                userId={member.userId}
                roomId={member.roomId}
                name={member.User.displayName}
                avatar={member.User.avatar}
                spotifyId={member.User.spotifyId}
                isHost={member.userId === member.Room.hostId}
                hostId={member.Room.hostId}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Members;
