import { useState } from "react";
import Input from "./input";
import HStack from "./hStack";
import Box from "./box";
import IconButton from "./iconButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import VStack from "./vStack";
import Heading from "./headingText";

interface PasswordInputProps {
  name?: string;
  id?: string;
  confirm?: boolean;
}

export default function PasswordInput({
  name = "password",
  id = "password",
  confirm = false,
}: PasswordInputProps) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <VStack gap="gap-0" align="start" className={`w-full`}>
      {confirm ? (
        <Heading
          layout="text-md-normal md:text-xl-normal"
          text="Confirm Password"
          className="text-xl-tighter text-stroke-6-900 lightTextShadow"
        />
      ) : (
        <Heading
          layout="text-md-normal md:text-xl-normal"
          text="Password"
          className="text-xl-tighter text-stroke-6-900 lightTextShadow"
        />
      )}
      <HStack className="w-full relative" gap="gap-0">
        <Box className="relative w-full">
          <Input
            type={show ? "text" : "password"}
            placeholder="password"
            id={id}
            name={confirm ? "confirmPassword" : name}
            required
          />{" "}
          <Box className="absolute right-[1vh] top-[0.2vh]">
            <IconButton
              type="unstyled"
              iconClassName="text-[2.5vh]"
              label="show/hide"
              icon={show ? FaEyeSlash : FaEye}
              onClick={handleClick}
            />
          </Box>
        </Box>
      </HStack>
    </VStack>
  );
}
