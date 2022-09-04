import { useRouter } from "next/router";
import React from "react";
import Wrapper from "../layouts/Wrapper";

const Home = () => {
  const router = useRouter();
  return (
    <Wrapper title="Home">
      <div className="flex flex-col space-y-4">
        <div className="hero min-h-80 bg-base-200 rounded-xl">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Hello there</h1>
              <div className="py-6">
                To get started, you can create a room or let someone add you to
                a room.
              </div>
            </div>
          </div>
        </div>

        <div className="hero min-h-80 bg-base-200 rounded-xl">
          <div className="hero-content text-center">
            <div className="w-md">
              <h1 className="text-2xl font-bold">Create a room</h1>
              <div className="py-6">
                Just name your room and add members when created.
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => router.push("/room/create")}
              >
                Create a room
              </button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;
