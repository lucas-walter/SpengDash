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
    if (!localStorage.getItem("user_name")) {
      this.router.navigate(['/login'])
      return;
    }
    this.fetchTermine();
    this.fetchOptions();
  }

  fetchTermine() {
    var req = "http://46.101.115.220/spengdash/api/termine/my.php?username=" + localStorage.getItem("user_username");
    console.log(req);
    var success = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var res = JSON.parse(this.responseText);
        console.log(res);
        TermineComponent.addTableRows(res.data);
        localStorage.setItem("terminCache", this.responseText);
      }
    };
    xmlhttp.open("GET", req, true);
    xmlhttp.setRequestHeader("SPD-TOKEN", localStorage.getItem("user_token"));
    xmlhttp.send();
  }

  static addOptions(jQsel, arr) {
    arr.sort();
    for (var i in arr) {
      jQsel.append("<option>" + arr[i] + "</option>")
    }
  }

  fetchOptions() {
    var req = "http://46.101.115.220/spengdash/api/static/faecher.php"
    var success = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var res = JSON.parse(this.responseText);
        TermineComponent.addOptions($("#editM-fach"), res);
        TermineComponent.addOptions($("#createM-fach"), res);
      }
    };
    xmlhttp.open("GET", req, true);
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
  static addTableRows(row) {
    $("#terminList").html(""); // Clear the table's contents
    for (var i in row) {
      var art = null;
      if (row[i].art == "A") art = "Hausübung";
      else if (row[i].art == "T") art = "Termin";
      $("#terminList").append(
        "<tr>" +
          `<th scope="row">${art ? art : row[i].art}</td>` +
          `<td>${row[i].fach}</td>` +
          `<td>${row[i].datumende}</td>` +
          `<td class="d-none d-md-table-cell">${row[i].datumstart}</td>` +
          `<td>${row[i].beschreibung}</td>` +
          `<td>
              <button type="button" class="btn btn-default" onclick="termin_prepedit(${row[i].id})" data-toggle="modal" data-target="#editModal">
                <i class="material-icons">edit</i>
              </button>
              <button type="button" class="btn btn-danger" onclick="termin_prepdelete(${row[i].id})" data-toggle="modal" data-target="#deleteModal">
                <i class="material-icons">close</i>
              </button>
            </td>` +
          "</tr>"
    );
    }
  }
}
