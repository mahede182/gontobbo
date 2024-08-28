import { createMachine, assign } from "xstate";

export const counterMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMD2BXAdgFzAJwDoBDZbASwDcwBiASQDkBhAbQAYBdRUAB1VjPKpMXEAA9EAZgkBGAtIBM8gOxKAHKvmsArKw0AaEAE9E8ifIIBOJQBYLE1tYBsSx-OsSAvh4NosuQiTkVNQAIgCiLBwivPyCwkhiiAC0EtasBKpSEkrS2RaOthYGxgjSORnS1qrSOipp1k5ePhg4+MSklDQASmEAymEAKmycCTECZEIi4qWOBAU1TopK8qpa1tLFiFYE8lpSldKqKkfS0l7eIJioEHAivq140XzjkwnTKeoZWTl5BRZFRi2lnsEn+rAs8lOTgsqiaIHu-naQTAT1iE3ioGm1iUmwQ2XMulW0ghjhhumkjnOHiAA */
  id: "counter",
  initial: "active",
  context: {
    count: 0,
  },
  states: {
    active: {
      on: {
        INC: {
          actions: assign({
            count: (context) => context.count + 1,
          }),
        },
        DEC: {
          actions: assign({
            count: (context) => context.count - 1,
          }),
        },
        RESET: {
          target: "active",
          actions: assign({
            count: 0,
          }),
        },
      },
    },
  },
});
