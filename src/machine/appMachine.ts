import { assign, setup } from "xstate";

export const appMachine = setup({
  types: {
    events: {} as { type: "START_APP" } | { type: "INCREMENT" } | { type: "MESSAGE" },
    context: {} as { rooms: number; message: string; initial: boolean },
  },
  actions: {},
  actors: {},
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0qBOBLAdgC4BKA9qQLYDEAkgHIDCxAogLLN0AqA2gAwC6iUKlKxchXKXxCQAD0QBWAMwYlANgDsARgCcvJRoAcGpQCZNAGhABPRABZThjHZM7DSwwtMLeJpQF9-KzRMHAIScmp2AGVogEEAcWY+QSQQETEJKRl5BDUtZzV8n3z3LXytK1sEAycirTtDXlMTBodA4PQsPCIySlo6Gh4BGQzxSWk03JMMBTVvUy0DOcNvSptEbzUMDR1y4w1TJS0tXkMOkBDu8IIoKggpMAwCADdSAGsn7GR3ggAFHqEFKjUTjbJTewaDDuJRKM6rDxmJQKOxVRCaHSFNTwrQaM4+OwXK5hIi3KhgbDYUjYLAAG2QhAAZtSKBhvr98ADwsC0mMspNQLlGrN9IZDKdToi7EU0QgFMYMItjM0tIY7Do9gpAkEQPhSBA4DIQiDMhMcogALQFOwSuzSuY6IxqYxKWUWtREroEcQmsECuSINUYNQ6ZRnDxaRYmNSypaY8XeXwNeWLcyezDIACuhAAFmBSQBjBm3X3880IaWzQxuBTKOxwxbHWNuVTNXh6IxtjzpjBZ3P5iRFwiQUtmiEVuq7EOmHQ2pT1syy8WqUwzo4KE714w9kkRSij8GC9EFPy+LwKDTKJq8BSyrxOQ57dXYxFpnXEwEl3mgsvjlyyjQNG2bR5w0G05jxWdtX8IA */
  id: "app",
  initial: "init",
  context: {
    rooms: 4,
    message: "Hello world",
    initial: true,
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
        INIT: {
          actions: [
            assign({
              initial: false,
            }),
            (state) => {
              saveItem("initial", state.context.initial);
            },
          ],
        },
      },
    },
  },
});
