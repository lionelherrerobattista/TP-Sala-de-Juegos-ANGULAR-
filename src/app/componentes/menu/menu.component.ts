import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuarioLogeado:boolean;
  nombreUsuario:string;


  constructor(private authService:AuthService) { }

  ngOnInit() {

    this.usuarioLogeado = this.authService.comprobarInicioSesion();
    this.nombreUsuario = this.authService.mostrarNombre();

  }

  cerrarSesion() {
    this.authService.cerrarSesion();
  }

}
