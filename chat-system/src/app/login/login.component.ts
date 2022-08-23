import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName = ""
  password = ""
  userlist = [{"userName": "tester", "password": "123"}, {"userName": "tester2", "password": "1234"}, {"userName": "tester3", "password": "1235"}]
  constructor(private router:Router) { }

  check(){
    let found = this.userlist.some(e=>(e.userName == this.userName && e.password == this.password));
    if(found){
      this.router.navigate(['/','account'])
    } else{
      alert("incorrect username or password, please try again")
    }
  }

  ngOnInit(): void {
  }

}
