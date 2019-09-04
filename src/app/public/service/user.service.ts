import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UserBasic } from '../model/user-basic-details';

@Injectable({
  providedIn: "root"
})
export class UserService {
  public paymentMode = new BehaviorSubject<string>(null);
  public userBasic = new ReplaySubject<UserBasic>(1);
  public processOnGoing = new BehaviorSubject<boolean>(true);
  public tipAmount = new ReplaySubject<number>(1);

  constructor(public http: HttpClient) { }


  getTipAmount() {
    return this.tipAmount.asObservable();
  }

  public changeTipAmount(tipAmount: number) {
    this.tipAmount.next(tipAmount)
  }


  getProcessOnGoing() {
    return this.processOnGoing.asObservable();
  }

  public changeProcessOnGoing(processOnGoing: boolean) {
    this.processOnGoing.next(processOnGoing)
  }
  
  
  getPaymentMode() {
    return this.paymentMode.asObservable();
  }

  public changePaymentMode(paymentMode: string) {
     this.paymentMode.next(paymentMode)
  }



  getUserBasic() {
    return this.userBasic.asObservable();
  }
  changeUserBasic(userBasic: UserBasic) {
    this.userBasic.next(userBasic);
  }
}
