const { teal, grey, cyan } = require("@mui/material/colors");

const getDesignTokens = (mode) => ({
  palette: {
    // @ts-ignore
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          ilyess: {
            main: teal[700],
          },
          favcolor: {
            main: grey[300],
          },
          mycolor: {
            main: "blue"
          },
        }
      : {
          // palette values for dark mode
          ilyess: {
            main: cyan[500],
          },
          favcolor: {
            main: grey[700],
          },
          mycolor: {
            main: "blue"
          },
        }),
  },
});
export default getDesignTokens;
