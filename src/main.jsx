import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "./index.css"; 
// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "Sepolia";
import { Sepolia } from "@thirdweb-dev/chains";
import { StateProvider } from "./context";

const container = document.getElementById("root");
const root = createRoot(container);
import { BrowserRouter } from "react-router-dom";
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={Sepolia}>
    <BrowserRouter>
    <StateProvider>
      <App /> 
    </StateProvider>  
    </BrowserRouter>  
    </ThirdwebProvider>
  </React.StrictMode>
);
