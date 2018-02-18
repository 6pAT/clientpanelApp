import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings.service";
import {Settings} from "../../Models/Settings";
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: Settings;

  constructor(private settingService: SettingsService,
              private flashMessage: FlashMessagesService,
              private router: Router) {
  }

  ngOnInit() {
    this.settings = this.settingService.getSettings();
  }

  onSubmit() {
    this.settingService.changeSettings(this.settings);
    this.flashMessage.show('Settings saved', {
      cssClass: 'alert-success', timeout: 4000
    });
    this.router.navigate(['/']);
  }
}
