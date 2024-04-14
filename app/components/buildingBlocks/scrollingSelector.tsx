import Button from "./button";
import FlexFull from "./flexFull";
import VStackFull from "./vStackFull";
import { useState } from "react";
import { GetFromLink } from "~/utils/pathUtils";
import Heading from "./headingText";
import Text from "./text";

export default function ScrollingSelector({
  options,
  setExternalSelection,
  heading,
  selectedOption,
  selectedOnTop = true,
  bg = "bg-col-500",
  border,
  showClose = true,
}: {
  options: string[];
  heading?: string;
  selectedOption?: string;
  selectedOnTop?: boolean;
  setExternalSelection?: (option: string) => void;
  bg?: string;
  border?: string;
  showClose?: boolean;
}) {
  const [selected, setSelected] = useState(selectedOption || undefined);
  function handleStatusSelect(option: string) {
    setSelected(option);
    setExternalSelection ? setExternalSelection(option) : null;
  }

  const selectedOnTopOptions = selected
    ? [selected, ...options.filter((option) => option !== selected)]
    : options;
  const mapSelections = selectedOnTop ? selectedOnTopOptions : options;

  const handleButtonStyle = ({ option }: { option: string }) => {
    if (option === selected) {
      return `bg-col-200 font-[600] text-stroke-3-900 text-col-900 lightTextShadow hover:bg-col-400 hover:text-col-900`;
    } else {
      return `bg-col-950 text-col-100 font-[400] hover:bg-col-600 hover:text-col-900 transition-500`;
    }
  };

  return (
    <FlexFull className={`${bg} ${border}`}>
      <VStackFull className={heading ? `px-[2vh] p-[1vh]` : "p-[0.5vh]"}>
        {heading && (
          <FlexFull className="h-fit">
            <Heading
              text={heading}
              layout="text-xxl-looser"
              shadow="textShadow"
              color="text-col-100"
            />
          </FlexFull>
        )}
        <FlexFull
          className={`h-full max-h-full overflow-y-auto justify-center insetOverlay border-980-md`}
        >
          <VStackFull className={`h-fit px-[2vh] py-[1vh]`} gap="gap-[0.5vh]">
            {mapSelections.map((option) => (
              <FlexFull
                key={option}
                className={`${handleButtonStyle({
                  option,
                })} justify-between shadowNarrowLoose items-center px-[1vh]`}
                onClick={() => handleStatusSelect(option)}
              >
                <Text className="text-md-looser">{option} </Text>
                {option === selected && (
                  <Text className="text-[1.3vh] leading-[1.5vh] text-col-100 textShadow px-[1vh] bg-col-700 metallicEdgesSm h-fit">
                    current
                  </Text>
                )}
              </FlexFull>
            ))}
          </VStackFull>
        </FlexFull>
        {showClose && (
          <FlexFull className="justify-center items-center">
            <Button
              to={String(GetFromLink())}
              buttonText="Save & Close"
              type="smallNormal"
            />
          </FlexFull>
        )}
      </VStackFull>
    </FlexFull>
  );
}
