import { createMachine } from "xstate";
export const toggleMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswDoCSAdgIYDGyAlgG5gDEaG2A2gAwC6ioADqrORagQ4gAHogCMAVgAcOAMwBOWQCZZANjGrmYqfOYSANCACe42WJxjZEgCxmJqgOxjb8hwF83h+llwBBMlS03kxsQty8-IJIIuJOOEqSmkoSTg5SyYYmCLIO8bqqjhLMSkqqStby1h5e6D44-hTUNMKwyETIuEQAZh0ATgAUSszDAJR0tdj1AdQs7NHhfOQCQqLZRfFKrioSYpZSDg6ZiAC0YvI4+xLSRRLy8kpSu7IeniAEqBBwQsFgYTyLy2iq2OqiOCFOzFyZykFXSaWuamqIB++GI01+83+kRWiGsSjBYhU8UkZhUCnuDnuSJRDUCfwiSyioFWSgczBwDls1gc5TMzCkCgJslkHPkqnkYmYZWsZQezxeQA */
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
