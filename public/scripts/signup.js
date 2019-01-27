$(document).ready(function () {

    

    // retrieve role from url path
    const role = "."+location.pathname.slice(8).toLowerCase();
    console.log(role)
    $('.student, .teacher, .mentor').hide();
    $(role).show();
    
    // set req.params.role_id
    if (role === '.teacher') {
        $('#role_id').val(1)
    }else if (role === '.student'){
        $('#role_id').val(2)}
    else {
        $('#role_id').val(3)
    }
    
    // avator setup
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

    
   // submit
    $('#submit').on('click'), e=>{
        e.preventDefault();

        // if user name is null flash

        // if password is not equal to verify password flash
        // const username 
        
        // $.post('api/',{
        //     data},
    
        //         console.log(data)
        // );
    }
});
$(window).on("popstate", function() {
    var anchor = location.hash || $("a[data-toggle='tab']").first().attr("href");
    $("a[href='" + anchor + "']").tab("show");
});
