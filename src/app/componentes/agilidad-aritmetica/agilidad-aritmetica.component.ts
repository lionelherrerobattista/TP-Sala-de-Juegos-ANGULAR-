import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { JuegoAgilidad } from '../../clases/juego-agilidad'

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";

import { Router } from '@angular/router';
import { ResultadoJuegoComponent } from '../resultado-juego/resultado-juego.component';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})

export class AgilidadAritmeticaComponent implements OnInit {

  //Se presenta una cuenta y se debe averiguar el resultado
  terminoJuego:boolean;

  //variables del juego
  primerNumero:number;
  segundoNumero:number;
  operador:string;
  resultado:number;
  respuesta:number;

  //variables para generar la cuenta aleatoria
  minimoRandom = 1;
  maximoRandom = 11;
  listaOperadores = [ '+', '-', '*', '/'] ;

  @Output()
  enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego : JuegoAgilidad;//clase que guarda los datos del juego
  ocultarVerificar: boolean;
  tiempo: number;//tiempo que tiene el jugador para adivinar
  repetidor:any;

  private subscription: Subscription;

  ngOnInit() {
  }

  constructor(private route:Router, public matDialog: MatDialog) {

    //Iniciar las variables del juego:
    this.ocultarVerificar=true;
    this.tiempo=5;
    this.nuevoJuego = new JuegoAgilidad();
    console.info("Inicio agilidad");
  }

  NuevoJuego() {

    this.ocultarVerificar=false;

    this.crearCuenta();
    this.realizarCuenta();

    //Definir un intervalo para repetir el juego:
    this.repetidor = setInterval( () => {

      this.tiempo--;//Restar 1 a tiempo en cada iteración

      console.log("Tiempo restante: ", this.tiempo);

      //Si se acaba el tiempo
      if(this.tiempo == 0 ) {

        clearInterval(this.repetidor); //Detener el intervalo

        this.verificar();
        this.ocultarVerificar=true;
        this.tiempo=5;
      }

    }, 900);

  }

  //Detener el intervalo cuando se toca el botón verificar
  verificar()
  {
    this.ocultarVerificar=true;

    console.log(this.respuesta);

    //Verificar la cuenta:
    if(this.respuesta == this.resultado ) {

      //Mostrar menú jugar de nuevo
      this.nuevoJuego.gano = true;
      this.AbrirModalResultado();
      this.terminoJuego = true;


    } else {

      console.log("Perdió");
      this.nuevoJuego.gano = false;
      //Mostrar menú jugar de nuevo
      this.AbrirModalResultado();
      this.terminoJuego = true;

    }

    //Deter el intervalo:
    clearInterval(this.repetidor);
  }

  //Genera una cuenta aleatoria
  crearCuenta() {

    let indiceOperador = Math.floor( Math.random() * (3 - 0) + 0)

    this.primerNumero = Math.floor( Math.random() * (this.maximoRandom - this.minimoRandom) + this.minimoRandom);
    this.segundoNumero = Math.floor( Math.random() * (this.maximoRandom - this.minimoRandom) + this.minimoRandom);
    this.operador = this.listaOperadores[indiceOperador];

  }

  //Hace la cuenta y la guarda en resultado
  realizarCuenta() {

    //Analizar el operador para ver qué cuenta realizar
    switch(this.operador)
    {
      case '+':
        this.resultado = this.primerNumero + this.segundoNumero;
        break;
      case '-':
        this.resultado = this.primerNumero - this.segundoNumero;
        break;
      case '*':
        this.resultado = this.primerNumero * this.segundoNumero;
        break;
      case '/':
        this.resultado = this.primerNumero / this.segundoNumero;
        break;
    }

    console.log(this.resultado);
  }

  AbrirModalResultado() {

    //Abrir el modal de material
    let modalRef = this.matDialog.open(ResultadoJuegoComponent, {
      data: {
        resultado: this.nuevoJuego.gano,
      },

    });

  }

}

