$('.navbar-nav li a').on('click', function(){
    if(!$( this ).hasClass('dropdown-toggle')){
        $('.navbar-collapse').collapse('hide');
    }
});

$(initFields);

function initFields() {
    if (localStorage.getItem("user_id")) {
        $("#notLoggedIn").hide();
        $("#loggedIn").show();
        $('#loggedInUsername').text(localStorage.getItem("user_name"));
        $("#nameInput").text(localStorage.getItem("user_name"));
    }
    
}

function logOut() {
    localStorage.clear();
    location.reload();
}

var currId = null;
var currTerm = null;

function termin_prepcreate(art) {
    $("#createM-bis").val(Date.now());
    if (art == "A") {
        $("#createModalTitle").text("Hausübung erstellen");
        $("#createM-class").prop("checked", true);
        $("#createM-addBtn").click(function() {termin_create("A")});
    }
    else if (art == "T") {
        $("#createModalTitle").text("Termin erstellen");
        $("#createM-class").prop("checked", false);
        $("#createM-addBtn").click(function() {termin_create("T")});
    }
    else {
        art = "T";
        $("#createModalTitle").text("Termin erstellen");
        $("#createM-class").prop("checked", false);
        $("#createM-addBtn").click(function() {termin_create("T")});
    }
    $("#createM-beschreibung").val("");
}

function termin_prepedit(id) {
    currId = id;
    $("#editM-id").val(id);
    termine = JSON.parse(localStorage.getItem("terminCache")).data;
    for (var t in termine) {
        if (termine[t].id == currId) {
            currTerm = termine[t];
            break;
        }
    }
    if (currTerm) {
        $("#editM-fach").val(currTerm.fach);
        $("#editM-beschreibung").text(currTerm.beschreibung);
        if (currTerm.klasse) $("#editM-class").prop("checked", true);
        else $("#editM-class").prop("checked", false);
    }
    else console.error("Kann den Termin nicht finden");
}


function termin_prepdelete(id) {
    currId = id;
    $("#deleteM-id").val(id);
    termine = JSON.parse(localStorage.getItem("terminCache")).data;
    for (var t in termine) {
        if (termine[t].id == currId) {
            currTerm = termine[t];
            break;
        }
    }
    if (currTerm) {
        $('#deleteM-name').text(currTerm.beschreibung);
    }
    else console.error("Kann den Termin nicht finden");
}

function termin_delete() {
    var req = "http://46.101.115.220/spengdash/api/termine/delete.php?username=" + localStorage.getItem("user_username") + "&id=" + currTerm.id;
    console.log(req);
    var success = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = JSON.parse(this.responseText);
            if (res.success) location.reload()
        }
        else console.error(this.response);
    };
    xmlhttp.open("DELETE", req, true);
    xmlhttp.setRequestHeader("SPD-TOKEN", localStorage.getItem("user_token"));
    xmlhttp.send();
}

function termin_edit() {
    var req = "http://46.101.115.220/spengdash/api/termine/edit.php?username=" + localStorage.getItem("user_username") + "&id=" + currTerm.id + "&fach=" + $("#editM-fach").val() + "&beschreibung=" + encodeURIComponent($("#editM-beschreibung").val()) + "&art=" + currTerm.art;
    if ($("#editM-class").prop("checked")) req += "&klasse=" + localStorage.getItem("user_klasse")
    console.log(req);
    var success = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = JSON.parse(this.responseText);
            if (res.success) location.reload()
        }
        else console.error(this.response);
    };
    xmlhttp.open("PATCH", req, true);
    xmlhttp.setRequestHeader("SPD-TOKEN", localStorage.getItem("user_token"));
    xmlhttp.send();
}

function termin_create(art) {
    var termin = {
        "fach": $("#createM-fach").val(),
        "datumBis": $("#createM-bis").val(),
        "beschreibung": encodeURIComponent($("#createM-beschreibung").val()),
        "art": art
    };
    if ($("createM-class").val()) termin.klasse = localStorage.getItem("user_klasse");
    console.log(termin);
    
    var req = "http://46.101.115.220/spengdash/api/termine/create.php?username=" + localStorage.getItem("user_username") + "&fach=" + termin.fach + "&beschreibung=" + encodeURIComponent(termin.beschreibung) + "&art=" + termin.art + "&bis=" + termin.datumBis;
    if ($("#editM-class").prop("checked")) req += "&klasse=" + localStorage.getItem("user_klasse")
    console.log(req);
    var success = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
            var res = JSON.parse(this.responseText);
            if (res.success) location.reload()  
        }
        else console.error(this.response);
    };
    xmlhttp.open("POST", req, true);
    xmlhttp.setRequestHeader("SPD-TOKEN", localStorage.getItem("user_token"));
    xmlhttp.send();    
}