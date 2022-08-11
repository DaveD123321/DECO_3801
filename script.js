
$(document).ready(function(c) {
    $('.without_login').on('click', function(c){
        $('.message').fadeOut('slow', function(c){
            $('.message').remove();
        });
    });	  
});