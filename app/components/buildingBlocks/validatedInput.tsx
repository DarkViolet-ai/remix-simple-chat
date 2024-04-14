/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from "react";
import Input from "./input";
import VStack from "./vStack";

interface ValidatedInputProps {
  defaultValue?: string;
  min?: number;
  max: number;
  autoFocus?: boolean;
  additionalStyles?: string;
  isRequired?: boolean;
  name?: string;
  id?: string;
  onValidityChange?: (isValid: boolean) => void;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function ValidatedInput({
  defaultValue = "",
  min = 3,
  max,
  autoFocus = false,
  isRequired = false,
  name = "",
  id = "",
  placeholder = "",
}: ValidatedInputProps) {
  const [inputValue, setInputValue] = useState(defaultValue);

  // Compute the class strings based on conditions
  const isInvalid = inputValue.length < min || inputValue.length > max;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const fieldTooShort = inputValue.length < min;
  const fieldTooLong = inputValue.length > max;
  return (
    <VStack className="w-full flex flex-col space-y-0" gap="gap-[0.5vh]">
      <Input
        autoFocus={autoFocus}
        value={inputValue}
        type="text"
        name={name}
        id={id}
        onChange={handleInputChange}
        placeholder={placeholder}
        required={isRequired}
      />
      <div
        className={`flex space-x-1 w-full pl-[0.5vh] text-xs-tight lightTextShadow font-semibold`}
      >
        <span>
          {inputValue.length} / {max} chars -
        </span>

        <div>
          {isInvalid && fieldTooLong && (
            <>
              <span className="text-red-700">input is too long</span>
            </>
          )}
          {isInvalid && fieldTooShort && <span> min {min} chars.</span>}
          {!isInvalid && <span>validated input</span>}
        </div>
      </div>
    </VStack>
  );
}
