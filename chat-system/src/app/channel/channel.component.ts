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
  channel = localStorage.getItem('channel');
  role = localStorage.getItem('role');
  newUser = '';
  userJoined = '';
  fetchedData = {};
  fetchedUser = {};
  removedUser = '';

    ngOnInit(): void {
      this.initIoConnection();
      this.http.get(this.url + "/api/getChat").subscribe((result: any) => {
        for (let i = 0; i < result.length; i++) {
          if (result[i].channel == this.channel){
            for (let j=0; j < result[i].chats.length; j++){
              this.messages.push(result[i].chats[j]);
            }
          }
        }
      });
  
    }
   private initIoConnection() {
      this.socketService.initSocket();
      //pushes current message array into chat history
      this.ioConnection = this.socketService.getMessage()
        .subscribe((message: any) => {
          this.messages.push(message);
          //update chat history DB
          let fetchedData = {channel: this.channel, chats: this.messages}
          this.http.post(this.url + '/api/insertChat', fetchedData).subscribe((result: any) => {
            if(result == true){
              console.log("chat history updated");
            }

          })
        });
        this.ioConnection = this.socketService.getjoinUsers()
        .subscribe((result: any) => {
          this.userJoined = result;
          console.log(this.userJoined);
        });

  }
    chat() {
    if (this.currentMessage) {
      this.socketService.send(this.user + ':  ' + this.currentMessage);
      this.currentMessage = '';
    } else {
      console.log('no message');
    }
  }
  
  //getting chat history
  addChannelUser(){
    this.fetchedData = {name: this.channel, users: this.newUser};
    this.http.post(this.url + "/api/addChannelUser", this.fetchedData).subscribe((result: any) => {
      if(result == true){
        alert("user added to group");
      }
      if(result == false){
        alert("user NOT added to group");
      }
    
    })
  };
  removeUser(){
    this.fetchedUser = {name: this.channel, users: this.removedUser};
  this.http.post(this.url + "/api/removeChannelUser", this.fetchedUser).subscribe((result: any) => {
    if(result == true){
      alert("user removed from channel");
    }
    if(result == false){
      alert("user NOT removed from channel");
    }
  
  })};
  
  userlist(){};
  

}
