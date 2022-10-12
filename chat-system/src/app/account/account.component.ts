import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolePermissionsService } from '../services/role-permissions.service';
import{v4 as uuid} from 'uuid';
import { UserDataService } from '../services/user-data.service';
import { User } from '../user.model';
import { HttpClient } from '@angular/common/http';
import { SidenavComponent } from '../sidenav/sidenav.component';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html', 
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
url =  "http://localhost:3000";
accrole: any;
//variables for new users
Nusername ='';
Npassword = '';
Nrole = ''
fetchedData = {};
//current user variables
username = '';
Currentname = localStorage.getItem('username');
role: any = localStorage.getItem('role');
//variables for new groups
newGroupname = '';
newGroup = {};

//variables to delete users
removeUser: string = '';
removeUserObj = {};

//variables to change roles for user
newRole = '';
updatedUser = '';
userUpdate = {};

//variables to delete group
deletedGroup: string = ''
removedGroupObj: any = {};
  constructor(private router: Router, public rolePerms: RolePermissionsService, public userdata: UserDataService, private httpClient: HttpClient ){};
  title = 'chat-system';
  userRole = '';
  
  
    
  roleSet(){
    
    if (this.role == 'Super Admin'){
     this.accrole = this.rolePerms.SuperAdmin;
     //console.log(this.accrole);
     this.userRole = 'Super Admin';
     return this.accrole;
     }
     if (this.role == 'Group Admin'){
      this.accrole = this.rolePerms.GroupAdmin;
     //console.log(this.accrole);
     this.userRole = 'Group Admin';
     return this.accrole;
     }
     if (this.role == 'Group Assis'){
      this.accrole = this.rolePerms.GroupAssis;
     //console.log(this.accrole);
     this.userRole = 'Group Assis';
     return this.accrole;
     }
     if (this.role == 'Base User'){
      this.accrole = this.rolePerms.BaseUser;
     //console.log(this.accrole);
     this.userRole = 'Base User';
     return this.accrole;
     }
  }

  deleteUser(){
    this.removeUserObj = {username: this.removeUser}
    this.userdata.deleteUser(this.removeUserObj);
  };

  createUser(){
    this.fetchedData = {_id: uuid(), username: this.Nusername, password: this.Npassword, role: this.Nrole};
    this.userdata.addUser(this.fetchedData)
  };
  
  editRole(){
    this.userUpdate = {username: this.updatedUser, role: this.newRole};
    this.httpClient.post(this.url + '/api/editUser', this.userUpdate).subscribe(res => alert("role changed"))

  }


  createGroup(){
    this.newGroup = {_id: uuid(), name: this.newGroupname, users: this.Currentname}
    this.httpClient.post(this.url + "/api/insertGroup", this.newGroup).subscribe(res => alert("group added"))
  };
  
deleteGroup(){
  this.removedGroupObj = {name: this.deletedGroup}
  this.httpClient.post(this.url + '/api/deleteGroup', this.removeUserObj).subscribe(res => alert("group deleted"))
};


        
  ngOnInit(): void {
}
}