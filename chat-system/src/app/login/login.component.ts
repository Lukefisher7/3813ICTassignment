import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  fetchedData = {};
  authenticated = false;
  url =  "http://localhost:3000";

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {}
  loggedIn() {
    if (localStorage.getItem('user_data') == null) {
      return true;
    }
    console.log(localStorage.getItem('user_data'));
    var data = localStorage.getItem('user_data') || '{}';
    var data_JSON = JSON.parse(data);
    return data_JSON[0].valid;
  }

  cardClasses() {
    return {
      hidemessage: this.authenticated,
      showmessage: !this.authenticated,
    };
  }

  submit() {
    this.fetchedData = {username: this.username, password: this.password};
    console.log("logging in with" + ' ' + this.username);
    this.httpClient.post(this.url + '/api/auth', this.fetchedData).subscribe((data:any) => {

      if(data = true){
        
        this.httpClient.get(this.url + "/api/getUsers").subscribe((userlist: any) => {
          console.log(userlist)
          for(let i = 0; i < userlist.length; i++){
            if(userlist[i].username == this.username){
              localStorage.setItem('role', userlist[i].role);
              localStorage.setItem('username', userlist[i].username);
              this.router.navigate(['/account']);
            }
          }
          })
          }
  if(data = false){
    console.log('not correct combo');
    alert("please try another username or password");
  }
})
  }

  ngOnInit(): void {}
}