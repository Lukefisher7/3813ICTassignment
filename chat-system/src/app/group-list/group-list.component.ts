import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatAccordion} from '@angular/material/expansion';
import { MatMenuContent } from '@angular/material/menu';
@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
 groupList: any[] = ['g1', 'g2'];

  constructor(private router: Router, private route: ActivatedRoute) {};
  
  
  ngOnInit(): void {
  };
  onChange(event: any){
    console.log(event.value);
  }
};
