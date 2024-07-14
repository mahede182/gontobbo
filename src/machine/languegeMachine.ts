import { createMachine, assign } from "xstate";

export const languegeMachine = createMachine(
  {
    id: "lang",
    initial: "Inactive",
    context: {
      toggle: "",
      language: "en",
    },
    states: {
      Inactive: {
        on: {
          TOGGLE: "Active",
          CHANGE_LANGUAGE: {
            actions: "changeLanguage",
          },
        },
      },
      Active: {
        on: {
          TOGGLE: "Inactive",
          CHANGE_LANGUAGE: {
            actions: "changeLanguage",
          },
        },
        after: { 2000: "Active" },
      },
    },
  },
  {
    actions: {
      changeLanguage: assign({
        language: (context, event) => event.language,
      }),
    },
  },
);
