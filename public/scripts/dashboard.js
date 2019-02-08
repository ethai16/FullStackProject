$(function () {
    var role = "." + document.getElementById('roleReference').textContent.toLowerCase()


    $('.student, .teacher, .mentor').hide();
    $(role).show();

})