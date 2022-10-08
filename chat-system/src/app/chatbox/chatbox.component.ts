import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocketioService } from '../services/socketio.service';
@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  constructor(private socketService: SocketioService) { }
currentMessage: string = "";
messages: any = []
ioConnection: any;

SendMessage(){
  this.messages.push(this.currentMessage)
}
  ngOnInit(): void {
    this.initIoConnection();

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




}

