import FlexFull from "../buildingBlocks/flexFull";
import FlexFullResponsiveHalf from "../buildingBlocks/flexResponsiveHalf";
import { TransitionType } from "../buildingBlocks/transition";
import TransitionFull from "../buildingBlocks/TransitionFull";

export default function GradientBorderPanelSingle({
  children,
  height,
  gradientBorder = "bg-600-linear5op75",
  gradientBorderWidth = "p-[0.3vh]",
  lineBorder = "border-970-sm",
  innerBg = "mainGradient",
  padding = "p-[1.2vh]",
  containerClassName,
  className,
  transitionType = "fade",
  rounded = "rounded-[2vh]",
  innerBorder = "border-970-sm",
  widths,
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
    <FlexFullResponsiveHalf
      className={`${rounded} ${height} ${containerClassName} ${widths}`}
    >
      <TransitionFull className={` ${rounded} `} type={transitionType}>
        <FlexFull
          className={`${rounded} ${gradientBorderWidth} ${lineBorder} ${gradientBorder} mainShadow`}
        >
          <FlexFull
            className={`h-full ${rounded} ${innerBorder} ${innerBg} ${padding} ${className}`}
          >
            {children}
          </FlexFull>
        </FlexFull>
      </TransitionFull>
    </FlexFullResponsiveHalf>
  );
}
