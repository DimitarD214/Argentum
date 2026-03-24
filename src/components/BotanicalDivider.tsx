export default function BotanicalDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-4 ${className}`}>
      <svg
        width="200"
        height="32"
        viewBox="0 0 200 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-spring-400 opacity-60"
      >
        {/* Left leaf branch */}
        <path
          d="M100 16 C85 16, 70 8, 40 12 C55 6, 75 10, 100 16Z"
          fill="currentColor"
          fillOpacity="0.3"
        />
        <path
          d="M100 16 C85 18, 65 26, 30 20 C50 22, 78 18, 100 16Z"
          fill="currentColor"
          fillOpacity="0.2"
        />
        {/* Right leaf branch */}
        <path
          d="M100 16 C115 16, 130 8, 160 12 C145 6, 125 10, 100 16Z"
          fill="currentColor"
          fillOpacity="0.3"
        />
        <path
          d="M100 16 C115 18, 135 26, 170 20 C150 22, 122 18, 100 16Z"
          fill="currentColor"
          fillOpacity="0.2"
        />
        {/* Center stem */}
        <line x1="20" y1="16" x2="180" y2="16" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
        {/* Center diamond */}
        <path d="M100 12 L104 16 L100 20 L96 16Z" fill="currentColor" fillOpacity="0.5" />
      </svg>
    </div>
  );
}
