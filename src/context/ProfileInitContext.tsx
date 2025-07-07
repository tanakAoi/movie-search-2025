"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ProfileInitContextType = {
  profileReady: boolean;
  setProfileReady: (value: boolean) => void;
};

const ProfileInitContext = createContext<ProfileInitContextType>({
  profileReady: false,
  setProfileReady: () => {},
});

export const useProfileInit = () => useContext(ProfileInitContext);

export const ProfileInitProvider = ({ children }: { children: ReactNode }) => {
  const [profileReady, setProfileReady] = useState(false);

  return (
    <ProfileInitContext.Provider value={{ profileReady, setProfileReady }}>
      {children}
    </ProfileInitContext.Provider>
  );
};
