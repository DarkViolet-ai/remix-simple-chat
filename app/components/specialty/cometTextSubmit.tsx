import { Form, useSubmit } from "@remix-run/react";
import FlexFull from "../buildingBlocks/flexFull";
import HStackFull from "../buildingBlocks/hStackFull";
import Box from "../buildingBlocks/box";
import TextArea from "../buildingBlocks/textArea";
import Flex from "../buildingBlocks/flex";
import IconButton from "../buildingBlocks/iconButton";
import BouncingDots from "./bouncingDots";
import Center from "../buildingBlocks/center";
import { useEffect, useRef, useState } from "react";
import Alert from "../buildingBlocks/alert";
import VStack from "../buildingBlocks/vStack";
import { Arrow90UpIcon, RefreshIcon, verticalAlign } from "styles";
import CometBorder from "./cometBorder";

export default function CometTextSubmit({
  isLoading,
  onRefresh,
}: {
  isLoading: boolean;
  onRefresh: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const submit = useSubmit();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit({ chatInput: event.currentTarget.value }, { method: "post" });
    }
  };

  useEffect(() => {
    if (!isLoading) {
      formRef.current?.reset();
    }
  }, [isLoading]);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const openAlert = () => {
    setIsAlertOpen(true);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  const onConfirmDelete = () => {
    onRefresh();
    setIsAlertOpen(false);
  };
  return (
    <>
      <FlexFull className="h-full">
        <Form
          ref={formRef}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexShrink: 0,
            justifyContent: "center",
          }}
          method="POST"
        >
          <HStackFull>
            <Box className={`w-91% md:w-95% shadowNarrowTight`}>
              {isLoading ? (
                <CometBorder
                  h="h-full"
                  p="p-[0.1vh]"
                  cometSize="p-[0.3vh]"
                  cometSpeed="4s"
                  cometLength="80%"
                >
                  <FlexFull className="h-full relative">
                    <Center className="w-full h-full absolute top-0 left-0 bg-col-930">
                      <BouncingDots />
                    </Center>
                    <TextArea
                      name="chatInput"
                      textAreaHeight="h-full"
                      disabled={true}
                      textAreaWidth="w-full md:w-full"
                      value={contentRef.current?.value}
                    />
                  </FlexFull>
                </CometBorder>
              ) : (
                <FlexFull className="h-full p-[0.6vh]">
                  <TextArea
                    onKeyDown={handleKeyDown}
                    ref={contentRef}
                    name="chatInput"
                    textAreaHeight="h-full"
                    textAreaWidth="w-full md:w-full"
                  />
                </FlexFull>
              )}
            </Box>
            <Flex className={`${verticalAlign}`}>
              <VStack className="h-full justify-around">
                <IconButton
                  icon={RefreshIcon}
                  label="refresh"
                  tooltipPlacement="bottomLeft"
                  onClick={() => openAlert()}
                  type="negative"
                />
                <IconButton
                  icon={Arrow90UpIcon}
                  htmlType="submit"
                  label="submit"
                />
              </VStack>
            </Flex>
          </HStackFull>
        </Form>
      </FlexFull>
      {isAlertOpen && closeAlert && cancelRef && onConfirmDelete && (
        <Alert
          isAlertOpen={isAlertOpen}
          title="You sure?"
          body={`Are you sure you want to refresh and delete this chat?`}
          confirmButtonText="Refresh & Delete"
          cancelButtonText="Cancel"
          size="sm"
          onClose={closeAlert}
          cancelRef={cancelRef}
          onConfirmClick={() => onConfirmDelete()}
          bodyTextSize="text-[2.5vh]"
        />
      )}
    </>
  );
}
