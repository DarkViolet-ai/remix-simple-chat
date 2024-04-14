import { useState, ReactNode, useRef, useEffect } from "react";
import VStackFull from "../buildingBlocks/vStackFull";
import HStackFull from "../buildingBlocks/hStackFull";
import Text from "../buildingBlocks/text";
import Icon from "../buildingBlocks/icon";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

interface AccordionProps {
  title: string;
  children: ReactNode;
  titleStyles?: string;
  contentStyles?: string;
}

export default function Accordion({
  title,
  children,
  titleStyles = "bg-100-linear6op75 hover:bg-100-linear6op50 transition-400 text-col-100 textShadow",
  contentStyles = "bg-col-990 text-col-100 textShadow",
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [isOpen, contentRef.current?.scrollHeight]);

  return (
    <VStackFull
      className="overflow-hidden rounded-none"
      gap="gap-[0px]"
      align="items-start"
    >
      <button
        className={`w-full text-left px-[1.5vh] py-[1vh] ${titleStyles} transition-300 rounded-none`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <HStackFull className="rounded-none justify-between">
          <Text className="text-md-tight">{title}</Text>

          <Icon
            icon={isOpen ? BiChevronUp : BiChevronDown}
            iconClassName="text-[3vh]"
          />
        </HStackFull>
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight }}
        className={`transition-500 rounded-none ${
          isOpen ? "overflow-visible" : "overflow-hidden"
        } w-full`}
      >
        <div
          className={`px-[2vh] py-[1vh] w-full ${contentStyles} rounded-none`}
        >
          {children}
        </div>
      </div>
    </VStackFull>
  );
}
