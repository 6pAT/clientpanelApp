import { Component, OnInit } from '@angular/core';
import {ClientService} from "../../services/client.service";
import {Client} from "../../Models/Client";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  nameSort:boolean;
  balanceSort:boolean;
  emailSort:boolean;

  totalOwned:number;

  constructor(private  clientService: ClientService) {
    this.nameSort = true;
    this.balanceSort = true;
    this.emailSort = true;
  }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients =>{
      this.clients = clients;
      this.totalOwned = this.getTotalOwned();
    })
  }

  sortForName() {
    if (this.nameSort) {
      this.clients.sort(function (a, b) {
        if (a.lastName > b.lastName) {
          return 1;
        }else if (a.lastName < b.lastName) {
          return -1;
        }
        return 0;
      });
    }else {
      this.clients.sort(function (a, b) {
        if (a.lastName < b.lastName) {
          return 1;
        }else if (a.lastName > b.lastName) {
          return -1;
        }
        return 0;
      });
    }
    this.nameSort = !this.nameSort;

  }

  sortForBalance() {
    if (this.balanceSort) {
      this.clients.sort((a, b)=>{
        return a.balance - b.balance;
      });
    }else {
      this.clients.sort((a, b)=>{
        return  b.balance - a.balance;
      });
    }
    this.balanceSort = !this.balanceSort;

  }

  sortForEmail() {
    if (this.emailSort) {
      this.clients.sort((a,b) =>{
        if (a.email > b.email) {
          return 1;
        }else if (a.email < b.email) {
          return -1;
        }
        return 0;
      });
    } else {
      this.clients.sort((a,b) =>{
        if (a.email < b.email) {
          return 1;
        }else if (a.email > b.email) {
          return -1;
        }
        return 0;
      });
    }
    this.emailSort = !this.emailSort;
  }

  getTotalOwned():number{
    return this.clients.reduce((total, client) => {
      return total+= client.balance;
    }, 0)
  }
}
