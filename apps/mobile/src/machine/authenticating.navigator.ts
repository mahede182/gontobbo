import { ActorRefFrom, setup, sendParent, fromPromise } from "xstate";

import { login } from "@/api/auth";

export type AuthenticatingMachineActor = ActorRefFrom<typeof authenticatingMachine>;

export const authenticatingMachine = setup({
  types: {
    events: {} as
      | { type: "SIGN_IN" }
      | { type: "NAVIGATE"; screen: keyof AuthenticatingParamList }
      | { type: "STOP" },
  },
  actions: {
    sendParentSignIn: sendParent((_, { user }) => {
      return {
        type: "SIGN_IN",
        user,
      };
    }),
  },
  actors: {
    signIn: fromPromise(async ({ input }) => {
      const { user, password } = input;
      const result = await login(user, password);
      return result;
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFmAduglgMbIE5QB0+EANmAMQDKAkgOIByA+k2wNoAMAXUSgADgHtY+AmJzCQAD0QBGAEwBWcgDYALGoAcKgOzaVezXz6GlAGhABPZWfJ69SvnoCcFjx72HDmgC+gbZoWLgExKQUklA4+GRMOHQQMmCUOABuYgDW6WHYeEQkCTH4caVJCAnZUfgy-AKNcuKS0rJICogq2trkSppKvWpqAMyjhu7atg4IruSjKioeSh4q5qNDSmrBISA4YhBwcgURxdEtElL1HaCKCAC0mjOIT8GhGIWRJWSUNGCXNo3OT3EwvBBKPzkPgmNTaRbaQweTQTFTvECnIp1X6xeKJW4gVrXGQg7raPRaPjbXQDXqIlzgpSGCmaPxqLaGcZWDyGXaBIA */
  id: "authenticating",
  initial: "idle",
  states: {
    idle: {
      on: {
        SIGN_IN: {
          target: "signingIn",
        },
      },
    },
    signingIn: {
      invoke: {
        src: "signIn",
        input: ({ event }) => {
          const { user, password } = event.type === "SIGN_IN" ? event : {};
          return { user, password };
        },
        onDone: {
          actions: [
            {
              type: "sendParentSignIn",
              params: ({ event }) => {
                return event.output;
              },
            },
          ],
        },
      },
    },
  },
});
