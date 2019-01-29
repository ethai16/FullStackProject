$(function () {
    console.log('WE OUT HERE')
    $('#submitPost').submit((e) => {
        // e.preventDefault();
        if($("#postfield").val() != "" ){

        updateComments();
        console.log("Called updateFeedback");
        setTimeout(()=>{
            $('#postfield').val("")
            console.log('settime')
        },100)
        }
    })


    // $('.feedback-messages').on('click', (e) => {
    //     if (e.target.className == "glyphicon glyphicon-remove") {
    //         $.ajax({
    //             url: 'api/' + e.target.id,
    //             type: DELETE,
    //             success: updateFeedback
    //         })
    //         console.log("testing")
    //     }
    // })

    function updateComments() {
        var name = document.getElementById('nameContainer').textContent

        $body = $("#postfield").val();

        $("#post-box").prepend(
            `
            <div class = "shadow border m-1 h-25">
                <div class = "bg-maincolor font-white p-3">${name}</div>
                <div>${$body}</div>
            </div>
            `
        );
    }
});