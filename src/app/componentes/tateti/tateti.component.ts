import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { DatosJuegoService } from '../../servicios/datos-juego.service';
import { MatDialog } from '@angular/material/dialog';
import { ResultadoJuegoComponent } from '../resultado-juego/resultado-juego.component';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css']
})
export class TatetiComponent implements OnInit {

  empezoJuego:boolean;
  estadoCasilleros:string[];
  movimientosPosibles:number;
  casosVictoria:any[];
  gano:boolean;
  terminoJuego:boolean;
  resultado:string;

  constructor(private authService:AuthService, private datosJuegoService:DatosJuegoService, public matDialog: MatDialog) {

    this.estadoCasilleros = ["-","-","-","-","-","-","-","-","-"];
    this.movimientosPosibles = 9;
    this.casosVictoria = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    this.gano = false;
    this.terminoJuego = false;

  }

  ngOnInit(): void {
  }

  //Cambia el simbolo a O cuando el jugador toca una celda
  //e inicia el movimiento de la máquina
  CambiarSimbolo (casillero:number) {
    if(this.estadoCasilleros[casillero] == '-' && this.gano == false)
    {
      this.estadoCasilleros[casillero] = 'O';

      this.movimientosPosibles--;

      if(this.movimientosPosibles > 0)
      {
        this.MovimientoMaquina();
      }

      this.ComprobarVictoria();

    }


  }

  //Cambia el simbolo de una celda a X
  MovimientoMaquina() {

    let indiceRandom:number;

    do {

      indiceRandom = Math.floor( Math.random() * (this.estadoCasilleros.length - 0) + 0);

    } while(this.estadoCasilleros[indiceRandom] != '-' && this.movimientosPosibles > 0);

    this.estadoCasilleros[indiceRandom] = 'X';

    this.movimientosPosibles--;
  }

  ComprobarVictoria() {

    let condicionVictoria;
    let a;
    let b;
    let c;

    for(let i = 0; i < 8; i++)
    {
      //Paso cada condición por separado
      condicionVictoria = this.casosVictoria[i];

      a= this.estadoCasilleros[condicionVictoria[0]];
      b= this.estadoCasilleros[condicionVictoria[1]];
      c= this.estadoCasilleros[condicionVictoria[2]]

      //Comprobar
      if(a === '-' || b === '-' || c === '-') {
        continue;
      }

      if(a === b && b === c) {
        if(a === 'O')
        {
          this.gano = true;
          this.terminoJuego = true;
          this.resultado = 'Ganaste';
          console.log(this.resultado);
          this.enviarResultado();
          this.AbrirModalResultado();
        }
        else
        {
          this.terminoJuego = true;
          this.resultado = 'Perdiste';
          console.log(this.resultado);
          this.enviarResultado();
          this.AbrirModalResultado();
        }

      }

    }

    if(this.movimientosPosibles == 0)
    {
      this.terminoJuego = true;
      this.resultado = 'Empate';

      this.enviarResultado();
      this.AbrirModalResultado();
      console.log(this.resultado);
    }
  }

  NuevoJuego() {

    this.estadoCasilleros = ["-","-","-","-","-","-","-","-","-"];
    this.movimientosPosibles = 9;
    this.casosVictoria = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    this.terminoJuego = false;
    this.gano = false;
  }


  enviarResultado() {

    var nombreUsuario;
    var resultadoParaLista;
    var resultado;

    if(this.resultado == 'Ganaste') {
      resultado = 'Ganó';
    } else if (this.resultado == 'Perdiste') {
      resultado = 'Perdió';
    } else {
      resultado = 'Empató';
    }


    // enviar los datos a la lista
     nombreUsuario = this.authService.mostrarNombre();
     resultadoParaLista = {
       juego: 'Ta te ti',
       jugador: nombreUsuario,
       resultado: resultado,
     }

     this.datosJuegoService.cargarResultado(resultadoParaLista);
  }

  AbrirModalResultado() {

    //Abrir el modal de material
    this.matDialog.open(ResultadoJuegoComponent, {
      data: {
        resultado: this.resultado,
      },

    });

  }


}
