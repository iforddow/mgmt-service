import { createTheme } from "@mantine/core";

export const theme = createTheme({
  colors: {
    primary: [
      "#e1f8ff",
      "#cbedff",
      "#9ad7ff",
      "#64c1ff",
      "#3aaefe",
      "#20a2fe",
      "#099cff",
      "#0088e4",
      "#0079cd",
      "#0068b6",
    ],
    secondary: [
      "#e6ffee",
      "#d3f9e0",
      "#a8f2c0",
      "#7aea9f",
      "#54e382",
      "#3bdf70",
      "#2bdd66",
      "#1bc455",
      "#0bae4a",
      "#00973c",
    ],
    error: [
      "#ffe8e9",
      "#ffd1d1",
      "#fba0a0",
      "#f76d6d",
      "#f44141",
      "#f22625",
      "#f21616",
      "#d8070b",
      "#c10007",
      "#a90003",
    ],
  },

  primaryColor: "primary",

  primaryShade: 6,

  black: "#1A1B1E",

  white: "#FFF",

  shadows: {
    xs: "0 1px 3px rgba(0, 0, 0, 0.1)",
    sm: "0 1px 5px rgba(0, 0, 0, 0.1)",
    md: "0 4px 8px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px rgba(0, 0, 0, 0.1)",
    xxl: "0 25px 50px rgba(0, 0, 0, 0.25)",
  },

  breakpoints: {
    sm: "500px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    xxl: "1400px",
  },

  autoContrast: true,

  luminanceThreshold: 0.45,

  radius: {
    xs: "4px",
    sm: "6px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },

  defaultRadius: "md",

  //! FONT SETTINGS

  // Enable font smoothing
  fontSmoothing: true,

  // Font family for all components
  fontFamily:
    "Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif",

  // Font family for headings
  headings: {
    fontFamily:
      "Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif",
  },

  respectReducedMotion: true,
});
