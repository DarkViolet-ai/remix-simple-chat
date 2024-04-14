/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin");

// MAKING A PLUGIN:
// const NameOfPlugin = plugin(function ({ addUtilities }) {
//   const utilities = {
//     ".className": { styles },
//   };

//   addUtilities(utilities, ["responsive", "hover"]);
// });

// const NameOfPlugin = plugin(function ({ addUtilities }) {
//   const utilities = {
//     ".className": { styles },
//   };

//   addUtilities(utilities, ["responsive", "hover"]);
// });
const transitionTimingFunctionsPlugin = plugin(function ({
  addUtilities,
  theme,
}) {
  const timingFunctions = theme("transitionTimingFunction");
  const newUtilities = Object.keys(timingFunctions).reduce((acc, key) => {
    // Creating shorter class names, e.g., .ease-elastic
    const name = `.ease-${key}`;
    acc[name] = { transitionTimingFunction: timingFunctions[key] };
    return acc;
  }, {});

  addUtilities(newUtilities, ["responsive", "hover"]);
});

const transformStyles = plugin(function ({ addUtilities }) {
  const utilities = {
    ".transform-style-3d": {
      transformStyle: "preserve-3d",
    },
    // Add more custom utilities as needed
  };
  addUtilities(utilities, ["responsive", "hover"]);
});

const backfaceVisibilityPlugin = plugin(function ({ addUtilities }) {
  const utilities = {
    ".backface-visible": {
      "backface-visibility": "visible",
    },
    ".backface-hidden": {
      "backface-visibility": "hidden",
    },
  };

  addUtilities(utilities, ["responsive", "hover"]);
});

const perspectivePlugin = plugin(function ({ addUtilities }) {
  const utilities = {
    ".perspective-30": { perspective: "30vh" },
    ".perspective-40": { perspective: "40vh" },
    ".perspective-50": { perspective: "50vh" },
    ".perspective-60": { perspective: "60vh" },
    ".perspective-70": { perspective: "70vh" },
    ".perspective-80": { perspective: "80vh" },
    ".perspective-90": { perspective: "90vh" },
    ".perspective-100": { perspective: "100vh" },
    ".perspective-110": { perspective: "110vh" },
    ".perspective-120": { perspective: "120vh" },
    ".perspective-130": { perspective: "130vh" },
    ".perspective-140": { perspective: "140vh" },
    ".perspective-150": { perspective: "150vh" },
    ".perspective-160": { perspective: "160vh" },
    ".perspective-170": { perspective: "170vh" },
    ".perspective-180": { perspective: "180vh" },
    ".perspective-190": { perspective: "190vh" },
    ".perspective-200": { perspective: "200vh" },
  };

  addUtilities(utilities, ["responsive", "hover"]);
});

const rotateYPlugin = plugin(function ({ addUtilities }) {
  const utilities = {
    ".rotate-y-0": {
      transform: "rotateY(0deg)",
    },
    ".rotate-y-15": {
      transform: "rotateY(15deg)",
    },
    ".rotate-y-45": {
      transform: "rotateY(45deg)",
    },
    ".rotate-y-60": {
      transform: "rotateY(60deg)",
    },
    ".rotate-y-90": {
      transform: "rotateY(90deg)",
    },
    ".rotate-y-105": {
      transform: "rotateY(105deg)",
    },
    ".rotate-y-180": {
      transform: "rotateY(180deg)",
    },
  };

  addUtilities(utilities, ["responsive", "hover"]);
});

const buttonStyles = plugin(function ({ addUtilities, theme }) {
  // Base styles for all buttons, excluding shadow properties
  const baseButtonStyles = {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: "0.2vh",
    transition: "all 0.4s ease-in-out",
  };

  // Function to generate button styles with specific colors and shadows
  function generateButtonStyles(
    fontSize,
    height,
    bgColor,
    color,
    borderColor,
    hoverBgColor,
    hoverColor,
    hoverBorderColor,
    hoverTextStrokeWidth = "0.1vh"
  ) {
    return {
      ...baseButtonStyles,
      fontSize,
      height,
      backgroundColor: theme(`colors.${bgColor}`, "transparent"),
      color: theme(`colors.${color}`, "currentColor"),
      borderColor: theme(`colors.${borderColor}`, "transparent"),
      boxShadow: theme("boxShadow.shadowNarrowNormal"),
      textShadow: theme("textShadow.textShadow"),
      "&:hover": {
        backgroundColor: theme(`colors.${hoverBgColor}`, "transparent"),
        color: theme(`colors.${hoverColor}`, "currentColor"),
        borderColor: theme(`colors.${hoverBorderColor}`, "transparent"),
        boxShadow: theme("boxShadow.metallicEdgesMd"),
        textShadow: theme("textShadow.lightTextShadow"),
        "-webkit-text-stroke-width": hoverTextStrokeWidth,
        "-webkit-text-stroke-color": theme(
          `colors.${hoverBorderColor}`,
          "currentColor"
        ), // Use the border color for stroke color on hover
      },
    };
  }

  // Function to generate unstyled button styles without shadows
  function generateUnstyledButtonStyles(fontSize, height) {
    return {
      ...baseButtonStyles,
      fontSize,
      height,
      backgroundColor: "transparent",
      color: "currentColor",
      borderColor: "transparent",
      boxShadow: "none", // No box shadow for unstyled buttons
      "&:hover": {
        backgroundColor: "transparent",
        color: "currentColor",
        borderColor: "transparent",
        boxShadow: "none", // No box shadow on hover for unstyled buttons
      },
    };
  }

  // Utilities for specific button types
  const utilities = {
    ".normalButtonStyles": generateButtonStyles(
      "2.1vh", // fontSize
      "3.5vh", // height
      "col.700", // bgColor
      "col.100", // color
      "col.500", // borderColor
      "col.300", // hoverBgColor
      "col.900", // hoverColor
      "col.970" //hoverBorderColor
    ),
    ".smallButtonStyles": generateButtonStyles(
      "1.6vh", // fontSize
      "2.9vh", // height
      "col.700", // bgColor
      "col.100", // color
      "col.500", // borderColor
      "col.300", // hoverBgColor
      "col.900", // hoverColor
      "col.970" //hoverBorderColor
    ),
    ".negativeButtonStyles": generateButtonStyles(
      "2.1vh", // fontSize
      "3.5vh", // height
      "red.400", // bgColor
      "col.100", // color
      "red.800", // borderColor
      "col.200", // hoverBgColor
      "red.800", // hoverColor
      "red.800" //hoverBorderColor
    ),
    ".smallNegativeButtonStyles": generateButtonStyles(
      "1.6vh", // fontSize
      "2.9vh", // height
      "red.400", // bgColor
      "col.100", // color
      "red.800", // borderColor
      "col.200", // hoverBgColor
      "red.800", // hoverColor
      "red.800" //hoverBorderColor
    ),
    ".unstyledButtonStyles": generateUnstyledButtonStyles("2.1vh", "3.5vh"),
    ".smallUnstyledButtonStyles": generateUnstyledButtonStyles(
      "1.6vh",
      "2.9vh"
    ),
  };

  addUtilities(utilities, ["responsive", "hover"]);
});

const typographyPlugin = plugin(function ({ addUtilities }) {
  const utilities = {
    ".text-xs-tighter": { fontSize: "1.2vh", lineHeight: "1.2vh" },
    ".text-xs-normal": { fontSize: "1.2vh", lineHeight: "1.8vh" },
    ".text-xs-tight": { fontSize: "1.2vh", lineHeight: "1.4vh" },
    ".text-xs-loose": { fontSize: "1.2vh", lineHeight: "2.2vh" },
    ".text-xs-looser": { fontSize: "1.2vh", lineHeight: "2.6vh" },

    ".text-sm-tighter": { fontSize: "1.5vh", lineHeight: "1.5vh" },
    ".text-sm-normal": { fontSize: "1.5vh", lineHeight: "2.1vh" },
    ".text-sm-tight": { fontSize: "1.5vh", lineHeight: "1.7vh" },
    ".text-sm-loose": { fontSize: "1.5vh", lineHeight: "2.5vh" },
    ".text-sm-looser": { fontSize: "1.5vh", lineHeight: "2.9vh" },

    ".text-md-tighter": { fontSize: "2vh", lineHeight: "2vh" },
    ".text-md-normal": { fontSize: "2vh", lineHeight: "2.5vh" },
    ".text-md-tight": { fontSize: "2vh", lineHeight: "2.2vh" },
    ".text-md-loose": { fontSize: "2vh", lineHeight: "3vh" },
    ".text-md-looser": { fontSize: "2vh", lineHeight: "3.9vh" },

    ".text-lg-tighter": { fontSize: "2.4vh", lineHeight: "2.4vh" },
    ".text-lg-normal": { fontSize: "2.4vh", lineHeight: "3vh" },
    ".text-lg-tight": { fontSize: "2.4vh", lineHeight: "2.6vh" },
    ".text-lg-loose": { fontSize: "2.4vh", lineHeight: "3.4vh" },
    ".text-lg-looser": { fontSize: "2.4vh", lineHeight: "3.8vh" },

    ".text-xl-tighter": { fontSize: "3.1vh", lineHeight: "3.1vh" },
    ".text-xl-normal": { fontSize: "3.1vh", lineHeight: "3.7vh" },
    ".text-xl-tight": { fontSize: "3.1vh", lineHeight: "3.2vh" },
    ".text-xl-loose": { fontSize: "3.1vh", lineHeight: "4.1vh" },
    ".text-xl-looser": { fontSize: "3.1vh", lineHeight: "4.5vh" },

    ".text-xxl-tighter": { fontSize: "3.6vh", lineHeight: "3.6vh" },
    ".text-xxl-normal": { fontSize: "3.6vh", lineHeight: "4.2vh" },
    ".text-xxl-tight": { fontSize: "3.6vh", lineHeight: "3.8vh" },
    ".text-xxl-loose": { fontSize: "3.6vh", lineHeight: "4.6vh" },
    ".text-xxl-looser": { fontSize: "3.6vh", lineHeight: "5vh" },

    ".text-xxxl-tighter": { fontSize: "4.1vh", lineHeight: "4.1vh" },
    ".text-xxxl-normal": { fontSize: "4.1vh", lineHeight: "4.7vh" },
    ".text-xxxl-tight": { fontSize: "4.1vh", lineHeight: "4.3vh" },
    ".text-xxxl-loose": { fontSize: "4.1vh", lineHeight: "5.1vh" },
    ".text-xxxl-looser": { fontSize: "4.1vh", lineHeight: "5.5vh" },

    ".text-mega-tighter": { fontSize: "4.3vh", lineHeight: "4.3vh" },
    ".text-mega-normal": { fontSize: "4.3vh", lineHeight: "4.9vh" },
    ".text-mega-tight": { fontSize: "4.3vh", lineHeight: "4.5vh" },
    ".text-mega-loose": { fontSize: "4.3vh", lineHeight: "5.3vh" },
    ".text-mega-looser": { fontSize: "4.3vh", lineHeight: "5.7vh" },

    ".text-too-big-tighter": { fontSize: "4.5vh", lineHeight: "4.5vh" },
    ".text-too-big-normal": { fontSize: "4.5vh", lineHeight: "5.1vh" },
    ".text-too-big-tight": { fontSize: "4.5vh", lineHeight: "4.7vh" },
    ".text-too-big-loose": { fontSize: "4.5vh", lineHeight: "5.5vh" },
    ".text-too-big-looser": { fontSize: "4.5vh", lineHeight: "5.9vh" },

    ".text-insane-tighter": { fontSize: "5.1vh", lineHeight: "5.1vh" },
    ".text-insane-normal": { fontSize: "5.1vh", lineHeight: "5.7vh" },
    ".text-insane-tight": { fontSize: "5.1vh", lineHeight: "5.3vh" },
    ".text-insane-loose": { fontSize: "5.1vh", lineHeight: "6.1vh" },
    ".text-insane-looser": { fontSize: "5.1vh", lineHeight: "6.5vh" },
  };

  addUtilities(utilities, ["responsive", "hover"]);
});

const customBackgroundsPlugin = plugin(function ({ addUtilities, theme }) {
  const generateBackgroundUtilities = () => {
    const utilities = {};
    // Assuming you have defined your colors under 'colors.col' and gradients under 'backgroundImage'
    const colors = theme("colors.col", {});
    const gradients = theme("backgroundImage", {});

    Object.keys(colors).forEach((color) => {
      Object.keys(gradients).forEach((gradient) => {
        const className = `.bg-${color}-${gradient.replace(/\./g, "-")}`; // Sanitizing class name
        utilities[className] = {
          backgroundColor: colors[color],
          backgroundImage: gradients[gradient],
        };
      });
    });

    return utilities;
  };

  addUtilities(generateBackgroundUtilities(), ["responsive", "hover"]);
});

