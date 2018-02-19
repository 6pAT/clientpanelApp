import {Component, OnInit, ViewChild} from '@angular/core';
import {ClientService} from "../../services/client.service";
import {Client} from "../../Models/Client";
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  maskPhone = ['+', '3', '8', '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  disabledBalanceOnAdd: boolean;

  @ViewChild("clientForm") form: any;  //достаем из ./add-client.component.html нашу форму

  constructor(private clientService: ClientService,
              private flashMessageService: FlashMessagesService,
              private router: Router,
              private settingService: SettingsService) {
  }

  ngOnInit() {
    this.disabledBalanceOnAdd = this.settingService.getSettings().disableBalanceOnAdd;
  }

  onSubmit(clientForm) {
    if (!this.form.valid) {
      this.flashMessageService.show("Please enter form", {
        timeout: 4000,
        cssClass: 'alert-danger'
      });
    } else {
      this.clientService.newClient(this.client);
      this.router.navigate(['/']);
    }
  }
}
