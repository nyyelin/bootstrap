$(document).ready(() => {
    $('.login-btn').click(() => {
        event.preventDefault();
        if (isStorageEmpty()) {
            usrNotFound();
        } else {
            let $usrname = $('.usrname').val();
            let eUsr = '';

            if (include($usrname)) {
                checkPassword($usrname);
            } else if (eUsr = includeEmail($usrname)) {
                checkPassword(eUsr);
            } else {
                usrNotFound();
            }
        }

        function usrNotFound() {
            alert('Your username is incorrect!');
            $('#login-form').trigger('reset');
        }

        function checkPassword(usr) {
            let $pwd = $('.pwd').val();
            let usersDataObj = get(usr);

            if (usersDataObj.password == $pwd) {
                setCurUsr(usr);
                window.location.href = 'assessment.html';
            } else {
                alert('Incorrect password!');
                $('#login-form').trigger('reset');
            }
        }
    });
});