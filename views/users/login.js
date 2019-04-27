$(document).ready(function(){
    /*Form Validation using Ajax */
    $("#loginForm").validate({
        rules: {
            password: {
                required: true,
            },
            email: {
                required: true,
                email: true
            },
        },
        messages: {
            password:{
                required: "Please enter your password"
             },
            email: {
                required: "Please enter your email address"
            },
        },
        submitHandler: submitForm	
    })	
        
    function submitForm() {	
        //serialize user's input
        var data = $("#loginForm").serialize();
        
        //jQuery ajax() Method more info on https://www.w3schools.com/jquery/ajax_ajax.asp
        $.ajax({				
                type : 'POST',
                url  : '../../controllers/user_controller.php',
                data : data,
                
                //before sending clear our the error message
                beforeSend: function(){	
                        $("#error").fadeOut();
                },
                
                success : function(response){	
                        // if post is sucessful, change the button's message and redirect to welcome page after 2seconds 
                        if($.trim(response) === "1"){
                                $("#loginSubmit").html('Signing In ...');
                                setTimeout(' window.location.href = "index.php?controller=user&action=login"; ',2000);
                        // if not, fade in the responce in error section after 1 second
                        } else {									
                                $("#error").fadeIn(1000, function(){						
                                        $("#error").html(response).show();
                                });
                        }
                }
        });
        return false;
    }
});

