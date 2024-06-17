import { ConfigProvider } from "antd";

import { AppRouter } from "components/AppRouter/AppRouter";

export const App = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            algorithm: true,
            colorPrimary: "#ff6667",
          },
          Input: {
            algorithm: true,
            colorPrimary: "#ff6667",
          },
        },
      }}
    >
      <AppRouter />
    </ConfigProvider>
  );
};
