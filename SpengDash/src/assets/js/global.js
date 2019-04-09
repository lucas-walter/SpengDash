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