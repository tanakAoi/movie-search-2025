"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { getProfile } from "@/services/profileService";
import { useProfileInit } from "@/context/ProfileInitContext";
import { UserProfile } from "@/types/profile";
import Loading from "../../loading";
import { DefaultButton } from "../ui/DefaultButton";
import { Avatar } from "../ui/Avatar";
import { ModalEditor } from "./ModalEditor";

export const UserSettings = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { profileReady } = useProfileInit();

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
  }, [userId, profileReady]);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <>
      {showModal && (
        <ModalEditor userData={user} onClose={() => setShowModal(false)} />
      )}
      <div className="flex flex-col w-fit h-full justify-center gap-12">
        <h1 className="text-4xl font-lobster">User Settings</h1>
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
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
              <p>{user.country}</p>
            </div>
            <div>
              <h3>Language</h3>
              <p>
                {new Intl.DisplayNames(["en"], { type: "language" }).of(
                  user.language ?? ""
                ) || user.language}
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
