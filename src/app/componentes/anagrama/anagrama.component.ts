import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { DatosJuegoService } from '../../servicios/datos-juego.service';
import { MatDialog } from '@angular/material/dialog';
import { ResultadoJuegoComponent } from '../resultado-juego/resultado-juego.component';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {

  listaPalabras:string[] = ['hola', 'casa', 'colectivo', 'escalera', 'perro', 'hoja', 'programación', 'universidad'];
  anagrama:string;
  palabra:string;
  respuestaUsuario:string;
  resultado:string;
  mensajeResultado:string;
  empezoJuego:boolean;
  terminoJuego:boolean;

  constructor(private authService:AuthService,
    private datosJuegoService:DatosJuegoService,
    public matDialog: MatDialog) {

    this.terminoJuego = false;
   }

  ngOnInit() {
  }

  generarAnagrama() {


    this.empezoJuego = true;

    this.NuevoJuego();

    //busca una palabra al azar:
    let indiceRandom  = Math.floor( Math.random() * (this.listaPalabras.length - 0) + 0);
    this.palabra = this.listaPalabras[indiceRandom];

    let auxAnagrama = Array.from(this.palabra);
    let anagramaAleatorio;

    do{
      /* Randomize array in-place using Durstenfeld shuffle algorithm */
      for (var i = auxAnagrama.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = auxAnagrama[i];
        auxAnagrama[i] = auxAnagrama[j];
        auxAnagrama[j] = temp;
      }

      anagramaAleatorio = auxAnagrama.join("");

    }while(this.palabra === anagramaAleatorio);

    console.log(this.palabra);
    this.anagrama = anagramaAleatorio;

  }

  comprobarRespuesta() {

    var nombreUsuario;
    var resultadoParaLista;

    console.log(this.respuestaUsuario);

    if(this.respuestaUsuario === this.palabra)
    {
      this.terminoJuego = true;
      this.resultado= "Ganó";
      this.mensajeResultado = 'Ganaste';

      // enviar los datos a la lista
      this.enviarResultado();
      this.AbrirModalResultado();

    } else {

      this.terminoJuego = true;
      this.resultado = "Respuesta incorrecta";
      this.mensajeResultado = 'Perdiste';

      console.log("Respuesta incorrecta");
      this.enviarResultado();
      this.AbrirModalResultado();
    }
  }

  NuevoJuego() {

    this.terminoJuego = false;
    this.resultado = '';
    this.respuestaUsuario= '';

  }

  enviarResultado() {

    var nombreUsuario;
    var resultadoParaLista;
    var resultado;

    if(this.mensajeResultado =='Ganaste') {
      resultado = 'Ganó';
    } else if (this.mensajeResultado == 'Perdiste') {
      resultado = 'Perdió';
    } else {
      resultado = 'Empató';
    }

    // enviar los datos a la lista
     nombreUsuario = this.authService.mostrarNombre();
     resultadoParaLista = {
       juego: 'Anagrama',
       jugador: nombreUsuario,
       resultado: resultado,
     }

     this.datosJuegoService.cargarResultado(resultadoParaLista);
  }

  AbrirModalResultado() {

    //Abrir el modal de material
    this.matDialog.open(ResultadoJuegoComponent, {
      data: {
        resultado: this.mensajeResultado,
      },

    });

  }
}
