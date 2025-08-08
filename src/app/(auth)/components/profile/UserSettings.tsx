"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Loading from "../../../loading";
import { DefaultButton } from "../../../components/ui/DefaultButton";
import { Avatar } from "../ui/Avatar";
import { ModalEditor } from "./ModalEditor";
import { useUserProfile } from "@/context/UserProfileContext";

export const UserSettings = () => {
  const [showModal, setShowModal] = useState(false);
  const { userData, loading } = useUserProfile();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {showModal && <ModalEditor onClose={() => setShowModal(false)} />}
      <div className="flex flex-col h-full justify-center gap-12 bg-base-bg md:p-10 px-6 py-10 rounded-lg shadow-2xl shadow-base-bg/20 text-base-fg md:w-xl w-[90vw]">
        <h1 className="text-4xl font-lobster">User Settings</h1>
        {userData ? (
          <>
            <div className="flex flex-col md:flex-row items-start justify-center gap-12">
              <Avatar
                name={userData.username}
                image={userData.avatar}
                size={96}
              />
              <div className="flex flex-col gap-6 **:[h3]:text-lg **:[h3]:font-semibold">
                <div>
                  <h3>Username</h3>
                  <p>{userData.username}</p>
                </div>
                <div>
                  <h3>Email</h3>
                  <p>{userData.email}</p>
                </div>
                <div>
                  <h3>Country</h3>
                  <p>
                    {userData.country?.native_name
                      ? userData.country.native_name
                      : userData.country?.english_name}
                  </p>
                </div>
                <div>
                  <h3>Language</h3>
                  <p>
                    {userData.language?.name === "?????"
                      ? userData.language?.english_name
                      : userData.language?.name ||
                        userData.language?.english_name}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <DefaultButton
                text="Edit Profile"
                onClick={() => setShowModal(true)}
              />
              <DefaultButton text="Logout" onClick={() => signOut()} />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-red-500">
              No user data available. Please log in again.
            </p>
            <DefaultButton text="Logout" onClick={() => signOut()} />
          </div>
        )}
      </div>
    </>
  );
};
