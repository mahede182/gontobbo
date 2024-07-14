import { createMachine, assign } from "xstate";
export const counterMachine = createMachine({
  id: "counter",
  context: {
    count: 0,
  },
  on: {
    INC: {
      actions: assign({
        count: ({ context }) => context.count + 1,
      }),
    },
    DEC: {
      actions: assign({
        count: ({ context }) => context.count - 1,
      }),
    },
    SET: {
      actions: assign({
        count: ({ context }) => (context.count = 0),
      }),
    },
  },
});
