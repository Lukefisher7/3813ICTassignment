import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
const SERVER_URL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  private socket: any;
  constructor() {
    this.getMessage();
  }

  //setup
  initSocket() {
    this.socket = io(SERVER_URL);
    return () => {
      this.socket.disconnect();
    };
  }

  //emit msg
  send(message: string) {
    this.socket.emit('message', message);
  }

  disconnectUser() {
    this.socket.disconnect();
  }

  getDisconnectedUser(){
    return new Observable(observer => {
      this.socket.on('userDisconnected', (data:any) => {
        observer.next(data);
      })
    })
  }

  getjoinUsers(){
    return new Observable(observer => {
      this.socket.on('userJoined', (data: any) => {
        observer.next(data);
      });
    });
  }

  getMessage() {
    return new Observable((observer) => {
      this.socket.on('message', (data: any) => {
        observer.next(data);
      });
    });
  }


  
}