import { assign, setup, stopChild } from "xstate";
import { AuthenticatingMachineActor, authenticatingMachine } from "./authenticating.navigator";
import { AuthenticatedMachineActor, authenticatedMachine } from "./authenticated.navigator";
import { NAuthenticatedMachineActor, NAuthenticatedMachine } from "./commonMachine";

export const appMachine = setup({
  types: {
    events: {} as
      | { type: "START_APP" }
      | {
          type: "SIGN_IN";
          user: any | null;
        },
    context: {} as {
      user: any | null;
      refAuthenticating: AuthenticatingMachineActor | null;
      refAuthenticated: AuthenticatedMachineActor | null;
      refNAuthenticated: NAuthenticatedMachineActor | null;
    },
  },
  actions: {
    setRefAuthenticating: assign({
      refAuthenticating: ({ spawn, self }) => {
        return spawn("authenticatingMachine", { input: { parent: self } });
      },
    }),
    stopRefAuthenticating() {
      stopChild("refAuthenticating");
    },
    setRefAuthenticated: assign({
      refAuthenticated: ({ spawn, self }) => {
        return spawn("authenticatedMachine", { input: { parent: self } });
      },
    }),
    stopRefAuthenticated() {
      stopChild("refAuthenticated");
    },
    setUserInfo: assign({
      user: (_, event) => event.user,
    }),
  },
  actors: {
    authenticatingMachine,
    authenticatedMachine,
    NAuthenticatedMachine,
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqA2BLAxsgLlgPYB2AdFiVoctgF6VQDEAygCoCCASmwPocAFAQG0ADAF1EoVEVjViJKSAAeiAEyjRZAJwBmNWr0BWUWoBsARgu6ALABoQAT0RWA7GSOW11s2psAOAP9-AF8QhzRMXAIFMmQAV3wACzASQjxCEmYWAEkAcQA5XhyCsUkkEBk5QlIlVQQzURsyUV0rbVczExtTIwdnBG1m-11tfzMbIxsLIyN-VrCI9GwM2NQAJ0p8LiIiAFsmEoBhLgBRAFlTgrYypSr5Wor6gLI2oytJzz1xv37EXVcFjIhiGnj8okarhsrkWIEiKxipDIGy2O32TEuLBYHDyp1uFXuNUUT0QnjI0x6ZihgI0Nhsaj+CH0QICZm0sypFjMEyMulh8OiRORmzSaIOJRyNwkd1kD2JoHqRm0HlE-iMgL0Nk5jIs7PJ-h8+lcrlV7JhsJIRAgcCUAtWj2ksqJdUQAFozIz3S1NJpde9-MazPzloLYpR5LQsAwsjLqgoXQh6Yyhq8LMbrDNOlNAcGovbyAlkql0jEYwSnfGSUyXqNmQY3iapoyDa8DHpAdzbJZQuE4SH83FEik0oLILG5QnXO8WrozADRuyjGpZs2gfpDBoAZpobmEUKUaLdntx86q2SzPMxnMlRN6dpGdCgbMtfM06I5qqwmEgA */
  id: "application",
  initial: "initializing",
  context: {
    rooms: 4,
    message: "Hello world",
    initial: true,
    user: null,
    refAuthenticating: null,
    refAuthenticated: null,
  },
  states: {
    initializing: {
      entry: {},
      on: { START_APP: { target: "authenticating" } },
    },
    authenticating: {
      entry: ["setRefAuthenticating"],
      on: {
        SIGN_IN: {
          actions: [
            {
              type: "setUserInfo",
              params: ({ event: { user } }) => {
                return { user };
              },
            },
          ],
          target: "authenticated",
        },
      },
      exit: ["stopRefAuthenticating"],
    },
    authenticated: {
      entry: ["setRefAuthenticated"],
      exit: ["stopRefAuthenticated"],
    },
    printRoom: {
      on: {
        INCREMENT: {
          actions: assign({
            rooms: (state) => state.context.rooms + 1,
          }),
        },
        MESSAGE: { message: (state) => state.context.message },
        INIT: {
          actions: [
            assign({
              initial: false,
            }),
            (state) => {
              saveItem("initial", state.context.initial);
            },
          ],
        },
      },
    },
  },
});
