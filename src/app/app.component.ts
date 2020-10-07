import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppareilService } from './services/appareil.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Rx';
// el ultimo es para tener todos los metodos

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  // estas son interfaces

  secondes: number;
  counterSubscription: Subscription;
  // este ultimo es un Objeto para stocker la subscription para evitar le comportement infinit
  constructor() { }

  ngOnInit() {
    const counter = Observable.interval(1000);
    this.counterSubscription = counter.subscribe(
      (value: number) => {
        this.secondes = value;
      }
    );
  }

  //con este Metodo se evita el comportamiento infinito en el momento de la destruccion del componente
  ngOnDestroy () {
    this.counterSubscription.unsubscribe ();
  }
}



