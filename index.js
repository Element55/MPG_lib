import { NativeModules, NativeEventEmitter } from "react-native";
const mpg_lib_native = NativeModules.mpg_lib;
const pendingNotifications = [];
const isNotificationActive = false;
const makeGuid = (
  pieces,
  delimiter,
  prepend
) => {
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
const s = e.addListener("on_notification_tap", (d) => {
  const { key } = d;
  const n = pendingNotifications.find((n) => {
    if (n.key === key) return true;
    return false;
  });
  console.log(n, JSON.stringify(pendingNotifications))
  if (n && typeof n.onTap == "function") {
    n.onTap();
  }
});

const showNotification = async (title, subtitle = "", color = "#0000FF", onTap) => {
  const key = makeGuid();
  console.log('sjhoNotification: start>', key, title)
  pendingNotifications.push({
    key,
    title,
    subtitle,
    color,
    onTap
  });
  showPendingNotifications();
};
const showPendingNotifications = async () => {
  if (!pendingNotifications.length) return;

  const thisNotification = pendingNotifications[0];
  if (!thisNotification) return;
  if (isNotificationActive) return;
  isNotificationActive = true;
  const { key, title, subtitle, color } = thisNotification;
  console.log('showPenidngNotifications: pendingNotifications.length before>', pendingNotifications.length)
  const output = await mpg_lib_native.showNotification(key, title, subtitle, color);
  isNotificationActive = false;
  pendingNotifications.shift();
  console.log('showPenidngNotifications: pendingLocations.length: after>', pendingNotifications.length)
  if (pendingNotifications.length) {
    showPendingNotifications();
  }
  return output;
}
export { showNotification };
