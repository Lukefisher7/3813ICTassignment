import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolePermissionsService } from '../services/role-permissions.service';
import{v4 as uuid} from 'uuid';
import { UserDataService } from '../services/user-data.service';
import { User } from '../user.model';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
accrole: any;
Nusername = '';
Npassword = '';
username = '';
  
  constructor(private router: Router, public rolePerms: RolePermissionsService, public userdata: UserDataService ){};
  title = 'chat-system';
  
  roleCheck(){
    var users: any = localStorage.getItem('user_data');
    users = JSON.parse(users);
    let i= 0;
    while(users[i].valid == false)
    {
     if(users[i].valid == true){
      console.log(users[i]);
      return users[i].role;
      } 

         }
        
        }
    
  roleSet(){
    var user: any = this.roleCheck()
    if (user == 'Super Admin'){
     this.accrole = this.rolePerms.SuperAdmin;
     console.log(this.accrole);
     return this.accrole;
     }
     if (user == 'Group Admin'){
      this.accrole = this.rolePerms.GroupAdmin;
     console.log(this.accrole);
     return this.accrole;
     }
     if (user == 'Group Assis'){
      this.accrole = this.rolePerms.GroupAssis;
     console.log(this.accrole);
     return this.accrole;
     }
     if (user == 'BaseUser'){
      this.accrole = this.rolePerms.BaseUser;
     console.log(this.accrole);
     return this.accrole;
     }
  }

  deleteUser(removeduser: string){
    var data: any= localStorage.getItem('user_data');
    var existingEntries = JSON.parse(data);
    console.log(existingEntries.findIndex((removeduser: any) => {
      return removeduser.username == this.username;
    }));
    existingEntries.splice(existingEntries.findIndex(this.username), 1);
    console.log(existingEntries);
    var newdata: any = JSON.stringify(existingEntries);
    localStorage.setItem('user_data', newdata);
    console.log(newdata);
  };

  createUser(){
    this.userdata.addUser(this.Nusername);
  };
  //deleteUser(){};
  getGroups(){};
  addGroups(){};
  


        
  ngOnInit(): void {
}
}