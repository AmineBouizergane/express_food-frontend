import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'express-food-front-end';
    showNavbar: boolean = true;

    constructor(private router: Router) { }

    ngOnInit(): void {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          // Adjust routes as necessary
          this.showNavbar = !['/login', '/403', '/register'].includes(event.urlAfterRedirects);
        }
      });
    }
}
