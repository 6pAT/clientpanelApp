import {Component, OnInit} from '@angular/core';
import {ClientService} from "../../services/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Client} from "../../Models/Client";
import {SettingsService} from "../../services/settings.service";

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
  disableBalanceOnEdit: boolean;

  constructor(private clientService: ClientService,
              private router: Router,
              private route: ActivatedRoute,
              private settingService: SettingsService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.clientService.getClient(this.id).subscribe(client => {
      if (client) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
        this.client = client;
      }
    });
    this.disableBalanceOnEdit = this.settingService.getSettings().disableBalanceOnEdit;
  }


  updateBalance() {
    this.clientService.updateClient(this.client);
    this.showBalanceUpdateInput = false;
  }

  deleteUser() {
    if (confirm('Are you sure?')) {
      this.clientService.deleteClient(this.client);
      this.router.navigate(['/']);
    }
  }
}
