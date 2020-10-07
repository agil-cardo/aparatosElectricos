import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {

  isAuth = false;

  lastUpdated = new Date();

  appareils: any[];
  appareilSbuscription: Subscription;
  // para stocker la subscription en un Objeto de tipo subscription


  constructor(private appareilService: AppareilService) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
  }

  ngOnInit() {
    // this.appareils = this.appareilService.appareils; cuando se podia acceder pues era public
    
    this.appareilSbuscription = this.appareilService.appareilSubjet.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
    
    this.appareilService.emitAppareilSubject();
  }
  onAllumer() {
    this.appareilService.swhitchOnAll();
  }
  onEteindre() {
    this.appareilService.swhitchOffAll();
  }
  onSave() {
    this.appareilService.saveAppareislToServer();
  }

  onFetch() {
    this.appareilService.getAppareilsFromServer();
  }

}
