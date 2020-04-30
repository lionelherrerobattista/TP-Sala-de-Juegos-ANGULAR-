import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css']
})
export class PptComponent implements OnInit {

  terminoJuego:boolean;
  gano:boolean;
  resultado:string;
  opciones:string[] = ['piedra', 'papel', 'tijera']
  opcionUsuario:string;
  opcionMaquina:string;
  claseBtnUsuario:string;
  claseBtnMaquina:string;

  constructor() {
    this.opcionMaquina = "Máquina";
    this.opcionUsuario = "Usuario";
    this.terminoJuego = false;
  }

  ngOnInit(): void {
  }


  //Asigna la opción que eligió el usuario
  ElegirOpcion(opcion:string) {

    this.opcionUsuario = opcion;
    this.claseBtnUsuario = 'btn-' + opcion;

  }

  //Elige un resultado para la maquina
  GenerarOpcionRandom() {
    let indiceRandom  = Math.floor( Math.random() * (this.opciones.length - 0) + 0);

    this.opcionMaquina = this.opciones[indiceRandom];
    this.claseBtnMaquina = 'btn-' + this.opcionMaquina;
  }

  //Compara las opciones y muestra el resultado
  CompararResultado() {

    //Generar una opción para la máquina:
    this.GenerarOpcionRandom();

    if(this.opcionUsuario == this.opcionMaquina) {
      this.gano = false;
      this.resultado = 'Empate';
    }
    else
    {
      switch(this.opcionUsuario) {
        case 'piedra':
          if(this.opcionMaquina == 'tijera') {
            this.gano = true;
            this.resultado = 'Ganaste'
          } else {
            this.gano = false;
            this.resultado = 'Perdiste'
          }
          break;

        case 'papel':
          if(this.opcionMaquina == 'piedra') {
            this.gano = true;
            this.resultado = 'Ganaste'
          } else {
            this.gano = false;
            this.resultado = 'Perdiste'
          }
          break;

        case 'tijera':
          if(this.opcionMaquina == 'papel') {
            this.gano = true;
            this.resultado = 'Ganaste'
          } else {
            this.gano = false;
            this.resultado = 'Perdiste'
          }
          break;
      }
    }

    this.terminoJuego = true;


  }

}
