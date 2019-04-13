import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJs from 'crypto-js';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  collapsed: Boolean = true;
  name: String = JSON.parse(CryptoJs.AES.decrypt(localStorage.getItem('logged'), this.config.key).toString(CryptoJs.enc.Utf8))[0].name;

  constructor(private router: Router, private config: ConfigService) { }

  ngOnInit() {

  }

  logout() {
    localStorage.removeItem('logged');
    this.router.navigate(['../login']);
  }
}
