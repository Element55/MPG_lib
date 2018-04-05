import Foundation
@objc(mpg_libBasicViewManager)
class mpg_libBasicViewManager: RCTViewManager {
    //MARK: RCTViewManager key methods
    override func view() -> UIView {
        let newView = UIView()
        newView.backgroundColor = UIColor.green
        return newView
    }
    override class func requiresMainQueueSetup() -> Bool {
        return false;
    }
}
