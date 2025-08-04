import StarryBackground from "./components/decor/StarryBackground";

export default function Loading() {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <StarryBackground />
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-end gap-1 h-10">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-6 bg-base-bg animate-wave"
              style={{ animationDelay: `${i * 0.15}s` }}
            ></div>
          ))}
        </div>
        <p className="text-base-bg text-2xl font-lobster">Loading...</p>
      </div>
    </div>
  );
}
