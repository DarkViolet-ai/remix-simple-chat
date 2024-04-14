import Flex from "./flex";

interface DividerProps {
  bg?: string;
  h?: string;
  w?: string;
  m?: string;
  p?: string;
  className?: string;
}

export default function Divider({
  bg = "bg-col-350",
  h = "h-[1px] quadHD:h-[2px]",
  w = "w-98%",
  m = "",
  p = "",
  className = "",
}: DividerProps) {
  return (
    <Flex className={`${bg} ${h} ${w} ${m} ${p} ${className} text-transparent`}>
      .
    </Flex>
  );
}
