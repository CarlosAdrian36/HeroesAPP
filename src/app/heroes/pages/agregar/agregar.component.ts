import { Component, OnInit } from '@angular/core';
import { Publisher, Heroe } from '../../interface/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';



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
              private router : Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

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
      this.heroeService.actualizarHeroe(this.heroe).subscribe(heroe => this.mostrarsnackBAr('Registro Actualizado'));
    }else{
      //Crear
      this.heroeService.agregarHeroe(this.heroe)
      .subscribe(resp => {
        this.router.navigate(['/heroes/editar', resp.id]);
        this.mostrarsnackBAr('Registro Creado');
      })
    }
  }

  borrar(){
    const dialog = this.dialog.open(ConfirmarComponent,{
      width: '250px',
      data: {...this.heroe}
    });
    dialog.afterClosed().subscribe(
      (result) =>{
        if (result){
          this.heroeService.borrarHeroe( this.heroe.id!  )
          .subscribe(resp =>{
            this.router.navigate(['/heroes']);
          });
        }
      }
    )


  }

  mostrarsnackBAr (mensaje:string):void{
    this.snackBar.open( mensaje, 'Cerrar',{
      duration: 2500
    });
  }


}
