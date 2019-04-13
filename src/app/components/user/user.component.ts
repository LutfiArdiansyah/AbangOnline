import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { ListUser } from 'src/app/entity/list-user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  list_user: Array<ListUser>;
  isModalVisible: Boolean = false;
  user = new ListUser();
  f_mobile: boolean = false;

  constructor(private services: ServicesService) {
    this.f_mobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.f_mobile = true;
    }
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.list_user = null;
    this.services.getData('list_user').subscribe(
      response => {
        this.list_user = response.result;
      }, error => {
      }
    );
  }

  viewUser(user: ListUser) {
    this.isModalVisible = true;
    this.user = user;
  }
}
