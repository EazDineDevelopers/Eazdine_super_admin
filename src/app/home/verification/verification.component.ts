import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { RestaurantBasic } from 'src/app/public/model/restaurant-basic';
import { VerifyModalComponent } from '../verify-modal/verify-modal.component';
import { RestaurantService } from 'src/app/public/service/restaurant.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnInit {
  restaurantBasic
  constructor(
    private navCtrl: NavController,
    private modalController: ModalController,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    this.restaurantService.getRestaurantBasicInfo().subscribe(restaurantBasic =>{
      this.restaurantBasic = restaurantBasic;
    });
  }
  async openVerificationModal(type) {
    const modal = await this.modalController.create({
      component: VerifyModalComponent,
      componentProps: {
        restaurantBasic: this.restaurantBasic,
        type: type
      }
    });
    await modal.present();
    await modal.onDidDismiss().then(d => {
      // this.getUserDetails();
    });
  }
  back() {
    this.navCtrl.back();
  }
}
