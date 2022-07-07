import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interface/heroe.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [ 
  ]
})
export class ListadoComponent implements OnInit {

  heroes :Heroe[] = [];

  constructor(private HeroesService: HeroesService) { }

  ngOnInit(): void {
    this.HeroesService.getHeroes().subscribe(H => {
      
      this.heroes = H;

    });
  }

}
