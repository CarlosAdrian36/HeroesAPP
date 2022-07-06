import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent implements OnInit {

  constructor(private HeroesService: HeroesService) { }

  ngOnInit(): void {
    this.HeroesService.getHeroes().subscribe(resp =>console.log(resp));
  }

}
