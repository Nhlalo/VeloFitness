//Since the colors of the header are dependent on the route, therefore they must be dynamically generated. This aids in creating different colors for different routes
function selectColors(
  bg: string,
  bg1: string,
  color: string,
  color1: string,
  logoBG: string,
  logoBG1: string,
  btnBG: string,
  btnBG1: string,
) {
  return {
    default: {
      bg,
      color,
      logoBG,
      btnBG,
    },
    scrolled: {
      bg: bg1,
      color: color1,
      logoBG: logoBG1,
      btnBG: btnBG1,
    },
  };
}

const homeColors = selectColors(
  "transparent",
  "#fff",
  "#000000",
  "#000000",
  "transparent",
  "#242424",
  "#000",
  "#000",
);

export { homeColors };
