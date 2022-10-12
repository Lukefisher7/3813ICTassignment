import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { User } from '../user.model';
import { SocketioService } from '../services/socketio.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  constructor(private socketService: SocketioService, private http: HttpClient, private router: Router) { }
  currentMessage: string = "";
  messages: any = []
  ioConnection: any;
  user = localStorage.getItem('username');
  url =  "http://localhost:3000";
  SendMessage(){
    this.messages.push(this.currentMessage)
  }
    ngOnInit(): void {
      if (!localStorage.getItem('username')) {
        sessionStorage.clear();
        alert("Please log in first");
        this.router.navigateByUrl('/login');
      }
  
      if (!localStorage.getItem("group")) {
        alert("error");
        this.router.navigateByUrl("/account");
      }
  
      if (!localStorage.getItem("channel")) {
        alert("error");
        this.router.navigateByUrl("/group");
      }
      this.initIoConnection();
      this.http.get(this.url + '/api/getChats')
    
  
    }
   private initIoConnection() {
      this.socketService.initSocket();
      this.ioConnection = this.socketService.getMessage()
        .subscribe((message: any) => {
          this.messages.push(message);
        });
  }
    chat() {
    if (this.currentMessage) {
      this.socketService.send(this.currentMessage);
      this.currentMessage = '';
    } else {
      console.log('no message');
    }
  }
  
  
  















  addUser(){};
  removeUser(){};
  deleteChannel(){};
  userlist(){};
  

}
