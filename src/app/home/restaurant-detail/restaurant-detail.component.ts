import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RestaurantBasic } from 'src/app/public/model/restaurant-basic';
import { RestaurantListService } from 'src/app/public/service/resturant-list.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss'],
})
export class RestaurantDetailComponent implements OnInit {
  public restaurant: RestaurantBasic;
  constructor(
    private navCtrl: NavController,
    private restaurantListService: RestaurantListService,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit() {
    this.getRestaurantBasic();
  }
  getRestaurantBasic() {
    this.restaurantListService
      .getRestaurantBasic()
      .subscribe((restaurant: RestaurantBasic) => {
        this.restaurant = restaurant;
        this.firestore.collection
  });
}
  goBack() {
    this.navCtrl.back();
  }
}
