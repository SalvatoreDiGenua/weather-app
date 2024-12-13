import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { PrimeReactProvider } from "primereact/api";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

createRoot(document.getElementById("weather-root")!).render(
  <StrictMode>
    <PrimeReactProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </PrimeReactProvider>
  </StrictMode>
);
