import Foundation
import EventKit

//swift코드를 objec에서도 쓸수있다고 정의
@objc(CalendarModule)

class CalendarModule: NSObject {
  var store = EKEventStore()
  
  //  첫번째에 objc에서 swift호출시 _ 를 넣는 이유는 함수 넘겨줄때 파라미터 생략할수 있기때문
  @objc func createCalendarEvent(_ timestampInSec:Double, title title:String,resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) ->Void{
    //캘린더를 사용하기위해 퍼미션 호출
    store.requestAccess(to: .event, completion: {granted, error in
      if(error != nil){
        reject("Permission_error", error?.localizedDescription,error)
        return
      }
      if(!granted){
        reject("Permission_denied", "Permission is denied", nil)
      }
      
      //  permission is granted
      let event:EKEvent = EKEvent(eventStore: self.store)
      event.title = title
      event.startDate = Date(timeIntervalSince1970: timestampInSec)
      event.endDate = Date(timeIntervalSince1970: timestampInSec)
      event.isAllDay = true;
      event.calendar = self.store.defaultCalendarForNewEvents
      
      // 실패시 에러 핸들링
      do {
        try self.store.save(event, span:.thisEvent)
        resolve(nil)
      }catch{
        reject("evnet_failure", error.localizedDescription, error)
      }
    })
  }
  
  // native모듈이 어떤 스레드에서 돌지 정해줌
  @objc static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
