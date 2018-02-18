import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs/Observable";
//Models
import {Client} from "../Models/Client";
import {FlashMessagesService} from "angular2-flash-messages";

@Injectable()
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  authState: any = null;

  constructor(private afs: AngularFirestore,
              private afAuth: AngularFireAuth,
              private flashMessageService: FlashMessagesService) {
    this.clientsCollection = this.afs.collection('clients', ref => ref.orderBy('balance'));

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  getClients(): Observable<Client[]> {
    this.clients = this.clientsCollection.snapshotChanges().map(collection => {
      return collection.map(document => {
        const data = document.payload.doc.data() as Client;
        data.id = document.payload.doc.id;
        return data;
      })
    });
    return this.clients;
  }

  getClient(id: string): Observable<Client> {
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Client;
        data.id = action.payload.id;
        return data;
      }
    });
    return this.client;
  }

  newClient(client: Client) {
    this.clientsCollection.add(client).then(value => {
      this.flashMessageService.show('New client add success', {
        cssClass: 'alert-success',
        timeout: 4000
      });
    }).catch(reason => {
      this.flashMessageService.show('New client add success', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    })
  }

  deleteClient(client: Client) {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.delete()
      .then(value => {
        this.flashMessageService.show('Client removed', {
          cssClass: 'alert-success', timeout: 4000
        });
      })
      .catch(reason => {
        this.flashMessageService.show(`Client removed error`, {
          cssClass: 'alert-danger',
          timeout: 4000
        });
      })
  }


  updateClient(client: Client) {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.update(client)
      .then(value => {
        this.flashMessageService.show('Client editing was successful', {
          cssClass: 'alert-success',
          timeout: 4000
        });
      }).catch(reason => {
      this.flashMessageService.show(`Client editing error`, {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    });
  }


}
