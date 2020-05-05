import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


export interface Resultado {
  juego: string;
  jugador: string;
  resultado: string;
}

// const ELEMENT_DATA: Resultado[] = [


// ];

@Injectable({
  providedIn: 'root'
})

export class DatosJuegoService {

  listaResultados:Resultado[] = [
    {juego: 'Adivina', jugador: 'aaa', resultado: 'Ganó'},
    {juego: 'Tateti', jugador: 'bbb', resultado: 'Perdió'},
  ];


  constructor() { }

  cargarResultado(resultado:Resultado) {
    this.listaResultados.push(resultado);
  }

  getListaResultados(): Observable<Resultado[]> {

    return of(this.listaResultados);

  }
}
