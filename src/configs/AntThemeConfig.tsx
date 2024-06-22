import { ConfigProvider } from "antd";

interface IAntConfigProps {
  children: React.ReactNode;
}

export const AntThemeConfig = (props: IAntConfigProps) => {
  const { children } = props;

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
          Radio: {
            algorithm: true,
            colorPrimary: "#ff6667",
          },
          DatePicker: {
            algorithm: true,
            colorPrimary: "#ff6667",
          },
          Spin: {
            algorithm: true,
            colorPrimary: "#ff6667",
          }
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
