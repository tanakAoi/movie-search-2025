"use client";

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { getProfile } from "@/services/profileService";
import { useProfileInit } from "@/context/ProfileInitContext";
import { UserProfile } from "@/types/profile";
import Loading from "../../../loading";
import { DefaultButton } from "../../../components/ui/DefaultButton";
import { Avatar } from "../ui/Avatar";
import { ModalEditor } from "./ModalEditor";
import Cookies from "js-cookie";

export const UserSettings = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { profileReady } = useProfileInit();
  const { status: sessionStatus } = useSession();

  useEffect(() => {
    if (!profileReady) return;

    const fetchProfile = async () => {
      try {
        const profile = await getProfile(userId);
        if (profile) {
          setUser({
            id: profile.id,
            username: profile.username ?? "",
            email: profile.email ?? "",
            country: profile.country ?? "",
            language: profile.language ?? "",
            avatar: profile.avatar ?? "",
          });
          Cookies.set("userLanguage", profile.language?.iso_639_1 || "");
          Cookies.set("userCountry", profile.country?.iso_3166_1 || "");
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId, profileReady, sessionStatus]);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <>
      {showModal && (
        <ModalEditor
          userData={user}
          setUserData={setUser}
          setLoading={setLoading}
          onClose={() => setShowModal(false)}
        />
      )}
      <div className="flex flex-col h-full justify-center gap-12 bg-base-bg md:p-10 px-6 py-10 rounded-lg shadow-2xl shadow-base-bg/20 text-base-fg md:w-xl w-[90vw]">
        <h1 className="text-4xl font-lobster">User Settings</h1>
        <div className="flex flex-col md:flex-row items-start justify-center gap-12">
          <Avatar name={user.username} image={user.avatar} size={96} />
          <div className="flex flex-col gap-6 **:[h3]:text-lg **:[h3]:font-semibold">
            <div>
              <h3>Username</h3>
              <p>{user.username}</p>
            </div>
            <div>
              <h3>Email</h3>
              <p>{user.email}</p>
            </div>
            <div>
              <h3>Country</h3>
              <p>
                {user.country?.native_name
                  ? user.country.native_name
                  : user.country?.english_name}
              </p>
            </div>
            <div>
              <h3>Language</h3>
              <p>
                {user.language?.name
                  ? user.language.name
                  : user.language?.english_name}
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
      </div>
    </>
  );
};
