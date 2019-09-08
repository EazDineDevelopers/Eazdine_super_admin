import { Component, OnInit, ElementRef } from '@angular/core';
import { ModalController, ActionSheetController, ToastController, NavController } from '@ionic/angular';
import { CameraOptions, PictureSourceType, Camera } from "@ionic-native/camera/ngx";
import { RestaurantOwner } from 'src/app/public/model/restaurants_owners';
import { RestaurantBasic } from 'src/app/public/model/restaurant-basic';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/public/service/restaurant.service';
import { GeoCollectionReference, GeoFirestore } from 'geofirestore';
import * as firebase from 'firebase/app';
import { FirebaseCollection } from 'src/app/public/model/firebase-collection';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { RestaurantContactInfo } from 'src/app/public/model/restaurants_contact_info';
declare var google;

const firestore = firebase.firestore();
const geofirestore: GeoFirestore = new GeoFirestore(firestore);
const geocollection: GeoCollectionReference = geofirestore.collection(FirebaseCollection.RESTAURANT_LOCATION);

@Component({
  selector: 'app-setup-restaurant-modal',
  templateUrl: './setup-restaurant-modal.component.html',
  styleUrls: ['./setup-restaurant-modal.component.scss'],
})
export class SetupRestaurantModalComponent implements OnInit {
  imageURI: File;
  restaurantBasic: RestaurantBasic = new RestaurantBasic();
 // restaurantOwner: RestaurantOwner;
  restaurantContactInfo: RestaurantContactInfo = new RestaurantContactInfo();
  latitude;
  longitude;
  value;
  restaurantForm = new FormGroup({
  name : new FormControl('', Validators.required),
 // password: new FormControl(Validators.required),
  phone : new FormControl('', [Validators.required,Validators.maxLength(13)]),
  fax : new FormControl('', [Validators.required]),
  email : new FormControl('', Validators.compose([
		Validators.required,
		Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
	])),
  address : new FormControl('', [Validators.required]),
  });
  validation_messages = {
    'name': [
        { type: 'required', message: 'Username is required.' },
        { type: 'minlength', message: 'Username must be at least 5 characters long.' },
        { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
        { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
        { type: 'validUsername', message: 'Your username has already been taken.' }
      ],
      'phone': [
        { type: 'required', message: 'Phone is required.' }
      ],
      'fax': [
        { type: 'required', message: 'Fax is required.' }
      ],
      'email': [
        { type: 'required', message: 'Email is required.' },
        {type: 'pattern', message: 'Not a valid email format'}
      ],
      'address': [
        { type: 'required', message: 'Address is required.' }
      ],
    }
   mapElement: ElementRef;
    map: any;
    address:string;
  constructor(
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private camera: Camera,
    private toastController: ToastController,
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    private router: Router,
    private restaurantService: RestaurantService,
    private angularFireStorage: AngularFireStorage,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
  ) { }

  ngOnInit() {
   // this.restaurantBasic.password = Math.floor(100000 + Math.random() * 9000).toString();
   // this.latitude = 37.795924;
   // this.longitude = -122.406004;
    this.loadMap();
  }
  addRestaurant() {
    this.restaurantBasic.status = false;
    this.restaurantBasic.isOpen = false;
    this.restaurantContactInfo.phone  = this.restaurantBasic.phone;
    this.restaurantContactInfo.isEmailVerified = false;
    this.restaurantContactInfo.isPhoneVerified =false;
    
    this.restaurantService.changeRestaurantBasicInfo(this.restaurantBasic);
    this.restaurantService.changeRestaurantContactInfo(this.restaurantContactInfo);
    this.router.navigate(['home/ownerSetup']);

  //  let query = this.firestore
  //   .collection("restaurants_basic").add(JSON.parse(JSON.stringify(restaurantDetails)));
  //   query.then(value => {
  //        // console.log('restaurant data added: ',value);
  //         this.firestore.collection("restaurants_basic").doc(value.id).update({
  //           'id': value.id
  //         });
  //         geocollection.doc(value.id).set({
  //           path:value.path,
  //           coordinates: new firebase.firestore.GeoPoint(this.latitude,  this.longitude)
  //           });
  //         this.restaurantService.changeRestaurantList(value.id);
  //         this.storeRestaurantImage(value);
          
  //   });
  }
  uploadToFirebase(_imageBlobInfo) {
    console.log("uploadToFirebase");
    return new Promise((resolve, reject) => {
      let fileRef = firebase.storage()
                        .ref("restaurants/test_id" + _imageBlobInfo.fileName);
      let uploadTask = fileRef.put(_imageBlobInfo.imgBlob);
      uploadTask.on(
        "state_changed",
        (_snap: any) => {
          console.log(
            "progess " +
              (_snap.bytesTransferred / _snap.totalBytes) * 100
          );
        },
        _error => {
          console.log(_error);
          reject(_error);
        },
        () => {
          // completion...
          resolve(uploadTask.snapshot);
        }
      );
    });
  }
  storeRestaurantImage(value) {
    // const path = `restaurants_basic/${value.id}`;
    //    this.angularFireStorage.upload(path,this.imageURI, {});  
    this.router.navigate(['home/ownerSetup']);
  }
  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.imageURI = imageData;
       // this.uploadProfileImage(this.imageURI);
       console.log('image URI: ', this.imageURI);
       // this.uploadToFirebase(this.imageURI);
       // this.uploadImage(this.imageURI);
      },
      err => {
        this.presentToast(err);
      }
    );
  }
  uploadImage(imageURI){
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('restaurants/test_id').child('imageName');
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          resolve(snapshot.downloadURL)
        }, err => {
          reject(err);
        })
      })
    })
  }
  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }
  uploadProfileImage(data) {
    //this.selectImage = this.imageURI;
   /*  this.userService
      .uploadProfileImage(this.imageURI)
      .subscribe((data: any) => {
        this.imageUrl = data.fileDownloadUri;
      }); */
  }
  async selectImages() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [
        {
          text: "Load from Library",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: "Use Camera",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
      var currentName = imagePath.substr(imagePath.lastIndexOf("/") + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf("/") + 1);
      //    this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    });
  }
  onFormSubmit() {
    console.log('Form data: ',this.restaurantForm);
  }
  back() {
    this.navCtrl.back();
  }
  close() {
    this.modalController.dismiss();
  }
  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log('Lat, long: ', resp.coords.latitude, resp.coords.longitude);
      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.addListener('tilesloaded', () => {
        console.log('accuracy',this.map);
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  getAddressFromCoords(lattitude, longitude) {
    this.latitude = lattitude;
    this.longitude = longitude;
    console.log("getAddressFromCoords "+lattitude+" "+longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if(value.length>0)
          responseAddress.push(value);

        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value+", ";
        }
        this.address = this.address.slice(0, -2);
        this.restaurantBasic.addressText = this.address;
      })
      .catch((error: any) =>{ 
        this.address = "Address Not Available!";
        this.restaurantBasic.addressText = this.address;
      });

  }
}
