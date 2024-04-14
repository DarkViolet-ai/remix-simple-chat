import React, { type ReactElement } from "react";
import Image from "./image";
import { defaultAvatar } from "styles";

interface AvatarProps {
  name?: string;
  rounded?: string;
  src?: string;
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}

interface AvatarBadgeProps {
  boxSize?: string;
  bg?: string;
  borderColor?: string;
}

interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  spacing?: string;
}

export const Avatar = ({
  name,
  rounded = "rounded-full",
  src = "/images/icons/profileIcon.png",
  size,
}: AvatarProps) => {
  // Function to generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("");
  };

  // Tailwind CSS classes based on size
  const sizeClasses = {
    xxs: "h-[2.5vh] w-[2.5vh]",
    xs: "h-[3.5vh] w-[3.5vh]",
    sm: "h-[3.75vh] w-[3.75vh]",
    md: "h-[4vh] w-[4vh]",
    lg: "h-[5vh] w-[5vh]",
    xl: "h-[6.5vh] w-[6.5vh]",
    xxl: "h-[7vh] w-[7vh]",
  };

  return (
    <div
      className={`${rounded} overflow-hidden flex-shrink-0 ${
        sizeClasses[size || "sm"]
      } border-[1.5px] border-solid border-col-400 shadowNarrowNormal flex items-center justify-center text-col-400 bg-col-900`}
    >
      {src ? (
        <Image
          src={src || "/fallbackAvatar.png"}
          alt={name || ""}
          fallbackImage={defaultAvatar}
          rounded={rounded}
        />
      ) : (
        <span className="text-col-100">{name ? getInitials(name) : "N/A"}</span>
      )}
    </div>
  );
};

export const AvatarBadge = ({ boxSize, bg, borderColor }: AvatarBadgeProps) => {
  return (
    <span
      className={`absolute bottom-0 right-0 ${bg} ${borderColor} ${boxSize}`}
    ></span>
  );
};

export const AvatarGroup = ({
  children,
  max,
  size,
  spacing,
}: AvatarGroupProps) => {
  if (!children) return null;

  const childrenArray = React.Children.toArray(children);

  return (
    <div className={`flex -space-x-4 ${spacing}`}>
      {childrenArray.map((child, index) => {
        if (max && index >= max) {
          return null; // Logic to handle 'max' property
        }
        return React.isValidElement(child)
          ? React.cloneElement(child as ReactElement, { size })
          : child;
      })}
      {max && childrenArray.length > max && (
        <span>+{childrenArray.length - max}</span>
      )}
    </div>
  );
};

export default AvatarGroup;
