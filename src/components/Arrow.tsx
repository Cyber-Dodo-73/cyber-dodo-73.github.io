export function Arrow({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8H13M9 4L13 8L9 12" fill="none" stroke={color} strokeWidth="1.8" />
    </svg>
  );
}
