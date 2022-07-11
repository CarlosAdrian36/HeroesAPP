import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent   {

  constructor(private router: Router) { }

  login(){
    // Ir al Backend
    // Un usuario
    this.router.navigate (['./heroes'])

  }

}
