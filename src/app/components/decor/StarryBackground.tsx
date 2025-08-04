export default function StarryBackground() {
  const dots = Array.from({ length: 1000 });

  return (
    <div className="absolute inset-0 w-full -z-10 bg-black overflow-hidden">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(32px,1fr))] auto-rows-[32px] gap-6 md:gap-8 ml-5">
        {dots.map((_, i) => (
          <div
            key={i}
            className="w-[5px] h-[5px] rounded-full bg-yellow-300 animate-twinkle"
            style={{
              animationDelay: `${-1 * (i % 20) * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
