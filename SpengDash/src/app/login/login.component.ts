import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('user_id')) {
      this.loginSuccess();
    }
  }

  loginAD(event) {
    event.target.ownerDocument.querySelector("#errMsg").hidden = true;
    var req = "http://46.101.115.220/spengdash/api/users/adLogin.php?username=" + event.target.ownerDocument.querySelector("#username").value + "&password=" + event.target.ownerDocument.querySelector("#password").value;
    var success = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var res = JSON.parse(this.responseText);
        if (!res.username) {
          event.target.ownerDocument.querySelector("#errMsg").hidden = false;
          document.querySelector("#errOut").innerHTML = res.error;
        }
        else {
          localStorage.setItem('user_id', res.id);
          localStorage.setItem('user_username', res.username);
          localStorage.setItem('user_name', res.name);
          localStorage.setItem('user_klasse', res.klasse);
          localStorage.setItem('user_token', res.token);
          localStorage.setItem('using_ldap', "true");
          location.reload();
        }
        console.log(res);
      }
    };
    xmlhttp.open("POST", req, true);
    xmlhttp.send();
  }

  loginUser(event) {
    event.target.querySelector("#errMsg").hidden = true;
    event.preventDefault();
    var req = "http://46.101.115.220/spengdash/api/users/authenticate.php?username=" + event.target.querySelector("#username").value + "&password=" + event.target.querySelector("#password").value;
    var success = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var res = JSON.parse(this.responseText);
        if (res.error) {
          event.target.querySelector("#errMsg").hidden = false;
          event.target.querySelector("#errOut").innerHTML = res.error;
        }
        else {
          localStorage.setItem('user_id', res.id);
          localStorage.setItem('user_username', res.username);
          localStorage.setItem('user_name', res.name);
          localStorage.setItem('user_klasse', res.klasse);
          localStorage.setItem('user_token', res.token);
          location.reload();
        }
        console.log(res);
      }
    };
    xmlhttp.open("POST", req, true);
    xmlhttp.send();
  }

  loginSuccess() {
    this.router.navigate(['/'])
  }

}