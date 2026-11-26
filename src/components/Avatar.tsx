interface AvatarProps {
  readonly name: string;
  readonly color: string;
  readonly className?: string;
}

/** A person shown as a colored circle with the first letter of their name. */
export default function Avatar({ name, color, className = "size-9 text-sm" }: AvatarProps) {
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-medium text-white ${className}`}
      style={{ background: color }}
    >
      {name.slice(0, 1)}
    </span>
  );
}
