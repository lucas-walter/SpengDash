import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem("user_name")) {
      this.router.navigate(['/login'])
      return;
    }
    this.fetchTerm();
    this.fetchHW();
    this.fetchHolidays();
  }

  fetchHolidays() {
    if (localStorage.getItem("holidayCache")) {
      DashboardComponent.addTableRows(localStorage.getItem("holidayCache"), $("#freiList")); // Use cached holiday values
    }
    var req = "http://46.101.115.220/spengdash/api/freieTage.php";
    var success = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var res = JSON.parse(this.responseText);
        console.log(res);
        DashboardComponent.addTableRows(res, $("#freiList"));
        localStorage.setItem("holidayCache", this.responseText);
        console.log(res);
      }
    };
    xmlhttp.open("GET", req, true);
    xmlhttp.setRequestHeader("SPD-TOKEN", localStorage.getItem("user_token"));
    xmlhttp.send();
  }

  fetchTerm() {
    var req = "http://46.101.115.220/spengdash/api/termine/my.php?username=" + localStorage.getItem("user_username") + "&limit=5&type=T";
    console.log(req);
    var success = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var res = JSON.parse(this.responseText);
        console.log(res);
        DashboardComponent.addTableRows(res.data, $("#terminList"));
        localStorage.setItem("terminCache", this.responseText);
      }
    };
    xmlhttp.open("GET", req, true);
    xmlhttp.setRequestHeader("SPD-TOKEN", localStorage.getItem("user_token"));
    xmlhttp.send();
  }

  fetchHW() {
    var req = "http://46.101.115.220/spengdash/api/termine/my.php?username=" + localStorage.getItem("user_username") + "&limit=5&type=A";
    console.log(req);
    var success = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var res = JSON.parse(this.responseText);
        console.log(res);
        DashboardComponent.addTableRows(res.data, $("#hwList"));
      }
    };
    xmlhttp.open("GET", req, true);
    xmlhttp.setRequestHeader("SPD-TOKEN", localStorage.getItem("user_token"));
    xmlhttp.send();
  }

  /**
   * Adds rows to the HTML Table, will look like:
   * ```
   * <tr>
      <th scope="row">Hausübung</th>
      <td>Englisch</td>
      <td>13.05.2019/14:25</td>
      <td class="d-none d-md-table-cell">30.04.2019</td>
      <td>das ist Beispiel 9999</td>
      <td>
        <button type="button" class="btn btn-default">
          <i class="material-icons">edit</i>
        </button>
        <button type="button" class="btn btn-danger">
          <i class="material-icons">close</i>
        </button>
      </td>
    </tr>
    ```
  * @param row The array of objects to add to the table
  */
  static addTableRows(row, jQuery) {
    jQuery.html(""); // Clear the table's contents
    for (var i in row) {
      var art = null;
      if (row[i].art == "A") art = "Hausübung";
      else if (row[i].art == "T") art = "Termin";
      jQuery.append(
        "<tr>" +
        `<td scope="row">${row[i].fach}</td>` +
        `<td>${row[i].datumende}</td>` +
        `<td class="d-none d-md-table-cell">${row[i].datumstart}</td>` +
        `<td>${row[i].beschreibung}</td>` +
        "</tr>"
      );
    }
  }
}
