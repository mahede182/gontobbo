import { assign, setup, fromPromise, ActorRefFrom } from "xstate";
import { getItem } from "../utils/storage";
import { TOKEN } from "../constants/config";

export type PersistMachineActor = ActorRefFrom<typeof persistMachine>;

export const persistMachine = setup({
  types: {
    context: {} as {
      has_loaded_initial_data: boolean;
      persisted: boolean;
    },
  },
  actors: {
    persisting: fromPromise(() => {
      return new Promise((resolve, reject) => {
        getItem(TOKEN)
          .then((r) => {
            return resolve(r);
          })
          .catch((error) => {
            return reject(error);
          }); // token should be saved in auth
      });
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
