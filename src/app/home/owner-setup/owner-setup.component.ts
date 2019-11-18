import { Component, OnInit } from '@angular/core';
import { RestaurantOwner } from 'src/app/public/model/restaurants_owners';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToastController, ModalController } from '@ionic/angular';
import { RestaurantService } from 'src/app/public/service/restaurant.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { RestaurantBasic } from 'src/app/public/model/restaurant-basic';
import { RestaurantContactInfo } from 'src/app/public/model/restaurants_contact_info';
import { RestaurantAccountDetail } from 'src/app/public/model/restaurants_account_detail';
import * as firebase from 'firebase/app';
import { FirebaseCollection } from 'src/app/public/model/firebase-collection';
import { GeoCollectionReference, GeoFirestore } from 'geofirestore';
import { AngularFireStorage } from '@angular/fire/storage';

declare var google;
const firestore = firebase.firestore();
const geofirestore: GeoFirestore = new GeoFirestore(firestore);
const geocollection: GeoCollectionReference = geofirestore.collection(FirebaseCollection.RESTAURANT_LOCATION);


@Component({
  selector: 'app-owner-setup',
  templateUrl: './owner-setup.component.html',
  styleUrls: ['./owner-setup.component.scss'],
})
export class OwnerSetupComponent implements OnInit {

  restaurantOwner: RestaurantOwner = new RestaurantOwner();
  restaurantBasicInfo: RestaurantBasic;
  restaurantContactInfo: RestaurantContactInfo;
  restaurantAccountDetail: RestaurantAccountDetail;
  latitude;
  longitude;
  restaurantId;
  password: any;

  ownerForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.maxLength(13)]),
    password: new FormControl(Validators.required),
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    address: new FormControl('', [Validators.required]),
  });
  validation_messages = {
    'fname': [
      { type: 'required', message: 'First name is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'lname': [
      { type: 'required', message: 'Last name is required.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Not a valid email format' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' }
    ],
    'address': [
      { type: 'required', message: 'Address is required.' }
    ],
  }
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private navCtrl: NavController,
    private toastController: ToastController,
    private angularFireStorage: AngularFireStorage,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {

    this.latitude = 37.795924;
    this.longitude = -122.406004;

    this.getRestaurantDetail();
  }

  getRestaurantDetail() {
    this.restaurantService.getRestaurantBasicInfo().subscribe((restaurantBasicInfo: RestaurantBasic) => {
      this.restaurantBasicInfo = restaurantBasicInfo;
    });

    this.restaurantService.getRestaurantContactInfo().subscribe((restaurantContactInfo: RestaurantContactInfo) => {
      this.restaurantContactInfo = restaurantContactInfo;
    });

    this.restaurantService.getRestaurantAccountDetail().subscribe((restaurantAccountDetail: RestaurantAccountDetail) => {
      this.restaurantAccountDetail = restaurantAccountDetail;
    });

  }


  async  restaurantSetup() {

    try {
      let basicquery = this.firestore
        .collection("restaurants_basic").add(JSON.parse(JSON.stringify(this.restaurantBasicInfo)));
      basicquery.then(value => {
        this.firestore.collection("restaurants_basic").doc(value.id).update({
          'id': value.id
        }).then(data => {
          this.firestore.collection(FirebaseCollection.TAX_DETAILS).doc(this.restaurantBasicInfo.zip).set({
            postalcode: this.restaurantBasicInfo.zip
          }).then(res => {
            this.presentToast('Added tax details successfully');
          });
        });

        this.restaurantId=value.id

        //Setup Restaurant Location
        geocollection.doc(value.id).set({
          path: value.path,
          coordinates: new firebase.firestore.GeoPoint(this.latitude, this.longitude)
        });

        if (this.restaurantBasicInfo.imageURL) {
          this.storeRestaurantImage(value);
        }

        //Setup Restaurant Contact Detail:
        this.restaurantContactInfo.id = value.id;
        let contactInfoquery = this.firestore
          .collection("restaurants_contact_info").add(JSON.parse(JSON.stringify(this.restaurantContactInfo)));

        //Setup Restaurant Bank Detail:
        this.restaurantAccountDetail.id = value.id;
        let accountDetailquery = this.firestore
          .collection("restaurants_account_detail").add(JSON.parse(JSON.stringify(this.restaurantContactInfo)));
      });

      //Add owner Info
      if (this.password && this.restaurantOwner.email) {
        let reg = await this.afAuth.auth.createUserWithEmailAndPassword(
          this.restaurantOwner.email, this.password);
        if (reg) {
          this.restaurantOwner.restaurants.push(this.restaurantId);
          this.restaurantOwner.role = 'OWNER';
          this.restaurantOwner.isEmailVerified = true;
          this.restaurantOwner.isPhoneVerified = false;
          this.restaurantOwner.ownerId = reg.user.uid;

          let ownerDetail = this.restaurantOwner;
          let query = this.firestore
            .collection("restaurants_owners").doc(reg.user.uid).set(JSON.parse(JSON.stringify(ownerDetail))).then(res => {
              this.router.navigate(['home/restaurants']);
            });
            this.firestore
            .collection("restaurants_employee").doc(reg.user.uid).set(JSON.parse(JSON.stringify(ownerDetail))).then(res => {
              this.router.navigate(['home/restaurants']);
            });
        }
      }

    } catch (err) {
      console.log(err);
      this.presentToast(err.message);
    }

  }

  storeRestaurantImage(value) {
    const path = `restaurants_basic/${value.id}`;
    this.angularFireStorage.upload(path, this.restaurantBasicInfo.imageURL, {});
  }


  onFormSubmit() {
    console.log('Form data: ', this.ownerForm);
  }
  back() {
    this.navCtrl.back();
  }


  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
