import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memoria',
  templateUrl: './memoria.component.html',
  styleUrls: ['./memoria.component.css']
})
export class MemoriaComponent implements OnInit {

  //tiempo para el juego

  //Arrays para las cartas
  clasesCartas:string[];
  clasesMezcladas:string[];
  //Variables para las cartas que elige el jugador
  claseImagenUno:string;
  claseImagenDos:string;

  //Variables de control
  cartasDadasVuelta:number;
  paresEncontrados:number;
  continuarJuego:boolean;//para dejar 1 segundo la segunda carta
  jugando:boolean;
  gano:boolean;

  constructor() {

    this.cartasDadasVuelta = 0;
    this.paresEncontrados = 0;
    this.jugando = false;
    this.continuarJuego= true;

    // Inicializo el array
    this.clasesCartas = new Array();
    for(let i = 0;i < 12; i++)
    {
      this.clasesCartas.push('tarjeta-vacia');
    }
  }

  ngOnInit(): void {

  }

  //Empieza el juego
  empezarJuego() {

    if(this.jugando == false) {
      this.mezclarClases();
      console.log('Empezó el juego');
      this.jugando = true;
    }
  }


  //Mezcla las clases de las imagenes del array
  mezclarClases() {

    let auxClasesCartas:string[] = [
      'clase-1', 'clase-1',
      'clase-2', 'clase-2',
      'clase-3','clase-3',
      'clase-4','clase-4',
      'clase-5', 'clase-5',
      'clase-6', 'clase-6',
    ];

    for (var i = auxClasesCartas.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = auxClasesCartas[i];
      auxClasesCartas[i] = auxClasesCartas[j];
      auxClasesCartas[j] = temp;
    }

    this.clasesMezcladas = auxClasesCartas;

  }

  //Revela la imagen de la carta
  mostrarImagen(numeroCarta:number) {
    if(this.jugando && this.continuarJuego) {
      //controlo si las imagenes no están seleccionadas y asigno
      if(this.clasesCartas[numeroCarta] == 'tarjeta-vacia' && this.cartasDadasVuelta < 2) {

        this.clasesCartas[numeroCarta] = this.clasesMezcladas[numeroCarta];

        if(this.claseImagenUno == undefined) {
          this.claseImagenUno = this.clasesCartas[numeroCarta];
        } else {
          this.claseImagenDos = this.clasesCartas[numeroCarta]
        }


        this.cartasDadasVuelta++;
        console.log('doy vuelta');

      }


      //Comprobar si encontró dos cartas iguales o si gano
      if(this.cartasDadasVuelta == 2)
      {
        this.controlarJuego();

      }
    }


  }

  //Controla si el jugador ganó o si continua jugando
  controlarJuego() {

    console.log('controlo: ' + this.claseImagenUno + ' - ' + this.claseImagenDos);
    if(this.claseImagenUno == this.claseImagenDos && this.claseImagenUno != 'tarjeta-vacia') {

      this.paresEncontrados++;

    }else {

       //detengo el juego para mostrar la segunda carta por 1 segundo:
      this.continuarJuego = false;

      //recorro el array y doy vuelta las cartas despues de 1 segundo
      setTimeout( () => {

        for(let i=0; i< this.clasesCartas.length;i++) {

          console.log(this);
          if(this.clasesCartas[i] == this.claseImagenUno) {
            this.clasesCartas[i]= 'tarjeta-vacia';
          } else if (this.clasesCartas[i] == this.claseImagenDos) {
            this.clasesCartas[i]= 'tarjeta-vacia';
          }
        }

        //Vuelvo a empezar
        this.claseImagenUno = undefined;
        this.claseImagenDos = undefined;

        //Vuelvo a permitirle al jugador jugar al juego
        this.continuarJuego = true;

      }, 1000 * 1);

    }

    this.cartasDadasVuelta = 0;
    console.log(this.paresEncontrados);

    if(this.paresEncontrados == 6)
    {
      this.gano = true;
      this.jugando = false;
    }

  }

}
