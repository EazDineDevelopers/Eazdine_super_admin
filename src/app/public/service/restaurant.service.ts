import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { RestaurantBasic } from '../model/restaurant-basic';
import { RestaurantContactInfo } from '../model/restaurants_contact_info';
import { RestaurantAccountDetail } from '../model/restaurants_account_detail';
import { RestaurantOwner } from '../model/restaurants_owners';

@Injectable()

export class RestaurantService {
    restaurantList = new ReplaySubject<any>(1);
    restaurantBasicInfo = new ReplaySubject<RestaurantBasic>(1);
    restaurantContactInfo = new ReplaySubject<RestaurantContactInfo>(1);
    restaurantOwner = new ReplaySubject<RestaurantOwner>(1);
    restaurantAccountDetail = new ReplaySubject<RestaurantAccountDetail>(1);
    
    changeRestaurantContactInfo(restaurantContactInfo: RestaurantContactInfo) {
        this.restaurantContactInfo.next(restaurantContactInfo)
    }
    getRestaurantContactInfo() {
        return this.restaurantContactInfo.asObservable();
    }


    changeRestaurantOwner(restaurantOwner: RestaurantOwner) {
        this.restaurantOwner.next(restaurantOwner)
    }
    getRestaurantOwner() {
        return this.restaurantOwner.asObservable();
    }


    changeRestaurantAccountDetail(restaurantAccountDetail: RestaurantAccountDetail) {
        this.restaurantAccountDetail.next(restaurantAccountDetail)
    }
    getRestaurantAccountDetail() {
        return this.restaurantAccountDetail.asObservable();
    }

    changeRestaurantList(restaurantList: any) {
        this.restaurantList.next(restaurantList)
    }
    getRestaurantList() {
        return this.restaurantList.asObservable();
    }
    
    changeRestaurantBasicInfo(restaurantBasicInfo: RestaurantBasic) {
        this.restaurantBasicInfo.next(restaurantBasicInfo)
    }
    getRestaurantBasicInfo() {
        return this.restaurantBasicInfo.asObservable();
    }
}