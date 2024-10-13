import { Provider } from "react-redux";

import { store } from "../config/store";

interface StoreProviderProps {
  children?: React.ReactNode;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children } = props;

  return <Provider store={store}>{children}</Provider>;
};
