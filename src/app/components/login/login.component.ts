import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/entity/user-login';
import { ServicesService } from 'src/app/services/services.service';

import * as CryptoJs from 'crypto-js';
import { ConfigService } from 'src/app/services/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = new UserLogin();
  message: String = "";
  clicked: Boolean = false;

  constructor(private services: ServicesService, private config: ConfigService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('logged')) {
      if (CryptoJs.AES.decrypt(localStorage.getItem('logged'), this.config.key).toString(CryptoJs.enc.Utf8)) {
        this.router.navigate(['landing/home']);
      }
    }
  }

  onSubmit() {
    this.message = "";
    this.clicked = true;
    this.services.postData('login_user', this.login).subscribe(
      response => {
        this.clicked = false;
        if (response.message == "Login Sukses") {
          if (response.result[0].userAs != "9") {
            this.message = "You don't have access."
            setTimeout(() => {
              this.message = "";
            }, 3000);
            return false;
          }
          localStorage.setItem('logged', CryptoJs.AES.encrypt(JSON.stringify(response.result), this.config.key));
          this.router.navigate(['landing/home']);
        } else {
          this.message = "Invalid user name or password";
          setTimeout(() => {
            this.message = "";
          }, 3000);
        }
      }, error => {
        this.clicked = false;
        this.message = "Connection problem, please try again latter.";
        setTimeout(() => {
          this.message = "";
        }, 3000);
      }
    )
  }
}
