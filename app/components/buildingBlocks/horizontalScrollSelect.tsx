import FlexFull from "./flexFull";
import VStackFull from "./vStackFull";
import { useEffect, useState } from "react";
import { GetFromLink } from "~/utils/pathUtils";
import Heading from "./headingText";
import Text from "./text";
import HStackFull from "./hStackFull";
import Box from "./box";
import NavLinkButton from "./navLinkButton";

export default function HorizontalScrollingSelector({
  options,
  setExternalSelection,
  heading,
  selectedOption,
  selectedOnTop = true,
  showCurrent = true,
  bg = "bg-col-500",
  buttonClassName = "",
  border,
  showClose = true,
}: {
  options: string[];
  heading?: string;
  showCurrent?: boolean;
  selectedOption?: string;
  selectedOnTop?: boolean;
  buttonClassName?: string;
  setExternalSelection?: (option: string) => void;
  bg?: string;
  border?: string;
  showClose?: boolean;
}) {
  const [selected, setSelected] = useState(selectedOption || options[0] || "");

  useEffect(() => {
    setSelected(selectedOption || options[0] || "");
  }, [selectedOption, options]);

  const selectedOnTopOptions = selected
    ? [selected, ...options.filter((option) => option !== selected)]
    : options;
  const mapSelections = selectedOnTop ? selectedOnTopOptions : options;

  function handleStatusSelect(option: string) {
    setSelected(option);
    if (setExternalSelection) {
      setExternalSelection(option);
    }
  }

  const handleButtonStyle = ({ option }: { option: string }) => {
    if (option === selected) {
      return `bg-col-600 font-[600] text-stroke-3-100 text-col-100 textShadow hover:bg-col-600;`;
    } else {
      return `bg-col-800 border-970-md text-col-100 font-[400] hover:bg-col-600 transition-400`;
    }
  };

  return (
    <FlexFull className={`${bg} ${border} shadowBroadNormal `}>
      <VStackFull className={heading ? `px-[2vh] p-[1vh]` : "p-[0.5vh]"}>
        {heading && (
          <FlexFull className="h-fit">
            <Heading
              text={heading}
              layout="text-xxl-looser"
              shadow="textShadow"
              color="text-col-100"
              className="text-stroke-5-100"
            />
          </FlexFull>
        )}
        <FlexFull
          className={`h-full max-h-full overflow-y-auto justify-center insetOverlay border-980-md`}
        >
          <Box className="w-full max-w-full pb-[0.5vh]">
            <HStackFull
              className={`max-w-maxpx-[2vh] py-[1vh] px-[1.5vh]`}
              gap="gap-[1vh]"
            >
              {mapSelections.map((option) => (
                <FlexFull
                  key={option}
                  className={`${handleButtonStyle({
                    option,
                  })} justify-between shadowNarrowLoose items-center px-[1vh] ${buttonClassName} whitespace-nowrap`}
                  onClick={() => handleStatusSelect(option)}
                >
                  <Text className="text-md-looser">{option} </Text>
                  {option === selected && showCurrent && (
                    <Text className="text-[1.3vh] leading-[1.5vh] text-col-100 textShadow px-[1vh] bg-col-700 metallicEdgesSm h-fit">
                      current
                    </Text>
                  )}
                </FlexFull>
              ))}
            </HStackFull>
          </Box>
        </FlexFull>
        {showClose && (
          <FlexFull className="justify-center items-center">
            <NavLinkButton
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
