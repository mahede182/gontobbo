/* eslint-disable import/no-unresolved */
import { ActorRefFrom, setup, assign } from "xstate";
import { AuthenticatedParamList } from "../types/navigation";
import { HomeMachineActor, homeMachine } from "./home";
import { ListMachineActor, listMachine } from "./list";
import { navigationSubscriber } from "./shared/actors";

export type AuthenticatedMachineActor = ActorRefFrom<typeof authenticatedMachine>;

export const authenticatedMachine = setup({
  types: {
    context: {} as {
      refHome: HomeMachineActor | undefined;
      refList: ListMachineActor | undefined;
    },
    events: {} as { type: "NAVIGATE"; screen: keyof AuthenticatedParamList },
  },
  actions: {
    setRefHome: assign({
      refHome: ({ spawn }) => {
        return spawn("homeMachine");
      },
    }),
    setRefList: assign({
      refList: ({ spawn }) => {
        return spawn("listMachine");
      },
    }),
  },
  actors: {
    homeMachine,
    listMachine,
    navigationSubscriber,
  },
  guards: {
    isHomeScreen(_, params: { screen: keyof AuthenticatedParamList }) {
      return params.screen === "Home";
    },
    isListScreen(_, params: { screen: keyof AuthenticatedParamList }) {
      return params.screen === "List";
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqA2BLAxsgLlgPYB2AxAHICCAagJIDiVAKgKIDaADALqKipFYWQqT4gAHogAsAJgA0IAJ6IZAVgBsAOnUB2VTvUBGHTIDMR1QE5VAXxsK0mXAWLlq9Jm3aHeSEAKEREjFJBFkFZQRDVUNNUwMZS3VVAA5TGRSdSyk7exASIgg4MUdsPCCxAOFXEMQAWnUI+tVNSzb2jvaU9TsHdDKXUk0ACyIAWzAAZRwAJzAwYL8qir9Q03jNfUTDdUsUmTVLGSkmhDNTTSl0jM5LQzvM7t6QUucgzWxYfGm5hcrBaqiVaIdY6TYmO67faHY6nQwZTSGdIpTimQzw9TqFJSHq5IA */
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
      {
        guard: {
          type: "isListScreen",
          params: ({ event }) => {
            return {
              screen: event.screen,
            };
          },
        },
        target: ".listScreen",
      },
    ],
  },
  states: {
    homeScreen: { entry: ["setRefHome"] },
    listScreen: { entry: ["setRefList"] },
  },
});
