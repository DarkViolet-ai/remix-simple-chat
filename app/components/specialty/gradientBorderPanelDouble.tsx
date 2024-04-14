import Flex from "../buildingBlocks/flex";
import FlexFull from "../buildingBlocks/flexFull";
import { TransitionType } from "../buildingBlocks/transition";
import TransitionFull from "../buildingBlocks/TransitionFull";

export default function GradientBorderPanelDouble({
  children,
  height = "h-fit xl:h-95% min-h-content",
  gradientBorder = "bg-600-linear5op75",
  innerBg = "mainGradient",
  gradientBorderWidth = "p-[0.3vh]",
  lineBorder = "border-970-sm",
  padding = "p-[1.2vh]",
  containerClassName,
  className,
  transitionType = "fade",
  rounded = "rounded-[2vh]",
  innerBorder = "border-970-sm",
  widths = "w-full sm:w-98% md:w-85% lg:w-70% xl:w-98%",
}: {
  children?: React.ReactNode;
  height?: string;
  gradientBorder?: string;
  gradientBorderWidth?: string;
  lineBorder?: string;
  innerBg?: string;
  padding?: string;
  containerClassName?: string;
  className?: string;
  transitionType?: TransitionType;
  rounded?: string;
  innerBorder?: string;
  widths?: string;
}) {
  return (
    <Flex className={`${rounded} ${height} ${widths} ${containerClassName}`}>
      <TransitionFull
        className={`h-full ${rounded} min-h-content xl:p-[1vh]`}
        type={transitionType}
      >
        <FlexFull
          className={`${rounded} ${gradientBorderWidth} ${lineBorder} ${gradientBorder} mainShadow min-h-full `}
        >
          <FlexFull
            className={`h-full min-h-full  ${rounded} ${innerBorder} ${innerBg} ${padding} ${className} `}
          >
            {children}
          </FlexFull>
        </FlexFull>
      </TransitionFull>
    </Flex>
  );
}
