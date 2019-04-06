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
    if (localStorage.getItem("using_ldap") == "true") {
        $('#changePasswordButton').attr("disabled","true");
        $('#changePasswordButton').attr("style", "pointer-events: none;")
        $('#changePasswordTooltip').attr('data-toggle', 'tooltip');
        $('#changePasswordTooltip').attr('data-placement', 'right');
        $('#changePasswordTooltip').attr('data-html', 'true');
        $('#changePasswordTooltip').attr('title', 'Sie verwenden zur Anmeldung AD.<br>Ändern Sie Ihr Passwort über Webmail oder auf Schul-PCs.');
        $('#changePasswordTooltip').tooltip();
    }
}

function logOut() {
    localStorage.clear();
    location.reload();
}