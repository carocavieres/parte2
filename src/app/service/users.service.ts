import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
 urlUsers: string ='https://reqres.in/api/users';
  constructor(
    private httpcliente: HttpClient
  ) { }

  obtenerListadoDeUsuarios(): Promise <any> {
    return new Promise ((resolve, reject) => {
    this.httpcliente.get(this.urlUsers + '?page=1&per_page=15')
    .subscribe(res => {
    resolve(res['data']);
    }, (err) => {
    reject(err);
    });
    });
    };

    agregarNuevoUsuario(nombre: string, trabajo: string): Promise <any> {
      let data ={
        'name': nombre,
        'job': trabajo

      }
      return new Promise ((resolve, reject) => {
      this.httpcliente.post(this.urlUsers, data)
      .subscribe(res => {
      resolve(res);
      }, (err) => {
      reject(err);
      });
      });
      };

      editarUsuario(idUser: number,nombre: string, trabajo: string): Promise <any> {
        let data ={
          'name': nombre,
          'job': trabajo
  
        }
        return new Promise ((resolve, reject) => {
        this.httpcliente.put(this.urlUsers + '/' + idUser, data)
        .subscribe(res => {
        resolve(res);
        }, (err) => {
        reject(err);
        });
        });
        };



        eliminarUsuario(idUser: number): Promise <any> {
          return new Promise ((resolve, reject) => {
          this.httpcliente.delete(this.urlUsers,)
          .subscribe(res => {
          resolve(res);
          }, (err) => {
          reject(err);
          });
          });
          };


}
