import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { RestaurantBasic } from '../model/restaurant-basic';

@Injectable()

export class RestaurantService {
    restaurantList = new ReplaySubject<any>(1);
    restaurant = new ReplaySubject<RestaurantBasic>(1);

    changeRestaurantList(restaurantList: any) {
        this.restaurantList.next(restaurantList)
    }
    getRestaurantList() {
        return this.restaurantList.asObservable();
    }
    setSelcetedRestaurant(restaurant: RestaurantBasic) {
        this.restaurant.next(restaurant)
    }
    getSelectedRestaurant() {
        return this.restaurant.asObservable();
    }
}