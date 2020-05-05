
import { Component, OnInit , Input, EventEmitter} from '@angular/core';
import { DatosJuegoService, Resultado } from '../../servicios/datos-juego.service';




@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {

@Input() resultadoJuego;

listadoResultados: Resultado[];

 displayedColumns: string[] = ['juego', 'jugador', 'resultado'];
//  dataSource = ELEMENT_DATA;
 dataSource = this.listadoResultados;

 constructor(private datosJuegoService:DatosJuegoService) {

  }

  ngOnInit() {
    this.cargarResultados();
  }

  //Cargo los datos del juego
  cargarResultados():void {
    this.datosJuegoService.getListaResultados().subscribe(
      resultados => {
        this.listadoResultados = resultados;
        console.log(this.listadoResultados);
      });
  }

}
