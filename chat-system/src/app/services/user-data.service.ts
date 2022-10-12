import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
// find all users, and return a promise of all user
  getUserList() {
    return this.http.get<User[]>(this.url + '/api/getUsers');
  }

  addUser(user:any){
    console.log(user);
    this.http.post(this.url + '/api/insertUser', user).subscribe(res => alert("user added"));

  }

  deleteUser(user: any){
    console.log(user);
    this.http.post(this.url + '/api/deleteUser', user).subscribe(res => alert('user removed'));

  }
  editUser(user: any){
    return this.http.put(this.url + '/api/editUser', user);

  }
}
