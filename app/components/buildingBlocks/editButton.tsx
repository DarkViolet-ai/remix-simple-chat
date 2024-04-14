import IconButton from "./iconButton";
import { useNavigate } from "@remix-run/react";
import { EditIcon } from "styles";
import { ButtonType } from "./button";

export default function EditButton({
  editLink,
  buttonType = "normal",
  className = "",
  tooltipPlacement = "bottomLeft",
  iconClassName,
  onClick,
}: {
  editLink?: string;
  className?: string;
  iconClassName: string;
  buttonType?: ButtonType;
  onClick?: () => void;
  tooltipPlacement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";
}) {
  const navigate = useNavigate();
  return (
    <IconButton
      label="edit"
      iconClassName={iconClassName}
      icon={EditIcon}
      containerClassName={className}
      onClick={onClick ? onClick : () => navigate(editLink || "")}
      tooltipPlacement={tooltipPlacement}
      type={buttonType}
    />
  );
}
