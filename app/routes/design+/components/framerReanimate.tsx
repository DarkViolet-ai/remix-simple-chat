import VStack from "~/components/buildingBlocks/vStack";
import HStackFull from "~/components/buildingBlocks/hStackFull";
import { RefreshIcon } from "styles";
import { useState } from "react";
import Center from "~/components/buildingBlocks/center";
import IconButton from "~/components/buildingBlocks/iconButton";
import HStack from "~/components/buildingBlocks/hStack";
import { SVGHeading } from "./formattingComponents";
import InfoModal from "./infoModal";
import CodeModal from "./codeModal";

export function FramerReanimate({
  title,
  code,
  children,
  bg = "bg-600-linear6op75",
  info,
  infoTitle,
  showReanimate = true,
  handleClickAnimation,
}: {
  code?: string;
  title?: string;
  info?: React.ReactNode;
  infoTitle?: string;
  bg?: string;
  showReanimate?: boolean;
  children?: React.ReactNode;

  handleClickAnimation?: () => void;
}) {
  const [animationKey, setAnimationKey] = useState(0);

  const handleReanimate = () => {
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const onClick = handleClickAnimation ? handleClickAnimation : handleReanimate;
  return (
    <VStack
      className={`${bg} shadowBroadLoose border-700-md h-[40vh] w-[40vh] sm:w-[50vh] sm:h-[50vh]`}
      gap="gap-[0vh]"
    >
      {title && (
        <HStackFull className="justify-between bg-col-980 rounded-b-none px-[1vh] border-b-170-sm items-center h-[5.5vh] ">
          <SVGHeading>{title}</SVGHeading>

          <HStack className="h-full items-center ">
            {" "}
            {code && (
              <CodeModal
                code={code}
                title={title ? title : ""}
                isPath={false}
                useIcon
              />
            )}
            {info && (
              <InfoModal title={infoTitle ? infoTitle : "More Information"}>
                {info}
              </InfoModal>
            )}
            {showReanimate && (
              <IconButton
                onClick={onClick}
                icon={RefreshIcon}
                type="smallNormal"
              />
            )}
          </HStack>
        </HStackFull>
      )}

      <Center className="w-full h-full" key={animationKey}>
        {children}
      </Center>
    </VStack>
  );
}
