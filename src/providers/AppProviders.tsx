import { AntThemeConfig } from "configs/AntThemeConfig";

import { AddColumnFormProvider } from "./AddColumnFormProvider";
import { ImageUrlProvider } from "./ImageUrlProvider";

interface IAppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders = (props: IAppProvidersProps) => {
  const { children } = props;

  return (
    <AntThemeConfig>
      <ImageUrlProvider>
        <AddColumnFormProvider>{children}</AddColumnFormProvider>
      </ImageUrlProvider>
    </AntThemeConfig>
  );
};
