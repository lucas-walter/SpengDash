import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
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
          const date = new Date();
        
          // Set it expire in 7 days
          date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
        
          // Set it
          document.cookie = "token"+"="+ res.token +"; expires="+date.toUTCString()+"; path=/";
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