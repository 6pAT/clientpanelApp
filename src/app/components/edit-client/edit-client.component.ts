import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Client} from "../../Models/Client";
import {ClientService} from "../../services/client.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: string;
  client: Client;
  disableBalanceOnEdit: boolean;
  maskPhone = ['+', '3', '8', '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  @ViewChild('clientForm') form: any;

  constructor(private route: ActivatedRoute,
              private clientService: ClientService,
              private flashMessageS: FlashMessagesService,
              private router: Router,
              private settingService: SettingsService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe((client) => {
      this.client = client;
    }, error2 => {
      this.flashMessageS.show(error2);
    });

    this.disableBalanceOnEdit = this.settingService.getSettings().disableBalanceOnEdit;
  }

  onSubmit() {
    if (!this.form.valid) {
      this.flashMessageS.show("Please enter form", {
        timeout: 4000,
        cssClass: 'alert-danger'
      });
    } else {
      this.clientService.updateClient(this.client);

      this.router.navigate([`/client/${this.id}`]);
    }
  }

}
