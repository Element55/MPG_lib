import { NativeModules, NativeEventEmitter } from "react-native";
const mpg_lib_native = NativeModules.mpg_lib;
const pendingNotifications = [];
const isNotificationActive = false;
const makeGuid = (pieces, delimiter, prepend) => {
  if (typeof pieces == "undefined") pieces = 4;
  if (typeof delimiter == "undefined") delimiter = "-";
  if (typeof prepend == "undefined") prepend = "";
  const S4 = () => {
    return Math.floor(Math.random() * 0x10000 /* 65536 */).toString(16);
  };

  const hashes = [];
  for (var x = 0; x < pieces; x++) {
    hashes.push(S4() + S4());
  }
  return prepend + hashes.join(delimiter);
};

const e = new NativeEventEmitter(mpg_lib_native);
const s = e.addListener("on_notification_tap", d => {
  const { key } = d;
  const n = pendingNotifications.find(n => {
    if (n.key === key) return true;
    return false;
  });
  if (n && typeof n.onTap == "function") {
    n.onTap();
  }
});
const defaultOptions = Object.freeze({
  duration: 3,
  backgroundColor: "#00FF00",
  onTap: null
});
const showNotification = async (
  title,
  subtitle = "",
  options = defaultOptions
) => {
  const key = makeGuid();
  if (typeof options !== "object") {
    console.warn(
      "showNotification: third argument must be an object. Valid keys: ",
      JSON.stringify(Object.keys(defaultOptions))
    );
    options = defaultOptions;
  }
  pendingNotifications.push({
    key,
    title,
    subtitle,
    options
  });
  showPendingNotifications();
  return key;
};
const showPendingNotifications = async () => {
  if (!pendingNotifications.length) return;
  const thisNotification = pendingNotifications[0];
  if (!thisNotification) return;
  if (isNotificationActive) return;
  isNotificationActive = true;
  const { key, title, subtitle, options } = thisNotification;
  const { duration, backgroundColor } = options;
  const output = await mpg_lib_native.showNotification(
    key,
    title,
    subtitle,
    backgroundColor,
    duration
  );
  isNotificationActive = false;
  pendingNotifications.shift();
  if (pendingNotifications.length) {
    showPendingNotifications();
  }
  return output;
};
export { showNotification };
