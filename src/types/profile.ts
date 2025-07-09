import { ICountry, ILanguage } from "./tmdb";

export interface ProfileData {
  country?: ICountry;
  language?: ILanguage;
  username?: string;
  avatar?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  country?: ICountry;
  language?: ILanguage;
  avatar?: string;
}
