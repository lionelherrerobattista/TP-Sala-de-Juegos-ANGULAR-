import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  // isCollapsed = false;

  // mostrarNavbar() {
  //   this.isCollapsed = !this.isCollapsed;
  // }

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
