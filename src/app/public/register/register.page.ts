import { Component, OnInit } from '@angular/core';
import { LoginDetail } from '../model/login-detail';
import { SucessMessage } from '../model/success-message';
import { ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProviderDetails } from '../../public/model/provider';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  resgisterDetail: LoginDetail = new LoginDetail();
  password:any;
  constructor(
    private toastController: ToastController,
    private modalController: ModalController,
    private router: Router,
    private afAuth: AngularFireAuth,
    private firestore:AngularFirestore
  ) { }

  ngOnInit() {
  }



 
   async register() {
    try {
      let reg = await  this.afAuth.auth.createUserWithEmailAndPassword(
        this.resgisterDetail.email,this.password);
      if (reg) {
        this.resgisterDetail.role='SUPER ADMIN';
        this.resgisterDetail.isEmailVerify=true;
        let data=this.resgisterDetail;
        this.firestore
        .collection("users").doc(reg.user.uid).set(JSON.parse(JSON.stringify(data))).then(res => {
              console.log(res);
             this.router.navigate(['login']);
          });
      }
    } catch (err) {
      console.log(err);
      this.presentToast(err.message);
    }
  } 



 // register() {
    //this.progress = true;
  //  this.afAuth.auth.createUserWithEmailAndPassword(this.resgisterDetail.email,this.resgisterDetail.password)

   // this.firebaseResgisterDetail
  //  let data=this.resgisterDetail;
  //   this.authService.registerUser( data) .then(res => {
  //   console.log(res);
  // });
  
 // this.authService.register(this.resgisterDetail).subscribe((success: SucessMessage) => {
    //   if ("SREG-01" == success.messageCode) {
    //     this.validateOTP();
    //     this.progress = false;
    //   } else {
    //     this.presentToast(success.message);
    //   }
    // });
  //}

  /* async validateOTP() {
    const modal = await this.modalController.create({
      component: MobileOtpVerifyComponent,
      componentProps: {
        email: this.resgisterDetail.email,
        phone: this.resgisterDetail.mobileNumber,
        type: 'EMAIL'
      }
    });
    await modal.present();
    await modal.onDidDismiss().then(data => {
      this.router.navigate(['login']);
    });



    /* const dialogRef = this.openTableDialog.open(ValidateUserRegisterOTPDialog, {
      width: '600px',
      data: {
        hostedMobileNo: this.eazdineUser.mobileNumber,
        hostedEmail: this.eazdineUser.email
      }
    });

    dialogRef.componentInstance.otpEmmiter.subscribe((data) => {

      this.validOTP.otpForValue = data.hostedMobileNo;
      this.validOTP.otpFor = "MOBILE";
      this.validOTP.otpNumber = data.mobileOTP;

      this.loginService.validateOTP(this.validOTP).subscribe((sucessMessage: any) => {

        if ("acess_token" == sucessMessage.messageCode) {
          this.tokenStorage.saveToken(sucessMessage.api);
          this.loginService.getUserDetails().subscribe((data: UserBasic) => {

            this.loginService.changeUserDetails(data);
            this.router.navigate(['/event']);
          });

        } else {
          this.snackBar.open("Invalid", "OTP ", {
            duration: 2000
          });
        }
      });
    });
 
  } */
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
