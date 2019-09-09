import { Component, OnInit } from '@angular/core';
import { RestaurantAccountDetail } from 'src/app/public/model/restaurants_account_detail';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { RestaurantService } from 'src/app/public/service/restaurant.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-restaurants-account-detail',
  templateUrl: './restaurants-account-detail.component.html',
  styleUrls: ['./restaurants-account-detail.component.scss'],
})
export class RestaurantsAccountDetailComponent implements OnInit {


  restaurantAccountDetail : RestaurantAccountDetail = new RestaurantAccountDetail();

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private restaurantService: RestaurantService) { }

  ngOnInit() {}

  restaurantForm = new FormGroup({
    accountNumber : new FormControl('', Validators.required),
    bankName : new FormControl('', [Validators.required]),
    branchName : new FormControl('', [Validators.required]),
    ifscCode : new FormControl('', [Validators.required]),
    });

  validation_messages = {
    'accountNumber': [
        { type: 'required', message: 'account Number is required.' }
      ],
      'bankName': [
        { type: 'required', message: 'bank Name is required.' }
      ],
      'branchName': [
        { type: 'required', message: 'branch Name is required.' }
      ],
      'ifscCode': [
        { type: 'required', message: 'ifsc Code is required.' }
      ]
    }


    addRestaurantAccount() {
      this.restaurantService.changeRestaurantAccountDetail(this.restaurantAccountDetail);
      this.router.navigate(['home/ownerSetup']); 
    }

    back() {
      this.navCtrl.back();
    }

}
