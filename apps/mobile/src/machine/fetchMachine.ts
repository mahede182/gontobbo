import { createMachine, assign } from "xstate";

interface FetchMachineContext {
  data: any | null;
  error: any | null;
}

export const fetchMachine = createMachine<FetchMachineContext>({
  id: "fetchData",
  initial: "idle",
  context: {
    data: null,
    error: null,
  },
  states: {
    idle: {
      on: {
        fetch: {
          target: "loading",
          actions: assign({
            data: null,
            error: null,
          }),
        },
      },
      description: "Waiting to start fetching data.",
    },
    loading: {
      invoke: {
        id: "fetchData",
        src: async () => {
          try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
            if (!response.ok) {
              throw new Error(`Request failed with status ${response.status}`);
            }
            const data = await response.json();
            return data;
          } catch (error) {
            throw error;
          }
        },
        onDone: {
          target: "success",
          actions: assign({
            data: (_, event) => event?.data,
          }),
        },
        onError: {
          target: "failure",
          actions: assign({
            error: (_, event) => event?.data,
          }),
        },
      },
      description: "The machine is in the process of fetching data from the server.",
    },
    success: {
      on: {
        fetch: "loading",
      },
      description: "The machine has successfully fetched the data.",
    },
    failure: {
      on: {
        retry: "loading",
      },
      description: "The machine encountered an error while fetching the data.",
    },
  },
});
