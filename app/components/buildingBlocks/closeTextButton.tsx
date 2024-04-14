import Button, { ButtonType } from "./button";

export function CloseTextButton({
  onClose,
  className,
  type,
}: {
  onClose: () => void;
  className?: string;
  type?: ButtonType;
}) {
  return (
    <Button
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClose();
      }}
      type={type}
      className={`${className}`}
      buttonText="Close"
    ></Button>
  );
}
