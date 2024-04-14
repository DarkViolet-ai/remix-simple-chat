import Box from "./box";
import { CloseButton } from "./closeButton";
import { CloseTextButton } from "./closeTextButton";
import Flex from "./flex";

export default function ModalContent({
  children,
  setModalOpen,
  showTopClose = true,
  showBottomClose = true,
  footerClassName = "bg-col-600",
}: {
  children: React.ReactNode;
  setModalOpen: (isOpen: boolean) => void;
  showTopClose?: boolean;
  showBottomClose?: boolean;
  footerClassName?: string;
}) {
  const paddingBottom = showBottomClose ? "pb-[5vh]" : "pb-0";
  return (
    <Flex className="w-full h-full relative ">
      {showTopClose && (
        <Box className="absolute top-[1vh] right-[1vh]">
          <CloseButton onClose={() => setModalOpen(false)} />
        </Box>
      )}

      <Flex className={`w-full h-full justify-between ${paddingBottom}`}>
        <Flex className="h-full w-full flex-1 ">
          <Box className="w-full h-full rounded-b-none">
            <Box className={`w-full h-full`}>
              <Flex className="w-full h-full">{children}</Flex>
            </Box>
          </Box>
        </Flex>
        {showBottomClose && (
          <Flex
            className={`w-full h-[5vh] justify-center rounded-t-none absolute bottom-0 left-0 ${footerClassName}`}
          >
            <CloseTextButton onClose={() => setModalOpen(false)} />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
