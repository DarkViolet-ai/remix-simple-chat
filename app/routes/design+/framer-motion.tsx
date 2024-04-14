/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unescaped-entities */

import CodeExample from "~/components/buildingBlocks/codeExample";
import FlexFull from "~/components/buildingBlocks/flexFull";
import VStackFull from "~/components/buildingBlocks/vStackFull";
import Wrap from "~/components/buildingBlocks/wrap";
import { FramerReanimate } from "./components/framerReanimate";
import {
  ExampleEight,
  ExampleEleven,
  ExampleFifteen,
  ExampleFive,
  ExampleFour,
  ExampleFourteen,
  ExampleNine,
  ExampleOne,
  ExampleSeven,
  ExampleSix,
  ExampleTen,
  ExampleThirteen,
  ExampleThree,
  ExampleTwelve,
  ExampleTwo,
} from "./components/framerExperiments";
import {
  BulletListItem,
  HeadingText,
  NestedBulletListItem,
} from "./components/displayComponents";
import { InteractiveKeyFrames } from "./components/keyframeExperiments";
import NavContainer from "~/components/buildingBlocks/navContainer";
import Heading from "~/components/buildingBlocks/headingText";
import NavIconButton from "~/components/buildingBlocks/navLinkIconButton";
import { HomeIcon, ReturnPathIcon } from "styles";
import CenterHorizontalFull from "~/components/buildingBlocks/centerHorizontalFull";
import HStackFull from "~/components/buildingBlocks/hStackFull";

