import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyles from "./styles/global.ts";
import OpeningPage from "./pages/OpeningPage.tsx";
import GamePage from "./pages/GamePage.tsx";
import { UserContextProvider } from "./UserContextProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <OpeningPage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/game",
    element: <GamePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserContextProvider>
      <GlobalStyles />
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>,
);
