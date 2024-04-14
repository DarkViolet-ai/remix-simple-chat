/* eslint-disable @typescript-eslint/no-explicit-any */
import CenterFull from "~/components/buildingBlocks/centerFull";
import Center from "~/components/buildingBlocks/center";
import VStackFull from "~/components/buildingBlocks/vStackFull";
import Text from "~/components/buildingBlocks/text";
import Box from "~/components/buildingBlocks/box";
import VStack from "~/components/buildingBlocks/vStack";
import { VerticalScrollProgressContainer } from "~/components/specialty/verticalSnapProgress";
import DemoNav from "./components/demoNav";
import TransitionFull from "~/components/buildingBlocks/TransitionFull";

function ScrollBox({ label, content }: { label: string; content: string }) {
  const random = Math.floor(Math.random() * 100) + 1;
  return (
    <div className="w-[70vh] h-[85vh] relative overflow-hidden rounded-none p-[3vh] bg-col-930">
      <Center className="w-full h-full bg-500-radial3op50 shadowBroadLoose border-980-md">
        <VStackFull gap="gap-[2vh] ">
          <VStack className="p-[2vh] bg-col-970 insetShadowXl border-900-md">
            <Text className="text-[4vh] font-semibold text-col-100 textShadow">
              {label}
            </Text>
            <Text className="text-[3vh] font-semibold text-col-100 textShadow">
              {content}
            </Text>
          </VStack>
          <Box className="w-[55vh] h-[55vh] overflow-hidden shadowBroadLoose border-980-md">
            <img
              src={`https://picsum.photos/id/${random}/600/600`}
              alt={`ex ${random}`}
              className="w-full h-full"
            />
          </Box>
        </VStackFull>
      </Center>
    </div>
  );
}

const testItems = Array.from({ length: 15 }, (_, i) => ({
  label: `Item ${i + 1}`,
  content: `This is some content for item ${i + 1}`,
}));

export default function SnapScrollProgressDemo() {
  return (
    <TransitionFull>
      <CenterFull className="relative pt-[5vh] ">
        <Box className="absolute top-0 left-0">
          <DemoNav heading="Snap-Scroll Progress Container" />
        </Box>
        <VerticalScrollProgressContainer
          items={testItems}
          itemComponent={ScrollBox}
        />
      </CenterFull>
    </TransitionFull>
  );
}
