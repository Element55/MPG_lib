#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeModule.h>
@interface RCT_EXTERN_MODULE(mpg_lib, RCTEventEmitter)
RCT_EXTERN_METHOD(showNotification:(NSString *)key title:(NSString *)title subtitle:(NSString *)subtitle hexBackgroundColor:(NSString *)hexBackgroundColor duration:(double)duration hexTitleColor:(NSString *)hexTitleColor hexSubtitleColor:(NSString *)hexSubtitleColor allowTapDismissal:(BOOL)allowTapDismissal success:(RCTPromiseResolveBlock)success reject:(RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(delayedSend:(NSString *)message ms:(NSInteger)ms);
@end