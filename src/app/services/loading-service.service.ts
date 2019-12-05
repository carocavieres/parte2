import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingServiceService {


  isLoading = false;

  constructor(
    public loadingController: LoadingController,
  ) { }

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingController.create({
      duration: 5000,
    }).then(ventanaloading => {
      ventanaloading.present().then(() => {
        console.log('loading presentado');
        if (!this.isLoading) {
          ventanaloading.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
  
  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('loading dismissed'));
  }
  
  


}

