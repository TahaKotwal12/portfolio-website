import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** True once the component has hydrated on the client. */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
