import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultado-juego',
  templateUrl: './resultado-juego.component.html',
  styleUrls: ['./resultado-juego.component.css']
})
export class ResultadoJuegoComponent implements OnInit {

  constructor(private route:Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mdDialogRef: MatDialogRef<ResultadoJuegoComponent>) { }

  ngOnInit(): void {
  }



  ReiniciarJuego() {

    this.mdDialogRef.close();
  }

  VolverAlMenu() {
    this.route.navigate(['Juegos']);
    this.mdDialogRef.close();
  }


}
