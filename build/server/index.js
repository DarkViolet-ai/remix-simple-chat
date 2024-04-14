import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Meta, Links, Outlet, ScrollRestoration, Scripts, NavLink, useLocation } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoSmiley } from "react-icons/go";
import { BiChevronUp, BiChevronDown, BiMenu, BiSmile } from "react-icons/bi";
import { BsCalendar3 } from "react-icons/bs";
import { GiAlarmClock } from "react-icons/gi";
import { IoCloseCircleOutline, IoReturnUpBackOutline, IoHomeOutline } from "react-icons/io5";
import { RiArrowLeftSFill, RiArrowRightSFill } from "react-icons/ri";
import { MdCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import ReactDOM from "react-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { CgScrollV } from "react-icons/cg";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isBotRequest(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const Flex = React.forwardRef(
  ({ children, style, onClick, className = "", id }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        id,
        className: `flex ${className}`,
        style,
        onClick,
        children
      }
    );
  }
);
Flex.displayName = "Flex";
function LayoutContainer({
  children,
  className = "",
  pt = "",
  pb = "",
  bg = ""
}) {
  const isImageUrl = bg.startsWith("http://") || bg.startsWith("https://") || bg.startsWith("/images");
  const backgroundStyle = isImageUrl ? { backgroundImage: `url(${bg})`, backgroundSize: "cover" } : {};
  const backgroundClass = isImageUrl ? "" : bg;
  return /* @__PURE__ */ jsx(
    Flex,
    {
      className: `w-screen overflow-hidden justify-center ${pt} ${pb} ${backgroundClass} ${className}`,
      style: { height: "100svh", maxHeight: "100svh", ...backgroundStyle },
      children
    }
  );
}
const links = () => [
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Waiting+for+the+Sunrise&display=swap"
  }
];
function App() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsx("body", { children: /* @__PURE__ */ jsxs(LayoutContainer, { className: "bg-col-880", children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] }) })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Text({
  children,
  className = "",
  noOfLines
}) {
  const style = {};
  if (noOfLines) {
    style.overflow = "hidden";
    style.textOverflow = "ellipsis";
    style.display = "-webkit-box";
    style.WebkitLineClamp = noOfLines;
    style.WebkitBoxOrient = "vertical";
  }
  return /* @__PURE__ */ jsx("p", { className, style, children });
}
const transitionVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  scale: {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 }
  },
  rotate: {
    initial: { rotate: -90, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    exit: { rotate: 90, opacity: 0 }
  },
  flip: {
    initial: { scaleX: -1, opacity: 0 },
    animate: { scaleX: 1, opacity: 1 },
    exit: { scaleX: -1, opacity: 0 }
  },
  zoom: {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 }
  },
  slide: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" }
  },
  slideInLeft: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" }
  },
  slideInTopLeft: {
    initial: { x: "-100%", y: "-100%" },
    animate: { x: 0, y: 0 },
    exit: { x: "-100%", y: "-100%" }
  },
  slideInBottomLeft: {
    initial: { x: "-100%", y: "100%" },
    animate: { x: 0, y: 0 },
    exit: { x: "-100%", y: "100%" }
  },
  slideInTop: {
    initial: { y: "-100%" },
    animate: { y: 0 },
    exit: { y: "-100%" }
  },
  slideInTopRight: {
    initial: { x: "100%", y: "-100%" },
    animate: { x: 0, y: 0 },
    exit: { x: "100%", y: "-100%" }
  },
  slideInRight: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" }
  },
  slideInBottomRight: {
    initial: { x: "100%", y: "100%" },
    animate: { x: 0, y: 0 },
    exit: { x: "100%", y: "100%" }
  },
  slideInBottom: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" }
  },
  fadeSlideInRight: {
    initial: { x: "50%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "50%", opacity: 0 }
  },
  fadeSlideInLeft: {
    initial: { x: "-50%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-50%", opacity: 0 }
  },
  fadeSlideInTopLeft: {
    initial: { x: "-50%", y: "-50%", opacity: 0 },
    animate: { x: 0, y: 0, opacity: 1 },
    exit: { x: "-50%", y: "-50%", opacity: 0 }
  },
  fadeSlideInBottomLeft: {
    initial: { x: "-50%", y: "50%", opacity: 0 },
    animate: { x: 0, y: 0, opacity: 1 },
    exit: { x: "-50%", y: "50%", opacity: 0 }
  },
  fadeSlideInTop: {
    initial: { y: "-50%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-50%", opacity: 0 }
  },
  fadeSlideInTopRight: {
    initial: { x: "50%", y: "-50%", opacity: 0 },
    animate: { x: 0, y: 0, opacity: 1 },
    exit: { x: "50%", y: "-50%", opacity: 0 }
  },
  fadeSlideInBottomRight: {
    initial: { x: "50%", y: "50%", opacity: 0 },
    animate: { x: 0, y: 0, opacity: 1 },
    exit: { x: "50%", y: "50%", opacity: 0 }
  },
  fadeSlideInBottom: {
    initial: { y: "50%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "50%", opacity: 0 }
  }
};
function Transition({
  children,
  type = "fade",
  delay = 0,
  className = "",
  style = {},
  duration = 0.5,
  onClick,
  key
}) {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: `flex justify-center overflow-hidden ${className}`,
      variants: transitionVariants[type],
      initial: "initial",
      animate: "animate",
      exit: "exit",
      transition: { duration, delay },
      style,
      onClick,
      children
    },
    key
  );
}
const VStack = React.forwardRef(
  ({
    children,
    gap = "gap-2",
    className = "",
    style = {},
    align = "items-center",
    onClick
  }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        onClick,
        className: `flex flex-col ${align} ${gap} ${className}`,
        ref,
        style,
        children
      }
    );
  }
);
VStack.displayName = "VStack";
const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" }
  ];
};
function Index() {
  return /* @__PURE__ */ jsx(LayoutContainer, { children: /* @__PURE__ */ jsx(Transition, { className: "w-full h-full justify-center items-center", children: /* @__PURE__ */ jsxs(VStack, { children: [
    /* @__PURE__ */ jsx(Text, { className: "font-cursive boldTextGlow text-col-900 text-stroke-8-170 text-[10vh] ", children: "Remix, Vite, & Tailwind" }),
    /* @__PURE__ */ jsx(Text, { className: "text-col-100 text-2xl textShadow", children: "A Project Launchpad with Vite, Tailwind CSS, and Remix Flat Routes" }),
    /* @__PURE__ */ jsx(Text, { className: "text-col-100 text-2xl textShadow", children: "including extensive preset options and components with quick customization." }),
    /* @__PURE__ */ jsx(NavLink, { to: "/design", children: /* @__PURE__ */ jsx(Text, { className: "p-[1.5vh] bg-100-linear3op25 text-col-900 shadowBroadNormal hover:bg-400-diagonal3op75 transition-400", children: "Preset Design Options" }) })
  ] }) }) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const HStack = React.forwardRef(
  ({
    children,
    onClick = () => ({}),
    onKeyDown,
    gap = "gap-2",
    className = "",
    style = {},
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur
  }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        role: "button",
        tabIndex: 0,
        className: `flex flex-row ${gap} ${className}`,
        onClick,
        onKeyDown,
        ref,
        style,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
        children
      }
    );
  }
);
HStack.displayName = "HStack";
const FlexFull = React.forwardRef(({ children, className, onClick, id, style = {} }, ref) => {
  return /* @__PURE__ */ jsx(
    Flex,
    {
      className: `w-full ${className}`,
      id,
      ref,
      onClick,
      style,
      children
    }
  );
});
FlexFull.displayName = "FlexFull";
const bounceAnimation = `
@keyframes bounce {
  0%, 100% {
    transform: scale(0) translateX(100%);
  }
  40% {
    transform: scale(1.0) translateX(0);
  }
}`;
function BouncingDots({
  color = "cyan",
  dotSize = 10,
  dotCount = 5,
  speed = "4s"
}) {
  const dots = Array.from({ length: dotCount });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("style", { children: bounceAnimation }),
    /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: dots.map((_, index) => /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              width: `${dotSize}px`,
              height: `${dotSize}px`,
              margin: "0 6px",
              backgroundColor: color,
              borderRadius: "50%",
              boxShadow: "2px 2px 2px black",
              display: "inline-block",
              // The delay is also adjusted to make sure it's positive
              animation: `bounce ${speed} ${0.5 * index}s infinite ease-in-out both`
            }
          },
          index
        ))
      }
    )
  ] });
}
function Icon({
  icon: IconComponent,
  containerClassName = "",
  iconClassName = "",
  w = "w-fit",
  h = "h-fit",
  pos,
  t,
  l,
  r,
  b,
  rounded = "rounded-xs",
  onClick
}) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      onClick && onClick();
    }
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "button",
      tabIndex: 0,
      className: `${rounded} ${w} ${h} ${pos} ${t} ${b} ${r} ${l} ${containerClassName}`,
      onClick,
      onKeyDown: handleKeyDown,
      children: /* @__PURE__ */ jsx(IconComponent, { className: `${rounded} ${iconClassName}` })
    }
  );
}
function Button({
  className,
  buttonText = "",
  padding = "px-[1vh] py-[0px]",
  onClick,
  iconLeft,
  iconRight,
  ref,
  htmlType = "button",
  iconStyle,
  isLoading,
  isDisabled,
  type = "normal",
  width = "w-fit",
  height,
  to
}) {
  const buttonClass = type === "normal" ? "normalButtonStyles" : type === "smallNormal" ? "smallButtonStyles" : type === "negative" ? "negativeButtonStyles" : type === "smallNegative" ? "smallNegativeButtonStyles" : type === "unstyled" ? "unstyledButtonStyles" : "smallUnstyledButtonStyles";
  const buttonHeight = height ? height : type === "normal" ? "h-[3.5vh]" : type === "smallNormal" ? "h-[2.6vh]" : type === "negative" ? "h-[3.5vh]" : type === "smallNegative" ? "h-[2.6vh]" : type === "unstyled" ? "h-[3.5vh]" : "h-[2.6vh]";
  const displayIconSize = type === "normal" ? "text-[2.3vh]" : type === "smallNormal" ? "text-[1.7vh]" : type === "negative" ? "text-[2.3vh]" : type === "smallNegative" ? "text-[1.7vh]" : type === "unstyled" ? "text-[2.3vh]" : "text-[1.7vh]";
  function ButtonInsides() {
    const combinedClasses = `${buttonClass} ${width} ${buttonHeight} ${className} ${padding} relative ${isDisabled ? "opacity-40 cursor-not-allowed" : ""}`;
    return /* @__PURE__ */ jsx(
      "button",
      {
        onClick: !isDisabled ? onClick : void 0,
        disabled: isDisabled,
        type: htmlType,
        ref,
        children: /* @__PURE__ */ jsxs(HStack, { className: combinedClasses, children: [
          isLoading && buttonText !== "" && type !== "unstyled" && type !== "smallUnstyled" && /* @__PURE__ */ jsx(FlexFull, { className: "absolute top-0 left-0 h-full justify-center items-center z-10", children: /* @__PURE__ */ jsx(
            BouncingDots,
            {
              dotCount: 3,
              color: "white",
              dotSize: 7,
              speed: "3s"
            }
          ) }),
          iconLeft && /* @__PURE__ */ jsx(
            Icon,
            {
              icon: iconLeft,
              iconClassName: `${displayIconSize} ${iconStyle}`
            }
          ),
          buttonText,
          iconRight && /* @__PURE__ */ jsx(
            Icon,
            {
              icon: iconRight,
              iconClassName: `${displayIconSize} ${iconStyle}`
            }
          )
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsx(Fragment, { children: to ? /* @__PURE__ */ jsx(NavLink, { to, children: /* @__PURE__ */ jsx(ButtonInsides, {}) }) : /* @__PURE__ */ jsx(ButtonInsides, {}) });
}
function VStackFull({
  children,
  className,
  gap,
  onClick,
  style = {},
  align = "items-center"
}) {
  return /* @__PURE__ */ jsx(
    VStack,
    {
      className: `w-full ${gap} ${className}`,
      onClick,
      style,
      align,
      children
    }
  );
}
function Wrap({ children, className = "", style }) {
  return /* @__PURE__ */ jsx("div", { className: `flex flex-wrap ${className}`, style, children });
}
const textShadows = [
  "lightTextShadow",
  "textShadow",
  "subtleTextShadow",
  "standoutTextShadow",
  "textFog",
  "textGlow",
  "boldText",
  "boldTextGlow"
];
const textExamples = [
  "text-xs-tighter",
  "text-xs-tight",
  "text-xs-normal",
  "text-xs-loose",
  "text-sx-looser",
  "text-sm-tighter",
  "text-sm-tight",
  "text-sm-normal",
  "text-sm-loose",
  "text-sm-looser",
  "text-md-tighter",
  "text-md-tight",
  "text-md-normal",
  "text-md-loose",
  "text-md-looser",
  "text-lg-tighter",
  "text-lg-tight",
  "text-lg-normal",
  "text-lg-loose",
  "text-lg-looser",
  "text-xl-tighter",
  "text-xl-tight",
  "text-xl-normal",
  "text-xl-loose",
  "text-xl-looser",
  "text-xxl-tighter",
  "text-xxl-tight",
  "text-xxl-normal",
  "text-xxl-loose",
  "text-xxl-looser",
  "text-xxxl-tighter",
  "text-xxxl-tight",
  "text-xxxl-normal",
  "text-xxxl-loose",
  "text-xxxl-looser",
  "text-mega-tighter",
  "text-mega-tight",
  "text-mega-normal",
  "text-mega-loose",
  "text-mega-looser",
  "text-too-big-tighter",
  "text-too-big-tight",
  "text-too-big-normal",
  "text-too-big-loose",
  "text-too-big-looser",
  "text-insane-tighter",
  "text-insane-tight",
  "text-insane-normal",
  "text-insane-loose",
  "text-insane-looser"
];
const textStrokeDarkBg = [
  "text-stroke-1-white",
  "text-stroke-1-100",
  "text-stroke-1-190",
  "text-stroke-1-180",
  "text-stroke-1-170",
  "text-stroke-1-200",
  "text-stroke-1-290",
  "text-stroke-1-280",
  "text-stroke-1-270",
  "text-stroke-1-300",
  "text-stroke-1-390",
  "text-stroke-1-380",
  "text-stroke-1-370",
  "text-stroke-1-400",
  "text-stroke-1-490",
  "text-stroke-1-480",
  "text-stroke-1-470",
  "text-stroke-1-500",
  "text-stroke-1-590",
  "text-stroke-1-580",
  "text-stroke-1-570",
  "text-stroke-2-white",
  "text-stroke-2-100",
  "text-stroke-2-190",
  "text-stroke-2-180",
  "text-stroke-2-170",
  "text-stroke-2-200",
  "text-stroke-2-290",
  "text-stroke-2-280",
  "text-stroke-2-270",
  "text-stroke-2-300",
  "text-stroke-2-390",
  "text-stroke-2-380",
  "text-stroke-2-370",
  "text-stroke-2-400",
  "text-stroke-2-490",
  "text-stroke-2-480",
  "text-stroke-2-470",
  "text-stroke-2-500",
  "text-stroke-2-590",
  "text-stroke-2-580",
  "text-stroke-2-570",
  "text-stroke-3-white",
  "text-stroke-3-100",
  "text-stroke-3-190",
  "text-stroke-3-180",
  "text-stroke-3-170",
  "text-stroke-3-200",
  "text-stroke-3-290",
  "text-stroke-3-280",
  "text-stroke-3-270",
  "text-stroke-3-300",
  "text-stroke-3-390",
  "text-stroke-3-380",
  "text-stroke-3-370",
  "text-stroke-3-400",
  "text-stroke-3-490",
  "text-stroke-3-480",
  "text-stroke-3-470",
  "text-stroke-3-500",
  "text-stroke-3-590",
  "text-stroke-3-580",
  "text-stroke-3-570",
  "text-stroke-4-white",
  "text-stroke-4-100",
  "text-stroke-4-190",
  "text-stroke-4-180",
  "text-stroke-4-170",
  "text-stroke-4-200",
  "text-stroke-4-290",
  "text-stroke-4-280",
  "text-stroke-4-270",
  "text-stroke-4-300",
  "text-stroke-4-390",
  "text-stroke-4-380",
  "text-stroke-4-370",
  "text-stroke-4-400",
  "text-stroke-4-490",
  "text-stroke-4-480",
  "text-stroke-4-470",
  "text-stroke-4-500",
  "text-stroke-4-590",
  "text-stroke-4-580",
  "text-stroke-4-570",
  "text-stroke-5-white",
  "text-stroke-5-100",
  "text-stroke-5-190",
  "text-stroke-5-180",
  "text-stroke-5-170",
  "text-stroke-5-200",
  "text-stroke-5-290",
  "text-stroke-5-280",
  "text-stroke-5-270",
  "text-stroke-5-300",
  "text-stroke-5-390",
  "text-stroke-5-380",
  "text-stroke-5-370",
  "text-stroke-5-400",
  "text-stroke-5-490",
  "text-stroke-5-480",
  "text-stroke-5-470",
  "text-stroke-5-500",
  "text-stroke-5-590",
  "text-stroke-5-580",
  "text-stroke-5-570",
  "text-stroke-6-white",
  "text-stroke-6-100",
  "text-stroke-6-190",
  "text-stroke-6-180",
  "text-stroke-6-170",
  "text-stroke-6-200",
  "text-stroke-6-290",
  "text-stroke-6-280",
  "text-stroke-6-270",
  "text-stroke-6-300",
  "text-stroke-6-390",
  "text-stroke-6-380",
  "text-stroke-6-370",
  "text-stroke-6-400",
  "text-stroke-6-490",
  "text-stroke-6-480",
  "text-stroke-6-470",
  "text-stroke-6-500",
  "text-stroke-6-590",
  "text-stroke-6-580",
  "text-stroke-6-570",
  "text-stroke-7-white",
  "text-stroke-7-100",
  "text-stroke-7-190",
  "text-stroke-7-180",
  "text-stroke-7-170",
  "text-stroke-7-200",
  "text-stroke-7-290",
  "text-stroke-7-280",
  "text-stroke-7-270",
  "text-stroke-7-300",
  "text-stroke-7-390",
  "text-stroke-7-380",
  "text-stroke-7-370",
  "text-stroke-7-400",
  "text-stroke-7-490",
  "text-stroke-7-480",
  "text-stroke-7-470",
  "text-stroke-7-500",
  "text-stroke-7-590",
  "text-stroke-7-580",
  "text-stroke-7-570",
  "text-stroke-8-white",
  "text-stroke-8-100",
  "text-stroke-8-190",
  "text-stroke-8-180",
  "text-stroke-8-170",
  "text-stroke-8-200",
  "text-stroke-8-290",
  "text-stroke-8-280",
  "text-stroke-8-270",
  "text-stroke-8-300",
  "text-stroke-8-390",
  "text-stroke-8-380",
  "text-stroke-8-370",
  "text-stroke-8-400",
  "text-stroke-8-490",
  "text-stroke-8-480",
  "text-stroke-8-470",
  "text-stroke-8-500",
  "text-stroke-8-590",
  "text-stroke-8-580",
  "text-stroke-8-570",
  "text-stroke-9-white",
  "text-stroke-9-100",
  "text-stroke-9-190",
  "text-stroke-9-180",
  "text-stroke-9-170",
  "text-stroke-9-200",
  "text-stroke-9-290",
  "text-stroke-9-280",
  "text-stroke-9-270",
  "text-stroke-9-300",
  "text-stroke-9-390",
  "text-stroke-9-380",
  "text-stroke-9-370",
  "text-stroke-9-400",
  "text-stroke-9-490",
  "text-stroke-9-480",
  "text-stroke-9-470",
  "text-stroke-9-500",
  "text-stroke-9-590",
  "text-stroke-9-580",
  "text-stroke-9-570",
  "text-stroke-10-white",
  "text-stroke-10-100",
  "text-stroke-10-190",
  "text-stroke-10-180",
  "text-stroke-10-170",
  "text-stroke-10-200",
  "text-stroke-10-290",
  "text-stroke-10-280",
  "text-stroke-10-270",
  "text-stroke-10-300",
  "text-stroke-10-390",
  "text-stroke-10-380",
  "text-stroke-10-370",
  "text-stroke-10-400",
  "text-stroke-10-490",
  "text-stroke-10-480",
  "text-stroke-10-470",
  "text-stroke-10-500",
  "text-stroke-10-590",
  "text-stroke-10-580",
  "text-stroke-10-570",
  "text-stroke-11-white",
  "text-stroke-11-100",
  "text-stroke-11-190",
  "text-stroke-11-180",
  "text-stroke-11-170",
  "text-stroke-11-200",
  "text-stroke-11-290",
  "text-stroke-11-280",
  "text-stroke-11-270",
  "text-stroke-11-300",
  "text-stroke-11-390",
  "text-stroke-11-380",
  "text-stroke-11-370",
  "text-stroke-11-400",
  "text-stroke-11-490",
  "text-stroke-11-480",
  "text-stroke-11-470",
  "text-stroke-11-500",
  "text-stroke-11-590",
  "text-stroke-11-580",
  "text-stroke-11-570",
  "text-stroke-12-white",
  "text-stroke-12-100",
  "text-stroke-12-190",
  "text-stroke-12-180",
  "text-stroke-12-170",
  "text-stroke-12-200",
  "text-stroke-12-290",
  "text-stroke-12-280",
  "text-stroke-12-270",
  "text-stroke-12-300",
  "text-stroke-12-390",
  "text-stroke-12-380",
  "text-stroke-12-370",
  "text-stroke-12-400",
  "text-stroke-12-490",
  "text-stroke-12-480",
  "text-stroke-12-470",
  "text-stroke-12-500",
  "text-stroke-12-590",
  "text-stroke-12-580",
  "text-stroke-12-570",
  "text-stroke-13-white",
  "text-stroke-13-100",
  "text-stroke-13-190",
  "text-stroke-13-180",
  "text-stroke-13-170",
  "text-stroke-13-200",
  "text-stroke-13-290",
  "text-stroke-13-280",
  "text-stroke-13-270",
  "text-stroke-13-300",
  "text-stroke-13-390",
  "text-stroke-13-380",
  "text-stroke-13-370",
  "text-stroke-13-400",
  "text-stroke-13-490",
  "text-stroke-13-480",
  "text-stroke-13-470",
  "text-stroke-13-500",
  "text-stroke-13-590",
  "text-stroke-13-580",
  "text-stroke-13-570",
  "text-stroke-14-white",
  "text-stroke-14-100",
  "text-stroke-14-190",
  "text-stroke-14-180",
  "text-stroke-14-170",
  "text-stroke-14-200",
  "text-stroke-14-290",
  "text-stroke-14-280",
  "text-stroke-14-270",
  "text-stroke-14-300",
  "text-stroke-14-390",
  "text-stroke-14-380",
  "text-stroke-14-370",
  "text-stroke-14-400",
  "text-stroke-14-490",
  "text-stroke-14-480",
  "text-stroke-14-470",
  "text-stroke-14-500",
  "text-stroke-14-590",
  "text-stroke-14-580",
  "text-stroke-14-570",
  "text-stroke-15-white",
  "text-stroke-15-100",
  "text-stroke-15-190",
  "text-stroke-15-180",
  "text-stroke-15-170",
  "text-stroke-15-200",
  "text-stroke-15-290",
  "text-stroke-15-280",
  "text-stroke-15-270",
  "text-stroke-15-300",
  "text-stroke-15-390",
  "text-stroke-15-380",
  "text-stroke-15-370",
  "text-stroke-15-400",
  "text-stroke-15-490",
  "text-stroke-15-480",
  "text-stroke-15-470",
  "text-stroke-15-500",
  "text-stroke-15-590",
  "text-stroke-15-580",
  "text-stroke-15-570",
  "text-stroke-16-white",
  "text-stroke-16-100",
  "text-stroke-16-190",
  "text-stroke-16-180",
  "text-stroke-16-170",
  "text-stroke-16-200",
  "text-stroke-16-290",
  "text-stroke-16-280",
  "text-stroke-16-270",
  "text-stroke-16-300",
  "text-stroke-16-390",
  "text-stroke-16-380",
  "text-stroke-16-370",
  "text-stroke-16-400",
  "text-stroke-16-490",
  "text-stroke-16-480",
  "text-stroke-16-470",
  "text-stroke-16-500",
  "text-stroke-16-590",
  "text-stroke-16-580",
  "text-stroke-16-570",
  "text-stroke-17-white",
  "text-stroke-17-100",
  "text-stroke-17-190",
  "text-stroke-17-180",
  "text-stroke-17-170",
  "text-stroke-17-200",
  "text-stroke-17-290",
  "text-stroke-17-280",
  "text-stroke-17-270",
  "text-stroke-17-300",
  "text-stroke-17-390",
  "text-stroke-17-380",
  "text-stroke-17-370",
  "text-stroke-17-400",
  "text-stroke-17-490",
  "text-stroke-17-480",
  "text-stroke-17-470",
  "text-stroke-17-500",
  "text-stroke-17-590",
  "text-stroke-17-580",
  "text-stroke-17-570",
  "text-stroke-18-white",
  "text-stroke-18-100",
  "text-stroke-18-190",
  "text-stroke-18-180",
  "text-stroke-18-170",
  "text-stroke-18-200",
  "text-stroke-18-290",
  "text-stroke-18-280",
  "text-stroke-18-270",
  "text-stroke-18-300",
  "text-stroke-18-390",
  "text-stroke-18-380",
  "text-stroke-18-370",
  "text-stroke-18-400",
  "text-stroke-18-490",
  "text-stroke-18-480",
  "text-stroke-18-470",
  "text-stroke-18-500",
  "text-stroke-18-590",
  "text-stroke-18-580",
  "text-stroke-18-570",
  "text-stroke-19-white",
  "text-stroke-19-100",
  "text-stroke-19-190",
  "text-stroke-19-180",
  "text-stroke-19-170",
  "text-stroke-19-200",
  "text-stroke-19-290",
  "text-stroke-19-280",
  "text-stroke-19-270",
  "text-stroke-19-300",
  "text-stroke-19-390",
  "text-stroke-19-380",
  "text-stroke-19-370",
  "text-stroke-19-400",
  "text-stroke-19-490",
  "text-stroke-19-480",
  "text-stroke-19-470",
  "text-stroke-19-500",
  "text-stroke-19-590",
  "text-stroke-19-580",
  "text-stroke-19-570",
  "text-stroke-20-white",
  "text-stroke-20-100",
  "text-stroke-20-190",
  "text-stroke-20-180",
  "text-stroke-20-170",
  "text-stroke-20-200",
  "text-stroke-20-290",
  "text-stroke-20-280",
  "text-stroke-20-270",
  "text-stroke-20-300",
  "text-stroke-20-390",
  "text-stroke-20-380",
  "text-stroke-20-370",
  "text-stroke-20-400",
  "text-stroke-20-490",
  "text-stroke-20-480",
  "text-stroke-20-470",
  "text-stroke-20-500",
  "text-stroke-20-590",
  "text-stroke-20-580",
  "text-stroke-20-570"
];
const textStrokeLightBg = [
  "text-stroke-1-600",
  "text-stroke-1-690",
  "text-stroke-1-680",
  "text-stroke-1-670",
  "text-stroke-1-700",
  "text-stroke-1-790",
  "text-stroke-1-780",
  "text-stroke-1-770",
  "text-stroke-1-800",
  "text-stroke-1-890",
  "text-stroke-1-880",
  "text-stroke-1-870",
  "text-stroke-1-900",
  "text-stroke-1-990",
  "text-stroke-1-980",
  "text-stroke-1-970",
  "text-stroke-1-black",
  "text-stroke-2-600",
  "text-stroke-2-690",
  "text-stroke-2-680",
  "text-stroke-2-670",
  "text-stroke-2-700",
  "text-stroke-2-790",
  "text-stroke-2-780",
  "text-stroke-2-770",
  "text-stroke-2-800",
  "text-stroke-2-890",
  "text-stroke-2-880",
  "text-stroke-2-870",
  "text-stroke-2-900",
  "text-stroke-2-990",
  "text-stroke-2-980",
  "text-stroke-2-970",
  "text-stroke-2-black",
  "text-stroke-3-600",
  "text-stroke-3-690",
  "text-stroke-3-680",
  "text-stroke-3-670",
  "text-stroke-3-700",
  "text-stroke-3-790",
  "text-stroke-3-780",
  "text-stroke-3-770",
  "text-stroke-3-800",
  "text-stroke-3-890",
  "text-stroke-3-880",
  "text-stroke-3-870",
  "text-stroke-3-900",
  "text-stroke-3-990",
  "text-stroke-3-980",
  "text-stroke-3-970",
  "text-stroke-3-black",
  "text-stroke-4-600",
  "text-stroke-4-690",
  "text-stroke-4-680",
  "text-stroke-4-670",
  "text-stroke-4-700",
  "text-stroke-4-790",
  "text-stroke-4-780",
  "text-stroke-4-770",
  "text-stroke-4-800",
  "text-stroke-4-890",
  "text-stroke-4-880",
  "text-stroke-4-870",
  "text-stroke-4-900",
  "text-stroke-4-990",
  "text-stroke-4-980",
  "text-stroke-4-970",
  "text-stroke-4-black",
  "text-stroke-5-600",
  "text-stroke-5-690",
  "text-stroke-5-680",
  "text-stroke-5-670",
  "text-stroke-5-700",
  "text-stroke-5-790",
  "text-stroke-5-780",
  "text-stroke-5-770",
  "text-stroke-5-800",
  "text-stroke-5-890",
  "text-stroke-5-880",
  "text-stroke-5-870",
  "text-stroke-5-900",
  "text-stroke-5-990",
  "text-stroke-5-980",
  "text-stroke-5-970",
  "text-stroke-5-black",
  "text-stroke-6-600",
  "text-stroke-6-690",
  "text-stroke-6-680",
  "text-stroke-6-670",
  "text-stroke-6-700",
  "text-stroke-6-790",
  "text-stroke-6-780",
  "text-stroke-6-770",
  "text-stroke-6-800",
  "text-stroke-6-890",
  "text-stroke-6-880",
  "text-stroke-6-870",
  "text-stroke-6-900",
  "text-stroke-6-990",
  "text-stroke-6-980",
  "text-stroke-6-970",
  "text-stroke-6-black",
  "text-stroke-7-600",
  "text-stroke-7-690",
  "text-stroke-7-680",
  "text-stroke-7-670",
  "text-stroke-7-700",
  "text-stroke-7-790",
  "text-stroke-7-780",
  "text-stroke-7-770",
  "text-stroke-7-800",
  "text-stroke-7-890",
  "text-stroke-7-880",
  "text-stroke-7-870",
  "text-stroke-7-900",
  "text-stroke-7-990",
  "text-stroke-7-980",
  "text-stroke-7-970",
  "text-stroke-7-black",
  "text-stroke-8-600",
  "text-stroke-8-690",
  "text-stroke-8-680",
  "text-stroke-8-670",
  "text-stroke-8-700",
  "text-stroke-8-790",
  "text-stroke-8-780",
  "text-stroke-8-770",
  "text-stroke-8-800",
  "text-stroke-8-890",
  "text-stroke-8-880",
  "text-stroke-8-870",
  "text-stroke-8-900",
  "text-stroke-8-990",
  "text-stroke-8-980",
  "text-stroke-8-970",
  "text-stroke-8-black",
  "text-stroke-9-600",
  "text-stroke-9-690",
  "text-stroke-9-680",
  "text-stroke-9-670",
  "text-stroke-9-700",
  "text-stroke-9-790",
  "text-stroke-9-780",
  "text-stroke-9-770",
  "text-stroke-9-800",
  "text-stroke-9-890",
  "text-stroke-9-880",
  "text-stroke-9-870",
  "text-stroke-9-900",
  "text-stroke-9-990",
  "text-stroke-9-980",
  "text-stroke-9-970",
  "text-stroke-9-black",
  "text-stroke-10-600",
  "text-stroke-10-690",
  "text-stroke-10-680",
  "text-stroke-10-670",
  "text-stroke-10-700",
  "text-stroke-10-790",
  "text-stroke-10-780",
  "text-stroke-10-770",
  "text-stroke-10-800",
  "text-stroke-10-890",
  "text-stroke-10-880",
  "text-stroke-10-870",
  "text-stroke-10-900",
  "text-stroke-10-990",
  "text-stroke-10-980",
  "text-stroke-10-970",
  "text-stroke-10-black",
  "text-stroke-11-600",
  "text-stroke-11-690",
  "text-stroke-11-680",
  "text-stroke-11-670",
  "text-stroke-11-700",
  "text-stroke-11-790",
  "text-stroke-11-780",
  "text-stroke-11-770",
  "text-stroke-11-800",
  "text-stroke-11-890",
  "text-stroke-11-880",
  "text-stroke-11-870",
  "text-stroke-11-900",
  "text-stroke-11-990",
  "text-stroke-11-980",
  "text-stroke-11-970",
  "text-stroke-11-black",
  "text-stroke-12-600",
  "text-stroke-12-690",
  "text-stroke-12-680",
  "text-stroke-12-670",
  "text-stroke-12-700",
  "text-stroke-12-790",
  "text-stroke-12-780",
  "text-stroke-12-770",
  "text-stroke-12-800",
  "text-stroke-12-890",
  "text-stroke-12-880",
  "text-stroke-12-870",
  "text-stroke-12-900",
  "text-stroke-12-990",
  "text-stroke-12-980",
  "text-stroke-12-970",
  "text-stroke-12-black",
  "text-stroke-13-600",
  "text-stroke-13-690",
  "text-stroke-13-680",
  "text-stroke-13-670",
  "text-stroke-13-700",
  "text-stroke-13-790",
  "text-stroke-13-780",
  "text-stroke-13-770",
  "text-stroke-13-800",
  "text-stroke-13-890",
  "text-stroke-13-880",
  "text-stroke-13-870",
  "text-stroke-13-900",
  "text-stroke-13-990",
  "text-stroke-13-980",
  "text-stroke-13-970",
  "text-stroke-13-black",
  "text-stroke-14-600",
  "text-stroke-14-690",
  "text-stroke-14-680",
  "text-stroke-14-670",
  "text-stroke-14-700",
  "text-stroke-14-790",
  "text-stroke-14-780",
  "text-stroke-14-770",
  "text-stroke-14-800",
  "text-stroke-14-890",
  "text-stroke-14-880",
  "text-stroke-14-870",
  "text-stroke-14-900",
  "text-stroke-14-990",
  "text-stroke-14-980",
  "text-stroke-14-970",
  "text-stroke-14-black",
  "text-stroke-15-600",
  "text-stroke-15-690",
  "text-stroke-15-680",
  "text-stroke-15-670",
  "text-stroke-15-700",
  "text-stroke-15-790",
  "text-stroke-15-780",
  "text-stroke-15-770",
  "text-stroke-15-800",
  "text-stroke-15-890",
  "text-stroke-15-880",
  "text-stroke-15-870",
  "text-stroke-15-900",
  "text-stroke-15-990",
  "text-stroke-15-980",
  "text-stroke-15-970",
  "text-stroke-15-black",
  "text-stroke-16-600",
  "text-stroke-16-690",
  "text-stroke-16-680",
  "text-stroke-16-670",
  "text-stroke-16-700",
  "text-stroke-16-790",
  "text-stroke-16-780",
  "text-stroke-16-770",
  "text-stroke-16-800",
  "text-stroke-16-890",
  "text-stroke-16-880",
  "text-stroke-16-870",
  "text-stroke-16-900",
  "text-stroke-16-990",
  "text-stroke-16-980",
  "text-stroke-16-970",
  "text-stroke-16-black",
  "text-stroke-17-600",
  "text-stroke-17-690",
  "text-stroke-17-680",
  "text-stroke-17-670",
  "text-stroke-17-700",
  "text-stroke-17-790",
  "text-stroke-17-780",
  "text-stroke-17-770",
  "text-stroke-17-800",
  "text-stroke-17-890",
  "text-stroke-17-880",
  "text-stroke-17-870",
  "text-stroke-17-900",
  "text-stroke-17-990",
  "text-stroke-17-980",
  "text-stroke-17-970",
  "text-stroke-17-black",
  "text-stroke-18-600",
  "text-stroke-18-690",
  "text-stroke-18-680",
  "text-stroke-18-670",
  "text-stroke-18-700",
  "text-stroke-18-790",
  "text-stroke-18-780",
  "text-stroke-18-770",
  "text-stroke-18-800",
  "text-stroke-18-890",
  "text-stroke-18-880",
  "text-stroke-18-870",
  "text-stroke-18-900",
  "text-stroke-18-990",
  "text-stroke-18-980",
  "text-stroke-18-970",
  "text-stroke-18-black",
  "text-stroke-19-600",
  "text-stroke-19-690",
  "text-stroke-19-680",
  "text-stroke-19-670",
  "text-stroke-19-700",
  "text-stroke-19-790",
  "text-stroke-19-780",
  "text-stroke-19-770",
  "text-stroke-19-800",
  "text-stroke-19-890",
  "text-stroke-19-880",
  "text-stroke-19-870",
  "text-stroke-19-900",
  "text-stroke-19-990",
  "text-stroke-19-980",
  "text-stroke-19-970",
  "text-stroke-19-black",
  "text-stroke-20-600",
  "text-stroke-20-690",
  "text-stroke-20-680",
  "text-stroke-20-670",
  "text-stroke-20-700",
  "text-stroke-20-790",
  "text-stroke-20-780",
  "text-stroke-20-770",
  "text-stroke-20-800",
  "text-stroke-20-890",
  "text-stroke-20-880",
  "text-stroke-20-870",
  "text-stroke-20-900",
  "text-stroke-20-990",
  "text-stroke-20-980",
  "text-stroke-20-970",
  "text-stroke-20-black"
];
const allColors = [
  "bg-col-100",
  "bg-col-200",
  "bg-col-300",
  "bg-col-400",
  "bg-col-500",
  "bg-col-600",
  "bg-col-700",
  "bg-col-800",
  "bg-col-900"
];
const allColorsRGB = [
  { code: "bg-col-100", rgb: "rgb(228, 237, 245)" },
  { code: "bg-col-200", rgb: "rgb(208, 226, 242)" },
  { code: "bg-col-300", rgb: "rgb(217, 181, 173)" },
  { code: "bg-col-400", rgb: "rgb(167, 189, 217)" },
  { code: "bg-col-500", rgb: "rgb(84, 123, 171)" },
  { code: "bg-col-600", rgb: "rgb(97, 116, 140)" },
  { code: "bg-col-700", rgb: "rgb(41, 60, 84)" },
  { code: "bg-col-800", rgb: "rgb(1, 42, 94)" },
  { code: "bg-col-900", rgb: "rgb(1, 17, 38)" }
];
const colors100 = [
  "bg-col-100",
  "bg-col-110",
  "bg-col-120",
  "bg-col-130",
  "bg-col-140",
  "bg-col-150",
  "bg-col-160",
  "bg-col-170",
  "bg-col-180",
  "bg-col-190"
];
const colors200 = [
  "bg-col-200",
  "bg-col-210",
  "bg-col-220",
  "bg-col-230",
  "bg-col-240",
  "bg-col-250",
  "bg-col-260",
  "bg-col-270",
  "bg-col-280",
  "bg-col-290"
];
const colors300 = [
  "bg-col-300",
  "bg-col-310",
  "bg-col-320",
  "bg-col-330",
  "bg-col-340",
  "bg-col-350",
  "bg-col-360",
  "bg-col-370",
  "bg-col-380",
  "bg-col-390"
];
const colors400 = [
  "bg-col-400",
  "bg-col-410",
  "bg-col-420",
  "bg-col-430",
  "bg-col-440",
  "bg-col-450",
  "bg-col-460",
  "bg-col-470",
  "bg-col-480",
  "bg-col-490"
];
const colors500 = [
  "bg-col-500",
  "bg-col-510",
  "bg-col-520",
  "bg-col-530",
  "bg-col-540",
  "bg-col-550",
  "bg-col-560",
  "bg-col-570",
  "bg-col-580",
  "bg-col-590"
];
const colors600 = [
  "bg-col-600",
  "bg-col-610",
  "bg-col-620",
  "bg-col-630",
  "bg-col-640",
  "bg-col-650",
  "bg-col-660",
  "bg-col-670",
  "bg-col-680",
  "bg-col-690"
];
const colors700 = [
  "bg-col-700",
  "bg-col-710",
  "bg-col-720",
  "bg-col-730",
  "bg-col-740",
  "bg-col-750",
  "bg-col-760",
  "bg-col-770",
  "bg-col-780",
  "bg-col-790"
];
const colors800 = [
  "bg-col-800",
  "bg-col-810",
  "bg-col-820",
  "bg-col-830",
  "bg-col-840",
  "bg-col-850",
  "bg-col-860",
  "bg-col-870",
  "bg-col-880",
  "bg-col-890"
];
const colors900 = [
  "bg-col-900",
  "bg-col-910",
  "bg-col-920",
  "bg-col-930",
  "bg-col-940",
  "bg-col-950",
  "bg-col-960",
  "bg-col-970",
  "bg-col-980",
  "bg-col-990"
];
const gradients = [
  "bg-linear1",
  "bg-linear1op25",
  "bg-linear1op50",
  "bg-linear1op75",
  "bg-linear2",
  "bg-linear2op25",
  "bg-linear2op50",
  "bg-linear2op75",
  "bg-linear3",
  "bg-linear3op25",
  "bg-linear3op50",
  "bg-linear3op75",
  "bg-linear4",
  "bg-linear4op25",
  "bg-linear4op50",
  "bg-linear4op75",
  "bg-linear5",
  "bg-linear5op25",
  "bg-linear5op50",
  "bg-linear5op75",
  "bg-linear6",
  "bg-linear6op25",
  "bg-linear6op50",
  "bg-linear6op75",
  "bg-diagonal1",
  "bg-diagonal1op25",
  "bg-diagonal1op50",
  "bg-diagonal1op75",
  "bg-diagonal2",
  "bg-diagonal2op25",
  "bg-diagonal2op50",
  "bg-diagonal2op75",
  "bg-diagonal3",
  "bg-diagonal3op25",
  "bg-diagonal3op50",
  "bg-diagonal3op75",
  "bg-diagonal4",
  "bg-diagonal4op25",
  "bg-diagonal4op50",
  "bg-diagonal4op75",
  "bg-diagonal5",
  "bg-diagonal5op25",
  "bg-diagonal5op50",
  "bg-diagonal5op75",
  "bg-diagonal6",
  "bg-diagonal6op25",
  "bg-diagonal6op50",
  "bg-diagonal6op75",
  "bg-radial1",
  "bg-radial1op25",
  "bg-radial1op50",
  "bg-radial1op75",
  "bg-radial2",
  "bg-radial2op25",
  "bg-radial2op50",
  "bg-radial2op75",
  "bg-radial3",
  "bg-radial3op25",
  "bg-radial3op50",
  "bg-radial3op75",
  "bg-radial4",
  "bg-radial4op25",
  "bg-radial4op50",
  "bg-radial4op75",
  "bg-radial5",
  "bg-radial5op25",
  "bg-radial5op50",
  "bg-radial5op75",
  "bg-radial6",
  "bg-radial6op25",
  "bg-radial6op50",
  "bg-radial6op75"
];
const col100Bgs = {
  bg1: "bg-col-100 bg-linear1op25",
  bg2: "bg-col-100 bg-linear1op50",
  bg3: "bg-col-100 bg-linear1op75",
  bg4: "bg-col-100 bg-linear2op25",
  bg5: "bg-col-100 bg-linear2op50",
  bg6: "bg-col-100 bg-linear2op75",
  bg7: "bg-col-100 bg-linear3op25",
  bg8: "bg-col-100 bg-linear3op50",
  bg9: "bg-col-100 bg-linear3op75",
  bg10: "bg-col-100 bg-linear4op25",
  bg11: "bg-col-100 bg-linear4op50",
  bg12: "bg-col-100 bg-linear4op75",
  bg13: "bg-col-100 bg-linear5op25",
  bg14: "bg-col-100 bg-linear5op50",
  bg15: "bg-col-100 bg-linear5op75",
  bg16: "bg-col-100 bg-linear6op25",
  bg17: "bg-col-100 bg-linear6op50",
  bg18: "bg-col-100 bg-linear6op75",
  bg19: "bg-col-100 bg-diagonal1op25",
  bg20: "bg-col-100 bg-diagonal1op50",
  bg21: "bg-col-100 bg-diagonal1op75",
  bg22: "bg-col-100 bg-diagonal2op25",
  bg23: "bg-col-100 bg-diagonal2op50",
  bg24: "bg-col-100 bg-diagonal2op75",
  bg25: "bg-col-100 bg-diagonal3op25",
  bg26: "bg-col-100 bg-diagonal3op50",
  bg27: "bg-col-100 bg-diagonal3op75",
  bg28: "bg-col-100 bg-diagonal4op25",
  bg29: "bg-col-100 bg-diagonal4op50",
  bg30: "bg-col-100 bg-diagonal4op75",
  bg31: "bg-col-100 bg-diagonal5op25",
  bg32: "bg-col-100 bg-diagonal5op50",
  bg33: "bg-col-100 bg-diagonal5op75",
  bg34: "bg-col-100 bg-diagonal6op25",
  bg35: "bg-col-100 bg-diagonal6op50",
  bg36: "bg-col-100 bg-diagonal6op75",
  bg37: "bg-col-100 bg-radial1op25",
  bg38: "bg-col-100 bg-radial1op50",
  bg39: "bg-col-100 bg-radial1op75",
  bg40: "bg-col-100 bg-radial2op25",
  bg41: "bg-col-100 bg-radial2op50",
  bg42: "bg-col-100 bg-radial2op75",
  bg43: "bg-col-100 bg-radial3op25",
  bg44: "bg-col-100 bg-radial3op50",
  bg45: "bg-col-100 bg-radial3op75",
  bg46: "bg-col-100 bg-radial4op25",
  bg47: "bg-col-100 bg-radial4op50",
  bg48: "bg-col-100 bg-radial4op75",
  bg49: "bg-col-100 bg-radial5op25",
  bg50: "bg-col-100 bg-radial5op50",
  bg51: "bg-col-100 bg-radial5op75",
  bg52: "bg-col-100 bg-radial6op25",
  bg53: "bg-col-100 bg-radial6op50",
  bg54: "bg-col-100 bg-radial6op75"
};
const col200Bgs = {
  bg1: "bg-col-200 bg-linear1op25",
  bg2: "bg-col-200 bg-linear1op50",
  bg3: "bg-col-200 bg-linear1op75",
  bg4: "bg-col-200 bg-linear2op25",
  bg5: "bg-col-200 bg-linear2op50",
  bg6: "bg-col-200 bg-linear2op75",
  bg7: "bg-col-200 bg-linear3op25",
  bg8: "bg-col-200 bg-linear3op50",
  bg9: "bg-col-200 bg-linear3op75",
  bg10: "bg-col-200 bg-linear4op25",
  bg11: "bg-col-200 bg-linear4op50",
  bg12: "bg-col-200 bg-linear4op75",
  bg13: "bg-col-200 bg-linear5op25",
  bg14: "bg-col-200 bg-linear5op50",
  bg15: "bg-col-200 bg-linear5op75",
  bg16: "bg-col-200 bg-linear6op25",
  bg17: "bg-col-200 bg-linear6op50",
  bg18: "bg-col-200 bg-linear6op75",
  bg19: "bg-col-200 bg-diagonal1op25",
  bg20: "bg-col-200 bg-diagonal1op50",
  bg21: "bg-col-200 bg-diagonal1op75",
  bg22: "bg-col-200 bg-diagonal2op25",
  bg23: "bg-col-200 bg-diagonal2op50",
  bg24: "bg-col-200 bg-diagonal2op75",
  bg25: "bg-col-200 bg-diagonal3op25",
  bg26: "bg-col-200 bg-diagonal3op50",
  bg27: "bg-col-200 bg-diagonal3op75",
  bg28: "bg-col-200 bg-diagonal4op25",
  bg29: "bg-col-200 bg-diagonal4op50",
  bg30: "bg-col-200 bg-diagonal4op75",
  bg31: "bg-col-200 bg-diagonal5op25",
  bg32: "bg-col-200 bg-diagonal5op50",
  bg33: "bg-col-200 bg-diagonal5op75",
  bg34: "bg-col-200 bg-diagonal6op25",
  bg35: "bg-col-200 bg-diagonal6op50",
  bg36: "bg-col-200 bg-diagonal6op75",
  bg37: "bg-col-200 bg-radial1op25",
  bg38: "bg-col-200 bg-radial1op50",
  bg39: "bg-col-200 bg-radial1op75",
  bg40: "bg-col-200 bg-radial2op25",
  bg41: "bg-col-200 bg-radial2op50",
  bg42: "bg-col-200 bg-radial2op75",
  bg43: "bg-col-200 bg-radial3op25",
  bg44: "bg-col-200 bg-radial3op50",
  bg45: "bg-col-200 bg-radial3op75",
  bg46: "bg-col-200 bg-radial4op25",
  bg47: "bg-col-200 bg-radial4op50",
  bg48: "bg-col-200 bg-radial4op75",
  bg49: "bg-col-200 bg-radial5op25",
  bg50: "bg-col-200 bg-radial5op50",
  bg51: "bg-col-200 bg-radial5op75",
  bg52: "bg-col-200 bg-radial6op25",
  bg53: "bg-col-200 bg-radial6op50",
  bg54: "bg-col-200 bg-radial6op75"
};
const col300Bgs = {
  bg1: "bg-col-300 bg-linear1op25",
  bg2: "bg-col-300 bg-linear1op50",
  bg3: "bg-col-300 bg-linear1op75",
  bg4: "bg-col-300 bg-linear2op25",
  bg5: "bg-col-300 bg-linear2op50",
  bg6: "bg-col-300 bg-linear2op75",
  bg7: "bg-col-300 bg-linear3op25",
  bg8: "bg-col-300 bg-linear3op50",
  bg9: "bg-col-300 bg-linear3op75",
  bg10: "bg-col-300 bg-linear4op25",
  bg11: "bg-col-300 bg-linear4op50",
  bg12: "bg-col-300 bg-linear4op75",
  bg13: "bg-col-300 bg-linear5op25",
  bg14: "bg-col-300 bg-linear5op50",
  bg15: "bg-col-300 bg-linear5op75",
  bg16: "bg-col-300 bg-linear6op25",
  bg17: "bg-col-300 bg-linear6op50",
  bg18: "bg-col-300 bg-linear6op75",
  bg19: "bg-col-300 bg-diagonal1op25",
  bg20: "bg-col-300 bg-diagonal1op50",
  bg21: "bg-col-300 bg-diagonal1op75",
  bg22: "bg-col-300 bg-diagonal2op25",
  bg23: "bg-col-300 bg-diagonal2op50",
  bg24: "bg-col-300 bg-diagonal2op75",
  bg25: "bg-col-300 bg-diagonal3op25",
  bg26: "bg-col-300 bg-diagonal3op50",
  bg27: "bg-col-300 bg-diagonal3op75",
  bg28: "bg-col-300 bg-diagonal4op25",
  bg29: "bg-col-300 bg-diagonal4op50",
  bg30: "bg-col-300 bg-diagonal4op75",
  bg31: "bg-col-300 bg-diagonal5op25",
  bg32: "bg-col-300 bg-diagonal5op50",
  bg33: "bg-col-300 bg-diagonal5op75",
  bg34: "bg-col-300 bg-diagonal6op25",
  bg35: "bg-col-300 bg-diagonal6op50",
  bg36: "bg-col-300 bg-diagonal6op75",
  bg37: "bg-col-300 bg-radial1op25",
  bg38: "bg-col-300 bg-radial1op50",
  bg39: "bg-col-300 bg-radial1op75",
  bg40: "bg-col-300 bg-radial2op25",
  bg41: "bg-col-300 bg-radial2op50",
  bg42: "bg-col-300 bg-radial2op75",
  bg43: "bg-col-300 bg-radial3op25",
  bg44: "bg-col-300 bg-radial3op50",
  bg45: "bg-col-300 bg-radial3op75",
  bg46: "bg-col-300 bg-radial4op25",
  bg47: "bg-col-300 bg-radial4op50",
  bg48: "bg-col-300 bg-radial4op75",
  bg49: "bg-col-300 bg-radial5op25",
  bg50: "bg-col-300 bg-radial5op50",
  bg51: "bg-col-300 bg-radial5op75",
  bg52: "bg-col-300 bg-radial6op25",
  bg53: "bg-col-300 bg-radial6op50",
  bg54: "bg-col-300 bg-radial6op75"
};
const col400Bgs = {
  bg1: "bg-col-400 bg-linear1op25",
  bg2: "bg-col-400 bg-linear1op50",
  bg3: "bg-col-400 bg-linear1op75",
  bg4: "bg-col-400 bg-linear2op25",
  bg5: "bg-col-400 bg-linear2op50",
  bg6: "bg-col-400 bg-linear2op75",
  bg7: "bg-col-400 bg-linear3op25",
  bg8: "bg-col-400 bg-linear3op50",
  bg9: "bg-col-400 bg-linear3op75",
  bg10: "bg-col-400 bg-linear4op25",
  bg11: "bg-col-400 bg-linear4op50",
  bg12: "bg-col-400 bg-linear4op75",
  bg13: "bg-col-400 bg-linear5op25",
  bg14: "bg-col-400 bg-linear5op50",
  bg15: "bg-col-400 bg-linear5op75",
  bg16: "bg-col-400 bg-linear6op25",
  bg17: "bg-col-400 bg-linear6op50",
  bg18: "bg-col-400 bg-linear6op75",
  bg19: "bg-col-400 bg-diagonal1op25",
  bg20: "bg-col-400 bg-diagonal1op50",
  bg21: "bg-col-400 bg-diagonal1op75",
  bg22: "bg-col-400 bg-diagonal2op25",
  bg23: "bg-col-400 bg-diagonal2op50",
  bg24: "bg-col-400 bg-diagonal2op75",
  bg25: "bg-col-400 bg-diagonal3op25",
  bg26: "bg-col-400 bg-diagonal3op50",
  bg27: "bg-col-400 bg-diagonal3op75",
  bg28: "bg-col-400 bg-diagonal4op25",
  bg29: "bg-col-400 bg-diagonal4op50",
  bg30: "bg-col-400 bg-diagonal4op75",
  bg31: "bg-col-400 bg-diagonal5op25",
  bg32: "bg-col-400 bg-diagonal5op50",
  bg33: "bg-col-400 bg-diagonal5op75",
  bg34: "bg-col-400 bg-diagonal6op25",
  bg35: "bg-col-400 bg-diagonal6op50",
  bg36: "bg-col-400 bg-diagonal6op75",
  bg37: "bg-col-400 bg-radial1op25",
  bg38: "bg-col-400 bg-radial1op50",
  bg39: "bg-col-400 bg-radial1op75",
  bg40: "bg-col-400 bg-radial2op25",
  bg41: "bg-col-400 bg-radial2op50",
  bg42: "bg-col-400 bg-radial2op75",
  bg43: "bg-col-400 bg-radial3op25",
  bg44: "bg-col-400 bg-radial3op50",
  bg45: "bg-col-400 bg-radial3op75",
  bg46: "bg-col-400 bg-radial4op25",
  bg47: "bg-col-400 bg-radial4op50",
  bg48: "bg-col-400 bg-radial4op75",
  bg49: "bg-col-400 bg-radial5op25",
  bg50: "bg-col-400 bg-radial5op50",
  bg51: "bg-col-400 bg-radial5op75",
  bg52: "bg-col-400 bg-radial6op25",
  bg53: "bg-col-400 bg-radial6op50",
  bg54: "bg-col-400 bg-radial6op75"
};
const col500Bgs = {
  bg1: "bg-col-500 bg-linear1op25",
  bg2: "bg-col-500 bg-linear1op50",
  bg3: "bg-col-500 bg-linear1op75",
  bg4: "bg-col-500 bg-linear2op25",
  bg5: "bg-col-500 bg-linear2op50",
  bg6: "bg-col-500 bg-linear2op75",
  bg7: "bg-col-500 bg-linear3op25",
  bg8: "bg-col-500 bg-linear3op50",
  bg9: "bg-col-500 bg-linear3op75",
  bg10: "bg-col-500 bg-linear4op25",
  bg11: "bg-col-500 bg-linear4op50",
  bg12: "bg-col-500 bg-linear4op75",
  bg13: "bg-col-500 bg-linear5op25",
  bg14: "bg-col-500 bg-linear5op50",
  bg15: "bg-col-500 bg-linear5op75",
  bg16: "bg-col-500 bg-linear6op25",
  bg17: "bg-col-500 bg-linear6op50",
  bg18: "bg-col-500 bg-linear6op75",
  bg19: "bg-col-500 bg-diagonal1op25",
  bg20: "bg-col-500 bg-diagonal1op50",
  bg21: "bg-col-500 bg-diagonal1op75",
  bg22: "bg-col-500 bg-diagonal2op25",
  bg23: "bg-col-500 bg-diagonal2op50",
  bg24: "bg-col-500 bg-diagonal2op75",
  bg25: "bg-col-500 bg-diagonal3op25",
  bg26: "bg-col-500 bg-diagonal3op50",
  bg27: "bg-col-500 bg-diagonal3op75",
  bg28: "bg-col-500 bg-diagonal4op25",
  bg29: "bg-col-500 bg-diagonal4op50",
  bg30: "bg-col-500 bg-diagonal4op75",
  bg31: "bg-col-500 bg-diagonal5op25",
  bg32: "bg-col-500 bg-diagonal5op50",
  bg33: "bg-col-500 bg-diagonal5op75",
  bg34: "bg-col-500 bg-diagonal6op25",
  bg35: "bg-col-500 bg-diagonal6op50",
  bg36: "bg-col-500 bg-diagonal6op75",
  bg37: "bg-col-500 bg-radial1op25",
  bg38: "bg-col-500 bg-radial1op50",
  bg39: "bg-col-500 bg-radial1op75",
  bg40: "bg-col-500 bg-radial2op25",
  bg41: "bg-col-500 bg-radial2op50",
  bg42: "bg-col-500 bg-radial2op75",
  bg43: "bg-col-500 bg-radial3op25",
  bg44: "bg-col-500 bg-radial3op50",
  bg45: "bg-col-500 bg-radial3op75",
  bg46: "bg-col-500 bg-radial4op25",
  bg47: "bg-col-500 bg-radial4op50",
  bg48: "bg-col-500 bg-radial4op75",
  bg49: "bg-col-500 bg-radial5op25",
  bg50: "bg-col-500 bg-radial5op50",
  bg51: "bg-col-500 bg-radial5op75",
  bg52: "bg-col-500 bg-radial6op25",
  bg53: "bg-col-500 bg-radial6op50",
  bg54: "bg-col-500 bg-radial6op75"
};
const col600Bgs = {
  bg1: "bg-col-600 bg-linear1op25",
  bg2: "bg-col-600 bg-linear1op50",
  bg3: "bg-col-600 bg-linear1op75",
  bg4: "bg-col-600 bg-linear2op25",
  bg5: "bg-col-600 bg-linear2op50",
  bg6: "bg-col-600 bg-linear2op75",
  bg7: "bg-col-600 bg-linear3op25",
  bg8: "bg-col-600 bg-linear3op50",
  bg9: "bg-col-600 bg-linear3op75",
  bg10: "bg-col-600 bg-linear4op25",
  bg11: "bg-col-600 bg-linear4op50",
  bg12: "bg-col-600 bg-linear4op75",
  bg13: "bg-col-600 bg-linear5op25",
  bg14: "bg-col-600 bg-linear5op50",
  bg15: "bg-col-600 bg-linear5op75",
  bg16: "bg-col-600 bg-linear6op25",
  bg17: "bg-col-600 bg-linear6op50",
  bg18: "bg-col-600 bg-linear6op75",
  bg19: "bg-col-600 bg-diagonal1op25",
  bg20: "bg-col-600 bg-diagonal1op50",
  bg21: "bg-col-600 bg-diagonal1op75",
  bg22: "bg-col-600 bg-diagonal2op25",
  bg23: "bg-col-600 bg-diagonal2op50",
  bg24: "bg-col-600 bg-diagonal2op75",
  bg25: "bg-col-600 bg-diagonal3op25",
  bg26: "bg-col-600 bg-diagonal3op50",
  bg27: "bg-col-600 bg-diagonal3op75",
  bg28: "bg-col-600 bg-diagonal4op25",
  bg29: "bg-col-600 bg-diagonal4op50",
  bg30: "bg-col-600 bg-diagonal4op75",
  bg31: "bg-col-600 bg-diagonal5op25",
  bg32: "bg-col-600 bg-diagonal5op50",
  bg33: "bg-col-600 bg-diagonal5op75",
  bg34: "bg-col-600 bg-diagonal6op25",
  bg35: "bg-col-600 bg-diagonal6op50",
  bg36: "bg-col-600 bg-diagonal6op75",
  bg37: "bg-col-600 bg-radial1op25",
  bg38: "bg-col-600 bg-radial1op50",
  bg39: "bg-col-600 bg-radial1op75",
  bg40: "bg-col-600 bg-radial2op25",
  bg41: "bg-col-600 bg-radial2op50",
  bg42: "bg-col-600 bg-radial2op75",
  bg43: "bg-col-600 bg-radial3op25",
  bg44: "bg-col-600 bg-radial3op50",
  bg45: "bg-col-600 bg-radial3op75",
  bg46: "bg-col-600 bg-radial4op25",
  bg47: "bg-col-600 bg-radial4op50",
  bg48: "bg-col-600 bg-radial4op75",
  bg49: "bg-col-600 bg-radial5op25",
  bg50: "bg-col-600 bg-radial5op50",
  bg51: "bg-col-600 bg-radial5op75",
  bg52: "bg-col-600 bg-radial6op25",
  bg53: "bg-col-600 bg-radial6op50",
  bg54: "bg-col-600 bg-radial6op75"
};
const col700Bgs = {
  bg1: "bg-col-700 bg-linear1op25",
  bg2: "bg-col-700 bg-linear1op50",
  bg3: "bg-col-700 bg-linear1op75",
  bg4: "bg-col-700 bg-linear2op25",
  bg5: "bg-col-700 bg-linear2op50",
  bg6: "bg-col-700 bg-linear2op75",
  bg7: "bg-col-700 bg-linear3op25",
  bg8: "bg-col-700 bg-linear3op50",
  bg9: "bg-col-700 bg-linear3op75",
  bg10: "bg-col-700 bg-linear4op25",
  bg11: "bg-col-700 bg-linear4op50",
  bg12: "bg-col-700 bg-linear4op75",
  bg13: "bg-col-700 bg-linear5op25",
  bg14: "bg-col-700 bg-linear5op50",
  bg15: "bg-col-700 bg-linear5op75",
  bg16: "bg-col-700 bg-linear6op25",
  bg17: "bg-col-700 bg-linear6op50",
  bg18: "bg-col-700 bg-linear6op75",
  bg19: "bg-col-700 bg-diagonal1op25",
  bg20: "bg-col-700 bg-diagonal1op50",
  bg21: "bg-col-700 bg-diagonal1op75",
  bg22: "bg-col-700 bg-diagonal2op25",
  bg23: "bg-col-700 bg-diagonal2op50",
  bg24: "bg-col-700 bg-diagonal2op75",
  bg25: "bg-col-700 bg-diagonal3op25",
  bg26: "bg-col-700 bg-diagonal3op50",
  bg27: "bg-col-700 bg-diagonal3op75",
  bg28: "bg-col-700 bg-diagonal4op25",
  bg29: "bg-col-700 bg-diagonal4op50",
  bg30: "bg-col-700 bg-diagonal4op75",
  bg31: "bg-col-700 bg-diagonal5op25",
  bg32: "bg-col-700 bg-diagonal5op50",
  bg33: "bg-col-700 bg-diagonal5op75",
  bg34: "bg-col-700 bg-diagonal6op25",
  bg35: "bg-col-700 bg-diagonal6op50",
  bg36: "bg-col-700 bg-diagonal6op75",
  bg37: "bg-col-700 bg-radial1op25",
  bg38: "bg-col-700 bg-radial1op50",
  bg39: "bg-col-700 bg-radial1op75",
  bg40: "bg-col-700 bg-radial2op25",
  bg41: "bg-col-700 bg-radial2op50",
  bg42: "bg-col-700 bg-radial2op75",
  bg43: "bg-col-700 bg-radial3op25",
  bg44: "bg-col-700 bg-radial3op50",
  bg45: "bg-col-700 bg-radial3op75",
  bg46: "bg-col-700 bg-radial4op25",
  bg47: "bg-col-700 bg-radial4op50",
  bg48: "bg-col-700 bg-radial4op75",
  bg49: "bg-col-700 bg-radial5op25",
  bg50: "bg-col-700 bg-radial5op50",
  bg51: "bg-col-700 bg-radial5op75",
  bg52: "bg-col-700 bg-radial6op25",
  bg53: "bg-col-700 bg-radial6op50",
  bg54: "bg-col-700 bg-radial6op75"
};
const col800Bgs = {
  bg1: "bg-col-800 bg-linear1op25",
  bg2: "bg-col-800 bg-linear1op50",
  bg3: "bg-col-800 bg-linear1op75",
  bg4: "bg-col-800 bg-linear2op25",
  bg5: "bg-col-800 bg-linear2op50",
  bg6: "bg-col-800 bg-linear2op75",
  bg7: "bg-col-800 bg-linear3op25",
  bg8: "bg-col-800 bg-linear3op50",
  bg9: "bg-col-800 bg-linear3op75",
  bg10: "bg-col-800 bg-linear4op25",
  bg11: "bg-col-800 bg-linear4op50",
  bg12: "bg-col-800 bg-linear4op75",
  bg13: "bg-col-800 bg-linear5op25",
  bg14: "bg-col-800 bg-linear5op50",
  bg15: "bg-col-800 bg-linear5op75",
  bg16: "bg-col-800 bg-linear6op25",
  bg17: "bg-col-800 bg-linear6op50",
  bg18: "bg-col-800 bg-linear6op75",
  bg19: "bg-col-800 bg-diagonal1op25",
  bg20: "bg-col-800 bg-diagonal1op50",
  bg21: "bg-col-800 bg-diagonal1op75",
  bg22: "bg-col-800 bg-diagonal2op25",
  bg23: "bg-col-800 bg-diagonal2op50",
  bg24: "bg-col-800 bg-diagonal2op75",
  bg25: "bg-col-800 bg-diagonal3op25",
  bg26: "bg-col-800 bg-diagonal3op50",
  bg27: "bg-col-800 bg-diagonal3op75",
  bg28: "bg-col-800 bg-diagonal4op25",
  bg29: "bg-col-800 bg-diagonal4op50",
  bg30: "bg-col-800 bg-diagonal4op75",
  bg31: "bg-col-800 bg-diagonal5op25",
  bg32: "bg-col-800 bg-diagonal5op50",
  bg33: "bg-col-800 bg-diagonal5op75",
  bg34: "bg-col-800 bg-diagonal6op25",
  bg35: "bg-col-800 bg-diagonal6op50",
  bg36: "bg-col-800 bg-diagonal6op75",
  bg37: "bg-col-800 bg-radial1op25",
  bg38: "bg-col-800 bg-radial1op50",
  bg39: "bg-col-800 bg-radial1op75",
  bg40: "bg-col-800 bg-radial2op25",
  bg41: "bg-col-800 bg-radial2op50",
  bg42: "bg-col-800 bg-radial2op75",
  bg43: "bg-col-800 bg-radial3op25",
  bg44: "bg-col-800 bg-radial3op50",
  bg45: "bg-col-800 bg-radial3op75",
  bg46: "bg-col-800 bg-radial4op25",
  bg47: "bg-col-800 bg-radial4op50",
  bg48: "bg-col-800 bg-radial4op75",
  bg49: "bg-col-800 bg-radial5op25",
  bg50: "bg-col-800 bg-radial5op50",
  bg51: "bg-col-800 bg-radial5op75",
  bg52: "bg-col-800 bg-radial6op25",
  bg53: "bg-col-800 bg-radial6op50",
  bg54: "bg-col-800 bg-radial6op75"
};
const col900Bgs = {
  bg1: "bg-col-900 bg-linear1op25",
  bg2: "bg-col-900 bg-linear1op50",
  bg3: "bg-col-900 bg-linear1op75",
  bg4: "bg-col-900 bg-linear2op25",
  bg5: "bg-col-900 bg-linear2op50",
  bg6: "bg-col-900 bg-linear2op75",
  bg7: "bg-col-900 bg-linear3op25",
  bg8: "bg-col-900 bg-linear3op50",
  bg9: "bg-col-900 bg-linear3op75",
  bg10: "bg-col-900 bg-linear4op25",
  bg11: "bg-col-900 bg-linear4op50",
  bg12: "bg-col-900 bg-linear4op75",
  bg13: "bg-col-900 bg-linear5op25",
  bg14: "bg-col-900 bg-linear5op50",
  bg15: "bg-col-900 bg-linear5op75",
  bg16: "bg-col-900 bg-linear6op25",
  bg17: "bg-col-900 bg-linear6op50",
  bg18: "bg-col-900 bg-linear6op75",
  bg19: "bg-col-900 bg-diagonal1op25",
  bg20: "bg-col-900 bg-diagonal1op50",
  bg21: "bg-col-900 bg-diagonal1op75",
  bg22: "bg-col-900 bg-diagonal2op25",
  bg23: "bg-col-900 bg-diagonal2op50",
  bg24: "bg-col-900 bg-diagonal2op75",
  bg25: "bg-col-900 bg-diagonal3op25",
  bg26: "bg-col-900 bg-diagonal3op50",
  bg27: "bg-col-900 bg-diagonal3op75",
  bg28: "bg-col-900 bg-diagonal4op25",
  bg29: "bg-col-900 bg-diagonal4op50",
  bg30: "bg-col-900 bg-diagonal4op75",
  bg31: "bg-col-900 bg-diagonal5op25",
  bg32: "bg-col-900 bg-diagonal5op50",
  bg33: "bg-col-900 bg-diagonal5op75",
  bg34: "bg-col-900 bg-diagonal6op25",
  bg35: "bg-col-900 bg-diagonal6op50",
  bg36: "bg-col-900 bg-diagonal6op75",
  bg37: "bg-col-900 bg-radial1op25",
  bg38: "bg-col-900 bg-radial1op50",
  bg39: "bg-col-900 bg-radial1op75",
  bg40: "bg-col-900 bg-radial2op25",
  bg41: "bg-col-900 bg-radial2op50",
  bg42: "bg-col-900 bg-radial2op75",
  bg43: "bg-col-900 bg-radial3op25",
  bg44: "bg-col-900 bg-radial3op50",
  bg45: "bg-col-900 bg-radial3op75",
  bg46: "bg-col-900 bg-radial4op25",
  bg47: "bg-col-900 bg-radial4op50",
  bg48: "bg-col-900 bg-radial4op75",
  bg49: "bg-col-900 bg-radial5op25",
  bg50: "bg-col-900 bg-radial5op50",
  bg51: "bg-col-900 bg-radial5op75",
  bg52: "bg-col-900 bg-radial6op25",
  bg53: "bg-col-900 bg-radial6op50",
  bg54: "bg-col-900 bg-radial6op75"
};
const shadowsLightBack = [
  "shadowNarrowTight",
  "shadowNarrowNormal",
  "shadowNarrowLoose",
  "shadowNarrowLooser",
  "shadowBroadTight",
  "shadowBroadNormal",
  "shadowBroadLoose",
  "shadowBroadLooser",
  "shadowWideTight",
  "shadowWideNormal",
  "shadowWideLoose",
  "shadowWideLooser",
  "insetShadowSm",
  "insetShadowMd",
  "insetShadowLg",
  "insetShadowXl",
  "shadow3DXs",
  "shadow3DSm",
  "shadow3DMd",
  "shadow3DLg",
  "shadow3DXl",
  "standoutShadowSm",
  "standoutShadowMd",
  "standoutShadowLg",
  "standoutShadowXl"
];
const shadowsDarkBack = [
  "lightShadowTight",
  "lightShadowNormal",
  "lightShadowLoose",
  "lightShadowLooser",
  "lightGlowSm",
  "lightGlowMd",
  "lightGlowLg",
  "lightGlowXl",
  "boxGlowSm",
  "boxGlowMd",
  "boxGlowLg",
  "boxGlowXl",
  "metallicEdgesSm",
  "metallicEdgesMd",
  "metallicEdgesLg",
  "metallicEdgesXl"
];
const toastPositions = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
  "center-right",
  "center-bottom",
  "center-left",
  "center-top",
  "center-center"
];
const tooltipPlacements = [
  "top",
  "bottom",
  "left",
  "right",
  "topLeft",
  "topRight",
  "bottomLeft",
  "bottomRight",
  "topLeftCorner",
  "topRightCorner"
];
const drawerTypes = [
  "right",
  "top-right",
  "bottom-right",
  "bottom-center",
  "left",
  "bottom-left",
  "top-left",
  "top-center"
];
const transitionTypes = [
  "fade",
  "scale",
  "slide",
  "rotate",
  "flip",
  "zoom",
  "slideInLeft",
  "slideInTopLeft",
  "slideInBottomLeft",
  "slideInTop",
  "slideInTopRight",
  "slideInRight",
  "slideInBottomRight",
  "slideInBottom",
  "fadeSlideInRight",
  "fadeSlideInLeft",
  "fadeSlideInTopLeft",
  "fadeSlideInBottomLeft",
  "fadeSlideInTop",
  "fadeSlideInTopRight",
  "fadeSlideInBottomRight",
  "fadeSlideInBottom"
];
const transitions = [
  "transition-300",
  "transition-400",
  "transition-500",
  "transition-600",
  "transition-700",
  "transition-800",
  "transition-900",
  "transition-1000",
  "transition-1100",
  "transition-1200",
  "transition-1300",
  "transition-1400",
  "transition-1500",
  "transition-1600",
  "transition-1700",
  "transition-1800",
  "transition-1900",
  "transition-2000"
];
const AnimationTypes = [
  "slideInX",
  "slideInY",
  "fadeIn",
  "fadeSlideUpperRight",
  "fadeSlideUpperLeft",
  "fadeSlideLowerRight",
  "fadeSlideLowerLeft",
  "flipUp",
  "flipDown",
  "flipRight",
  "flipLeft",
  "zoomIn",
  "zoomInUp",
  "zoomInDown",
  "zoomInLeft",
  "zoomInRight",
  "zoomOut",
  "zoomOutUp",
  "zoomOutDown",
  "zoomOutLeft",
  "zoomOutRight"
];
const SpinnerSmall = () => /* @__PURE__ */ jsx("div", { className: "spinner", "aria-label": "Loading", children: /* @__PURE__ */ jsx("style", { children: `
        .spinner,
        .spinner:after {
          border-radius: 50%;
          width: 1em;
          height: 1em;
        }
        .spinner {
          margin: 0 auto;
          font-size: 2vh;
          position: relative;
          text-indent: -9999em;
          border-top: 0.1em solid rgba(0,255,255, 0.4);
          border-right: 0.1em solid rgba(0,255,255, 0.4);
          border-bottom: 0.1em solid rgba(0,255,255, 0.4);
          border-left: 0.1em solid rgba(0,255,255, 1);
          transform: translateZ(0);
          animation: load8 1.1s infinite linear;
        }
        @keyframes load8 {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      ` }) });
function Tooltip({
  label,
  bg = "bg-col-400",
  color = "text-col-100 textShadow",
  w = "w-auto",
  children,
  placement = "bottomRight",
  border = "border-970-md",
  className = ""
}) {
  const [isHovered, setHovered] = useState(false);
  let placementStyles;
  switch (placement) {
    case "top":
      placementStyles = `bottom-full left-1/2 transform -translate-x-1/2`;
      break;
    case "bottom":
      placementStyles = `top-full left-1/2 transform -translate-x-1/2`;
      break;
    case "topLeftCorner":
      placementStyles = `right-full top-[0.1vh] transform -translate-y-1/2`;
      break;
    case "topRightCorner":
      placementStyles = `left-full top-[0.5vh] transform -translate-y-1/2`;
      break;
    case "left":
      placementStyles = `right-full top-1/2 transform -translate-y-1/2`;
      break;
    case "right":
      placementStyles = `left-full top-1/2 transform -translate-y-1/2`;
      break;
    case "topLeft":
      placementStyles = `bottom-full right-0`;
      break;
    case "topRight":
      placementStyles = `bottom-full left-0`;
      break;
    case "bottomLeft":
      placementStyles = `top-full right-0`;
      break;
    case "bottomRight":
      placementStyles = `top-full left-0`;
      break;
    default:
      placementStyles = "";
  }
  return /* @__PURE__ */ jsx("div", { className: `relative ${className}`, children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: `relative inline-block ${className}`,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onClick: () => setHovered(false),
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          setHovered(false);
        }
      },
      tabIndex: 0,
      role: "button",
      children: [
        children,
        isHovered && label && /* @__PURE__ */ jsx(
          "div",
          {
            className: `absolute ${placementStyles} py-[0.1vh]`,
            onMouseLeave: () => setHovered(false),
            children: /* @__PURE__ */ jsx(Transition, { className: "rounded-sm", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: `text-sm-tight justify-center py-[0.3vh] px-[0.8vh] z-30 font-semibold shadowNarrowNormal whitespace-nowrap rounded-sm ${border} ${w} ${bg} ${color}`,
                children: label
              }
            ) })
          }
        )
      ]
    }
  ) });
}
function IconButton({
  icon,
  containerClassName,
  iconClassName,
  onClick,
  ref,
  htmlType = "button",
  isLoading,
  isDisabled,
  type = "normal",
  tooltipPlacement,
  label,
  to
}) {
  const buttonClass = type === "normal" ? "normalButtonStyles" : type === "smallNormal" ? "smallButtonStyles" : type === "negative" ? "negativeButtonStyles" : type === "smallNegative" ? "smallNegativeButtonStyles" : type === "unstyled" ? "unstyledButtonStyles" : "smallUnstyledButtonStyles";
  const displayIconSize = type === "normal" ? "text-[2.5vh]" : type === "smallNormal" ? "text-[1.6vh]" : type === "negative" ? "text-[2.5vh] " : type === "smallNegative" ? "text-[1.6vh]" : type === "unstyled" ? "" : type === "smallUnstyled" ? "" : "text-[1.6vh]";
  const iconButtonSize = type === "normal" ? "w-[3.5vh] h-[3.5vh]" : type === "smallNormal" ? "w-[3vh] h-[3vh]" : type === "negative" ? " w-[3.5vh] h-[3.5vh]" : type === "smallNegative" ? "w-[3vh] h-[3vh]" : type === "unstyled" ? "" : type === "smallUnstyled" ? "" : "text-[2vh] w-[3vh] h-[3vh]";
  function ButtonInsides() {
    return /* @__PURE__ */ jsx(Tooltip, { label, placement: tooltipPlacement, children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick,
        disabled: isDisabled,
        type: htmlType,
        ref,
        children: /* @__PURE__ */ jsx(
          Flex,
          {
            className: `${iconButtonSize} ${buttonClass} ${containerClassName}`,
            children: isLoading ? /* @__PURE__ */ jsx(SpinnerSmall, {}) : /* @__PURE__ */ jsx(
              Icon,
              {
                icon,
                iconClassName: `${displayIconSize} ${iconClassName}`,
                containerClassName: `flex w-full h-full justify-center items-center`
              }
            )
          }
        )
      }
    ) });
  }
  return /* @__PURE__ */ jsx(Fragment, { children: to ? /* @__PURE__ */ jsx(NavLink, { to, children: /* @__PURE__ */ jsx(ButtonInsides, {}) }) : /* @__PURE__ */ jsx(ButtonInsides, {}) });
}
const Box = React.forwardRef(
  ({
    children,
    onClick,
    onKeyDown,
    style = {},
    className = "",
    onMouseEnter,
    onMouseLeave
  }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        role: "button",
        tabIndex: 0,
        className: ` ${className}`,
        style: { ...style },
        onClick,
        onKeyDown,
        onMouseEnter,
        onMouseLeave,
        ref,
        children
      }
    );
  }
);
Box.displayName = "Box";
const borderList = [
  "border-100-sm",
  "border-100-md",
  "border-100-lg",
  "border-100-xl",
  "border-190-sm",
  "border-190-md",
  "border-190-lg",
  "border-190-xl",
  "border-180-sm",
  "border-180-md",
  "border-180-lg",
  "border-180-xl",
  "border-170-sm",
  "border-170-md",
  "border-170-lg",
  "border-170-xl",
  "border-160-sm",
  "border-160-md",
  "border-160-lg",
  "border-160-xl",
  "border-150-sm",
  "border-150-md",
  "border-150-lg",
  "border-150-xl",
  "border-200-sm",
  "border-200-md",
  "border-200-lg",
  "border-200-xl",
  "border-290-sm",
  "border-290-md",
  "border-290-lg",
  "border-290-xl",
  "border-280-sm",
  "border-280-md",
  "border-280-lg",
  "border-280-xl",
  "border-270-sm",
  "border-270-md",
  "border-270-lg",
  "border-270-xl",
  "border-260-sm",
  "border-260-md",
  "border-260-lg",
  "border-260-xl",
  "border-250-sm",
  "border-250-md",
  "border-250-lg",
  "border-250-xl",
  "border-300-sm",
  "border-300-md",
  "border-300-lg",
  "border-300-xl",
  "border-390-sm",
  "border-390-md",
  "border-390-lg",
  "border-390-xl",
  "border-380-sm",
  "border-380-md",
  "border-380-lg",
  "border-380-xl",
  "border-370-sm",
  "border-370-md",
  "border-370-lg",
  "border-370-xl",
  "border-360-sm",
  "border-360-md",
  "border-360-lg",
  "border-360-xl",
  "border-350-sm",
  "border-350-md",
  "border-350-lg",
  "border-350-xl",
  "border-400-sm",
  "border-400-md",
  "border-400-lg",
  "border-400-xl",
  "border-490-sm",
  "border-490-md",
  "border-490-lg",
  "border-490-xl",
  "border-480-sm",
  "border-480-md",
  "border-480-lg",
  "border-480-xl",
  "border-470-sm",
  "border-470-md",
  "border-470-lg",
  "border-470-xl",
  "border-460-sm",
  "border-460-md",
  "border-460-lg",
  "border-460-xl",
  "border-450-sm",
  "border-450-md",
  "border-450-lg",
  "border-450-xl",
  "border-500-sm",
  "border-500-md",
  "border-500-lg",
  "border-500-xl",
  "border-590-sm",
  "border-590-md",
  "border-590-lg",
  "border-590-xl",
  "border-580-sm",
  "border-580-md",
  "border-580-lg",
  "border-580-xl",
  "border-570-sm",
  "border-570-md",
  "border-570-lg",
  "border-570-xl",
  "border-560-sm",
  "border-560-md",
  "border-560-lg",
  "border-560-xl",
  "border-550-sm",
  "border-550-md",
  "border-550-lg",
  "border-550-xl",
  "border-600-sm",
  "border-600-md",
  "border-600-lg",
  "border-600-xl",
  "border-690-sm",
  "border-690-md",
  "border-690-lg",
  "border-690-xl",
  "border-680-sm",
  "border-680-md",
  "border-680-lg",
  "border-680-xl",
  "border-670-sm",
  "border-670-md",
  "border-670-lg",
  "border-670-xl",
  "border-660-sm",
  "border-660-md",
  "border-660-lg",
  "border-660-xl",
  "border-650-sm",
  "border-650-md",
  "border-650-lg",
  "border-650-xl",
  "border-700-sm",
  "border-700-md",
  "border-700-lg",
  "border-700-xl",
  "border-790-sm",
  "border-790-md",
  "border-790-lg",
  "border-790-xl",
  "border-780-sm",
  "border-780-md",
  "border-780-lg",
  "border-780-xl",
  "border-770-sm",
  "border-770-md",
  "border-770-lg",
  "border-770-xl",
  "border-760-sm",
  "border-760-md",
  "border-760-lg",
  "border-760-xl",
  "border-750-sm",
  "border-750-md",
  "border-750-lg",
  "border-750-xl",
  "border-800-sm",
  "border-800-md",
  "border-800-lg",
  "border-800-xl",
  "border-890-sm",
  "border-890-md",
  "border-890-lg",
  "border-890-xl",
  "border-880-sm",
  "border-880-md",
  "border-880-lg",
  "border-880-xl",
  "border-870-sm",
  "border-870-md",
  "border-870-lg",
  "border-870-xl",
  "border-860-sm",
  "border-860-md",
  "border-860-lg",
  "border-860-xl",
  "border-850-sm",
  "border-850-md",
  "border-850-lg",
  "border-850-xl",
  "border-900-sm",
  "border-900-md",
  "border-900-lg",
  "border-900-xl",
  "border-990-sm",
  "border-990-md",
  "border-990-lg",
  "border-990-xl",
  "border-980-sm",
  "border-980-md",
  "border-980-lg",
  "border-980-xl",
  "border-970-sm",
  "border-970-md",
  "border-970-lg",
  "border-970-xl",
  "border-960-sm",
  "border-960-md",
  "border-960-lg",
  "border-960-xl",
  "border-950-sm",
  "border-950-md",
  "border-950-lg",
  "border-950-xl"
];
function BorderExamples({
  startIndex = 0,
  endIndex = 10,
  textColor = "text-col-100"
}) {
  const filteredColorKeys = borderList.slice(startIndex, endIndex + 1);
  return /* @__PURE__ */ jsx(Fragment, { children: filteredColorKeys.map((border) => /* @__PURE__ */ jsx(
    StyleExampleBox,
    {
      className: `${border} ${textColor}`,
      text: `className='${border}'`
    },
    border
  )) });
}
function TransformBg({ value }) {
  const parts = value.split(" ");
  const background = parts[0].replace("bg-col-", "bg-");
  const gradient = parts[1].replace("bg-", "");
  const backgroundCombo = String(`${background}-${gradient}`);
  return backgroundCombo;
}
const imageFallback = "";
const defaultAvatar = "/fallbackAvatar.png";
const DateTimePickerStyles = `text-md text-col-100 absolute mt-[1vh] p-[1.5vh] w-[25vh] px-[1.5vh] py-[0.5vh] justify-center items-center textShadow bg-col-700 shadowNarrowNormal`;
const DateTimePickerLabelStyles = `text-col-200 font-semibold`;
const CloseIcon = IoCloseCircleOutline;
const ClockIcon = GiAlarmClock;
const CalendarIcon = BsCalendar3;
const ArrowLeftIcon = RiArrowLeftSFill;
const ArrowRightIcon = RiArrowRightSFill;
const ReturnPathIcon = IoReturnUpBackOutline;
const HomeIcon = IoHomeOutline;
function Image({
  src,
  fallbackImage = imageFallback,
  alt,
  objectFit = "cover",
  pos,
  t,
  b,
  l,
  r,
  zIndex,
  borderRadius,
  shadow = "none",
  rounded,
  className,
  ...props
}) {
  const imageStyle = {
    objectFit,
    position: pos,
    top: t,
    bottom: b,
    left: l,
    right: r,
    zIndex,
    borderRadius,
    boxShadow: shadow
  };
  const [imgSrc, setImgSrc] = useState(src);
  const handleError = () => {
    setImgSrc(fallbackImage);
  };
  return /* @__PURE__ */ jsx(
    "img",
    {
      src: imgSrc,
      alt,
      onError: handleError,
      style: imageStyle,
      ...props,
      className: `${objectFit} ${rounded} ${shadow} ${className}`
    }
  );
}
function Heading({
  text,
  layout = "text-md-normal",
  noOfLines = 1,
  shadow = "boldTextGlow",
  className,
  isCursive = true,
  color = "text-col-900"
}) {
  const style = {};
  if (noOfLines) {
    style.overflow = "hidden";
    style.textOverflow = "ellipsis";
    style.display = "-webkit-box";
    style.WebkitLineClamp = noOfLines;
    style.WebkitBoxOrient = "vertical";
  }
  const textClassName = isCursive ? `font-cursive ${layout} ${color} ${shadow} ${className}` : `${layout} ${color} ${shadow} ${className}`;
  return /* @__PURE__ */ jsx("h1", { className: `${layout} ${shadow} ${textClassName}`, style, children: text });
}
const sizeClasses = {
  xs: "w-full h-1/3 md:w-64 md:h-1/2",
  sm: "w-full h-1/2 md:w-1/2 md:h-1/2 lg:w-1/3 lg:h-1/3 xl:w-[28vw] xl:h-[28vh]",
  md: "w-full h-1/2 md:w-1/3 md:h-45vh",
  lg: "w-full h-2/3 md:w-1/2 md:h-2/3",
  xl: "w-full h-5/6 md:w-2/3 md:h-2/3",
  full: "w-full h-full"
};
function Alert({
  isAlertOpen,
  onClose,
  onConfirmClick,
  cancelRef,
  title,
  body,
  confirmButtonText,
  cancelButtonText,
  flexDirection = "flex-col",
  size,
  bodyWidth = "w-[30vh]",
  bodyTextSize = "text-[3vh]",
  bodyClassName = "",
  alertDimensions,
  className,
  alertImage,
  imageClassName = "w-75% h-auto sm:w-60%"
}) {
  const sizeClass = size ? sizeClasses[size] || void 0 : "";
  if (!isAlertOpen)
    return null;
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: { y: "0", opacity: 1, transition: { delay: 0.5 } }
  };
  const modalExitVariants = {
    exit: { y: "-100vh", opacity: 0, transition: { duration: 0.5 } }
  };
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: `fixed inset-0 overflow-hidden defaultOverlayBlur defaultOverlayColor flex justify-center items-center rounded-none`,
      variants: backdropVariants,
      initial: "hidden",
      animate: "visible",
      exit: "hidden",
      style: { zIndex: 1e3 },
      children: /* @__PURE__ */ jsx(
        motion.div,
        {
          className: `bg-radial4 shadowNarrowNormal ${sizeClass} ${alertDimensions} ${className}`,
          variants: { ...modalVariants, ...modalExitVariants },
          initial: "hidden",
          animate: "visible",
          exit: "exit",
          children: /* @__PURE__ */ jsxs(VStack, { className: "w-full h-full justify-between ", children: [
            /* @__PURE__ */ jsx(HStack, { className: "w-full items-center bg-col-990 rounded-b-none p-[1vh] gap-2 md:gap-[1vw]", children: /* @__PURE__ */ jsx(
              Heading,
              {
                color: "text-col-400",
                shadow: "textFog",
                text: title,
                layout: "text-insane-normal"
              }
            ) }),
            /* @__PURE__ */ jsx(
              HStack,
              {
                className: `w-full h-full justify-between text-col-900 `,
                gap: "gap-[0px]",
                children: /* @__PURE__ */ jsxs(VStackFull, { className: "h-full justify-center p-[1vh] items-center", children: [
                  /* @__PURE__ */ jsxs(
                    Flex,
                    {
                      className: `w-full h-full justify-center items-center flex-grow-1 gap-[1vh] ${bodyWidth} ${flexDirection} ${bodyClassName} `,
                      children: [
                        alertImage && /* @__PURE__ */ jsx(Box, { className: imageClassName, children: /* @__PURE__ */ jsx(
                          Image,
                          {
                            src: alertImage,
                            alt: "alert image",
                            className: "w-full h-full"
                          }
                        ) }),
                        /* @__PURE__ */ jsx(Text, { className: `${bodyTextSize} lightTextShadow`, children: body })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(HStack, { className: "justify-end gap-[2vw] p-[1vh]", children: [
                    /* @__PURE__ */ jsx(
                      Button,
                      {
                        ref: cancelRef,
                        onClick: onClose,
                        buttonText: cancelButtonText
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      Button,
                      {
                        onClick: onConfirmClick,
                        type: "negative",
                        buttonText: confirmButtonText
                      }
                    )
                  ] })
                ] })
              }
            )
          ] })
        }
      )
    }
  );
}
const Avatar = ({
  name,
  rounded = "rounded-full",
  src = "/images/icons/profileIcon.png",
  size
}) => {
  const getInitials = (name2) => {
    return name2.split(" ").map((word) => word[0]).join("");
  };
  const sizeClasses2 = {
    xxs: "h-[2.5vh] w-[2.5vh]",
    xs: "h-[3.5vh] w-[3.5vh]",
    sm: "h-[3.75vh] w-[3.75vh]",
    md: "h-[4vh] w-[4vh]",
    lg: "h-[5vh] w-[5vh]",
    xl: "h-[6.5vh] w-[6.5vh]",
    xxl: "h-[7vh] w-[7vh]"
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `${rounded} overflow-hidden flex-shrink-0 ${sizeClasses2[size || "sm"]} border-[1.5px] border-solid border-col-400 shadowNarrowNormal flex items-center justify-center text-col-400 bg-col-900`,
      children: src ? /* @__PURE__ */ jsx(
        Image,
        {
          src: src || "/fallbackAvatar.png",
          alt: name || "",
          fallbackImage: defaultAvatar,
          rounded
        }
      ) : /* @__PURE__ */ jsx("span", { className: "text-col-100", children: name ? getInitials(name) : "N/A" })
    }
  );
};
function BackgroundImageContainer({
  image,
  containerClassName = "",
  imageClassName = "",
  alt = "",
  style = {},
  w = "w-full",
  h = "h-full",
  objectFit = "cover",
  objectPosition = "object-center",
  innerContainerStyles = "",
  shadow = "shadowNarrowNormal",
  showOverlay = true,
  bgOverlayColor = "bg-col-920",
  bgOverlayGradient = "bg-darkenPurpleGrad",
  overlayBlur = "backdrop-blur-[2px]",
  overlayStyles,
  children,
  rounded,
  p = "p-[1vh]"
}) {
  return /* @__PURE__ */ jsxs(
    Box,
    {
      className: `relative ${w} ${h} ${shadow} ${containerClassName} ${rounded}`,
      style,
      children: [
        /* @__PURE__ */ jsx(
          Image,
          {
            src: image ? image : imageFallback,
            alt,
            className: `${objectFit} ${objectPosition} w-full h-full ${rounded} ${imageClassName}`
          }
        ),
        showOverlay && /* @__PURE__ */ jsx(
          Flex,
          {
            className: `absolute top-0 left-0 w-full h-full ${overlayBlur} ${rounded} ${bgOverlayColor} ${bgOverlayGradient} ${p} ${overlayStyles} `,
            children: /* @__PURE__ */ jsx(Flex, { className: `w-full h-full ${innerContainerStyles}`, children })
          }
        )
      ]
    }
  );
}
function Badge({
  className = "",
  style,
  rounded = "md",
  label,
  bgColor = "bg-col-300",
  textColor = "text-col-900 lightTextShadow",
  ...props
}) {
  const baseClasses = `px-[1vh] py-[0.1vh] text-xs-tight font-semibold`;
  const badgeClasses = `shadowNarrowNormal ${baseClasses} ${rounded}  ${bgColor} ${textColor} ${className}`;
  return /* @__PURE__ */ jsx("div", { className: badgeClasses, style, ...props, children: /* @__PURE__ */ jsx(Text, { children: label == null ? void 0 : label.toUpperCase() }) });
}
function Checkbox({
  label,
  isDisabled = false,
  isChecked = false,
  onChange,
  checkboxSize = "text-[3vh]",
  textSize = "text-[1.7vh]",
  textColor = "text-col-900",
  bgColor = "transparent",
  checkedBg = "bg-col-950 insetShadowMd hover:insetShadowLg",
  checkedColor = "text-col-100",
  hoveredBg = `hover:cursor-pointer ${isChecked ? "checkedBg" : "hover:bg-transparent"} transition duration-300 ease-in-out`,
  hoveredColor = "hover:text-col-900 transition-300",
  disabledBg = "bg-col-850 hover:bg-col-860 transition-300",
  disabledColor = "text-col-160 hover:text-col-180",
  p = "pl-[0.5vh] pr-[0.2vh] py-[0px]",
  className = "",
  containerWidth = "w-full",
  onDisabledClick
}) {
  const [checked, setIsChecked] = useState(isChecked);
  const [isHovered, setIsHovered] = useState(false);
  const handleCheckboxChange = () => {
    if (!isDisabled) {
      setIsChecked(!checked);
      onChange && onChange();
    }
  };
  let backgroundColor = bgColor;
  let textColorClass = textColor;
  let boxShadowClass = "";
  if (isDisabled) {
    backgroundColor = disabledBg;
    textColorClass = disabledColor;
    boxShadowClass = "shadow-inset";
  } else if (checked) {
    backgroundColor = checkedBg;
    textColorClass = checkedColor;
    boxShadowClass = "shadowNarrowNormal";
  } else if (isHovered) {
    backgroundColor = hoveredBg;
    textColorClass = hoveredColor;
  }
  return /* @__PURE__ */ jsxs(
    HStack,
    {
      className: `items-center  gap-[0.5vh] ${p} ${backgroundColor} ${textColorClass} ${boxShadowClass} ${containerWidth} ${className}`,
      onMouseEnter: () => !isDisabled && setIsHovered(true),
      onMouseLeave: () => !isDisabled && setIsHovered(false),
      onClick: isDisabled ? onDisabledClick : handleCheckboxChange,
      children: [
        /* @__PURE__ */ jsx(Box, { className: checkboxSize, children: checked ? /* @__PURE__ */ jsx(MdCheckBox, {}) : /* @__PURE__ */ jsx(MdOutlineCheckBoxOutlineBlank, {}) }),
        /* @__PURE__ */ jsx(Text, { className: textSize, children: label })
      ]
    }
  );
}
const Portal = ({ children }) => {
  const containerRef = useRef(null);
  useEffect(() => {
    if (typeof document !== "undefined") {
      const container = document.createElement("div");
      containerRef.current = container;
      const portalRoot = document.getElementById("modal-root") || document.body;
      portalRoot.appendChild(container);
      return () => {
        if (containerRef.current) {
          portalRoot.removeChild(containerRef.current);
        }
      };
    }
  }, []);
  if (typeof document === "undefined" || !containerRef.current) {
    return null;
  }
  return ReactDOM.createPortal(children, containerRef.current);
};
const Portal$1 = Portal;
const useEscapeKey = (onEscape) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        onEscape();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onEscape]);
};
const useEscapeKey$1 = useEscapeKey;
function CloseButton({
  onClose,
  className,
  iconClassName = "text-[2.5vh]",
  type = "smallNormal"
}) {
  return /* @__PURE__ */ jsx(
    IconButton,
    {
      label: "close",
      icon: CloseIcon,
      type,
      onClick: (event) => {
        event.preventDefault();
        event.stopPropagation();
        onClose();
      },
      containerClassName: `z-10 ${className}`,
      tooltipPlacement: "left",
      iconClassName
    }
  );
}
function CloseTextButton({
  onClose,
  className,
  type
}) {
  return /* @__PURE__ */ jsx(
    Button,
    {
      onClick: (event) => {
        event.preventDefault();
        event.stopPropagation();
        onClose();
      },
      type,
      className: `${className}`,
      buttonText: "Close"
    }
  );
}
function DrawerContent({
  showTopButton,
  showBottomButton,
  drawerBg,
  setDrawerOpen,
  children
}) {
  const bottomPadding = showBottomButton ? "pb-[6vh]" : "pb-0";
  return /* @__PURE__ */ jsxs(Flex, { className: "w-full h-full relative", children: [
    showTopButton && /* @__PURE__ */ jsx(Box, { className: "absolute top-[1vh] right-[1vh]", children: /* @__PURE__ */ jsx(CloseButton, { onClose: () => setDrawerOpen(false) }) }),
    showBottomButton && /* @__PURE__ */ jsx(Flex, { className: "w-full h-[6vh] bg-darkGrayBack rounded-t-none border-t-2 border-col-850 justify-center fixed bottom-0 left-0 items-center", children: /* @__PURE__ */ jsx(CloseTextButton, { onClose: () => setDrawerOpen(false) }) }),
    /* @__PURE__ */ jsx(Flex, { className: `w-full h-full ${bottomPadding} ${drawerBg}`, children })
  ] });
}
function DrawerWithButton({
  className = "",
  buttonType,
  slideDirection = "right",
  style = {},
  children,
  icon: Icon2,
  label,
  showBottomButton = true,
  showTopButton = true,
  drawerWidth = "w-[400px] ultraHD:w-[800px]",
  drawerBg = "bg-col-700",
  drawerHeight = "h-full",
  overlayBlur = "defaultOverlayBlur",
  overlayColor = "defaultOverlay",
  buttonTooltipPlacement = "bottomRight",
  ...props
}) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const variants = {
    open: (direction) => {
      const transition = { type: "spring", stiffness: 300, damping: 30 };
      const baseVariant = { transition, x: 0, y: 0 };
      switch (direction) {
        case "top-right":
        case "top-left":
        case "top-center":
          return { ...baseVariant, y: 0 };
        case "bottom-right":
        case "bottom-left":
        case "bottom-center":
          return { ...baseVariant, y: 0 };
        case "left":
          return { ...baseVariant, x: 0 };
        case "right":
          return { ...baseVariant, x: 0 };
        default:
          return { ...baseVariant, x: 0 };
      }
    },
    closed: (direction) => {
      const transition = { type: "spring", stiffness: 300, damping: 30 };
      switch (direction) {
        case "top-right":
        case "top-left":
        case "top-center":
          return { x: void 0, y: "-100%", transition };
        case "bottom-right":
        case "bottom-left":
        case "bottom-center":
          return { x: void 0, y: "100%", transition };
        case "left":
          return { x: "-100%", y: void 0, transition };
        case "right":
          return { x: "100%", y: void 0, transition };
        default:
          return { x: "100%", y: void 0, transition };
      }
    }
  };
  const drawerPositionClass = (direction) => {
    switch (direction) {
      case "top-right":
        return "top-0 right-0";
      case "top-left":
        return "top-0 left-0";
      case "top-center":
        return "top-0 left-1/2 -translate-x-1/2";
      case "bottom-right":
        return "bottom-0 right-0";
      case "bottom-left":
        return "bottom-0 left-0";
      case "bottom-center":
        return "bottom-0 left-1/2 -translate-x-1/2";
      case "left":
        return "left-0 top-0 -translate-y-1/2";
      case "right":
        return "right-0 top-0 -translate-y-1/2";
      default:
        return "top-0 right-0";
    }
  };
  useEscapeKey$1(() => setDrawerOpen(false));
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    Icon2 && /* @__PURE__ */ jsx(
      IconButton,
      {
        icon: Icon2,
        label,
        onClick: () => setDrawerOpen(true),
        type: buttonType,
        tooltipPlacement: buttonTooltipPlacement
      }
    ),
    /* @__PURE__ */ jsx(Portal$1, { children: /* @__PURE__ */ jsx(AnimatePresence, { children: isDrawerOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: `fixed inset-0 ${overlayColor} ${overlayBlur} z-40`,
          onClick: () => setDrawerOpen(false),
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: `fixed ${drawerPositionClass(
            slideDirection
          )} shadowNarrowNormal z-50 ${drawerHeight} ${className} ${drawerWidth}`,
          style,
          variants,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 30
          },
          custom: slideDirection,
          initial: "closed",
          animate: "open",
          exit: "closed",
          ...props,
          children: /* @__PURE__ */ jsx(
            DrawerContent,
            {
              showTopButton,
              showBottomButton,
              setDrawerOpen,
              drawerBg,
              children
            }
          )
        }
      )
    ] }) }) })
  ] });
}
function HStackFull({
  children,
  className,
  gap,
  onClick
}) {
  return /* @__PURE__ */ jsx(HStack, { className: `w-full ${gap} ${className}`, onClick, children });
}
const Input = React.forwardRef(
  ({ className = "", style, defaultValue, autoFocus = false, ...props }, ref) => {
    return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
      "input",
      {
        defaultValue,
        autoFocus,
        ref,
        className: `inputStyles ${className}`,
        style,
        ...props
      }
    ) });
  }
);
Input.displayName = "Input";
const Input$1 = Input;
const Calendar = ({ selectedDate, onSelect }) => {
  const startDay = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();
  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  const days = weekDays.map((day, index) => /* @__PURE__ */ jsx(
    "div",
    {
      className: "p-[0.1vh] text-center font-semibold text-col-300 w-[3vh] h-[2.5vh] flex-shrink-0 flex justify-center items-center",
      children: day
    },
    index
  ));
  for (let i = 0; i < startDay; i++) {
    days.push(
      /* @__PURE__ */ jsx("div", { className: "p-2 border border-transparent" }, `empty-${i}`)
    );
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      day
    );
    const isPast = dayDate < today;
    days.push(
      /* @__PURE__ */ jsx(Flex, { className: "w-[2.3vh] md:w-[3vh] md:h-[2.5vh] flex-shrink-0 flex justify-center items-center", children: /* @__PURE__ */ jsx(
        "button",
        {
          disabled: isPast,
          className: `py-[0.1vh] px-[0.4vh] w-full h-full text-center flex justify-center  ${isPast ? "text-col-140 hover:bg-transparent cursor-not-allowed" : "hover:bg-col-200 hover:text-col-900 hover:shadowNarrowNormal"}`,
          onClick: () => !isPast && onSelect(dayDate),
          children: day
        },
        day
      ) })
    );
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `w-[24vh] grid grid-cols-7 gap-y-[0.7vh] gap-x-[1.5vh] px-[1.5vh] justify-center items-center textShadow`,
      children: days
    }
  );
};
function DatePicker({
  isEditDate,
  setIsEditDate,
  setIsEditTime,
  dueDate
}) {
  const [selectedDate, setSelectedDate] = useState(dueDate);
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsEditDate(false);
  };
  const goToNextMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
    );
  };
  const goToPreviousMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
    );
  };
  const monthYearFormat = selectedDate.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });
  const goToToday = () => {
    setSelectedDate(/* @__PURE__ */ new Date());
    setIsEditDate(false);
  };
  useEscapeKey$1(() => setIsEditDate(false));
  const zIndex = isEditDate ? "z-20" : "z-0";
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs(Box, { className: "relative", children: [
      /* @__PURE__ */ jsx(
        Icon,
        {
          icon: CalendarIcon,
          containerClassName: "absolute top-[0.8vh] right-[1.1vh] text-col-900 hover:cursor-pointer",
          iconClassName: "text-[2.3vh]",
          onClick: () => {
            setIsEditDate(!isEditDate);
            setIsEditTime(false);
          }
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          readOnly: true,
          value: selectedDate.toISOString().substring(0, 10),
          className: `form-input w-[18vh] lg:w-[25vh] font-semibold inputStyles cursor-pointer`,
          onClick: () => {
            setIsEditDate(!isEditDate);
            setIsEditTime(false);
          }
        }
      )
    ] }),
    isEditDate && /* @__PURE__ */ jsx(Transition, { children: /* @__PURE__ */ jsxs(VStack, { className: `${DateTimePickerStyles} left-0 ${zIndex}`, children: [
      /* @__PURE__ */ jsxs(FlexFull, { className: "justify-between mb-[0.5vh] items-center", children: [
        /* @__PURE__ */ jsx(
          IconButton,
          {
            type: "smallNormal",
            icon: ArrowLeftIcon,
            onClick: goToPreviousMonth
          }
        ),
        /* @__PURE__ */ jsx(Text, { className: `${DateTimePickerLabelStyles}`, children: monthYearFormat }),
        /* @__PURE__ */ jsx(
          IconButton,
          {
            type: "smallNormal",
            icon: ArrowRightIcon,
            onClick: goToNextMonth
          }
        )
      ] }),
      /* @__PURE__ */ jsx(Calendar, { selectedDate, onSelect: handleDateSelect }),
      /* @__PURE__ */ jsxs(HStackFull, { className: "justify-between", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "unstyled",
            onClick: goToToday,
            className: `text-[1.6vh] leading-[1.6vh] h-[2.5vh] px-[0.5vh] bg-col-700 hover:bg-col-600 flex items-center shadowNarrowNormal textShadowtransition-400`,
            buttonText: "Today"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "smallNormal",
            onClick: () => setIsEditDate(false),
            iconLeft: CloseIcon,
            buttonText: "Close"
          }
        )
      ] })
    ] }) })
  ] });
}
const ScrollableSelector = ({
  items,
  onSelect,
  selectedItem,
  label
}) => {
  return /* @__PURE__ */ jsxs(VStack, { className: "w-35%", gap: "gap-[0.5vh]", children: [
    /* @__PURE__ */ jsx(Text, { className: `${DateTimePickerLabelStyles}`, children: label }),
    /* @__PURE__ */ jsx(
      VStackFull,
      {
        className: `overflow-auto h-[23vh] max-h-[25vh] py-[1vh] items-start insetShadowMd bg-100-diagonal3op75`,
        gap: "gap-[0.7vh]",
        children: items.map((item) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => onSelect(item),
            className: ` px-[0.4vh] ${item === selectedItem ? "bg-col-200 text-col-900 transition-300" : "hover:bg-col-200 hover:text-col-900"}`,
            children: String(item < 10 ? `0${item}` : item)
          },
          item
        ))
      }
    )
  ] });
};
const TimePicker = ({
  selectedTime,
  onSelectTime,
  isEditTime,
  setIsEditDate,
  setIsEditTime
}) => {
  const [hour, setHour] = useState(selectedTime.getHours());
  const [minute, setMinute] = useState(selectedTime.getMinutes());
  const [isPM, setIsPM] = useState(selectedTime.getHours() >= 12);
  const zIndex = isEditTime ? "z-20" : "";
  useEffect(() => {
    const newTime = new Date(selectedTime);
    newTime.setHours(isPM ? hour + 12 : hour, minute);
    onSelectTime(newTime);
  }, [hour, minute, isPM, onSelectTime, selectedTime]);
  const toggleAmPm = () => setIsPM(!isPM);
  useEscapeKey$1(() => setIsEditTime(false));
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs(Box, { className: "relative", children: [
      /* @__PURE__ */ jsx(
        Icon,
        {
          icon: ClockIcon,
          containerClassName: "absolute top-[0.8vh] right-[1.1vh] text-col-900 hover:cursor-pointer",
          onClick: () => {
            setIsEditTime(!isEditTime);
            setIsEditDate(false);
          }
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          readOnly: true,
          value: `${hour % 12 === 0 ? 12 : hour % 12}:${minute < 10 ? `0${minute}` : minute} ${isPM ? "PM" : "AM"}`,
          className: `form-input inputStyles font-semibold w-[18vh] lg:w-[25vh] cursor-pointer`,
          onClick: () => {
            setIsEditTime(!isEditTime);
            setIsEditDate(false);
          }
        }
      )
    ] }),
    isEditTime && /* @__PURE__ */ jsx(Transition, { children: /* @__PURE__ */ jsx(VStack, { className: `${DateTimePickerStyles} right-0 ${zIndex}`, children: /* @__PURE__ */ jsxs(HStackFull, { className: "justify-evenly items-stretch", children: [
      /* @__PURE__ */ jsx(
        ScrollableSelector,
        {
          label: "hour",
          items: Array.from({ length: 12 }, (_, i) => i + 1),
          onSelect: setHour,
          selectedItem: hour % 12 === 0 ? 12 : hour % 12
        }
      ),
      /* @__PURE__ */ jsx(
        ScrollableSelector,
        {
          label: "min",
          items: Array.from({ length: 60 }, (_, i) => i),
          onSelect: setMinute,
          selectedItem: minute
        }
      ),
      /* @__PURE__ */ jsxs(VStack, { className: "w-20% pt-[4.5vh] pl-[1vh] h-[27vh] justify-between items-end", children: [
        /* @__PURE__ */ jsxs(VStack, { className: "pr-[1.5vh]", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: toggleAmPm,
              className: `w-full px-[0.7vh] ${isPM ? "bg-transparent text-col-100 hover:bg-col-200 hover:text-col-900 transition-300" : "bg-col-200 text-col-900 hover:bg-col-200 hover:text-col-900"}`,
              children: "am"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: toggleAmPm,
              className: `w-full px-[0.5vh] ${!isPM ? "bg-transparent text-col-100 hover:bg-col-200 hover:text-col-900 transition-300" : "bg-col-200 text-col-900 hover:bg-col-200 hover:text-col-900"}`,
              children: "pm"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          CloseButton,
          {
            type: "smallNormal",
            onClose: () => setIsEditTime(false)
          }
        )
      ] })
    ] }) }) })
  ] });
};
const TimePicker$1 = TimePicker;
function InputDateTime({
  dueDate,
  containerHeight
}) {
  const [isEditDate, setIsEditDate] = useState(false);
  const [isEditTime, setIsEditTime] = useState(false);
  const height = containerHeight ? containerHeight : isEditDate || isEditTime ? "min-h-[38vh]" : "";
  return /* @__PURE__ */ jsxs(HStackFull, { className: `justify-evenly ${height}`, children: [
    /* @__PURE__ */ jsx(
      DatePicker,
      {
        isEditDate,
        setIsEditDate,
        setIsEditTime,
        dueDate: dueDate ? dueDate : /* @__PURE__ */ new Date()
      }
    ),
    /* @__PURE__ */ jsx(
      TimePicker$1,
      {
        selectedTime: /* @__PURE__ */ new Date(),
        onSelectTime: () => {
        },
        setIsEditDate,
        isEditTime,
        setIsEditTime
      }
    )
  ] });
}
function ValidatedInput({
  defaultValue = "",
  min = 3,
  max,
  autoFocus = false,
  isRequired = false,
  name = "",
  id = "",
  placeholder = ""
}) {
  const [inputValue, setInputValue] = useState(defaultValue);
  const isInvalid = inputValue.length < min || inputValue.length > max;
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };
  const fieldTooShort = inputValue.length < min;
  const fieldTooLong = inputValue.length > max;
  return /* @__PURE__ */ jsxs(VStack, { className: "w-full flex flex-col space-y-0", gap: "gap-[0.5vh]", children: [
    /* @__PURE__ */ jsx(
      Input$1,
      {
        autoFocus,
        value: inputValue,
        type: "text",
        name,
        id,
        onChange: handleInputChange,
        placeholder,
        required: isRequired
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `flex space-x-1 w-full pl-[0.5vh] text-xs-tight lightTextShadow font-semibold`,
        children: [
          /* @__PURE__ */ jsxs("span", { children: [
            inputValue.length,
            " / ",
            max,
            " chars -"
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            isInvalid && fieldTooLong && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("span", { className: "text-red-700", children: "input is too long" }) }),
            isInvalid && fieldTooShort && /* @__PURE__ */ jsxs("span", { children: [
              " min ",
              min,
              " chars."
            ] }),
            !isInvalid && /* @__PURE__ */ jsx("span", { children: "validated input" })
          ] })
        ]
      }
    )
  ] });
}
function InputVStack({
  labelColor,
  labelSize = "normal",
  labelIsCursive = true,
  labelClassName,
  autoFocus = false,
  validationMin,
  validationMax,
  isRequired,
  label,
  style,
  className,
  isValidated,
  name,
  placeholder,
  value,
  defaultValue,
  labelShadow,
  type,
  onChange
}) {
  return /* @__PURE__ */ jsxs(
    VStack,
    {
      className: ` leading-1rem w-full ${className}`,
      align: "start",
      style,
      gap: "gap-[0.5vh]",
      children: [
        labelSize === "small" ? /* @__PURE__ */ jsx(
          Heading,
          {
            isCursive: labelIsCursive,
            color: labelColor,
            className: `${labelClassName}`,
            layout: "text-md-tighter",
            shadow: labelShadow,
            text: label
          }
        ) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
          Heading,
          {
            isCursive: labelIsCursive,
            color: labelColor,
            className: ` ${labelClassName}`,
            shadow: labelShadow,
            layout: "text-md-tighter md:text-lg-tighter",
            text: label
          }
        ) }),
        isValidated && validationMax ? /* @__PURE__ */ jsx(
          ValidatedInput,
          {
            autoFocus,
            isRequired,
            min: validationMin,
            max: validationMax,
            name,
            placeholder,
            defaultValue,
            onChange
          }
        ) : /* @__PURE__ */ jsx(
          Input$1,
          {
            autoFocus,
            required: isRequired,
            name,
            placeholder,
            value,
            defaultValue,
            type,
            onChange
          }
        )
      ]
    }
  );
}
function ModalContent({
  children,
  setModalOpen,
  showTopClose = true,
  showBottomClose = true,
  footerClassName = "bg-col-600"
}) {
  const paddingBottom = showBottomClose ? "pb-[5vh]" : "pb-0";
  return /* @__PURE__ */ jsxs(Flex, { className: "w-full h-full relative ", children: [
    showTopClose && /* @__PURE__ */ jsx(Box, { className: "absolute top-[1vh] right-[1vh]", children: /* @__PURE__ */ jsx(CloseButton, { onClose: () => setModalOpen(false) }) }),
    /* @__PURE__ */ jsxs(Flex, { className: `w-full h-full justify-between ${paddingBottom}`, children: [
      /* @__PURE__ */ jsx(Flex, { className: "h-full w-full flex-1 ", children: /* @__PURE__ */ jsx(Box, { className: "w-full h-full rounded-b-none", children: /* @__PURE__ */ jsx(Box, { className: `w-full h-full`, children: /* @__PURE__ */ jsx(Flex, { className: "w-full h-full", children }) }) }) }),
      showBottomClose && /* @__PURE__ */ jsx(
        Flex,
        {
          className: `w-full h-[5vh] justify-center rounded-t-none absolute bottom-0 left-0 ${footerClassName}`,
          children: /* @__PURE__ */ jsx(CloseTextButton, { onClose: () => setModalOpen(false) })
        }
      )
    ] })
  ] });
}
function ModalWithButton({
  className = "",
  style = {},
  icon: Icon2,
  label,
  children,
  overlayBlur = "defaultOverlayBlur",
  overlayColor = "defaultOverlay",
  modalSize = "w-full h-full lg:w-94% lg:h-94%",
  showTopClose = true,
  showBottomClose = true,
  footerClassName,
  buttonText,
  iconLeft,
  iconRight
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const variants = {
    open: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: {
      scale: 0,
      opacity: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };
  useEscapeKey$1(() => setModalOpen(false));
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    " ",
    buttonText && iconLeft ? /* @__PURE__ */ jsx(
      Button,
      {
        buttonText,
        onClick: () => setModalOpen(true),
        iconLeft: Icon2
      }
    ) : buttonText && iconRight ? /* @__PURE__ */ jsx(
      Button,
      {
        buttonText,
        onClick: () => setModalOpen(true),
        iconRight: Icon2
      }
    ) : buttonText ? /* @__PURE__ */ jsx(Button, { buttonText, onClick: () => setModalOpen(true) }) : null,
    Icon2 && /* @__PURE__ */ jsx(
      IconButton,
      {
        icon: Icon2,
        label,
        onClick: () => setModalOpen(true)
      }
    ),
    /* @__PURE__ */ jsx(Portal$1, { children: /* @__PURE__ */ jsx(AnimatePresence, { children: isModalOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: `fixed inset-0 w-screen h-screen ${overlayColor} ${overlayBlur}`,
          onClick: () => setModalOpen(false),
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          style: { maxHeight: "100svh", zIndex: 60 }
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: `fixed inset-0 m-auto z-50 rounded-none ${modalSize} ${className}`,
          style: { ...style, maxHeight: "100svh", zIndex: 100 },
          variants,
          initial: "closed",
          animate: "open",
          exit: "closed",
          children: /* @__PURE__ */ jsx(
            ModalContent,
            {
              setModalOpen,
              showBottomClose,
              showTopClose,
              footerClassName,
              children
            }
          )
        }
      )
    ] }) }) })
  ] });
}
function PasswordInput({
  name = "password",
  id = "password",
  confirm = false
}) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return /* @__PURE__ */ jsxs(VStack, { gap: "gap-0", align: "start", className: `w-full`, children: [
    confirm ? /* @__PURE__ */ jsx(
      Heading,
      {
        layout: "text-md-normal md:text-xl-normal",
        text: "Confirm Password",
        className: "text-xl-tighter text-stroke-6-900 lightTextShadow"
      }
    ) : /* @__PURE__ */ jsx(
      Heading,
      {
        layout: "text-md-normal md:text-xl-normal",
        text: "Password",
        className: "text-xl-tighter text-stroke-6-900 lightTextShadow"
      }
    ),
    /* @__PURE__ */ jsxs(HStack, { className: "w-full relative", gap: "gap-0", children: [
      /* @__PURE__ */ jsx(Box, { className: "relative w-full", children: /* @__PURE__ */ jsx(
        Input$1,
        {
          type: show ? "text" : "password",
          placeholder: "password",
          id,
          name: confirm ? "confirmPassword" : name,
          required: true
        }
      ) }),
      /* @__PURE__ */ jsx(Box, { className: "absolute right-[1vh] top-[0.2vh]", children: /* @__PURE__ */ jsx(
        IconButton,
        {
          type: "unstyled",
          iconClassName: "text-[2.5vh]",
          label: "show/hide",
          icon: show ? FaEyeSlash : FaEye,
          onClick: handleClick
        }
      ) })
    ] })
  ] });
}
const placementClasses = {
  top: "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
  topLeft: "bottom-full mb-2 left-0",
  topRight: "bottom-full mb-2 right-0",
  bottom: "top-full mt-2 left-1/2 transform -translate-x-1/2",
  bottomLeft: "top-full mt-2 left-0",
  bottomRight: "top-full mt-2 right-0",
  left: "right-full mr-2 top-1/2 transform -translate-y-1/2",
  right: "left-full ml-2 top-1/2 transform -translate-y-1/2",
  center: "fixed inset-0 flex justify-center items-center"
};
function Popover({
  trigger,
  content,
  w = "w-fit max-w-[375px] sm:max-w-[500px]",
  h = "h-fit",
  placement = "topRight",
  heading
}) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);
  const isCenter = placement === "center";
  const centerVariants = {
    hidden: { scale: 0, opacity: 0, transition: { duration: 0.5 } },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
  };
  const togglePopover = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popoverRef]);
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      togglePopover();
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `relative inline-block ${isCenter ? "w-full h-full" : ""}`,
      ref: popoverRef,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            role: "button",
            tabIndex: 0,
            onClick: togglePopover,
            onKeyDown: handleKeyDown,
            children: trigger
          }
        ),
        /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: "hidden",
            animate: "visible",
            exit: "hidden",
            variants: centerVariants,
            className: `absolute z-10 shadowNarrowLoose ${w} ${h} min-w-[300px] ${placementClasses[placement]}`,
            children: /* @__PURE__ */ jsx(
              Flex,
              {
                className: `w-full h-full shadow3DMd relative bg-col-300 bg-darkenGrad`,
                children: /* @__PURE__ */ jsxs(
                  VStack,
                  {
                    className: `w-full h-full justify-start items-center shadowNarrowNormal gap-[0px]`,
                    children: [
                      /* @__PURE__ */ jsxs(HStack, { className: " w-full justify-between rounded-b-none bg-col-700 p-[0.7vh] pl-[1vh] border-b-[0.1vh] border-col-125", children: [
                        " ",
                        /* @__PURE__ */ jsx(
                          Heading,
                          {
                            layout: "text-lg-tight",
                            color: "text-col-100",
                            shadow: "textShadow",
                            noOfLines: 1,
                            text: heading ? heading : ""
                          }
                        ),
                        /* @__PURE__ */ jsx(Box, { className: "absolute top-[0.5vh] right-[1vh]", children: /* @__PURE__ */ jsx(CloseButton, { onClose: () => setIsOpen(false) }) })
                      ] }),
                      /* @__PURE__ */ jsx(Flex, { className: "w-full p-[1vh] max-h-[45vh] overflow-y-auto", children: content })
                    ]
                  }
                )
              }
            )
          }
        ) })
      ]
    }
  );
}
function GetFromLink() {
  const query = new URLSearchParams(useLocation().search);
  const fromLink = query.get("from");
  return fromLink;
}
function ScrollingSelector({
  options,
  setExternalSelection,
  heading,
  selectedOption,
  selectedOnTop = true,
  bg = "bg-col-500",
  border,
  showClose = true
}) {
  const [selected, setSelected] = useState(selectedOption || void 0);
  function handleStatusSelect(option) {
    setSelected(option);
    setExternalSelection ? setExternalSelection(option) : null;
  }
  const selectedOnTopOptions = selected ? [selected, ...options.filter((option) => option !== selected)] : options;
  const mapSelections = selectedOnTop ? selectedOnTopOptions : options;
  const handleButtonStyle = ({ option }) => {
    if (option === selected) {
      return `bg-col-200 font-[600] text-stroke-3-900 text-col-900 lightTextShadow hover:bg-col-400 hover:text-col-900`;
    } else {
      return `bg-col-950 text-col-100 font-[400] hover:bg-col-600 hover:text-col-900 transition-500`;
    }
  };
  return /* @__PURE__ */ jsx(FlexFull, { className: `${bg} ${border}`, children: /* @__PURE__ */ jsxs(VStackFull, { className: heading ? `px-[2vh] p-[1vh]` : "p-[0.5vh]", children: [
    heading && /* @__PURE__ */ jsx(FlexFull, { className: "h-fit", children: /* @__PURE__ */ jsx(
      Heading,
      {
        text: heading,
        layout: "text-xxl-looser",
        shadow: "textShadow",
        color: "text-col-100"
      }
    ) }),
    /* @__PURE__ */ jsx(
      FlexFull,
      {
        className: `h-full max-h-full overflow-y-auto justify-center insetOverlay border-980-md`,
        children: /* @__PURE__ */ jsx(VStackFull, { className: `h-fit px-[2vh] py-[1vh]`, gap: "gap-[0.5vh]", children: mapSelections.map((option) => /* @__PURE__ */ jsxs(
          FlexFull,
          {
            className: `${handleButtonStyle({
              option
            })} justify-between shadowNarrowLoose items-center px-[1vh]`,
            onClick: () => handleStatusSelect(option),
            children: [
              /* @__PURE__ */ jsxs(Text, { className: "text-md-looser", children: [
                option,
                " "
              ] }),
              option === selected && /* @__PURE__ */ jsx(Text, { className: "text-[1.3vh] leading-[1.5vh] text-col-100 textShadow px-[1vh] bg-col-700 metallicEdgesSm h-fit", children: "current" })
            ]
          },
          option
        )) })
      }
    ),
    showClose && /* @__PURE__ */ jsx(FlexFull, { className: "justify-center items-center", children: /* @__PURE__ */ jsx(
      Button,
      {
        to: String(GetFromLink()),
        buttonText: "Save & Close",
        type: "smallNormal"
      }
    ) })
  ] }) });
}
function TextArea({
  className = "",
  resize = "resize-none",
  style,
  defaultValue,
  textAreaHeight = "h-[9.5vh]",
  textAreaWidth = "w-full",
  autoFocus = false,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      defaultValue,
      autoFocus,
      className: `w-full ${resize} ${textAreaHeight} ${textAreaWidth} textareaStyles ${className} `,
      style,
      ...props
    }
  );
}
function TextAreaVStack({
  label,
  className,
  style,
  name,
  placeholder,
  value,
  defaultValue,
  textAreaWidth,
  textAreaHeight,
  textAreaClassName,
  labelClassName,
  autoFocus,
  labelColor,
  labelSize = "normal",
  labelIsCursive = true,
  onChange
}) {
  return /* @__PURE__ */ jsxs(
    VStack,
    {
      className: `w-full ${className}`,
      align: "start",
      style,
      gap: "gap-[0.5vh]",
      children: [
        labelSize === "small" ? /* @__PURE__ */ jsx(
          Heading,
          {
            isCursive: labelIsCursive,
            color: labelColor,
            className: `${labelClassName}`,
            layout: "text-md-tighter",
            text: label
          }
        ) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
          Heading,
          {
            isCursive: labelIsCursive,
            color: labelColor,
            className: ` ${labelClassName}`,
            layout: "text-md-tighter md:text-lg-tighter",
            text: label
          }
        ) }),
        /* @__PURE__ */ jsx(
          TextArea,
          {
            autoFocus,
            textAreaHeight,
            name,
            placeholder,
            value,
            defaultValue,
            onChange,
            className: `${textAreaWidth} ${textAreaHeight} ${textAreaClassName}`
          }
        )
      ]
    }
  );
}
const useToast = () => {
  const [isToastVisible, setIsToastVisible] = useState(false);
  const showToast = () => {
    setIsToastVisible(true);
  };
  const hideToast = () => {
    setIsToastVisible(false);
  };
  return { isToastVisible, showToast, hideToast };
};
const toastVariants = {
  visible: { opacity: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, transition: { duration: 0.5 } }
};
function Toast({
  noOfLines = 4,
  message,
  isVisible,
  duration = 4e3,
  onClose,
  position = "center-center",
  toastSize = "w-fit h-fit",
  containerClassName = "",
  bg = "bg-100-linear6op75 shadowBroadNormal",
  contentClassName = "justify-center items-center p-[4vh]",
  textClassName = "text-col-100 text-lg-normal "
}) {
  const [show, setShow] = useState(isVisible);
  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = window.setTimeout(() => {
        setShow(false);
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [isVisible, duration]);
  useEffect(() => {
    if (!show) {
      onClose();
    }
  }, [show, onClose]);
  const positionClasses = {
    "top-left": "top-10 left-10",
    "top-right": "top-10 right-10",
    "bottom-left": "bottom-10 left-10",
    "bottom-right": "bottom-10 right-10",
    "center-right": "top-1/2 right-10 transform -translate-y-1/2",
    "center-bottom": "bottom-10 left-1/2 transform -translate-x-1/2",
    "center-left": "top-1/2 left-10 transform -translate-y-1/2",
    "center-top": "top-20 left-1/2 transform -translate-x-1/2",
    "center-center": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  };
  const positionClass = positionClasses[position] || "bottom-5 right-5";
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: `fixed ${positionClass} z-20 ${bg} ${toastSize} ${containerClassName}`,
      initial: "hidden",
      animate: "visible",
      exit: "hidden",
      variants: toastVariants,
      children: /* @__PURE__ */ jsx(Flex, { className: `w-full h-full ${contentClassName}`, children: /* @__PURE__ */ jsx(Text, { noOfLines, className: `${textClassName}`, children: message }) })
    }
  );
}
function TransitionExample({
  transitionType,
  isOpen,
  closeTransition
}) {
  useEscapeKey$1(() => closeTransition());
  console.log("IsOpen: ", isOpen);
  return /* @__PURE__ */ jsx(Fragment, { children: isOpen && /* @__PURE__ */ jsxs(
    FlexFull,
    {
      className: "w-full h-full justify-center items-center bg-linear4op75 defaultOverlayBlur absolute top-0 left-0 z-20",
      onClick: () => closeTransition(),
      children: [
        /* @__PURE__ */ jsx(Transition, { type: transitionType, duration: 0.6, delay: 0.3, children: /* @__PURE__ */ jsx(VStack, { className: "p-[3vh] bg-600-linear6op75 text-col-100 shadowWideLooser", children: /* @__PURE__ */ jsxs(Text, { className: "text-xl-looser", children: [
          'transition type = "',
          transitionType,
          '"'
        ] }) }) }),
        /* @__PURE__ */ jsx(FlexFull, { className: "fixed bottom-0 left-0 h-[6vh] justify-center items-center", children: /* @__PURE__ */ jsx(Button, { buttonText: "close", onClick: () => closeTransition() }) })
      ]
    }
  ) });
}
function TagBadge({
  tag,
  color = "text-col-900",
  onClick,
  index,
  className = ""
}) {
  return /* @__PURE__ */ jsx(
    Flex,
    {
      className: `pl-[0.3vh] w-fit h-fit shadowNarrowNormal ${className}  bg-col-300`,
      children: /* @__PURE__ */ jsxs(
        HStack,
        {
          className: `w-full h-fit justify-between items-center gap-[0.1vh] py-[0px]`,
          children: [
            /* @__PURE__ */ jsx(
              Text,
              {
                className: `text-md-tighter lowercase ${color} lightTextShadow font-semibold`,
                children: tag
              }
            ),
            onClick && /* @__PURE__ */ jsx(
              IconButton,
              {
                type: "unstyled",
                containerClassName: "p-[0px] h-fit w-fit",
                iconClassName: "text-[2.2vh] p-[0px]",
                icon: CloseIcon,
                label: "remove",
                tooltipPlacement: "left",
                onClick: typeof index !== "undefined" ? () => onClick(index) : void 0
              }
            )
          ]
        }
      )
    }
  );
}
function TagsInput({
  onTagsChange,
  tags,
  wrapHeight = "h-full max-h-[15vh]"
}) {
  const [inputValue, setInputValue] = useState("");
  const [localTags, setLocalTags] = useState(tags);
  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (inputValue.trim()) {
        if (!localTags.includes(inputValue)) {
          const newTags = [inputValue, ...localTags];
          setLocalTags(newTags);
          onTagsChange(newTags);
        }
        setInputValue("");
      }
    }
  };
  const handleAddTag = () => {
    if (inputValue.trim()) {
      if (!localTags.includes(inputValue)) {
        const newTags = [inputValue, ...localTags];
        setLocalTags(newTags);
        onTagsChange(newTags);
      }
      setInputValue("");
    }
  };
  const removeTag = (index) => {
    const newTags = localTags.filter((_, idx) => idx !== index);
    setLocalTags(newTags);
    onTagsChange(newTags);
  };
  return /* @__PURE__ */ jsx(VStack, { className: `w-full`, children: /* @__PURE__ */ jsxs(VStack, { className: `w-full h-full text-gray-100 gap-[1vh]`, align: "start", children: [
    /* @__PURE__ */ jsxs(HStack, { className: "w-full items-center", children: [
      /* @__PURE__ */ jsx(
        Input$1,
        {
          value: inputValue,
          placeholder: "Add tags",
          onKeyDown: handleInputKeyDown,
          onChange: handleInputChange
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          width: "w-fit",
          onClick: handleAddTag,
          buttonText: "Add",
          type: "smallNormal"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      Flex,
      {
        className: `w-full overflow-y-auto overflow-x-hidden insetShadowMd inputStyles ${wrapHeight}`,
        children: /* @__PURE__ */ jsxs(
          Wrap,
          {
            className: `w-full h-full gap-x-[1vh] gap-y-[1vh] justify-start p-[1vh]`,
            children: [
              localTags.length === 0 && /* @__PURE__ */ jsx(Flex, { className: `text-sm h-fit w-fit textShadow`, children: /* @__PURE__ */ jsx(Heading, { text: "There are currently no tags." }) }),
              localTags.map((tag, index) => /* @__PURE__ */ jsx(
                TagBadge,
                {
                  tag,
                  onClick: removeTag,
                  index,
                  bgColor: "bg-col-200"
                },
                index
              ))
            ]
          }
        )
      }
    )
  ] }) });
}
function Parallax({
  dimensions = "w-[50vh] h-[50vh]",
  imageMargin = "mt-[40vh]",
  showIcon = true,
  children,
  bgImage = "bg-[url(/images/rain.jpg)]",
  bgPosition = "bg-center",
  bgFit = "bg-cover",
  bgAttachment = "bg-fixed",
  title,
  tagline,
  scrollBackground = "bg-100-linear6op75",
  imageOnly = false,
  overlayImage,
  overlayImagePositioning = "",
  overlayImageDimensions = "",
  overlayImageClassName
}) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Flex, { className: "relative", children: [
    overlayImage && /* @__PURE__ */ jsx(
      Image,
      {
        alt: overlayImage,
        src: overlayImage,
        className: `absolute ${overlayImagePositioning} ${overlayImageDimensions} ${overlayImageClassName}`
      }
    ),
    /* @__PURE__ */ jsx(
      Box,
      {
        className: `${dimensions} border-970-md overflow-y-scroll ${bgAttachment} ${bgImage} ${bgFit} ${bgPosition} bg-no-repeat shadowWideLoose 
        `,
        children: !imageOnly && /* @__PURE__ */ jsx(Box, { className: imageMargin, children: /* @__PURE__ */ jsxs(
          VStackFull,
          {
            className: `${scrollBackground} text-col-100 shadow3DSm`,
            align: "items-start",
            children: [
              /* @__PURE__ */ jsx(VStackFull, { children: title && /* @__PURE__ */ jsxs(HStackFull, { className: "justify-between items-center rounded-none p-[1vh] bg-col-960", children: [
                /* @__PURE__ */ jsx(Box, { className: "text-xl-tight font-cursive textShadow", children: title }),
                showIcon && /* @__PURE__ */ jsx(Icon, { icon: CgScrollV, iconClassName: "text-[3vh]" })
              ] }) }),
              /* @__PURE__ */ jsxs(VStackFull, { className: "px-[1vh] pb-[1vh]", children: [
                tagline && /* @__PURE__ */ jsx(FlexFull, { className: "italic text-lg textShadow", children: tagline }),
                children && children
              ] })
            ]
          }
        ) })
      }
    )
  ] }) });
}
function Accordion({
  title,
  children,
  titleStyles = "bg-100-linear6op75 hover:bg-100-linear6op50 transition-400 text-col-100 textShadow",
  contentStyles = "bg-col-990 text-col-100 textShadow"
}) {
  var _a;
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px");
  const contentRef = useRef(null);
  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [isOpen, (_a = contentRef.current) == null ? void 0 : _a.scrollHeight]);
  return /* @__PURE__ */ jsxs(
    VStackFull,
    {
      className: "overflow-hidden rounded-none",
      gap: "gap-[0px]",
      align: "items-start",
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            className: `w-full text-left px-[1.5vh] py-[1vh] ${titleStyles} transition-300 rounded-none`,
            onClick: () => setIsOpen(!isOpen),
            children: /* @__PURE__ */ jsxs(HStackFull, { className: "rounded-none justify-between", children: [
              /* @__PURE__ */ jsx(Text, { className: "text-md-tight", children: title }),
              /* @__PURE__ */ jsx(
                Icon,
                {
                  icon: isOpen ? BiChevronUp : BiChevronDown,
                  iconClassName: "text-[3vh]"
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: contentRef,
            style: { maxHeight },
            className: `transition-500 rounded-none ${isOpen ? "overflow-visible" : "overflow-hidden"} w-full`,
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: `px-[2vh] py-[1vh] w-full ${contentStyles} rounded-none`,
                children
              }
            )
          }
        )
      ]
    }
  );
}
function ComponentExamples() {
  const onConfirm = () => {
    console.log("confirmed");
    setIsAlertOpen(false);
  };
  const [externalSelected, setExternalSelection] = useState(
    "optionSix"
  );
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const cancelRef = useRef(null);
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
    headerText
  }) {
    return /* @__PURE__ */ jsxs(
      VStack,
      {
        gap: "gap-[0px]",
        className: `h-fit ${bg} shadowNarrowLoose max-w-[90vw] ${className}`,
        children: [
          headerText && /* @__PURE__ */ jsx(FlexFull, { className: "px-[1vh] py-[0.5vh] bg-100-linear6op75 rounded-b-none", children: /* @__PURE__ */ jsx(Text, { className: "font-semibold text-col-100 textShadow", children: headerText }) }),
          /* @__PURE__ */ jsx(FlexFull, { className: "px-[1vh] py-[0.5vh] ", children })
        ]
      }
    );
  }
  const [enteredTags, setEnteredTags] = useState([]);
  const [toastPosition, setToastPosition] = useState("center-center");
  const [isTransitionOpen, setIsTransitionOpen] = useState(false);
  const [transitionType, setTransitionType] = useState("fade");
  const handleTransitionClick = (transitionType2) => {
    setTransitionType(transitionType2);
    setIsTransitionOpen(true);
    console.log(isTransitionOpen, transitionType2);
  };
  const handleTagsChange = (newTags) => {
    setEnteredTags(newTags);
  };
  return /* @__PURE__ */ jsxs(Flex, { className: "w-full justify-around items-center", children: [
    /* @__PURE__ */ jsxs(Wrap, { className: "w-full items-center justify-around gap-[3vh]", children: [
      /* @__PURE__ */ jsx(Button, { buttonText: "Main Nav Demo", to: "/design/main-nav-demo" }),
      /* @__PURE__ */ jsx(Button, { buttonText: "Alert", onClick: openAlert }),
      /* @__PURE__ */ jsx(
        Button,
        {
          to: "/design/animate-on-scroll",
          buttonText: "Animate on Scroll Duration"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          to: "/design/animate-on-scroll-spring",
          buttonText: "Animation on Snap Scroll Spring"
        }
      ),
      " ",
      /* @__PURE__ */ jsx(
        Button,
        {
          to: "/design/infinite-scroll-demo",
          buttonText: "Infinite Scroll"
        }
      ),
      /* @__PURE__ */ jsx(Button, { to: "/design/masonry-grid-demo", buttonText: "Masonry Grid" }),
      /* @__PURE__ */ jsx(
        Popover,
        {
          trigger: /* @__PURE__ */ jsx(Button, { buttonText: "Popover" }),
          content: /* @__PURE__ */ jsx(Flex, { children: "I am the content" }),
          heading: "Popover Heading"
        }
      ),
      /* @__PURE__ */ jsx(ModalWithButton, { buttonText: "Modal", children: /* @__PURE__ */ jsx(FlexFull, { className: "h-full bg-col-700 justify-center items-center rounded-b-none", children: /* @__PURE__ */ jsx(Text, { className: "text-mega-normal text-col-100 textShadow", children: "This is a lovely Modal!" }) }) }),
      /* @__PURE__ */ jsx(ComponentContainer, { headerText: "Avatar", children: /* @__PURE__ */ jsx(Avatar, { src: "/images/fallbackAvatar.png", size: "xxl" }) }),
      /* @__PURE__ */ jsx(
        BackgroundImageContainer,
        {
          w: "w-[15vh]",
          image: "/images/fallbackAvatar.png",
          containerClassName: "shadowNarrowTight",
          children: /* @__PURE__ */ jsx(Text, { className: "font-bold text-col-100 textFog", children: "Background Image" })
        }
      ),
      /* @__PURE__ */ jsx(Badge, { label: "Badge" }),
      /* @__PURE__ */ jsx(ComponentContainer, { children: /* @__PURE__ */ jsxs(VStack, { children: [
        /* @__PURE__ */ jsx(Checkbox, { label: "Checkbox" }),
        /* @__PURE__ */ jsx(Checkbox, { label: "Disabled", isDisabled: true }),
        /* @__PURE__ */ jsx(Checkbox, { label: "Checked", isChecked: true })
      ] }) }),
      /* @__PURE__ */ jsx(ComponentContainer, { headerText: "Date Time Picker", children: /* @__PURE__ */ jsx(InputDateTime, { containerHeight: "h-[38vh]" }) }),
      /* @__PURE__ */ jsx(ComponentContainer, { headerText: "Drawer", children: /* @__PURE__ */ jsx(VStackFull, { children: drawerTypes.map((type) => /* @__PURE__ */ jsxs(HStackFull, { className: "justify-between", children: [
        /* @__PURE__ */ jsx(Text, { children: type }),
        /* @__PURE__ */ jsx(
          DrawerWithButton,
          {
            icon: BiMenu,
            buttonType: "smallNormal",
            slideDirection: type,
            children: /* @__PURE__ */ jsx(FlexFull, { className: "h-full justify-center items-center", children: /* @__PURE__ */ jsx(Text, { className: "text-xxl-loose text-col-100 textShadow", children: type }) })
          }
        )
      ] }, type)) }) }),
      /* @__PURE__ */ jsxs(VStack, { gap: "gap-[2vh]", children: [
        " ",
        /* @__PURE__ */ jsx(ComponentContainer, { headerText: "Input", children: /* @__PURE__ */ jsx(Box, { className: "w-[25vh]", children: /* @__PURE__ */ jsx(Input$1, {}) }) }),
        /* @__PURE__ */ jsx(ComponentContainer, { headerText: "TextArea", children: /* @__PURE__ */ jsx(Box, { className: "w-[25vh]", children: /* @__PURE__ */ jsx(TextArea, {}) }) })
      ] }),
      /* @__PURE__ */ jsxs(VStack, { gap: "gap-[2vh]", children: [
        " ",
        /* @__PURE__ */ jsx(ComponentContainer, { headerText: "InputVStack", children: /* @__PURE__ */ jsx(Box, { className: "w-[25vh]", children: /* @__PURE__ */ jsx(InputVStack, { label: "Input Label" }) }) }),
        /* @__PURE__ */ jsx(ComponentContainer, { headerText: "TextAreaVStack", children: /* @__PURE__ */ jsx(Box, { className: "w-[25vh]", children: /* @__PURE__ */ jsx(TextAreaVStack, { label: "Text Area Label" }) }) })
      ] }),
      /* @__PURE__ */ jsxs(VStack, { gap: "gap-[2vh]", children: [
        /* @__PURE__ */ jsx(ComponentContainer, { headerText: "Password Input", className: "w-[40vh]", children: /* @__PURE__ */ jsx(PasswordInput, {}) }),
        /* @__PURE__ */ jsx(ComponentContainer, { headerText: "Validated Input", className: "w-[30vh]", children: /* @__PURE__ */ jsx(FlexFull, { className: "justify-center", children: /* @__PURE__ */ jsx(ValidatedInput, { max: 10 }) }) })
      ] }),
      /* @__PURE__ */ jsx(ComponentContainer, { headerText: "Tags Input", className: "w-[30vh]", children: /* @__PURE__ */ jsx(FlexFull, { className: "justify-center", children: /* @__PURE__ */ jsx(TagsInput, { tags: enteredTags, onTagsChange: handleTagsChange }) }) }),
      /* @__PURE__ */ jsx(ComponentContainer, { headerText: "Select Menu", className: "w-[30vh]", children: /* @__PURE__ */ jsxs(VStackFull, { children: [
        /* @__PURE__ */ jsxs(HStackFull, { children: [
          /* @__PURE__ */ jsx(Text, { className: "font-bold", children: "Selected:" }),
          /* @__PURE__ */ jsx(Text, { children: externalSelected })
        ] }),
        /* @__PURE__ */ jsx(FlexFull, { className: "justify-center h-[30vh]", children: /* @__PURE__ */ jsx(
          ScrollingSelector,
          {
            setExternalSelection,
            selectedOption: externalSelected,
            selectedOnTop: false,
            showClose: false,
            options: [
              "option one",
              "optionTwo",
              "optionThree",
              "optionFour",
              "optionFive",
              "optionSix",
              "optionSeven",
              "optionEight",
              "optionNine",
              "optionTen"
            ]
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx(ComponentContainer, { headerText: "Toast", className: "w-[30vh]", children: /* @__PURE__ */ jsx(FlexFull, { className: "justify-center", children: /* @__PURE__ */ jsx(VStack, { children: toastPositions.map((position) => /* @__PURE__ */ jsx(
        Button,
        {
          width: "w-[23vh]",
          type: "smallNormal",
          buttonText: position,
          onClick: () => {
            setToastPosition(position);
            showToast();
          }
        },
        position
      )) }) }) }),
      /* @__PURE__ */ jsx(ComponentContainer, { headerText: "Tooltip", className: "", children: /* @__PURE__ */ jsx(FlexFull, { className: "justify-center", children: /* @__PURE__ */ jsx(Wrap, { className: "w-full justify-around gap-[3vh] p-[2vh] lg:w-[60vw] xxl:w-[50vw]", children: tooltipPlacements.map((placement) => /* @__PURE__ */ jsx(
        Tooltip,
        {
          placement,
          label: placement,
          bg: "bg-col-800",
          children: /* @__PURE__ */ jsx(Flex, { className: "justify-center bg-300-diagonal1op25 w-[23vh] shadowNarrowNormal", children: /* @__PURE__ */ jsx(Text, { className: "text-lg-tight", children: placement }) })
        },
        placement
      )) }) }) }),
      /* @__PURE__ */ jsx(ComponentContainer, { headerText: "Transition", className: "", children: /* @__PURE__ */ jsx(FlexFull, { className: "justify-center", children: /* @__PURE__ */ jsx(Wrap, { className: "w-full justify-around gap-[1.5vh] p-[2vh] lg:w-[60vw] xxl:w-[50vw]", children: transitionTypes.map((type) => /* @__PURE__ */ jsx(
        Button,
        {
          buttonText: type,
          type: "smallNormal",
          onClick: () => handleTransitionClick(type)
        },
        type
      )) }) }) }),
      /* @__PURE__ */ jsx(ComponentContainer, { headerText: "Parallax with Image", children: /* @__PURE__ */ jsx(Parallax, { imageOnly: true }) }),
      /* @__PURE__ */ jsx(ComponentContainer, { headerText: "Parallax with Text", children: /* @__PURE__ */ jsx(
        Parallax,
        {
          title: "The Melody of Raindrops",
          tagline: "Unveiling the Serenade of the Skies",
          children: /* @__PURE__ */ jsxs(VStackFull, { children: [
            /* @__PURE__ */ jsx("p", { children: "In the heart of nature's symphony, raindrops compose a timeless melody, a soothing serenade that whispers to the soul. This ethereal music, born from the heavens, dances upon rooftops and windows, creating a rhythm that resonates with the heartbeat of the earth. Each drop, a note; together, they orchestrate the symphony of the rain, a sound so pure it cleanses the air and rejuvenates life." }),
            /* @__PURE__ */ jsx("p", { children: "Amidst the cascade of silver threads, the world transforms. Streets glisten under the embrace of the rain, and the air fills with the fresh scent of petrichor, the earth's perfume released upon receiving the sky's affection. Trees and flowers bask in the nourishing touch, their leaves shimmering with droplets that catch the faint light, turning every view into a masterpiece of sparkling jewels." }),
            /* @__PURE__ */ jsx("p", { children: "But beyond its beauty and melody, rain symbolizes renewal and growth. It teaches us the art of letting go, washing away the remnants of yesterday, and nurturing the seeds of tomorrow. In its presence, we find moments of reflection, an invitation to pause and revel in the simple joys of life. The rain, with its gentle persistence, reminds us of nature's cycles, the ebb and flow of life, and the preciousness of every drop in the vast ocean of existence." })
          ] })
        }
      ) }),
      /* @__PURE__ */ jsx(ComponentContainer, { headerText: "Accordion", children: /* @__PURE__ */ jsxs(VStack, { gap: "gap-[0px]", className: "w-[40vh] h-[40vh]", children: [
        /* @__PURE__ */ jsx(Accordion, { title: "Accordion Element One", children: /* @__PURE__ */ jsx("p", { children: "This is the epic content of element one." }) }),
        /* @__PURE__ */ jsx(Accordion, { title: "Accordion Element Two ", children: /* @__PURE__ */ jsx(
          InputVStack,
          {
            label: "This accordion has an input field",
            labelIsCursive: false,
            labelColor: "text-col-100",
            labelShadow: "textShadow",
            labelSize: "small"
          }
        ) }),
        /* @__PURE__ */ jsx(Accordion, { title: "Accordion Element Three", children: /* @__PURE__ */ jsx(Text, { className: "text-lg-tight", children: "😄🦄" }) })
      ] }) })
    ] }),
    isToastVisible && /* @__PURE__ */ jsx(
      Toast,
      {
        message: `I am so toasty - ${toastPosition}`,
        isVisible: isToastVisible,
        duration: 5e3,
        onClose: hideToast,
        position: toastPosition
      }
    ),
    isAlertOpen && /* @__PURE__ */ jsx(
      Alert,
      {
        isAlertOpen,
        title: "You sure?",
        body: `Please confirm this important thing?`,
        confirmButtonText: "Yes!",
        cancelButtonText: "Cancel",
        alertDimensions: "h-50% w-90% md:w-[60vh]",
        bodyClassName: "justify-evenly py-[2vh]",
        onClose: closeAlert,
        cancelRef,
        onConfirmClick: () => onConfirm(),
        bodyTextSize: "text-[2.5vh]"
      }
    ),
    isTransitionOpen && /* @__PURE__ */ jsx(
      TransitionExample,
      {
        isOpen: isTransitionOpen,
        closeTransition: () => setIsTransitionOpen(false),
        transitionType
      }
    )
  ] });
}
function MatchesHash({ linkName }) {
  const hash = useLocation().hash;
  return hash === linkName;
}
function CustomNavLink({
  to,
  linkText,
  activeStyles,
  inactiveStyles = "",
  useHash,
  useActive,
  className
}) {
  const hash = useLocation().hash;
  console.log(hash);
  return /* @__PURE__ */ jsx(Box, { className, children: /* @__PURE__ */ jsx(
    NavLink,
    {
      to,
      className: useActive ? ({ isActive }) => isActive ? activeStyles : inactiveStyles : useHash ? MatchesHash({ linkName: to }) ? activeStyles : inactiveStyles : void 0,
      children: linkText
    }
  ) });
}
function StyleExampleBox({
  className,
  text
}) {
  return /* @__PURE__ */ jsx(Flex, { className: `px-[1vh] py-[0.5vh] ${className}`, children: text });
}
function StyledExampleWrap({
  bg = "bg-col-700",
  children
}) {
  return /* @__PURE__ */ jsx(
    Wrap,
    {
      className: `${bg} px-[1vh] py-[2vh] shadowNarrowNormal gap-y-[2vh] gap-x-[3vh] w-full justify-around`,
      children
    }
  );
}
function Design() {
  function TestBox2({
    bg,
    children,
    w = "w-[16vh]"
  }) {
    const isLightFont = bg.startsWith("bg-col-9") || bg.startsWith("bg-col-800") || bg.startsWith("bg-col-700") || bg.startsWith("bg-col-600") || bg.startsWith("bg-col-5");
    const isDarkFont = bg.startsWith("bg-col-1") || bg.startsWith("bg-col-2") || bg.startsWith("bg-col-3") || bg.startsWith("bg-col-4");
    const fontColor = isLightFont ? `text-col-100  text-stroke-4-900 textShadow` : isDarkFont ? `text-col-900  text-stroke-4-900 lightTextShadow` : `text-col-100 textShadow`;
    return /* @__PURE__ */ jsx(
      Flex,
      {
        className: `h-[5vh] ${w} font-bold ${bg} shadowNarrowNormal ${fontColor} justify-center items-center`,
        children: /* @__PURE__ */ jsx(Text, { children })
      }
    );
  }
  function SectionHeading({ id, heading }) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { id, className: "h-[5.5vh] xl:h-[3.5vh] text-transparent", children: "This" }),
      /* @__PURE__ */ jsx(Flex, { className: "w-full justify-center pt-[2vh] pb-[1vh]", children: /* @__PURE__ */ jsx(
        Heading,
        {
          color: "text-white text-stroke-9-100",
          shadow: "textFog",
          text: heading,
          layout: "text-insane-loose",
          className: "px-[2vh]"
        }
      ) })
    ] });
  }
  const activeStyles = "textGlow";
  const inactiveStyles = "text-shadow";
  return /* @__PURE__ */ jsx(Transition, { className: "w-full h-full justify-center overflow-y-auto", children: /* @__PURE__ */ jsxs(FlexFull, { className: "h-full overflow-y-auto justify-center", children: [
    /* @__PURE__ */ jsx(FlexFull, { className: "fixed top-0 left-0 p-[1vh] bg-col-200 z-10 shadowWideLooser", children: /* @__PURE__ */ jsxs(Wrap, { className: "w-full gap-x-[5vh] gap-y-[1vh] justify-around", children: [
      /* @__PURE__ */ jsx(IconButton, { icon: HomeIcon, type: "smallNormal", to: "/" }),
      /* @__PURE__ */ jsx(
        CustomNavLink,
        {
          to: "#colorscheme",
          linkText: "Colors",
          activeStyles,
          inactiveStyles,
          useHash: true
        }
      ),
      /* @__PURE__ */ jsx(
        CustomNavLink,
        {
          to: "#rgb",
          linkText: "RBG",
          activeStyles,
          inactiveStyles,
          useHash: true
        }
      ),
      /* @__PURE__ */ jsx(
        CustomNavLink,
        {
          to: "#gradients",
          linkText: "Gradients",
          activeStyles,
          inactiveStyles,
          useHash: true
        }
      ),
      /* @__PURE__ */ jsx(
        CustomNavLink,
        {
          to: "#complexbackgrounds",
          linkText: "Complex Backgrounds",
          activeStyles,
          inactiveStyles,
          useHash: true
        }
      ),
      /* @__PURE__ */ jsx(
        CustomNavLink,
        {
          to: "#buttons",
          linkText: "Buttons",
          activeStyles,
          inactiveStyles,
          useHash: true
        }
      ),
      /* @__PURE__ */ jsx(
        CustomNavLink,
        {
          to: "#transitions",
          linkText: "Transitions",
          activeStyles,
          inactiveStyles,
          useHash: true
        }
      ),
      /* @__PURE__ */ jsx(
        CustomNavLink,
        {
          to: "#shadow",
          linkText: "Shadows",
          activeStyles,
          inactiveStyles,
          useHash: true
        }
      ),
      /* @__PURE__ */ jsx(
        CustomNavLink,
        {
          to: "#borders",
          linkText: "Borders",
          activeStyles,
          inactiveStyles,
          useHash: true
        }
      ),
      /* @__PURE__ */ jsx(
        CustomNavLink,
        {
          to: "#text",
          linkText: "Text",
          activeStyles,
          inactiveStyles,
          useHash: true
        }
      ),
      /* @__PURE__ */ jsx(
        CustomNavLink,
        {
          to: "#components",
          linkText: "Components",
          activeStyles,
          inactiveStyles,
          useHash: true
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs(
      VStackFull,
      {
        className: "h-fit px-[2vh] pt-[5.5vh] xl:pt-[3.5vh] pb-[2vh]",
        gap: "gap-[2vh]",
        children: [
          /* @__PURE__ */ jsxs(VStackFull, { gap: "gap-[1vh]", children: [
            /* @__PURE__ */ jsx(SectionHeading, { id: "colorscheme", heading: "Color Scheme" }),
            /* @__PURE__ */ jsx(StyledExampleWrap, { bg: "bg-white", children: allColors.map((color, index) => /* @__PURE__ */ jsxs(TestBox2, { bg: color, children: [
              " ",
              color
            ] }, index)) }),
            /* @__PURE__ */ jsx(StyledExampleWrap, { children: colors100.map((color, index) => /* @__PURE__ */ jsxs(TestBox2, { bg: color, children: [
              " ",
              color
            ] }, index)) }),
            /* @__PURE__ */ jsx(StyledExampleWrap, { children: colors200.map((color, index) => /* @__PURE__ */ jsxs(TestBox2, { bg: color, children: [
              " ",
              color
            ] }, index)) }),
            /* @__PURE__ */ jsx(StyledExampleWrap, { children: colors300.map((color, index) => /* @__PURE__ */ jsxs(TestBox2, { bg: color, children: [
              " ",
              color
            ] }, index)) }),
            /* @__PURE__ */ jsx(StyledExampleWrap, { children: colors400.map((color, index) => /* @__PURE__ */ jsxs(TestBox2, { bg: color, children: [
              " ",
              color
            ] }, index)) }),
            /* @__PURE__ */ jsx(StyledExampleWrap, { children: colors500.map((color, index) => /* @__PURE__ */ jsxs(TestBox2, { bg: color, children: [
              " ",
              color
            ] }, index)) }),
            /* @__PURE__ */ jsx(StyledExampleWrap, { children: colors600.map((color, index) => /* @__PURE__ */ jsxs(TestBox2, { bg: color, children: [
              " ",
              color
            ] }, index)) }),
            /* @__PURE__ */ jsx(StyledExampleWrap, { bg: "bg-col-500", children: colors700.map((color, index) => /* @__PURE__ */ jsxs(TestBox2, { bg: color, children: [
              " ",
              color
            ] }, index)) }),
            /* @__PURE__ */ jsx(StyledExampleWrap, { bg: "bg-col-500", children: colors800.map((color, index) => /* @__PURE__ */ jsxs(TestBox2, { bg: color, children: [
              " ",
              color
            ] }, index)) }),
            /* @__PURE__ */ jsx(StyledExampleWrap, { bg: "bg-col-500", children: colors900.map((color, index) => /* @__PURE__ */ jsxs(TestBox2, { bg: color, children: [
              " ",
              color
            ] }, index)) }),
            /* @__PURE__ */ jsx(SectionHeading, { id: "rgb", heading: "RBG Equivalents" }),
            /* @__PURE__ */ jsx(StyledExampleWrap, { bg: "bg-white", children: allColorsRGB.map(
              (color, index) => /* @__PURE__ */ jsxs(TestBox2, { bg: color.code, w: "w-[30vh]", children: [
                " ",
                color.rgb
              ] }, index)
            ) })
          ] }),
          /* @__PURE__ */ jsxs(VStackFull, { className: "h-fit", gap: "gap-[2vh]", children: [
            /* @__PURE__ */ jsx(SectionHeading, { id: "gradients", heading: "Gradients & Opacities" }),
            /* @__PURE__ */ jsx(StyledExampleWrap, { bg: "bg-white", children: gradients.map((gradient, index) => /* @__PURE__ */ jsxs(TestBox2, { bg: gradient, w: "w-[24vh]", children: [
              " ",
              gradient
            ] }, index)) })
          ] }),
          /* @__PURE__ */ jsxs(VStackFull, { className: "h-fit", gap: "gap-[2vh]", children: [
            /* @__PURE__ */ jsx(
              SectionHeading,
              {
                id: "complexbackgrounds",
                heading: "Complex Backgrounds"
              }
            ),
            /* @__PURE__ */ jsx(
              Heading,
              {
                isCursive: false,
                color: "text-col-100",
                shadow: "textShadow",
                layout: "text-lg-normal",
                text: "col-100 gradient combinations"
              }
            ),
            /* @__PURE__ */ jsx(StyledExampleWrap, { children: Object.values(col100Bgs).map(
              (background, index) => /* @__PURE__ */ jsxs(TestBox2, { bg: background, w: "w-[24vh]", children: [
                " ",
                /* @__PURE__ */ jsx(TransformBg, { value: background })
              ] }, index)
            ) }),
            /* @__PURE__ */ jsx(
              Heading,
              {
                isCursive: false,
                color: "text-col-100",
                shadow: "textShadow",
                layout: "text-lg-normal",
                text: "col-100 gradient combinations"
              }
            ),
            /* @__PURE__ */ jsx(StyledExampleWrap, { children: Object.values(col200Bgs).map(
              (background, index) => /* @__PURE__ */ jsxs(TestBox2, { bg: background, w: "w-[24vh]", children: [
                " ",
                /* @__PURE__ */ jsx(TransformBg, { value: background })
              ] }, index)
            ) }),
            /* @__PURE__ */ jsx(
              Heading,
              {
                isCursive: false,
                color: "text-col-100",
                shadow: "textShadow",
                layout: "text-lg-normal",
                text: "col-200 gradient combinations"
              }
            ),
            /* @__PURE__ */ jsx(StyledExampleWrap, { children: Object.values(col300Bgs).map(
              (background, index) => /* @__PURE__ */ jsxs(TestBox2, { bg: background, w: "w-[24vh]", children: [
                " ",
                /* @__PURE__ */ jsx(TransformBg, { value: background })
              ] }, index)
            ) }),
            /* @__PURE__ */ jsx(
              Heading,
              {
                isCursive: false,
                color: "text-col-100",
                shadow: "textShadow",
                layout: "text-lg-normal",
                text: "col-300 gradient combinations"
              }
            ),
            /* @__PURE__ */ jsx(StyledExampleWrap, { children: Object.values(col100Bgs).map(
              (background, index) => /* @__PURE__ */ jsx(TestBox2, { bg: background, w: "w-[24vh]", children: /* @__PURE__ */ jsx(TransformBg, { value: background }) }, index)
            ) }),
            /* @__PURE__ */ jsx(
              Heading,
              {
                isCursive: false,
                color: "text-col-100",
                shadow: "textShadow",
                layout: "text-lg-normal",
                text: "col-400 gradient combinations"
              }
            ),
            /* @__PURE__ */ jsx(StyledExampleWrap, { children: Object.values(col400Bgs).map(
              (background, index) => /* @__PURE__ */ jsx(TestBox2, { bg: background, w: "w-[24vh]", children: /* @__PURE__ */ jsx(TransformBg, { value: background }) }, index)
            ) }),
            /* @__PURE__ */ jsx(
              Heading,
              {
                isCursive: false,
                color: "text-col-100",
                shadow: "textShadow",
                layout: "text-lg-normal",
                text: "col-500 gradient combinations"
              }
            ),
            /* @__PURE__ */ jsx(StyledExampleWrap, { children: Object.values(col500Bgs).map(
              (background, index) => /* @__PURE__ */ jsx(TestBox2, { bg: background, w: "w-[24vh]", children: /* @__PURE__ */ jsx(TransformBg, { value: background }) }, index)
            ) }),
            /* @__PURE__ */ jsx(
              Heading,
              {
                isCursive: false,
                color: "text-col-100",
                shadow: "textShadow",
                layout: "text-lg-normal",
                text: "col-600 gradient combinations"
              }
            ),
            /* @__PURE__ */ jsx(StyledExampleWrap, { children: Object.values(col600Bgs).map(
              (background, index) => /* @__PURE__ */ jsx(TestBox2, { bg: background, w: "w-[24vh]", children: /* @__PURE__ */ jsx(TransformBg, { value: background }) }, index)
            ) }),
            /* @__PURE__ */ jsx(
              Heading,
              {
                isCursive: false,
                color: "text-col-100",
                shadow: "textShadow",
                layout: "text-lg-normal",
                text: "col-700 gradient combinations"
              }
            ),
            /* @__PURE__ */ jsx(StyledExampleWrap, { bg: "bg-col-500", children: Object.values(col700Bgs).map(
              (background, index) => /* @__PURE__ */ jsx(TestBox2, { bg: background, w: "w-[24vh]", children: /* @__PURE__ */ jsx(TransformBg, { value: background }) }, index)
            ) }),
            /* @__PURE__ */ jsx(
              Heading,
              {
                isCursive: false,
                color: "text-col-100",
                shadow: "textShadow",
                layout: "text-lg-normal",
                text: "col-800 gradient combinations"
              }
            ),
            /* @__PURE__ */ jsx(StyledExampleWrap, { children: Object.values(col800Bgs).map(
              (background, index) => /* @__PURE__ */ jsx(TestBox2, { bg: background, w: "w-[24vh]", children: /* @__PURE__ */ jsx(TransformBg, { value: background }) }, index)
            ) }),
            /* @__PURE__ */ jsx(
              Heading,
              {
                isCursive: false,
                color: "text-col-100",
                shadow: "textShadow",
                layout: "text-lg-normal",
                text: "col-900 gradient combinations"
              }
            ),
            /* @__PURE__ */ jsx(StyledExampleWrap, { children: Object.values(col900Bgs).map(
              (background, index) => /* @__PURE__ */ jsx(TestBox2, { bg: background, w: "w-[24vh]", children: /* @__PURE__ */ jsx(TransformBg, { value: background }) }, index)
            ) })
          ] }),
          /* @__PURE__ */ jsxs(VStackFull, { className: "w-90% pb-[3vh]", children: [
            /* @__PURE__ */ jsx(SectionHeading, { id: "buttons", heading: "Buttons" }),
            /* @__PURE__ */ jsxs(StyledExampleWrap, { bg: "bg-col-200", children: [
              /* @__PURE__ */ jsx(Button, { buttonText: "Normal" }),
              " ",
              /* @__PURE__ */ jsx(Button, { type: "smallNormal", buttonText: "NormalButton" }),
              /* @__PURE__ */ jsx(Button, { type: "negative", buttonText: "Negative" }),
              /* @__PURE__ */ jsx(Button, { type: "smallNegative", buttonText: "Negative Small" }),
              /* @__PURE__ */ jsx(Button, { type: "unstyled", buttonText: "Unstyled" }),
              /* @__PURE__ */ jsx(Button, { type: "smallUnstyled", buttonText: "Unstyled Small" }),
              /* @__PURE__ */ jsx(Button, { buttonText: "Normal Icon Left", iconLeft: GoSmiley }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  buttonText: "Small Icon Right",
                  iconRight: GoSmiley,
                  type: "smallNormal"
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  buttonText: "Negative Icon Left",
                  type: "negative",
                  iconLeft: GoSmiley
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  buttonText: "Small Negative Icon Right",
                  type: "smallNegative",
                  iconRight: GoSmiley
                }
              ),
              /* @__PURE__ */ jsx(IconButton, { icon: GoSmiley }),
              " ",
              /* @__PURE__ */ jsx(IconButton, { type: "smallNormal", icon: GoSmiley }),
              /* @__PURE__ */ jsx(IconButton, { type: "negative", icon: GoSmiley }),
              /* @__PURE__ */ jsx(IconButton, { type: "smallNegative", icon: GoSmiley }),
              /* @__PURE__ */ jsx(IconButton, { type: "unstyled", icon: GoSmiley }),
              /* @__PURE__ */ jsx(IconButton, { type: "smallUnstyled", icon: GoSmiley })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(VStackFull, { children: [
            /* @__PURE__ */ jsx(SectionHeading, { id: "transitions", heading: "Transitions" }),
            /* @__PURE__ */ jsx(StyledExampleWrap, { children: transitions.map((transition) => /* @__PURE__ */ jsx(
              StyleExampleBox,
              {
                className: "transition-300 bg-col-200 hover:bg-col-900\n              hover:text-col-100 shadowNarrowNormal",
                text: `className='${transition}'`
              },
              transition
            )) }),
            /* @__PURE__ */ jsx(SectionHeading, { id: "shadow", heading: "Shadows" }),
            /* @__PURE__ */ jsxs(VStackFull, { children: [
              " ",
              /* @__PURE__ */ jsx(StyledExampleWrap, { bg: "bg-col-100", children: shadowsLightBack.map((shadow) => /* @__PURE__ */ jsx(Box, { className: shadow, children: /* @__PURE__ */ jsx(Text, { className: "p-[1vh]", children: shadow }) }, shadow)) }),
              /* @__PURE__ */ jsx(StyledExampleWrap, { bg: "bg-col-800", children: shadowsDarkBack.map((shadow) => /* @__PURE__ */ jsx(Box, { className: shadow, children: /* @__PURE__ */ jsx(Text, { className: "text-col-100 p-[1vh]", children: shadow }) }, shadow)) })
            ] }),
            /* @__PURE__ */ jsx(SectionHeading, { id: "borders", heading: "Borders" }),
            /* @__PURE__ */ jsx(StyledExampleWrap, { children: /* @__PURE__ */ jsx(BorderExamples, { startIndex: 0, endIndex: 95 }) }),
            /* @__PURE__ */ jsx(StyledExampleWrap, { bg: "bg-col-200", children: /* @__PURE__ */ jsx(
              BorderExamples,
              {
                startIndex: 96,
                endIndex: 215,
                textColor: "text-col-900"
              }
            ) }),
            /* @__PURE__ */ jsx(SectionHeading, { id: "text", heading: "Text" }),
            /* @__PURE__ */ jsx(StyledExampleWrap, { children: textExamples.map((textExample, index) => /* @__PURE__ */ jsx(
              Box,
              {
                className: "bg-col-500 h-fit text-col-100 shadowNarrowNormal px-[1vh]",
                children: /* @__PURE__ */ jsx(Text, { className: `${textExample} `, children: textExample })
              },
              index
            )) }),
            /* @__PURE__ */ jsx(SectionHeading, { id: "", heading: "Text Shadow" }),
            /* @__PURE__ */ jsx(StyledExampleWrap, { children: textShadows.map((shadow, index) => /* @__PURE__ */ jsx(
              Box,
              {
                className: shadow === "textFog" ? "text-col-100 bg-col-200 shadowNarrowNormal p-[1vh]" : "text-col-900 bg-col-200 shadowNarrowNormal p-[1vh]",
                children: /* @__PURE__ */ jsx(Text, { className: `${shadow} `, children: shadow })
              },
              index
            )) }),
            /* @__PURE__ */ jsx(SectionHeading, { id: "", heading: "Text Stroke" }),
            /* @__PURE__ */ jsx(StyledExampleWrap, { children: textStrokeDarkBg.map((combo, index) => /* @__PURE__ */ jsx(Box, { className: "font-bold", children: /* @__PURE__ */ jsx(Text, { className: `${combo} text-xxl-normal text-col-700`, children: combo }) }, index)) }),
            /* @__PURE__ */ jsx(StyledExampleWrap, { bg: "bg-col-300", children: textStrokeLightBg.map((combo, index) => /* @__PURE__ */ jsx(Box, { className: "font-bold", children: /* @__PURE__ */ jsx(Text, { className: `${combo} text-xxl-normal text-col-300`, children: combo }) }, index)) }),
            /* @__PURE__ */ jsx(SectionHeading, { id: "components", heading: "Components" }),
            /* @__PURE__ */ jsx(StyledExampleWrap, { bg: "bg-col-600", children: /* @__PURE__ */ jsx(ComponentExamples, {}) })
          ] })
        ]
      }
    )
  ] }) });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  StyleExampleBox,
  StyledExampleWrap,
  default: Design
}, Symbol.toStringTag, { value: "Module" }));
function SnapScrollContainer({
  children,
  className
}) {
  return /* @__PURE__ */ jsx(
    Flex,
    {
      className: `overflow-y-auto snap-y scroll-smooth snap-mandatory overflow-x-hidden ${className}`,
      children: /* @__PURE__ */ jsx(VStackFull, { className: "h-fit", gap: "gap-[0px]", children })
    }
  );
}
function SnapScrollPage({
  children,
  className,
  id,
  snapFrom = "base"
}) {
  const snapScrollClassName = snapFrom === "base" ? `snap-start snap-always overflow-x-hidden h-screen ${className}` : snapFrom === "sm" ? `sm:snap-start sm:snap-always overflow-x-hidden h-fit sm:h-screen ${className}` : snapFrom === "md" ? `md:snap-start md:snap-always overflow-x-hidden h-fit md:h-screen ${className}` : snapFrom === "lg" ? `lg:snap-start lg:snap-always overflow-x-hidden h-fit lg:h-screen ${className}` : snapFrom === "xl" ? `xl:snap-start xl:snap-always overflow-x-hidden h-fit xl:h-screen  ${className}` : snapFrom === "xxl" ? `xxl:snap-start xxl:snap-always overflow-x-hidden h-fit xxl:h-screen  ${className}` : snapFrom === "fullHD" ? `fullHD:snap-start fullHD:snap-always overflow-x-hidden h-fit fullHD:h-screen  ${className}` : snapFrom === "quadHD" ? `quadHD:snap-start quadHD:snap-always overflow-x-hidden h-fit quadHD:h-screen  ${className}` : snapFrom === "ultraHD" ? `ultraHD:snap-start ultraHD:snap-always overflow-x-hidden h-fit ultraHD:h-screen  ${className}` : `snap-start snap-always overflow-x-hidden  ${className}`;
  return /* @__PURE__ */ jsx(
    Flex,
    {
      className: `justify-center items-center ${snapScrollClassName} ${className}`,
      id,
      children
    }
  );
}
function NavContainer({
  className,
  children,
  bg = "bg-col-300",
  h = "h-nav",
  isTop = false,
  isBottom = false,
  alignment = "items-center justify-evenly"
}) {
  const locationStyle = isTop ? `top-0 rounded-none  ` : isBottom ? `bottom-0 rounded-b-none` : ``;
  return /* @__PURE__ */ jsx(
    Flex,
    {
      className: `fixed ${locationStyle} left-0 ${h} w-full z-50 items-center justify-center shadowNarrowNormal rounded-none ${className}`,
      children: /* @__PURE__ */ jsx(HStackFull, { className: `h-full pr-[1vh] ${alignment} ${bg} rounded-none`, children })
    }
  );
}
const AnimatedComponentSpring = ({
  children,
  animation = "slideInY",
  xOffset = "40vw",
  yOffset = "20vh",
  zoomInFrom = 0.1,
  zoomOutFrom = 2.5,
  zoomOutXOffset = "60vw",
  zoomOutYOffset = "40vh",
  damping = 10,
  stiffness = 100,
  delay = 0.2,
  className,
  useSpring = true
}) => {
  const getTransition = (isVisible2) => {
    if (useSpring || damping !== void 0 && stiffness !== void 0) {
      return {
        type: "spring",
        damping,
        stiffness,
        delay: isVisible2 ? delay : 0
      };
    } else {
      return {
        delay: isVisible2 ? delay : 0
      };
    }
  };
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const animationVariants = {
    slideInX: {
      hidden: { x: xOffset, opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: getTransition(isVisible)
      }
    },
    slideInY: {
      hidden: { y: yOffset, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: getTransition(isVisible)
      }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: getTransition(isVisible)
      }
    },
    fadeSlideUpperRight: {
      hidden: { x: xOffset, y: `-${yOffset}`, opacity: 0 },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: getTransition(isVisible)
      }
    },
    fadeSlideUpperLeft: {
      hidden: { x: `-${xOffset}`, y: `-${yOffset}`, opacity: 0 },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: getTransition(isVisible)
      }
    },
    fadeSlideLowerRight: {
      hidden: { x: xOffset, y: yOffset, opacity: 0 },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: getTransition(isVisible)
      }
    },
    fadeSlideLowerLeft: {
      hidden: { x: `-${xOffset}`, y: yOffset, opacity: 0 },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: getTransition(isVisible)
      }
    },
    flipUp: {
      hidden: { rotateX: 90, opacity: 0, transformOrigin: "center bottom" },
      visible: {
        rotateX: 0,
        opacity: 1,
        transition: getTransition(isVisible)
      }
    },
    flipDown: {
      hidden: { rotateX: -90, opacity: 0, transformOrigin: "center top" },
      visible: {
        rotateX: 0,
        opacity: 1,
        transition: getTransition(isVisible)
      }
    },
    flipRight: {
      hidden: { rotateY: 90, opacity: 0, transformOrigin: "left center" },
      visible: {
        rotateY: 0,
        opacity: 1,
        transition: getTransition(isVisible)
      }
    },
    flipLeft: {
      hidden: { rotateY: -90, opacity: 0, transformOrigin: "right center" },
      visible: {
        rotateY: 0,
        opacity: 1,
        transition: getTransition(isVisible)
      }
    },
    zoomIn: {
      hidden: { scale: zoomInFrom, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: getTransition(isVisible)
      }
    },
    zoomInUp: {
      hidden: { y: zoomOutYOffset, scale: zoomInFrom, opacity: 0 },
      visible: {
        y: 0,
        scale: 1,
        opacity: 1,
        transition: getTransition(isVisible)
      }
    },
    zoomInDown: {
      hidden: { y: `-${zoomOutYOffset}`, scale: zoomInFrom, opacity: 0 },
      visible: {
        y: 0,
        scale: 1,
        opacity: 1,
        transition: getTransition(isVisible)
      }
    },
    zoomInLeft: {
      hidden: { x: `-${xOffset}`, scale: zoomInFrom, opacity: 0 },
      visible: {
        x: 0,
        scale: 1,
        opacity: 1,
        transition: getTransition(isVisible)
      }
    },
    zoomInRight: {
      hidden: { x: xOffset, scale: zoomInFrom, opacity: 0 },
      visible: {
        x: 0,
        scale: 1,
        opacity: 1,
        transition: getTransition(isVisible)
      }
    },
    zoomOut: {
      hidden: { scale: zoomOutFrom, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: getTransition(isVisible)
      }
    },
    zoomOutUp: {
      hidden: { scale: zoomOutFrom, opacity: 0, y: zoomOutYOffset },
      visible: {
        y: 0,
        scale: 1,
        opacity: 1,
        transition: getTransition(isVisible)
      }
    },
    zoomOutDown: {
      hidden: { scale: zoomOutFrom, opacity: 0, y: `-${zoomOutYOffset}` },
      visible: {
        y: 0,
        scale: 1,
        opacity: 1,
        transition: getTransition(isVisible)
      }
    },
    zoomOutLeft: {
      hidden: { scale: zoomOutFrom, opacity: 0, x: `-${zoomOutXOffset}` },
      visible: {
        x: 0,
        scale: 1,
        opacity: 1,
        transition: getTransition(isVisible)
      }
    },
    zoomOutRight: {
      hidden: { scale: zoomOutFrom, opacity: 0, x: zoomOutXOffset },
      visible: {
        x: 0,
        scale: 1,
        opacity: 1,
        transition: getTransition(isVisible)
      }
    }
  };
  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry2]) => {
        setIsVisible(entry2.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  const variants = animationVariants[animation];
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      ref,
      initial: "hidden",
      animate: isVisible ? "visible" : "hidden",
      variants,
      className,
      children
    }
  );
};
function AnimateOnScrollSpring() {
  return /* @__PURE__ */ jsxs(SnapScrollContainer, { children: [
    /* @__PURE__ */ jsxs(NavContainer, { bg: "bg-col-990", children: [
      /* @__PURE__ */ jsx(Box, { className: "w-[6vw] absolute top-[0.7vh] left-[1vh]", children: /* @__PURE__ */ jsx(IconButton, { icon: ReturnPathIcon, to: "/design#components" }) }),
      /* @__PURE__ */ jsx(FlexFull, { className: "justify-center pl-[6vh]", children: /* @__PURE__ */ jsx(Text, { className: "font-semibold text-md-tight md:text-xl-tight text-col-200", children: "Snap Scroll Animate-On-Scroll Spring" }) })
    ] }),
    /* @__PURE__ */ jsx(Flex, { className: "fixed top-[6vh] left-0 px-[1vh]", children: /* @__PURE__ */ jsxs(
      VStack,
      {
        className: "h-[92vh] justify-around p-[1.5vh] bg-col-150 shadowWideLoose",
        align: "items-start ",
        children: [
          " ",
          AnimationTypes.map((animation, index) => /* @__PURE__ */ jsx(
            CustomNavLink,
            {
              to: String(`#${animation}`),
              useHash: true,
              linkText: animation,
              className: "text-sm-tight md:text-md-tight"
            },
            index
          ))
        ]
      }
    ) }),
    AnimationTypes.map((animation, index) => /* @__PURE__ */ jsx(
      SnapScrollPage,
      {
        className: "w-screen h-screen bg-col-300",
        id: animation,
        children: /* @__PURE__ */ jsx(FlexFull, { className: "justify-center pl-[20vh]", children: /* @__PURE__ */ jsx(
          AnimatedComponentSpring,
          {
            animation,
            className: "bg-col-970 p-[1.5vh] text-col-100 shadowWideLoose",
            delay: 0.4,
            children: /* @__PURE__ */ jsxs("h1", { className: "text-sm-tight md:text-xl-tight font-bold textShadow", children: [
              'animationName="',
              animation,
              '"'
            ] })
          }
        ) })
      },
      index
    ))
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AnimateOnScrollSpring
}, Symbol.toStringTag, { value: "Module" }));
const AnimatedComponent = ({
  children,
  animation = "slideInY",
  duration = 1,
  xOffset = "40vw",
  yOffset = "20vh",
  zoomInFrom = 0.1,
  zoomOutFrom = 2.5,
  zoomOutXOffset = "60vw",
  zoomOutYOffset = "40vh",
  delay = 0.2,
  className
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const animationVariants = {
    slideInX: {
      hidden: { x: xOffset, opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          duration,
          delay: isVisible ? delay : 0
        }
      }
    },
    slideInY: {
      hidden: { y: yOffset, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration,
          delay: isVisible ? delay : 0
        }
      }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration,
          delay: isVisible ? delay : 0
        }
      }
    },
    fadeSlideUpperRight: {
      hidden: { x: xOffset, y: `-${yOffset}`, opacity: 0 },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          duration,
          delay: isVisible ? delay : 0
        }
      }
    },
    fadeSlideUpperLeft: {
      hidden: { x: `-${xOffset}`, y: `-${yOffset}`, opacity: 0 },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          duration,
          delay: isVisible ? delay : 0
        }
      }
    },
    fadeSlideLowerRight: {
      hidden: { x: xOffset, y: yOffset, opacity: 0 },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          duration,
          delay: isVisible ? delay : 0
        }
      }
    },
    fadeSlideLowerLeft: {
      hidden: { x: `-${xOffset}`, y: yOffset, opacity: 0 },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          duration,
          delay: isVisible ? delay : 0
        }
      }
    },
    flipUp: {
      hidden: { rotateX: 90, opacity: 0, transformOrigin: "center bottom" },
      visible: {
        rotateX: 0,
        opacity: 1,
        transition: { duration, delay: isVisible ? delay : 0 }
      }
    },
    flipDown: {
      hidden: { rotateX: -90, opacity: 0, transformOrigin: "center top" },
      visible: {
        rotateX: 0,
        opacity: 1,
        transition: { duration, delay: isVisible ? delay : 0 }
      }
    },
    flipRight: {
      hidden: { rotateY: 90, opacity: 0, transformOrigin: "left center" },
      visible: {
        rotateY: 0,
        opacity: 1,
        transition: { duration, delay: isVisible ? delay : 0 }
      }
    },
    flipLeft: {
      hidden: { rotateY: -90, opacity: 0, transformOrigin: "right center" },
      visible: {
        rotateY: 0,
        opacity: 1,
        transition: { duration, delay: isVisible ? delay : 0 }
      }
    },
    zoomIn: {
      hidden: { scale: zoomInFrom, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: { duration, delay: isVisible ? delay : 0 }
      }
    },
    zoomInUp: {
      hidden: { y: zoomOutYOffset, scale: zoomInFrom, opacity: 0 },
      visible: {
        y: 0,
        scale: 1,
        opacity: 1,
        transition: { duration, delay: isVisible ? delay : 0 }
      }
    },
    zoomInDown: {
      hidden: { y: `-${zoomOutYOffset}`, scale: zoomInFrom, opacity: 0 },
      visible: {
        y: 0,
        scale: 1,
        opacity: 1,
        transition: { duration, delay: isVisible ? delay : 0 }
      }
    },
    zoomInLeft: {
      hidden: { x: `-${xOffset}`, scale: zoomInFrom, opacity: 0 },
      visible: {
        x: 0,
        scale: 1,
        opacity: 1,
        transition: { duration, delay: isVisible ? delay : 0 }
      }
    },
    zoomInRight: {
      hidden: { x: xOffset, scale: zoomInFrom, opacity: 0 },
      visible: {
        x: 0,
        scale: 1,
        opacity: 1,
        transition: { duration, delay: isVisible ? delay : 0 }
      }
    },
    zoomOut: {
      hidden: { scale: zoomOutFrom, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: { duration, delay: isVisible ? delay : 0 }
      }
    },
    zoomOutUp: {
      hidden: { scale: zoomOutFrom, opacity: 0, y: zoomOutYOffset },
      visible: {
        y: 0,
        scale: 1,
        opacity: 1,
        transition: { duration, delay: isVisible ? delay : 0 }
      }
    },
    zoomOutDown: {
      hidden: { scale: zoomOutFrom, opacity: 0, y: `-${zoomOutYOffset}` },
      visible: {
        y: 0,
        scale: 1,
        opacity: 1,
        transition: { duration, delay: isVisible ? delay : 0 }
      }
    },
    zoomOutLeft: {
      hidden: { scale: zoomOutFrom, opacity: 0, x: `-${zoomOutXOffset}` },
      visible: {
        x: 0,
        scale: 1,
        opacity: 1,
        transition: { duration, delay: isVisible ? delay : 0 }
      }
    },
    zoomOutRight: {
      hidden: { scale: zoomOutFrom, opacity: 0, x: zoomOutXOffset },
      visible: {
        x: 0,
        scale: 1,
        opacity: 1,
        transition: { duration, delay: isVisible ? delay : 0 }
      }
    }
  };
  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry2]) => {
        setIsVisible(entry2.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  const variants = animationVariants[animation];
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      ref,
      initial: "hidden",
      animate: isVisible ? "visible" : "hidden",
      variants,
      className,
      children
    }
  );
};
function AnimateOnScroll() {
  return /* @__PURE__ */ jsxs(SnapScrollContainer, { children: [
    /* @__PURE__ */ jsxs(NavContainer, { bg: "bg-col-990", children: [
      /* @__PURE__ */ jsx(Box, { className: "w-[6vw] absolute top-[0.7vh] left-[1vh]", children: /* @__PURE__ */ jsx(IconButton, { icon: ReturnPathIcon, to: "/design#components" }) }),
      /* @__PURE__ */ jsx(FlexFull, { className: "justify-center pl-[6vh]", children: /* @__PURE__ */ jsx(Text, { className: "font-semibold text-md-tight md:text-xl-tight text-col-200", children: "Snap Scroll Animate-On-Scroll Duration" }) })
    ] }),
    /* @__PURE__ */ jsx(Flex, { className: "fixed top-[6vh] left-0 px-[1vh]", children: /* @__PURE__ */ jsxs(
      VStack,
      {
        className: "h-[92vh] justify-around p-[1.5vh] bg-col-150 shadowWideLoose",
        align: "items-start ",
        children: [
          " ",
          AnimationTypes.map((animation, index) => /* @__PURE__ */ jsx(
            CustomNavLink,
            {
              to: String(`#${animation}`),
              useHash: true,
              linkText: animation,
              className: "text-sm-tight md:text-md-tight"
            },
            index
          ))
        ]
      }
    ) }),
    AnimationTypes.map((animation, index) => /* @__PURE__ */ jsx(
      SnapScrollPage,
      {
        className: "w-screen h-screen bg-col-300",
        id: animation,
        children: /* @__PURE__ */ jsx(FlexFull, { className: "justify-center pl-[20vh]", children: /* @__PURE__ */ jsx(
          AnimatedComponent,
          {
            animation,
            className: "bg-col-970 p-[1.5vh] text-col-100 shadowWideLoose",
            delay: 0.4,
            duration: 1,
            children: /* @__PURE__ */ jsxs("h1", { className: "text-sm-tight md:text-xl-tight font-bold textShadow", children: [
              'animationName="',
              animation,
              '"'
            ] })
          }
        ) })
      },
      index
    ))
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AnimateOnScroll
}, Symbol.toStringTag, { value: "Module" }));
function TestBox({
  item,
  index,
  itemRefs
}) {
  const backgroundOptions = [
    "bg-300-linear1op50 text-col-900 text-stroke-7-900 lightTextShadow",
    "bg-100-linear2op50 text-col-900 text-stroke-7-900 lightTextShadow",
    "bg-600-radial3op25 text-col-100 text-stroke-7-100 textShadow",
    "bg-800-diagonal1op75 text-col-900 text-stroke-7-900 lightTextShadow",
    "bg-900-diagonal1op75 text-col-100 text-stroke-7-100 textShadow"
  ];
  const randomBackground = index % 2 === 0 ? backgroundOptions[0] : index % 3 === 0 ? backgroundOptions[4] : index % 5 === 0 ? backgroundOptions[3] : index % 7 === 0 ? backgroundOptions[2] : backgroundOptions[1];
  return /* @__PURE__ */ jsx(Transition, { duration: 0.6, delay: 0.5, children: /* @__PURE__ */ jsx(
    "div",
    {
      "data-id": item.id,
      ref: (el) => itemRefs.current[index] = el,
      className: `h-[30vh] w-[25vh] p-[2vh]`,
      children: /* @__PURE__ */ jsxs(
        VStack,
        {
          gap: "gap-[3vh]",
          className: `w-full h-full border-150-lg font-cursive ${randomBackground} flex justify-center items-center lightGlowMd`,
          children: [
            /* @__PURE__ */ jsx(Text, { className: "text-xxxl-tight tracking-wider", children: item.text }),
            /* @__PURE__ */ jsx(Text, { className: "text-xxl-tight", children: "😀" })
          ]
        }
      )
    },
    item.id
  ) });
}
function LoadingBar({ children }) {
  return /* @__PURE__ */ jsx(Flex, { className: "h-[6vh] w-[75vw] border-500-md bg-col-400 rounded-3vh justify-center items-center text-xl-tight lightTextShadow text-col-900 font-semibold shadowNarrowTight", children });
}
function MasonryBox({
  item,
  index,
  itemRefs
}) {
  return /* @__PURE__ */ jsx(Transition, { duration: 0.6, children: /* @__PURE__ */ jsx(
    "div",
    {
      "data-id": item.id,
      ref: (el) => itemRefs.current[index] = el,
      className: `${item.height} w-[98vw] sm:w-[80vw] md:w-[50vw] xl:w-[33.3vw] fullHD:w-[25vw] p-[1.5vh] overflow-hidden`,
      children: /* @__PURE__ */ jsxs(Box, { className: "w-full h-full overflow-hidden rounded-[3vh] shadowWideLoose", children: [
        " ",
        /* @__PURE__ */ jsx(
          Image,
          {
            src: item.image,
            alt: "random",
            w: "w-full",
            className: "w-full h-full object-cover object-center border-970-sm rounded-[3vh]"
          }
        )
      ] })
    },
    item.id
  ) });
}
const fetchItems$1 = (startIndex, limit = 20) => {
  return Array.from({ length: limit }, (_, index) => ({
    id: startIndex + index,
    text: `Item ${startIndex + index}`
  }));
};
function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleItems, setVisibleItems] = useState(/* @__PURE__ */ new Set());
  const itemRefs = useRef([]);
  useEffect(() => {
    setItems(fetchItems$1(0));
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry2) => {
          const id = Number(entry2.target.getAttribute("data-id"));
          setVisibleItems((prevVisibleItems) => {
            const updatedVisibleItems = new Set(prevVisibleItems);
            if (entry2.isIntersecting) {
              updatedVisibleItems.add(id);
            } else {
              updatedVisibleItems.delete(id);
            }
            return updatedVisibleItems;
          });
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.1
        // Adjust based on when you consider the item to be visible
      }
    );
    itemRefs.current.forEach((ref) => {
      if (ref)
        observer.observe(ref);
    });
    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref)
          observer.unobserve(ref);
      });
    };
  }, [items]);
  useEffect(() => {
    console.log(
      "Visible Items:",
      Array.from(visibleItems).map((id) => `${id}`)
    );
  }, [visibleItems]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);
          setTimeout(() => {
            setItems((prevItems) => {
              const newItems = [...prevItems, ...fetchItems$1(prevItems.length)];
              itemRefs.current = itemRefs.current.slice(0, prevItems.length).concat(
                new Array(newItems.length - prevItems.length).fill(null)
              );
              return newItems;
            });
            setLoading(false);
          }, 2500);
        }
      },
      {
        rootMargin: "100px"
      }
    );
    const target = document.querySelector("#scroll-down-trigger");
    if (target)
      observer.observe(target);
    return () => {
      if (target)
        observer.unobserve(target);
    };
  }, [loading]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Flex, { className: "fixed top-0 left-0 h-[6vh] bg-100-radial1op75 rounded-none text-col-900 w-full text-center shadowNarrowTight justify-center items-center gap-[2vh]", children: [
      /* @__PURE__ */ jsx(Flex, { className: "w-[8vw] justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(IconButton, { icon: ReturnPathIcon, to: "/design#components" }) }),
      /* @__PURE__ */ jsxs(HStackFull, { className: "h-full justify-center items-center", children: [
        /* @__PURE__ */ jsx(Flex, { className: "w-35% justify-end boldTextGlow ", children: /* @__PURE__ */ jsx(Text, { className: "text-md-tighter", children: "Intersection Observer - " }) }),
        /* @__PURE__ */ jsx(Flex, { className: "w-65% text-left items-end", children: /* @__PURE__ */ jsxs(Text, { className: "text-md-tight lightTextShadow font-semibold h-full", children: [
          "items: ",
          Array.from(visibleItems).map((id) => `${id} | `)
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Wrap, { className: "justify-around items-start gap-5vh px-[2vh] pt-[7vh] gap-y-[1vh] h-[100vh] overflow-y-auto bg-100-linear6op75", children: [
      items.map((item, index) => /* @__PURE__ */ jsx(TestBox, { item, itemRefs, index }, index)),
      !loading && /* @__PURE__ */ jsx("div", { id: "scroll-down-trigger", style: { height: "20px" } }),
      /* @__PURE__ */ jsx(FlexFull, { className: "justify-center pb-[2vh]", children: /* @__PURE__ */ jsx(LoadingBar, { children: loading && /* @__PURE__ */ jsxs(HStack, { children: [
        /* @__PURE__ */ jsx(Text, { className: "text-lg-tight", children: "Loading more items..." }),
        /* @__PURE__ */ jsx(BouncingDots, {})
      ] }) }) })
    ] })
  ] });
}
function InfiniteScrollDemo() {
  return /* @__PURE__ */ jsx(InfiniteScroll, {});
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: InfiniteScrollDemo
}, Symbol.toStringTag, { value: "Module" }));
function MainNavDemo() {
  function NavElement({
    to,
    label,
    icon: IconComponent
  }) {
    return /* @__PURE__ */ jsx(NavLink, { to, children: /* @__PURE__ */ jsxs(HStack, { className: `items-center gap-[0.2vh] p-[0.3vh] `, children: [
      IconComponent && /* @__PURE__ */ jsx(IconComponent, { className: "h-[2.5vh] w-[2.5vh]" }),
      /* @__PURE__ */ jsx(Text, { children: label })
    ] }) });
  }
  return /* @__PURE__ */ jsxs(
    NavContainer,
    {
      bg: "bg-100-diagonal4op25",
      alignment: "justify-between items-center",
      className: "border-b-970-md",
      children: [
        /* @__PURE__ */ jsx(Flex, { className: "h-full items-end w-60% lg:w-40% flex-shrink-0", children: /* @__PURE__ */ jsxs(Flex, { className: "h-[3.7vh] md:h-[4.5vh] w-fit flex-shrink-0", children: [
          " ",
          /* @__PURE__ */ jsx(NavLink, { to: "#home", children: /* @__PURE__ */ jsx(Image, { src: "/images/logo.png", alt: "logo", className: "h-full" }) }),
          " "
        ] }) }),
        /* @__PURE__ */ jsxs(HStackFull, { className: "justify-around hidden lg:flex textShadow", children: [
          /* @__PURE__ */ jsx(NavElement, { to: "#linkOne", label: "Link One", icon: BiSmile }),
          /* @__PURE__ */ jsx(NavElement, { to: "#linkTwo", label: "Link Two", icon: BiSmile }),
          /* @__PURE__ */ jsx(NavElement, { to: "#linkThree", label: "Link Three", icon: BiSmile }),
          /* @__PURE__ */ jsx(NavElement, { to: "#linkFour", label: "Link Four", icon: BiSmile })
        ] }),
        /* @__PURE__ */ jsxs(HStackFull, { className: " w-full justify-around flex lg:hidden", children: [
          /* @__PURE__ */ jsx(
            IconButton,
            {
              label: "link one",
              icon: BiSmile,
              type: "smallNormal",
              to: "#linkOne"
            }
          ),
          /* @__PURE__ */ jsx(
            IconButton,
            {
              label: "link two",
              icon: BiSmile,
              type: "smallNormal",
              to: "#linkTwo"
            }
          ),
          /* @__PURE__ */ jsx(
            IconButton,
            {
              label: "link three",
              icon: BiSmile,
              type: "smallNormal",
              to: "#linkThree"
            }
          ),
          /* @__PURE__ */ jsx(
            IconButton,
            {
              label: "link four",
              icon: BiSmile,
              type: "smallNormal",
              tooltipPlacement: "bottomLeft",
              to: "#linkFour"
            }
          )
        ] })
      ]
    }
  );
}
function MainNavDemoPage() {
  return /* @__PURE__ */ jsxs(VStackFull, { children: [
    /* @__PURE__ */ jsx(VStackFull, { className: "absolute top-0 left-0", children: /* @__PURE__ */ jsx(FlexFull, { children: /* @__PURE__ */ jsx(MainNavDemo, {}) }) }),
    /* @__PURE__ */ jsx(Flex, { className: "w-[20vh] h-[20vh] justify-center items-center", children: /* @__PURE__ */ jsx(IconButton, { icon: ReturnPathIcon, to: "/design#components" }) })
  ] });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MainNavDemoPage
}, Symbol.toStringTag, { value: "Module" }));
const GetGalleryRowHeight = (viewportWidth) => {
  if (viewportWidth >= 1920) {
    const rowHeight = viewportWidth * 0.25;
    const itemsPerRow = 4;
    return { viewportWidth, rowHeight, itemsPerRow };
  }
  if (viewportWidth >= 1280) {
    const rowHeight = viewportWidth * 0.333;
    const itemsPerRow = 3;
    return { viewportWidth, rowHeight, itemsPerRow };
  }
  if (viewportWidth >= 768) {
    const rowHeight = viewportWidth * 0.5;
    const itemsPerRow = 2;
    return { viewportWidth, rowHeight, itemsPerRow };
  }
  if (viewportWidth >= 640) {
    const rowHeight = viewportWidth * 0.8;
    const itemsPerRow = 1;
    return { viewportWidth, rowHeight, itemsPerRow };
  }
  {
    const rowHeight = viewportWidth * 0.98;
    const itemsPerRow = 1;
    return { viewportWidth, rowHeight, itemsPerRow };
  }
};
const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return size;
};
function ViewportBar() {
  const { width } = useWindowSize();
  const { viewportWidth, itemsPerRow } = GetGalleryRowHeight(width);
  return /* @__PURE__ */ jsxs(
    HStackFull,
    {
      className: "fixed z-50 bottom-0 right-0  bg-col-980 rounded-none text-col-100 text-xs-normal md:text-lg xl:text-xl justify-around px-[1vh]",
      gap: "gap-[2vh]",
      children: [
        /* @__PURE__ */ jsxs(Text, { children: [
          "window width: ",
          viewportWidth,
          "px"
        ] }),
        /* @__PURE__ */ jsxs(Text, { children: [
          "items per row: ",
          itemsPerRow
        ] })
      ]
    }
  );
}
const randomHeights = [
  "h-[30vh]",
  "h-[35vh]",
  "h-[40vh]",
  "h-[45vh]",
  "h-[50vh]",
  "h-[55vh]",
  "h-[60vh]"
];
const fetchItems = (startIndex, limit = 20) => {
  return Array.from({ length: limit }, (_, index) => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    return {
      id: startIndex + index,
      image: `https://picsum.photos/seed/${randomNum}/500/900`,
      height: randomHeights[Math.floor(Math.random() * randomHeights.length)]
    };
  });
};
function MasonryGrid() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleItems, setVisibleItems] = useState(/* @__PURE__ */ new Set());
  const itemRefs = useRef([]);
  useEffect(() => {
    setItems(fetchItems(0));
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry2) => {
          const id = Number(entry2.target.getAttribute("data-id"));
          setVisibleItems((prevVisibleItems) => {
            const updatedVisibleItems = new Set(prevVisibleItems);
            if (entry2.isIntersecting) {
              updatedVisibleItems.add(id);
            } else {
              updatedVisibleItems.delete(id);
            }
            return updatedVisibleItems;
          });
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.1
        // Adjust based on when you consider the item to be visible
      }
    );
    itemRefs.current.forEach((ref) => {
      if (ref)
        observer.observe(ref);
    });
    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref)
          observer.unobserve(ref);
      });
    };
  }, [items]);
  useEffect(() => {
    console.log(
      "Visible Items:",
      Array.from(visibleItems).map((id) => `${id}`)
    );
  }, [visibleItems]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);
          setTimeout(() => {
            setItems((prevItems) => {
              const newItems = [...prevItems, ...fetchItems(prevItems.length)];
              itemRefs.current = itemRefs.current.slice(0, prevItems.length).concat(
                new Array(newItems.length - prevItems.length).fill(null)
              );
              return newItems;
            });
            setLoading(false);
          }, 1500);
        }
      },
      {
        rootMargin: "100px"
      }
    );
    const target = document.querySelector("#scroll-down-trigger");
    if (target)
      observer.observe(target);
    return () => {
      if (target)
        observer.unobserve(target);
    };
  }, [loading]);
  return /* @__PURE__ */ jsxs(VStackFull, { className: "items-center h-full pt-[6vh] bg-900-radial2op75", children: [
    /* @__PURE__ */ jsxs(HStackFull, { className: "fixed top-0 left-0 h-[6vh] px-[1.5vh] bg-900-radial3op50 rounded-none shadowNarrowTight justify-between items-center", children: [
      /* @__PURE__ */ jsx(IconButton, { icon: ReturnPathIcon, to: "/design#components" }),
      /* @__PURE__ */ jsx(FlexFull, { className: "md:text-xl-tight font-semibold justify-center text-col-100 textShadow", children: "Remix/Tailwind Infinite Scroll Masonry Grid" })
    ] }),
    /* @__PURE__ */ jsx(ViewportBar, {}),
    /* @__PURE__ */ jsxs(VStackFull, { className: "h-[94vh] overflow-y-auto p-[1vh]", children: [
      /* @__PURE__ */ jsx(Box, { className: "w-full h-fit columns-1 md:columns-2 xl:columns-3 fullHD:columns-4 gap-0", children: items.map((item, index) => /* @__PURE__ */ jsx(
        MasonryBox,
        {
          item,
          itemRefs,
          index
        },
        index
      )) }),
      !loading && /* @__PURE__ */ jsx("div", { id: "scroll-down-trigger", style: { height: "20px" } })
    ] })
  ] });
}
function MasonryGridDemo() {
  return /* @__PURE__ */ jsx(MasonryGrid, {});
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MasonryGridDemo
}, Symbol.toStringTag, { value: "Module" }));
function TextRoute() {
  return /* @__PURE__ */ jsx(VStackFull, { className: "h-full p-[2vh] bg-col-600 overflow-y-auto", children: "This" });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TextRoute
}, Symbol.toStringTag, { value: "Module" }));
function RouteIndex() {
  return /* @__PURE__ */ jsxs("div", { children: [
    "return ",
    /* @__PURE__ */ jsx("div", { className: "text-3xl", children: "Route Index" }),
    ";"
  ] });
}
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RouteIndex
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DNQsbFOK.js?client-route", "imports": ["/assets/jsx-runtime-BfF-YriY.js", "/assets/components-BL27QBWM.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-D6aX2lTf.js?client-route", "imports": ["/assets/jsx-runtime-BfF-YriY.js", "/assets/components-BL27QBWM.js", "/assets/flex-COvQVarW.js", "/assets/layoutContainer-GjrKoGyE.js"], "css": ["/assets/root-B9-cxrwT.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-TNypQogi.js?client-route", "imports": ["/assets/jsx-runtime-BfF-YriY.js", "/assets/flex-COvQVarW.js", "/assets/layoutContainer-GjrKoGyE.js", "/assets/transition-DVSgZb6N.js", "/assets/vStack-xcuHHABo.js", "/assets/components-BL27QBWM.js"], "css": [] }, "routes/design+/_index": { "id": "routes/design+/_index", "parentId": "root", "path": "design/", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-CtHhjTxg.js?client-route", "imports": ["/assets/jsx-runtime-BfF-YriY.js", "/assets/flex-COvQVarW.js", "/assets/transition-DVSgZb6N.js", "/assets/components-BL27QBWM.js", "/assets/vStack-xcuHHABo.js", "/assets/box-BdT0KxCu.js", "/assets/hStackFull-CFb3YDvE.js", "/assets/wrap-SIAqqN24.js", "/assets/vStackFull-BVjnb3Lo.js", "/assets/custonNavLink-CcJZnLvH.js", "/assets/index-ztp-Fbuh.js", "/assets/image-DzzBi0M2.js"], "css": [] }, "routes/design+/animate-on-scroll-spring": { "id": "routes/design+/animate-on-scroll-spring", "parentId": "root", "path": "design/animate-on-scroll-spring", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/animate-on-scroll-spring-OLpMZKsi.js?client-route", "imports": ["/assets/jsx-runtime-BfF-YriY.js", "/assets/components-BL27QBWM.js", "/assets/box-BdT0KxCu.js", "/assets/vStack-xcuHHABo.js", "/assets/flex-COvQVarW.js", "/assets/vStackFull-BVjnb3Lo.js", "/assets/transition-DVSgZb6N.js", "/assets/hStackFull-CFb3YDvE.js", "/assets/custonNavLink-CcJZnLvH.js", "/assets/snapScrollPage-pgr6U6lG.js", "/assets/navContainer-lXWniVTZ.js"], "css": [] }, "routes/design+/animate-on-scroll": { "id": "routes/design+/animate-on-scroll", "parentId": "root", "path": "design/animate-on-scroll", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/animate-on-scroll-BmYGbFzY.js?client-route", "imports": ["/assets/jsx-runtime-BfF-YriY.js", "/assets/components-BL27QBWM.js", "/assets/box-BdT0KxCu.js", "/assets/vStack-xcuHHABo.js", "/assets/flex-COvQVarW.js", "/assets/vStackFull-BVjnb3Lo.js", "/assets/transition-DVSgZb6N.js", "/assets/hStackFull-CFb3YDvE.js", "/assets/custonNavLink-CcJZnLvH.js", "/assets/snapScrollPage-pgr6U6lG.js", "/assets/navContainer-lXWniVTZ.js"], "css": [] }, "routes/design+/infinite-scroll-demo": { "id": "routes/design+/infinite-scroll-demo", "parentId": "root", "path": "design/infinite-scroll-demo", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/infinite-scroll-demo-CrKrJ9ll.js?client-route", "imports": ["/assets/jsx-runtime-BfF-YriY.js", "/assets/flex-COvQVarW.js", "/assets/transition-DVSgZb6N.js", "/assets/components-BL27QBWM.js", "/assets/hStackFull-CFb3YDvE.js", "/assets/box-BdT0KxCu.js", "/assets/image-DzzBi0M2.js", "/assets/vStack-xcuHHABo.js", "/assets/wrap-SIAqqN24.js", "/assets/inifiniteScrollDemoComponents-B_ssEQFC.js"], "css": [] }, "routes/design+/main-nav-demo": { "id": "routes/design+/main-nav-demo", "parentId": "root", "path": "design/main-nav-demo", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/main-nav-demo-CwgFf002.js?client-route", "imports": ["/assets/jsx-runtime-BfF-YriY.js", "/assets/flex-COvQVarW.js", "/assets/transition-DVSgZb6N.js", "/assets/components-BL27QBWM.js", "/assets/hStackFull-CFb3YDvE.js", "/assets/vStack-xcuHHABo.js", "/assets/image-DzzBi0M2.js", "/assets/navContainer-lXWniVTZ.js", "/assets/index-ztp-Fbuh.js", "/assets/vStackFull-BVjnb3Lo.js"], "css": [] }, "routes/design+/masonry-grid-demo": { "id": "routes/design+/masonry-grid-demo", "parentId": "root", "path": "design/masonry-grid-demo", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/masonry-grid-demo-D9gLdGWs.js?client-route", "imports": ["/assets/jsx-runtime-BfF-YriY.js", "/assets/flex-COvQVarW.js", "/assets/transition-DVSgZb6N.js", "/assets/components-BL27QBWM.js", "/assets/hStackFull-CFb3YDvE.js", "/assets/box-BdT0KxCu.js", "/assets/image-DzzBi0M2.js", "/assets/vStack-xcuHHABo.js", "/assets/inifiniteScrollDemoComponents-B_ssEQFC.js", "/assets/vStackFull-BVjnb3Lo.js"], "css": [] }, "routes/design+/test": { "id": "routes/design+/test", "parentId": "root", "path": "design/test", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/test-CV496_6h.js?client-route", "imports": ["/assets/jsx-runtime-BfF-YriY.js", "/assets/vStack-xcuHHABo.js", "/assets/vStackFull-BVjnb3Lo.js"], "css": [] }, "routes/flat-route+/_index": { "id": "routes/flat-route+/_index", "parentId": "root", "path": "flat-route/", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-BXMvnfxf.js?client-route", "imports": ["/assets/jsx-runtime-BfF-YriY.js"], "css": [] } }, "url": "/assets/manifest-23f86c54.js", "version": "23f86c54" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/design+/_index": {
    id: "routes/design+/_index",
    parentId: "root",
    path: "design/",
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/design+/animate-on-scroll-spring": {
    id: "routes/design+/animate-on-scroll-spring",
    parentId: "root",
    path: "design/animate-on-scroll-spring",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/design+/animate-on-scroll": {
    id: "routes/design+/animate-on-scroll",
    parentId: "root",
    path: "design/animate-on-scroll",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/design+/infinite-scroll-demo": {
    id: "routes/design+/infinite-scroll-demo",
    parentId: "root",
    path: "design/infinite-scroll-demo",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/design+/main-nav-demo": {
    id: "routes/design+/main-nav-demo",
    parentId: "root",
    path: "design/main-nav-demo",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/design+/masonry-grid-demo": {
    id: "routes/design+/masonry-grid-demo",
    parentId: "root",
    path: "design/masonry-grid-demo",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/design+/test": {
    id: "routes/design+/test",
    parentId: "root",
    path: "design/test",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/flat-route+/_index": {
    id: "routes/flat-route+/_index",
    parentId: "root",
    path: "flat-route/",
    index: true,
    caseSensitive: void 0,
    module: route9
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
