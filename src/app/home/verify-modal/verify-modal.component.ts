import { Component, OnInit, Input } from '@angular/core';
import { RestaurantBasic } from 'src/app/public/model/restaurant-basic';
import { NavController, ModalController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { GeoFirestore, GeoCollectionReference } from 'geofirestore';
import { FirebaseCollection } from 'src/app/public/model/firebase-collection';
import { AngularFirestore } from '@angular/fire/firestore';

const firestore = firebase.firestore();
const geofirestore: GeoFirestore = new GeoFirestore(firestore);
const geocollection: GeoCollectionReference = geofirestore.collection(FirebaseCollection.RESTAURANT_LOCATION);

@Component({
  selector: 'app-verify-modal',
  templateUrl: './verify-modal.component.html',
  styleUrls: ['./verify-modal.component.scss'],
})
export class VerifyModalComponent implements OnInit {
  @Input() restaurantBasic: RestaurantBasic;
  @Input() type;
  value;
  constructor(
    private modalController: ModalController,
    private firestore: AngularFirestore,

  ) { }

  ngOnInit() {}
  submit() {
    if(this.type == 'REG') {
      this.firestore.collection(FirebaseCollection.RESTAURANT_BASIC).doc(this.restaurantBasic.id).update({
        'registrationNo': this.value
      });
    }
    else if(this.type == 'OEV') {
      this.firestore.collection(FirebaseCollection.RESTAURANT_BASIC).doc(this.restaurantBasic.id).update({
        'ownerEmailVerification': true
      });
    }
    else if(this.type == 'OMV') {
      this.firestore.collection(FirebaseCollection.RESTAURANT_BASIC).doc(this.restaurantBasic.id).update({
        'ownerMobileVerification': true
      });
    }
    else if(this.type == 'REV') {
      this.firestore.collection(FirebaseCollection.RESTAURANT_BASIC).doc(this.restaurantBasic.id).update({
        'restaurantEmailVerification': true
      });
    }
  }
  close () {
    this.modalController.dismiss();
  }
}
