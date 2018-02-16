import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
//todo: почистить от console.log и убрать с login.html  (and Cl13ntPan3l)
  email: string;
  password: string;

  @ViewChild('clientEmail') clientEmail:any;
  constructor(private authService: AuthService,
              private flashMessage: FlashMessagesService,
              private router:Router) { }

  ngOnInit() {
    this.authService.getAuth().subscribe( auth=>{
      if (auth) {
        this.router.navigate(['/']);
      }
    });
    console.log(this.clientEmail);
  }

  onSubmit(){
    this.authService.login(this.email, this.password)
      .then(res => {
        this.flashMessage.show('You are now logged in',
          { cssClass: 'alert-success', timeout: 4000});
        console.log(res);
        this.router.navigate(['/']);
      })
      .catch(err=>{
        this.flashMessage.show(err.message,
          { cssClass: 'alert-danger', timeout: 4000});
        console.log(err);
      })
  }


}
