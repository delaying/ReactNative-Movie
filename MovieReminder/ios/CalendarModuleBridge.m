//어떤함수를 react-native에 노출시킬지 작성

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CalendarModule,NSObject)
RCT_EXTERN_METHOD(createCalendarEvent:(double)timestampInSec
                  title:(NSString *)title
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject)
@end
