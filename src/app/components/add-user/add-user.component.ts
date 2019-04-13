import { Component, OnInit } from '@angular/core';
import { AddUser } from 'src/app/entity/add-user';
import { ListDagangan } from 'src/app/entity/list-dagangan';
import { ServicesService } from 'src/app/services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: AddUser = new AddUser();
  list_dagangan: Array<ListDagangan> = new Array<ListDagangan>();
  message: String = "";
  clicked: Boolean = false;

  constructor(private services: ServicesService, private router: Router) { }

  ngOnInit() {
    this.getListDagangan();
  }

  getListDagangan() {
    this.list_dagangan = new Array<ListDagangan>();
    this.services.getData('list_tukang').subscribe(
      response => {
        this.list_dagangan = response.result;
      }, error => {

      }
    )
  }

  onSubmit() {
    this.message = "";
    this.clicked = true;
    if (this.user.no_hp.substring(0, 1) != '0') {
      this.user.no_hp = "0" + this.user.no_hp.toString();
    }
    this.services.postData('register_user', this.user).subscribe(
      response => {
        if (response.status == true && response.message == "Register Berhasil") {
          this.message = response.message;
          setTimeout(() => {
            window.location.replace(window.location.origin + window.location.pathname + '#/landing/user');
          }, 3000);
        } else if (response.status == true && response.message != "Register Berhasil") {
          this.message = response.message;
          this.clicked = false;
        }
      }, error => {
        this.message = "Connection problem, please try again later !.";
      }
    );
  }
}
