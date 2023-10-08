import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./redux";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const persistor = persistStore(store);
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={clientId}>
          <App />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </PersistGate>
  </Provider>,
);
