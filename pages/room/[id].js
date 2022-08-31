import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

import Wrapper from "../../layouts/Wrapper";
import Tracks from "../../components/room_tabs/Tracks";
import Search from "../../components/room_tabs/Search";
import Members from "../../components/room_tabs/Members";
import Info from "../../components/room_tabs/Info";
import AuthContext from "../../contexts/AuthContext";

const Room = () => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const [room, setRoom] = useState({
    roomName: "",
    hostId: 0,
  });
  const [isLoading, setLoading] = useState(false);

  // Tabs
  const [activeTab, setActiveTab] = useState(typeof window !== "undefined" && sessionStorage.getItem("activeRoomTab") || 0);
  const tabs = [
    {
      name: "Tracks",
      component: <Tracks isHost={currentUser.id === room.hostId} />,
    },
    {
      name: "Search",
      component: <Search />,
    },
    {
      name: "Members",
      component: <Members />,
    },
    {
      name: "Info",
      component: <Info isHost={currentUser.id === room.hostId} />,
    }
  ];

  // Get room info
  const getRoom = async () => {
    console.log("ID: " + router.query.id)
    setLoading(true);
    const result = await axios.get(`/api/rooms/${router.query.id}`);

    try {
      !result.data && router.push("/");
      setRoom({
        roomName: result.data.roomName,
        hostId: result.data.hostId,
      });
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  // Change tab
  const changeTab = (i) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("activeRoomTab", i);
      setActiveTab(i);
    }
  };

  useEffect(() => {
    router.isReady && getRoom();
  }, [router]);

  return (
    <Wrapper title={room.roomName}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="tabs tabs-boxed sticky top-2 z-50">
            {tabs.map((tab, i) => {
              return (
                <a
                  className={`tab ${i == activeTab && "tab-active"}`}
                  key={i}
                  onClick={() => changeTab(i)}
                >
                  {tab.name}
                </a>
              );
            })}
          </div>
          <div className="py-4">{tabs[activeTab].component}</div>
        </>
      )}
    </Wrapper>
  );
};

export default Room;
