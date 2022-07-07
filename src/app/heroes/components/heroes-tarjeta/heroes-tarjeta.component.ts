import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interface/heroe.interface';

@Component({
  selector: 'app-heroes-tarjeta',
  templateUrl: './heroes-tarjeta.component.html',
  
})

export class HeroesTarjetaComponent   {
  
  @Input() heroe!: Heroe;

}
