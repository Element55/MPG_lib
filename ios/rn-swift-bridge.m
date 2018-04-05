#import <React/RCTViewManager.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeModule.h>
@interface RCT_EXTERN_MODULE(mpg_lib, RCTEventEmitter)
RCT_EXTERN_METHOD(demo:(NSString *)message success:(RCTPromiseResolveBlock)success reject:(RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(showNotification:(NSString *)key title:(NSString *)title subtitle:(NSString *)subtitle hexBackgroundColor:(NSString *)hexBackgroundColor success:(RCTPromiseResolveBlock)success reject:(RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(delayedSend:(NSString *)message ms:(NSInteger)ms);
@end
@interface RCT_EXTERN_MODULE(mpg_libBasicViewManager, RCTViewManager)
@end
@interface RCT_EXTERN_MODULE(mpg_libViewManager, RCTViewManager)
RCT_EXTERN_METHOD(takePicture:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject);
RCT_EXPORT_VIEW_PROPERTY(onStart, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(cameraFront, BOOL);
@end