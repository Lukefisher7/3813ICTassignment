import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { User } from '../user.model';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  constructor() { }

  addUser(){};
  removeUser(){};
  deleteChannel(){};
  userlist(){};
  

  ngOnInit(): void {
  }

}
