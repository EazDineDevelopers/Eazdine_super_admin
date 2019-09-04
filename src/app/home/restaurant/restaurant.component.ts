import { Component, OnInit } from '@angular/core';
import { SetupRestaurantModalComponent } from '../restaurant-setup/setup-restaurant-modal.component';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot } from 'geofirestore';
import { FirebaseCollection } from 'src/app/public/model/firebase-collection';
import * as firebase from 'firebase/app';
import { RestaurantBasic } from 'src/app/public/model/restaurant-basic';
import { AngularFirestore } from '@angular/fire/firestore';
import { RestaurantListService } from 'src/app/public/service/resturant-list.service';
import { VerifyModalComponent } from '../verify-modal/verify-modal.component';
import { RestaurantService } from 'src/app/public/service/restaurant.service';

const firestore = firebase.firestore();
const geofirestore: GeoFirestore = new GeoFirestore(firestore);
const geocollection: GeoCollectionReference = geofirestore.collection(FirebaseCollection.RESTAURANT_LOCATION);
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {
  latitude;
  longitude;
  restaurantList: RestaurantBasic[] = [];

  constructor(
    private modalController: ModalController,
    private router: Router,
    private firestore: AngularFirestore,
    private restaurantListService: RestaurantListService,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {

    //This lat and long hardcode for temporary
    this.latitude = 37.795924;
    this.longitude = -122.406004;

    const query: GeoQuery = geocollection.near({ center: new firebase.firestore.GeoPoint(this.latitude, this.longitude), radius: 1000 });
    query.get().then((value: any) => {
      console.log(value.docs);
      this.restaurantList = [];
      value.docs.forEach(element => {
        this.firestore.collection(FirebaseCollection.RESTAURANT_BASIC).doc(element.id)
          .valueChanges()
          .subscribe((data: any) => {
            let restaurant:RestaurantBasic=new RestaurantBasic();
            restaurant.isOpen=data.isOpen;
            restaurant.name=data.name;
            restaurant.rating=data.rating;
            restaurant.id=element.id;
            restaurant.imageURL=data.imageURL;
            restaurant.addressText=data.addressText;
            restaurant.imageURL=data.imageURL;
            restaurant.offerText = data.offerText;
            restaurant.status = data.status;
            this.restaurantList.push(restaurant);
          });

      });

    });

  }
  doRefresh(event) {
    this.ngOnInit();
    event.target.complete();
  }
  restaurantSetup() {
    this.router.navigate(['home/restaurantSetup']);
  }
  async setupRestaurant() {
    const modal = await this.modalController.create({
      component: SetupRestaurantModalComponent,
      componentProps: {
      }
    });
    await modal.present();
    await modal.onDidDismiss().then(d => {
      // this.getUserDetails();
    });
  }
  gotoRestaurantDetail(restaurant: RestaurantBasic) {
    this.restaurantListService.changeRestaurantBasic(restaurant);
    this.router.navigate(['home/restaurantDetail']);
  }
  openVerificationPage(restaurant: RestaurantBasic) {
    this.restaurantService.setSelcetedRestaurant(restaurant);
  this.router.navigate(['home/verification']);
  }
}
