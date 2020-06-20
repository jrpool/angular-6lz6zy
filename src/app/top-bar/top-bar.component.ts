import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd }from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  constructor(
    private router: Router
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentURL = event.url;
      }
    })
  }
  ngOnInit() {
    console.log('The URL is ' + this.router.url);
  }
  currentURL: string = this.router.url;
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
