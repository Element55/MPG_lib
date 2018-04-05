import { NativeModules, NativeEventEmitter } from "react-native";
const mpg_lib_native = NativeModules.mpg_lib;

const showErrorNotification = async (title, subtitle) => {
  showNotification(title, subtitle, "#FF0000");
};
const showSuccessNotification = async (title, subtitle) => {
  showNotification(title, subtitle, "#00FF00");
};
const showNotification = async (title, subtitle = "", color = "#0000FF") => {
  const output = await mpg_lib_native.showNotification(title, subtitle, color);
  return output;
};
export { showErrorNotification, showSuccessNotification, showNotification };
