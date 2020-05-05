import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memoria',
  templateUrl: './memoria.component.html',
  styleUrls: ['./memoria.component.css']
})
export class MemoriaComponent implements OnInit {

  //tiempo para el juego
  tiempoJuego:number;
  terminoTiempo:boolean;
  contadorTiempo:any;//funcion que cuenta el tiempo
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


    this.jugando = false;

    // Inicializo el array de cartas que se muestran en pantalla
    this.clasesCartas = new Array();
    for(let i = 0;i < 12; i++)
    {
      this.clasesCartas.push('carta-vacia');
    }
  }

  ngOnInit(): void {

  }

  //Empieza el juego
  empezarJuego() {

    if(this.jugando == false) {

      console.log('Empezó el juego');

      //Iniciar variables
      this.mezclarClases();
      this.jugando = true;
      this.cartasDadasVuelta = 0;
      this.paresEncontrados = 0;
      this.tiempoJuego = 60;
      this.continuarJuego= true;
      this.terminoTiempo = false;

      //comienzo el contador
      this.contadorTiempo = setInterval( () => {

        this.tiempoJuego--;//Restar 1 a tiempo en cada iteración

        console.log("Tiempo restante: ", this.tiempoJuego);

        //Si se acaba el tiempo
        if(this.tiempoJuego == 0 ) {

          clearInterval(this.contadorTiempo); //Detener el intervalo

          this.terminoTiempo = true;

          this.controlarJuego();

        }

      }, 900);


    }
  }


  //Mezcla las clases de las imagenes del array
  mezclarClases() {

    let auxClasesCartas:string[] = [
      'carta-1', 'carta-1',
      'carta-2', 'carta-2',
      'carta-3','carta-3',
      'carta-4','carta-4',
      'carta-5', 'carta-5',
      'carta-6', 'carta-6',
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
      if(this.clasesCartas[numeroCarta] == 'carta-vacia' && this.cartasDadasVuelta < 2) {

        this.clasesCartas[numeroCarta] = this.clasesMezcladas[numeroCarta];

        //Cambio la imagen que falta
        if(this.claseImagenUno == undefined) {

          this.claseImagenUno = this.clasesCartas[numeroCarta];

        } else if (this.claseImagenDos == undefined) {

          this.claseImagenDos = this.clasesCartas[numeroCarta];
        }

        this.cartasDadasVuelta++;
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

    if(this.claseImagenUno == this.claseImagenDos
      && this.claseImagenUno != undefined) {

      this.paresEncontrados++;
       //Vuelvo a empezar
      this.claseImagenUno = undefined;
      this.claseImagenDos = undefined;

    }else {

       //detengo el juego para mostrar la segunda carta por 1 segundo:
      this.continuarJuego = false;

      //recorro el array y doy vuelta las cartas despues de 1 segundo
      setTimeout( () => {

        for(let i=0; i< this.clasesCartas.length;i++) {


          if(this.clasesCartas[i] == this.claseImagenUno) {

            this.clasesCartas[i]= 'carta-vacia';
            this.claseImagenUno = undefined;

          } else if (this.clasesCartas[i] == this.claseImagenDos) {

            this.clasesCartas[i]= 'carta-vacia';
            this.claseImagenDos = undefined;
          }
        }

        //Vuelvo a permitirle al jugador jugar al juego
        this.continuarJuego = true;

      }, 1000 * 1);

    }

    this.cartasDadasVuelta = 0;

    if(this.terminoTiempo) {
      this.jugando = false;
      console.log('perdiste');
    }

    //Compruebo si ganó
    if(this.paresEncontrados == 6)
    {
      this.gano = true;
      this.jugando = false;

      console.log('ganaste');
    }

  }

}
