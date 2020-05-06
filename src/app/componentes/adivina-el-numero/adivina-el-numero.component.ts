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
  ocultarVerificar:boolean;
  jugador:string;

  constructor(
    private matDialog: MatDialog,
    private datosJuegoService:DatosJuegoService,
    private authService:AuthService
  ) {

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
    var nombreUsuario;

    this.contador++;
    this.ocultarVerificar=true;

    console.info("Numero secreto:", this.nuevoJuego.gano);

    //función recursiva
    if(this.nuevoJuego.Verificar()) {

      this.mensajeResultado = 'Ganaste';

      // enviar los datos a la lista
      nombreUsuario = this.authService.mostrarNombre();

      this.resultadoParaLista = {
        juego: 'Adivina el número',
        jugador: nombreUsuario,
        resultado: 'Ganó',
      }

      this.datosJuegoService.cargarResultado(this.resultadoParaLista);

      this.MostarMensaje("Sos un Genio!!!", true);

      this.AbrirModalResultado();

      this.nuevoJuego.numeroSecreto= 0;

    }else{

      this.CrearMensaje();


      this.ocultarVerificar = false;
      this.mensajeResultado = 'Perdiste';

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
    this.matDialog.open(ResultadoJuegoComponent, {
      data: {
        resultado: this.mensajeResultado,
      },

    });

  }


}
