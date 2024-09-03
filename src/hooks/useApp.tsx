import { counterMachine } from "@/machine/counterMachine";
import { createActorContext, useSelector } from "@xstate/react";

export const CounterContext = createActorContext(counterMachine);

export function CounterProvider({ children }: React.PropsWithChildren<unknown>) {
  return <CounterContext.Provider>{children}</CounterContext.Provider>;
}

export function useApp() {
  const actorRef = CounterContext.useActorRef();
  const state = useSelector(actorRef, (snapshot) => {
    return snapshot;
  });

  return {
    state,
    send: actorRef.send,
  };
}
