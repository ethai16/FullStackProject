$(document).ready(function () {

    //==== temp role id .
    //==== receiv temp info from local storage
    // const role = $('#role').val();
    role = 1;
    //--- 
    $('.student').hide();
    $('.teacher').hide();
    $('.mentor').hide();

    if (role===1){
        $('.teacher').show();
    }else if (role===2){
        $('.student').show();
    }else{
        $('.mentor').show();
    }

    var readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.avatar').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $(".file-upload").on('change', function () {
        readURL(this);
    });


    // to show tabs correctly
    if (location.hash) {
        $("a[href='" + location.hash + "']").tab("show");
    }
    $(document.body).on("click", "a[data-toggle]", function(event) {
        location.hash = this.getAttribute("href");
    });

    
   
    $('#submit').on('click'), e=>{
        e.preventDefault();

        // if user name is null flash

        // if password is not equal to verify password flash
        const username = (!$('#username').val()? null:$('#username').val());
        
        $.post('api/',{
            data},
    
                console.log(data)
        );
    }
});
$(window).on("popstate", function() {
    var anchor = location.hash || $("a[data-toggle='tab']").first().attr("href");
    $("a[href='" + anchor + "']").tab("show");
});
