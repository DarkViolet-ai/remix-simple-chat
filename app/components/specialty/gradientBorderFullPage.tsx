import FlexFull from "../buildingBlocks/flexFull";
import { TransitionType } from "../buildingBlocks/transition";
import TransitionFull from "../buildingBlocks/TransitionFull";

export default function GradientBorderFull({
  children,
  height = "h-80%",
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
  style = { height: "90svh" },
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
  style?: React.CSSProperties;
}) {
  return (
    <FlexFull
      className={`${rounded} ${height} ${containerClassName} ${widths}`}
      style={style}
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
    </FlexFull>
  );
}
