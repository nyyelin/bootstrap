$(document).ready(() => {
    $('.nextbtn').hide();
    let html_assessment = {
        'What does HTML stand for?': ['Home Tool Markup Language', 'Hyper Text Markup Language', 'Hyperlinks and Text Markup Language', 1],
        'Who is making the Web standards?': ['The World Wide Web Consortium', 'Microsoft', 'Mozilla', 0],
        'Choose the correct HTML element for the largest heading:': ['&lt;h6&gt;', '&lt;h1&gt;', '&lt;head&gt;', 1],
        'What is the correct HTML element for inserting a line break?': ['&lt;br&gt;', '&lt;break&gt;', '&lt;lb&gt;', 0],
        'What is the correct HTML for adding a background color?': ['&lt;background&gt;yellow&lt;/background&gt;', '&lt;body style="background-color:yellow;"&gt;', '&lt;body bg="yellow"&gt;', 1]
    };

    let css_assessment = {
        'What does CSS stand for?': ['Colorful Style Sheets', 'Creative Style Sheets', 'Cascading Style Sheets', 2],
        'What is the correct HTML for referring to an external style sheet?': ['&lt;stylesheet&gt;mystyle.css&lt;/stylesheet&gt;', '&lt;link rel="stylesheet" type="text/css" href="mystyle.css"&gt;', '&lt;style src="mystyle.css"&gt;', 1],
        'Where in an HTML document is the correct place to refer to an external style sheet?': ['In the &lt;body&gt; section', 'At the end of the document', 'In the &lt;head&gt; section', 2],
        'Which HTML tag is used to define an internal style sheet?': ['&lt;css&gt;', '&lt;style&gt;', '&lt;script&gt;', 1],
        'Which HTML attribute is used to define inline styles?': ['style', 'class', 'font', 0],
    };

    let js_assessment = {
        'Inside which HTML element do we put the JavaScript?': ['&lt;scripting&gt;', '&lt;script&gt;', '&lt;javascript&gt;', 1],
        'What is the correct JavaScript syntax to change the content of the HTML element below?<br>&lt;p id="demo"&gt;This is a demonstration.&lt;/p&gt;': ['#demo.innerHTML = "Hello World!"', 'document.getElement("p").innerHTML = "Hello World!";', 'document.getElementById("demo").innerHTML = "Hello World!";', 2],
        'Where is the correct place to insert a JavaScript?': ['Both the &lt;head&gt; section and the &lt;body&gt; section are correct', 'The &lt;head&gt; section', 'The &lt;body&gt; section', 0],
        'What is the correct syntax for referring to an external script called "xxx.js"?': ['&lt;script name="xxx.js"&gt;', '&lt;script href="xxx.js"&gt;', '&lt;script src="xxx.js"&gt;', 2],
        'How do you write "Hello World" in an alert box?': ['msg("Hello World");', 'msgBox("Hello World");', 'alert("Hello World");', 2],
    };

    let jquery_assessment = {
        'Which sign does jQuery use as a shortcut for jQuery?': ['the ? Sign', 'the $ sign', 'the % sign', 1],
        'Look at the following selector: $("div"). What does it select?': ['All div elements', 'The first div element', 'None of the above', 0],
        'What is the correct jQuery code to set the background color of all p elements to red?': ['$("p").css("background-color","red");', '$("p").style("background-color","red");', '$("p").layout("background-color","red");', 0],
        'With jQuery, look at the following selector: $("div.intro"). What does it select?': ['All div elements with id="intro"', 'The first div element with class="intro"', 'All div elements with class="intro"', 2],
        'Which jQuery method is used to hide selected elements?': ['visible(false)', 'hide()', 'hidden', 1],
    }

    let bootstrap_assessment = {
        'Which class provides a responsive fixed width container?': ['.container', '.container-fluid', '.container-fixed', 0],
        'Which class provides a full width container, spanning the entire width of the viewport?': ['.container-fluid', '.container', '.container-fixed', 0],
        'The Bootstrap grid system is based on how many columns?': ['3', '9', '12', 2],
        'Which class adds zebra-stripes to a table?': ['.table-striped', '.table-bordered', '.even and .odd', 0],
        'Which class shapes an image to a circle?': ['.rounded-circle', '.img-circle', '.rounded', 0],
    }

    let mark = 0;
    let question_answered = [];
    let btns = ['.answer1', '.answer2', '.answer3'];
    let btnsFunc = {
        '.answer1': answer1,
        '.answer2': answer2,
        '.answer3': answer3
    };

    $('.html-link').click(() => {
        mark = 0;
        console.log(mark);
        question_answered = [];
        console.log(question_answered);
        $('.nextbtn').hide();
        clearColor();
        enableAll();
        showHTML();
    });

    $('.css-link').click(() => {
        mark = 0;
        console.log(mark);
        question_answered = [];
        console.log(question_answered)
        $('.nextbtn').hide();
        clearColor();
        enableAll();
        showCss();
    });

    $('.js-link').click(() => {
        mark = 0;
        question_answered = [];
        $('.nextbtn').hide();
        clearColor();
        enableAll();
        showJs();
    });

    $('.jquery-link').click(() => {
        mark = 0;
        question_answered = [];
        $('.nextbtn').hide();
        clearColor();
        enableAll();
        showJquery();
    });

    $('.boot-link').click(() => {
        mark = 0;
        question_answered = [];
        $('.nextbtn').hide();
        clearColor();
        enableAll();
        showBootstrap();
    });

    $('.answer1').click(answer1);

    $('.answer2').click(answer2);

    $('.answer3').click(answer3);

    $('.nextbtn').click(() => {
        if ($('.subject').html().trim() == 'HTML') {
            clearColor();
            console.log(mark);
            enableAll();
            showHTML();
        } else if ($('.subject').html().trim() == 'CSS') {
            clearColor();
            console.log(mark);
            enableAll();
            showCss();
        } else if ($('.subject').html().trim() == 'JavaScript') {
            clearColor();
            console.log(mark);
            enableAll();
            showJs();
        } else if ($('.subject').html().trim() == 'JQuery') {
            clearColor();
            console.log(mark);
            enableAll();
            showJquery();
        } else if ($('.subject').html().trim() == 'Bootstrap') {
            clearColor();
            console.log(mark);
            enableAll();
            showBootstrap();
        }
    });

    showHTML();

    function showHTML() {
        $('.subject').html('HTML');
        let count = 5 - question_answered.length;
        if (!count) {
            addScore({
                sub: 'HTML',
                mark: mark,
                user: getCurUsr(),
            });

            window.location.href = 'skillsTest.html';
        }
        $('.count').html(count);
        for (const question in html_assessment) {
            if (!question_answered.includes(question)) {
                $('.question').html(question);
                $('.answer1').html(html_assessment[question][0]);
                $('.answer2').html(html_assessment[question][1]);
                $('.answer3').html(html_assessment[question][2]);
                break;
            }
        }
    }

    function showCss() {
        $('.subject').html('CSS');
        let count = 5 - question_answered.length;
        if (!count) {
            addScore({
                sub: 'CSS',
                mark: mark,
                user: getCurUsr(),
            });

            window.location.href = 'skillsTest.html';
        }
        $('.count').html(count);
        for (const question in css_assessment) {
            if (!question_answered.includes(question)) {
                $('.question').html(question);
                $('.answer1').html(css_assessment[question][0]);
                $('.answer2').html(css_assessment[question][1]);
                $('.answer3').html(css_assessment[question][2]);
                break;
            }
        }
    }

    function showJs() {
        $('.subject').html('JavaScript');
        let count = 5 - question_answered.length;
        if (!count) {
            addScore({
                sub: 'JavaScript',
                mark: mark,
                user: getCurUsr(),
            });

            window.location.href = 'skillsTest.html';
        }
        $('.count').html(count);
        for (const question in js_assessment) {
            if (!question_answered.includes(question)) {
                $('.question').html(question);
                $('.answer1').html(js_assessment[question][0]);
                $('.answer2').html(js_assessment[question][1]);
                $('.answer3').html(js_assessment[question][2]);
                break;
            }
        }
    }

    function showJquery() {
        $('.subject').html('JQuery');
        let count = 5 - question_answered.length;
        if (!count) {
            addScore({
                sub: 'JQuery',
                mark: mark,
                user: getCurUsr(),
            });

            window.location.href = 'skillsTest.html';
        }
        $('.count').html(count);
        for (const question in jquery_assessment) {
            if (!question_answered.includes(question)) {
                $('.question').html(question);
                $('.answer1').html(jquery_assessment[question][0]);
                $('.answer2').html(jquery_assessment[question][1]);
                $('.answer3').html(jquery_assessment[question][2]);
                break;
            }
        }
    }

    function showBootstrap() {
        $('.subject').html('Bootstrap');
        let count = 5 - question_answered.length;
        if (!count) {
            addScore({
                sub: 'Bootstrap',
                mark: mark,
                user: getCurUsr(),
            });

            window.location.href = 'skillsTest.html';
        }
        $('.count').html(count);
        for (const question in bootstrap_assessment) {
            if (!question_answered.includes(question)) {
                $('.question').html(question);
                $('.answer1').html(bootstrap_assessment[question][0]);
                $('.answer2').html(bootstrap_assessment[question][1]);
                $('.answer3').html(bootstrap_assessment[question][2]);
                break;
            }
        }
    }

    function disableAll() {
        for (const value of btns) {
            $(value).off('click');
        }
    }

    function enableAll() {
        for (const value of btns) {
            $(value).off('click');
            $(value).on('click', btnsFunc[value]);
        }
    }

    function answer1() {
        let q = $('.question').html();
        question_answered.push(q);
        console.log('q answer:' + question_answered);
        if ($('.subject').html() == 'HTML') {
            for (const key in html_assessment) {
                if (key == q) {
                    console.log(html_assessment[key][html_assessment[key].length - 1]);
                    let correctAns = html_assessment[key][html_assessment[key].length - 1];
                    if (html_assessment[key][html_assessment[key].length - 1] == 0) {
                        mark += 20;
                        $('.answer1').toggleClass('correct-answer');
                        break;
                    } else {
                        $('.answer1').toggleClass('wrong-answer');
                        switch (correctAns) {
                            case 1:
                                $('.answer2').toggleClass('correct-answer');
                                break;
                            case 2:
                                $('.answer3').toggleClass('correct-answer');
                                break;
                        }
                        break;
                    }
                }
            }
        } else if ($('.subject').html() == 'CSS') {
            for (const key in css_assessment) {
                if (key == q) {
                    console.log(css_assessment[key][css_assessment[key].length - 1]);
                    let correctAns = css_assessment[key][css_assessment[key].length - 1];
                    if (css_assessment[key][css_assessment[key].length - 1] == 0) {
                        mark += 20;
                        $('.answer1').toggleClass('correct-answer');
                        break;
                    } else {
                        $('.answer1').toggleClass('wrong-answer');
                        switch (correctAns) {
                            case 1:
                                $('.answer2').toggleClass('correct-answer');
                                break;
                            case 2:
                                $('.answer3').toggleClass('correct-answer');
                                break;
                        }
                        break;
                    }
                }
            }
        } else if ($('.subject').html() == 'JavaScript') {
            for (const key in js_assessment) {
                if (key == q) {
                    console.log(js_assessment[key][js_assessment[key].length - 1]);
                    let correctAns = js_assessment[key][js_assessment[key].length - 1];
                    if (js_assessment[key][js_assessment[key].length - 1] == 0) {
                        mark += 20;
                        $('.answer1').toggleClass('correct-answer');
                        break;
                    } else {
                        $('.answer1').toggleClass('wrong-answer');
                        switch (correctAns) {
                            case 1:
                                $('.answer2').toggleClass('correct-answer');
                                break;
                            case 2:
                                $('.answer3').toggleClass('correct-answer');
                                break;
                        }
                        break;
                    }
                }
            }
        } else if ($('.subject').html() == 'JQuery') {
            for (const key in jquery_assessment) {
                if (key == q) {
                    console.log(jquery_assessment[key][jquery_assessment[key].length - 1]);
                    let correctAns = jquery_assessment[key][jquery_assessment[key].length - 1];
                    if (jquery_assessment[key][jquery_assessment[key].length - 1] == 0) {
                        mark += 20;
                        $('.answer1').toggleClass('correct-answer');
                        break;
                    } else {
                        $('.answer1').toggleClass('wrong-answer');
                        switch (correctAns) {
                            case 1:
                                $('.answer2').toggleClass('correct-answer');
                                break;
                            case 2:
                                $('.answer3').toggleClass('correct-answer');
                                break;
                        }
                        break;
                    }
                }
            }
        } else if ($('.subject').html() == 'Bootstrap') {
            for (const key in bootstrap_assessment) {
                if (key == q) {
                    console.log(bootstrap_assessment[key][bootstrap_assessment[key].length - 1]);
                    let correctAns = bootstrap_assessment[key][bootstrap_assessment[key].length - 1];
                    if (bootstrap_assessment[key][bootstrap_assessment[key].length - 1] == 0) {
                        mark += 20;
                        $('.answer1').toggleClass('correct-answer');
                        break;
                    } else {
                        $('.answer1').toggleClass('wrong-answer');
                        switch (correctAns) {
                            case 1:
                                $('.answer2').toggleClass('correct-answer');
                                break;
                            case 2:
                                $('.answer3').toggleClass('correct-answer');
                                break;
                        }
                        break;
                    }
                }
            }
        }

        // show next button
        $('.nextbtn').show();
        disableAll();
    }

    function answer2() {
        let q = $('.question').html();
        question_answered.push(q);
        console.log(question_answered);
        if ($('.subject').html() == 'HTML') {
            for (const key in html_assessment) {
                if (key == q) {
                    console.log(html_assessment[key][html_assessment[key].length - 1]);
                    let correctAns = html_assessment[key][html_assessment[key].length - 1];
                    if (html_assessment[key][html_assessment[key].length - 1] == 1) {
                        mark += 20;
                        $('.answer2').toggleClass('correct-answer');
                        break;
                    } else {
                        $('.answer2').toggleClass('wrong-answer');
                        switch (correctAns) {
                            case 0:
                                $('.answer1').toggleClass('correct-answer');
                                break;
                            case 2:
                                $('.answer3').toggleClass('correct-answer');
                                break;
                        }
                        break;
                    }
                }
            }
        } else if ($('.subject').html() == 'CSS') {
            for (const key in css_assessment) {
                if (key == q) {
                    console.log(css_assessment[key][css_assessment[key].length - 1]);
                    let correctAns = css_assessment[key][css_assessment[key].length - 1];
                    if (css_assessment[key][css_assessment[key].length - 1] == 1) {
                        mark += 20;
                        $('.answer2').toggleClass('correct-answer');
                        break;
                    } else {
                        $('.answer2').toggleClass('wrong-answer');
                        switch (correctAns) {
                            case 0:
                                $('.answer1').toggleClass('correct-answer');
                                break;
                            case 2:
                                $('.answer3').toggleClass('correct-answer');
                                break;
                        }
                        break;
                    }
                }
            }
        } else if ($('.subject').html() == 'JavaScript') {

        } else if ($('.subject').html() == 'JQuery') {

        } else if ($('.subject').html() == 'Bootstrap') {

        }

        // show next button
        $('.nextbtn').show();
        disableAll();
    }

    function answer3() {
        let q = $('.question').html();
        question_answered.push(q);
        console.log(question_answered);
        for (const key in html_assessment) {
            if (key == q) {
                console.log(html_assessment[key][html_assessment[key].length - 1]);
                let correctAns = html_assessment[key][html_assessment[key].length - 1];
                if (html_assessment[key][html_assessment[key].length - 1] == 2) {
                    mark += 20;
                    $('.answer3').toggleClass('correct-answer');
                    break;
                } else {
                    $('.answer3').toggleClass('wrong-answer');
                    switch (correctAns) {
                        case 0:
                            $('.answer1').toggleClass('correct-answer');
                            break;
                        case 1:
                            $('.answer2').toggleClass('correct-answer');
                            break;
                    }
                    break;
                }
            }
        }
        // show next button
        $('.nextbtn').show();
        disableAll();
    }

    function clearColor() {
        for (const value of btns) {
            if ($(value).hasClass('correct-answer')) {
                $(value).toggleClass('correct-answer');
            } else if ($(value).hasClass('wrong-answer')) {
                $(value).toggleClass('wrong-answer');
            }
        }
    }
});