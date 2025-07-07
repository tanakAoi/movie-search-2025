"use client";

import { useEffect, useState } from "react";

import { signOut } from "next-auth/react";
import { getProfile } from "@/services/profileService";
import { useProfileInit } from "@/context/ProfileInitContext";

type User = {
  id: string;
  username: string;
  email: string;
  country?: string;
  language?: string;
};

export const UserSettings = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
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
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-4">User Settings</h1>
      <div>
        <h3 className="text-lg font-semibold mt-4">Username</h3>
        <p className="text-gray-800">{user.username}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mt-4">Email</h3>
        <p className="text-gray-800">{user.email}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mt-4">Country</h3>
        <p className="text-gray-800">{user.country}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mt-4">Language</h3>
        <p className="text-gray-800">{user.language}</p>
      </div>
      <button
        className="mt-2 px-4 py-2 bg-base-fg text-base-bg rounded cursor-pointer"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
};
