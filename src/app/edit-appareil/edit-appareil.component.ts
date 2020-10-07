import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppareilService } from '../services/appareil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-appareil',
  templateUrl: './edit-appareil.component.html',
  styleUrls: ['./edit-appareil.component.scss']
})
export class EditAppareilComponent implements OnInit {

  defaultOnOff = 'éteint';

  // se agrega una nueva propiedad para estar seguro que se llena el status del aparato

  constructor(private appareilService: AppareilService,
              private router: Router ) 
              // para que despues de registar el usuario vuelva a la lista
              { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);

    const name = form.value['name'];
    const status = form.value['status'];
    // const nos permite recuperar los datos  y despues en el appareil.service.ts crear la onSubmit method

    // y para poder acceder al formulario se crea un path en app.module  lo que se obtenga nos permitira crear un nuevo aparato
    
    // se llama el metodo addAppareil y se le pasan lo que se recupera del formulario
    this.appareilService.addAppareil(name, status);
    this.router.navigate(['/appareils']);

  }

}
