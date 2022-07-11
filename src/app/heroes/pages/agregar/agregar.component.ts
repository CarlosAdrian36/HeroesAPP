import { Component, OnInit } from '@angular/core';
import { Publisher, Heroe } from '../../interface/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';



@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width: 100%;
      border-radius: 5px;
    }
  `
  ]
})
export class AgregarComponent implements OnInit {

  Publishers= [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe:Heroe={
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
    
  }

  constructor(private heroeService: HeroesService,
              private ActivatedRoute : ActivatedRoute,
              private router : Router ) { }

  ngOnInit(): void {
    
    if( !this.router.url.includes('editar') ){
      return;
    }
    
    this.ActivatedRoute.params.pipe(
      switchMap(({id}) => this.heroeService.getHeroePorId(id))
    )
    .subscribe(heroe => this.heroe = heroe);
  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0){
      return;
    }
    if(this.heroe.id){
      //Actualizar
      this.heroeService.actualizarHeroe(this.heroe).subscribe(heroe => console.log('Actualizando', heroe));
    }else{
      //Crear
      this.heroeService.agregarHeroe(this.heroe)
      .subscribe(resp => {
        this.router.navigate(['/heroes/editar', resp.id])
      })
    }
  }

  borrar(){
    this.heroeService.borrarHeroe( this.heroe.id!  )
    .subscribe(resp =>{
      this.router.navigate(['/heroes']);
    });
  }


}
