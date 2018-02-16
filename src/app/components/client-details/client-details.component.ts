import {Component, OnInit} from '@angular/core';
import {ClientService} from "../../services/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {Client} from "../../Models/Client";

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(private clientServise: ClientService,
              private flashMessageS: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.clientServise.getClient(this.id).subscribe(client => {
      if (client) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
        this.client = client;
      }
    })
  }


  updateBalance() {
    this.clientServise.updateClient(this.client);
    this.flashMessageS.show('Balance updated', {
      cssClass: 'alert-success', timeout: 4000
    });
    this.showBalanceUpdateInput = false;
  }

  deleteUser() {
    if (confirm('Are you sure?')) {
      this.clientServise.deleteClient(this.client);
      this.flashMessageS.show('Client removed', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }
}
