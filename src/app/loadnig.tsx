export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-bg">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-accent-bg"></div>
      <p className="text-base-fg mt-4">Loading...</p>
    </div>
  );
}
