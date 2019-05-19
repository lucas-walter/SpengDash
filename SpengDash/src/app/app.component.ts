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

    $.get( "http://46.101.115.220/spengdash/api/news.php", function( data ) {
      console.log(data.data[0]);
      if (data.data[0].id == localStorage.getItem("closedNews")) return;
      $("#news").html(
        '<a href="#" class="close" data-dismiss="alert" aria-label="close" id="newsDismiss">×</a>' + 
        "<h3>" + data.data[0].title + "</h3>" + 
        "<span>" + data.data[0].details + "</span>"
      );
      $("#newsDismiss").click(function () {
        localStorage.setItem("closedNews", data.data[0].id)
      })
      $("#news").show();
    });
  }
}
