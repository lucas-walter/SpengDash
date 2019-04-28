import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-raumplaner',
  templateUrl: './raumplaner.component.html',
  styleUrls: ['./raumplaner.component.css']
})
export class RaumplanerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.updateRooms();
  }

  updateRooms() {
    var req = "http://46.101.115.220/spengdash/api/raumplaner.php";
    var success = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var res = JSON.parse(this.responseText);
        if (!res.lessonNumber) {
          console.error(res);
        }
        else {
          var date = new Date(res.date);
          console.log(date);
          document.getElementsByClassName("headerstd")[0].innerHTML = res.lessonNumber   + ". Stunde am " + date.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); 
          document.getElementsByClassName("headerstd")[1].innerHTML = res.lessonNumber+1 + ". Stunde am " + new Date(date.setDate(date.getDate()+1)).toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
          console.log(res);
        }
      }
    };
    xmlhttp.open("GET", req, true);
    xmlhttp.send();
  }

}
