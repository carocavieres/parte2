import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  tituloPagina: string = "Persona";
  usuario = null;

  constructor(private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.usuario = JSON.parse(params["user"]);
  });
  }

  ngOnInit() {
    console.log(this.usuario);
    this.tituloPagina = this.usuario.first_name + ' ' + this.usuario.last_name;
  }

}
