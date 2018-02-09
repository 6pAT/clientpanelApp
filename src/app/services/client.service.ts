import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
//Models
import { Client } from "../Models/Client";
@Injectable()
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client:Observable<Client>;
  constructor(private afs:AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients', ref => ref.orderBy('balance'));
  }

  getClients(): Observable<Client[]>{
    this.clients = this.clientsCollection.snapshotChanges().map(collection=>{
       return collection.map(document => {
         const data = document.payload.doc.data() as Client;
         data.id = document.payload.doc.id;
         return data;
       })
    });
    return this.clients;
  }

  newClient(client: Client){
    this.clientsCollection.add(client);
  }
}
