import { assign, setup, fromPromise } from "xstate";
import { getItem } from "../utils/storage";
import { TOKEN } from "../constants/config";

export const authActor = setup({
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
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOgA5gDsIBLAqAYlnWQCd0BtABgF1FRcB7WY9YjgtiAAeiAIwBWcdgBMANgAc0gCzT5AdhUBmNWoCcAGhABPMWtHYzm3bNnTdS+7vlKAvi8Nos2Uj2LIANgD6yLjEgaQAbhwA1mDkEPxg3gRRsdieOD68AcGh4SkxYAiRHADGyLz8TMzVgpzclQJIwohqjIwWspqMsrqiorrSjPaGJgjy5prSdqKM2v3i0hJuHhg4+DTcVKQUCQRJJWkbW7xktc31vvyCIgjiomrYXfKMSmryuuJzE6NislLiJSyJSacSaF66NQKaQrEAZPBgTbEbZkciImgcGh4fwVABmmIAtgikSioOd2Fwrk1QLdpOJHm9GOotPJbFNfncOtYltooaIJv9RK5YQQOBA4IIMnVKY0bogALSyDnyzSybCqxjvcTWNRg+kw9xwtYIog7aUNPjUloIFQch7mdSA0FKJQSd6iWHwrJ+IIhMKHMDmqlyhAKNW6JnqN2iGxzO3vbD0ubDZTWJSMGOe43HZGnKBB2XNWmLGSaEE6DNzJQfO1dRNDKzA4FlpyaNxuIA */
  id: "auth",
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
        onError: {},

        src: "persisting",
      },
    },
  },
});
