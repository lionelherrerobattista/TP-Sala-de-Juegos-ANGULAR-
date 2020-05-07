import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  // private subscription: Subscription;
  usuario = '';
  clave= '';


  constructor(
    // private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService) {


  }

  ngOnInit() {
  }

  iniciarSesion() {

    this.authService.iniciarSesion(this.usuario, this.clave);

  }

  ///Autocompleta el login segun el botón que toco
  completarLogin(usuario:string) {
    switch(usuario) {
      case 'admin':
        this.usuario = 'admin@admin.com';
        this.clave = 'admin1234';
        break;
      case 'jugadorUno':
        this.usuario = 'jugador_uno@admin.com';
        this.clave = 'jugador1234';
        break;
    }
  }


}
