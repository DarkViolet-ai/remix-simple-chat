import Box from "./box";
import { CloseButton } from "./closeButton";
import { CloseTextButton } from "./closeTextButton";
import Flex from "./flex";

export default function DrawerContent({
  showTopButton,
  showBottomButton,
  drawerBg,
  setDrawerOpen,
  children,
}: {
  showTopButton: boolean;
  showBottomButton: boolean;
  drawerBg: string;
  setDrawerOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}) {
  const bottomPadding = showBottomButton ? "pb-[6vh]" : "pb-0";
  return (
    <Flex className="w-full h-full relative">
      {showTopButton && (
        <Box className="absolute top-[1vh] right-[1vh]">
          <CloseButton onClose={() => setDrawerOpen(false)} />
        </Box>
      )}
      {showBottomButton && (
        <Flex className="w-full h-[6vh] bg-darkGrayBack rounded-t-none border-t-2 border-col-850 justify-center fixed bottom-0 left-0 items-center">
          <CloseTextButton onClose={() => setDrawerOpen(false)} />
        </Flex>
      )}

      <Flex className={`w-full h-full ${bottomPadding} ${drawerBg}`}>
        {children}
      </Flex>
    </Flex>
  );
}
