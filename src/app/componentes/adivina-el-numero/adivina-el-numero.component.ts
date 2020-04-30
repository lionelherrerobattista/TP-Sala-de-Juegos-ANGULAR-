import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ResultadoJuegoComponent } from '../resultado-juego/resultado-juego.component';
import { JuegoAdivina } from '../../clases/juego-adivina';


@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css']
})

export class AdivinaElNumeroComponent implements OnInit {

  @Output() enviarJuego: EventEmitter<any>= new EventEmitter<any>();

  nuevoJuego: JuegoAdivina;
  Mensajes:string;
  contador:number;
  ocultarVerificar:boolean;

  constructor(private matDialog: MatDialog) {
    this.nuevoJuego = new JuegoAdivina();
    console.info("Numero secreto:",this.nuevoJuego.numeroSecreto);
    this.ocultarVerificar=false;
  }


  ngOnInit() {

  }

  ComenzarJuego() {
    this.nuevoJuego.GenerarNumero();
    this.contador= 0;
  }

  Verificar()
  {
    this.contador++;
    this.ocultarVerificar=true;

    console.info("Numero secreto:", this.nuevoJuego.gano);

    //función recursiva
    if(this.nuevoJuego.Verificar()) {

      this.enviarJuego.emit(this.nuevoJuego); //Mando el evento a la lista(?)

      this.MostarMensaje("Sos un Genio!!!", true);

      this.AbrirModalResultado();

      this.nuevoJuego.numeroSecreto= 0;

    }else{

      this.CrearMensaje();


      this.ocultarVerificar = false;

    }

    console.info("¿Ganó? ", this.nuevoJuego.gano);
  }

  CrearMensaje() {

    let mensaje:string;

      switch (this.contador) {
        case 1:
        mensaje="No es el número. Intento fallido ¡Ánimo!";
        break;
        case 2:
        mensaje="No es ese ¿Te estarás acercando?";
        break;
        case 3:
        mensaje="No es, Yo crei que la tercera era la vencida.";
        break;
        case 4:
        mensaje="No era el  " + this.nuevoJuego.numeroIngresado;
        break;
        case 5:
        mensaje=" intentos y nada.";
        break;
        case 6:
        mensaje="Afortunado en el amor";
        break;

        default:
            mensaje="Ya le erraste " + this.contador + " veces";
          break;
      }

      //Carga el mensaje:
      this.Mensajes= "#" + this.contador + "-" + mensaje  + " ayuda: " + this.nuevoJuego.RetornarAyuda();

  }

  //Muestra un mensaje de ayuda
  MostarMensaje(mensaje:string="este es el mensaje", ganador:boolean=false) {

    this.Mensajes= mensaje;

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
