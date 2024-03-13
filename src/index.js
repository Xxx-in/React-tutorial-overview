import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./tutorial/App.js";
import App2 from "./tutorial/App2.jsx";
import App3 from "./tutorial/App3.jsx";
import App4 from "./tutorial/App4.jsx";
import App5 from "./tutorial/App5.jsx";
import App6 from "./additional/App6_HighlightWinningPattern.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    {/* <App /> */}
    {/* <App2 /> */}
    {/* <App3 /> */}
    {/* <App4 /> */}
    {/* <App5 /> */}
    <App6 />
  </StrictMode>
);