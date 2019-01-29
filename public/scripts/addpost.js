$(function () {
    $('#submitPost').submit((e) => {
        // e.preventDefault();
        if($("#postfield").val() != "" ){

        updateComments();
        setTimeout(()=>{
            $('#postfield').val("")
        },100)
        }
    })


    $('.postmessages').on('click', (e) => {
        if (e.target.className.baseVal === "svg-inline--fa fa-times-circle fa-w-16") {
            var target = e.target
            let id = target.parentNode.parentNode.parentNode;
            let commentid = id.lastChild.previousSibling.textContent
            $.ajax({
                url: '/api/delete/comment/' + commentid,
                type: 'DELETE',
                success: $(e.target).closest('.forDelete').remove()
            })
        }

    })

    $('.postmessagesPublic').on('click', (e) => {
        if (e.target.className.baseVal === "svg-inline--fa fa-times-circle fa-w-16") {
            var target = e.target
            let commentprofileid = target.parentNode.parentNode.lastChild.previousSibling.textContent
            $.ajax({
                url: '/api/delete/comment/' + commentprofileid,
                type: 'DELETE',
                success: $(e.target).closest('.forDelete').remove()
            })
        }

    })
    function updateComments() {
        var name = document.getElementById('nameContainer').textContent

        $body = $("#postfield").val();


        if (!location.pathname.includes('dashboard')){
            console.log('hello!')
        $("#post-box").prepend(
            `
            <div class = "forDelete">
            <div class = "border m-1 h-25 postmessagesPublic">
                <div class = "p-3 font-weight-bold d-flex justify-content-between">
                    <div>${name}</div>
                    <div class = "x-button"><i class="fas fa-times-circle"></i></div>
                </div>
                <div class = "container-fluid">${$body}</div>
            </div>
            </div>
            `
        );
        }else{
            var rolename = document.getElementById('roleReference').textContent.toLowerCase()
            var username = document.getElementById('usernameReference').textContent
            console.log('in dashboard')
            $("#post-box").prepend(
                `
                <div class = "forDelete">
                <div class = "border m-1 h-25 postmessages">
                    <div class = "p-3 font-weight-bold d-flex justify-content-between">
                        <a href = "/${rolename}/${username}">${name}</a>
                        <div class = "x-button"><i class="fas fa-times-circle"></i></div>
                    </div>
                    <div class = "container-fluid">${$body}</div>
                </div>
                </div>
                `
            )}
    }
});