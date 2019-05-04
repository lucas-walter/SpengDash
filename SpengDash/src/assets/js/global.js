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

function termin_edit() {
    var req = "http://46.101.115.220/spengdash/api/termine/edit.php?username=" + localStorage.getItem("user_username") + "&id=" + currTerm.id + "&fach=" + $("#editM-fach").val() + "&beschreibung=" + encodeURIComponent($("#editM-beschreibung").val()) + "&art=" + currTerm.art;
    if ($("#editM-class").prop("checked")) req += "&klasse=" + localStorage.getItem("user_klasse")
    console.log(req);
    var success = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = JSON.parse(this.responseText);
            if (res.success) console.log("TODO Handle success")
        }
        else console.error(this.response);
    };
    xmlhttp.open("PATCH", req, true);
    xmlhttp.setRequestHeader("SPD-TOKEN", localStorage.getItem("user_token"));
    xmlhttp.send();

    
}