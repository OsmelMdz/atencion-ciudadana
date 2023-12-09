import { Component, ElementRef, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GoogleMap } from '@capacitor/google-maps'
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { getDatabase, ref, set, get } from "firebase/database";
import { push } from '@angular/fire/database';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tab8',
  templateUrl: './tab8.page.html',
  styleUrls: ['./tab8.page.scss'],
})
export class Tab8Page {

  @ViewChild('map') mapRef!: ElementRef;
  map!: GoogleMap;


  constructor(private alertController: AlertController, private auth: Auth, private datePipe: DatePipe) {
    this.getUid();
  }

  numeroAlertas: number = 1; // Puedes inicializarlo con el valor que desees

  async showAlert() {
    const alert = await this.alertController.create({
      header: '¡Auxilio Revisado!',
      message: 'Correctamente.',
    });
    this.position()
    this.numeroAlertas = 0; 
    await alert.present();
  }

  ngAfterViewInit() {
    this.createMap()

  }

  async createMap(){
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      forceCreate: true,
      config:{
        center:{
          lat:17.06542,
          lng:-96.72365
        },
        zoom:8
      }
    });
  }
 async position(){

    const position = await Geolocation.getCurrentPosition();

    const currentPosition={
      lat:position.coords.latitude,
      lng:position.coords.longitude
    }
    this.map.setCamera(
      {coordinate:currentPosition,
      zoom:15}
    )

    this.map.addMarker({
      coordinate:currentPosition
    })
    const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');

    const dataPosition={
      latitude:position.coords.latitude,
      longitude:position.coords.longitude,
      timestamp: currentDate,
    }

    const database = getDatabase();
      const positionsRef = ref(database, 'users/' + this.uid +'/positions');
      // const nuevaClave = 'positions';
      const newPositionRef = push(positionsRef);
      set(newPositionRef, dataPosition);

    console.log('coordenadas actuales: ', currentPosition.lat, currentPosition.lng);

  }
uid:any;

  getUid(){
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
       this.uid= user.uid;
       console.log(this.uid);


    } else {
        console.log('no hay usuario autenticado');
    }
  });


    }


}
