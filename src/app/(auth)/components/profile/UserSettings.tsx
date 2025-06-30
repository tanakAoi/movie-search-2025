"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";

interface UserSettingsProps {
  user: Session["user"];
}

export const UserSettings = ({ user }: UserSettingsProps) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-4">User Settings</h1>
      <p className="text-gray-600">
        This is where you can manage your user settings.
      </p>
      <div>
        <h3 className="text-lg font-semibold mt-4">Username</h3>
        <p className="text-gray-800">{user.name}</p>
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
