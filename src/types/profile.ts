export interface ProfileData {
  country?: string;
  language?: string;
  username?: string;
  avatar?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  country?: string;
  language?: string;
  avatar?: string;
}