interface CircularRatingProps {
  rating: number;
  size: number;
}

export const CircularRating = ({ rating, size }: CircularRatingProps) => {
  const percentage = (rating / 10) * 100;
  const strokeWidth = size / 10; // Adjust stroke width based on size
  const r = size / 2 - strokeWidth / 2; // Radius of the circle
  const circumference = 2 * Math.PI * r; // Circumference of the circle
  const stroke =
    percentage >= 75 ? "#4caf50" : percentage >= 50 ? "#ff9800" : "#f44336"; // Color based on percentage

  return (
    <div className="flex flex-col items-center gap-2">
      <span>Rating</span>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#eee"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * percentage) / 100}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x={size / 2}
          y={size / 2 + 5}
          textAnchor="middle"
          fontSize={size / 5}
          fontWeight="bold"
          fill="var(--color-base-fg)"
        >
          {percentage.toFixed(1)}%
        </text>
      </svg>
    </div>
  );
};
