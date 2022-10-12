import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  url =  "http://localhost:3000";
  groups: any = [];
  constructor(private router: Router, private httpClient: HttpClient) { }
  logOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  public showsidebar:  boolean = false;

  getGroups(){
    const user = localStorage.getItem('username');
    this.httpClient.get(this.url + "/api/getGroups").subscribe((grouplist: any) =>{
console.log(grouplist)
      for(let i = 0; i < grouplist.length; i++){
               
      }
    })
  };


  ngOnInit(): void {
    this.getGroups
  }

  group(){
    this.router.navigate(['/group']);
  };
}
