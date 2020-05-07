
import { Component, OnInit , Input, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import { JugadoresService, Jugador } from '../../servicios/jugadores.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})


export class JugadoresListadoComponent implements OnInit {

  displayedColumns: string[] = ['usuario', 'cuit', 'sexo', 'gano'];
  listaJugadores;

  constructor(private serviceJugadores:JugadoresService) {

  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.cargarLista();
    this.listaJugadores.sort = this.sort;
  }

  cargarLista() {

    this.listaJugadores = new MatTableDataSource(this.serviceJugadores.traerJugadores());
    console.log(this.listaJugadores);

  }

}
