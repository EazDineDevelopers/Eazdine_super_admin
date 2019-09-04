import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
// import { TokenService } from './core/token.service';
import { ProviderDetails } from 'src/app/public/model/provider';
import { AngularFirestore } from '@angular/fire/firestore';

const TOKEN_KEY = 'auth-token';
const TOKEN_VALUE = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);
  loginloader = new BehaviorSubject(true);

  changeLoginloader(value: boolean) {
    this.loginloader.next(value)
  }
  getLoginloader() {
    return this.loginloader.asObservable();
  }

  constructor(
    private storage: Storage,
    private plt: Platform,
    private http: HttpClient,
  //  private tokenservice: TokenService,
    private firestore:AngularFirestore
  ) { }

  setupTokenKey(key: any) {
    this.storage.set(TOKEN_KEY, key).then(result => {
   //   this.tokenservice.setToken(this.storage);
      this.authenticationState.next(true);
    });
  }


  // loginByEmail(loginDetail: LoginDetail) {
  //   let headers = new HttpHeaders();
  //   headers.set('Content-Type', 'application/json');
  //   headers.set('Access-Control-Allow-Origin', '*');

  //   let httpOptions = { headers: headers };
  //   this.http.post(environment.baseUrl + ApiConstants.LOGIN, loginDetail, httpOptions).subscribe((res: any) => {
  //     this.storage.set(TOKEN_KEY, res.api).then(result => {
  //       this.tokenservie.setToken(this.storage);
  //       this.authenticationState.next(true);
  //       this.changeLoginloader(false);
  //     },
  //       (err: any) => {
  //         this.changeLoginloader(false);
  //       });
  //   });
  // }


  /* processLogin(loginDetail: LoginDetail) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.post(environment.baseUrl + 'api/user/login', loginDetail, httpOptions);
  }


  register(userDetail: LoginDetail) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.post(environment.baseUrl + ApiConstants.REGISTER, userDetail, httpOptions);
  }

  registerUser(data,uuid) {
    return new Promise<LoginDetail>((resolve, reject) =>{
        this.firestore
            .collection("users").doc(uuid).set(JSON.parse(JSON.stringify(data)))
            .then(res => {}, err => reject(err));
    });
}

  registerWithProvider(provider: ProviderDetails) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };
    return this.http.post(environment.baseUrl + 'api/user/provider/userRegister', provider, httpOptions);
  } */

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      // this.tokenservie.logoutToken();
      this.authenticationState.next(false);
    })

  }

  isAuthenticate() {
    return this.authenticationState.value;
  }

  /* sendOtP(type) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };

    return this.http.post(environment.baseUrl + ApiConstants.SEND_OTP + type, {}, httpOptions);
  }

  confirmEmailOtp(otpData: ValidateOTP) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };

    return this.http.post(environment.baseUrl + ApiConstants.VALIDATE_OTP, otpData, httpOptions);
  }

  confirmMobileOtp(otpData: ValidateOTP) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    let httpOptions = { headers: headers };

    return this.http.post(environment.baseUrl + ApiConstants.VALIDATE_OTP, otpData, httpOptions);
  } */
}
