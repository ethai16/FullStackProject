$(function(){

    // retrieve role from url path
    let role = parseInt($('#role_id').val());
    $('.student, .teacher, .mentor').hide();
    console.log(role)
    // set req.params.role_id
    if (role === 1) {
        $('.teacher').show()
    }else if (role === 2){
        $('.student').show()
    }else {
        $('.mentor').show()
    }

    const deleted = ()=>{
        $('#wantDlt').modal('toggle');
        $('#dltComp').modal('toggle');
    };

    
    // let gradeval = $('#grade').val()
    // console.log(gradeval)
    // $('.grade').find(`option:contains(${gradeval})`).attr("selected",true);

    // $.getJSON('api')
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
        // $.post('api/',{
        //     data});
    }

    // delete
    $("#delete").on("click", e => {
        let id = $('#username').val();    
        $.ajax({
            url: '/api/delete/'+id,
            type: 'DELETE',
            success: deleted()
        });
            
        e.stopPropagation();
    }); // end of delete
});
$(window).on("popstate", function() {
    var anchor = location.hash || $("a[data-toggle='tab']").first().attr("href");
    $("a[href='" + anchor + "']").tab("show");
});
