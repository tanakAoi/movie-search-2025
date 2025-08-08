import { UserProfile } from "@/types/profile";
import { DefaultButton } from "../../../components/ui/DefaultButton";
import { Close } from "@/app/components/ui/icons/MaterialSymbols";
import { Avatar } from "../ui/Avatar";
import { useState } from "react";
import { CountrySelector } from "./CountrySelector";
import { LanguageSelector } from "./LanguageSelector";
import { SelectedItem } from "./SelectedItem";
import { useUserProfile } from "@/context/UserProfileContext";
import { toast } from "sonner";

type ModalEditorProps = {
  onClose: () => void;
};

export const ModalEditor = ({ onClose }: ModalEditorProps) => {
  const { updateUserProfile, userData, setUserData } = useUserProfile();
  const [newUserData, setNewUserData] = useState<UserProfile | null>(userData);
  const [activeSelector, setActiveSelector] = useState<
    "country" | "language" | null
  >(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "username") {
      setNewUserData((prev) => (prev ? { ...prev, username: value } : prev));
    }
  };

  const handleSubmit = async () => {
    if (!userData) {
      toast.error("User data is not available.");
      return;
    }
    try {
      const success = await updateUserProfile(userData.id, newUserData ?? {});
      if (!success) {
        console.error("Failed to update user profile");
        return;
      }
      setUserData((prev) =>
        prev && newUserData
          ? {
              ...prev,
              username: newUserData.username,
              country: newUserData.country,
              language: newUserData.language,
            }
          : prev
      );
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    } finally {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-base-bg px-10 py-12 shadow-lg max-w-2xl w-full h-full md:max-h-[90vh] overflow-auto relative transition-all duration-300">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4"
          type="button"
        >
          <Close width={24} height={24} fill={"var(--color-base-fg)"} />
        </button>
        <h2 className="font-lobster text-3xl text-center">Edit Profile</h2>
        <form className="**:[input]:w-full **:[input]:outline-1 **:[input]:outline-base-fg **:[input]:p-2 **:[input]:rounded-md **:[input]:text-base-fg/80 flex flex-col gap-6 mt-4 **:[label]:inline-block **:[label]:mb-2 ">
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-sm font-medium"
            >
              Avatar
            </label>
            <Avatar
              name={userData?.username ?? ""}
              image={userData?.avatar}
              size={96}
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-sm font-medium"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={userData?.username ?? ""}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              disabled
              defaultValue={userData?.email ?? ""}
              className="outline-none text-base-fg/80"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <SelectedItem
            label="Country"
            value={
              newUserData?.country?.native_name ||
              newUserData?.country?.english_name
            }
            onClick={() => setActiveSelector("country")}
          />
          <SelectedItem
            label="Language"
            value={
              newUserData?.language?.name === "?????"
                ? newUserData?.language?.english_name
                : newUserData?.language?.name ||
                  newUserData?.language?.english_name
            }
            onClick={() => setActiveSelector("language")}
          />
          <DefaultButton
            text="Save"
            onClick={() => handleSubmit()}
            type="button"
          />
        </form>
      </div>
      {activeSelector && (
        <div className="bg-base-bg px-6 py-8 w-full h-full md:w-[300px] md:max-h-[90vh] overflow-auto animate-fade-in absolute md:relative">
          <button
            aria-label="Close"
            onClick={() => setActiveSelector(null)}
            className="absolute right-4 top-4"
            type="button"
          >
            <Close width={18} height={18} fill={"var(--color-base-fg)"} />
          </button>
          {activeSelector === "country" ? (
            <CountrySelector
              onSelect={(country) => {
                setNewUserData((prev) => (prev ? { ...prev, country } : prev));
                setActiveSelector(null);
              }}
            />
          ) : (
            <LanguageSelector
              onSelect={(language) => {
                setNewUserData((prev) => (prev ? { ...prev, language } : prev));
                setActiveSelector(null);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
