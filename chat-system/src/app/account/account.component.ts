import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolePermissionsService } from '../role-permissions.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
accrole: any;
  
  constructor(private router: Router, private route: ActivatedRoute, public rolePerms: RolePermissionsService){};
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
      this.rolePerms.GroupAdmin;
      console.log(this.rolePerms.GroupAdmin);
     }
     if (user == 'Group Assis'){
      this.rolePerms.GroupAssis;
      console.log(this.rolePerms.GroupAssis);
     }
  }


        
  ngOnInit(): void {
}
}