const customBordersPlugin = plugin(function ({ addUtilities, theme }) {
  // Define the sizes with corresponding border widths
  const sizes = {
    sm: "0.1vh",
    md: "0.2vh",
    lg: "0.3vh",
    xl: "0.4vh",
  };

  // Colors to iterate over
  const colorKeys = [
    "100",
    "190",
    "180",
    "170",
    "160",
    "150",
    "200",
    "290",
    "280",
    "270",
    "260",
    "250",
    "300",
    "390",
    "380",
    "370",
    "360",
    "350",
    "400",
    "490",
    "480",
    "470",
    "460",
    "450",
    "500",
    "590",
    "580",
    "570",
    "560",
    "550",
    "600",
    "690",
    "680",
    "670",
    "660",
    "650",
    "700",
    "790",
    "780",
    "770",
    "760",
    "750",
    "800",
    "890",
    "880",
    "870",
    "860",
    "850",
    "900",
    "990",
    "980",
    "970",
    "960",
    "950",
  ];

  const borderUtilities = {};

  // Iterate over each size
  Object.entries(sizes).forEach(([size, borderWidth]) => {
    // For each color
    colorKeys.forEach((color) => {
      const colorKey = `col.${color}`;
      const borderColor = theme(`colors.${colorKey}`, "currentColor");

      // Generate utility for each size and color
      borderUtilities[`.border-${color}-${size}`] = {
        borderWidth: borderWidth,
        borderStyle: "solid",
        borderColor: borderColor,
      };

      // Optional: Generate hover state utilities if needed
      borderUtilities[`.hover\\:border-${color}-${size}:hover`] = {
        borderWidth: borderWidth,
        borderStyle: "solid",
        borderColor: borderColor,
      };

      // Optional: Generate utilities for specific sides if needed (e.g., bottom border)
      borderUtilities[`.border-b-${color}-${size}`] = {
        borderBottomWidth: borderWidth,
        borderStyle: "solid",
        borderBottomColor: borderColor,
      };
    });
  });

  // Add the generated utilities to Tailwind
  addUtilities(borderUtilities, ["responsive", "hover"]);
});

