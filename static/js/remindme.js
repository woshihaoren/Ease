var mouse_is_inside = false;

$(document).ready(function() {
    $(".remindme_btn").click(function() {
        var loginBox = $("#remindmebox");
        if (loginBox.is(":visible"))
            loginBox.fadeOut("fast");
        else
            loginBox.fadeIn("fast");
        return false;
    });
    
    $("#remindmebox").hover(function(){ 
        mouse_is_inside=true; 
    }, function(){ 
        mouse_is_inside=false; 
    });

    $("body").click(function(){
        if(! mouse_is_inside) $("#remindmebox").fadeOut("fast");
    });
});