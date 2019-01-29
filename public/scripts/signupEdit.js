$(function(){
    const role = parseInt($('#role_id').val());
    let role_name ='';
    if (role === 1) {
        role_name = 'teacher'
    }else if (role === 2){
        role_name ='student'
    }else {
        role_name = 'mentor'
    }
    const userId = $('#username').val();    

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

    // === initial set up. Option selections, show area    
    let teaArr = ['grade','school_id', 'industry_id1', 'industry_id2', 'industry_id3'];
    teaArr.forEach(ele=>{     // dropdown selection
        let valtea = $(`#${ele}-${role}_div`).attr('name');
        $(`select[name^="${ele}-${role}"] option[value="${valtea}"]`).attr("selected","selected");                
    })

    let stateCode = ['state_code', 'company_state_code']
    stateCode.forEach(ele =>{
        let valState = $(`#${ele}_div`).attr('name');
        $(`select[name^="${ele}"] option[value="${valState}"]`).attr("selected","selected");
    })

    $('.student, .teacher, .mentor').hide();
    $(`.${role_name}`).show();

// === check data before update 
    let oldData ={};
    let atr = ['input', 'textarea', 'select'];

    // create obj that holds current data
    atr.forEach(item =>{
        $(`.generic ${item}`).each(function(){
            let name = $(this).attr('name');
            let val = $(this).val();
            oldData[name] =val;
        });
        $(`.private ${item}`).each(function(){
            let name = $(this).attr('name');
            let val = $(this).val();
            oldData[name] =val;
        });
        $(`.${role_name} ${item}`).each(function(){
            let name = $(this).attr('name');
            name= name.includes("-") ? name.split("-")[0] : name;
            let val = $(this).val();
            oldData[name] =val;
        });
    });    
    
   // edit
    $('#update').on('click', e=>{
        let updatedData ={};
        // crete obj that holds updated data
        atr.forEach(item =>{
            $(`.generic ${item}`).each(function(){
                let name = $(this).attr('name');
                let val = $(this).val();
                updatedData[name] =val;
            });
            $(`.private ${item}`).each(function(){
                let name = $(this).attr('name');
                let val = $(this).val();
                updatedData[name] =val;
            });
            $(`.${role_name} ${item}`).each(function(){
                let name = $(this).attr('name');
                name= name.includes("-") ? name.split("-")[0] : name;
                let val = $(this).val();
                updatedData[name] =val;
            });
        })
        console.log(updatedData)
        // compare old data() and new data
        let hasObj = false;
        let newObj ={};
        $.each(updatedData, function(key2, val2){
            hasObj = false;
            if (key2 in oldData){
                if (val2 !== oldData[key2]){
                    newObj[key2]= val2
                }
            } else{
                alert("error! Please double check on the page")
            }
        })
        
        $.ajax({
            url: '/api/edit/'+ userId,
            data:newObj,
            type: 'PUT',
            success(){
                $('#updComp').modal('toggle');
            }        
        });  
        e.preventDefault();
    })

    // delete
    $("#delete").on("click", e => {
        $.ajax({
            url: '/api/delete/'+userId,
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
