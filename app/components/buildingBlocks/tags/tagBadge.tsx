import HStack from "../hStack";
import Text from "../text";
import { CloseIcon } from "styles";
import IconButton from "../iconButton";
import Flex from "../flex";
interface TagBadgeProps {
  tag: string;
  onClick?: (index: number) => void;
  color?: string;
  textShadow?: string;
  index?: number;
  className?: string;
}

export default function TagBadge({
  tag,
  color = "text-col-900",
  onClick,
  index,
  className = "",
}: TagBadgeProps) {
  return (
    <Flex
      className={`pl-[0.3vh] w-fit h-fit shadowNarrowNormal ${className}  bg-col-300`}
    >
      <HStack
        className={`w-full h-fit justify-between items-center gap-[0.1vh] py-[0px]`}
      >
        <Text
          className={`text-md-tighter lowercase ${color} lightTextShadow font-semibold`}
        >
          {tag}
        </Text>
        {onClick && (
          <IconButton
            type="unstyled"
            containerClassName="p-[0px] h-fit w-fit"
            iconClassName="text-[2.2vh] p-[0px]"
            icon={CloseIcon}
            label="remove"
            tooltipPlacement="left"
            onClick={
              typeof index !== "undefined" ? () => onClick(index) : undefined
            }
          />
        )}
      </HStack>
    </Flex>
  );
}
