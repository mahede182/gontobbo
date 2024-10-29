import { setup, assign, ActorRefFrom } from "xstate";
import { signIn } from "./shared/actors";

export type NAuthenticatedMachineActor = ActorRefFrom<typeof newAuthMachine>;
export const NAuthenticatedMachine = setup({
  types: {
    context: {} as { error: null; userData: null; accessToken: null },
    events: {} as { type: "LOGIN" } | { type: "LOGOUT" } | { type: "RETRY_LOGIN" },
  },
  actors: {
    signInActor: signIn,
  },
  actions: {
    setUserInfo: assign({
      userData: (_, event) => event?.userData,
      accessToken: (_, event) => event?.userData?.user?.accessToken,
      error: null,
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOlQOzSzD3QEsBjZdSAYgBkB5AcQEkA5AbQAYBdRUAA4B7WKTJC8-EAA9EAJjldsATgAsAVjkA2ABxbl69VrkB2ADQgAnogCMq5dh2atJxTq73VXOQF8fFwhxA4jJKMjwoGggJMGxSPAA3IQBrWOiAQQxMEIoqMG4+JBBhUXFJItkELVU5R2UdLx09AGYDVXMreTlm7GadbTl1Li0bE2auZT8ArOxgklzwyLAAJ2WhZewBABsqADN1gFtsDKycsPzeKRKxUgkpSuranXrGlraO6wQbZptsb80PDYtD89DUpiBArNTvNzhB6MwGABVAAqBSuIhudwqiFcSi46nqzRMXFaNjkBgsnx+6mwwK4HgJWm8JnURPBkMCADFkKQtrQAEoAUWR-IAmgB9RisTiXIrXMr3RC6X7VBpArzKCZGSmIHS-ZoKEw2TXKZSDI1+fwgPBCCBwKSBdGlW7lUCVAC0Wh1CE97Jm+DmoTyECdmNdMkQNW9NnUOmwWrG6iN-T6Ji0fqwUKIMKo8SgoYV2IQBoc9lN42UP2UwIpnS+2lpEyByhs7meqnTVo50KD1BDcoxhbduo0KmGikUJgMzQN3sGSmaqh+qbUpk0GaCWW5vMgBZdioQDRpmuM3i4U9Zs7rz2wRiTprkoMTnb8QA */
  context: {
    error: null,
    userData: null,
    accessToken: null,
  },
  id: "auth",
  initial: "unauthenticated",
  states: {
    unauthenticated: {
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
