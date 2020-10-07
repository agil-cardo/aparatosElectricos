import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authStatus: boolean;

  constructor(private authService: AuthService, private router: Router) { }
  // se inyecta aqui para poder utilisar los metodos creados en auth.service.ts

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
    // this.authStatus egale à isAuth dans auth.service.ts es hay donde esta

  }

  onSignIn() {

    // este metodo onsSignIn va a declancher la metodo signIn de authService
    this.authService.signIn().then(
      () => {
        this.authStatus = this.authService.isAuth;
        this.router.navigate(['appareils']);
        // this.router avec la methode navigate qui prend un 
        // array comme argument [le path pueden ser plusieurs]
      }
    );
  }

  onSignOut() {
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
  }

}
