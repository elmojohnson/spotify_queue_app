import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

import { MdAdd, MdHome, MdPerson } from "react-icons/md";
import { GrSpotify } from "react-icons/gr";
import AuthContext from "../contexts/AuthContext";

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext);

  // Main navigation
  const mainRoute = [
    {
      name: "Home",
      path: "/",
      icon: <MdHome />,
    },
    {
      name: "Create Room",
      path: "/room/create",
      icon: <MdAdd />,
    },
    {
      name: "Account",
      path: "/account",
      icon: <MdPerson />,
    },
  ];

  // Room Navigation
  const [roomRoute, setRoomRoute] = useState([]);

  const getRooms = async () => {
    const result = await axios.get(`/api/rooms/my_rooms/${currentUser.id}`);

    try {
      setRoomRoute(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <div className="menu p-4 overflow-y-auto w-80 bg-base-200 flex flex-col space-y-6">
        <h1 className="font-bold text-3xl">
          Warehouse <span className="text-primary">Party</span>
        </h1>
        <div>
          {mainRoute.map((route) => {
            return (
              <SideNavItem
                key={route.name}
                name={route.name}
                icon={route.icon}
                path={route.path}
              />
            );
          })}
        </div>
        <div className="flex-1">
          <p className="mb-2">Rooms</p>
          {roomRoute.map((route) => {
            return (
              <SideNavItem
                key={route.Room.id}
                name={route.Room.roomName}
                id={route.Room.id}
              />
            );
          })}
        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col space-y-2">
            <p>Powered by:</p>
            <div className="flex space-x-2">
              <GrSpotify className="text-4xl" />
              <h5 className="text-2xl font-bold">Spotify</h5>
            </div>
          </div>
          <p className="font-semibold text-primary text-sm text-right">Version 0.1.0</p>
        </div>
      </div>
    </div>
  );
};

// Navigation Item
const SideNavItem = ({ name, icon, path, id }) => {
  const router = useRouter();
  const currentPath = path || `/room/${id}`;

  return (
    <Link href={currentPath}>
      <div
        className={`px-4 py-2 rounded-lg ${
          router.asPath === currentPath && "bg-primary text-white"
        } hover:cursor-pointer ${
          router.asPath === currentPath
            ? "hover:bg-dark"
            : "hover:bg-base-300 hover:text-black"
        } transition delay-75`}
        onClick={() =>
          typeof window !== "undefined" &&
          sessionStorage.removeItem("activeRoomTab")
        }
      >
        <div className="flex items-center space-x-2">
          {icon}
          <p>{name}</p>
        </div>
      </div>
    </Link>
  );
};

export default Sidebar;
