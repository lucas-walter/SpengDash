import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-raumplaner',
  templateUrl: './raumplaner.component.html',
  styleUrls: ['./raumplaner.component.css']
})
export class RaumplanerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem("user_name")) {
      this.router.navigate(['/login']);
      return;
    }
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
          document.getElementsByClassName("headerstd")[0].innerHTML = res.lessonNumber   + ". Stunde am " + date.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); 
          document.getElementsByClassName("headerstd")[1].innerHTML = res.lessonNumber+1 + ". Stunde am " + date.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
          document.getElementById("l1-a").innerHTML = RaumplanerComponent.arrayToList(res.current.a);
          document.getElementById("l1-b").innerHTML = RaumplanerComponent.arrayToList(res.current.b);
          document.getElementById("l1-c").innerHTML = RaumplanerComponent.arrayToList(res.current.c);
          document.getElementById("l2-a").innerHTML = RaumplanerComponent.arrayToList(res.next.a);
          document.getElementById("l2-b").innerHTML = RaumplanerComponent.arrayToList(res.next.b);
          document.getElementById("l2-c").innerHTML = RaumplanerComponent.arrayToList(res.next.c);
        }
      }
    };
    xmlhttp.open("GET", req, true);
    xmlhttp.send();
  }

  static arrayToList(arr) {
    var html = "";
    for (var i in arr) {
      console.log(arr[i])
      html += "\n<li><b>" + arr[i].name + "</b>, noch " + arr[i].additionalHours + " Stunden</li>"
    }
    if (arr.length < 1) {
      html = "Keine freien Räume"
    }
    return html;
  }
}
