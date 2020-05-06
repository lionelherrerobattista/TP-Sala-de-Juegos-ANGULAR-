import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalRegistroComponent } from '../modal-registro/modal-registro.component';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {


  constructor(private authService:AuthService,
    private matDialog:MatDialog ) { }

  ngOnInit() {

  }

  abrirModalRegistro() {

    //Abrir el modal de material
    this.matDialog.open(ModalRegistroComponent);

  }

}
