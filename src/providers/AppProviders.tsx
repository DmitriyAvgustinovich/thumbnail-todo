import { AntThemeConfig } from "configs/AntThemeConfig";

import { EntityFormProvider } from "./EntityFormProvider";
import { ImageUrlProvider } from "./ImageUrlProvider";

interface IAppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders = (props: IAppProvidersProps) => {
  const { children } = props;

  return (
    <AntThemeConfig>
      <ImageUrlProvider>
        <EntityFormProvider>{children}</EntityFormProvider>
      </ImageUrlProvider>
    </AntThemeConfig>
  );
};
