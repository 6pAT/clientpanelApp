import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private afAuth: AngularFireAuth) {
  }

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.map(auth => {
      let res: boolean;
      if (!auth) {
        this.router.navigate(['/login']).catch(reason => {
          console.log(reason);
        });
        res = false;
      } else {
        res = true;
      }
      return res;
    });
  }
}
