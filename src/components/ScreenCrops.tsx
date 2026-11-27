import Image from "next/image";

const DESKTOP = { width: 2880, height: 1800 } as const;
const PHONE = { width: 780, height: 1688 } as const;

interface CropProps {
  readonly src: string;
  readonly alt: string;
  /** Which side of the desktop screen stays in view. */
  readonly side: "left" | "right";
}

/** A desktop screen shown as a window whose far side and lower part run off the card. */
export function WindowCrop({ src, alt, side }: CropProps) {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-t-xl border border-b-0 border-line bg-ink shadow-[var(--shadow-float)] md:h-80">
      <Image
        src={src}
        alt={alt}
        width={DESKTOP.width}
        height={DESKTOP.height}
        unoptimized
        loading="lazy"
        className={`absolute top-0 h-[150%] w-auto max-w-none ${side === "right" ? "right-0" : "left-0"}`}
      />
    </div>
  );
}

export function PhoneCrop({ src, alt }: { readonly src: string; readonly alt: string }) {
  return (
    <div className="mx-auto h-64 w-56 overflow-hidden rounded-t-[2.25rem] border-[6px] border-b-0 border-fg bg-ink md:h-80 md:w-64">
      <Image src={src} alt={alt} width={PHONE.width} height={PHONE.height} unoptimized loading="lazy" className="block h-auto w-full" />
    </div>
  );
}
