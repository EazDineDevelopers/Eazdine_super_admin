import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/public/model/owner';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RestaurantService } from 'src/app/public/service/restaurant.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-owner-setup',
  templateUrl: './owner-setup.component.html',
  styleUrls: ['./owner-setup.component.scss'],
})
export class OwnerSetupComponent implements OnInit {
 
  restaurantOwner: Owner = new Owner();
  restaurantId;
  ownerForm = new FormGroup({
    fname : new FormControl('', Validators.required),
    lname : new FormControl('', Validators.required),
    phone : new FormControl('', [Validators.required,Validators.maxLength(13)]),
    email : new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    address : new FormControl('', [Validators.required]),
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
          {type: 'pattern', message: 'Not a valid email format'}
        ],
        'address': [
          { type: 'required', message: 'Address is required.' }
        ],
      }
  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private navCtrl: NavController,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
   
    this.restaurantService.getRestaurantList().subscribe(id => {
      this.restaurantId = id;
    });

  }
  addOwner() {
    this.restaurantOwner.restaurants.push(this.restaurantId);
    let ownerDetail = this.restaurantOwner;
   let query = this.firestore
    .collection("restaurants_owners").add(JSON.parse(JSON.stringify(ownerDetail)));
    query.then(res => {
          console.log('owner data added: ',res);
          this.router.navigate(['home/restaurants']);
    });
  }
  onFormSubmit() {
    console.log('Form data: ',this.ownerForm);
  }
  back() {
    this.navCtrl.back();
  }
}
