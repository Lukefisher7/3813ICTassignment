import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  constructor() { }
currentMessage = ""
messages: any = []

SendMessage(){
  this.messages.push(this.currentMessage)
}
  ngOnInit(): void {
  }

}
