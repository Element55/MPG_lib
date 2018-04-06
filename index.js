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
const findNotificationByKey = key => {
  const n = pendingNotifications.find(n => {
    if (n.key === key) return true;
    return false;
  });
  return n;
};

const e = new NativeEventEmitter(mpg_lib_native);
e.addListener("on_notification_tap", d => {
  try {
    const { key } = d;
    const n = findNotificationByKey(key);
    if (n && n.options && typeof n.options.onTap == "function") {
      n.options.onTap();
    }
  } catch (error) {
    console.warn(error.message);
  }
});
e.addListener("on_notification_dismiss", d => {
  try {
    const { key } = d;
    console.log("on_notification_dmiss: fired for>", d);
    const n = findNotificationByKey(key);

    if (n && n.options && typeof n.options.onDismiss == "function") {
      console.log("on_notification_dmiss: fire dismiss callback");

      n.options.onDismiss();
    } else {
      console.log("on_notification_dmiss: cant fire dismiss callback>", n);
    }
  } catch (error) {
    console.warn(error.message);
  }
});
const defaultOptions = Object.freeze({
  duration: 3,
  backgroundColor: "#000000",
  onTap: null,
  onDismiss: null
});
const showNotification = async (title, subtitle = "", options) => {
  const key = makeGuid();
  if (typeof options !== "object") {
    console.warn(
      "showNotification: third argument must be an object. Valid keys: ",
      JSON.stringify(Object.keys(defaultOptions))
    );
    options = {};
  }
  options = Object.assign({}, defaultOptions, options);
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
