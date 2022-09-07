import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {};
      
  
  ngOnInit(): void {
  }

}
