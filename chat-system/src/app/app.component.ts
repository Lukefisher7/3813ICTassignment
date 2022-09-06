import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
 
  
  ngOnInit(): void {
    localStorage.setItem('user_data', 'your_data');
  }
}

