import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RaumplanerComponent } from '../raumplaner/raumplaner.component';

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
    this.fetchRooms(0);
  }

  refreshHolidays() {
    localStorage.removeItem("holidayCache");
    this.fetchHolidays();
  }

  /**
   * Zeigt freie Räume im Dashboard an
   * @param currOrNext 0 wenn es diese Stunde ist, 1 wenn es die nächste ist
   */
  fetchRooms(currOrNext) {
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
          if (currOrNext == 0) {
            document.getElementById("rlheader").innerHTML = res.lessonNumber   + ". Stunde am " + date.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); 
            document.getElementById("rl").innerHTML = RaumplanerComponent.arrayToList(res.current.a);
            document.getElementById("rl").innerHTML += RaumplanerComponent.arrayToList(res.current.b);
            document.getElementById("rl").innerHTML += RaumplanerComponent.arrayToList(res.current.c);
            $("#rl-currBtn").hide();
            $("#rl-nextBtn").show();
          }
          else {
            document.getElementById("rlheader").innerHTML = res.lessonNumber+1 + ". Stunde am " + date.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); 
            document.getElementById("rl").innerHTML = RaumplanerComponent.arrayToList(res.next.a);
            document.getElementById("rl").innerHTML += RaumplanerComponent.arrayToList(res.next.b);
            document.getElementById("rl").innerHTML += RaumplanerComponent.arrayToList(res.next.c);
            $("#rl-currBtn").show();
            $("#rl-nextBtn").hide();
          }
        }
      }
    };
    xmlhttp.open("GET", req, true);
    xmlhttp.send();
  }

  fetchHolidays() {
    if (localStorage.getItem("holidayCache")) {
      // Use cached holiday values
      $("#freiList").html(""); // Clear the table's contents
      var res = JSON.parse(localStorage.getItem("holidayCache"));
      for (var i in res) {
        if (DashboardComponent.parseUntisDate(res[i].startDate)) {
          $("#freiList").append(
            "<tr>" +
            `<td scope="row">${res[i].longName}</td>` +
            `<td>${DashboardComponent.parseUntisDate(res[i].startDate)}</td>` +
            `<td>${DashboardComponent.parseUntisDate(res[i].endDate)}</td>` +
            "</tr>"
          );
        }
      }
    }
    var req = "http://46.101.115.220/spengdash/api/freieTage.php";
    var success = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var res = JSON.parse(this.responseText);
        console.log(res);
        res.sort((a, b) => (a.startDate > b.startDate) ? 1 : ((b.startDate > a.startDate) ? -1 : 0));
        console.log(res);
        // Add rows
        $("#freiList").html(""); // Clear the table's contents
        for (var i in res) {
          if (DashboardComponent.parseUntisDate(res[i].startDate)) {
            $("#freiList").append(
              "<tr>" +
              `<td scope="row">${res[i].longName}</td>` +
              `<td>${DashboardComponent.parseUntisDate(res[i].startDate)}</td>` +
              `<td>${DashboardComponent.parseUntisDate(res[i].endDate)}</td>` +
              "</tr>"
            );
          }
        }

        localStorage.setItem("holidayCache", this.responseText);
        console.log(res);
      }
    };
    xmlhttp.open("GET", req, true);
    xmlhttp.setRequestHeader("SPD-TOKEN", localStorage.getItem("user_token"));
    xmlhttp.send();
  }

  static parseUntisDate(date) {
    var m = /\d{2}(\d{2})(\d{2})(\d{2})/gi.exec(date);
    if (Number(m[2]) >= new Date().getMonth() + 1 && Number(m[1]) >= Number(String(new Date().getFullYear()).substr(2)))
      return m[3] + "." + m[2] + "." + m[1];
    else return null;
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
        `<td scope="row" class="table-fit">${row[i].fach}</td>` +
        `<td class="table-fit">${row[i].datumende}</td>` +
        `<td class="d-none d-md-table-cell table-fit">${row[i].datumstart}</td>` +
        `<td class="td-beschreibung">${row[i].beschreibung}</td>` +
        "</tr>"
      );
    }
  }
}
