import Image from "next/image";

interface LogoProps {
  readonly className?: string;
}

const SELLERKING_LOGO = { src: "/images/brand/sellerking-logo.svg", width: 113, height: 28 } as const;
const SPRINTABLE_MARK = { src: "/images/brand/sprintable-mark.svg", size: 100 } as const;

/** 장사왕 brand logo, taken from sellerking.io. */
export function SellerkingLogo({ className = "h-6" }: LogoProps) {
  return (
    <Image
      src={SELLERKING_LOGO.src}
      alt="장사왕"
      width={SELLERKING_LOGO.width}
      height={SELLERKING_LOGO.height}
      unoptimized
      className={`block w-auto ${className}`}
    />
  );
}

/** Sprintable brand logo: the mark from sprintable.ai beside its wordmark. */
export function SprintableLogo({ className = "h-6" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <Image src={SPRINTABLE_MARK.src} alt="" width={SPRINTABLE_MARK.size} height={SPRINTABLE_MARK.size} unoptimized className="block h-full w-auto" />
      <span className="text-[1.05em] font-semibold leading-none tracking-tight">Sprintable</span>
    </span>
  );
}
