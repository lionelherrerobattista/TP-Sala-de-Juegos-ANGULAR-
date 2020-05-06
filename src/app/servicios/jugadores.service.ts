import { Injectable } from '@angular/core';
import { ArchivosJugadoresService}from './archivos-jugadores.service'

export interface Jugador {
  usuario:string,
  cuit:string,
  sexo:string,
  gano:string,
  email:string,
}

@Injectable()

export class JugadoresService {

  listaJugadores:Jugador[] = [
    {usuario: 'Juan', cuit:'20-11111111-9', sexo:'hombre', gano:'Ganó', email:'juan@utn.com'},
    {usuario: 'María', cuit:'20-22222222-9', sexo:'mujer', gano:'Ganó', email:'maria@utn.com'}
  ];

  constructor( public miHttp: ArchivosJugadoresService ) {

  }

  agregarJugador(jugador:Jugador) {
    this.listaJugadores.push(jugador);
  }

  traerJugadores() {
    return this.listaJugadores;
  }

  buscarJugador(email:string) {

    let jugador:Jugador;

    for(let auxJugador of this.listaJugadores) {
      if(auxJugador.email == email)
      {
        jugador= auxJugador;
        break;
      }
    }

    return jugador;

  }


}
