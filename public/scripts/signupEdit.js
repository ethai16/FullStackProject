$(function(){

    // === initial set up. Option selections, show area
    // retrieve role from url path
    let role = parseInt($('#role_id').val());
    let teaArr = ['state_code', 'teacher_school', 'teacher_industry'];
    let stuArr = ['state_code', 'grade','student_school', 'student_industries1','student_industries2','student_industries3'];
    let menArr = ['state_code', 'company_state_code', 'company_industries1','company_industries2'];

    $('.student, .teacher, .mentor').hide();
    if (role === 1) {
        $('.teacher').show()
        teaArr.forEach(ele=>{     // dropdown selection
            let valtea = $(`#${ele}_div`).attr('name');
            $(`select[name^="${ele}"] option[value="${valtea}"]`).attr("selected","selected");
        })
    }else if (role === 2){
        $('.student').show()
        stuArr.forEach(ele=>{
            let valstu = $(`#${ele}_div`).attr('name');
            $(`select[name^="${ele}"] option[value="${valstu}"]`).attr("selected","selected");
        })
    }else {
        $('.mentor').show();
        menArr.forEach(ele=>{
            let valmen = $(`#${ele}_div`).attr('name');
            $(`select[name^="${ele}"] option[value="${valmen}"]`).attr("selected","selected");
        })
    }

    // === file upload
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

// check data before update 
    let inpArr =[];
    $("input").each(function(){
        let obj={};
        let name = $(this).attr('name');
        let val = $(this).val();
        obj[name] =val;
        inpArr.push(obj);
    })
    $("select").each(function(){
        let obj={};
        let name = $(this).attr('name');
        let val = $(this).val();
        obj[name] =val;
        inpArr.push(obj);
    })
    console.log(inpArr)

   // edit
    $('#update').on('click'), e=>{
        let id = $('#username').val();

        let inpArr2 =[];
        $("input").each(function(){
            let obj={};
            let name = $(this).attr('name');
            let val = $(this).val();
            obj[name] =val;
            inpArr2.push(obj);
        })
        console.log(inpArr)
        $("select").each(function(){
            let obj={};
            let name = $(this).attr('name');
            let val = $(this).val();
            obj[name] =val;
            inpArr2.push(obj);
        })
        // compare 2 arrays and if value is different, get key value pair
            // I should be able to send like {name:value, }
            // name,
            // feeling: $("input[type='radio']:checked").val(),
        $.ajax({
            url: '/api/edit/'+editID,
            data:{"feedback":textContent},
            type: 'PUT',
            success(){
                $('#updComp').modal('toggle');
            }        
        });  

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
            success(){
                $('#wantDlt').modal('toggle');
                $('#dltComp').modal('toggle');
            }
        });
            
        e.stopPropagation();
    }); // end of delete
});
$(window).on("popstate", function() {
    var anchor = location.hash || $("a[data-toggle='tab']").first().attr("href");
    $("a[href='" + anchor + "']").tab("show");
});
