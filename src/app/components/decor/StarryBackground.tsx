export default function StarryBackground() {
  const dots = Array.from({ length: 1000 });

  return (
    <div className="absolute inset-0 h-full w-full -z-10 bg-black overflow-hidden flex items-center justify-center">
      <div className="grid grid-cols-[repeat(auto-fill,_30px)] auto-rows-[30px] gap-8 max-w-full">
        {dots.map((_, i) => (
          <div
            key={i}
            className="w-[5px] h-[5px] rounded-full bg-yellow-300 animate-twinkle"
            style={{
              animationDelay: `${(i % 20) * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
