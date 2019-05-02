import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-termine',
  templateUrl: './termine.component.html',
  styleUrls: ['./termine.component.css']
})
export class TermineComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
    if (!localStorage.getItem("user_name")) this.router.navigate(['/login'])
  }

  fetchTermine(event) {
    event.preventDefault();
    var req = "http://46.101.115.220/spengdash/api/termine/my.php?username=" + localStorage.getItem("user_username");
    console.log(req);
    var success = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var res = JSON.parse(this.responseText);
        console.log(res.data);
      }
    };
    xmlhttp.open("GET", req, true);
    xmlhttp.setRequestHeader("SPD-TOKEN", localStorage.getItem("user_token"));
    xmlhttp.send();
  }

}
