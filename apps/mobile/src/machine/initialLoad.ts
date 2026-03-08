import { setup, fromCallback } from "xstate";
import { NavigationProp } from "@react-navigation/native";

interface InitContext {
  isFirstLaunch: boolean;
}

interface InitEvent {
  type: "NEXT" | "NAVIGATE_TO_HOME";
}

export const initMachine = setup<InitContext, InitEvent>({
  types: {
    context: {} as InitContext,
    events: {} as InitEvent,
  },
  actors: {
    checkFirstLaunch: fromCallback(async (callback) => {
      const isFirstLaunch = await getItem("isFirstLaunch");
      if (isFirstLaunch === null) {
        await saveItem("isFirstLaunch", "false");
        callback({ data: true });
      } else {
        callback({ data: false });
      }
    }),
  },
}).createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QEsB2yAuBiAcgQQDUBJAcTwBUBRAfXIHlqAJOgWUoG0AGAXUVAAcA9rEzJBqPiAAeiAKwBmWQDoALAHZOneQE41ADj0AmeYYA0IAJ6IAjIYC+d82kxKAxgAswrgNZooAMWQAJ1gMABkAQwBXVA8sCHEwJTQAN0FvJOcMN08fP0CQ8OjY9wRUwVcIjDFULm46ySERavFJGQRDPTVVQ20ANjVtPT75HT7tcysEaz1rJVl9Wz7ZaxURvpUVByd0bIAzYNDImLicSgANcgakECbRVpv2jbmh8b7jTj1+7RVJxENOIYlINZAt5Gp5F8VHpQdsQFklLAvOIIABlVxBMBgVC4C5XHiNYT3CSPRDaLRKGbQiGcbTWHTqP4dQHA7SgiEQqEw2RwhEeLy+VABQ5FE7uLBgIJBQRBJT8AA2VT2MoAtsldjkBfkRccSmVUGlKi1ajxrgIica2ogVHTgXpOBDZHpodY1PSmSYVEpDPp7bT9INONYHI4QKhBBA4JIsoTmjUrQgALTWJk-b2ggEqWR9B2KPq8jX8vJCgpHYoeWPEhOMyw2bTyYF9YZ9axBmHyZb50MIg6FXUVm53S2khCyTjKawrQGfd6cFRaWRMgFAtkaUYmQw2gFqAsuJGuFHozHYyvD0DtNSbYEQlSGFbZn0mJcs1daUaGTfaQzB7sa9yCFUwCPLESXNOMHnPGxNGUXR6UUethiGRda2metr3kQFDCbNkMxDOwgA */
    id: "init",
    initial: "checkingFirstLaunch",
    context: {
      isFirstLaunch: true,
    },
    states: {
      checkingFirstLaunch: {
        invoke: {
          src: "checkFirstLaunch",

          onDone: {
            target: "firstLaunch",
            actions: assign({
              isFirstLaunch: (_, event) => event.data,
            }),
          },

          onError: {
            target: "homeScreen",
            reenter: true,
          },
        },
      },

      firstLaunch: {
        on: {
          NEXT: "secondScreen",
        },
      },

      secondScreen: {
        on: {
          NEXT: "homeScreen",
        },
      },

      homeScreen: {
        entry: "navigateToHome",
        type: "final",
      },
    },
    on: {
      NAVIGATE_TO_HOME: {
        actions: "navigateToHome",
      },
    },
  },
  {
    actions: {
      navigateToHome: (_, event) => {
        const { navigation } = event as { navigation: NavigationProp<any> };
        navigation.navigate("HOME");
      },
    },
  },
);
