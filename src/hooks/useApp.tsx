import { appMachine } from "@/machine/appMachine";
import { counterMachine } from "@/machine/counterMachine";
import { createActorContext, useSelector } from "@xstate/react";
import { createActor } from "xstate";

export const counterActor = createActor(counterMachine);
export const CounterContext = createActorContext(counterMachine);
export const AppContext = createActorContext(appMachine);

export function AppProvider({ children }: React.PropsWithChildren<unknown>) {
  return <AppContext.Provider>{children}</AppContext.Provider>;
}

export function useApp() {
  const actorRef = AppContext.useActorRef();
  const state = useSelector(actorRef, (snapshot) => {
    return snapshot;
  });

  return {
    state,
    send: actorRef.send,
  };
}
