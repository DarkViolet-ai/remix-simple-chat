import FlexFull from "~/components/buildingBlocks/flexFull";
import Box from "~/components/buildingBlocks/box";
import Center from "~/components/buildingBlocks/center";
import Image from "~/components/buildingBlocks/image";
import RadialScrollProgressContainer from "~/components/specialty/radialScrollProgressContainer";
import TransitionFull from "~/components/buildingBlocks/TransitionFull";
import DemoNav from "./components/demoNav";

function ScrollItem() {
  const random = Math.floor(Math.random() * 100) + 1;
  return (
    <Box className="p-[0.5vh]">
      <Center className="w-[100vh] h-[73vh] bg-col-770 shadowBroadTight border-970-md flex-shrink-0 overflow-hidden">
        <Image
          src={`https://picsum.photos/id/${random}/600/600.jpg`}
          alt="an example"
          className="w-full h-full object-cover"
        />
      </Center>
    </Box>
  );
}

export default function RadialProgressDemo() {
  const items = Array.from({ length: 10 }, (_, i) => i);
  return (
    <TransitionFull className="h-full relative">
      <DemoNav heading="useScroll: Radial Progress" />
      <FlexFull className="h-full p-[1vh] relative pt-[7vh]">
        <RadialScrollProgressContainer
          snapScroll={false}
          itemComponent={ScrollItem}
          items={items}
          title="Pretty Pictures"
          progressCircleSize="10vh"
          progressPosition="top-[1.5vh] left-[1.5vh]"
          topPadding="pt-[10vh]"
          titleClassName="text-[5vh] font-bold pr-[3vh] h-[12vh]"
        />
      </FlexFull>
    </TransitionFull>
  );
}

// export default function Test() {
//   return <FramerExperiments />;
// }
