import { useState, type CSSProperties, type ImgHTMLAttributes } from "react";
import { imageFallback } from "styles";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackImage?: string;
  w?: string;
  h?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  pos?: "absolute" | "relative" | "fixed";
  t?: string;
  b?: string;
  l?: string;
  r?: string;
  zIndex?: string;
  borderRadius?: string;
  shadow?: string;
  rounded?: string;
  className?: string;
}

export default function Image({
  src,
  fallbackImage = imageFallback,
  alt,
  objectFit = "cover",
  pos,
  t,
  b,
  l,
  r,
  zIndex,
  borderRadius,
  shadow = "none",
  rounded,
  className,
  ...props
}: ImageProps) {
  const imageStyle: CSSProperties = {
    objectFit,
    position: pos,
    top: t,
    bottom: b,
    left: l,
    right: r,
    zIndex,
    borderRadius,
    boxShadow: shadow,
  };

  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackImage);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      style={imageStyle}
      {...props}
      className={`${objectFit} ${rounded} ${shadow} ${className}`}
    />
  );
}
