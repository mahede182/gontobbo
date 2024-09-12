import { assign, setup } from "xstate";

export const appMachine = setup({
  types: {
    events: {} as { type: "START_APP" } | { type: "INCREMENT" } | { type: "MESSAGE" },
    context: {} as { rooms: number; message: string },
  },
  actions: {},
  actors: {},
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0qBOBLAdgC4BKA9qQLYDEAkgHIDCxAogLLN0AqA2gAwC6iUKlKxchXKXxCQAD0QAWABwYA7OoDMAVlVaAbEt4LeARlUAaEAE9EAJn1qAnCb28tjx70e3bbgL4BlvikEHAyaKgyImISUjLyCAC0epY2SXoYvFnZOTmqgSARGATiUaLiktJIcoiGGCZuCnreShrGenq2qYgmGo4YSia2CqqujlpaCgrDBUXIAK6EABZgRLgAxsgS+FBlMZXxil3WPY4qGry+Cg0KGrYaGiZas+gYC8urEpuEkHsVcdUElNMkoznoTN4TMpVG4UicEIMMHdbM4TFDVEoJrYlC9MDgCCRyBQ-rEqqAEjp6rdbGZHDDbBipt0ENpVJkmoYlOpellHHoAgEgA */
  id: "app",
  initial: "printRoom",
  context: {
    rooms: 1,
    message: "Hello world",
  },
  states: {
    init: {},
    authenticating: {},
    authenticated: {},
    printRoom: {
      on: {
        INCREMENT: {
          actions: assign({
            rooms: (state) => state.context.rooms + 1,
          }),
        },
        MESSAGE: { message: (state) => state.context.message },
      },
    },
  },
});
