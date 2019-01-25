$(document).ready(function () {
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

    $('#login_submit').on('click'), e=>{
        e.preventDefault();
        
        
    }
    $('#private_submit').on('click'), e=>{
        e.preventDefault();

        const username = (!$('#username').val()? null:$('#username').val());
        
        $.post('api/',{
            type: "POST",
            data: "data",
            success: function (response) {
                console.log(data)
            }
        });
    }
});
$(window).on("popstate", function() {
    var anchor = location.hash || $("a[data-toggle='tab']").first().attr("href");
    $("a[href='" + anchor + "']").tab("show");
});
