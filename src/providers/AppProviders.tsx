import { AntThemeConfig } from "configs/AntThemeConfig";

import { TaskFormProvider } from "./TaskFormProvider";

interface IAppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders = (props: IAppProvidersProps) => {
  const { children } = props;

  return (
    <AntThemeConfig>
      <TaskFormProvider>{children}</TaskFormProvider>
    </AntThemeConfig>
  );
};
