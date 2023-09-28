import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./redux";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const persistor = persistStore(store);
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId={clientId as string}>
        <App />
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>,
);
