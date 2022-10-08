import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolePermissionsService } from '../services/role-permissions.service';
import{v4 as uuid} from 'uuid';
import { SidenavComponent } from '../sidenav/sidenav.component';
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
  
  constructor(private router: Router, private route: ActivatedRoute, public rolePerms: RolePermissionsService, ){};
  title = 'chat-system';
  logOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  roleCheck(){
    var users: any = localStorage.getItem('user_data');
    users = JSON.parse(users);
    let i= 0;
    for (i =0; i <= users.length; i++)
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

  createUser(newuser: string, pwd: string){
    var data: any= localStorage.getItem('user_data');
    var existingEntries = JSON.parse(data);
    console.log(existingEntries);
    var info: any = {id: uuid(), username: newuser, password: pwd, role: 'BaseUser', valid : false}
    existingEntries.push(info)
    var newdata: any = JSON.stringify(existingEntries);
    localStorage.setItem('user_data', newdata);
};

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


        
  ngOnInit(): void {
}
}