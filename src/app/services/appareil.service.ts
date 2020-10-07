import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';





@Injectable()
export class AppareilService {

    // Subjet agrega "Abstraccion" no se manipulan los datos directamente,
    // es mejor Subjet en aplicaciones grandes
    appareilSubjet = new Subject<any[]>();
    private appareils = [
        {
            id: 1,
            name: 'Machine à laver',
            status: 'allumé'
        },
        {
            id: 2,
            name: 'Frigo',
            status: 'éteint'
        },
        {
            id: 3,
            name: 'Ordinateur',
            status: 'éteint'
        }
    ];

    constructor (private httpClient: HttpClient) {}


    // este metodo para acceder a los datos desde el exterior
    emitAppareilSubject() {
        this.appareilSubjet.next(this.appareils.slice());

        // next metode force le subjet a emmetre ce qu l'on le passe comme argument une slice = copie
    }

    // por retourner l'objet appareil par son id avec la metode "find" car c'est un array explic min 25.52
    getAppareilById(id: number) {
        const appareil = this.appareils.find(
            (appareilObject) => {
                return appareilObject.id === id;
            }
        );
        return appareil;

            // qui va chercher l'id qui corresponde al'id qui est passé en argument (id: number)
    }

    swhitchOnAll() {
        for (let appareil of this.appareils) {
            appareil.status = 'allumé'
        }
        this.emitAppareilSubject();
    }
    swhitchOffAll() {
        for (let appareil of this.appareils) {
            appareil.status = 'éteint'
        }
        this.emitAppareilSubject();
    }
    swhitchOnOne(index: number) {
        this.appareils[index].status = 'allumé';
        this.emitAppareilSubject();
        
    }
    swhitchOffOne(index: number) {
        this.appareils[index].status = 'éteint';
        this.emitAppareilSubject();

    }

    addAppareil(name: string, status: string) {
        const appareilObject = {
            id: 0,
            name: '',
            status:'',
        };
        // para crear el nuevo objeto que se crea vacio al principio para luego atribuir los argumentos

        appareilObject.name = name;
        appareilObject.status = status;
        appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
        // para obtener el ultimo id de la lista se quita 1 pues la maquina cuenta desde 0 despues del punto .  se escribe lo que uno quiere en este caso el id

        // y despues se agrega a la lista con "push"
        this.appareils.push(appareilObject);
        this.emitAppareilSubject();
    }

    // saveAppareislToServer(): Observable<appareils> {
    saveAppareislToServer() {

        this.httpClient.put('https://http-client-demo-9c125.firebaseio.com/appareils.json', this.appareils)
        // aparentemente el gs evita los problemas de cros origin
        .subscribe(
            () => {
                console.log('enregistrement terminé');                
            },
            (error) => {
                console.log('erreur de sauvegarde ! : '  , error);

                // avec + error s'affiche en forme de string PERO con , el error se afiche tal cual
                
            }
        ); 

        // para reaccionar a la respuesta del server, primera respuesta si todo ok
    }

    getAppareilsFromServer() {
        this.httpClient
        .get<any[]>('gs://http-client-demo-9c125.appspot.com/appareils.json')
        .subscribe(
            (Response) => {
                this.appareils = Response;
                this.emitAppareilSubject();
            },
            (error) => {
                console.log('Erreur ! : ' + error);
                
            }
        );
    }

}