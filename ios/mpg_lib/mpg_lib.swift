import Foundation
//Note that for objective-c (and therefore RN) to see the class you need to give the @objc hint
//Also, any method exposed to objective-c runtime will also require the hint.
//import MPGNotification
@objc(mpg_lib)
class mpg_lib: RCTEventEmitter {
    //https://stackoverflow.com/questions/24263007/how-to-use-hex-colour-values
    func hexStringToUIColor (hex:String) -> UIColor {
        var cString:String = hex.trimmingCharacters(in: .whitespacesAndNewlines).uppercased()
        
        if (cString.hasPrefix("#")) {
            cString.remove(at: cString.startIndex)
        }
        
        if ((cString.count) != 6) {
            return UIColor.gray
        }
        
        var rgbValue:UInt32 = 0
        Scanner(string: cString).scanHexInt32(&rgbValue)
        
        return UIColor(
            red: CGFloat((rgbValue & 0xFF0000) >> 16) / 255.0,
            green: CGFloat((rgbValue & 0x00FF00) >> 8) / 255.0,
            blue: CGFloat(rgbValue & 0x0000FF) / 255.0,
            alpha: CGFloat(1.0)
        )
    }
    @objc func showNotification(_ key: String, title: String, subtitle: String?, hexBackgroundColor: String?, success: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock
    ) -> Void {
        let s = subtitle ?? "";
        var bgColor:UIColor;
        if let c = hexBackgroundColor {
            bgColor = self.hexStringToUIColor(hex: c);
        } else {
            bgColor = UIColor.blue;
        }
        var d: TimeInterval = 3;
//        if let _ = duration {
//            d = TimeInterval(duration!)
//        } else {
//            d = 3;
//        }

        DispatchQueue.main.async {
            if let notification = MPGNotification(title: title, subtitle: s, backgroundColor:bgColor, iconImage: nil) {
                notification.duration = d;
                notification.backgroundTapsEnabled = true;
                notification.animationType = .linear;
                notification.show(buttonHandler: { (mpgnotification, buttonIndex) in
                    let body = [
                        "key": key,
                        "buttonIndex": buttonIndex
                        ] as [String : Any];
                    self.sendEvent(withName: "on_notification_tap", body: body)
                })
                notification.dismissHandler = { (mpgNotification) in
                    success(["rnswift_template_native"]);
                }
            } else {
                reject(nil,nil,nil);
            }
        }
    }
    //Demonstrate using the event emitter
    @objc func delayedSend(_ message: String, ms:Int) -> Void {
        let body = ["message": message];
        DispatchQueue.main.asyncAfter(deadline: .now() + .milliseconds(ms)) {
            self.sendEvent(withName: "mpg_lib", body: body)
        }
    }
    //Note that any event name used in sendEvent above needs to be in this array.
    override func supportedEvents() -> [String]! {
        return ["mpg_lib", "on_notification_tap"]
    }
    //Demonstrate setting constants. Note that constants can be (almost) any type, but that this function is only evaluated once, at initialidation
    @objc override func constantsToExport() -> Dictionary<AnyHashable, Any> {
        return [
            "a": "A",
            "b": "B",
            "startTime": Date().description
        ];
    }
    override class func requiresMainQueueSetup() -> Bool {
        return false;
    }
}
