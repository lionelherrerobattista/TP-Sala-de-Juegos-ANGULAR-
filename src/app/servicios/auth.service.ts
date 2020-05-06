import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { JugadoresService } from './jugadores.service';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  usuarioLogeado:boolean;
  usuarioActivo:User;

  constructor(private angularFireAuth:AngularFireAuth, private router:Router, private jugadoresService:JugadoresService) {
    this.usuarioLogeado = false;
   }

  ///Registra al usuario con el email y la pass enviadas en Firebase
  registrarUsuario(email:string, password:string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password).then( respuesta => {
      //Guardo el usuario para utilizar los datos sincrónicamente
      this.usuarioLogeado = true;
      this.usuarioActivo= respuesta.user;
      this.router.navigate(['/Principal']);
    }).catch( error => {
      console.log(error);
    });;
  }

  ///Inicia sesión con un usuario registrado en Firebase
  iniciarSesion(email:string, password:string) {


    return this.angularFireAuth.signInWithEmailAndPassword(email, password).then( respuesta => {
      //Guardo el usuario para utilizar los datos sincrónicamente
      this.usuarioLogeado = true;
      this.usuarioActivo= respuesta.user;
      this.router.navigate(['/Principal']);
    }).catch( error => {
      console.log(error);
    });


  }

  cerrarSesion() {
    this.angularFireAuth.signOut().then( () => {
      this.usuarioLogeado = false;
      this.usuarioActivo = undefined;
      this.router.navigate(['/Principal']);
      window.location.reload();
    } )


  }

  ///Devuelve una string con el nombre del usuario
  mostrarNombre() :string{
    let nombreUsuario;

    if(this.usuarioLogeado) {

      nombreUsuario = this.jugadoresService.buscarJugador(this.usuarioActivo.email);
      return nombreUsuario;

    } else {

      return undefined;

    }

  }

  ///Devuelve un booleando indicando si el usuario se encuentra logeado o no
  comprobarInicioSesion():boolean {
    return this.usuarioLogeado;
  }

}
