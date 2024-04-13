import { useEffect } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useTypedSelector } from "src/app/store";
import { ProviderProps } from "../type";

function FullScreenProvider({ children }: ProviderProps) {
  const handle = useFullScreenHandle();

  const { screenMode } = useTypedSelector((state) => state.layout);

  useEffect(() => {
    if (screenMode === "enter") handle.enter();
    else if (screenMode === "exit") handle.exit();
  }, [screenMode]);

  return <FullScreen handle={handle}>{children}</FullScreen>;
}

export default FullScreenProvider;
