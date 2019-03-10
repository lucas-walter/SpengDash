$('.navbar-nav li a').on('click', function(){
    if(!$( this ).hasClass('dropdown-toggle')){
        $('.navbar-collapse').collapse('hide');
    }
});

$(function () {
    if (localStorage.getItem("user_id")) {
        $("#notLoggedIn").hide();
        $("#loggedIn").show();
        $('#loggedInUsername').text(localStorage.getItem("user_name"));
    }
});

function logOut() {
    localStorage.clear();
    location.reload();
}