export default {
  content: ["./app/**/*.{tsx,ts,jsx,js}"],
  theme: {
    extend: {
      colors: {
        col: {
          100: "rgba(228, 237, 245, 1)",
          110: "rgba(228, 237, 245, 0.1)",
          120: "rgba(228, 237, 245, 0.2)",
          130: "rgba(228, 237, 245, 0.3)",
          140: "rgba(228, 237, 245, 0.4)",
          150: "rgba(228, 237, 245, 0.5)",
          160: "rgba(228, 237, 245, 0.6)",
          170: "rgba(228, 237, 245, 0.7)",
          180: "rgba(228, 237, 245, 0.8)",
          190: "rgba(228, 237, 245, 0.9)",

          200: "rgba(208, 226, 242, 1)",
          210: "rgba(208, 226, 242, 0.1)",
          220: "rgba(208, 226, 242, 0.2)",
          230: "rgba(208, 226, 242, 0.3)",
          240: "rgba(208, 226, 242, 0.4)",
          250: "rgba(208, 226, 242, 0.5)",
          260: "rgba(208, 226, 242, 0.6)",
          270: "rgba(208, 226, 242, 0.7)",
          280: "rgba(208, 226, 242, 0.8)",
          290: "rgba(208, 226, 242, 0.9)",

          300: "rgba(217, 181, 173, 1)",
          310: "rgba(217, 181, 173, 0.1)",
          320: "rgba(217, 181, 173, 0.2)",
          330: "rgba(217, 181, 173, 0.3)",
          340: "rgba(217, 181, 173, 0.4)",
          350: "rgba(217, 181, 173, 0.5)",
          360: "rgba(217, 181, 173, 0.6)",
          370: "rgba(217, 181, 173, 0.7)",
          380: "rgba(217, 181, 173, 0.8)",
          390: "rgba(217, 181, 173, 0.9)",

          400: "rgba(167, 189, 217, 1)",
          410: "rgba(167, 189, 217, 0.1)",
          420: "rgba(167, 189, 217, 0.2)",
          430: "rgba(167, 189, 217, 0.3)",
          440: "rgba(167, 189, 217, 0.4)",
          450: "rgba(167, 189, 217, 0.5)",
          460: "rgba(167, 189, 217, 0.6)",
          470: "rgba(167, 189, 217, 0.7)",
          480: "rgba(167, 189, 217, 0.8)",
          490: "rgba(167, 189, 217, 0.9)",

          500: "rgba(84, 123, 171, 1)",
          510: "rgba(84, 123, 171, 0.1)",
          520: "rgba(84, 123, 171, 0.2)",
          530: "rgba(84, 123, 171, 0.3)",
          540: "rgba(84, 123, 171, 0.4)",
          550: "rgba(84, 123, 171, 0.5)",
          560: "rgba(84, 123, 171, 0.6)",
          570: "rgba(84, 123, 171, 0.7)",
          580: "rgba(84, 123, 171, 0.8)",
          590: "rgba(84, 123, 171, 0.9)",

          600: "rgba(97, 116, 140, 1)",
          610: "rgba(97, 116, 140, 0.1)",
          620: "rgba(97, 116, 140, 0.2)",
          630: "rgba(97, 116, 140, 0.3)",
          640: "rgba(97, 116, 140, 0.4)",
          650: "rgba(97, 116, 140, 0.5)",
          660: "rgba(97, 116, 140, 0.6)",
          670: "rgba(97, 116, 140, 0.7)",
          680: "rgba(97, 116, 140, 0.8)",
          690: "rgba(97, 116, 140, 0.9)",

          700: "rgba(41, 60, 84, 1)",
          710: "rgba(41, 60, 84, 0.1)",
          720: "rgba(41, 60, 84, 0.2)",
          730: "rgba(41, 60, 84, 0.3)",
          740: "rgba(41, 60, 84, 0.4)",
          750: "rgba(41, 60, 84, 0.5)",
          760: "rgba(41, 60, 84, 0.6)",
          770: "rgba(41, 60, 84, 0.7)",
          780: "rgba(41, 60, 84, 0.8)",
          790: "rgba(41, 60, 84, 0.9)",

          800: "rgba(1, 42, 94, 1)",
          810: "rgba(1, 42, 94, 0.1)",
          820: "rgba(1, 42, 94, 0.2)",
          830: "rgba(1, 42, 94, 0.3)",
          840: "rgba(1, 42, 94, 0.4)",
          850: "rgba(1, 42, 94, 0.5)",
          860: "rgba(1, 42, 94, 0.6)",
          870: "rgba(1, 42, 94, 0.7)",
          880: "rgba(1, 42, 94, 0.8)",
          890: "rgba(1, 42, 94, 0.9)",

          900: "rgba(1, 17, 38, 1)",
          910: "rgba(1, 17, 38, 0.1)",
          920: "rgba(1, 17, 38, 0.2)",
          930: "rgba(1, 17, 38, 0.3)",
          940: "rgba(1, 17, 38, 0.4)",
          950: "rgba(1, 17, 38, 0.5)",
          960: "rgba(1, 17, 38, 0.6)",
          970: "rgba(1, 17, 38, 0.7)",
          980: "rgba(1, 17, 38, 0.8)",
          990: "rgba(1, 17, 38, 0.9)",
        },
      },
      width: {
        "0%": "0%",
        "1%": "1%",
        "2%": "2%",
        "3%": "3%",
        "4%": "4%",
        "5%": "5%",
        "6%": "6%",
        "7%": "7%",
        "8%": "8%",
        "9%": "9%",
        "10%": "10%",
        "11%": "11%",
        "12%": "12%",
        "13%": "13%",
        "14%": "14%",
        "15%": "15%",
        "16%": "16%",
        "17%": "17%",
        "18%": "18%",
        "19%": "19%",
        "20%": "20%",
        "21%": "21%",
        "22%": "22%",
        "23%": "23%",
        "24%": "24%",
        "25%": "25%",
        "26%": "26%",
        "27%": "27%",
        "28%": "28%",
        "29%": "29%",
        "30%": "30%",
        "31%": "31%",
        "32%": "32%",
        "33%": "33%",
        "34%": "34%",
        "35%": "35%",
        "36%": "36%",
        "37%": "37%",
        "38%": "38%",
        "39%": "39%",
        "40%": "40%",
        "41%": "41%",
        "42%": "42%",
        "43%": "43%",
        "44%": "44%",
        "45%": "45%",
        "46%": "46%",
        "47%": "47%",
        "48%": "48%",
        "49%": "49%",
        "50%": "50%",
        "51%": "51%",
        "52%": "52%",
        "53%": "53%",
        "54%": "54%",
        "55%": "55%",
        "56%": "56%",
        "57%": "57%",
        "58%": "58%",
        "59%": "59%",
        "60%": "60%",
        "61%": "61%",
        "62%": "62%",
        "63%": "63%",
        "64%": "64%",
        "65%": "65%",
        "66%": "66%",
        "67%": "67%",
        "68%": "68%",
        "69%": "69%",
        "70%": "70%",
        "71%": "71%",
        "72%": "72%",
        "73%": "73%",
        "74%": "74%",
        "75%": "75%",
        "76%": "76%",
        "77%": "77%",
        "78%": "78%",
        "79%": "79%",
        "80%": "80%",
        "81%": "81%",
        "82%": "82%",
        "83%": "83%",
        "84%": "84%",
        "85%": "85%",
        "86%": "86%",
        "87%": "87%",
        "88%": "88%",
        "89%": "89%",
        "90%": "90%",
        "91%": "91%",
        "92%": "92%",
        "93%": "93%",
        "94%": "94%",
        "95%": "95%",
        "96%": "96%",
        "97%": "97%",
        "98%": "98%",
        "99%": "99%",
        "100%": "100%",

        "0vw": "0vw",
        "1vw": "1vw",
        "2vw": "2vw",
        "3vw": "3vw",
        "4vw": "4vw",
        "5vw": "5vw",
        "6vw": "6vw",
        "7vw": "7vw",
        "8vw": "8vw",
        "9vw": "9vw",
        "10vw": "10vw",
        "11vw": "11vw",
        "12vw": "12vw",
        "13vw": "13vw",
        "14vw": "14vw",
        "15vw": "15vw",
        "16vw": "16vw",
        "17vw": "17vw",
        "18vw": "18vw",
        "19vw": "19vw",
        "20vw": "20vw",
        "21vw": "21vw",
        "22vw": "22vw",
        "23vw": "23vw",
        "24vw": "24vw",
        "25vw": "25vw",
        "26vw": "26vw",
        "27vw": "27vw",
        "28vw": "28vw",
        "29vw": "29vw",
        "30vw": "30vw",
        "31vw": "31vw",
        "32vw": "32vw",
        "33vw": "33vw",
        "34vw": "34vw",
        "35vw": "35vw",
        "36vw": "36vw",
        "37vw": "37vw",
        "38vw": "38vw",
        "39vw": "39vw",
        "40vw": "40vw",
        "41vw": "41vw",
        "42vw": "42vw",
        "43vw": "43vw",
        "44vw": "44vw",
        "45vw": "45vw",
        "46vw": "46vw",
        "47vw": "47vw",
        "48vw": "48vw",
        "49vw": "49vw",
        "50vw": "50vw",
        "51vw": "51vw",
        "52vw": "52vw",
        "53vw": "53vw",
        "54vw": "54vw",
        "55vw": "55vw",
        "56vw": "56vw",
        "57vw": "57vw",
        "58vw": "58vw",
        "59vw": "59vw",
        "60vw": "60vw",
        "61vw": "61vw",
        "62vw": "62vw",
        "63vw": "63vw",
        "64vw": "64vw",
        "65vw": "65vw",
        "66vw": "66vw",
        "67vw": "67vw",
        "68vw": "68vw",
        "69vw": "69vw",
        "70vw": "70vw",
        "71vw": "71vw",
        "72vw": "72vw",
        "73vw": "73vw",
        "74vw": "74vw",
        "75vw": "75vw",
        "76vw": "76vw",
        "77vw": "77vw",
        "78vw": "78vw",
        "79vw": "79vw",
        "80vw": "80vw",
        "81vw": "81vw",
        "82vw": "82vw",
        "83vw": "83vw",
        "84vw": "84vw",
        "85vw": "85vw",
        "86vw": "86vw",
        "87vw": "87vw",
        "88vw": "88vw",
        "89vw": "89vw",
        "90vw": "90vw",
        "91vw": "91vw",
        "92vw": "92vw",
        "93vw": "93vw",
        "94vw": "94vw",
        "95vw": "95vw",
        "96vw": "96vw",
        "97vw": "97vw",
        "98vw": "98vw",
        "99vw": "99vw",
        "100vw": "100vw",
      },
      height: {
        // standardized container heights
        nav: "5vh", // Navigation height
        footer: "4vh", // Footer height
        content: "91vh", // Content height
        "0%": "0%",
        "1%": "1%",
        "2%": "2%",
        "3%": "3%",
        "4%": "4%",
        "5%": "5%",
        "6%": "6%",
        "7%": "7%",
        "8%": "8%",
        "9%": "9%",
        "10%": "10%",
        "11%": "11%",
        "12%": "12%",
        "13%": "13%",
        "14%": "14%",
        "15%": "15%",
        "16%": "16%",
        "17%": "17%",
        "18%": "18%",
        "19%": "19%",
        "20%": "20%",
        "21%": "21%",
        "22%": "22%",
        "23%": "23%",
        "24%": "24%",
        "25%": "25%",
        "26%": "26%",
        "27%": "27%",
        "28%": "28%",
        "29%": "29%",
        "30%": "30%",
        "31%": "31%",
        "32%": "32%",
        "33%": "33%",
        "34%": "34%",
        "35%": "35%",
        "36%": "36%",
        "37%": "37%",
        "38%": "38%",
        "39%": "39%",
        "40%": "40%",
        "41%": "41%",
        "42%": "42%",
        "43%": "43%",
        "44%": "44%",
        "45%": "45%",
        "46%": "46%",
        "47%": "47%",
        "48%": "48%",
        "49%": "49%",
        "50%": "50%",
        "51%": "51%",
        "52%": "52%",
        "53%": "53%",
        "54%": "54%",
        "55%": "55%",
        "56%": "56%",
        "57%": "57%",
        "58%": "58%",
        "59%": "59%",
        "60%": "60%",
        "61%": "61%",
        "62%": "62%",
        "63%": "63%",
        "64%": "64%",
        "65%": "65%",
        "66%": "66%",
        "67%": "67%",
        "68%": "68%",
        "69%": "69%",
        "70%": "70%",
        "71%": "71%",
        "72%": "72%",
        "73%": "73%",
        "74%": "74%",
        "75%": "75%",
        "76%": "76%",
        "77%": "77%",
        "78%": "78%",
        "79%": "79%",
        "80%": "80%",
        "81%": "81%",
        "82%": "82%",
        "83%": "83%",
        "84%": "84%",
        "85%": "85%",
        "86%": "86%",
        "87%": "87%",
        "88%": "88%",
        "89%": "89%",
        "90%": "90%",
        "91%": "91%",
        "92%": "92%",
        "93%": "93%",
        "94%": "94%",
        "95%": "95%",
        "96%": "96%",
        "97%": "97%",
        "98%": "98%",
        "99%": "99%",
        "100%": "100%",

        "0vh": "0vh",
        "0.2vh": "0.2vh",
        "0.3vh": "0.3vh",
        "0.4vh": "0.4vh",
        "0.5vh": "0.5vh",
        "0.6vh": "0.6vh",
        "0.7vh": "0.7vh",
        "0.8vh": "0.8vh",
        "0.9vh": "0.9vh",
        "1.0vh": "1.0vh",
        "1.1vh": "1.1vh",
        "1.2vh": "1.2vh",
        "1.3vh": "1.3vh",
        "1.4vh": "1.4vh",
        "1.5vh": "1.5vh",
        "1.6vh": "1.6vh",
        "1.7vh": "1.7vh",
        "1.8vh": "1.8vh",
        "1.9vh": "1.9vh",
        "2.0vh": "2.0vh",
        "2.1vh": "2.1vh",
        "2.2vh": "2.2vh",
        "2.3vh": "2.3vh",
        "2.4vh": "2.4vh",
        "2.5vh": "2.5vh",
        "2.6vh": "2.6vh",
        "2.7vh": "2.7vh",
        "2.8vh": "2.8vh",
        "2.9vh": "2.9vh",
        "3.0vh": "3.0vh",
        "3.1vh": "3.1vh",
        "3.2vh": "3.2vh",
        "3.3vh": "3.3vh",
        "3.4vh": "3.4vh",
        "3.5vh": "3.5vh",
        "3.6vh": "3.6vh",
        "3.7vh": "3.7vh",
        "3.8vh": "3.8vh",
        "3.9vh": "3.9vh",
        "4.0vh": "4.0vh",
        "4.1vh": "4.1vh",
        "4.2vh": "4.2vh",
        "4.3vh": "4.3vh",
        "4.4vh": "4.4vh",
        "4.5vh": "4.5vh",
        "4.6vh": "4.6vh",
        "4.7vh": "4.7vh",
        "4.8vh": "4.8vh",
        "4.9vh": "4.9vh",
        "5.0vh": "5.0vh",
        "5.1vh": "5.1vh",
        "5.2vh": "5.2vh",
        "5.3vh": "5.3vh",
        "5.4vh": "5.4vh",
        "5.5vh": "5.5vh",
        "5.6vh": "5.6vh",
        "5.7vh": "5.7vh",
        "5.8vh": "5.8vh",
        "5.9vh": "5.9vh",
        "6.0vh": "6.0vh",
        "6.1vh": "6.1vh",
        "6.2vh": "6.2vh",
        "6.3vh": "6.3vh",
        "6.4vh": "6.4vh",
        "6.5vh": "6.5vh",
        "6.6vh": "6.6vh",
        "6.7vh": "6.7vh",
        "6.8vh": "6.8vh",
        "6.9vh": "6.9vh",
        "7vh": "7vh",
        "8vh": "8vh",
        "9vh": "9vh",
        "10vh": "10vh",
        "11vh": "11vh",
        "12vh": "12vh",
        "13vh": "13vh",
        "14vh": "14vh",
        "15vh": "15vh",
        "16vh": "16vh",
        "17vh": "17vh",
        "18vh": "18vh",
        "19vh": "19vh",
        "20vh": "20vh",
        "21vh": "21vh",
        "22vh": "22vh",
        "23vh": "23vh",
        "24vh": "24vh",
        "25vh": "25vh",
        "26vh": "26vh",
        "27vh": "27vh",
        "28vh": "28vh",
        "29vh": "29vh",
        "30vh": "30vh",
        "31vh": "31vh",
        "32vh": "32vh",
        "33vh": "33vh",
        "34vh": "34vh",
        "35vh": "35vh",
        "36vh": "36vh",
        "37vh": "37vh",
        "38vh": "38vh",
        "39vh": "39vh",
        "40vh": "40vh",
        "41vh": "41vh",
        "42vh": "42vh",
        "43vh": "43vh",
        "44vh": "44vh",
        "45vh": "45vh",
        "46vh": "46vh",
        "47vh": "47vh",
        "48vh": "48vh",
        "49vh": "49vh",
        "50vh": "50vh",
        "51vh": "51vh",
        "52vh": "52vh",
        "53vh": "53vh",
        "54vh": "54vh",
        "55vh": "55vh",
        "56vh": "56vh",
        "57vh": "57vh",
        "58vh": "58vh",
        "59vh": "59vh",
        "60vh": "60vh",
        "61vh": "61vh",
        "62vh": "62vh",
        "63vh": "63vh",
        "64vh": "64vh",
        "65vh": "65vh",
        "66vh": "66vh",
        "67vh": "67vh",
        "68vh": "68vh",
        "69vh": "69vh",
        "70vh": "70vh",
        "71vh": "71vh",
        "72vh": "72vh",
        "73vh": "73vh",
        "74vh": "74vh",
        "75vh": "75vh",
        "76vh": "76vh",
        "77vh": "77vh",
        "78vh": "78vh",
        "79vh": "79vh",
        "80vh": "80vh",
        "81vh": "81vh",
        "82vh": "82vh",
        "83vh": "83vh",
        "84vh": "84vh",
        "85vh": "85vh",
        "86vh": "86vh",
        "87vh": "87vh",
        "88vh": "88vh",
        "89vh": "89vh",
        "90vh": "90vh",
        "91vh": "91vh",
        "92vh": "92vh",
        "93vh": "93vh",
        "94vh": "94vh",
        "95vh": "95vh",
        "96vh": "96vh",
        "97vh": "97vh",
        "98vh": "98vh",
        "99vh": "99vh",
        "100vh": "100vh",
      },
      minHeight: {
        content: "91vh", // Minimum content height
      },
      padding: {
        nav: "5vh", // Navigation top padding
        footer: "4vh", // Footer bottom padding
        "0vh": "0vh",
        "0.2vh": "0.2vh",
        "0.3vh": "0.3vh",
        "0.4vh": "0.4vh",
        "0.5vh": "0.5vh",
        "0.6vh": "0.6vh",
        "0.7vh": "0.7vh",
        "0.8vh": "0.8vh",
        "0.9vh": "0.9vh",
        "1.0vh": "1.0vh",
        "1.1vh": "1.1vh",
        "1.2vh": "1.2vh",
        "1.3vh": "1.3vh",
        "1.4vh": "1.4vh",
        "1.5vh": "1.5vh",
        "1.6vh": "1.6vh",
        "1.7vh": "1.7vh",
        "1.8vh": "1.8vh",
        "1.9vh": "1.9vh",
        "2.0vh": "2.0vh",
        "2.1vh": "2.1vh",
        "2.2vh": "2.2vh",
        "2.3vh": "2.3vh",
        "2.4vh": "2.4vh",
        "2.5vh": "2.5vh",
        "2.6vh": "2.6vh",
        "2.7vh": "2.7vh",
        "2.8vh": "2.8vh",
        "2.9vh": "2.9vh",
        "3.0vh": "3.0vh",
        "3.1vh": "3.1vh",
        "3.2vh": "3.2vh",
        "3.3vh": "3.3vh",
        "3.4vh": "3.4vh",
        "3.5vh": "3.5vh",
        "3.6vh": "3.6vh",
        "3.7vh": "3.7vh",
        "3.8vh": "3.8vh",
        "3.9vh": "3.9vh",
        "4.0vh": "4.0vh",
        "4.1vh": "4.1vh",
        "4.2vh": "4.2vh",
        "4.3vh": "4.3vh",
        "4.4vh": "4.4vh",
        "4.5vh": "4.5vh",
        "4.6vh": "4.6vh",
        "4.7vh": "4.7vh",
        "4.8vh": "4.8vh",
        "4.9vh": "4.9vh",
        "5.0vh": "5.0vh",
        "5.1vh": "5.1vh",
        "5.2vh": "5.2vh",
        "5.3vh": "5.3vh",
        "5.4vh": "5.4vh",
        "5.5vh": "5.5vh",
        "5.6vh": "5.6vh",
        "5.7vh": "5.7vh",
        "5.8vh": "5.8vh",
        "5.9vh": "5.9vh",
        "6.0vh": "6.0vh",
        "6.1vh": "6.1vh",
        "6.2vh": "6.2vh",
        "6.3vh": "6.3vh",
        "6.4vh": "6.4vh",
        "6.5vh": "6.5vh",
        "6.6vh": "6.6vh",
        "6.7vh": "6.7vh",
        "6.8vh": "6.8vh",
        "6.9vh": "6.9vh",
      },
      spacing: {
        "1px": "1px",
        "2px": "2px",
        "3px": "3px",
        "4px": "4px",
        "5px": "5px",
        "6px": "6px",
        "7px": "7px",
        "8px": "8px",
        "9px": "9px",
        "10px": "10px",
        "11px": "11px",
        "12px": "12px",
        "13px": "13px",
        "14px": "14px",
        "15px": "15px",
        "16px": "16px",
        "17px": "17px",
        "18px": "18px",
        "19px": "19px",
        "20px": "20px",
        "21px": "21px",
        "22px": "22px",
        "23px": "23px",
        "24px": "24px",
        "25px": "25px",
        "26px": "26px",
        "27px": "27px",
        "28px": "28px",
        "29px": "29px",
        "30px": "30px",
        "31px": "31px",
        "32px": "32px",
        "33px": "33px",
        "34px": "34px",
        "35px": "35px",
        "36px": "36px",
        "37px": "37px",
        "38px": "38px",
        "39px": "39px",
        "40px": "40px",
        "41px": "41px",
        "42px": "42px",
        "43px": "43px",
        "44px": "44px",
        "45px": "45px",
        "46px": "46px",
        "47px": "47px",
        "48px": "48px",
        "49px": "49px",
        "50px": "50px",
        "51px": "51px",
        "52px": "52px",
        "53px": "53px",
        "54px": "54px",
        "55px": "55px",
        "56px": "56px",
        "57px": "57px",
        "58px": "58px",
        "59px": "59px",
        "60px": "60px",
        "61px": "61px",
        "62px": "62px",
        "63px": "63px",
        "64px": "64px",
        "65px": "65px",
        "66px": "66px",
        "67px": "67px",
        "68px": "68px",
        "69px": "69px",
        "70px": "70px",
        "71px": "71px",
        "72px": "72px",
        "73px": "73px",
        "74px": "74px",
        "75px": "75px",
        "76px": "76px",
        "77px": "77px",
        "78px": "78px",
        "79px": "79px",
        "80px": "80px",
        "81px": "81px",
        "82px": "82px",
        "83px": "83px",
        "84px": "84px",
        "85px": "85px",
        "86px": "86px",
        "87px": "87px",
        "88px": "88px",
        "89px": "89px",
        "90px": "90px",
        "91px": "91px",
        "92px": "92px",
        "93px": "93px",
        "94px": "94px",
        "95px": "95px",
        "96px": "96px",
        "97px": "97px",
        "98px": "98px",
        "99px": "99px",
        "100px": "100px",
        "101px": "101px",
        "102px": "102px",
        "103px": "103px",
        "104px": "104px",
        "105px": "105px",
        "106px": "106px",
        "107px": "107px",
        "108px": "108px",
        "109px": "109px",
        "110px": "110px",
        "111px": "111px",
        "112px": "112px",
        "113px": "113px",
        "114px": "114px",
        "115px": "115px",
        "116px": "116px",
        "117px": "117px",
        "118px": "118px",
        "119px": "119px",
        "120px": "120px",
        "121px": "121px",
        "122px": "122px",
        "123px": "123px",
        "124px": "124px",
        "125px": "125px",
        "126px": "126px",
        "127px": "127px",
        "128px": "128px",
        "129px": "129px",
        "130px": "130px",
        "131px": "131px",
        "132px": "132px",
        "133px": "133px",
        "134px": "134px",
        "135px": "135px",
        "136px": "136px",
        "137px": "137px",
        "138px": "138px",
        "139px": "139px",
        "140px": "140px",
        "141px": "141px",
        "142px": "142px",
        "143px": "143px",
        "144px": "144px",
        "145px": "145px",
        "146px": "146px",
        "147px": "147px",
        "148px": "148px",
        "149px": "149px",
        "150px": "150px",
        "151px": "151px",
        "152px": "152px",
        "153px": "153px",
        "154px": "154px",
        "155px": "155px",
        "156px": "156px",
        "157px": "157px",
        "158px": "158px",
        "159px": "159px",
        "160px": "160px",
        "161px": "161px",
        "162px": "162px",
        "163px": "163px",
        "164px": "164px",
        "165px": "165px",
        "166px": "166px",
        "167px": "167px",
        "168px": "168px",
        "169px": "169px",
        "170px": "170px",
        "171px": "171px",
        "172px": "172px",
        "173px": "173px",
        "174px": "174px",
        "175px": "175px",
        "176px": "176px",
        "177px": "177px",
        "178px": "178px",
        "179px": "179px",
        "180px": "180px",
        "181px": "181px",
        "182px": "182px",
        "183px": "183px",
        "184px": "184px",
        "185px": "185px",
        "186px": "186px",
        "187px": "187px",
        "188px": "188px",
        "189px": "189px",
        "190px": "190px",
        "191px": "191px",
        "192px": "192px",
        "193px": "193px",
        "194px": "194px",
        "195px": "195px",
        "196px": "196px",
        "197px": "197px",
        "198px": "198px",
        "199px": "199px",
        "200px": "200px",
        "201px": "201px",
        "202px": "202px",
        "203px": "203px",
        "204px": "204px",
        "205px": "205px",
        "206px": "206px",
        "207px": "207px",
        "208px": "208px",
        "209px": "209px",
        "210px": "210px",
        "211px": "211px",
        "212px": "212px",
        "213px": "213px",
        "214px": "214px",
        "215px": "215px",
        "216px": "216px",
        "217px": "217px",
        "218px": "218px",
        "219px": "219px",
        "220px": "220px",
        "221px": "221px",
        "222px": "222px",
        "223px": "223px",
        "224px": "224px",
        "225px": "225px",
        "226px": "226px",
        "227px": "227px",
        "228px": "228px",
        "229px": "229px",
        "230px": "230px",
        "231px": "231px",
        "232px": "232px",
        "233px": "233px",
        "234px": "234px",
        "235px": "235px",
        "236px": "236px",
        "237px": "237px",
        "238px": "238px",
        "239px": "239px",
        "240px": "240px",
        "241px": "241px",
        "242px": "242px",
        "243px": "243px",
        "244px": "244px",
        "245px": "245px",
        "246px": "246px",
        "247px": "247px",
        "248px": "248px",
        "249px": "249px",
        "250px": "250px",
        "251px": "251px",
        "252px": "252px",
        "253px": "253px",
        "254px": "254px",
        "255px": "255px",
        "256px": "256px",
        "257px": "257px",
        "258px": "258px",
        "259px": "259px",
        "260px": "260px",
        "261px": "261px",
        "262px": "262px",
        "263px": "263px",
        "264px": "264px",
        "265px": "265px",
        "266px": "266px",
        "267px": "267px",
        "268px": "268px",
        "269px": "269px",
        "270px": "270px",
        "271px": "271px",
        "272px": "272px",
        "273px": "273px",
        "274px": "274px",
        "275px": "275px",
        "276px": "276px",
        "277px": "277px",
        "278px": "278px",
        "279px": "279px",
        "280px": "280px",
        "281px": "281px",
        "282px": "282px",
        "283px": "283px",
        "284px": "284px",
        "285px": "285px",
        "286px": "286px",
        "287px": "287px",
        "288px": "288px",
        "289px": "289px",
        "290px": "290px",
        "291px": "291px",
        "292px": "292px",
        "293px": "293px",
        "294px": "294px",
        "295px": "295px",
        "296px": "296px",
        "297px": "297px",
        "298px": "298px",
        "299px": "299px",
        "300px": "300px",
        "301px": "301px",
        "302px": "302px",
        "303px": "303px",
        "304px": "304px",
        "305px": "305px",
        "306px": "306px",
        "307px": "307px",
        "308px": "308px",
        "309px": "309px",
        "310px": "310px",
        "311px": "311px",
        "312px": "312px",
        "313px": "313px",
        "314px": "314px",
        "315px": "315px",
        "316px": "316px",
        "317px": "317px",
        "318px": "318px",
        "319px": "319px",
        "320px": "320px",
        "321px": "321px",
        "322px": "322px",
        "323px": "323px",
        "324px": "324px",
        "325px": "325px",
        "326px": "326px",
        "327px": "327px",
        "328px": "328px",
        "329px": "329px",
        "330px": "330px",
        "331px": "331px",
        "332px": "332px",
        "333px": "333px",
        "334px": "334px",
        "335px": "335px",
        "336px": "336px",
        "337px": "337px",
        "338px": "338px",
        "339px": "339px",
        "340px": "340px",
        "341px": "341px",
        "342px": "342px",
        "343px": "343px",
        "344px": "344px",
        "345px": "345px",
        "346px": "346px",
        "347px": "347px",
        "348px": "348px",
        "349px": "349px",
        "350px": "350px",
        "351px": "351px",
        "352px": "352px",
        "353px": "353px",
        "354px": "354px",
        "355px": "355px",
        "356px": "356px",
        "357px": "357px",
        "358px": "358px",
        "359px": "359px",
        "360px": "360px",
        "361px": "361px",
        "362px": "362px",
        "363px": "363px",
        "364px": "364px",
        "365px": "365px",
        "366px": "366px",
        "367px": "367px",
        "368px": "368px",
        "369px": "369px",
        "370px": "370px",
        "371px": "371px",
        "372px": "372px",
        "373px": "373px",
        "374px": "374px",
        "375px": "375px",
        "376px": "376px",
        "377px": "377px",
        "378px": "378px",
        "379px": "379px",
        "380px": "380px",
        "381px": "381px",
        "382px": "382px",
        "383px": "383px",
        "384px": "384px",
        "385px": "385px",
        "386px": "386px",
        "387px": "387px",
        "388px": "388px",
        "389px": "389px",
        "390px": "390px",
        "391px": "391px",
        "392px": "392px",
        "393px": "393px",
        "394px": "394px",
        "395px": "395px",
        "396px": "396px",
        "397px": "397px",
        "398px": "398px",
        "399px": "399px",
        "400px": "400px",
        "401px": "401px",
        "402px": "402px",
        "403px": "403px",
        "404px": "404px",
        "405px": "405px",
        "406px": "406px",
        "407px": "407px",
        "408px": "408px",
        "409px": "409px",
        "410px": "410px",
        "411px": "411px",
        "412px": "412px",
        "413px": "413px",
        "414px": "414px",
        "415px": "415px",
        "416px": "416px",
        "417px": "417px",
        "418px": "418px",
        "419px": "419px",
        "420px": "420px",
        "421px": "421px",
        "422px": "422px",
        "423px": "423px",
        "424px": "424px",
        "425px": "425px",
        "426px": "426px",
        "427px": "427px",
        "428px": "428px",
        "429px": "429px",
        "430px": "430px",
        "431px": "431px",
        "432px": "432px",
        "433px": "433px",
        "434px": "434px",
        "435px": "435px",
        "436px": "436px",
        "437px": "437px",
        "438px": "438px",
        "439px": "439px",
        "440px": "440px",
        "441px": "441px",
        "442px": "442px",
        "443px": "443px",
        "444px": "444px",
        "445px": "445px",
        "446px": "446px",
        "447px": "447px",
        "448px": "448px",
        "449px": "449px",
        "450px": "450px",
        "451px": "451px",
        "452px": "452px",
        "453px": "453px",
        "454px": "454px",
        "455px": "455px",
        "456px": "456px",
        "457px": "457px",
        "458px": "458px",
        "459px": "459px",
        "460px": "460px",
        "461px": "461px",
        "462px": "462px",
        "463px": "463px",
        "464px": "464px",
        "465px": "465px",
        "466px": "466px",
        "467px": "467px",
        "468px": "468px",
        "469px": "469px",
        "470px": "470px",
        "471px": "471px",
        "472px": "472px",
        "473px": "473px",
        "474px": "474px",
        "475px": "475px",
        "476px": "476px",
        "477px": "477px",
        "478px": "478px",
        "479px": "479px",
        "480px": "480px",
        "481px": "481px",
        "482px": "482px",
        "483px": "483px",
        "484px": "484px",
        "485px": "485px",
        "486px": "486px",
        "487px": "487px",
        "488px": "488px",
        "489px": "489px",
        "490px": "490px",
        "491px": "491px",
        "492px": "492px",
        "493px": "493px",
        "494px": "494px",
        "495px": "495px",
        "496px": "496px",
        "497px": "497px",
        "498px": "498px",
        "499px": "499px",
        "500px": "500px",
        "501px": "501px",
        "502px": "502px",
        "503px": "503px",
        "504px": "504px",
        "505px": "505px",
        "506px": "506px",
        "507px": "507px",
        "508px": "508px",
        "509px": "509px",
        "510px": "510px",
        "511px": "511px",
        "512px": "512px",
        "513px": "513px",
        "514px": "514px",
        "515px": "515px",
        "516px": "516px",
        "517px": "517px",
        "518px": "518px",
        "519px": "519px",
        "520px": "520px",
        "521px": "521px",
        "522px": "522px",
        "523px": "523px",
        "524px": "524px",
        "525px": "525px",
        "526px": "526px",
        "527px": "527px",
        "528px": "528px",
        "529px": "529px",
        "530px": "530px",
        "531px": "531px",
        "532px": "532px",
        "533px": "533px",
        "534px": "534px",
        "535px": "535px",
        "536px": "536px",
        "537px": "537px",
        "538px": "538px",
        "539px": "539px",
        "540px": "540px",
        "541px": "541px",
        "542px": "542px",
        "543px": "543px",
        "544px": "544px",
        "545px": "545px",
        "546px": "546px",
        "547px": "547px",
        "548px": "548px",
        "549px": "549px",
        "550px": "550px",
        "551px": "551px",
        "552px": "552px",
        "553px": "553px",
        "554px": "554px",
        "555px": "555px",
        "556px": "556px",
        "557px": "557px",
        "558px": "558px",
        "559px": "559px",
        "560px": "560px",
        "561px": "561px",
        "562px": "562px",
        "563px": "563px",
        "564px": "564px",
        "565px": "565px",
        "566px": "566px",
        "567px": "567px",
        "568px": "568px",
        "569px": "569px",
        "570px": "570px",
        "571px": "571px",
        "572px": "572px",
        "573px": "573px",
        "574px": "574px",
        "575px": "575px",
        "576px": "576px",
        "577px": "577px",
        "578px": "578px",
        "579px": "579px",
        "580px": "580px",
        "581px": "581px",
        "582px": "582px",
        "583px": "583px",
        "584px": "584px",
        "585px": "585px",
        "586px": "586px",
        "587px": "587px",
        "588px": "588px",
        "589px": "589px",
        "590px": "590px",
        "591px": "591px",
        "592px": "592px",
        "593px": "593px",
        "594px": "594px",
        "595px": "595px",
        "596px": "596px",
        "597px": "597px",
        "598px": "598px",
        "599px": "599px",
        "600px": "600px",
        "601px": "601px",
        "602px": "602px",
        "603px": "603px",
        "604px": "604px",
        "605px": "605px",
        "606px": "606px",
        "607px": "607px",
        "608px": "608px",
        "609px": "609px",
        "610px": "610px",
        "611px": "611px",
        "612px": "612px",
        "613px": "613px",
        "614px": "614px",
        "615px": "615px",
        "616px": "616px",
        "617px": "617px",
        "618px": "618px",
        "619px": "619px",
        "620px": "620px",
        "621px": "621px",
        "622px": "622px",
        "623px": "623px",
        "624px": "624px",
        "625px": "625px",
        "626px": "626px",
        "627px": "627px",
        "628px": "628px",
        "629px": "629px",
        "630px": "630px",
        "631px": "631px",
        "632px": "632px",
        "633px": "633px",
        "634px": "634px",
        "635px": "635px",
        "636px": "636px",
        "637px": "637px",
        "638px": "638px",
        "639px": "639px",
        "640px": "640px",
        "641px": "641px",
        "642px": "642px",
        "643px": "643px",
        "644px": "644px",
        "645px": "645px",
        "646px": "646px",
        "647px": "647px",
        "648px": "648px",
        "649px": "649px",
        "650px": "650px",
        "651px": "651px",
        "652px": "652px",
        "653px": "653px",
        "654px": "654px",
        "655px": "655px",
        "656px": "656px",
        "657px": "657px",
        "658px": "658px",
        "659px": "659px",
        "660px": "660px",
        "661px": "661px",
        "662px": "662px",
        "663px": "663px",
        "664px": "664px",
        "665px": "665px",
        "666px": "666px",
        "667px": "667px",
        "668px": "668px",
        "669px": "669px",
        "670px": "670px",
        "671px": "671px",
        "672px": "672px",
        "673px": "673px",
        "674px": "674px",
        "675px": "675px",
        "676px": "676px",
        "677px": "677px",
        "678px": "678px",
        "679px": "679px",
        "680px": "680px",
        "681px": "681px",
        "682px": "682px",
        "683px": "683px",
        "684px": "684px",
        "685px": "685px",
        "686px": "686px",
        "687px": "687px",
        "688px": "688px",
        "689px": "689px",
        "690px": "690px",
        "691px": "691px",
        "692px": "692px",
        "693px": "693px",
        "694px": "694px",
        "695px": "695px",
        "696px": "696px",
        "697px": "697px",
        "698px": "698px",
        "699px": "699px",
        "700px": "700px",
        "701px": "701px",
        "702px": "702px",
        "703px": "703px",
        "704px": "704px",
        "705px": "705px",
        "706px": "706px",
        "707px": "707px",
        "708px": "708px",
        "709px": "709px",
        "710px": "710px",
        "711px": "711px",
        "712px": "712px",
        "713px": "713px",
        "714px": "714px",
        "715px": "715px",
        "716px": "716px",
        "717px": "717px",
        "718px": "718px",
        "719px": "719px",
        "720px": "720px",
        "721px": "721px",
        "722px": "722px",
        "723px": "723px",
        "724px": "724px",
        "725px": "725px",
        "726px": "726px",
        "727px": "727px",
        "728px": "728px",
        "729px": "729px",
        "730px": "730px",
        "731px": "731px",
        "732px": "732px",
        "733px": "733px",
        "734px": "734px",
        "735px": "735px",
        "736px": "736px",
        "737px": "737px",
        "738px": "738px",
        "739px": "739px",
        "740px": "740px",
        "741px": "741px",
        "742px": "742px",
        "743px": "743px",
        "744px": "744px",
        "745px": "745px",
        "746px": "746px",
        "747px": "747px",
        "748px": "748px",
        "749px": "749px",
        "750px": "750px",
        "751px": "751px",
        "752px": "752px",
        "753px": "753px",
        "754px": "754px",
        "755px": "755px",
        "756px": "756px",
        "757px": "757px",
        "758px": "758px",
        "759px": "759px",
        "760px": "760px",
        "761px": "761px",
        "762px": "762px",
        "763px": "763px",
        "764px": "764px",
        "765px": "765px",
        "766px": "766px",
        "767px": "767px",
        "768px": "768px",
        "769px": "769px",
        "770px": "770px",
        "771px": "771px",
        "772px": "772px",
        "773px": "773px",
        "774px": "774px",
        "775px": "775px",
        "776px": "776px",
        "777px": "777px",
        "778px": "778px",
        "779px": "779px",
        "780px": "780px",
        "781px": "781px",
        "782px": "782px",
        "783px": "783px",
        "784px": "784px",
        "785px": "785px",
        "786px": "786px",
        "787px": "787px",
        "788px": "788px",
        "789px": "789px",
        "790px": "790px",
        "791px": "791px",
        "792px": "792px",
        "793px": "793px",
        "794px": "794px",
        "795px": "795px",
        "796px": "796px",
        "797px": "797px",
        "798px": "798px",
        "799px": "799px",
        "800px": "800px",
      },
      transition: ["hover", "focus"],
      duration: ["hover", "focus"],
      scale: {
        101: "1.01",
        102: "1.02",
        103: "1.03",
        104: "1.04",
        105: "1.05",
        106: "1.06",
        107: "1.07",
        108: "1.08",
        109: "1.09",
        110: "1.1",
        111: "1.11",
        112: "1.12",
        113: "1.13",
        114: "1.14",
        115: "1.15",
      },
      fontFamily: {
        sans: ["Lato", "sans-serif"],
        cursive: ["Waiting for the Sunrise", "cursive"],
      },
      fontSize: {
        xxs: ["1.2vh", { lineHeight: "1.8vh" }],
        xs: ["1.3vh", { lineHeight: "2.2vh" }],
        sm: ["1.5vh", { lineHeight: "2.3vh" }],
        md: ["1.7vh", { lineHeight: "2.6vh" }],
        lg: ["2.3vh", { lineHeight: "3.1vh" }],
        xl: ["3vh", { lineHeight: "3.8vh" }],
        xxl: ["3.5vh", { lineHeight: "4.3vh" }],
        xxxl: ["4vh", { lineHeight: "4.8vh" }],
        mega: ["4.2vh", { lineHeight: "5vh" }],
        tooBig: ["4.4vh", { lineHeight: "5.2vh" }],
        insane: ["5vh", { lineHeight: "5.8vh" }],
      },
      screens: {
        mobile: "360px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1600px",
        fullHD: "1920px",
        quadHD: "2560px",
        ultraHD: "3840px",
      },
      boxShadow: {
        shadowNarrowTight: "0.1vh 0.1vh 0.3vh rgba(0, 0, 0, 0.9)",
        shadowNarrowNormal: "0.1vh 0.1vh 0.6vh rgba(0, 0, 0, 0.9)",
        shadowNarrowLoose: "0.1vh 0.1vh 0.9vh rgba(0, 0, 0, 0.9)",
        shadowNarrowLooser: "0.1vh 0.1vh 1.2vh rgba(0, 0, 0, 0.9)",
        shadowBroadTight: "0.2vh 0.2vh 0.3vh rgba(0, 0, 0, 0.9)",
        shadowBroadNormal: "0.2vh 0.2vh 0.6vh rgba(0, 0, 0, 0.9)",
        shadowBroadLoose: "0.2vh 0.2vh 0.9vh rgba(0, 0, 0, 0.9)",
        shadowBroadLooser: "0.2vh 0.2vh 0.9vh rgba(0, 0, 0, 0.9)",
        shadowWideTight: "0.3vh 0.3vh 0.3vh rgba(0, 0, 0, 0.9)",
        shadowWideNormal: "0.3vh 0.3vh 0.6vh rgba(0, 0, 0, 0.9)",
        shadowWideLoose: "0.3vh 0.3vh 0.9vh rgba(0, 0, 0, 0.9)",
        shadowWideLooser: "0.3vh 0.3vh 0.9vh rgba(0, 0, 0, 0.9)",
        insetShadowSm: "inset 0 0 0.3vh rgba(0, 0, 0, 0.9)",
        insetShadowMd: "inset 0 0 0.6vh rgba(0, 0, 0, 0.9)",
        insetShadowLg: "inset 0 0 0.9vh rgba(0, 0, 0, 0.9)",
        insetShadowXl: "inset 0 0 1.2vh rgba(0, 0, 0, 0.9)",
        lightShadowTight: "0.2vh 0.2vh 0.3vh rgba(240, 240, 240, 0.9)",
        lightShadowNormal: "0.2vh 0.2vh 0.6vh rgba(240, 240, 240, 0.9)",
        lightShadowLoose: "0.2vh 0.2vh 0.9vh rgba(240, 240, 240, 0.9)",
        lightShadowLooser: "0.2vh 0.2vh 1.2vh rgba(240, 240, 240, 0.9)",
        standoutShadowSm: "rgb(38, 57, 77) 0px 0.3vh 1.5vh -0.4vh",
        standoutShadowMd: "rgb(38, 57, 77) 0px 0.5vh 2.5vh -0.4vh",
        standoutShadowLg: "rgb(38, 57, 77) 0px 1vh 4.5vh -0.6vh",
        standoutShadowXl: "rgb(38, 57, 77) 0px 0.8vh 3.5vh -0.5vh",
        shadow3DXs:
          "rgba(0, 0, 0, 0.17) 0px -0.1vh 0.1vh 0px inset, rgba(0, 0, 0, 0.15) 0px -0.15vh 0.15vh 0px inset, rgba(0, 0, 0, 0.1) 0px -0.4vh 0.2vh 0px inset, rgba(0, 0, 0, 0.06) 0px -0.01vh 0.1vh, rgba(0, 0, 0, 0.09) 0px -0.02vh 0.1vh, rgba(0, 0, 0, 0.09) 0px -0.1vh 0.02vh, rgba(0, 0, 0, 0.09) 0px -0.05vh 0.04vh, rgba(0, 0, 0, 0.09) 0px -0.15vh 0.1vh",
        shadow3DSm:
          "rgba(0, 0, 0, 0.17) 0px -0.3vh 0.3vh 0px inset, rgba(0, 0, 0, 0.15) 0px -0.3vh 0.3vh 0px inset, rgba(0, 0, 0, 0.1) 0px -0.8vh 0.4vh 0px inset, rgba(0, 0, 0, 0.06) 0px -0.02vh 0.2vh, rgba(0, 0, 0, 0.09) 0px -0.04vh 0.2vh, rgba(0, 0, 0, 0.09) 0px -0.2vh 0.04vh, rgba(0, 0, 0, 0.09) 0px -0.1vh 0.08vh, rgba(0, 0, 0, 0.09) 0px -0.3vh 0.2vh",
        shadow3DMd:
          "rgba(0, 0, 0, 0.17) 0px -0.6vh 0.6vh 0px inset, rgba(0, 0, 0, 0.15) 0px -0.45vh 0.45vh 0px inset, rgba(0, 0, 0, 0.1) 0px -1.2vh 0.6vh 0px inset, rgba(0, 0, 0, 0.06) 0px -0.1vh 0.5vh, rgba(0, 0, 0, 0.09) 0px -0.1vh 0.2vh, rgba(0, 0, 0, 0.09) 0px -0.3vh 0.04vh, rgba(0, 0, 0, 0.09) 0px -0.15vh 0.08vh, rgba(0, 0, 0, 0.09) 0px -0.4vh 0.3vh",
        shadow3DLg:
          "rgba(0, 0, 0, 0.17) 0px -0.9vh 0.9vh 0px inset, rgba(0, 0, 0, 0.15) 0px -0.6vh 0.6vh 0px inset, rgba(0, 0, 0, 0.1) 0px -1.6vh 0.8vh 0px inset, rgba(0, 0, 0, 0.06) 0px -0.03vh 0.6vh, rgba(0, 0, 0, 0.09) 0px -0.2vh 0.2vh, rgba(0, 0, 0, 0.09) 0px -0.4vh 0.04vh, rgba(0, 0, 0, 0.09) 0px -0.2vh 0.08vh, rgba(0, 0, 0, 0.09) 0px -0.5vh 0.4vh",
        shadow3DXl:
          "rgba(0, 0, 0, 0.17) 0px -2vh 2vh 0px inset, rgba(0, 0, 0, 0.15) 0px -3vh 3vh 0px inset, rgba(0, 0, 0, 0.1) 0px -8vh 4vh 0px inset, rgba(0, 0, 0, 0.06) 0px -0.2vh 0.1vh, rgba(0, 0, 0, 0.09) 0px -0.5vh 0.2vh, rgba(0, 0, 0, 0.09) 0px -0.8vh 0.4vh, rgba(0, 0, 0, 0.09) 0px -1.5vh 0.8vh, rgba(0, 0, 0, 0.09) 0px -3vh 2vh",
        lightGlowSm: "0 0 0.1vh #FFF, 0 0 1px #ebd7d5, 0 0 0.3vh #FFF",
        lightGlowMd: "0 0 0.2vh #FFF, 0 0 2px #ebd7d5, 0 0 0.6vh #FFF",
        lightGlowLg: "0 0 0.3vh #FFF, 0 0 3px #ebd7d5, 0 0 0.9vh #FFF",
        lightGlowXl: "0 0 0.4vh #FFF, 0 0 4px #ebd7d5, 0 0 1.2vh #FFF",
        boxGlowSm:
          "#00FFFF 0px 0px 0.2vh, #00FFFF 0px 0px 0.4vh, #FFF 0px 0px 0.6vh, #d5f5f0 0px 0px 0.8vh, #d5f5f0 0px 0px 1.2vh, 0.8vh 0.2vh 0.6vh rgba(0,0,0,0);",
        boxGlowMd:
          "#00FFFF 0px 0px 0.3vh, #00FFFF 0px 0px 0.6vh, #FFF 0px 0px 0.9vh, #d5f5f0 0px 0px 1.2vh, #d5f5f0 0px 0px 1.8vh, 0.8vh 0.2vh 0.6vh rgba(0,0,0,0);",
        boxGlowLg:
          "#00FFFF 0px 0px 0.5vh, #00FFFF 0px 0px 1vh, #FFF 0px 0px 1.5vh, #d5f5f0 0px 0px 2vh, #d5f5f0 0px 0px 3vh, 0.8vh 0.2vh 0.6vh rgba(0,0,0,0);",
        boxGlowXl:
          "#00FFFF 0px 0px 0.7vh, #00FFFF 0px 0px 1.4vh, #FFF 0px 0px 2.1vh, #d5f5f0 0px 0px 2.8vh, #d5f5f0 0px 0px 4.2vh, 0.8vh 0.2vh 0.6vh rgba(0,0,0,0);",
        metallicEdgesSm:
          "#000 0.05vh 0.05vh 0.05vh, black 0px 0px 0.2vh, #FFF 0px 0px 0.1vh, #FFF 0px 0px 0.2vh, #FFF 0px 0px 0.3vh, #FFF 0px 0px 0.4vh, #FFF 0px 0px 0.5vh, 0.8vh 0.2vh 0.6vh rgba(0,0,0,0);",
        metallicEdgesMd:
          "#000 0.1vh 0.1vh 0.1vh, white 0px 0px 0.1vh, rgb(208, 226, 242) 0px 0px 0.2vh, #00FFFF 0px 0px 0.3vh, #FFF 0px 0px 0.4vh, #e3fcf9 0px 0px 0.5vh, #e3fcf9 0px 0px 0.6vh, 0.8vh 0.2vh 0.6vh rgba(0,0,0,0);",
        metallicEdgesLg:
          "#000 0.2vh 0.2vh 0.2vh, white 0px 0px 0.2vh, #00FFFF 0px 0px 4px, #00FFFF 0px 0px 6px, #FFF 0px 0px 8px, #d5f5f0 0px 0px 1vh, #d5f5f0 0px 0px 1.2vh, 0.8vh 0.2vh 0.6vh rgba(0,0,0,0);",
        metallicEdgesXl:
          "#000 0.3vh 0.3vh 0.3vh, white 0px 0px 0.3vh, #00FFFF 0px 0px 0.6vh, #00FFFF 0px 0px 0.9vh, #FFF 0px 0px 1vh, #d5f5f0 0px 0px 1.2vh, #d5f5f0 0px 0px 1.4vh, 0.8vh 0.2vh 0.6vh rgba(0,0,0,0);",
      },
      textShadow: {
        noShadow: "none",
        none: "",
        lightTextShadow: "0.1vh 0.1vh 0.3vh rgba(255, 255, 255, 0.9)",
        textShadow: "0.2vh 0.2vh 0.2vh rgba(0, 0, 0, 0.9)",
        subtleTextShadow: "0.1vh 0.1vh 0.2vh rgba(0, 0, 0, 0.9)",
        standoutTextShadow: "0.3vh 0.3vh 0.4vh rgba(0, 0, 0, 0.9)",
        textFog:
          "0 0 0.5vh #000, 0 0 1vh #000, 0 0 1.5vh #000, 0 0 1vh #000, 0 0 3vh #000, 0 0 4vh #575757, 0 0 5.5vh #5E5E5E, 0 0 7.5vh #000, 0.2vh 0.2vh 0.2vh rgba(0,0,0,0);",
        textGlow:
          "#00FFFF 0px 0px 0.5vh, #00FFFF 0px 0px 1vh, #FFF 0px 0px 1.5vh, rgb(208, 226, 242) 0px 0px 1vh, rgb(208, 226, 242) 0px 0px 1vh, 0.8vh 0.2vh 0.6vh rgba(0,0,0,0);",
        boldText:
          "#000 0.05vh 0.05vh 0.05vh, black 0px 0px 0.5vh,  #FFF 0px 0px 0.2vh, #FFF 0px 0px 0.3vh, #FFF 0px 0px 1.2vh, #FFF 0px 0px 0.4vh, #FFF 0px 0px 0.5vh, 0.8vh 0.2vh 0.6vh rgba(0,0,0,0);",
        boldTextGlow:
          "#000 0.1vh 0.1vh 0.1vh, white 0px 0px 0.7vh,  #00FFFF 0px 0px 0.8vh, #00FFFF 0px 0px 1vh, #FFF 0px 0px 1.5vh, #FF2D95 0px 0px 1vh, #FF2D95 0px 0px 3vh, 0.8vh 0.2vh 0.6vh rgba(0,0,0,0);",
      },
      textStrokeWidth: {
        1: "0.02vh",
        2: "0.03vh",
        3: "0.04vh",
        4: "0.05vh",
        5: "0.06vh",
        6: "0.07vh",
        7: "0.08vh",
        8: "0.09vh",
        9: "0.1vh",
        10: "0.11vh",
        11: "0.12vh",
        12: "0.13vh",
        13: "0.14vh",
        14: "0.15vh",
        15: "0.16vh",
        16: "0.17vh",
        17: "0.18vh",
        18: "0.19vh",
        19: "0.2vh",
        20: "0.21vh",
      },
      textStrokeColor: {
        white: "#FFF",
        100: "rgba(255, 245, 216, 1)",
        170: "rgba(255, 245, 216, 0.7)",
        180: "rgba(255, 245, 216, 0.8)",
        190: "rgba(255, 245, 216, 0.9)",

        200: "rgba(255, 233, 122, 1)",
        270: "rgba(255, 233, 122, 0.7)",
        280: "rgba(255, 233, 122, 0.8)",
        290: "rgba(255, 233, 122, 0.9)",

        300: "rgba(243, 220, 149, 1)",
        370: "rgba(243, 220, 149, 0.7)",
        380: "rgba(243, 220, 149, 0.8)",
        390: "rgba(243, 220, 149, 0.9)",

        400: "rgba(255, 171, 100, 1)",
        470: "rgba(255, 171, 100, 0.7)",
        480: "rgba(255, 171, 100, 0.8)",
        490: "rgba(255, 171, 100, 0.9)",

        500: "rgba(84, 123, 171, 1)",
        570: "rgba(84, 123, 171, 0.7)",
        580: "rgba(84, 123, 171, 0.8)",
        590: "rgba(84, 123, 171, 0.9)",

        black: "#000",

        600: "rgba(2, 175, 168, 1)",
        670: "rgba(2, 175, 168, 0.7)",
        680: "rgba(2, 175, 168, 0.8)",
        690: "rgba(2, 175, 168, 0.9)",

        700: "rgba(0, 149, 211, 1)",
        770: "rgba(0, 149, 211, 0.7)",
        780: "rgba(0, 149, 211, 0.8)",
        790: "rgba(0, 149, 211, 0.9)",

        800: "rgba(2, 48, 89, 1)",
        870: "rgba(2, 48, 89, 0.7)",
        880: "rgba(2, 48, 89, 0.8)",
        890: "rgba(2, 48, 89, 0.9)",

        900: "rgba(8, 13, 38, 1)",
        970: "rgba(8, 13, 38, 0.7)",
        980: "rgba(8, 13, 38, 0.8)",
        990: "rgba(8, 13, 38, 0.9)",
      },
      backgroundImage: {
        // FadeOut Gradients
        fadeOut900Op07:
          "radial-gradient(circle, rgba(1, 17, 38, 0.7), rgba(1, 17, 38, 0))",
        fadeOut900Op05:
          "radial-gradient(circle, rgba(1, 17, 38, 0.5), rgba(1, 17, 38, 0))",
        fadeOut900Op03:
          "radial-gradient(circle, rgba(1, 17, 38, 0.3), rgba(1, 17, 38, 0))",
        fadeOut800Op07:
          "radial-gradient(circle, rgba(1, 42, 94, 0.7), rgba(1, 42, 94, 0))",
        fadeOut800Op05:
          "radial-gradient(circle, rgba(1, 42, 94, 0.5), rgba(1, 42, 94, 0))",
        fadeOut800Op03:
          "radial-gradient(circle, rgba(1, 42, 94, 0.3), rgba(1, 42, 94, 0))",
        fadeOut700Op07:
          "radial-gradient(circle, rgba(41, 60, 84, 0.7), rgba(41, 60, 84, 0))",
        fadeOut700Op05:
          "radial-gradient(circle, rgba(41, 60, 84, 0.5), rgba(41, 60, 84, 0))",
        fadeOut700Op03:
          "radial-gradient(circle, rgba(41, 60, 84, 0.3), rgba(41, 60, 84, 0))",
        fadeOut600Op07:
          "radial-gradient(circle, rgba(97, 116, 140, 0.7), rgba(97, 116, 140, 0))",
        fadeOut600Op05:
          "radial-gradient(circle, rgba(97, 116, 140, 0.5), rgba(97, 116, 140, 0))",
        fadeOut600Op03:
          "radial-gradient(circle, rgba(97, 116, 140, 0.3), rgba(97, 116, 140, 0))",
        fadeOut500Op07:
          "radial-gradient(circle, rgba(84, 123, 171, 0.7), rgba(84, 123, 171, 0))",
        fadeOut500Op05:
          "radial-gradient(circle, rgba(84, 123, 171, 0.5), rgba(84, 123, 171, 0))",
        fadeOut500Op03:
          "radial-gradient(circle, rgba(84, 123, 171, 0.3), rgba(84, 123, 171, 0))",
        fadeOut400Op07:
          "radial-gradient(circle, rgba(167, 189, 217, 0.7), rgba(167, 189, 217, 0))",
        fadeOut400Op05:
          "radial-gradient(circle, rgba(167, 189, 217, 0.5), rgba(167, 189, 217, 0))",
        fadeOut400Op03:
          "radial-gradient(circle, rgba(167, 189, 217, 0.3), rgba(167, 189, 217, 0))",
        fadeOut300Op07:
          "radial-gradient(circle, rgba(217, 181, 173, 0.7), rgba(217, 181, 173, 0))",
        fadeOut300Op05:
          "radial-gradient(circle, rgba(217, 181, 173, 0.5), rgba(217, 181, 173, 0))",
        fadeOut300Op03:
          "radial-gradient(circle, rgba(217, 181, 173, 0.3), rgba(217, 181, 173, 0))",
        fadeOut200Op07:
          "radial-gradient(circle, rgba(208, 226, 242, 0.7), rgba(208, 226, 242, 0))",
        fadeOut200Op05:
          "radial-gradient(circle, rgba(208, 226, 242, 0.5), rgba(208, 226, 242, 0))",
        fadeOut200Op03:
          "radial-gradient(circle, rgba(208, 226, 242, 0.3), rgba(208, 226, 242, 0))",
        fadeOut100Op07:
          "radial-gradient(circle, rgba(228, 237, 245, 0.7), rgba(228, 237, 245, 0))",
        fadeOut100Op05:
          "radial-gradient(circle, rgba(228, 237, 245, 0.5), rgba(228, 237, 245, 0))",
        fadeOut100Op03:
          "radial-gradient(circle, rgba(228, 237, 245, 0.3), rgba(228, 237, 245, 0))",
        // Linear Gradients
        linear1:
          "linear-gradient(to top, rgba(228, 237, 245, 1), rgba(208, 226, 242, 1))",
        linear1op25:
          "linear-gradient(to top, rgba(228, 237, 245, 0.25), rgba(208, 226, 242, 0.25))",
        linear1op50:
          "linear-gradient(to top, rgba(228, 237, 245, 0.5), rgba(208, 226, 242, 0.5))",
        linear1op75:
          "linear-gradient(to top, rgba(228, 237, 245, 0.75), rgba(208, 226, 242, 0.75))",

        linear2:
          "linear-gradient(to bottom, rgba(217, 181, 173, 1), rgba(167, 189, 217, 1))",
        linear2op25:
          "linear-gradient(to bottom, rgba(217, 181, 173, 0.25), rgba(167, 189, 217, 0.25))",
        linear2op50:
          "linear-gradient(to bottom, rgba(217, 181, 173, 0.5), rgba(167, 189, 217, 0.5))",
        linear2op75:
          "linear-gradient(to bottom, rgba(217, 181, 173, 0.75), rgba(167, 189, 217, 0.75))",

        linear3:
          "linear-gradient(to right, rgba(84, 123, 171, 1), rgba(97, 116, 140, 1))",
        linear3op25:
          "linear-gradient(to right, rgba(84, 123, 171, 0.25), rgba(97, 116, 140, 0.25))",
        linear3op50:
          "linear-gradient(to right, rgba(84, 123, 171, 0.5), rgba(97, 116, 140, 0.5))",
        linear3op75:
          "linear-gradient(to right, rgba(84, 123, 171, 0.75), rgba(97, 116, 140, 0.75))",

        linear4:
          "linear-gradient(to left, rgba(41, 60, 84, 1), rgba(97, 116, 140, 1))",
        linear4op25:
          "linear-gradient(to left, rgba(41, 60, 84, 0.25), rgba(97, 116, 140, 0.25))",
        linear4op50:
          "linear-gradient(to left, rgba(41, 60, 84, 0.5), rgba(97, 116, 140, 0.5))",
        linear4op75:
          "linear-gradient(to left, rgba(41, 60, 84, 0.75), rgba(97, 116, 140, 0.75))",

        linear5:
          "linear-gradient(to top, rgba(97, 116, 140, 1), rgba(41, 60, 84, 1))",
        linear5op25:
          "linear-gradient(to top, rgba(97, 116, 140, 0.25), rgba(41, 60, 84, 0.25))",
        linear5op50:
          "linear-gradient(to top, rgba(97, 116, 140, 0.5), rgba(41, 60, 84, 0.5))",
        linear5op75:
          "linear-gradient(to top, rgba(97, 116, 140, 0.75), rgba(41, 60, 84, 0.75))",

        linear6:
          "linear-gradient(to bottom, rgba(1, 42, 94, 1), rgba(1, 17, 38, 1))",
        linear6op25:
          "linear-gradient(to bottom, rgba(1, 42, 94, 0.25), rgba(1, 17, 38, 0.25))",
        linear6op50:
          "linear-gradient(to bottom, rgba(1, 42, 94, 0.5), rgba(1, 17, 38, 0.5))",
        linear6op75:
          "linear-gradient(to bottom, rgba(1, 42, 94, 0.75), rgba(1, 17, 38, 0.75))",

        // Diagonal Gradients
        diagonal1:
          "linear-gradient(45deg, rgba(228, 237, 245, 1), rgba(217, 181, 173, 1))",
        diagonal1op25:
          "linear-gradient(45deg, rgba(228, 237, 245, 0.25), rgba(217, 181, 173, 0.25))",
        diagonal1op50:
          "linear-gradient(45deg, rgba(228, 237, 245, 0.5), rgba(217, 181, 173, 0.5))",
        diagonal1op75:
          "linear-gradient(45deg, rgba(228, 237, 245, 0.75), rgba(217, 181, 173, 0.75))",

        diagonal2:
          "linear-gradient(45deg, rgba(208, 226, 242, 1), rgba(167, 189, 217, 1))",
        diagonal2op25:
          "linear-gradient(45deg, rgba(208, 226, 242, 0.25), rgba(167, 189, 217, 0.25))",
        diagonal2op50:
          "linear-gradient(45deg, rgba(208, 226, 242, 0.5), rgba(167, 189, 217, 0.5))",
        diagonal2op75:
          "linear-gradient(45deg, rgba(208, 226, 242, 0.75), rgba(167, 189, 217, 0.75))",

        diagonal3:
          "linear-gradient(45deg, rgba(84, 123, 171, 1), rgba(41, 60, 84, 1))",
        diagonal3op25:
          "linear-gradient(45deg, rgba(84, 123, 171, 0.25), rgba(41, 60, 84, 0.25))",
        diagonal3op50:
          "linear-gradient(45deg, rgba(84, 123, 171, 0.5), rgba(41, 60, 84, 0.5))",
        diagonal3op75:
          "linear-gradient(45deg, rgba(84, 123, 171, 0.75), rgba(41, 60, 84, 0.75))",

        diagonal4:
          "linear-gradient(45deg, rgba(97, 116, 140, 1), rgba(1, 42, 94, 1))",
        diagonal4op25:
          "linear-gradient(45deg, rgba(97, 116, 140, 0.25), rgba(1, 42, 94, 0.25))",
        diagonal4op50:
          "linear-gradient(45deg, rgba(97, 116, 140, 0.5), rgba(1, 42, 94, 0.5))",
        diagonal4op75:
          "linear-gradient(45deg, rgba(97, 116, 140, 0.75), rgba(1, 42, 94, 0.75))",

        diagonal5:
          "linear-gradient(45deg, rgba(217, 181, 173, 1), rgba(84, 123, 171, 1))",
        diagonal5op25:
          "linear-gradient(45deg, rgba(217, 181, 173, 0.25), rgba(84, 123, 171, 0.25))",
        diagonal5op50:
          "linear-gradient(45deg, rgba(217, 181, 173, 0.5), rgba(84, 123, 171, 0.5))",
        diagonal5op75:
          "linear-gradient(45deg, rgba(217, 181, 173, 0.75), rgba(84, 123, 171, 0.75))",

        diagonal6:
          "linear-gradient(45deg, rgba(167, 189, 217, 1), rgba(97, 116, 140, 1))",
        diagonal6op25:
          "linear-gradient(45deg, rgba(167, 189, 217, 0.25), rgba(97, 116, 140, 0.25))",
        diagonal6op50:
          "linear-gradient(45deg, rgba(167, 189, 217, 0.5), rgba(97, 116, 140, 0.5))",
        diagonal6op75:
          "linear-gradient(45deg, rgba(167, 189, 217, 0.75), rgba(97, 116, 140, 0.75))",

        // Radial Gradients
        radial1:
          "radial-gradient(circle, rgba(208, 226, 242, 1) 0%, rgba(167, 189, 217, 1) 100%)",
        radial1op25:
          "radial-gradient(circle, rgba(208, 226, 242, 0.25) 0%, rgba(167, 189, 217, 0.25) 100%)",
        radial1op50:
          "radial-gradient(circle, rgba(208, 226, 242, 0.5) 0%, rgba(167, 189, 217, 0.5) 100%)",
        radial1op75:
          "radial-gradient(circle, rgba(208, 226, 242, 0.75) 0%, rgba(167, 189, 217, 0.75) 100%)",

        radial2:
          "radial-gradient(circle, rgba(217, 181, 173, 1) 0%, rgba(167, 189, 217, 1) 100%)",
        radial2op25:
          "radial-gradient(circle, rgba(217, 181, 173, 0.25) 0%, rgba(167, 189, 217, 0.25) 100%)",
        radial2op50:
          "radial-gradient(circle, rgba(217, 181, 173, 0.5) 0%, rgba(167, 189, 217, 0.5) 100%)",
        radial2op75:
          "radial-gradient(circle, rgba(217, 181, 173, 0.75) 0%, rgba(167, 189, 217, 0.75) 100%)",

        radial3:
          "radial-gradient(circle, rgba(84, 123, 171, 1) 0%, rgba(97, 116, 140, 1) 100%)",
        radial3op25:
          "radial-gradient(circle, rgba(84, 123, 171, 0.25) 0%, rgba(97, 116, 140, 0.25) 100%)",
        radial3op50:
          "radial-gradient(circle, rgba(84, 123, 171, 0.5) 0%, rgba(97, 116, 140, 0.5) 100%)",
        radial3op75:
          "radial-gradient(circle, rgba(84, 123, 171, 0.75) 0%, rgba(97, 116, 140, 0.75) 100%)",

        radial4:
          "radial-gradient(circle, rgba(167, 189, 217, 1) 0%, rgba(208, 226, 242, 1) 100%)",
        radial4op25:
          "radial-gradient(circle, rgba(167, 189, 217, 0.25) 0%, rgba(208, 226, 242, 0.25) 100%)",
        radial4op50:
          "radial-gradient(circle, rgba(167, 189, 217, 0.5) 0%, rgba(208, 226, 242, 0.5) 100%)",
        radial4op75:
          "radial-gradient(circle, rgba(167, 189, 217, 0.75) 0%, rgba(208, 226, 242, 0.75) 100%)",

        radial5:
          "radial-gradient(circle, rgba(84, 123, 171, 1) 0%, rgba(217, 181, 173, 1) 100%)",
        radial5op50:
          "radial-gradient(circle, rgba(84, 123, 171, 0.5) 0%, rgba(217, 181, 173, 0.5) 100%)",
        radial5op75:
          "radial-gradient(circle, rgba(84, 123, 171, 0.75) 0%, rgba(217, 181, 173, 0.75) 100%)",

        radial6:
          "radial-gradient(circle, rgba(41, 60, 84, 1) 0%, rgba(1, 42, 94, 1) 100%)",
        radial6op25:
          "radial-gradient(circle, rgba(41, 60, 84, 0.25) 0%, rgba(1, 42, 94, 0.25) 100%)",
        radial6op50:
          "radial-gradient(circle, rgba(41, 60, 84, 0.5) 0%, rgba(1, 42, 94, 0.5) 100%)",
        radial6op75:
          "radial-gradient(circle, rgba(41, 60, 84, 0.75) 0%, rgba(1, 42, 94, 0.75) 100%)",
      },
      borderRadius: {
        xxs: "0.3vh",
        xs: "0.5vh",
        sm: "0.7vh",
        md: "1vh",
        lg: "1.5vh",
        xl: "2vh",
        xxl: "3vh",
        xxxl: "4vh",
        full: "100%",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(100%)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: 0, transform: "translateY(-100%)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInRight: {
          "0%": { opacity: 0, transform: "translateX(100%)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: 0, transform: "translateX(-100%)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        fadeOutUp: {
          "0%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(-100%)" },
        },
        fadeOutDown: {
          "0%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(100%)" },
        },
        fadeOutRight: {
          "0%": { opacity: 1, transform: "translateX(0)" },
          "100%": { opacity: 0, transform: "translateX(100%)" },
        },
        fadeOutLeft: {
          "0%": { opacity: 1, transform: "translateX(0)" },
          "100%": { opacity: 0, transform: "translateX(-100%)" },
        },
        rotate: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        rotateUp: {
          from: { transform: "rotateX(0deg)" },
          to: { transform: "rotateX(360deg)" },
        },
        rotateDown: {
          from: { transform: "rotateX(0deg)" },
          to: { transform: "rotateX(-360deg)" },
        },
        rotateLeft: {
          from: { transform: "rotateY(0deg)" },
          to: { transform: "rotateY(360deg)" },
        },
        rotateRight: {
          from: { transform: "rotateY(0deg)" },
          to: { transform: "rotateY(-360deg)" },
        },
        scaleUp: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        scaleDown: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)" },
        },
        scaleUpLeft: {
          "0%": { transform: "scale(0) translateX(0)" },
          "100%": { transform: "scale(1) translateX(-50%)" },
        },
        scaleUpRight: {
          "0%": { transform: "scale(0) translateX(0)" },
          "100%": { transform: "scale(1) translateX(50%)" },
        },
        scaleDownLeft: {
          "0%": { transform: "scale(1) translateX(0)" },
          "100%": { transform: "scale(0) translateX(-50%)" },
        },
        scaleDownRight: {
          "0%": { transform: "scale(1) translateX(0)" },
          "100%": { transform: "scale(0) translateX(50%)" },
        },
        slideUp: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
        slideDown: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
        slideLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        slideRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        slideInUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideInUp50vh: {
          "0%": { transform: "translateY(50vh)" },
          "100%": { transform: "translateY(0)" },
        },
        slideInDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOutUp: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
        slideOutDown: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
        slideUpLeft: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%) translateX(-100%)" },
        },
        slideUpRight: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%) translateX(100%)" },
        },
        slideDownLeft: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%) translateX(-100%)" },
        },
        slideDownRight: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%) translateX(100%)" },
        },
        zoomIn: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        heartbeat: {
          "0%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.3)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.3)" },
          "70%": { transform: "scale(1)" },
        },
        ripple: {
          "0%": { transform: "scale(0.8)", opacity: 1 },
          "100%": { transform: "scale(2.4)", opacity: 0 },
        },
        rippleUp: {
          "0%": { transform: "scale(0.8) translateY(0)", opacity: 1 },
          "100%": { transform: "scale(2.4) translateY(-50%)", opacity: 0 },
        },
        rippleDown: {
          "0%": { transform: "scale(0.8) translateY(0)", opacity: 1 },
          "100%": { transform: "scale(2.4) translateY(50%)", opacity: 0 },
        },
        rippleLeft: {
          "0%": { transform: "scale(0.8) translateX(0)", opacity: 1 },
          "100%": { transform: "scale(2.4) translateX(-50%)", opacity: 0 },
        },
        rippleRight: {
          "0%": { transform: "scale(0.8) translateX(0)", opacity: 1 },
          "100%": { transform: "scale(2.4) translateX(50%)", opacity: 0 },
        },
        // Define keyframes for diagonal directions
        rippleUpLeft: {
          "0%": { transform: "scale(0.8) translate(0, 0)", opacity: 1 },
          "100%": {
            transform: "scale(2.4) translate(-50%, -50%)",
            opacity: 0,
          },
        },
        rippleUpRight: {
          "0%": { transform: "scale(0.8) translate(0, 0)", opacity: 1 },
          "100%": {
            transform: "scale(2.4) translate(50%, -50%)",
            opacity: 0,
          },
        },
        rippleDownLeft: {
          "0%": { transform: "scale(0.8) translate(0, 0)", opacity: 1 },
          "100%": {
            transform: "scale(2.4) translate(-50%, 50%)",
            opacity: 0,
          },
        },
        rippleDownRight: {
          "0%": { transform: "scale(0.8) translate(0, 0)", opacity: 1 },
          "100%": { transform: "scale(2.4) translate(50%, 50%)", opacity: 0 },
        },
        hueRotate: {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(360deg)" },
        },
        hueRotateUp: {
          "0%": { transform: "translateY(0)", filter: "hue-rotate(0deg)" },
          "100%": {
            transform: "translateY(-50%)",
            filter: "hue-rotate(360deg)",
          },
        },
        hueRotateDown: {
          "0%": { transform: "translateY(0)", filter: "hue-rotate(0deg)" },
          "100%": {
            transform: "translateY(50%)",
            filter: "hue-rotate(360deg)",
          },
        },
        hueRotateLeft: {
          "0%": { transform: "translateX(0)", filter: "hue-rotate(0deg)" },
          "100%": {
            transform: "translateX(-50%)",
            filter: "hue-rotate(360deg)",
          },
        },
        hueRotateRight: {
          "0%": { transform: "translateX(0)", filter: "hue-rotate(0deg)" },
          "100%": {
            transform: "translateX(50%)",
            filter: "hue-rotate(360deg)",
          },
        },
        vibrate: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-1vh)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(1vh)" },
        },
        vibrateUp: {
          "0%, 100%": { transform: "translateY(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateY(-1vh)" },
          "20%, 40%, 60%, 80%": { transform: "translateY(1vh)" },
        },
        vibrateDown: {
          "0%, 100%": { transform: "translateY(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateY(1vh)" },
          "20%, 40%, 60%, 80%": { transform: "translateY(-1vh)" },
        },
        vibrateLeft: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-1vh)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(1vh)" },
        },
        vibrateRight: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(1vh)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(-1vh)" },
        },
        vibrateUpLeft: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translate(-1vh, -1vh)" },
          "20%, 40%, 60%, 80%": { transform: "translate(1vh, 1vh)" },
        },
        vibrateUpRight: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translate(1vh, -1vh)" },
          "20%, 40%, 60%, 80%": { transform: "translate(-1vh, 1vh)" },
        },
        vibrateDownLeft: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translate(-1vh, 1vh)" },
          "20%, 40%, 60%, 80%": { transform: "translate(1vh, -1vh)" },
        },
        vibrateDownRight: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translate(1vh, 1vh)" },
          "20%, 40%, 60%, 80%": { transform: "translate(-1vh, -1vh)" },
        },
        raindrop: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      animation: {
        wiggle: "wiggle 1.5s ease-in-out infinite",
        fadeIn: "fadeIn 1.5s ease-out",
        fadeOut: "fadeOut 1.5s ease-out",
        fadeInUp: "fadeInUp 1.5s ease-out",
        fadeInDown: "fadeInDown 1.5s ease-out",
        fadeInRight: "fadeInRight 1.5s ease-out",
        fadeInLeft: "fadeInLeft 1.5s ease-out",
        fadeOutUp: "fadeOutUp 1.5s ease-out",
        fadeOutDown: "fadeOutDown 1.5s ease-out",
        fadeOutRight: "fadeOutRight 1.5s ease-out",
        fadeOutLeft: "fadeOutLeft 1.5s ease-out",
        rotate: "rotate 2s linear infinite",
        rotateUp: "rotateUp 1.5s linear infinite",
        rotateDown: "rotateDown 1.5s linear infinite",
        rotateLeft: "rotateLeft 1.5s linear infinite",
        rotateRight: "rotateRight 1.5s linear infinite",
        scaleUp: "scaleUp 1.5s ease-out",
        scaleDown: "scaleDown 1.5s ease-out",
        scaleUpLeft: "scaleUpLeft 1.5s ease-out",
        scaleUpRight: "scaleUpRight 1.5s ease-out",
        scaleDownLeft: "scaleDownLeft 1.5s ease-out",
        scaleDownRight: "scaleDownRight 1.5s ease-out",
        slideUp: "slideUp 1.5s ease-out",
        slideDown: "slideDown 1.5s ease-out",
        slideLeft: "slideLeft 1.5s ease-out",
        slideRight: "slideRight 1.5s ease-out",
        slideInUp: "slideInUp 1.5s ease-out",
        slideInUp50vh: "slideInUp50vh 1.5s ease-out",
        slideInDown: "slideInDown 1.5s ease-out",
        slideInRight: "slideInRight 1.5s ease-out",
        slideInLeft: "slideInLeft 1.5s ease-out",
        slideOutUp: "slideOutUp 1.5s ease-out",
        slideOutDown: "slideOutDown 1.5s ease-out",
        slideUpLeft: "slideUpLeft 1.5s ease-out",
        slideUpRight: "slideUpRight 1.5s ease-out",
        slideDownLeft: "slideDownLeft 1.5s ease-out",
        slideDownRight: "slideDownRight 1.5s ease-out",
        zoomIn: "zoomIn 1.5s ease-out",
        heartbeat: "heartbeat 1.5s ease-in-out infinite",
        ripple: "ripple 1.5s linear infinite",
        rippleUp: "rippleUp 1.5s linear infinite",
        rippleDown: "rippleDown 1.5s linear infinite",
        rippleLeft: "rippleLeft 1.5s linear infinite",
        rippleRight: "rippleRight 1.5s linear infinite",
        rippleUpLeft: "rippleUpLeft 1.5s linear infinite",
        rippleUpRight: "rippleUpRight 1.5s linear infinite",
        rippleDownLeft: "rippleDownLeft 1.5s linear infinite",
        rippleDownRight: "rippleDownRight 1.5s linear infinite",
        hueRotate: "hueRotate 3s linear infinite",
        hueRotateUp: "hueRotateUp 3s linear infinite",
        hueRotateDown: "hueRotateDown 3s linear infinite",
        hueRotateLeft: "hueRotateLeft 3s linear infinite",
        hueRotateRight: "hueRotateRight 3s linear infinite",
        vibrate: "vibrate 1.5s infinite",
        vibrateUp: "vibrateUp 1.5s infinite",
        vibrateDown: "vibrateDown 1.5s infinite",
        vibrateLeft: "vibrateLeft 1.5s infinite",
        vibrateRight: "vibrateRight 1.5s infinite",
        vibrateUpLeft: "vibrateUpLeft 1.5s infinite",
        vibrateUpRight: "vibrateUpRight 1.5s infinite",
        vibrateDownLeft: "vibrateDownLeft 1.5s infinite",
        vibrateDownRight: "vibrateDownRight 1.5s infinite",
        rain: "raindrop 1s linear infinite",
      },
      transitionTimingFunction: {
        elastic: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
        "ease-in-quad": "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
        "ease-in-cubic": "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
        "ease-in-quart": "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
        "ease-in-quint": "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
        "ease-in-sine": "cubic-bezier(0.47, 0, 0.745, 0.715)",
        "ease-in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "ease-in-circ": "cubic-bezier(0.6, 0.04, 0.98, 0.335)",
        "ease-in-back": "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
        "ease-out-quad": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "ease-out-cubic": "cubic-bezier(0.215, 0.61, 0.355, 1)",
        "ease-out-quart": "cubic-bezier(0.165, 0.84, 0.44, 1)",
        "ease-out-quint": "cubic-bezier(0.23, 1, 0.32, 1)",
        "ease-out-sine": "cubic-bezier(0.39, 0.575, 0.565, 1)",
        "ease-out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        "ease-out-circ": "cubic-bezier(0.075, 0.82, 0.165, 1)",
        "ease-out-back": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "ease-in-out-quad": "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
        "ease-in-out-cubic": "cubic-bezier(0.645, 0.045, 0.355, 1)",
        "ease-in-out-quart": "cubic-bezier(0.77, 0, 0.175, 1)",
        "ease-in-out-quint": "cubic-bezier(0.86, 0, 0.07, 1)",
        "ease-in-out-sine": "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
        "ease-in-out-expo": "cubic-bezier(1, 0, 0, 1)",
        "ease-in-out-circ": "cubic-bezier(0.785, 0.135, 0.15, 0.86)",
        "ease-in-out-back": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "snail-pace": "cubic-bezier(0.2, 0.1, 0.3, 0.2)",
        "bounce-out": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "elastic-start": "cubic-bezier(0.75, -0.5, 0.25, 1.75)",
        "sharp-snap": "cubic-bezier(0.9, 0.1, 0.1, 0.1)",
        "slow-mo": "cubic-bezier(0.05, 0.85, 0.15, 1)",
      },
    },
  },
  variants: {
    // Enable variants for text shadow if needed
    textShadow: ["responsive", "hover", "focus"],
  },
  plugins: [
    // TEXT SHADOW PLUGIN
    plugin(function ({ addUtilities, theme }) {
      const textShadows = theme("textShadow");
      const newUtilities = {};

      Object.keys(textShadows).forEach((key) => {
        // Skip HD keys to prevent duplication
        if (key.endsWith("HD")) return;

        const normalValue = textShadows[key];
        const hdKey = `${key}HD`;
        const hdValue = textShadows[hdKey];

        // Normal utility
        newUtilities[`.${key}`] = {
          textShadow: normalValue,
        };

        // HD utility with a media query
        if (hdValue) {
          newUtilities[`@media (min-width: 1920px)`] = {
            ...newUtilities[`@media (min-width: 1920px)`],
            [`.${key}`]: {
              textShadow: hdValue,
            },
          };
        }
      });

      addUtilities(newUtilities, ["responsive", "hover", "focus"]);
    }),
    // TEXT STROKE PLUGIN
    plugin(function ({ addUtilities, theme, e }) {
      const newUtilities = {};
      const strokeWidths = theme("textStrokeWidth", {});
      const strokeColors = theme("textStrokeColor", {});

      Object.keys(strokeWidths).forEach((widthKey) => {
        Object.keys(strokeColors).forEach((colorKey) => {
          const className = `.text-stroke-${widthKey}-${e(colorKey)}`;
          newUtilities[className] = {
            "-webkit-text-stroke-width": strokeWidths[widthKey],
            "-webkit-text-stroke-color": strokeColors[colorKey],
          };
        });
      });

      addUtilities(newUtilities, ["responsive", "hover", "focus"]);
    }),
    // TRANSITIONS PLUGIN
    plugin(function ({ addUtilities }) {
      const transitionUtilities = {
        ".transition-300": {
          transition: "all 300ms ease-in-out",
        },
        ".transition-400": {
          transition: "all 400ms ease-in-out",
        },
        ".transition-500": {
          transition: "all 500ms ease-in-out",
        },
        ".transition-600": {
          transition: "all 600ms ease-in-out",
        },
        ".transition-700": {
          transition: "all 700ms ease-in-out",
        },
        ".transition-800": {
          transition: "all 800ms ease-in-out",
        },
        ".transition-900": {
          transition: "all 900ms ease-in-out",
        },
        ".transition-1000": {
          transition: "all 1000ms ease-in-out",
        },
        ".transition-1100": {
          transition: "all 1100ms ease-in-out",
        },
        ".transition-1200": {
          transition: "all 1200ms ease-in-out",
        },
        ".transition-1300": {
          transition: "all 1300ms ease-in-out",
        },
        ".transition-1400": {
          transition: "all 1400ms ease-in-out",
        },
        ".transition-1500": {
          transition: "all 1500ms ease-in-out",
        },
        ".transition-1600": {
          transition: "all 1600ms ease-in-out",
        },
        ".transition-1700": {
          transition: "all 1700ms ease-in-out",
        },
        ".transition-1800": {
          transition: "all 1800ms ease-in-out",
        },
        ".transition-1900": {
          transition: "all 1900ms ease-in-out",
        },
        ".transition-2000": {
          transition: "all 2000ms ease-in-out",
        },
      };
      addUtilities(transitionUtilities, ["responsive", "hover", "focus"]);
    }),
    // BOX SHADOW PLUGIN
    plugin(function ({ addUtilities, theme }) {
      const boxShadows = theme("boxShadow");
      const newUtilities = {};

      Object.keys(boxShadows).forEach((key) => {
        // Skip HD keys to prevent duplication
        if (key.endsWith("HD")) return;

        const normalValue = boxShadows[key];
        const hdKey = `${key}HD`;
        const hdValue = boxShadows[hdKey];

        // Normal utility
        newUtilities[`.${key}`] = {
          boxShadow: normalValue,
        };

        // HD utility with a media query
        if (hdValue) {
          newUtilities[`@media (min-width: 1920px)`] = {
            ...newUtilities[`@media (min-width: 1920px)`],
            [`.${key}`]: {
              boxShadow: hdValue,
            },
          };
        }
      });

      addUtilities(newUtilities, ["responsive", "hover", "focus"]);
    }),
    // SCALE ITEM PLUGIN
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".scale-item-xs": {
          "@apply hover:cursor-pointer hover:scale-101 transition-all duration-500":
            {},
        },
        ".scale-item-sm": {
          "@apply hover:cursor-pointer hover:scale-102 transition-all duration-500":
            {},
        },
        ".scale-item-md": {
          "@apply hover:cursor-pointer hover:scale-103 transition-all duration-500":
            {},
        },
        ".scale-item-lg": {
          "@apply hover:cursor-pointer hover:scale-104 transition-all duration-500":
            {},
        },
        ".scale-item-Looser": {
          "@apply hover:cursor-pointer hover:scale-105 transition-all duration-500":
            {},
        },
        ".scale-item-xxl": {
          "@apply hover:cursor-pointer hover:scale-107 transition-all duration-500":
            {},
        },
      };

      // Add the utilities to Tailwind
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
    // OVERLAYS PLUGIN
    plugin(function ({ addBase, theme }) {
      addBase({
        ".defaultOverlay": {
          backgroundColor: theme("colors.col.850"), // Accessing your theme colors
          backdropFilter: "blur(4px)", // Example - use 'backdrop-blur-md' directly if appropriate
        },
        ".insetOverlay": {
          boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.5)", // Example - adjust as needed
          backgroundColor: theme("colors.col.930"),
        },
        ".defaultOverlayBlur": {
          backdropFilter: "blur(4px)",
        },
        ".imageOverlay": {
          backgroundImage:
            "linear-gradient(rgba(255, 233, 122, 0.4), rgba(255, 233, 122, 0.6)), url('/images/doathingbg2.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        },
        ".defaultTextGradient": {
          backgroundImage:
            "linear-gradient(to right, #D0E2F2, #D9B5AD, #e4edf5,  #D9B5AD, #D0E2F2);",
        },
        ".butterflyFont": {
          fontFamily: "'Butterfly Kids', cursive",
        },
      });
    }),
    // INPUT AND TEXTAREA PLUGIN
    plugin(function ({ addComponents, theme }) {
      const newComponents = {
        ".inputStyles": {
          width: "100%", // Full width
          backgroundColor: theme("colors.col.200"),
          backgroundImage: theme("backgroundImage.diagonal1op25"),
          boxShadow: theme("boxShadow.insetShadowMd"),
          color: theme("colors.col.900"),
          padding: `0.4vh 1vh`,
          borderWidth: "0.2vh",
          borderStyle: "solid",
          borderColor: theme("colors.col.400"),
          outline: "none",
          "&:focus": {
            boxShadow: theme("boxShadow.insetShadowLg"),
            borderWidth: "0.2vh",
            borderColor: theme("colors.col.300"),
          },
          transition: "all 0.4s ease-in-out",
        },
        ".textareaStyles": {
          width: "100%", // Full width
          backgroundColor: theme("colors.col.200"),
          backgroundImage: theme("backgroundImage.diagonal1op25"),
          boxShadow: theme("boxShadow.insetShadowMd"),
          color: theme("colors.col.900"),
          padding: `0.4vh 1vh`,
          borderWidth: "0.2vh",
          borderStyle: "solid",
          borderColor: theme("colors.col.400"),
          outline: "none",
          "&:focus": {
            boxShadow: theme("boxShadow.insetShadowLg"),
            borderWidth: "0.2vh",
            borderColor: theme("colors.col.300"),
          },
          transition: "all 0.4s ease-in-out",
        },
      };

      addComponents(newComponents);
    }),
    // ELEMENTS and LINKS PLUGIN
    plugin(function ({ addBase, theme }) {
      addBase({
        html: {
          padding: 0,
          margin: 0,
          boxSizing: "border-box",
          scrollBehavior: "smooth",
          overflowX: "hidden",
          scrollbarWidth: "thin",
          overflow: "hidden",
          borderFadius: "none",
          maxHeight: "100svh",
        },
        body: {
          color: theme("colors.col.900"),
          width: "100%",
          maxHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: '"Lato", sans-serif',
          backgroundImage: "url('/images/sitebackground.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          padding: 0,
          position: "relative",
          overflow: "hidden",
          scrollBehavior: "smooth",
          borderRadius: "none",
        },
        a: {
          color: theme("colors.col.600"),
          textShadow: theme("textShadow.lightTextShadow"),
          textStrokeColor: theme("colors.col.900"),
          textStrokeWidth: "0.2vh",
          textDecoration: "none",
          fontSize: theme("fontSize.md"),
          fontWeight: 600,
          transition: "all 400ms ease-in-out",
          "-webkit-text-stroke-width": "0.06vh",
          "-webkit-text-stroke-color": theme(`colors.col.900`, "currentColor"), // Use the border color for stroke color on hover
          "&:hover": {
            color: theme("colors.col.500"),
            textDecoration: "none",
            textShadow: theme("textShadow.textGlow"),
          },
          // You can add more pseudo-classes like focus or active with similar syntax
          "&:focus": {
            outline: "none",
          },
        },
        p: {
          margin: 0,
          padding: 0,
          fontSize: "inherit",
        },
      });
    }),

    typographyPlugin,
    customBackgroundsPlugin,
    buttonStyles,
    customBordersPlugin,
    transitionTimingFunctionsPlugin,
    perspectivePlugin,
    rotateYPlugin,
    backfaceVisibilityPlugin,
    transformStyles,
  ],
};
