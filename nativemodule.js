import { NativeModules, NativeEventEmitter } from "react-native";
const mpg_lib_native = NativeModules.mpg_lib;

const mpg_lib = {
  showErrorNotification: async (title, subtitle) => {
    mpg_lib.showNotification(title, subtitle, "#FF0000");
  },
  showSuccessNotification: async (title, subtitle) => {
    mpg_lib.showNotification(title, subtitle, "#00FF00");
  },
  showNotification: async (title, subtitle = "", color = "#0000FF") => {
    const output = await mpg_lib_native.showNotification(
      title,
      subtitle,
      color
    );
    return output;
  }
};

export default mpg_lib;
