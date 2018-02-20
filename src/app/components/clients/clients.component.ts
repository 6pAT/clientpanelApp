import {Component, OnInit} from '@angular/core';
import {ClientService} from "../../services/client.service";
import {Client} from "../../Models/Client";
//Animation
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  animations: [
    trigger('myAnimation', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.3s ease-in')
      ])
    ])
  ]
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  totalOwned: number;

  order: string = 'firstName';
  reverse: boolean = false;

  constructor(private  clientService: ClientService) {
  }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.totalOwned = this.getTotalOwned();
    });
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  getTotalOwned(): number {
    return this.clients.reduce((total, client) => {
      return total += client.balance;
    }, 0);
  }
}
