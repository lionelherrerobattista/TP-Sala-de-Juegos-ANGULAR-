import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  generarAnagrama() {

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
    console.log(this.respuestaUsuario);

    if(this.respuestaUsuario === this.palabra)
    {
      console.log("Ganó");
    } else {
      console.log("Respuesta incorrecta");
    }
  }

}