export default function FramerExperiments() {
  return (
    <FlexFull className="h-screen overflow-y-auto overflow-x-hidden relative">
      <NavContainer>
        <HStackFull className="justify-between px-[1vh] h-full items-center ">
          <NavIconButton
            icon={HomeIcon}
            type="smallNormal"
            to="/"
            label="home"
          />
          <NavIconButton
            icon={ReturnPathIcon}
            type="smallNormal"
            to="/design/animation"
            label="animation"
          />
          <CenterHorizontalFull>
            <Heading
              text="Experiments with Framer Motion"
              layout="text-xxl-loose"
            />
          </CenterHorizontalFull>
        </HStackFull>
      </NavContainer>
      <VStackFull className=" pt-[6vh]">
        <Wrap className="w-full h-fit justify-evenly p-[1.5vh] gap-[1.5vh] ">
          {/* animation  */}
          <FramerReanimate
            title="animation"
            code={`<motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 180, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="w-[15vh] h-[15vh] bg-col-200 shadowBroadTight rounded-[2vh]"
            />`}
          >
            <ExampleOne />
          </FramerReanimate>
          {/* variants  */}
          <FramerReanimate
            title="variants"
            code={`const container = {
            hidden: { opacity: 1, scale: 0 },
            visible: {
        opacity: 1,
        scale: 1,
        transition: {
          delayChildren: 0.3,
          staggerChildren: 0.2,
        },
            },
          };
        
          const item = {
            hidden: { y: 20, opacity: 0 },
            visible: {
        y: 0,
        opacity: 1,
            },
          };
        
          return (
            <motion.ul
        className="w-97% h-97% grid list-none grid-cols-2 grid-rows-2 gap-[2vh] p-[2vh] border-200-md insetShadowXl"
        variants={container}
        initial="hidden"
        animate="visible"
            >
        {[0, 1, 2, 3].map((index) => (
          <motion.li
            key={index}
            className=" bg-col-300 rounded-full shadowBroadTight"
            variants={item}
          />
        ))}
            </motion.ul>`}
            infoTitle="variants"
            info={
              <VStackFull align="items-start">
                <BulletListItem>
                  Variants in Framer Motion are predefined sets of style
                  properties and animations that can be applied to motion
                  components. They provide a way to organize and reuse animation
                  definitions, making it easier to manage complex animations and
                  transitions.
                </BulletListItem>
                <HeadingText heading="Variants in this example" />
                <BulletListItem>
                  In this component, two variants are defined: container and
                  item.
                </BulletListItem>
                <BulletListItem highlighted="container Variant: ">
                  This variant is applied to the motion.ul element. It defines
                  two states:
                </BulletListItem>
                <NestedBulletListItem highlighted=" hidden: ">
                  Sets the opacity to 1 and scale to 0, effectively making the
                  container invisible initially (though fully opaque).
                </NestedBulletListItem>
                <NestedBulletListItem highlighted="visible: ">
                  Changes the scale to 1, making the container fully visible. It
                  also includes transition properties like delayChildren, which
                  delays the animation of child components, and staggerChildren,
                  which staggers the animations of child components in sequence.
                </NestedBulletListItem>
                <BulletListItem highlighted="item Variant:">
                  Applied to each motion.li element, representing individual
                  items within the container. It also has two states:
                </BulletListItem>
                <NestedBulletListItem highlighted="hidden: ">
                  Positions the item 20 pixels down (y: 20) and sets its opacity
                  to 0, making it invisible at the start.
                </NestedBulletListItem>
                <NestedBulletListItem highlighted="visible: ">
                  Moves the item to its original position (y: 0) and fades it in
                  to full opacity (opacity: 1).
                </NestedBulletListItem>
                <HeadingText heading="How Variants Work in Framer Motion" />
                <BulletListItem highlighted="State Management: ">
                  Variants represent different states of a component (like
                  hidden and visible) and the style or animation properties
                  associated with those states.{" "}
                </BulletListItem>
                <BulletListItem highlighted="Animation Control: ">
                  When the animate prop of a motion component is set to a
                  variant name (e.g., visible), Framer Motion automatically
                  applies the defined properties and transitions to the
                  component.{" "}
                </BulletListItem>
                <BulletListItem highlighted=" Hierarchy and Inheritance: ">
                  Variants allow for hierarchical animation control. In this
                  example, the container variant controls the overall container
                  animation and its relation to the child components (item
                  variants), allowing for coordinated animations like staggered
                  effects.{" "}
                </BulletListItem>
                <BulletListItem highlighted=" Reusability: ">
                  Variants can be reused across different components or
                  instances, promoting consistency and reducing redundancy in
                  animation code.
                </BulletListItem>
                <HeadingText heading="Benefits of Using Variants" />
                <BulletListItem highlighted="Simplification: ">
                  They simplify the animation code by abstracting the animation
                  definitions away from the component, making the component code
                  cleaner and more readable.
                </BulletListItem>
                <BulletListItem highlighted="Consistency: ">
                  By defining animations in one place and reusing them across
                  components, variants help ensure consistent animations
                  throughout the application.
                </BulletListItem>
                <BulletListItem
                  highlighted="Complex Animation
                  Sequences: "
                >
                  Variants, especially when combined with transition properties
                  like staggerChildren, make it easier to create complex
                  animation sequences and orchestrate the timing between parent
                  and child components.
                </BulletListItem>
                <HeadingText heading="Summary" />
                <BulletListItem>
                  In this example, variants are effectively used to manage the
                  animations of the list container and its items, demonstrating
                  how variants can be used to create complex, coordinated
                  animations in a concise and manageable way.
                </BulletListItem>
              </VStackFull>
            }
          >
            {" "}
            <ExampleTwo />
          </FramerReanimate>
          {/* gestures  */}
          <FramerReanimate
            title="gestures"
            showReanimate={false}
            code={`<motion.div
        className="bg-100-radial3op50 h-[23vh] w-[23vh] rounded-[2vh] shadowBroadTight"
        whileHover={{ scale: 1.2, rotate: 90 }}
        whileTap={{
          scale: 0.8,
          rotate: -90,
          borderRadius: "100%",
        }}
            />`}
            infoTitle="gestures"
            info={
              <VStackFull align="items-start">
                <BulletListItem>
                  In Framer Motion, gestures are interactions that can trigger
                  animations or actions on UI elements, such as hovering,
                  tapping, panning, and more. These interactions allow for more
                  engaging and dynamic user experiences.
                </BulletListItem>
                <HeadingText heading="Gestures in this component" />
                <BulletListItem>
                  In this example, two gesture-related props are used:
                  whileHover and whileTap. Here's how they function:
                </BulletListItem>
                <BulletListItem highlighted="whileHover: ">
                  This prop defines the animation that should occur when the
                  user hovers over the element. In this case, the element scales
                  up to 1.2 times its original size and rotates 90 degrees.{" "}
                </BulletListItem>
                <BulletListItem highlighted="whileTap: ">
                  This prop specifies the animation that should occur when the
                  element is tapped or clicked. The element scales down to 0.8
                  times its original size, rotates -90 degrees, and its border
                  radius changes to "100%", making it fully rounded (circle).
                </BulletListItem>
                <HeadingText heading="How Gestures Work in Framer Motion" />
                <BulletListItem highlighted="Direct Interaction: ">
                  Gestures allow users to interact directly with elements in the
                  UI, triggering animations or actions in response to those
                  interactions.
                </BulletListItem>
                <BulletListItem highlighted="Dynamic Response: ">
                  The component responds dynamically to user interactions. For
                  instance, when the user hovers over or taps the element, the
                  specified animations are triggered immediately.
                </BulletListItem>
                <BulletListItem highlighted="Styling Changes: ">
                  In addition to triggering animations, gestures can be used to
                  apply immediate styling changes, such as color changes,
                  opacity, or other CSS properties.
                </BulletListItem>
                <HeadingText heading="Implementation in this example" />
                <BulletListItem>
                  The motion.div element is enhanced with gesture capabilities
                  using whileHover and whileTap props, allowing it to react to
                  hover and tap events with specific animations.
                </BulletListItem>
                <BulletListItem>
                  The animations are declaratively defined in the props, making
                  the component concise and easy to understand.
                </BulletListItem>
                <BulletListItem>
                  Framer Motion under the hood handles the complexity of adding
                  event listeners and managing the lifecycle of these
                  interactions.
                </BulletListItem>
                <HeadingText heading="General aspects of gestures" />
                <BulletListItem highlighted="Ease of Use: ">
                  Framer Motion's API for gestures is designed to be intuitive,
                  allowing developers to easily add interactive animations to
                  their components.
                </BulletListItem>

                <BulletListItem highlighted="Integration with React: ">
                  Gesture animations in Framer Motion integrate seamlessly with
                  React, maintaining the component's reactivity and
                  statefulness.
                </BulletListItem>
                <BulletListItem highlighted="Performance: ">
                  Framer Motion optimizes gesture animations for performance,
                  ensuring smooth and responsive interactions even with complex
                  animations.
                </BulletListItem>
                <HeadingText heading="Summary" />
                <BulletListItem>
                  This component demonstrates the use of hover and tap gestures
                  to create interactive animations in Framer Motion. These
                  gestures enhance the user experience by providing immediate
                  visual feedback in response to user interactions, making the
                  UI more dynamic and engaging.
                </BulletListItem>
              </VStackFull>
            }
          >
            <ExampleThree />
          </FramerReanimate>
          {/* drag  */}
          <FramerReanimate
            title="drag"
            showReanimate={false}
            code={`const constraintsRef = useRef(null);
            <motion.div
        ref={constraintsRef}
        className="w-95% h-95% flex justify-center items-center overflow-hidden bg-col-990 insetShadowXl rounded-[2vh] border-990-md"
            >
        <motion.div
          className="w-[8vh] h-[8vh] bg-100-linear2op75 border-300-sm shadowBroadTight rounded-[2vh]"
          drag
          dragConstraints={constraintsRef}
        />
            </motion.div>`}
            infoTitle="drag"
            info={
              <VStackFull align="items-start">
                <BulletListItem>
                  In Framer Motion, the drag functionality allows elements to be
                  moved around within the viewport or within specified
                  constraints, providing an interactive and dynamic user
                  experience. This functionality can be easily added to motion
                  components to make them draggable.
                </BulletListItem>
                <HeadingText
                  heading="Drag as used in this component
                "
                />
                <BulletListItem>
                  In this example, the drag prop is used to make a motion.div
                  draggable. Here’s how it works:
                </BulletListItem>
                <BulletListItem highlighted="Draggable Element: ">
                  The inner motion.div is made draggable by adding the drag
                  prop. This allows the user to click and drag this element
                  across the screen.
                </BulletListItem>
                <BulletListItem highlighted="Constraints: ">
                  The dragConstraints prop limits the draggable area to the
                  boundaries of another element. In this case, the outer
                  motion.div acts as the boundary. The ref= constraintsRef is
                  used to reference this outer motion.div, and
                  dragConstraints=constraintsRef applies these constraints to
                  the inner motion.div.
                </BulletListItem>
                <HeadingText
                  heading="How Drag Works in Framer Motion
                "
                />
                <BulletListItem highlighted="Enabling Drag: ">
                  By setting the drag prop on a motion component, it becomes
                  interactive and can be moved by user input.
                </BulletListItem>
                <BulletListItem highlighted="Constraint Boundaries: ">
                  The dragConstraints prop defines the area within which the
                  element can be dragged. This prevents the element from being
                  moved outside a specified area, which can be particularly
                  useful for creating bounded draggable interfaces.
                </BulletListItem>
                <BulletListItem highlighted="Reference to Constraints: ">
                  useRef(null) is used to create a reference (constraintsRef) to
                  the outer motion.div. This reference is then used in
                  dragConstraints to establish the draggable area for the inner
                  motion.div.
                </BulletListItem>
                <HeadingText heading="Additional Drag-related Features in Framer Motion" />
                <BulletListItem highlighted="Axis-specific Drag: ">
                  You can restrict dragging to a single axis (horizontal or
                  vertical) by setting the drag prop to "x" or "y".
                </BulletListItem>
                <BulletListItem highlighted="Drag Elasticity and Inertia: ">
                  Customize the drag experience by adjusting properties like
                  dragElastic (how much the element can stretch past its
                  constraints) and dragMomentum (whether the element should
                  continue moving after being released based on the user's drag
                  speed).
                </BulletListItem>
                <BulletListItem highlighted="Event Handlers: ">
                  Framer Motion provides event handlers like onDragStart,
                  onDragEnd, and onDrag that allow you to execute custom
                  functions during the drag lifecycle, providing additional
                  control over the drag behavior.
                </BulletListItem>

                <HeadingText heading="Summary" />
                <BulletListItem>
                  In this component, the drag functionality creates a tactile
                  interaction where the user can move the element within a
                  defined area, demonstrating how Framer Motion's drag
                  capabilities can be used to enhance the interactivity and user
                  engagement of web elements.
                </BulletListItem>
              </VStackFull>
            }
          >
            <ExampleFour />
          </FramerReanimate>
          {/* path  */}
          <FramerReanimate
            title="path"
            code={`const icon = {
            hidden: {
        opacity: 0,
        pathLength: 0,
        fill: "rgba(0, 100, 100, 0)",
            },
            visible: {
        opacity: 1,
        pathLength: 1,
        fill: "rgba(0, 255, 255, 1)",
            },
          };
        
          return (
            <div className="w-95% h-95% flex justify-center items-center overflow-hidden bg-col-990 border-900-md insetShadowXl rounded-[2vh]">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-50% overflow-visible stroke-cyan-700 stroke-[0.2vh]"
        >
          <motion.path
            d="
              M70,16
              c0,20,-10,30,-20,30
              c10,0,20,10,20,30
              c0,-20,10,-30,20,-30
              c-10,0,-20,-10,-20,-30
              z
              M30,0
              c0,20,-10,30,-20,30
              c10,0,20,10,20,30
              c0,-20,10,-30,20,-30
              c-10,0,-20,-10,-20,-30
              z
              M43,42
              c0,20,-10,30,-20,30
              c10,0,20,10,20,30
              c0,-20,10,-30,20,-30
              c-10,0,-20,-10,-20,-30
              z
        "
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: 2, ease: "easeInOut" },
              fill: {
                duration: 2,
                ease: [1, 0, 0.8, 1],
              },
            }}
          />
        </motion.svg>
            </div>
          );`}
            infoTitle="motion.path"
            info={
              <VStackFull align="items-start">
                <BulletListItem>
                  motion.path in Framer Motion is a special component used to
                  animate SVG paths. It allows for the control and animation of
                  path properties like pathLength, stroke, fill, and opacity,
                  among others. This capability makes it incredibly useful for
                  creating complex and visually engaging animations directly
                  within SVG elements.
                </BulletListItem>
                <HeadingText heading="motion.path in this component" />
                <BulletListItem>
                  In this example, motion.path is used to animate an SVG path
                  element. The animation is defined through variants (icon) and
                  involves changes in opacity, path length, and fill color.
                </BulletListItem>
                <BulletListItem highlighted="Opacity: ">
                  The animation transitions the opacity of the path from 0 to 1,
                  making the path gradually appear as the animation progresses.
                </BulletListItem>
                <BulletListItem highlighted="Path Length: ">
                  The pathLength property is animated from 0 to 1. This makes it
                  seem like the path is being drawn progressively. At 0, none of
                  the path is visible, and at 1, the entire path is drawn.{" "}
                </BulletListItem>
                <BulletListItem highlighted="Fill: ">
                  The color of the path fills gradually changes from transparent
                  (rgba(0, 100, 100, 0)) to a solid cyan color (rgba(0, 255,
                  255, 1)), creating a filling effect as the path gets drawn.
                </BulletListItem>
                <HeadingText heading="How motion.path Works " />
                <BulletListItem highlighted="SVG Path Animation: ">
                  motion.path extends the capabilities of SVG path elements,
                  allowing them to be animated using Framer Motion's powerful
                  animation and transition features.{" "}
                </BulletListItem>
                <BulletListItem highlighted="Control and Flexibility: ">
                  By using motion.path, you get fine-grained control over how
                  the path's properties change over time, either in response to
                  user interactions or as part of predefined animations.
                </BulletListItem>
                <HeadingText heading="Transition and Animation Control " />
                <BulletListItem>
                  The transition property in motion.path controls how the
                  animation between variant states occurs. In this component,
                  separate transition configurations are provided for the
                  default properties and the fill color, allowing for different
                  easing and duration settings for different aspects of the
                  animation.{" "}
                </BulletListItem>
                <BulletListItem highlighted="easeInOut">
                  easing is used for most properties, providing a smooth start
                  and end to the animation, while the fill color has a custom
                  easing array to fine-tune its animation effect.
                </BulletListItem>
                <HeadingText heading="Importion aspects of motion.path " />
                <BulletListItem highlighted="Enhanced SVG Animations: ">
                  motion.path uses Framer Motion's animation engine to enhance
                  the capabilities of SVG path animations, going beyond simple
                  CSS animations.{" "}
                </BulletListItem>
                <BulletListItem highlighted="Interactivity and Responsiveness: ">
                  Animations can be tied to user interactions, such as hover or
                  click events, making SVGs more interactive and dynamic.{" "}
                </BulletListItem>
                <BulletListItem highlighted="Performance: ">
                  Framer Motion optimizes the performance of animations,
                  ensuring that they run smoothly even when complex paths are
                  animated.
                </BulletListItem>
                <HeadingText heading="Summary" />
                <BulletListItem>
                  motion.path in Framer Motion provides a flexible way to
                  animate SVG paths, offering detailed control over the
                  animation of path properties and enabling the creation of
                  intricate and dynamic visual effects in web applications. In
                  this component, it is used to craft a detailed path drawing
                  animation that enhances the visual appeal and interactivity of
                  the SVG graphic.
                </BulletListItem>
              </VStackFull>
            }
          >
            {" "}
            <ExampleFive />
          </FramerReanimate>
          {/* keyframes  */}
          <FramerReanimate
            title="keyframes"
            code={`<motion.div
        className="w-[15vh] h-[15vh] bg-500-radial5op50 rounded-[2vh] shadowBroadTight border-970-md"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: 1,
          repeatDelay: 1,
        }}
            />`}
            infoTitle="keyframes"
            info={
              <VStackFull align="items-start">
                <BulletListItem highlighted="">
                  Keyframes in Framer Motion are used to define a sequence of
                  values that an animation should go through over time, allowing
                  for complex and multi-step animations. They are akin to
                  keyframes in traditional animation and CSS animations,
                  specifying the target values at various points during the
                  animation.
                </BulletListItem>
                <HeadingText heading="Usage of Keyframes in this component" />
                <BulletListItem>
                  In this component, keyframes are used to animate multiple
                  properties of a motion.div element over time:
                </BulletListItem>
                <BulletListItem highlighted="Background Color: ">
                  The background property transitions through a sequence of
                  colors, creating a gradient effect that changes over time.{" "}
                </BulletListItem>
                <BulletListItem highlighted="Scale: ">
                  The scale property is animated through a series of values,
                  making the element grow and shrink in a rhythmic pattern.{" "}
                </BulletListItem>
                <BulletListItem highlighted="Rotation: ">
                  The rotate property makes the element turn clockwise and
                  counterclockwise through a set of angles.{" "}
                </BulletListItem>
                <BulletListItem highlighted="Border Radius: ">
                  The borderRadius property changes, making the corners of the
                  element transition from sharp to rounded and back.
                </BulletListItem>
                <HeadingText heading="How Keyframes Work in Framer Motion " />
                <BulletListItem
                  highlighted="Defining the Animation
                  Sequence: "
                >
                  Keyframes are defined as arrays of values that the animated
                  property will transition through during the animation.{" "}
                </BulletListItem>
                <BulletListItem highlighted="Control Over Timing: ">
                  The times array in the transition prop can be used to control
                  the timing of each keyframe, defining what proportion of the
                  animation duration each keyframe should occur at.{" "}
                </BulletListItem>
                <BulletListItem highlighted="Repeating Animations: ">
                  The repeat and repeatDelay properties in the transition object
                  allow the animation to loop a specified number of times, with
                  a delay between repetitions.
                </BulletListItem>
                <HeadingText heading="Additional aspects of keyframes" />
                <BulletListItem highlighted="Ease and Duration: ">
                  The ease and duration properties in the transition object
                  define the pacing and total runtime of the animation,
                  respectively. The ease function applies to the transitions
                  between each keyframe, not just the start and end of the
                  entire animation.{" "}
                </BulletListItem>
                <BulletListItem highlighted="Versatility: ">
                  Keyframes can be used to animate almost any property or
                  attribute in Framer Motion, including colors, sizes,
                  positions, and SVG paths.{" "}
                </BulletListItem>
                <BulletListItem highlighted="Dynamic Animations: ">
                  Unlike static CSS animations, keyframes in Framer Motion can
                  be dynamically updated based on component state or props,
                  making them highly adaptable to user interactions and other
                  runtime conditions.
                </BulletListItem>
                <HeadingText heading="Summary" />
                <BulletListItem highlighted="">
                  Keyframes in Framer Motion offer a powerful way to create
                  detailed and complex animations by defining specific values at
                  multiple points during the animation sequence. In this
                  example, they are used to create a dynamic and engaging
                  animation that cycles through changes in color, size,
                  rotation, and border radius, demonstrating the flexibility and
                  control that keyframes provide in designing interactive and
                  visually compelling animations.
                </BulletListItem>
              </VStackFull>
            }
          >
            {" "}
            <ExampleSix />
          </FramerReanimate>
          {/* motion values  */}
          <FramerReanimate
            title="motion values"
            showReanimate={false}
            code={`const x = useMotionValue(0);
  const xInput = [-100, 0, 100];
  const background = useTransform(x, xInput, [
    "linear-gradient(180deg, #ffeede 0%, #025373 100%)",
    "linear-gradient(180deg, #F27D72 0%, #45233e 100%)",
    "linear-gradient(180deg, #9C6892 0%, #F2B680 100%)",
  ]);
  const color = useTransform(x, xInput, [
    "rgb(69, 35, 62)",
    "rgb(2, 83, 115)",
    "rgb(156, 104, 146)",
  ]);
  const tickPath = useTransform(x, [10, 100], [0, 1]);
  const crossPathA = useTransform(x, [-10, -55], [0, 1]);
  const crossPathB = useTransform(x, [-50, -100], [0, 1]);

  return (
    <motion.div className="w-full h-full relative" style={{ background }}>
      <motion.div
        className="bg-100-linear2op25 w-[10vh] h-[10vh] absolute top-1/3 left-1/3 flex justify-center items-center rounded-[2vh] shadowBroadTight border-970-md"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
      >
        <svg className="w-80% h-80%" viewBox="0 0 50 50">
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
            style={{ translateX: 5, translateY: 5 }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M14,26 L 22,33 L 35,16"
            strokeDasharray="0 1"
            style={{ pathLength: tickPath }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M17,17 L33,33"
            strokeDasharray="0 1"
            style={{ pathLength: crossPathA }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M33,17 L17,33"
            strokeDasharray="0 1"
            style={{ pathLength: crossPathB }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );`}
            infoTitle="motion values"
            info={
              <VStackFull align="items-start">
                <BulletListItem>
                  Motion values in Framer Motion are used to create reactive
                  animations and effects that can respond to state changes, user
                  input, or other dynamic conditions in your application. They
                  provide a way to interpolate values over time or in response
                  to user interactions, such as dragging, scrolling, or
                  hovering.
                </BulletListItem>
                <HeadingText heading="Usage of Motion Values this component" />
                <BulletListItem>
                  Here, motion values are extensively used to create dynamic,
                  data-driven animations:
                </BulletListItem>
                <BulletListItem highlighted="useMotionValue(0): ">
                  This initializes a motion value for x starting at 0. This
                  value can be updated dynamically, and it can drive animations
                  or transformations in the component.
                </BulletListItem>
                <BulletListItem highlighted="useTransform: ">
                  This function creates a new motion value that is the result of
                  transforming another motion value through a function or range
                  of values. For example, here:
                </BulletListItem>
                <NestedBulletListItem highlighted=" background, color, tickPath, crossPathA, and crossPathB ">
                  are derived from the x motion value.
                </NestedBulletListItem>
                <NestedBulletListItem>
                  These derived motion values are used to dynamically update the
                  background gradient, stroke color, and the path lengths of SVG
                  elements based on the x position of the draggable element.
                </NestedBulletListItem>
                <BulletListItem highlighted=" Drag Interaction: ">
                  The drag="x" prop on the inner motion.div allows the element
                  to be dragged along the x-axis. The x motion value is updated
                  based on this interaction, which in turn updates the derived
                  motion values and consequently the visual appearance of the
                  component.
                </BulletListItem>
                <HeadingText heading="How Motion Values Work" />
                <BulletListItem highlighted="Reactivity: ">
                  Motion values are reactive. When their value changes, anything
                  bound to them updates automatically. This makes it easy to
                  create animations that respond to user input or other dynamic
                  conditions.
                </BulletListItem>
                <BulletListItem highlighted="Performance: ">
                  Motion values are optimized for performance. They allow Framer
                  Motion to update animations at the optimal frame rate without
                  causing unnecessary re-renders of the entire React component
                  tree.
                </BulletListItem>
                <BulletListItem highlighted="Integration with Animations: ">
                  Motion values can be integrated with the animation utilities
                  in Framer Motion, enabling smooth transitions between states
                  or along motion paths.
                </BulletListItem>
                <HeadingText heading="General Aspects of Motion Values" />
                <BulletListItem highlighted="Continuous Updates: ">
                  Unlike React state, updating a motion value doesn’t trigger a
                  re-render of the component. Instead, it directly updates the
                  value in the DOM, leading to smoother animations and
                  interactions.
                </BulletListItem>
                <BulletListItem highlighted="Use with animate: ">
                  Motion values can be used as targets for the animate prop of
                  motion components, allowing for complex animations and
                  transitions based on the changing values.
                </BulletListItem>
                <BulletListItem highlighted="Use in Gestures: ">
                  They are particularly useful in gesture-based animations (like
                  dragging, pinching, or scrolling) where the values change
                  rapidly and continuously.
                </BulletListItem>
              </VStackFull>
            }
          >
            {" "}
            <ExampleSeven />
          </FramerReanimate>
          {/* layout 1  */}
          <FramerReanimate
            title="layout 1"
            showReanimate={false}
            code={`
    <Flex className={\`\${isOn ? "bg-col-200" : "bg-col-500"} px-[5vh] py-[7vh] insetShadowXl transition-500 border-900-md\`}>
      <div
        className={\`w-[13vh] h-[7vh] bg-500-radial6op75 flex \${
          isOn === true ? "justify-start" : "justify-end"
        } rounded-[5vh] p-[1vh] cursor-pointer shadowBroadTight border-970-md\`}
        data-isOn={isOn}
        onClick={toggleSwitch}
      >
        <motion.div
          className="h-[5vh] bg-100-radial5op50 w-[5vh] rounded-full shadowBroadTight border-970-md"
          layout
          transition={spring}
        />
      </div>
    </Flex>
  `}
            infoTitle="layout"
            info={
              <VStackFull align="items-start">
                <HeadingText heading="General Use of layout" />
                <BulletListItem highlighted="Automatic Animation: ">
                  When you apply the layout prop to a component, Framer Motion
                  tracks changes to its layout and automatically creates
                  animations for any changes detected between renders. This
                  means that if the component's dimensions, position, or
                  visibility change, Framer Motion will calculate the necessary
                  animation to transition from the old state to the new state
                  smoothly.
                </BulletListItem>
                <BulletListItem highlighted="Shared Layout Animation: ">
                  By using the layout prop on multiple components with the same
                  layoutId, you can animate layout changes between these
                  components, even if they move between different parts of the
                  DOM.
                </BulletListItem>
                <HeadingText heading="In the Context of This Example" />
                <BulletListItem>
                  In this component, the layout prop is used on the motion.div
                  that represents the toggle button inside the switch. Here’s
                  how it functions: When the isOn state changes (the switch is
                  toggled), the position of the button (motion.div) changes
                  within its parent div.
                </BulletListItem>
                <BulletListItem>
                  The layout prop on the motion.div tells Framer Motion to
                  animate this position change. So, instead of the button just
                  jumping from one side to the other, it moves smoothly,
                  creating a more natural switch effect.
                </BulletListItem>
                <BulletListItem>
                  The transition prop defines how this animation behaves. In
                  this case, a spring animation is used, which gives a bouncy
                  and natural feel to the movement of the toggle button.
                </BulletListItem>
                <HeadingText heading="General Aspects of layout" />
                <BulletListItem highlighted="Performance: ">
                  While the layout animation is powerful, it's important to use
                  it judiciously as it can be performance-intensive, especially
                  with complex components or large lists.
                </BulletListItem>
                <BulletListItem highlighted="Nested Animations: ">
                  If you have nested elements with layout, their animations will
                  be coordinated. This can lead to complex and delightful
                  animations but can also introduce complexity in managing these
                  animations.
                </BulletListItem>
                <BulletListItem highlighted="Optimization: ">
                  Sometimes, you might need to optimize animations by disabling
                  layout animations on certain components (using layout={false})
                  or tweaking the transition settings to achieve the desired
                  performance.
                </BulletListItem>
                <BulletListItem highlighted="Orchestration: ">
                  You can orchestrate complex animations by combining the layout
                  prop with other animation features in Framer Motion, such as
                  variants and the AnimatePresence component, to control the
                  sequence and timing of animations.
                </BulletListItem>
              </VStackFull>
            }
          >
            {" "}
            <ExampleEight />
          </FramerReanimate>
          {/* layout 2  */}
          <FramerReanimate
            title="layout 2"
            showReanimate={false}
            code={`
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <motion.div
        layout
        data-isOpen={isOpen}
        initial={{ borderRadius: 50 }}
        className={\`bg-col-200 w-[10vh] h-[10vh] flex justify-center items-center shadowBroadTight border-900-md \${
          isOpen === true ? "w-80% h-80%" : "w-50% h-50%"
        }\`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          layout
          className="w-[4vh] h-[4vh] bg-col-800 rounded-full shadowBroadTight border-900-md"
        />
      </motion.div>
    );
  `}
          >
            {" "}
            <ExampleNine />
          </FramerReanimate>
          {/* layoutId 1  */}
          <FramerReanimate
            title="layoutId 1"
            code={`interface Item {
      id: number;
      icon: string;
      label: string;
    }
    
    const allItems: Item[] = [
      { id: 0, icon: "💜", label: "Heart" },
      { id: 1, icon: "🦄", label: "Uni" },
      { id: 2, icon: "🔥", label: "Fire" },
      { id: 3, icon: "👽", label: "Alien" },
    ];
    
    const [selectedTab, setSelectedTab] = useState<Item>(allItems[0]);
    
    return (
      <VStackFull className="w-full h-full overflow-hidden">
        <main className="flex-1 flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab ? selectedTab.label : "empty"}
              initial={{ y: -50, x: -50, opacity: 0 }}
              animate={{ y: 0, x: 0, opacity: 1 }}
              exit={{ y: 50, x: 50, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="text-[20vh]"
            >
              {selectedTab ? selectedTab.icon : "😋"}
            </motion.div>
          </AnimatePresence>
        </main>
        <nav className="w-full">
          <ul className={\`flex justify-around bg-col-980\`}>
            {allItems.map((item) => (
              <li
                key={item.id}
                className={\`cursor-pointer w-25% py-[0.5vh] relative flex justify-center items-center font-semibold \${
                  selectedTab.id === item.id ? "text-col-900" : "text-col-100"
                }\`}
                onClick={() => setSelectedTab(item)}
              >
                {/* Animated background */}
                {selectedTab.id === item.id && (
                  <motion.div
                    layoutId="active-background"
                    className="absolute inset-0 bg-col-200"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                {/* Tab content */}
                <div className="z-10">
                  {item.icon} {item.label}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </VStackFull>
    );
  `}
          >
            {" "}
            <ExampleTen />
          </FramerReanimate>
          {/* layoutId 2  */}
          <FramerReanimate
            title="layoutId 2"
            code={`interface Item {
  id: number;
  text: string;
}

export function ItemComponent({
  item,
  isSelected,
  onClick,
}: {
  item: Item;
  isSelected: boolean;
  onClick: () => void;
}) {
  const containerVariants = {
    visible: {
      borderRadius: "2vh",
      transition: {
        type: "spring",
        stiffness: 700,
        damping: 30,
      },
    },
  };

  const detailVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
    },
  };

  return (
    <motion.div
      layout
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onClick={onClick}
      className={\`p-[1vh] cursor-pointer w-full flex flex-col shadowBroadTight border-900-md \${
        isSelected ? "bg-col-300 h-45%" : "bg-col-200 h-23%"
      }\`}
    >
      <Text
        className={\`\${
          isSelected ? "font-bold text-[2.3vh]" : "font-semibold text-[2vh]"
        }\`}
      >
        {item.text}
      </Text>
      {isSelected && (
        <CenterFull className="h-full">
          <motion.div
            layoutId={\`expandable-\${item.id}\`}
            variants={detailVariants}
            initial="hidden"
            animate="visible"
            className="overflow-hidden bg-col-960 text-col-100 p-[1vh] w-full textShadow shadow-shadowBroadTight border-900-md rounded-[2vh] h-fit"
          >
            Detailed view of {item.text}
          </motion.div>
        </CenterFull>
      )}
    </motion.div>
  );
}

export function ExampleEleven() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const items: Item[] = [
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
  ];

  return (
    <VStackFull className="h-full p-[1vh]">
      {items.map((item) => (
        <ItemComponent
          key={item.id}
          item={item}
          isSelected={selectedId === item.id}
          onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
        />
      ))}
    </VStackFull>
  );
}`}
            infoTitle="LayoutId"
            info={
              <VStackFull className="w-full h-fit" align="items-start">
                <HeadingText heading="Purpose of layoutId" />
                <BulletListItem highlighted="Animate Layout Changes:">
                  layoutId is used by Framer Motion to identify and animate
                  layout changes of components across different renders. When
                  two or more components in a React tree have the same layoutId,
                  Framer Motion understands that these components are linked and
                  should animate between them as their layout changes.
                </BulletListItem>{" "}
                <BulletListItem highlighted="Shared Element Transition: ">
                  This is especially useful for shared element transitions where
                  an element moves from one part of the application to another
                  and you want to animate this transition smoothly.
                </BulletListItem>{" "}
                <HeadingText heading="How layoutId is Used in Your Component" />
                <BulletListItem>
                  In the ItemComponent, layoutId is applied to a motion.div
                  inside the component. This motion.div becomes the target for
                  layout animations when the component's state changes (e.g.,
                  when an item is selected).
                </BulletListItem>{" "}
                <BulletListItem>
                  When an item is selected (isSelected is true), the motion.div
                  with the specific layoutId (expandable-{"itemId"}) appears. If
                  the item is deselected, the component with that layoutId will
                  disappear or change its layout.
                </BulletListItem>
                <BulletListItem>
                  Framer Motion automatically calculates the animation needed to
                  transition the motion.div from its initial layout to its final
                  layout (and vice versa) when the item is selected or
                  deselected.
                </BulletListItem>
                <HeadingText heading="Detailed Flow" />
                <BulletListItem highlighted="Initial Render: ">
                  When ItemComponent is first rendered, the motion.div with
                  layoutId (expandable-{"itemId"}) is either rendered in its
                  collapsed state or not rendered at all, depending on whether
                  the item is selected.
                </BulletListItem>
                <BulletListItem highlighted="Selection Change: ">
                  When a user clicks on an item, the onClick handler updates the
                  state in the parent component, which then passes down new
                  props to ItemComponent, triggering a re-render.
                </BulletListItem>
                <BulletListItem highlighted="Animation Trigger: ">
                  Upon re-render, if the state has changed (an item is selected
                  or deselected), Framer Motion finds the elements with matching
                  layoutIds and animates the transition between their initial
                  and final states. In this case, it animates the expansion or
                  collapse of the detailed view inside ItemComponent.
                </BulletListItem>
                <BulletListItem highlighted="Unique layoutId: ">
                  By using (expandable-{"itemId"}) as the layoutId, each item
                  gets a unique identifier, ensuring that Framer Motion
                  correctly associates the layout changes with the specific item
                  that has been selected or deselected.
                </BulletListItem>
                <BulletListItem>
                  By utilizing layoutId in this way, Framer Motion enables the
                  creation of complex animations based on changes in the
                  component layout without manually managing the animation
                  details. The library takes care of interpolating the styles
                  and layout properties needed to transition between the
                  different states smoothly.
                </BulletListItem>
              </VStackFull>
            }
          >
            {" "}
            <ExampleEleven />
          </FramerReanimate>
          {/* useAnimation */}
          <FramerReanimate
            title="useAnimation"
            code={`function Component() {
  const controls = useAnimation();
  const backgroundOne = "radial-gradient(circle, #ffeede 0%, #9C6892 100%)";
  const backgroundTwo = "radial-gradient(circle, #F2B680 0%, #03738C 100%)";
  const backgroundThree = "radial-gradient(circle, #45233e 0%, #F27D72 100%)";
  const backgroundFour = "radial-gradient(circle, #032533 0%, #F2B680 100%)";
  const lightFont = "#fff";
  const darkFont = "#000";

    useEffect(() => {
    const sequence = async () => {
      // Start the sequence by moving to the right and partially fading
      await controls.start({
        x: 100,
        y: -100,
        opacity: 0.7,
        borderRadius: "50%",
        background: backgroundOne,
        color: darkFont,
        transition: { duration: 2 },
      });

      await controls.start({
        x: 0,
        y: -100,
      });

      // Move back to the original position and fully fade in
      await controls.start({
        x: 0,
        opacity: 1,
        borderRadius: "20%",
        background: backgroundTwo,
        color: lightFont,
        transition: { duration: 1 },
      });

      // Scale up
      await controls.start({ scale: 1.25, transition: { duration: 1.5 } });

      // Rotate while scaling down
      await controls.start({
        scale: 1,
        rotate: -180,
        borderRadius: "50%",
        background: backgroundThree,
        color: lightFont,
        transition: { duration: 1.75 },
      });

      // Move to the left and partially fading
      await controls.start({
        x: -100,
        opacity: 0.7,
        borderRadius: "20%",
        background: backgroundFour,
        color: lightFont,
        transition: { duration: 0.25 },
      });

      // Move back to the original position and fully fade in
      await controls.start({
        x: 0,
        opacity: 1,
        borderRadius: "50%",
        background: backgroundOne,
        color: darkFont,
        transition: { duration: 2 },
      });

      await controls.start({
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        borderRadius: "20%",
        background: backgroundTwo,
        color: lightFont,
        transition: { duration: 1 },
      });

      await controls.start({
        y: -100,
        x: 0,
        opacity: 1,
        borderRadius: "50%",
        background: backgroundOne,
        color: darkFont,
        transition: { duration: 2 },
      });

      await controls.start({
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        borderRadius: "20%",
        background: backgroundTwo,
        color: lightFont,
        transition: { duration: 1 },
      });

      // Scale up
      await controls.start({
        scale: 1.25,
        transition: { duration: 0.5 },
        background: backgroundTwo,
        color: lightFont,
      });

      // Rotate while scaling down
      await controls.start({
        scale: 1,
        rotate: 0,
        borderRadius: "20%",
        background: backgroundThree,
        color: lightFont,
        transition: { duration: 0.5 },
      });

      await controls.start({
        scale: 0.5,
        borderRadius: "50%",
        transition: { duration: 0.3 },
      });

      // fast rotation
      await controls.start({ rotate: 720, transition: { duration: 1 } });

      // scale, and fade out slightly
      await controls.start({
        scale: 2,
        opacity: 0.9,
        transition: { duration: 1 },
      });
      // fast rotation
      await controls.start({
        rotate: -720,
        transition: { duration: 1 },
        scale: 1,
        background: backgroundOne,
        color: darkFont,
      });
    };

    sequence();
  }, [controls]);

    sequence();
  }, [controls]);

  return (
    <motion.div
    className="w-[12vh] h-[12vh] flex justify-center items-center text-center font-semibold text-[2vh] lightGlowSm border-500-lg"
      animate={controls}
    >
      <Text>Controlled Animation</Text>
    </motion.div>
  );
`}
            infoTitle="useAnimation"
            info={
              <VStackFull align="items-start">
                <BulletListItem>
                  This example uses Framer Motion's useAnimation hook for
                  creating complex, programmatically controlled animations.
                  Here's an in-depth look at how it utilizes various features of
                  Framer Motion:
                </BulletListItem>
                <HeadingText heading="Complex Animation Sequences" />
                <BulletListItem>
                  The component demonstrates a sequence of animations that
                  change the properties of a motion.div element over time,
                  including position, opacity, scale, rotation, border radius,
                  background, and text color. This sequence is orchestrated
                  using the useAnimation hook, allowing for precise control over
                  the timing and order of animations.
                </BulletListItem>
                <HeadingText heading="Animation Control with useAnimation" />
                <BulletListItem highlighted="Programmatic Control: ">
                  useAnimation provides a controls object used to start
                  animations in a specified sequence. This approach offers more
                  control compared to declarative animations, allowing for
                  complex choreographies.{" "}
                </BulletListItem>
                <BulletListItem
                  highlighted="Sequential
                  Execution: "
                >
                  The await keyword is used to wait for one animation to
                  complete before starting the next, ensuring the animations
                  play out in a sequential and orderly fashion.{" "}
                </BulletListItem>
                <BulletListItem
                  highlighted="Transition
                  Customization: "
                >
                  Each animation can have its transition properties, allowing
                  for varied timing, easing, and duration settings that match
                  the desired feel of each animation step.
                </BulletListItem>
                <HeadingText heading="Use of Async/Await for Sequential Animations" />
                <BulletListItem>
                  The use of async/await in the sequence function within
                  useEffect ensures that each animation step completes before
                  the next one begins, allowing for the creation of intricate
                  animation sequences that unfold over time.
                </BulletListItem>
                <HeadingText heading="useAnimation vs Keyframes" />
                <BulletListItem>
                  Creating a sequence of animations using the useAnimation hook
                  versus keyframes in Framer Motion offers different levels of
                  control and complexity in how animations are defined and
                  managed. Here’s how they differ:
                </BulletListItem>
                <HeadingText heading="useAnimation Hook" />
                <BulletListItem highlighted="Programmatic Control: ">
                  useAnimation provides a more imperative approach to animation,
                  where you can programmatically control the start, stop, and
                  sequence of animations. It allows for dynamic and conditional
                  animations based on application state or user interactions.{" "}
                </BulletListItem>
                <BulletListItem highlighted="Complex Sequencing: ">
                  {" "}
                  With useAnimation, you can create complex sequences of
                  animations that depend on each other's completion, using
                  async/await to wait for one animation to finish before
                  starting another. This is useful for creating intricate
                  animation sequences where each step might depend on the
                  completion of the previous one.{" "}
                </BulletListItem>
                <BulletListItem
                  highlighted="Runtime
                  Dynamics: "
                >
                  Animations can be dynamically altered at runtime based on
                  logic or state changes in your application. This means the
                  animation can react to user inputs or other programmatic
                  conditions.
                </BulletListItem>

                <HeadingText heading="Keyframes" />
                <BulletListItem highlighted="Declarative and Predefined: ">
                  Keyframe animations are more declarative, defined upfront in
                  the component's props or variants. They describe the animation
                  steps at specific points along a timeline, and Framer Motion
                  interpolates the values between these points.{" "}
                </BulletListItem>
                <BulletListItem highlighted="Simpler to Define: ">
                  Keyframe animations are easier to set up for straightforward
                  sequences and are defined in a more static manner. They are
                  suitable for animations that do not require conditional logic
                  or dynamic sequences.{" "}
                </BulletListItem>
                <BulletListItem highlighted="Less Granular Control: ">
                  While keyframe animations can be controlled to an extent (such
                  as paused, played, or reversed), they don't offer the same
                  level of granular control as the useAnimation hook, especially
                  in terms of sequencing and conditional logic.
                </BulletListItem>

                <HeadingText heading="Example Comparison" />
                <BulletListItem>
                  Using useAnimation, you might programmatically create an
                  animation sequence that responds to user actions or
                  application state. For instance, you could start an animation,
                  then wait for a user's input before proceeding to the next
                  stage of the sequence.
                </BulletListItem>
                <BulletListItem>
                  With keyframes, you would define all the stages of the
                  animation upfront, and the animation would run through these
                  stages automatically once triggered. The control over starting
                  and stopping at specific points is more limited compared to
                  useAnimation.
                </BulletListItem>

                <HeadingText heading="Conclusion" />
                <BulletListItem>
                  useAnimation is more flexible and powerful for complex,
                  conditional, or multi-step animations where each step might
                  require custom logic or waiting on external events.
                </BulletListItem>
                <BulletListItem>
                  Keyframe animations are simpler and more declarative, suitable
                  for straightforward, predefined animation sequences where
                  granular control over each step is not necessary.
                </BulletListItem>
                <BulletListItem>
                  In essence, the choice between useAnimation and keyframe
                  animations depends on the complexity and dynamic needs of the
                  animations within your application. For intricate and
                  interactive animations, useAnimation offers the necessary
                  control, while keyframe animations are sufficient for simpler,
                  self-contained sequences.
                </BulletListItem>

                <HeadingText heading="Key useAnimation Takeaways" />
                <BulletListItem highlighted="Manual Animation Sequencing: ">
                  The example demonstrates how to manually control a sequence of
                  animations, providing a high level of customization and
                  control over the animation logic.
                </BulletListItem>
                <BulletListItem highlighted="Dynamic Styling: ">
                  The animation changes the visual style dynamically, including
                  complex properties like radial gradients and color schemes.
                </BulletListItem>
                <BulletListItem highlighted="Interactivity and Engagement: ">
                  Through user interaction or automated sequences, the animation
                  creates an engaging and interactive user experience.
                </BulletListItem>
              </VStackFull>
            }
          >
            {" "}
            <ExampleTwelve />
          </FramerReanimate>
          {/* useAnimation YoYo */}
          <FramerReanimate
            title="useAnimation YoYo"
            showReanimate={false}
            code={`function YoYoAnimation() {
  const controls = useAnimation();
  const gradientOne = "radial-gradient(circle, #ffeede 0%, #9C6892 100%)";
  const gradientTwo = "radial-gradient(circle, #F2B680 0%, #03738C 100%)";
  const [isAnimating, setIsAnimating] = useState(true);
  const sineFunction = { duration: 0.7, ease: [0.445, 0.05, 0.55, 0.95] };

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const sequence = async () => {
      while (isAnimating && isMounted) {
        await controls.start({
          y: "100%", // Move down
          rotate: 180,
          borderRadius: "50%",
          scale: 0.8,
          background: gradientOne,
          transition: sineFunction,
        });
        if (!isAnimating || !isMounted) break;

        await controls.start({
          y: "0%", // Move up to the original position
          rotate: 360,
          borderRadius: "20%",
          scale: 1,
          background: gradientTwo,
          transition: sineFunction,
        });
        if (!isAnimating || !isMounted) break;

        await controls.start({
          y: "-100%", // Move up above the starting point
          rotate: 540,
          borderRadius: "50%",
          scale: 1.2,
          background: gradientOne,
          transition: sineFunction,
        });
        if (!isAnimating || !isMounted) break;

        await controls.start({
          y: "0%", // Return to starting point
          rotate: 720,
          borderRadius: "20%",
          scale: 1,
          background: gradientTwo,
          transition: sineFunction,
        });
        if (!isAnimating || !isMounted) break;
      }
    };

    if (isAnimating) {
      sequence();
    }

    return () => {
      isMounted = false; // Set isMounted to false when the component unmounts
      controls.stop(); // Stop the animation when the component unmounts or isAnimating changes
    };
  }, [isAnimating, controls]);

  return (
    <CenterFull className="relative">
      <motion.div
        className="w-[12vh] h-[12vh] flex justify-center items-center text-center font-semibold text-[2vh] metallicEdgesLg border-900-md"
        animate={controls}
      >
        Yo-Yo
      </motion.div>
      <Box className="absolute bottom-[1vh] left-[1vh]">
        <IconButton
          onClick={() => setIsAnimating(!isAnimating)}
          icon={isAnimating ? FaStop : FaPlay}
          type="smallNormal"
        />
      </Box>
    </CenterFull>
  );
}`}
          >
            {" "}
            <ExampleThirteen />
          </FramerReanimate>
          {/* useScroll */}
          <FramerReanimate
            title="useScroll Progress 1"
            code={`function ScrollItem({ label }: { label: string }) {
  const random = Math.floor(Math.random() * 100) + 1;
  return (
    <Box className="p-\[0.5vh\]">
      <Center className="w-\[41vh\] h-\[34vh\] bg-col-770 shadowBroadTight border-970-md flex-shrink-0 overflow-hidden">
        <Image src={\`https://picsum.photos/id/\${random}/400/400.jpg\`} alt="an example" />
      </Center>
    </Box>
  );
}

export function ExampleFourteen() {
  const items = Array.from({ length: 10 }, (_, i) => i);
  
  return (
    <FlexFull className="h-full p-\[1vh\]">
      <RadialScrollProgressContainer itemComponent={ScrollItem} items={items} />
    </FlexFull>
  );
}

type ItemComponent = React.ComponentType<any>;

export default function RadialScrollProgressContainer({
  items,
  itemComponent: ItemComponent,
  containerPadding = "p-\[2vh\]",
  bg = "bg-100-linear2op50",
  innerBg = "bg-col-270",
  innerPadding = "p-\[0.5vh\]",
  itemClassName = "",
  title = "Content Title",
  topPadding = "pt-\[5vh\]",
  trackOpacity = "opacity-30",
  titlePosition = "top-\[1vh\] right-\[1vh\]",
  titleClassName = "h-\[3.2vh\] pr-\[2vh\] text-\[2.5vh\] font-bold",
  progressPosition = "top-\[0.3vh\] left-\[0.3vh\]",
  progressColor = "stroke-cyan-600",
  progressWidth = "1.2vh",
  radius = 40,
  progressCircleSize = "4.5vh",
  snapScroll = true,
}: {
  items: any[];
  itemComponent: ItemComponent;
  containerPadding?: string;
  bg?: string;
  innerBg?: string;
  innerPadding?: string;
  topPadding?: string;
  itemClassName?: string;
  title?: string;
  titlePosition?: string;
  titleClassName?: string;
  trackOpacity?: string;
  progressPosition?: string;
  progressColor?: string;
  progressWidth?: string;
  radius?: number;
  progressCircleSize?: string;
  snapScroll?: boolean;
}) {
  const scrollRef = useRef(null);
  const { scrollXProgress } = useScroll({
    container: scrollRef,
  });

  return (
    <CenterFull className={\`w-full h-full relative \${bg} \${topPadding} \${containerPadding}\`}>
      <Box className={\`absolute \${progressPosition}\`}>
        <svg className="-rotate-90" width={progressCircleSize} height={progressCircleSize} viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            pathLength="1"
            className={\`\${progressColor} \${trackOpacity}\`}
            style={{ fill: "none", strokeWidth: progressWidth }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            pathLength="1"
            className={progressColor}
            style={{ fill: "none", strokeWidth: progressWidth, pathLength: scrollXProgress }}
          />
        </svg>
      </Box>
      <Flex className={\`absolute items-center \${titlePosition} \${titleClassName}\`}>
        <Text>{title}</Text>
      </Flex>
      <Box className={\`\${innerPadding} \${innerBg} insetShadowXl border-970-md overflow-x-hidden\`}>
        <FlexFull
          className={\`overflow-x-auto overflow-y-hidden scrollbar-hide \${
            snapScroll ? "snap-mandatory snap-x" : ""
          }\`}
          ref={scrollRef}
        >
          <HStackFull className="w-fit h-full items-center">
            {items.map((i, index) => (
              <Flex
                key={index}
                className={snapScroll ? \`snap-center snap-always \${itemClassName}\` : itemClassName}
              >
                <ItemComponent key={i} label={i.toString()} />
              </Flex>
            ))}
          </HStackFull>
        </FlexFull>
      </Box>
    </CenterFull>
  );
}`}
            showReanimate={false}
          >
            {" "}
            <ExampleFourteen />
          </FramerReanimate>
          {/* useScroll 2 */}
          <FramerReanimate
            title="useScroll Progress 2"
            code={`type ItemComponent = React.ComponentType<any>;
export function VerticalScrollProgressContainer({
  position = "top",
  height = "h-\[85vh\]",
  width = "w-\[70vh\]",
  padding = "p-\[0vh\]",
  gap = "gap-\[0vh\]",
  progressColor = "bg-cyan-500",
  itemComponent: ItemComponent,
  progressHeight = "h-\[1vh\]",
  items,
  snapScroll = true,
  itemClassName = "",
  springScroll = true,
}: {
  position?: "top" | "bottom";
  height?: string;
  width?: string;
  padding?: string;
  progressHeight?: string;
  gap?: string;
  progressColor?: string;
  itemComponent: ItemComponent;
  items: any\[\];
  snapScroll?: boolean;
  itemClassName?: string;
  springScroll?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: ref });

  const springScrollScaleX = useSpring(
    useTransform(scrollYProgress, \[0, 1\], \[0, 1\])
  );
  const normalScaleX = useTransform(scrollYProgress, \[0, 1\], \[0, 1\]);

  // Ensure it scales from 0 to 100%
  const placement =
    position === "top"
      ? "top-0 left-0 "
      : position === "bottom"
      ? "bottom-0 left-0 "
      : "";

  const scaleX = springScroll ? springScrollScaleX : normalScaleX;

  return (
    <div
      ref={ref}
      className={\`\${width} \${height} relative insetShadowXl border-980-lg overflow-y-auto scrollbar-hide \${
        snapScroll ? "snap-mandatory snap-y" : ""
      }\`}
    >
      {/\* Progress bar \*/}
      <motion.div
        className={\`sticky \${placement} \${progressHeight} \${progressColor}\`}
        style={{ scaleX, zIndex: "2" }}
      />
      <div className={\`absolute top-0 left-0 h-fit \${padding} flex flex-col\`} style={{ gap }}>
        {items.map((item, index) => (
          <Flex
            key={index}
            className={
              snapScroll ? \`snap-center snap-always \${itemClassName}\` : itemClassName
            }
          >
            <ItemComponent {...item} />
          </Flex>
        ))}
      </div>
    </div>
  );
}

function ScrollBox({ label, content }: { label: string; content: string }) {
  const random = Math.floor(Math.random() \* 100) + 1;
  return (
    <div className="w-\[50vh\] h-\[45vh\] relative overflow-hidden rounded-none p-\[1.5vh\] pt-\[2vh\] bg-col-930">
      <CenterHorizontalFull className="h-full bg-500-radial3op50 shadowBroadLoose border-980-md">
        <VStackFull gap="gap-\[1.5vh\]">
          <VStack className="p-\[1vh\] bg-col-970 insetShadowXl border-900-md">
            <Text className="text-\[2.5vh\] font-semibold text-col-100 textShadow">
              {label}
            </Text>
          </VStack>
          <Box className="w-\[40vh\] h-\[28vh\] overflow-hidden shadowBroadLoose border-980-md">
            <img
              src={\`https://picsum.photos/id/\${random}/600/600\`}
              alt={\`image ex\`}
              className="w-full h-full"
            />
          </Box>
        </VStackFull>
      </CenterHorizontalFull>
    </div>
  );
}

const testItems = Array.from({ length: 15 }, (\_, i) => ({
  label: \`Item \${i + 1}\`,
  content: \`This is some content for item \${i + 1}\`,
}));

export function ScrollProgressExample() {
  return (
    <VerticalScrollProgressContainer
      items={testItems}
      itemComponent={ScrollBox}
      progressHeight="h-\[0.7vh\]"
      height="h-full"
      width="w-full"
    />
  );
}`}
            showReanimate={false}
            infoTitle="useScroll"
            info={
              <VStackFull align="items-start">
                <BulletListItem>
                  Framer Motion's useScroll hook provides a way to react to
                  scroll events and translate them into motion values that can
                  be used to create dynamic and responsive animations. In the
                  provided VerticalScrollProgressContainer component, various
                  facets of useScroll are demonstrated. Here's a detailed
                  explanation of each aspect:
                </BulletListItem>
                <HeadingText heading=" useScroll and its context useScroll Hook: " />
                <BulletListItem highlighted="">
                  It captures the scroll progress of a container element. In the
                  example, it's used to track the vertical scroll progress
                  within a div element referenced by ref.
                </BulletListItem>
                <CodeExample>{`const { scrollYProgress } = useScroll({ container: ref });`}</CodeExample>
                <BulletListItem>
                  The scrollYProgress is a motion value that represents the
                  scroll position as a fraction between 0 and 1, where 0 is the
                  top of the container and 1 is the bottom.
                </BulletListItem>
                <HeadingText heading="Scroll Progress and Transformations" />
                <BulletListItem highlighted="Transforming Scroll Progress: ">
                  The scroll progress (0 to 1) is transformed to a scaleX value,
                  which is used to scale a progress bar horizontally as the user
                  scrolls.
                </BulletListItem>
                <CodeExample>
                  {`const normalScaleX = useTransform(scrollYProgress, [0, 1], [0,
                  1]);`}
                </CodeExample>
                <BulletListItem>
                  This transformation ensures the progress bar's width scales
                  directly with the scroll progress.
                </BulletListItem>
                <BulletListItem highlighted=" Spring Animation: ">
                  Optionally, a spring animation can be applied to the scroll
                  progress to create a smoother, more natural movement.
                </BulletListItem>
                <CodeExample>{`const springScrollScaleX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]));
`}</CodeExample>
                <BulletListItem>
                  This creates a spring effect, making the progress bar's
                  movement more dynamic and less linear.
                </BulletListItem>
                <HeadingText heading="Component Props and Styling" />
                <BulletListItem highlighted="Customization through Props: ">
                  {" "}
                  The component allows customization of its appearance and
                  behavior through props like position, height, width, padding,
                  gap, progressColor, and progressHeight.{" "}
                </BulletListItem>
                <BulletListItem highlighted="Dynamic Styling: ">
                  {" "}
                  The placement and scaleX variables are used to dynamically set
                  the position and scaling of the progress bar, allowing it to
                  be placed at the top or bottom and scale appropriately as the
                  user scrolls.{" "}
                </BulletListItem>
                <BulletListItem highlighted=" Scroll Snapping and Item Rendering: ">
                  The component supports scroll snapping, controlled by the
                  snapScroll prop. It renders a list of items, each wrapped in a
                  Flex component, and applies the snap-center snap-always
                  classes if snapScroll is true.
                </BulletListItem>

                <HeadingText heading="Overall Functionality" />
                <BulletListItem>
                  The VerticalScrollProgressContainer creates a scrollable
                  container with a progress bar at the top or bottom. As the
                  user scrolls, the progress bar scales horizontally to indicate
                  the scroll position. The scroll behavior can be smooth (spring
                  animation) or direct (linear scaling), and the container can
                  optionally snap to its child elements.
                </BulletListItem>
                <BulletListItem>
                  This component effectively demonstrates how Framer Motion's
                  useScroll can be integrated into a React component to create
                  interactive and responsive scroll-based animations, enhancing
                  the user experience by providing visual feedback on the scroll
                  position.
                </BulletListItem>
              </VStackFull>
            }
          >
            {" "}
            <ExampleFifteen />
          </FramerReanimate>
          {/* DESCRIPTION */}
          {/* <FramerReanimate title="sixteen" code={``}>
            <ExampleSixteen />
          </FramerReanimate> */}
          {/* DESCRIPTION
          <FramerReanimate title="seventeen" code={``}>
            <ExampleSeventeen />
          </FramerReanimate>
          {/* DESCRIPTION */}
          {/* <FramerReanimate title="eighteen" code={``}>
            <ExampleEighteen />
          </FramerReanimate>
          {/* DESCRIPTION */}
          {/* <FramerReanimate title="nineteen" code={``}>
            <ExampleNineteen />
          </FramerReanimate> */}
          {/* DESCRIPTION */}
          {/* <FramerReanimate title="twenty" code={``}>
            <ExampleTwenty />
          </FramerReanimate> */}
        </Wrap>
        <InteractiveKeyFrames />
      </VStackFull>
    </FlexFull>
  );
}
