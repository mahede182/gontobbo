import { ActorRefFrom, setup, assign } from "xstate";
import { AuthenticatedParamList } from "../types/navigation";
import { HomeMachineActor, homeMachine } from "./homeMachine";
import { navigationSubscriber } from "./shared/actors";

export type AuthenticatedMachineActor = ActorRefFrom<typeof authenticatedMachine>;

export const authenticatedMachine = setup({
  types: {
    context: {} as {
      refHome: HomeMachineActor | undefined;
    },
    events: {} as { type: "NAVIGATE"; screen: keyof AuthenticatedParamList },
  },
  actions: {
    setRefHome: assign({
      refHome: ({ spawn }) => {
        return spawn("homeMachine");
      },
    }),
  },
  actors: {
    homeMachine,
    navigationSubscriber,
  },
  guards: {
    isHomeScreen(_, params: { screen: keyof AuthenticatedParamList }) {
      return params.screen === "HOME";
    },
    isListScreen(_, params: { screen: keyof AuthenticatedParamList }) {
      return params.screen === "List";
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqA2BLAxsgLlgPYB2AxAHICCAagJIDiVAKgKIDaADALqKipFYWQqT4gAHogAsAJgA0IAJ6IAjAFYVAOgDMAdgBsMgJz6AHJylGjpmaYC+DhSSIQ4YtJlwFiJMQKEivkgSiAC0+grKCKFqmlbxCQmm+o4gHth4gZoAFkQAtmAAyjgATmBgQfyCwj5ikgjGpppSplJ6+pyc+tb6ulKRqraaKtq2Kpa62qamuroyDg5AA */
  context: { refHome: undefined, refList: undefined },
  id: "application",
  initial: "homeScreen",
  invoke: { src: "navigationSubscriber" },
  on: {
    NAVIGATE: [
      {
        guard: {
          type: "isHomeScreen",
          params: ({ event }) => {
            return {
              screen: event.screen,
            };
          },
        },
        target: ".homeScreen",
      },
    ],
  },
  states: {
    homeScreen: { entry: ["setRefHome"] },
  },
});
