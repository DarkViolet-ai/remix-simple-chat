import Flex from "./flex";
import HStack from "./hStack";
import VStack from "./vStack";
import Text from "./text";
import Icon from "./icon";
import { CiBellOff, CiBellOn } from "react-icons/ci";
import { motion } from "framer-motion";

export default function ToggleSwitch({
  size = "xl",
  labelOn,
  labelOff,
  toggleOn,
  setToggleOn,
  bgColor = "bg-col-840",
  switchColor = "bg-col-100",
  switchShadow = "dark",
  containerShadow = "dark",
  onIcon = CiBellOn,
  offIcon = CiBellOff,
  onText,
  offText,
  labelColor = "dark",
}: {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  labelOn?: string;
  labelOff?: string;
  toggleOn: boolean;
  setToggleOn: React.Dispatch<React.SetStateAction<boolean>>;
  bgColor?: string;
  switchColor?: string;
  switchShadow?: "dark" | "light" | "none";
  containerShadow?: "dark" | "light" | "none";
  onIcon?: React.ComponentType<{ className?: string }>;
  offIcon?: React.ComponentType<{ className?: string }>;
  onText?: string;
  offText?: string;
  labelColor?: "dark" | "light" | "none";
}) {
  const switchContainerSizes = {
    xs: `w-[5.4vh] h-[2.6vh] rounded-[1.1vh] px-[0.4vh] ${
      containerShadow === "dark"
        ? "shadowNarrowTight border-970-sm"
        : "lightShadow border-170-sm"
    }
    `,
    sm: `w-[6.1vh] h-[3vh] rounded-[2vh] px-[0.4vh] ${
      containerShadow === "dark"
        ? "shadowNarrowTight border-970-sm"
        : "lightShadow border-170-sm"
    }
    `,
    md: `w-[6.4vh] h-[3vh] rounded-[2vh] px-[0.4vh] ${
      containerShadow === "dark"
        ? "shadowBroadTight border-970-sm"
        : "lightShadow border-170-md"
    }
    `,
    lg: `w-[6.5vh] h-[3.5vh] rounded-[4vh] px-[0.4vh] ${
      containerShadow === "dark"
        ? "shadowBroadNormal border-970-md"
        : "lightShadow border-170-md"
    }
    `,
    xl: `w-[7.2vh] h-[3.8vh] rounded-[3.7vh] px-[0.4vh] ${
      containerShadow === "dark"
        ? "shadowBroadNormal border-970-md"
        : "lightShadow border-170-md"
    }
    `,
  };

  const switchSizes = {
    xs: `w-[2vh] h-[1.7vh] rounded-[1vh] ${
      switchShadow === "dark"
        ? "shadowNarrowTight border-970-sm"
        : "lightShadow border-170-sm"
    }`,
    sm: `w-[2.3vh] h-[2vh] rounded-full border-990-sm ${
      switchShadow === "dark"
        ? "shadowNarrowTight border-970-sm"
        : "lightShadow border-170-sm"
    }`,
    md: `w-[2.6vh] h-[2.3vh] rounded-full border-990-md ${
      switchShadow === "dark"
        ? "shadowBroadTight border-980-md"
        : "lightShadow border-170-sm"
    }`,
    lg: `w-[2.9vh] h-[2.5vh] rounded-full border-990-md ${
      switchShadow === "dark"
        ? "shadowBroadTight border-980-md"
        : "lightShadow border-170-sm"
    }`,
    xl: `w-[3.3vh] h-[2.8vh] rounded-full border-990-md ${
      switchShadow === "dark"
        ? "shadowBroadTight border-980-nd"
        : "lightShadow border-170-sm"
    }`,
  };

  const iconSizes = {
    xs: "text-[1.8vh]",
    sm: "text-[2vh]",
    md: "text-[2.2vh]",
    lg: "text-[2.4vh]",
    xl: "text-[2.6vh]",
  };

  const labelSizes = {
    xs: "text-[1.5vh]",
    sm: "text-[1.7vh]",
    md: "text-[2vh]",
    lg: "text-[2.1vh]",
    xl: "text-[2.2vh]",
  };

  const gap = {
    xs: "gap-[0.5vh]",
    sm: "gap-[0.6vh]",
    md: "gap-[0.7vh]",
    lg: "gap-[0.8vh]",
    xl: "gap-[0.9vh]",
  };
  const toggleSwitch = () => setToggleOn(!toggleOn);
  const spring = {
    type: "spring",
    stiffness: 800,
    damping: 33,
  };
  return (
    <VStack gap="gap-[0px]">
      {labelOn && labelOff && (
        <HStack>
          <Text className={labelSizes[size]}>
            {toggleOn ? labelOn : labelOff}
          </Text>
        </HStack>
      )}
      <HStack className="items-center " gap={gap[size]}>
        <Flex
          className={`h-full items-center ${iconSizes[size]} ${
            labelColor === "dark"
              ? "text-col-100 bg-col-970"
              : "text-col-900 bg-col-150"
          } p-[0.3vh] ${toggleOn ? "opacity-50" : "opacity-1"}`}
        >
          {onIcon ? (
            <Icon icon={onIcon} iconClassName={iconSizes[size]} />
          ) : onText ? (
            <Text className={iconSizes[size]}>{onText}</Text>
          ) : undefined}{" "}
        </Flex>
        <HStack
          className={`${switchContainerSizes[size]} ${
            !toggleOn ? "justify-start" : "justify-end"
          } items-center ${bgColor} cursor-pointer`}
          onClick={() => toggleSwitch()}
        >
          <motion.div
            layout
            transition={spring}
            className={`${switchSizes[size]} ${switchColor} shadowNarrowTight`}
          />
        </HStack>{" "}
        <Flex
          className={`h-full items-center ${
            labelColor === "dark"
              ? "text-col-100 bg-col-970"
              : "text-col-900 bg-col-150"
          } p-[0.3vh]  ${!toggleOn ? "opacity-50" : "opacity-1"}`}
        >
          {offIcon ? (
            <Icon icon={offIcon} iconClassName={iconSizes[size]} />
          ) : offText ? (
            <Text className={iconSizes[size]}>{offText}</Text>
          ) : undefined}
        </Flex>
      </HStack>
    </VStack>
  );
}
