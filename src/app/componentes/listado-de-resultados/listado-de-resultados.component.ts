
import { Component, OnInit , Input, EventEmitter} from '@angular/core';

export interface Resultado {
  juego: number;
  jugador: string;
  resultado: boolean;
}

const ELEMENT_DATA: Resultado[] = [
  {juego: 1, jugador: 'aaa', resultado: true},
  {juego: 2, jugador: 'bbb', resultado: true},

];


@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {
//  @Input()
 listado: Array<any>;

 displayedColumns: string[] = ['juego', 'jugador', 'resultado'];
 dataSource = ELEMENT_DATA;

  constructor() {
   }

  ngOnInit() {

  }

  ver() {
    console.info(this.listado);
  }

}
