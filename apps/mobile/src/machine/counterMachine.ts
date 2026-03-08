import { setup, assign, createActor } from "xstate";

type Context = {
  rooms: number;
  adults: number;
  children: number;
};

type Event =
  | { type: "INCREMENT_ROOMS" }
  | { type: "DECREMENT_ROOMS" }
  | { type: "INCREMENT_ADULTS" }
  | { type: "DECREMENT_ADULTS" }
  | { type: "INCREMENT_CHILDREN" }
  | { type: "DECREMENT_CHILDREN" };

export const counterMachine = setup({
  types: {
    context: {} as Context,
    events: {} as Event,
  },
  guards: {
    lessRoom: function ({ context }) {
      return context.rooms > 1;
    },
    lessAdults: function ({ context }) {
      return context.adults > 0;
    },
    lessChildren: function ({ context }) {
      return context.children > 0;
    },
  },
}).createMachine({
  id: "counter",
  initial: "active",
  context: {
    rooms: 1,
    adults: 1,
    children: 0,
  },
  states: {
    active: {
      on: {
        INCREMENT_ROOMS: {
          actions: assign({
            rooms: (state) => state.context.rooms + 1,
          }),
        },
        DECREMENT_ROOMS: {
          actions: assign({
            rooms: (state) => state.context.rooms - 1,
          }),
          guard: {
            type: "lessRoom",
          },
        },
        INCREMENT_ADULTS: {
          actions: assign({
            adults: (state) => state.context.adults + 1,
          }),
        },
        DECREMENT_ADULTS: {
          actions: assign({
            adults: (state) => state.context.adults - 1,
          }),
          guard: { type: "lessAdults" },
        },
        INCREMENT_CHILDREN: {
          actions: assign({
            children: (state) => state.context.children + 1,
          }),
        },
        DECREMENT_CHILDREN: {
          actions: assign({
            children: (state) => state.context.children - 1,
          }),
          guard: { type: "lessChildren" },
        },
      },
    },
  },
});

// Create the actor
export const counterActor = createActor(counterMachine);
// Start the actor
counterActor.start();
