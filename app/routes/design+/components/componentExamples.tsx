import { useRef, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { DrawerSlideDirection } from "types";
import Alert from "~/components/buildingBlocks/alert";
import { Avatar } from "~/components/buildingBlocks/avatar";
import BackgroundImageContainer from "~/components/buildingBlocks/backgroundImageContainer";
import Badge from "~/components/buildingBlocks/badge";
import Box from "~/components/buildingBlocks/box";
import Button from "~/components/buildingBlocks/button";
import Checkbox from "~/components/buildingBlocks/checkBox";
import DrawerWithButton from "~/components/buildingBlocks/drawerWithButton";
import Flex from "~/components/buildingBlocks/flex";
import FlexFull from "~/components/buildingBlocks/flexFull";
import HStackFull from "~/components/buildingBlocks/hStackFull";
import Input from "~/components/buildingBlocks/input";
import InputDateTime from "~/components/buildingBlocks/inputDateTIme";
import InputVStack from "~/components/buildingBlocks/inputVStack";
import ModalWithButton from "~/components/buildingBlocks/modalWithButton";
import PasswordInput from "~/components/buildingBlocks/passwordInput";
import Popover from "~/components/buildingBlocks/popover";
import ScrollingSelector from "~/components/buildingBlocks/scrollingSelector";
import Text from "~/components/buildingBlocks/text";
import TextArea from "~/components/buildingBlocks/textArea";
import TextAreaVStack from "~/components/buildingBlocks/textAreaVStack";
import VStack from "~/components/buildingBlocks/vStack";
import VStackFull from "~/components/buildingBlocks/vStackFull";
import Wrap from "~/components/buildingBlocks/wrap";
import Toast, {
  ToastPosition,
  useToast,
} from "~/components/buildingBlocks/toast";
import {
  drawerTypes,
  toastPositions,
  tooltipPlacements,
  transitionTypes,
} from "./data";
import Tooltip, { TooltipPlacement } from "~/components/buildingBlocks/tooltip";
import { TransitionType } from "~/components/buildingBlocks/transition";
import ValidatedInput from "~/components/buildingBlocks/validatedInput";
import TransitionExample from "./transitionExample";
import TagsInput from "~/components/buildingBlocks/tags/tagsInput";
import Parallax from "~/components/specialty/parallax";
import Accordion from "~/components/specialty/accordion";
import NavLinkButton from "~/components/buildingBlocks/navLinkButton";
import StaggerMenu from "~/components/specialty/staggerMenu";
import ToggleSwitch from "~/components/buildingBlocks/toggleSwitch";

export default function ComponentExamples() {
  const onConfirm = () => {
    console.log("confirmed");
    setIsAlertOpen(false);
  };

  const [externalSelected, setExternalSelection] = useState<string | undefined>(
    "optionSix"
  );
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const openAlert = () => {
    setIsAlertOpen(true);
  };
  const { isToastVisible, showToast, hideToast } = useToast();
  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  function ComponentContainer({
    children,
    className,
    bg = "bg-100-diagonal2op25 ",
    headerText,
  }: {
    children?: React.ReactNode;
    className?: string;
    bg?: string;
    headerText?: string;
  }) {
    return (
      <VStack
        gap="gap-[0px]"
        className={`h-fit ${bg} shadowNarrowLoose max-w-[90vw] ${className}`}
      >
        {headerText && (
          <FlexFull className="px-[1vh] py-[0.5vh] bg-100-linear6op75 rounded-b-none">
            <Text className="font-semibold text-col-100 textShadow">
              {headerText}
            </Text>
          </FlexFull>
        )}
        <FlexFull className="px-[1vh] py-[0.5vh] ">{children}</FlexFull>
      </VStack>
    );
  }
  const [enteredTags, setEnteredTags] = useState<string[]>([]);
  const [toastPosition, setToastPosition] = useState("center-center");
  const [isTransitionOpen, setIsTransitionOpen] = useState(false);
  const [transitionType, setTransitionType] = useState("fade");
  const handleTransitionClick = (transitionType: TransitionType) => {
    setTransitionType(transitionType);
    setIsTransitionOpen(true);
    console.log(isTransitionOpen, transitionType);
  };
  const handleTagsChange = (newTags: string[]) => {
    // console.log("newTags", newTags);
    setEnteredTags(newTags);
  };
  const [toggleOn, setToggleOn] = useState(false);

  return (
    <Flex className="w-full justify-around items-center">
      <Wrap className="w-full items-center justify-around gap-[3vh]">
        <NavLinkButton
          buttonText="Sortable Table Demo"
          to="/design/table-demo"
        />
        <NavLinkButton
          buttonText="Snap-Scroll Progress Demo"
          to="/design/snapscroll-progress"
        />
        <NavLinkButton
          buttonText="Radial Progress Demo"
          to="/design/radial-progress"
        />
        <NavLinkButton
          buttonText="Sticky Panel Demo"
          to="/design/sticky-panels-demo"
        />
        <NavLinkButton
          buttonText="Animated Carousel Demo"
          to="/design/animated-carousel-demo"
        />
        <NavLinkButton
          buttonText="Parallax Shifting Image Demo"
          to="/design/shifting-parallax"
        />
        <NavLinkButton
          buttonText="Horizontal Parallax Carousel"
          to="/design/horizontal-parallax"
        />
        <NavLinkButton
          buttonText="Animated Title Demo"
          to="/design/animated-text-demo"
        />
        <NavLinkButton buttonText="Main Nav Demo" to="/design/main-nav-demo" />
        <Button buttonText="Alert" onClick={openAlert} />
        <NavLinkButton
          to="/design/animate-on-scroll"
          buttonText="Animate on Scroll Duration"
        />
        <NavLinkButton
          to="/design/animate-on-scroll-spring"
          buttonText="Animation on Snap Scroll Spring"
        />{" "}
        <NavLinkButton
          to="/design/infinite-scroll-demo"
          buttonText="Infinite Scroll"
        />
        <NavLinkButton
          to="/design/masonry-grid-demo"
          buttonText="Masonry Grid"
        />
        <Popover
          trigger={<Button buttonText="Popover" />}
          content={<Flex>I am the content</Flex>}
          heading="Popover Heading"
        />
        <ModalWithButton buttonText="Modal">
          <FlexFull className="h-full bg-col-700 justify-center items-center rounded-b-none">
            <Text className="text-mega-normal text-col-100 textShadow">
              This is a lovely Modal!
            </Text>
          </FlexFull>
        </ModalWithButton>
        <ComponentContainer headerText="Stagger Menu">
          <FlexFull className="justify-center">
            <StaggerMenu />
          </FlexFull>
        </ComponentContainer>
        <ComponentContainer headerText="Avatar">
          <ToggleSwitch
            toggleOn={toggleOn}
            setToggleOn={setToggleOn}
            labelOn="Sound On"
            labelOff="Sound Off"
          />
        </ComponentContainer>
        <ComponentContainer headerText="Avatar">
          <Avatar src="/images/fallbackAvatar.png" size="xxl" />
        </ComponentContainer>
        <BackgroundImageContainer
          w="w-[15vh]"
          image="/images/fallbackAvatar.png"
          containerClassName="shadowNarrowTight"
        >
          <Text className="font-bold text-col-100 textFog">
            Background Image
          </Text>
        </BackgroundImageContainer>
        <Badge label="Badge" />
        <ComponentContainer>
          <VStack>
            <Checkbox label="Checkbox" />
            <Checkbox label="Disabled" isDisabled />
            <Checkbox label="Checked" isChecked />
          </VStack>
        </ComponentContainer>
        <ComponentContainer headerText="Date Time Picker">
          <InputDateTime containerHeight="h-[38vh]" />
        </ComponentContainer>
        <ComponentContainer headerText="Drawer">
          <VStackFull>
            {drawerTypes.map((type) => (
              <HStackFull key={type} className="justify-between">
                <Text>{type}</Text>
                <DrawerWithButton
                  icon={BiMenu}
                  buttonType="smallNormal"
                  slideDirection={type as DrawerSlideDirection}
                >
                  <FlexFull className="h-full justify-center items-center">
                    <Text className="text-xxl-loose text-col-100 textShadow">
                      {type}
                    </Text>
                  </FlexFull>
                </DrawerWithButton>
              </HStackFull>
            ))}
          </VStackFull>
        </ComponentContainer>
        <VStack gap="gap-[2vh]">
          {" "}
          <ComponentContainer headerText="Input">
            <Box className="w-[25vh]">
              <Input />
            </Box>
          </ComponentContainer>
          <ComponentContainer headerText="TextArea">
            <Box className="w-[25vh]">
              <TextArea />
            </Box>
          </ComponentContainer>
        </VStack>
        <VStack gap="gap-[2vh]">
          {" "}
          <ComponentContainer headerText="InputVStack">
            <Box className="w-[25vh]">
              <InputVStack label="Input Label" />
            </Box>
          </ComponentContainer>
          <ComponentContainer headerText="TextAreaVStack">
            <Box className="w-[25vh]">
              <TextAreaVStack label="Text Area Label" />
            </Box>
          </ComponentContainer>
        </VStack>
        <VStack gap="gap-[2vh]">
          <ComponentContainer headerText="Password Input" className="w-[40vh]">
            <PasswordInput />
          </ComponentContainer>
          <ComponentContainer headerText="Validated Input" className="w-[30vh]">
            <FlexFull className="justify-center">
              <ValidatedInput max={10} />
            </FlexFull>
          </ComponentContainer>
        </VStack>
        <ComponentContainer headerText="Tags Input" className="w-[30vh]">
          <FlexFull className="justify-center">
            <TagsInput tags={enteredTags} onTagsChange={handleTagsChange} />
          </FlexFull>
        </ComponentContainer>
        <ComponentContainer headerText="Select Menu" className="w-[30vh]">
          <VStackFull>
            <HStackFull>
              <Text className="font-bold">Selected:</Text>
              <Text>{externalSelected}</Text>
            </HStackFull>
            <FlexFull className="justify-center h-[30vh]">
              <ScrollingSelector
                setExternalSelection={setExternalSelection}
                selectedOption={externalSelected}
                selectedOnTop={false}
                showClose={false}
                options={[
                  "option one",
                  "optionTwo",
                  "optionThree",
                  "optionFour",
                  "optionFive",
                  "optionSix",
                  "optionSeven",
                  "optionEight",
                  "optionNine",
                  "optionTen",
                ]}
              />
            </FlexFull>
          </VStackFull>
        </ComponentContainer>
        <ComponentContainer headerText="Toast" className="w-[30vh]">
          <FlexFull className="justify-center">
            <VStack>
              {toastPositions.map((position) => (
                <Button
                  width="w-[23vh]"
                  key={position}
                  type="smallNormal"
                  buttonText={position}
                  onClick={() => {
                    setToastPosition(position);
                    showToast();
                  }}
                />
              ))}
            </VStack>
          </FlexFull>
        </ComponentContainer>
        <ComponentContainer headerText="Tooltip" className="">
          <FlexFull className="justify-center">
            <Wrap className="w-full justify-around gap-[3vh] p-[2vh] lg:w-[60vw] xxl:w-[50vw]">
              {tooltipPlacements.map((placement) => (
                <Tooltip
                  key={placement}
                  placement={placement as TooltipPlacement}
                  label={placement}
                  bg="bg-col-800"
                >
                  <Flex className="justify-center bg-300-diagonal1op25 w-[23vh] shadowNarrowNormal">
                    <Text className="text-lg-tight">{placement}</Text>
                  </Flex>
                </Tooltip>
              ))}
            </Wrap>
          </FlexFull>
        </ComponentContainer>
        <ComponentContainer headerText="Transition" className="">
          <FlexFull className="justify-center">
            <Wrap className="w-full justify-around gap-[1.5vh] p-[2vh] lg:w-[60vw] xxl:w-[50vw]">
              {transitionTypes.map((type) => (
                <Button
                  buttonText={type}
                  key={type}
                  type="smallNormal"
                  onClick={() => handleTransitionClick(type as TransitionType)}
                />
              ))}
            </Wrap>
          </FlexFull>
        </ComponentContainer>
        <ComponentContainer headerText="Parallax with Image">
          <Parallax imageOnly />
        </ComponentContainer>
        <ComponentContainer headerText="Parallax with Text">
          <Parallax
            title="The Melody of Raindrops"
            tagline="Unveiling the Serenade of the Skies"
          >
            <VStackFull>
              <p>
                In the heart of nature&apos;s symphony, raindrops compose a
                timeless melody, a soothing serenade that whispers to the soul.
                This ethereal music, born from the heavens, dances upon rooftops
                and windows, creating a rhythm that resonates with the heartbeat
                of the earth. Each drop, a note; together, they orchestrate the
                symphony of the rain, a sound so pure it cleanses the air and
                rejuvenates life.
              </p>
              <p>
                Amidst the cascade of silver threads, the world transforms.
                Streets glisten under the embrace of the rain, and the air fills
                with the fresh scent of petrichor, the earth&apos;s perfume
                released upon receiving the sky&apos;s affection. Trees and
                flowers bask in the nourishing touch, their leaves shimmering
                with droplets that catch the faint light, turning every view
                into a masterpiece of sparkling jewels.
              </p>
              <p>
                But beyond its beauty and melody, rain symbolizes renewal and
                growth. It teaches us the art of letting go, washing away the
                remnants of yesterday, and nurturing the seeds of tomorrow. In
                its presence, we find moments of reflection, an invitation to
                pause and revel in the simple joys of life. The rain, with its
                gentle persistence, reminds us of nature&apos;s cycles, the ebb
                and flow of life, and the preciousness of every drop in the vast
                ocean of existence.
              </p>
            </VStackFull>
          </Parallax>
        </ComponentContainer>
        <ComponentContainer headerText="Accordion">
          <VStack gap="gap-[0px]" className="w-[40vh] h-[40vh]">
            <Accordion title="Accordion Element One">
              <p>This is the epic content of element one.</p>
            </Accordion>
            <Accordion title="Accordion Element Two ">
              <InputVStack
                label="This accordion has an input field"
                labelIsCursive={false}
                labelColor="text-col-100"
                labelShadow="textShadow"
                labelSize="small"
              />
            </Accordion>
            <Accordion title="Accordion Element Three">
              <Text className="text-lg-tight">😄🦄</Text>
            </Accordion>
          </VStack>
        </ComponentContainer>
      </Wrap>
      {isToastVisible && (
        <Toast
          message={`I am so toasty - ${toastPosition}`}
          isVisible={isToastVisible}
          duration={5000}
          onClose={hideToast}
          position={toastPosition as ToastPosition}
        />
      )}
      {isAlertOpen && (
        <Alert
          isAlertOpen={isAlertOpen}
          title="You sure?"
          body={`Please confirm this important thing?`}
          confirmButtonText="Yes!"
          cancelButtonText="Cancel"
          alertDimensions="h-50% w-90% md:w-[60vh]"
          bodyClassName="justify-evenly py-[2vh]"
          onClose={closeAlert}
          cancelRef={cancelRef}
          onConfirmClick={() => onConfirm()}
          bodyTextSize="text-[2.5vh]"
        />
      )}
      {isTransitionOpen && (
        <TransitionExample
          isOpen={isTransitionOpen}
          closeTransition={() => setIsTransitionOpen(false)}
          transitionType={transitionType as TransitionType}
        />
      )}
    </Flex>
  );
}
