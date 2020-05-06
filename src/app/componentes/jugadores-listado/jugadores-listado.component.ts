import { Component, OnInit } from '@angular/core';
import { JugadoresService, Jugador } from '../../servicios/jugadores.service';

@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})


export class JugadoresListadoComponent implements OnInit {

  displayedColumns: string[] = ['usuario', 'cuit', 'sexo', 'gano'];
  listaJugadores:Jugador[];

  constructor(private serviceJugadores:JugadoresService) {

  }

  ngOnInit() {
    this.cargarLista();
  }

  cargarLista() {

    this.listaJugadores = this.serviceJugadores.traerJugadores();
    console.log(this.listaJugadores);

  }

}
