import { Component } from '@angular/core';
import { NavController,AlertController, ToastController, } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';


import {UsersService} from '../../service/users.service';
import {LoadingServiceService} from '../../services/loading-service.service';
  

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tituloPagina: string = "Listado";
  listadoPersonas: any;
  
 

  constructor(
    public navCtrl: NavController,
    private userService: UsersService,
    private alertControler:AlertController,
    public toastController: ToastController,
    private ventanaLoading: LoadingServiceService,
    
    ) {
    console.log("aqui parte todo")
    this.listarUsuarios();
  }

 


  
  listarUsuarios() {
    this.ventanaLoading.presentLoading();
    this.userService.obtenerListadoDeUsuarios()
    .then(data => {
      this.listadoPersonas = data;
      console.log('data');
      this.ventanaLoading.dismissLoading();
    }, (error) => {
      console.error(error);
      this.ventanaLoading.dismissLoading();
    })
     }
   

  

  gotoDetalles(usuario:any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          user: JSON.stringify(usuario)
      }
  }
  this.navCtrl.navigateForward(['detalle/'], navigationExtras);
  }

  async alertaCrearUsuario() {
    const alert = await this.alertControler.create({
      header: 'Nuevo Usuario',
      inputs: [
        
      
        {
          name: 'nombre',
          type: 'text',
          placeholder:'Nombres'
         
        },
        
        {
          name: 'trabajo',
          type: 'text',
          placeholder:'Trabajo'
         
        },
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel');
          }
        }, {
          text: 'Ok',
          handler: (respuestas) => {
            console.log('Confirm Ok');
            this.ventanaLoading.presentLoading();
            this.userService.agregarNuevoUsuario(respuestas.nombre, respuestas.trabajo)
              .then(serveresp =>{
                console.log(serveresp);
                this.ventanaLoading.dismissLoading();
                this.mostrarToast('Usuario agregado Correctamente');
              }, (error)=>{
                console.error(error);
                this.ventanaLoading.dismissLoading();
                this.mostrarToast('Problema al agregar Usuario');
              })
              
          }
        }
      ]
    });

    await alert.present();
  }
  async mostrarToast(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000
    });
    toast.present();
  }
  

  editarUsuario(idUsuario: number, nombreOrg: string, trabajoOrg: string){
    this.alertaEditarUsuario(idUsuario, nombreOrg, trabajoOrg)
    
  }



  async alertaEditarUsuario(idUsr: number,nombreOrg: string, trabajoOrg) {
    const alert = await this.alertControler.create({
      header: 'Editar Usuario',
      inputs: [
        
      
        {
          name: 'nombre',
          type: 'text',
          value: nombreOrg,
          placeholder:'Nombres'
         
        },
        
        {
          name: 'trabajo',
          type: 'text',
          value: trabajoOrg,
          placeholder:'Trabajo'
         
        },
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel');
          }
        }, {
          text: 'Ok',
          handler: (respuestas) => {
            console.log('Confirm Ok');
            this.ventanaLoading.presentLoading();
            this.userService.editarUsuario(idUsr, respuestas.nombre, respuestas.trabajo)
              .then(serveresp =>{
                this.ventanaLoading.dismissLoading();
                console.log(serveresp);
                this.mostrarToast('Usuario Actualizado correctamente');
              }, (error)=>{
                console.error(error);
                this.ventanaLoading.dismissLoading();
                this.mostrarToast('Error al actualizar usuario');
              })
              
          }
        }
      ]
    });

    await alert.present();
  }

  Eliminar(idUsuario: number){
    this.ventanaLoading.presentLoading();
    this.userService.eliminarUsuario(idUsuario)
    .then(data =>{
      this.ventanaLoading.dismissLoading();
      console.log(data)
      this.mostrarToast('Usuario Eliminado')
    }, (error)=>{
      this.ventanaLoading.dismissLoading();
      console.log(error)
      this.mostrarToast('Error al eliminar usuario')
    })
}
}
