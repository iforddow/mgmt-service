import { createTheme } from "@mantine/core";

export const theme = createTheme({
  colors: {
    primary: [
      "#dffbff",
      "#caf2ff",
      "#99e2ff",
      "#64d2ff",
      "#3cc4fe",
      "#23bcfe",
      "#00b5ff",
      "#00a1e4",
      "#008fcd",
      "#007cb6",
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

  breakpoints: {
    sm: "500",
    md: "768",
    lg: "992",
    xl: "1200",
    xxl: "1400",
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
});
