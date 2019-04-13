import { Component, OnInit } from '@angular/core';
import { AddUser } from 'src/app/entity/add-user';
import { ServicesService } from 'src/app/services/services.service';
import { ListDagangan } from 'src/app/entity/list-dagangan';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: AddUser = new AddUser();
  list_dagangan: Array<ListDagangan> = new Array<ListDagangan>();
  message: String = "";
  clicked: Boolean = false;

  constructor(private services: ServicesService) { }

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.services.getData('profile_user/lutfi.ardiansyah').subscribe(
      response => {
        console.log(response);
      }, error => {
        console.log(error);
      }
    )
  }

  onSubmit() {
    
  }
}
