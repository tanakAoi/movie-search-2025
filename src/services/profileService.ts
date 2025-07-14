import { ProfileData } from "@/types/profile";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getProfile = async (profileId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/profile/${profileId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error fetching profile: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching profile with id ${profileId}:`, error);
    throw error;
  }
};

export const updateProfile = async (
  profileId: string,
  profileData: ProfileData
) => {
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    };

    const response = await fetch(`${BASE_URL}/profile/${profileId}`, options);

    if (!response.ok) {
      throw new Error(`Error updating profile: ${response.statusText}`);
    }

    const data = await response.json();

    return { status: response.status, ...data };
  } catch (error) {
    console.error(`Error updating profile with id ${profileId}:`, error);
    throw error;
  }
};

export const fetchLanguages = async () => {
  try {
    const response = await fetch(`${BASE_URL}/languages`);

    if (!response.ok) {
      throw new Error(`Error fetching languages: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching languages:", error);
    throw error;
  }
};

export const fetchCountries = async (lang: string) => {
  try {
    const response = await fetch(`${BASE_URL}/countries?lang=${lang}`);

    if (!response.ok) {
      throw new Error(`Error fetching countries: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};
