import StarryBackground from "../decor/StarryBackground";
import { DefaultButton } from "./DefaultButton";

export const MovieNotFound = () => {
  return (
    <div className="py-18 md:py-24 relative w-full flex flex-col items-center justify-center gap-4 text-base-bg min-h-screen">
      <StarryBackground />
      <h1 className="font-bold text-5xl">Movie Not Found 😢</h1>
      <p>Please check again later.</p>
      <DefaultButton text={"Back to Home"} isLink href="/" className="mt-10" />
    </div>
  );
};
