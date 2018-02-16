import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {SettingsService} from "../services/settings.service";

@Injectable()
export class RegisterGuard implements CanActivate {
  constructor(private router: Router,
              private settingService: SettingsService) {
  }

  canActivate(): boolean {
    let res: boolean;
    if (this.settingService.getSettings().allowRegistration) {
      res = true;
    } else {
      this.router.navigate(['/login']);
      res = false;
    }
    return res;
  }
}
