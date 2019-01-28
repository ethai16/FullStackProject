$(function(){

    // retrieve role from url path
    let role = $('#role_id').val();
    $('.student, .teacher, .mentor').hide();
    $(role).show();
    console.log(role)
    // set req.params.role_id
    if (role === "1") {
        $('.teacher').show()
    }else if (role === "2"){
        $('.student').show()
    }else {
        $('.mentor').show()
    }
    
    let gradeval = $('#grade').val()
    console.log(gradeval)
    $('.grade').find(`option:contains(${gradeval})`).attr("selected",true);


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

    // delete
    $("#delete").on("click", e => {
        let doit = false;
        $( "#dialog-confirm" ).dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
              "Yes, please delete.": function() {
                $( this ).dialog( "close" );
                doit = true;
              },
              Cancel: function() {
                $( this ).dialog( "close" );
              }
            }
          });

            if (doit) {
            $.ajax({
                url: '/api/delete/'+id,
                type: 'DELETE',
                success: ''
            });
        }
        e.stopPropagation();
    }); // end of feedback


});
$(window).on("popstate", function() {
    var anchor = location.hash || $("a[data-toggle='tab']").first().attr("href");
    $("a[href='" + anchor + "']").tab("show");
});
