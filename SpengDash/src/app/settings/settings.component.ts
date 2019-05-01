import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

  getUsername() {
    if (localStorage.getItem("using_ldap") == "true") {
      $('#changePasswordButton').attr("disabled","true");
      $('#changePasswordButton').attr("style", "pointer-events: none;")
      $('#changePasswordTooltip').attr('data-toggle', 'tooltip');
      $('#changePasswordTooltip').attr('data-placement', 'right');
      $('#changePasswordTooltip').attr('data-html', 'true');
      $('#changePasswordTooltip').attr('title', 'Sie verwenden zur Anmeldung AD.<br>Ändern Sie Ihr Passwort über Webmail oder auf Schul-PCs.');
      (<any>$('#changePasswordTooltip')).tooltip();
      $('#changePasswordTooltip').attr('title', ''); // Very russian method to get rid of the annoying default tooltip
    }
    return localStorage.getItem('user_name');
  }

  editPass(event) {
    event.preventDefault();
    event.target.querySelector("#editPwErrMsg").hidden = true;
    if (event.target.querySelector("#newPassword1").value != event.target.querySelector("#newPassword2").value) {
      event.target.querySelector("#editPwErrMsg").hidden = false;
      event.target.querySelector("#editPwErrOut").innerHTML = "Passwörter sind nicht gleich!";
      return;
    }
    var req = "http://46.101.115.220/spengdash/api/users/change_pass.php?username=" + localStorage.getItem('user_username') + "&oldpassword=" + event.target.querySelector("#oldPassword").value +
              "&newpassword=" + event.target.querySelector("#newPassword1").value + "&token=" + localStorage.getItem("user_token");
    var success = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var res = JSON.parse(this.responseText);
        if (res.error) {
          event.target.querySelector("#editPwErrMsg").hidden = false;
          event.target.querySelector("#editPwErrOut").innerHTML = res.error;
        }
        else {
          localStorage.setItem('user_token', res.token);
          event.target.querySelector("#editPwSuccMsg").hidden = false;
          event.target.querySelector("#editPwSuccOut").innerHTML = 'Ihr Passwort wurde erfolgreich geändert.';
        }
      }
    };
    xmlhttp.open("POST", req, true);
    xmlhttp.send();
  }

  editName(event) {
    event.preventDefault();
    event.target.querySelector("#nameInput").disabled = true;
    event.target.querySelector("#editNameErrMsg").hidden = true;
    var req = "http://46.101.115.220/spengdash/api/users/edit.php?username=" + localStorage.getItem('user_username') + "&name=" + encodeURIComponent(event.target.querySelector("#nameInput").value);
    var success = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var res = JSON.parse(this.responseText);
        if (res.error) {
          event.target.querySelector("#editNameErrMsg").hidden = false;
          event.target.querySelector("#editNameErrOut").innerHTML = res.error;
          event.target.querySelector("#nameInput").disabled = false;          
        }
        else {
          event.target.querySelector("#editNameSuccMsg").hidden = false;
          event.target.querySelector("#editNameSuccOut").innerHTML = 'Ihr Name wurde erfolgreich geändert.';
          localStorage.setItem("user_name", event.target.querySelector("#nameInput").value);
          event.target.querySelector("#loggedInUsername").innerHTML = localStorage.getItem("user_name");
          event.target.querySelector("#nameInput").disabled = false;
        }
      }
      event.target.querySelector("#nameInput").disabled = false;
    };
    xmlhttp.open("POST", req, true);
    xmlhttp.setRequestHeader("SPD-TOKEN", localStorage.getItem("user_token"));
    xmlhttp.send();
  }

}
