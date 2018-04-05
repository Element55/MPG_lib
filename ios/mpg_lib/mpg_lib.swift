import Foundation
//Note that for objective-c (and therefore RN) to see the class you need to give the @objc hint
//Also, any method exposed to objective-c runtime will also require the hint.
//import MPGNotification
@objc(mpg_lib)
//{
//    title:
//    message:,
//
//}
class mpg_lib: RCTEventEmitter {
    //Demonstrate a basic promise-based function in swift
    @objc func demo(_ message:String, success: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        if(message.count == 0) {
            print("I did not receive a message");
            reject(nil, nil, nil);
        } else {
            print("I received a message of " + message);
            success(["demo message: " + message]);
        }
    }
    @objc func showNotification(_
        title: String,
        subtitle: String?,
        color: UIColor?,
        duration: NSNumber?,
        backgroundTapEnabled: NSNumber?,
        success: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) -> Void {
        let s = subtitle ?? "";
        let c = color ?? UIColor.blue;
        let d = duration ?? 3;
        var bgTapEnabled = true;
        if let num = backgroundTapEnabled {
            bgTapEnabled = num != 0 ? true : false;
        }
        DispatchQueue.main.async {
            if let notification = MPGNotification(title: title, subtitle: s, backgroundColor: c, iconImage: nil) {
                notification.duration = TimeInterval(d);
                notification.backgroundTapsEnabled = bgTapEnabled;
                notification.animationType = .linear;
                notification.show();
                success(["Notification should be showing up"]);
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
        return ["mpg_lib"]
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