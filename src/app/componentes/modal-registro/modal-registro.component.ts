import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { JugadoresService, Jugador } from '../../servicios/jugadores.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-registro',
  templateUrl: './modal-registro.component.html',
  styleUrls: ['./modal-registro.component.css']
})

export class ModalRegistroComponent implements OnInit {

  usuario:string;
  dni:string;
  sexo:string;
  email:string;
  password:string;

  constructor(
    private authService:AuthService,
    private jugadoresService:JugadoresService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mdDialogRef: MatDialogRef<ModalRegistroComponent>) { }

  ngOnInit(): void {

  }

  registrarUsuario() {
    this.guardarJugador();
    this.authService.registrarUsuario(this.email, this.password);
    this.cerrarModal();
  }

  guardarJugador() {

    let cuit = '20-' + this.dni + '-9';

    let jugador:Jugador = {
      usuario: this.usuario,
      cuit: cuit,
      sexo: this.sexo,
      gano: 'No jugó',
      email: this.email,
    }

    console.log(this.sexo);

    this.jugadoresService.agregarJugador(jugador);
  }

  cerrarModal() {
    this.mdDialogRef.close();
  }


}
