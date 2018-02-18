import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {FlashMessagesService} from "angular2-flash-messages";

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private flashMessageS: FlashMessagesService) {
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData))
        .catch(err => reject(err));
    });
  }

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
          err => reject(err))
    });
  }

  getAuth() {
    return this.afAuth.authState.map(auth => auth);
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(value => {
        this.flashMessageS.show(`You are now logged out`, {
          cssClass: 'alert-success', timeout: 50000
        });
      })
      .catch(reason => {
        this.flashMessageS.show(`${reason}`);
      });
  }
}
