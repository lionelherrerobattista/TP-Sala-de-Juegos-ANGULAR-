import { Juego } from '../clases/juego'

export class JuegoAdivina extends  Juego {

  numeroSecreto: number = 0;

  numeroIngresado = 0;

  constructor(nombre?: string, gano?: boolean, jugador?:string) {
      super("Adivina el número",gano,jugador);



    }

  public Verificar() {
      if (this.numeroIngresado == this.numeroSecreto) {
        this.gano = true;
      }
      if (this.gano) {
        return true;
      } else {
        return false;
      }
  }

  public GenerarNumero() {
    this.numeroSecreto = Math.floor((Math.random() * 100) + 1);
    console.info('numero Secreto:' + this.numeroSecreto);
    this.gano = false;
  }

  public RetornarAyuda() {

    let mensaje:string;

    if (this.numeroIngresado < this.numeroSecreto) {

      mensaje= "El número es más grande";

    } else {

      mensaje= "Te pasaste";

    }
    return mensaje;
  }
}
