/* eslint-disable jsx-a11y/no-autofocus */
import Input from "./input";
import Heading from "./headingText";
import VStack from "./vStack";
import ValidatedInput from "./validatedInput";
import { TextShadows } from "types";

interface InputVStackProps {
  labelSize?: "normal" | "small";
  labelColor?: string;
  labelClassName?: string;
  labelIsCursive?: boolean;
  isValidated?: boolean;
  validationMin?: number;
  validationMax?: number;
  autoFocus?: boolean;
  isRequired?: boolean;
  style?: React.CSSProperties;
  label: string;
  labelShadow?: string;
  isEditable?: boolean;
  className?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function InputVStack({
  labelColor,
  labelSize = "normal",
  labelIsCursive = true,
  labelClassName,
  autoFocus = false,
  validationMin,
  validationMax,
  isRequired,
  label,
  style,
  className,
  isValidated,
  name,
  placeholder,
  value,
  defaultValue,
  labelShadow,
  type,
  onChange,
}: InputVStackProps) {
  return (
    <VStack
      className={` leading-1rem w-full ${className}`}
      align="start"
      style={style}
      gap="gap-[0.5vh]"
    >
      {labelSize === "small" ? (
        <Heading
          isCursive={labelIsCursive}
          color={labelColor}
          className={`${labelClassName}`}
          layout="text-md-tighter"
          shadow={labelShadow as TextShadows}
          text={label}
        />
      ) : (
        <>
          <Heading
            isCursive={labelIsCursive}
            color={labelColor}
            className={` ${labelClassName}`}
            shadow={labelShadow as TextShadows}
            layout="text-md-tighter md:text-lg-tighter"
            text={label}
          />
        </>
      )}

      {isValidated && validationMax ? (
        <ValidatedInput
          autoFocus={autoFocus}
          isRequired={isRequired}
          min={validationMin}
          max={validationMax}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onChange}
        />
      ) : (
        <Input
          autoFocus={autoFocus}
          required={isRequired}
          name={name}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          type={type}
          onChange={onChange}
        />
      )}
    </VStack>
  );
}
