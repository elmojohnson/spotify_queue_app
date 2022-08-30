import React, { useContext, useEffect } from "react";
import Wrapper from "../../layouts/Wrapper";

import AuthContext from "../../contexts/AuthContext";

import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";

const create = () => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  const RoomSchema = Yup.object().shape({
    roomName: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Required"),
  });

  const createRoom = async (values) => {
    const newRoom = await axios.post("/api/rooms/create", {roomName: values.roomName, hostId: currentUser.id});

    try {
      router.push(`/room/${newRoom.data.id}`)
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <Wrapper title="Create">
      <Formik
        initialValues={{ roomName: "" }}
        validationSchema={RoomSchema}
        onSubmit={(values) => createRoom(values)}
      >
        {({
          errors,
          touched,
          values,
          handleChange,
          isSubmitting,
          submitForm,
        }) => (
          <div className="flex space-x-4">
            <div className="w-full flex flex-col space-x-2">
              <input
                type="text"
                name="roomName"
                className="input bg-white input-bordered w-full"
                placeholder="Room Name"
                onChange={handleChange}
                value={values.roomName}
              />
              {errors.roomName && touched.roomName ? (
                <span className="text-error">{errors.roomName}</span>
              ) : null}
            </div>
            <button
              type="submit"
              className={`btn btn-primary ${isSubmitting && "loading"}`}
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Create
            </button>
          </div>
        )}
      </Formik>
    </Wrapper>
  );
};

export default create;
