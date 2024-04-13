import { Provider } from "react-redux";
import { store } from "src/app/store";
import { ProviderProps } from "../type";

function ReduxProvider({ children }: ProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
