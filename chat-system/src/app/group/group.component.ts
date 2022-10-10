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

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {};
  group: any = '';
  user = '';
  accrole = '';
  channels:any = [];
  url = "http://localhost:3000";


    chatLink(){
      this.router.navigate(['/channel']);
    }
    addUser(){};
    removeUser(){};
    channelList(){
      this.httpClient.get(this.url + "/api/getChannels").subscribe((result: any) => {
        for(let i = 0; i< result.length; i++) {
        if(result[i].name == this.group){
          console.log(result[i]); 
          this.channels.push(result[i])}
        }})
    };
    addChannel(){};
    userList(){};
    deleteGroup(){};


  ngOnInit(): void {
  }

}
