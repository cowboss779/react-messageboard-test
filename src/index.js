import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    "red.300": "#220000",
    "red.400": "#440000",
    "red.500": "#660000",
    blue: "blue",
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  // </React.StrictMode>
);
