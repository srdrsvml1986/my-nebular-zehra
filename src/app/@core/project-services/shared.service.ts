import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private subject = new Subject<any>();

  sendChangeUserNameEvent(){
    this.subject.next(null);

  }
  getChangeUserNameClickEvent():Observable<any>{
    return this.subject.asObservable();
 }

}
