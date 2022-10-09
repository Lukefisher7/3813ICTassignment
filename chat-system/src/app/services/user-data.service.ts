import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user.model';

Injectable({
  providedIn: 'root'
})

export class UserDataService {
  url = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getUserList() {
    return this.http.get<User[]>(this.url + 'getUsers');
  }

  addUser(user:any){
    console.log(user);
    this.http.post(this.url + 'addUser', user).subscribe(res => console.log("user added"));

  }

  deleteUser(user: any){
    console.log(user);
    this.http.delete(this.url + 'deleteUser', user).subscribe(res => console.log('user removed'));

  }
  editUser(user: any, role: any){
    return this.http.put(this.url + 'editUser', user, role);

  }
}
