export function PetHubLogo({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Rounded background */}
        <rect width="40" height="40" rx="12" fill="currentColor" className="text-primary" />
        
        {/* Paw print - main pad */}
        <ellipse cx="20" cy="24" rx="6" ry="5.5" fill="white" />
        
        {/* Paw toes */}
        <circle cx="13" cy="17" r="3" fill="white" />
        <circle cx="20" cy="14" r="3.2" fill="white" />
        <circle cx="27" cy="17" r="3" fill="white" />
      </svg>
      <span className="font-headline font-extrabold tracking-tight text-on-surface" style={{ fontSize: size * 0.65 }}>
        Pet<span className="text-primary">Hub</span>
      </span>
    </span>
  );
}
