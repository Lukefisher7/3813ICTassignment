import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolePermissionsService } from '../services/role-permissions.service';
import { UserDataService } from '../services/user-data.service';
import { User } from '../user.model';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private userRole : RolePermissionsService) {};
  //variables for adding user to group
  fetchedData = {};
  group: any = '';
  user = '';
  //variables for removing user from group
  fetchedUser = {};
  removedgroup = '';
  removedUser = '';
  accrole: any;
  channels:any = [];
  url = "http://localhost:3000";
userArr = [];
Currentname = localStorage.getItem('username');
role = localStorage.getItem('role');

roleSet(){
    
  if (this.role == 'Super Admin'){
   this.accrole = this.userRole.SuperAdmin;
   //console.log(this.accrole);
      return this.accrole;
   }
   if (this.role == 'Group Admin'){
    this.accrole = this.userRole.GroupAdmin;
   //console.log(this.accrole);
      return this.accrole;
   }
   if (this.role == 'Group Assis'){
    this.accrole = this.userRole.GroupAssis;
   //console.log(this.accrole);
      return this.accrole;
   }
   if (this.role == 'Base User'){
    this.accrole = this.userRole.BaseUser;
   //console.log(this.accrole);
      return this.accrole;
   }
}















    chatLink(){
      this.router.navigate(['/channel']);
    }
    addGroupUser(){
      this.fetchedData = {name: this.group, users: this.user};
      this.httpClient.post(this.url + "/api/addGroupUser", this.fetchedData).subscribe((result: any) => {
        if(result == true){
          alert("user added to group");
        }
        if(result == false){
          alert("user NOT added to group");
        }
      
      })
    };
    removeUser(){
      this.fetchedUser = {name: this.removedgroup, users: this.removedUser};
    this.httpClient.post(this.url + "/api/removeGroupUser", this.fetchedUser).subscribe((result: any) => {
      if(result == true){
        alert("user removed from group");
      }
      if(result == false){
        alert("user NOT removed from group");
      }
    
    })};
    channelList(){
      this.httpClient.get(this.url + "/api/getChannels").subscribe((result: any) => {
        for(let i = 0; i< result.length; i++) {
        if(result[i].name == this.group){
          console.log(result[i]); 
          this.channels.push(result[i])}
        }})
    };
    addChannel(){};
    
    userList(){
      if(this.Currentname != ''){
      this.httpClient.get(this.url + "/api/getGroups").subscribe((grouplist: any) => {
        console.log(grouplist);
        //for(let i = 0; i < userlist.length; i++){
          //this.userArr.push(userlist[i])
        //}
        })
      }
    };
    deleteGroup(){};


  ngOnInit(): void {
  }

}
