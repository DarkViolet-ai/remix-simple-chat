import Box from "~/components/buildingBlocks/box";
import Flex from "~/components/buildingBlocks/flex";
import Image from "~/components/buildingBlocks/image";
import Text from "~/components/buildingBlocks/text";
import Transition from "~/components/buildingBlocks/transition";
import VStack from "~/components/buildingBlocks/vStack";

export type Item = {
  id: number;
  text: string;
};

export function TestBox({
  item,
  index,
  itemRefs,
}: {
  item: Item;
  index: number;
  itemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}) {
  const backgroundOptions = [
    "bg-300-linear1op50 text-col-900 text-stroke-7-900 lightTextShadow",
    "bg-100-linear2op50 text-col-900 text-stroke-7-900 lightTextShadow",
    "bg-600-radial3op25 text-col-100 text-stroke-7-100 textShadow",
    "bg-800-diagonal1op75 text-col-900 text-stroke-7-900 lightTextShadow",
    "bg-900-diagonal1op75 text-col-100 text-stroke-7-100 textShadow",
  ];
  const randomBackground =
    index % 2 === 0
      ? backgroundOptions[0]
      : index % 3 === 0
      ? backgroundOptions[4]
      : index % 5 === 0
      ? backgroundOptions[3]
      : index % 7 === 0
      ? backgroundOptions[2]
      : backgroundOptions[1];

  return (
    <Transition duration={0.6} delay={0.5}>
      <div
        key={item.id}
        data-id={item.id}
        ref={(el) => (itemRefs.current[index] = el)}
        className={`h-[30vh] w-[25vh] p-[2vh]`}
      >
        <VStack
          gap="gap-[3vh]"
          className={`w-full h-full border-150-lg font-cursive ${randomBackground} flex justify-center items-center lightGlowMd`}
        >
          <Text className="text-xxxl-tight tracking-wider">{item.text}</Text>
          <Text className="text-xxl-tight">😀</Text>
        </VStack>
      </div>
    </Transition>
  );
}

export function LoadingBar({ children }: { children: React.ReactNode }) {
  return (
    <Flex className="h-[6vh] w-[75vw] border-500-md bg-col-400 rounded-3vh justify-center items-center text-xl-tight lightTextShadow text-col-900 font-semibold shadowNarrowTight">
      {children}
    </Flex>
  );
}

export type MasonryItem = {
  id: number;
  height: string;
  image: string;
};

export function MasonryBox({
  item,
  index,
  itemRefs,
}: {
  item: MasonryItem;
  index: number;
  itemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}) {
  return (
    <Transition duration={0.6}>
      <div
        key={item.id}
        data-id={item.id}
        ref={(el) => (itemRefs.current[index] = el)}
        className={`${item.height} w-[98vw] sm:w-[80vw] md:w-[50vw] xl:w-[33.3vw] fullHD:w-[25vw] p-[1.5vh] overflow-hidden`}
      >
        <Box className="w-full h-full overflow-hidden rounded-[3vh] shadowWideLoose">
          {" "}
          <Image
            src={item.image}
            alt="random"
            w="w-full"
            className="w-full h-full object-cover object-center border-970-sm rounded-[3vh]"
          />
        </Box>
      </div>
    </Transition>
  );
}
