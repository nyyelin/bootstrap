$(document).ready(() => {
    $('#btn-form').click(() => {
        event.preventDefault();

        let $usrname = $('.usrname').val();
        let $mail = $('.mail').val();
        let $pwd = $('.pwd').val();

        if ($pwd == $('.pwd-confirm').val() && !(get($usrname))) {
            console.log('inside');
            create({
                usr: $usrname,
                mail: $mail,
                pwd: $pwd,
                lvl: $('#choose_level').children("option:selected").val(),
            });

            window.location.href = 'index.html';
        } else if (get($usrname)) {
            console.log('already');
            alert('Username is already in used!');
            $('#signup').trigger('reset');
        } else {
            alert('Password do not match!');
            $('#signup').trigger('reset');
        }
    });
});