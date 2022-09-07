import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { findIndex } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

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

  constructor(private router: Router, private route: ActivatedRoute) {}
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
    fetch('http://localhost:3000/api/auth', {
      body: JSON.stringify({
        username: this.username,
        password: this.password,
      }),
      method: 'POST',
      headers: { 'content-type': 'application/json' }, 
    }) // fetch
      .then((response) =>
        response
          .json()
          .then((data) => (this.fetchedData = data))
          .then((data) => {
            console.log(data);
            for(let i =0; i< data.length; i++){
            if (data[i].valid) {
              // check if user is authenticated
              console.log('Authenticated');
              localStorage.clear();
              this.authenticated = true;
              localStorage.setItem(
                'user_data',
                JSON.stringify(this.fetchedData)
              );
              console.log('working', this.fetchedData);
              this.loggedIn();
              this.router.navigate(['/account']);
              return true;
            } 
          }
          this.authenticated = false;
          return false;
        })
      );

    // https://caniuse.com/?search=fetch f*k IE users
  }

  ngOnInit(): void {}
}