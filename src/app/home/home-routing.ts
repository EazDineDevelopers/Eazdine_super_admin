import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { HomePage } from './home.page';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { AuthGuardService } from '../public/service/auth-guard.service';
import { SetupRestaurantModalComponent } from './restaurant-setup/setup-restaurant-modal.component';
import { OwnerSetupComponent } from './owner-setup/owner-setup.component';
import { VerificationComponent } from './verification/verification.component';
import { RestaurantsAccountDetailComponent } from 'src/app/home/restaurant-setup/restaurants-account-detail/restaurants-account-detail.component';
const routes: Routes = [
  {
    path: "",
    component: HomePage,
    children: [
      {
        path: "restaurants",
        canActivate:[AuthGuardService],
        component: RestaurantComponent
       // loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
        // canActivate: [AuthGuardService],
        // loadChildren: "./home-tabs/tabs.module#TabsPageModule"

      },
      {
        path: 'restaurantDetail',
        component: RestaurantDetailComponent
      },
      {
        path: 'restaurantSetup',
        component: SetupRestaurantModalComponent
      },
      {
        path: 'restaurantAccountDetail',
        component: RestaurantsAccountDetailComponent
      },
      
      {
        path: 'ownerSetup',
        component: OwnerSetupComponent
      },
      {
        path: 'verification',
        component: VerificationComponent
      }
    ]
    }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
