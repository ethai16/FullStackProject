$(function () {
    var role = "." + document.getElementById('roleReference').textContent.toLowerCase()
    
    console.log(role)

    $('.student, .teacher, .mentor').hide();
    $(role).show();
})

