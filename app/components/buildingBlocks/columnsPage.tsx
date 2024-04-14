import Flex from "./flex";
import VStack from "./vStack";
import Transition, { type TransitionType } from "./transition";
import Heading from "./headingText";
import Text from "./text";

export function ColumnsPageHeader({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <VStack className={`w-full h-fit flex-shrink-0 py-[1vh] gap-0`}>
      {title && (
        <Flex
          className={`w-full h-fit flex-shrink-0 px-[2vw] pt-1 justify-center`}
        >
          <Heading shadow="textFog" text={title} />
        </Flex>
      )}
      {subtitle && (
        <Flex
          className={`w-95% h-fit flex-shrink-0 justify-center bg-col-975 px-[1vw] py-[1vh] rounded-lg shadow3DLg fullHD:w-90% quadHD:w-85% ultraHD:w-80% `}
        >
          <Text>{subtitle}</Text>
        </Flex>
      )}
    </VStack>
  );
}

export function ColumnsPageContainer({
  children,
  title,
  subtitle,
  transitionScreen = "lg",
  topNavPadding = "pt-50px",
  rowGap = "gap-[2vh]",
  columnGap = "gap-[2vw]",
  pt = "pt-[1.2vh]",
  pb = "pb-[2vh] md:pb-[1vh] quadHD:pb-[1.4vh]",
}: {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  transitionScreen?: string;
  topNavPadding?: string;
  rowGap?: string;
  columnGap?: string;
  pt?: string;
  pb?: string;
}) {
  let transitionScreenSize = "";
  let scrollStyles = "";
  let alignment = "";
  if (transitionScreen === "md") {
    transitionScreenSize = `md:flex-row md:gap-[10px] md:items-start ${columnGap}`;
    scrollStyles = "md:overflow-y-hidden md:h-full";
    alignment = "md:items-start";
  } else if (transitionScreen === "lg") {
    transitionScreenSize = `lg:flex-row lg:overflow-y-hidden lg:gap-[10px] lg:items-start ${columnGap}`;
    scrollStyles = "lg:overflow-y-hidden lg:h-full";
    alignment = "lg:items-start";
  } else if (transitionScreen === "xl") {
    transitionScreenSize = `xl:flex-row xl:overflow-y-hidden xl:gap-[10px] xl:items-start ${columnGap}`;
    scrollStyles = "xl:overflow-y-hidden xl:h-full";
    alignment = "xl:items-start";
  } else if (transitionScreen === "xxl") {
    transitionScreenSize = `xxl:flex-row xxl:overflow-y-hidden xxl:gap-[10px] xxl:items-start ${columnGap}`;
    scrollStyles = "xxl:overflow-y-hidden xxl:h-full";
    alignment = "xxl:items-start";
  } else if (transitionScreen === "fullHD") {
    transitionScreenSize = `fullHD:flex-row fullHD:overflow-y-hidden fullHD:gap-[10px] fullHD:items-start ${columnGap}`;
    scrollStyles = "fullHD:overflow-y-hidden fullHD:h-full";
    alignment = "fullHD:items-start";
  } else {
    transitionScreenSize = "";
    scrollStyles = "";
    alignment = "";
  }

  return (
    <VStack
      className={`h-fit w-99% ${topNavPadding} justify-center ${scrollStyles} overflow-x-hidden gap-0`}
    >
      {(title || subtitle) && (
        <Flex className={`w-full h-fit ${pt} justify-center`}>
          <ColumnsPageHeader title={title} subtitle={subtitle} />
        </Flex>
      )}{" "}
      <Flex
        className={`w-98% h-full flex-col items-center overflow-y-auto ${transitionScreenSize} ${alignment}} ${pt} ${rowGap} ${pb}`}
      >
        {children}
      </Flex>
    </VStack>
  );
}

export function ColumnsPageColumn({
  children,
  heading,
  innerColMaxW,
  transitionScreen = "lg",
  headingColor = "bg-col-900",
  bg = "bg-calmGrayBack bg-darkCyanGrad",
  transitionType = "fade",
  transitionClassName = "",
  containerClassName = "",
}: {
  children?: React.ReactNode;
  heading?: string;
  innerColMaxW?: string;
  transitionScreen?: string;
  headingColor?: string;
  bg?: string;
  transitionType?: TransitionType;
  transitionClassName?: string;
  containerClassName?: string;
}) {
  let columnSize = "";
  let transitionHeight = "";
  let transitionOverflow = "";
  if (transitionScreen === "md") {
    columnSize = "md:w-1/2";
    transitionHeight = "md:h-full";
    transitionOverflow = "md:overflow-y-auto";
  } else if (transitionScreen === "lg") {
    columnSize = "lg:w-1/2";
    transitionHeight = "lg:h-full";
    transitionOverflow = "lg:overflow-y-auto";
  } else if (transitionScreen === "xl") {
    columnSize = "xl:w-1/2";
    transitionHeight = "xl:h-full";
    transitionOverflow = "xl:overflow-y-auto";
  } else if (transitionScreen === "xxl") {
    columnSize = "xxl:w-1/2";
    transitionHeight = "xxl:h-full";
    transitionOverflow = "xxl:overflow-y-auto";
  } else if (transitionScreen === "fullHD") {
    columnSize = "fullHD:w-1/2";
    transitionHeight = "fullHD:h-full";
    transitionOverflow = "fullHD:overflow-y-auto";
  } else {
    columnSize = "";
    transitionHeight = "";
  }

  return (
    <Flex
      className={`w-full h-fit justify-center align-start ${columnSize} ${transitionHeight} ${containerClassName}`}
    >
      <Flex
        className={`w-full h-fit justify-center align-start ${transitionHeight}`}
      >
        <Transition
          type={transitionType}
          className={`w-full h-full ${transitionClassName} ${transitionHeight}}`}
        >
          <Flex
            className={`h-fit min-h-full justify-center align-start ${transitionHeight} ${innerColMaxW}`}
          >
            {" "}
            <VStack
              className={`w-full h-fit gap-0 ${transitionHeight} shadowBroadTight justify-start ${bg}`}
            >
              {heading && (
                <Flex
                  className={`w-full h-fit flex-shrink-0 rounded-b-none bg-col-900 border-b-2 border-b-col-225 px-[2vw] ${headingColor}`}
                >
                  <Heading text={heading} />
                </Flex>
              )}
              <VStack
                className={`w-full h-full ${transitionHeight} ${transitionOverflow} overflow-x-hidden gap-0`}
              >
                {children}
              </VStack>
            </VStack>
          </Flex>
        </Transition>
      </Flex>
    </Flex>
  );
}
