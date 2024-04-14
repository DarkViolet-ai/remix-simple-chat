import { useState } from "react";
import { InfoIcon } from "styles";
import Box from "~/components/buildingBlocks/box";
import Button from "~/components/buildingBlocks/button";
import CenterHorizontalFull from "~/components/buildingBlocks/centerHorizontalFull";
import FlexFull from "~/components/buildingBlocks/flexFull";
import IconButton from "~/components/buildingBlocks/iconButton";
import Modal from "~/components/buildingBlocks/modal";
import Text from "~/components/buildingBlocks/text";
import VStackFull from "~/components/buildingBlocks/vStackFull";

export default function InfoModal({
  title,
  useIcon = true,
  children,
  buttonText,
}: {
  title: string;
  useIcon?: boolean;
  children: React.ReactNode;
  buttonText?: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      {useIcon ? (
        <IconButton
          icon={InfoIcon}
          onClick={() => setModalOpen(true)}
          type="smallNormal"
        />
      ) : (
        <Box>
          <Button
            iconLeft={InfoIcon}
            onClick={() => setModalOpen(true)}
            buttonText={buttonText ? buttonText : "Info"}
            type="smallNormal"
          />
        </Box>
      )}
      <Modal
        isOpen={modalOpen}
        setModalOpen={setModalOpen}
        onClose={() => setModalOpen(false)}
        modalSize="w-full h-fit max-h-[90vh] sm:w-80% md:w-70% lg:w-60% xl:w-50% 2xl:w-40%"
      >
        <FlexFull className=" h-full max-h-[70vh] text-col-100  bg-900-radial6op25 border-900-md">
          <VStackFull
            gap="gap-[0px]"
            className="overflow-y-hidden rounded-none"
          >
            <CenterHorizontalFull className="bg-col-700 rounded-b-none">
              <Text className="text-[3vh] font-bold">{title}</Text>
            </CenterHorizontalFull>
            <FlexFull className="h-full overflow-y-auto rounded-none insetShadowXl">
              <FlexFull className="h-fit py-[1vh] px-[2vh]">
                {children}
              </FlexFull>
            </FlexFull>
          </VStackFull>
        </FlexFull>
      </Modal>
    </>
  );
}
