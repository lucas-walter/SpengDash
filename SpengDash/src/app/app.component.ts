import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'SpengDash';

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
    
  }
}
