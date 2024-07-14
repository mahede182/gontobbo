import { createMachine } from "xstate";
export const toggleMachine = createMachine({
  id: "toggle",
  initial: "Inactive",
  context: {
    toggle: "",
  },
  states: {
    Inactive: {
      on: {
        toggle: "Active",
      },
    },
    Active: {
      on: {
        toggle: "Inactive",
      },
      after: { 2000: "Active" },
    },
  },
});
