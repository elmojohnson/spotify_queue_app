import React from "react";
import Container from "../components/Container";

import { MdMenu } from "react-icons/md";

const Navbar = ({ title }) => {
  return (
    <div className="bg-white shadow w-full py-4 sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 items-center">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-sm btn-ghost drawer-button lg:hidden"
            >
              <MdMenu />
            </label>
            <h1 className="font-bold text-xl">{title || "Title"}</h1>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
