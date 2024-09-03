import { createMachine, assign } from "xstate";

// Reference: https://github.com/statelyai/xstate/discussions/4578
export const tagMachine = createMachine({
  id: "tag",
  initial: "inactive",
  context: {
    active: false,
    activeIds: [],
  },
  states: {
    inactive: {
      on: {
        TOGGLE: {
          target: "active",
          actions: assign({ active: true }),
        },
      },
    },
    active: {
      on: {
        TOGGLE: {
          target: "inactive",
          actions: assign({ active: false }),
        },
      },
    },
  },
});
