import { NativeModules, NativeEventEmitter } from "react-native";
const mpg_lib_native = NativeModules.mpg_lib;

const mpg_lib = {
  nativeObj: mpg_lib_native,
  a: mpg_lib_native.a,
  b: mpg_lib_native.b,
  startTime: mpg_lib_native.startTime,
  addListener: cb => {
    const e = new NativeEventEmitter(mpg_lib_native);
    const s = e.addListener("mpg_lib", cb);
    return s;
  },
  addListenerDemo: () => {
    mpg_lib.addListener(arr => {
      console.log("Received a mpg_lib event", arr.message);
    });
  },
  emitMessage: async (message, delayms) => {
    if (!delayms) delayms = 0;
    return await mpg_lib_native.delayedSend(message, delayms);
  },
  demoWithPromise: async message => {
    //Returns a promise!
    const output = await mpg_lib_native.demo(message);
    return output;
  },
  showNotification: async () => {
    const output = await mpg_lib_native.showNotification();
    console.warn(output);
    return output;
  }
};

export default mpg_lib;
