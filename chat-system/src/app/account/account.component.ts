import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolePermissionsService } from '../services/role-permissions.service';
import{v4 as uuid} from 'uuid';
import { UserDataService } from '../services/user-data.service';
import { User } from '../user.model';
import { HttpClient } from '@angular/common/http';

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
url =  "http://localhost:3000";
newGroup = '';
  
  constructor(private router: Router, public rolePerms: RolePermissionsService, public userdata: UserDataService, private httpClient: HttpClient ){};
  title = 'chat-system';
  userRole = '';
  
    
  roleSet(){
    var role: any = localStorage.getItem('role');
    if (role == 'Super Admin'){
     this.accrole = this.rolePerms.SuperAdmin;
     //console.log(this.accrole);
     this.userRole = 'Super Admin';
     return this.accrole;
     }
     if (role == 'Group Admin'){
      this.accrole = this.rolePerms.GroupAdmin;
     //console.log(this.accrole);
     this.userRole = 'Group Admin';
     return this.accrole;
     }
     if (role == 'Group Assis'){
      this.accrole = this.rolePerms.GroupAssis;
     //console.log(this.accrole);
     this.userRole = 'Group Assis';
     return this.accrole;
     }
     if (role == 'BaseUser'){
      this.accrole = this.rolePerms.BaseUser;
     //console.log(this.accrole);
     this.userRole = 'Base User';
     return this.accrole;
     }
  }

  deleteUser(){
    this.userdata.deleteUser(this.Nusername);
  };

  createUser(){
    this.userdata.addUser(this.Nusername);
  };
  //deleteUser(){};
  


  addGroups(){
    this.httpClient.post(this.url + "/api/insertGroup", this.newGroup);
    this.httpClient.post(this.url + "/api/insertGroup", this.newGroup)
  };
  


        
  ngOnInit(): void {
}
}