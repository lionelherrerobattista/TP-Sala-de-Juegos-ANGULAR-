import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../../servicios/jugadores.service';


export interface Jugador {
  usuario: string;
  cuit:string;
  sexo:string;
  gano:boolean;
}

const ELEMENT_DATA: Jugador[] = [
  {usuario: 'aaa', cuit:'20-11111111-9', sexo:'hombre', gano:true},
  {usuario: 'bbb', cuit:'20-22222222-9', sexo:'mujer', gano:true},
];

@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})


export class JugadoresListadoComponent implements OnInit {

  displayedColumns: string[] = ['usuario', 'cuit', 'sexo', 'gano'];
  dataSource = ELEMENT_DATA;

  listado:any
  miJugadoresServicio:JugadoresService

    constructor(serviceJugadores:JugadoresService) {
      this.miJugadoresServicio = serviceJugadores;

    }



  ngOnInit() {
  }


  TraerTodos(){
    //alert("totos");
    this.miJugadoresServicio.traertodos('jugadores/','todos').then(data=>{
      //console.info("jugadores listado",(data));
      this.listado= data;

    })
  }
  TraerGanadores(){
    this.miJugadoresServicio.traertodos('jugadores/','ganadores').then(data=>{
      //console.info("jugadores listado",(data));
      this.listado= data;

    })
  }
  TraerPerdedores(){
    this.miJugadoresServicio.traertodos('jugadores/','perdedores').then(data=>{
      //console.info("jugadores listado",(data));
      this.listado= data;

    })
  }

}
