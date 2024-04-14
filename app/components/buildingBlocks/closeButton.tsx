import { CloseIcon } from "styles";
import IconButton from "./iconButton";
import { ButtonType } from "./button";

export function CloseButton({
  onClose,
  className,
  iconClassName = "text-[2.5vh]",
  type = "smallNormal",
}: {
  onClose: () => void;
  className?: string;
  iconClassName?: string;
  buttonRadius?: string;
  type?: ButtonType;
}) {
  return (
    <IconButton
      label="close"
      icon={CloseIcon}
      type={type}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClose();
      }}
      containerClassName={`z-10 ${className}`}
      tooltipPlacement="left"
      iconClassName={iconClassName}
    />
  );
}
