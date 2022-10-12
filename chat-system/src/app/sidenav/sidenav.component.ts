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
  selectedGroup = ''
  constructor(private router: Router, private httpClient: HttpClient) { }
  logOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  public showsidebar:  boolean = false;

  getGroups(){
    const user = localStorage.getItem('username');
    this.httpClient.get(this.url + "/api/getGroups").subscribe((grouplist: any) =>{
      console.log(typeof(grouplist))
      if (grouplist.length !== 0) {
        for(let i =0; i < grouplist.length; i++){
          var userdata = grouplist.users;
          console.log(userdata);
             this.groups.push(grouplist[i].name);
          
          
          
          //console.log(this.groups);

        }
               
      }
    })
  };

 


  ngOnInit(): void {
    this.getGroups();
      }

  groupNav(name:any){
    this.router.navigate(['/group']);
    localStorage.setItem('group', name);
    
  };
}
