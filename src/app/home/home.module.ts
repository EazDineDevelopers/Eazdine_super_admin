import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { HomeRoutingModule } from './home-routing';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { SetupRestaurantModalComponent } from './restaurant-setup/setup-restaurant-modal.component';
import { OwnerSetupComponent } from './owner-setup/owner-setup.component';
import { VerificationComponent } from './verification/verification.component';
import { VerifyModalComponent } from './verify-modal/verify-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomeRoutingModule,
  ],
  entryComponents:[VerifyModalComponent],
  declarations: [
    HomePage,
    RestaurantComponent,
    RestaurantDetailComponent,
    SetupRestaurantModalComponent,
    OwnerSetupComponent,
    VerificationComponent,
    VerifyModalComponent
  ]
})
export class HomePageModule {}
