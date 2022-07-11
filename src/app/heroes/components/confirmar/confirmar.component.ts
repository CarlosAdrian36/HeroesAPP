import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interface/heroe.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  
})
export class ConfirmarComponent implements OnInit {

  constructor(private dialogref: MatDialogRef<ConfirmarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Heroe,) { }

  ngOnInit(): void {
  }

  borrarHeroe(){
    this.dialogref.close(true);
  }

  cerrar(){
    this.dialogref.close();
  }
}
