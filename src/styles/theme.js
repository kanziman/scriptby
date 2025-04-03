// theme.js
export const theme = {
  breakpoints: {
    desktop: "120rem",
    /* 84em BELOW 1344px (Smaller desktops) */
    smallDesktop: "90rem",
    /* 75em BELOW 1200px (Landscape Tablets) */
    landScapeTablet: "80rem",
    /* 59em BELOW 960px (Tablets) */
    tablet: "75rem", // 태블릿 기준
    /* 50em BELOW 800px (Smaller tablets) */
    smallTablet: "55rem", // 모바일 기준
    /* 34em BELOW 544px (Phones) */
    mobile: "37.5rem", // 모바일 기준
  },
  colors: {
    primary: "#3498db",
    secondary: "#2ecc71",
  },
  fonts: {
    primary: '"Poppins", "Sono", sans-serif',
  },
};
