import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "../@types/tron.d.ts";

const reactotron = Reactotron.setAsyncStorageHandler!(AsyncStorage)
  .configure({
    name: "Gontobbo Mobile",
  })
  .useReactNative({
    asyncStorage: true,
    networking: {
      ignoreUrls: /symbolicate/,
    },
    editor: false,
    errors: { veto: (stackFrame: any) => stackFrame.fileName.indexOf("node_modules") === -1 },
    overlay: true,
  })
  .use(reactotronRedux())
  .connect();

console.tron = reactotron as any;
reactotron.clear?.();

export default reactotron;
