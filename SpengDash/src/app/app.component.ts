import { Component, OnInit } from '@angular/core';
import { isDevMode } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'SpengDash';

  public constructor(private titleService: Title ) { }

  ngOnInit() {
    if (localStorage.getItem("user_name")) {
      // Hide Home, show Dashboard
      $("#navHome").hide();
    }
    else {
      // Hide Dashboard, show Home
      $("#navDashboard").hide();
    }

    if (/msie\s|trident\//i.test(window.navigator.userAgent)) {
      $('#shameOnIE').show();
    }
    if(isDevMode()) {
      this.titleService.setTitle( "SpengDash STAGING" );
      $('#header-logo').fadeTo(5,0.5)
    }
  }
}
