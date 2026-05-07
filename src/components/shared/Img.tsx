export default function Img({
  src,
  alt,
  loading,
  className,
  isHidden,
  ref,
  index,
}: {
  src: string;
  alt: string;
  loading: "eager" | "lazy";
  className?: string;
  isHidden?: boolean;
  ref?: (el: HTMLDivElement | null) => void;
  index?: number;
}) {
  const base = src.replace(/\.(jpg|png)$/, "");
  const sizes = [640, 1080, 1600, 1920, 2560];

  return (
    <img
      src={`${base}-1080w.webp`}
      srcSet={sizes.map((w) => `${base}-${w}w.webp ${w}w`).join(", ")}
      sizes="100vw"
      alt={alt}
      loading={loading}
      className={className}
      aria-hidden={isHidden}
      data-index={index}
      ref={ref}
    />
  );
}
