
import { Component, OnInit , Input, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import { DatosJuegoService, Resultado } from '../../servicios/datos-juego.service';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';




@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {

@Input() resultadoJuego;

listadoResultados;

 displayedColumns: string[] = ['juego', 'jugador', 'resultado'];
//  dataSource = ELEMENT_DATA;
 dataSource = this.listadoResultados;

 constructor(private datosJuegoService:DatosJuegoService) {

  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.cargarResultados();
    this.listadoResultados.sort = this.sort;
  }

  //Cargo los datos del juego
  cargarResultados():void {
    this.datosJuegoService.getListaResultados().subscribe(
      resultados => {
        this.listadoResultados = new MatTableDataSource(resultados);

        console.log(this.listadoResultados);
      });
  }

}
