import { assign, setup, fromPromise, ActorRefFrom } from "xstate";
import { getTokens } from "../utils/storage";
import { getMe } from "../api/auth";

export type PersistMachineActor = ActorRefFrom<typeof persistMachine>;

export const persistMachine = setup({
  types: {
    context: {} as {
      has_loaded_initial_data: boolean;
      persisted: boolean;
    },
  },
  actors: {
    persisting: fromPromise(async () => {
      const tokens = await getTokens();
      if (!tokens?.accessToken) throw new Error("No token");
      // Validate the token is still good
      const user = await getMe();
      return user;
    }),
    load_initial_data: fromPromise(() => {
      return new Promise((resolve) => {
        resolve(true);
      });
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAcwCdYEtYBcB0qAdhJoVAMS4CGaOA2gAwC6iKA9ljpm4ayAB6IAjAFYReAEwA2ABwShUoTIDsIqRIAsAGhABPYTKl5lUgMwBOBqZNipUjSIC+jnagzZ8pTFyoAbAPpUyJj+pABubADWYOQQPGB44VEJbli4iYTemH6BwaGEEdEISQDGVFw8jExVfMgcWTx8ggjKDAzG6uZS5hIMGqZCpjI6+ggyQnimEhLmQuZTrTIMqs6u6Gn4qR6kFHGECUnRBOvbZDVIIHWc3LwXzSJCynhmyuZyM+NSyqYjwlLiIg09n6GksElUMmcLhAhDYEDgtROuFq9Qqt1AzQAtFJfghsatLkjNmBiDsUddGndEBoJLilEYeiJTKDWqoNDIpgStukvD4AkEQocwOSGuiBIhZAyGDIlrIJGoRMpaXphMoZHhFVZlrNAUJpJDodzie5cGSLldRU1EPKJJJmcz5hIhgNmXSzBrejSnSJzCDlFDHEA */
  id: "persist",
  initial: "pending",
  context: {
    persisted: false,
    has_loaded_initial_data: false,
  },

  states: {
    pending: {
      on: {
        start: "persisting",
      },
    },

    initial_api_invoke: {
      invoke: {
        onDone: {
          actions: assign({
            has_loaded_initial_data: true,
          }),
        },

        src: "load_initial_data",
      },
    },

    persisting: {
      id: "persisting",
      invoke: {
        id: "persisting",

        onDone: {
          actions: assign({
            persisted: true,
          }),
          target: "initial_api_invoke",
        },

        src: "persisting",
      },
    },
  },
});
