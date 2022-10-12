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
channelArr = [];
Currentname = localStorage.getItem('username');
role = localStorage.getItem('role');
currentGroup = localStorage.getItem('group');
groupArr =[];
//variables to remove channel
removedChannelObj = {};
deletedchannel = '';
//variables to add channel
newChannel = '';
newChannelObj = {};
roleSet(){
    
  if (this.role == 'Super Admin'){
   this.accrole = this.userRole.SuperAdmin;
   console.log(this.accrole);
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

    addGroupUser(){
      this.fetchedData = {name: this.currentGroup, users: this.user};
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
      this.fetchedUser = {name: this.currentGroup, users: this.removedUser};
    this.httpClient.post(this.url + "/api/removeGroupUser", this.fetchedUser).subscribe((result: any) => {
      if(result == true){
        alert("user removed from group");
      }
      if(result == false){
        alert("user NOT removed from group");
      }
    
    })};
    channelList(){
      this.httpClient.get(this.url + "/api/getGroups").subscribe((result: any) => {
        if (result.length !== 0) {
          for(let i =0; i < result.length; i++){
            if(result[i].name == this.currentGroup){
              this.channelArr = result[i].channels
              console.log(this.channelArr)
            }


  
          }
                 
        }})
    };
    addChannel(){
      this.newChannelObj = {name: this.newChannel, users: this.Currentname, group: this.currentGroup}
    this.httpClient.post(this.url + "/api/addChannel", this.newChannelObj).subscribe(res => alert("channel added"))
    };
    
    userList(){
      const user = localStorage.getItem('username');
      this.httpClient.get(this.url + "/api/getGroups").subscribe((grouplist: any) =>{
        if (grouplist.length !== 0) {
          for(let i =0; i < grouplist.length; i++){
            if(grouplist[i].name == this.currentGroup){
              this.userArr = grouplist[i].users
              console.log(this.userArr)
            }
            
            //console.log(this.groups);
  
          }
                 
        }
      })
    };
  
deleteChannel(){
  this.removedChannelObj = {name: this.deletedchannel}
  this.httpClient.post(this.url + '/api/deleteChannel', this.removedChannelObj).subscribe(res => alert("channel deleted"))
};
channelNav(name:any){
  this.router.navigate(['/channel']);
  localStorage.setItem('channel', name);
};


  ngOnInit(): void {
    this.channelList();
    this.userList();
  }

}
