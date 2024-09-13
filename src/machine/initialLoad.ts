import { assign, createMachine, setup } from "xstate";

export const initialLoad = setup({
  types: {
    context: {} as { retryCount: number; errorMessage: null; isFirstTime: boolean },
  },
  actions: {
    logInitializing: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    logLoading: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    logSuccess: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    logError: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    setErrorMessage: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
  },
  actors: {
    initializeApp: createMachine({
      /* ... */
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEsB2yAuyCGAbAMgPbYQB0AxgBZjkDWaUAYsgE6wYAqyAtmAMQBtAAwBdRKAAOhWJmSFU4kAA9EAJgDMQ0gFYAHEIDsqgJyqzQgCzGANCACeaq6QsBGfUJcXtQ3etXbtAF9A2zRZPCISCmo6BmY2Th5+ARcxJBApGSx5RRUEDS09QxMzVUsbe0QXIQA2UhMhdV0DRuNNAPVg0PQsCOIyVEIMePYuXj4OAHkAcWn8AFEAfUYASQAlAGUORY4VgFl54TTJaVkc9Lyaj1IDC3VtA2MhYxqrmtsHBF0XUl0zU1ULVq1UswRCIEGEDgijCvQI-UUmTOCguiAAtO9Kgg0dpnMZ8TVmnpPDUXLcuiBYTh4VEqDR6KgmKxRklEadsijQHkLKoPo4tMY3BYLIZtK8auoDDUKVS+lEAGbMxK8NlZOSc5SIAx-HTGXT6tx-NrNPn5CwGUjqK1NFoGFwBYwPGU9amRAZDEbKsCq5G5RDqYwW7QWQnqK4uQWqXQVT7VCz1IQPbwGbzCtoWMGBIA */
  id: "initialLoad",
  initial: "checkingFirstTime",
  context: {
    isFirstTime: true, // Set the initial value here
  },
  states: {
    checkingFirstTime: {
      always: [
        {
          cond: "isFirstTime",
          target: "firstTime",
        },
        {
          target: "notFirstTime",
        },
      ],
    },
    firstTime: {},
    notFirstTime: {
      on: {
        TOGGLE_FIRST_TIME: {
          target: "firstTime",
          actions: assign({
            isFirstTime: false,
          }),
        },
      },
    },
  },
  guards: {
    isFirstTime: (context) => context.isFirstTime,
  },
});
