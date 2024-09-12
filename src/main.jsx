import { StyleProvider } from "@ant-design/cssinjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import "./assets/styles.css";
import "./index.css";
import { store } from "./store/index.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
    mutations: {},
  },
});

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Suspense fallback={<></>}>
      <ToastContainer />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#ff416c",
            paddingLG: 0,
          },
          components: {
            Tabs: {
              verticalItemPadding: "0",
            },
          },
        }}
      >
        <StyleProvider hashPriority="low">
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </Provider>
        </StyleProvider>
      </ConfigProvider>
    </Suspense>
  </BrowserRouter>
);
