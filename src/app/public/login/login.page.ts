import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserBasic } from '../model/user-basic-details';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  password:any;
  progress: boolean;
  loginDetail: UserBasic = new UserBasic();
  constructor(
    private statusBar: StatusBar,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    private platform: Platform,
    private toastController: ToastController,
    private router: Router,
    private authService: AuthenticationService,
    private afAuth: AngularFireAuth,
    private firestore:AngularFirestore,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.statusBar.hide();
  }


  login() {
    // this.router.navigate(['home/restaurants']);
   try {
      this.progress = true;
      this.afAuth.auth.signInWithEmailAndPassword(this.loginDetail.email,this.password) 
      .then(res => {
        this.firestore.collection('users').doc(res.user.uid).valueChanges().subscribe((user:any)=>{
          this.authService.authenticationState.next(true);
          this.userService.changeUserBasic(user);
         this.progress = false;
        });
      });
    }catch (err) {
      console.log(err);
      this.presentToast(err.message);
      this.progress = false;
    }
        
  }



 
  async fbLogin() {
  
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  /* async nativeGoogleLogin(): Promise<firebase.auth.UserCredential> {
    try {
      const gplusUser = await this.gplus.login({
        'webClientId': '338436144439-28ssve0a926vpaurpp4oesea7603a0e7.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })
      return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))

    } catch (err) {
      console.log(err)
    }
  }
  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      console.log(credential);
    } catch (err) {
      console.log(err)
    }

  }
  async  googleLogin() {
     if (this.platform.is('cordova')) {
       this.nativeGoogleLogin();
    } else {
     this.webGoogleLogin();
     }
   } */
   async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
