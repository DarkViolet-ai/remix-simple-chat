import VStack from "~/components/buildingBlocks/vStack";
import FlexFull from "~/components/buildingBlocks/flexFull";
import HStackFull from "~/components/buildingBlocks/hStackFull";
import Button from "~/components/buildingBlocks/button";
import CodeModal from "./codeModal";
import { RefreshIcon } from "styles";
import { useState } from "react";
import Text from "~/components/buildingBlocks/text";

export function Reanimate({
  title,
  code,
  children,
  isPath,
  handleClickAnimation,
}: {
  code?: string;
  title?: string;
  children?: React.ReactNode;
  isPath?: boolean;
  handleClickAnimation?: () => void;
}) {
  const [animationKey, setAnimationKey] = useState(0);

  const handleReanimate = () => {
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const onClick = handleClickAnimation ? handleClickAnimation : handleReanimate;
  return (
    <VStack
      className="bg-col-900 shadowBroadLoose border-800-md p-[1vh]"
      gap="gap-[2vh]"
    >
      {title && (
        <FlexFull className="justify-center">
          <Text className="text-col-300 text-[2.4vh]">{title}</Text>
        </FlexFull>
      )}
      <HStackFull className="justify-evenly">
        <Button
          buttonText="Reanimate"
          onClick={onClick}
          iconLeft={RefreshIcon}
          type="smallNormal"
        />
        {code && (
          <CodeModal isPath={isPath} code={code} title={title ? title : ""} />
        )}
      </HStackFull>
      <div key={animationKey}>{children}</div>
    </VStack>
  );
}
