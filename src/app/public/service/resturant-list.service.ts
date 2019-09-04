import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from "rxjs";
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Platform } from '@ionic/angular';
import { RestaurantBasic } from '../model/restaurant-basic';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class RestaurantListService {
    restaurantBasic = new ReplaySubject<RestaurantBasic>(1);

    constructor(private http: HttpClient) { }

    changeRestaurantBasic(restaurantBasic: RestaurantBasic) {
        this.restaurantBasic.next(restaurantBasic)
    }
    getRestaurantBasic() {
        return this.restaurantBasic.asObservable();
    }

  /*   getNearByRestaurentDetails(address: Address) {
        let headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");
        let httpOptions = { headers: headers };
        return this.http.post(environment.baseUrl + "api/resturantsBasicNearBy", address, httpOptions);
    } */



 /*  getRestaurantInfo(restaurantId:string) {
    return this.http.get(environment.baseUrl + "api/resturant/info/"+restaurantId);
  } */


 /*  getRestaurantTopMenu(restaurantId:string) {
    return this.http.get(environment.baseUrl + "api/resturant/topMenu/"+restaurantId);
  } */

 /*  restaurentMenuByServiveType(restaurantId: string,type : string) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    let httpOptions = { headers: headers };
    return this.http.get(environment.baseUrl + 'api/resturantDetails/menus/'+ restaurantId+'/'+type,httpOptions);
  } */
}