import { setup, assign, ActorRefFrom } from "xstate";
import { signIn } from "./shared/actors";
import { persistMachine } from "./persistiMachine";
import { saveItem } from "@/utils/storage";
import { TOKEN } from "@/constants/config";

export type NAuthenticatedMachineActor = ActorRefFrom<typeof newAuthMachine>;
export const NAuthenticatedMachine = setup({
  types: {
    context: {} as { error: null; userData: null; accessToken: null },
    events: {} as { type: "LOGIN" } | { type: "LOGOUT" } | { type: "RETRY_LOGIN" },
  },
  actors: {
    signInActor: signIn,
    persistActor: persistMachine,
  },
  actions: {
    setUserInfo: assign({
      userData: (_, event) => event?.userData,
      accessToken: (_, event) => event?.userData?.user?.accessToken,
      error: null,
    }),
    saveToken: (context) => saveItem(TOKEN, context.accessToken),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOlQOzSzD3QEsBjZdSAYggHs8xtS8A3ega2fMzHM4AFMACdYpWOgAqXYgG0ADAF1EoAA71xZRqpAAPRAGYAHAHZsCgIwAmAJzHDtgGymArNdeuANCACeiABZDJwtggKcFBQDrBTcAgF94n0IcfBTiMkpqCBpREXoRbDUAGyoAMwKAW2xefiFRcUkZbjxFFSQQDS1SHQ6DBEsFV2xXBVtBw0No11MXAJ9-BGsAhRHjGIDTMwUI2OtE5IxUgiOMiipaABkAeQBxAEkAOTbdLtJtPF1+k3MrOwdnG4PN4-IhLAFbNhjO4HAFLO5AbYDiAUth0iRzmQ8FA6IxmKwONxsAwAIKnDFZMAvDpvD5fRC2ZbYUybQyuSw2DzQ2wLRDWayGbAmazrcGzcEi5Go9GZKisHF5ApFUroCoiaqk8my6jU9Sad49T59BlMlmmNkc-mubm8gaGSzYSxslamWwrGJOdZSo5orWYq53a4AVSkus6+rpxoGkQdtgUZmMAXcHsctvtwychisroCxk9ntc3qwvqwADFkKRirQAEoAUSk1YAmgB9G4PZ7KV4Rw30hDOQUQ0wi3NOFxOyy24wOwz84z2ExzywuUyJJIgPD0CBwXQpLvdXqgfoAWlsgvGTnZM9scam1ltR5CkRjJk28OWtkLa9RaT9lIge4NA99EQI8k2wc9LzsG84R5UEEHtVZnCCNlXHsaxXSiIscBlTF5QAyND0QJwOSFXM43HAJKKCW0bBCCJTwcT0ITndCsJLPgKQuf8aW7ID+g5QxzDcdlwmMSIGMMW0PACIVE0GIZlnjcInDYlJy0rSB8J7KMBKEzxwU9cSTEkuC5xGC9bFMSwh0swSBVXeIgA */
  context: {
    error: null,
    userData: null,
    accessToken: null,
  },
  id: "auth",
  initial: "unauthenticated",
  states: {
    unauthenticated: {
      invoke: {
        id: "checkPersistToken",
        src: "persistActor",
        onDone: {
          target: "authenticated",
          actions: [
            assign({
              userData: (_, event) => event.data,
              accessToken: (_, event) => event.data?.accessToken,
            }),
            (context) => saveItem(TOKEN, context.accessToken),
          ],
        },
        onError: {
          target: "unauthenticated",
        },
      },
      on: {
        LOGIN: {
          target: "authenticating",
        },
      },
    },
    authenticating: {
      invoke: {
        id: "doAuthenticate",
        input: ({ event: { user, password } }) => ({ user, password }),
        src: "signInActor",
        onDone: {
          target: "authenticated",
          actions: [
            {
              type: "setUserInfo",
              params: ({ event: { output } }) => {
                return { userData: output, error: null };
              },
            },
            {
              type: "saveToken",
            },
          ],
        },
        onError: {
          target: "authFailed",
          actions: assign({
            error: ({ context, event: { data } }) => data,
            userData: null,
          }),
        },
      },
    },
    authenticated: {
      on: {
        LOGOUT: {
          target: "unauthenticated",
        },
      },
    },
    authFailed: {
      on: {
        RETRY_LOGIN: {
          target: "authenticating",
        },
      },
    },
  },
});
