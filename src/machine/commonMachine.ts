import { createMachine, assign } from "xstate";
// Define a machine
export const commonMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOlQOzSzD3QEsBjZdSAYgBkB5AcQEkA5AbQAYBdRUAA4B7WKTJC8-EAA9EAJjldsATgDsANgCs6uZoA0IAJ6IAjJqVqtOzQF8bBwjkfEylMnig0IEsNlJ4ANyEAa19vAEEMTBcKKjBuPiQQYVFxSSTZBAAWZWVsOQAOZS5rA2MEBU1sLM0AZhNdOwco7GcSWPdPMAAnbqFu7AEAGyoAM36AW2wIqJi3eN4pFLFSCSlMnLzC4tKjU1q5JpBHVtn2+Yh6ZgYAVQAVBKWRFbWMxE0NarqG-T2EeoKKhKjXsxxajgAYshSENaAAlACidzhAE0APqMVicRZJZZpdbvWqArhZdQFVS-coFEzYWxHPBCCBwKSOJ6pVbpUCZAC06jKiG5VVywpFotqRxO+DarjiEDZL05MkQWTk-IQZjymk0yiKmgKtQNhqyEvBZxlnXl+Le-1qSgUVl0aoaqhUGm0IOaWFORHOsstHIJCFUXDkKmUchM5Mp8jq2C4Jltin1hoNxtBJ0h0NhctxzytXMQwdDuQjUbVxTjyZT1fFdhsQA */
  id: "auth",
  initial: "unauthenticated",
  context: {
    userData: null,
    error: null,
    accessToken: null,
  },
  states: {
    unauthenticated: {
      on: {
        LOGIN: "authenticating",
      },
    },
    authenticating: {
      invoke: {
        id: "doAuthenticate",
        src: (context, event) => authenticateUser(event.username, event.password),
        onDone: {
          target: "authenticated",
          actions: assign({
            userData: (context, event) => event.data,
            error: null, // Clear any error
          }),
        },
        onError: {
          target: "authFailed",
          actions: assign({
            error: (context, event) => event.data,
            userData: null, // Clear any user data
          }),
        },
      },
    },
    authenticated: {
      on: {
        LOGOUT: "unauthenticated",
      },
    },
    authFailed: {
      on: {
        RETRY_LOGIN: "authenticating",
      },
    },
  },
});

// Mock authentication function
function authenticateUser(username, password) {
  return new Promise((resolve, reject) => {
    // Simulate an API call
    setTimeout(() => {
      if (username === "user" && password === "password") {
        resolve({ username: "user", name: "John Doe" });
      } else {
        reject(new Error("Invalid username or password"));
      }
    });
  });
}
