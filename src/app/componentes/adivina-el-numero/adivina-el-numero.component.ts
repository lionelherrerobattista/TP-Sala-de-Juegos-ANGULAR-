import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResultadoJuegoComponent } from '../resultado-juego/resultado-juego.component';
import { JuegoAdivina } from '../../clases/juego-adivina';
import { DatosJuegoService, Resultado } from '../../servicios/datos-juego.service';
import { AuthService } from '../../servicios/auth.service';



@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css']
})

export class AdivinaElNumeroComponent implements OnInit {

  mensajeResultado:string;
  resultadoParaLista:Resultado;
  nuevoJuego: JuegoAdivina;
  Mensajes:string;

  contador:number;
  gano:boolean;
  ocultarVerificar:boolean;
  jugador:string;

  constructor(
    private matDialog: MatDialog,
    private datosJuegoService:DatosJuegoService,
    private authService:AuthService
  ) {

    this.nuevoJuego = new JuegoAdivina();
    console.info("Numero secreto:",this.nuevoJuego.numeroSecreto);
    this.ocultarVerificar=true;
  }


  ngOnInit() {

  }

  ComenzarJuego() {
    this.nuevoJuego.GenerarNumero();
    this.ocultarVerificar=false;
    this.contador= 0;
    this.Mensajes = '';
  }


  Verificar()
  {

    this.contador++;
    console.info("Numero secreto:", this.nuevoJuego.gano);

    //función recursiva
    if(this.nuevoJuego.Verificar()) {

      this.MostarMensaje("Sos un Genio!!!", true);
      this.mensajeResultado = 'Ganaste';
      this.enviarResultado();
      this.AbrirModalResultado();
      this.ocultarVerificar = true;

    } else if (this.contador > 10) {

      this.mensajeResultado = 'Perdiste';
      this.enviarResultado();
      this.AbrirModalResultado();
      this.ocultarVerificar = true;

    } else {
      this.CrearMensaje();
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

  enviarResultado() {

    var nombreUsuario;
    var resultadoParaLista;
    var resultado;

    if(this.mensajeResultado == 'Ganaste') {
      resultado = 'Ganó';
    } else if (this.mensajeResultado == 'Perdiste') {
      resultado = 'Perdió';
    } else {
      resultado = 'Empató';
    }

    // enviar los datos a la lista
     nombreUsuario = this.authService.mostrarNombre();
     resultadoParaLista = {
       juego: 'Piedra, papel o tijera',
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
