import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  
  constructor(private router: Router, private route: ActivatedRoute){};
  title = 'chat-system';
  logOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  roleCheck(){
    var users: any = localStorage.getItem('user_data');
    users = JSON.parse(users);
    let i= 0;
    for (i =0; i <= users.length; i++)
    {
     if(users[i].valid == true){
      console.log(users[i]);
      return users[i].role;
     } 

         }
        }
        
  ngOnInit(): void {
}
}