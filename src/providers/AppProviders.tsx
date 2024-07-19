import { AntThemeConfig } from "configs/AntThemeConfig";

import { ColumnFormProvider } from "./ColumnFormProvider";
import { ImageUrlProvider } from "./ImageUrlProvider";
import { TaskFormProvider } from "./TaskFormProdiver";

interface IAppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders = (props: IAppProvidersProps) => {
  const { children } = props;

  return (
    <AntThemeConfig>
      <ImageUrlProvider>
        <ColumnFormProvider>
          <TaskFormProvider>{children}</TaskFormProvider>
        </ColumnFormProvider>
      </ImageUrlProvider>
    </AntThemeConfig>
  );
};
