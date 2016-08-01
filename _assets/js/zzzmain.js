//WOW Scroll Spy
var wow = new WOW({
    //disabled for mobile
    mobile: false,
    offset:       100
});
wow.init();

//Contact Form

$('#submit').click(function(){

$.post("assets/php/send.php", $(".contact-form").serialize(),  function(response) {   
 $('#success').html(response);
});
return false;

});
