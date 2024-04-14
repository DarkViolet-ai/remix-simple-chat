// FramerMotionModal.tsx
import useEscapeKey from "~/utils/useEscapeKey";
import Transition, {
  TransitionType,
} from "~/components/buildingBlocks/transition";
import Text from "~/components/buildingBlocks/text";
import FlexFull from "~/components/buildingBlocks/flexFull";
import Button from "~/components/buildingBlocks/button";
import VStack from "~/components/buildingBlocks/vStack";

export default function TransitionExample({
  transitionType,
  isOpen,
  closeTransition,
}: {
  transitionType: TransitionType;
  isOpen: boolean;
  closeTransition: () => void;
}) {
  useEscapeKey(() => closeTransition());
  console.log("IsOpen: ", isOpen);

  return (
    <>
      {isOpen && (
        <FlexFull
          className="w-full h-full justify-center items-center bg-linear4op75 defaultOverlayBlur absolute top-0 left-0 z-20"
          onClick={() => closeTransition()}
        >
          <Transition type={transitionType} duration={0.6} delay={0.3}>
            <VStack className="p-[3vh] bg-600-linear6op75 text-col-100 shadowWideLooser">
              <Text className="text-xl-looser">
                transition type = &#34;{transitionType}&#34;
              </Text>
            </VStack>
          </Transition>
          <FlexFull className="fixed bottom-0 left-0 h-[6vh] justify-center items-center">
            <Button buttonText="close" onClick={() => closeTransition()} />
          </FlexFull>
        </FlexFull>
      )}
    </>
  );
}
