$(document).ready(() => {
    AOS.init();
    showSkills();

    $('a.skills').click(() => {
        showSkills();
    });

    $('.take-again').click(() => {
        window.location.href = 'assessment.html';
    })

    function showSkills() {
        let curUsr = getCurUsr();
        let usersDataObj = get(curUsr);
        let taken = 0;
        let strongest = '';
        let avg = {};

        Object.values(usersDataObj.subject).forEach((value) => {
            taken += value.length;
        });

        for (const [sub, marks] of Object.entries(usersDataObj.subject)) {
            avg[sub] = marks.reduce((acc, val) => acc + val) / taken;
        }

        let scores = Object.values(avg);
        let fields = Object.keys(avg);
        if (fields.length < 5) {
            for (const value of ['HTML', 'CSS', 'JavaScript', 'JQuery', 'Bootstrap']) {
                if (!fields.includes(value)) {
                    fields.push(value);
                }
            }
        }

        if (scores.length < 5) {
            let toAdd0 = 5 - scores.length;
            while (toAdd0-- > 0) {
                scores.push(0);
            }
        }

        plot(fields, scores);

        for (const [sub, avgScore] of Object.entries(avg)) {
            let max = 0;
            if (avgScore > max) {
                max = avgScore;
                strongest = sub;
            }
        }

        $('.usrname').html(curUsr);
        $('.time').html(new Date().toUTCString());
        $('.skill-assessed').html(Object.keys(usersDataObj.subject).length);
        $('.assessments-taken').html(taken);
        $('.strongest-skill').html(strongest);
        

        // table html row
        $('.avg-html').html(avg.HTML);
        let level = '';
        if (avg.HTML > 80) {
            level = 'Expert';
            $('.lvl-html').toggleClass('expert');
        } else if (avg.HTML > 40) {
            level = 'Proficient';
            $('.lvl-html').toggleClass('proficient');
        } else if (avg.HTML <= 40) {
            level = 'Novice';
            $('.lvl-html').toggleClass('novice');
        }
        $('.lvl-html').html(level);

        let lowest = 100;
        let highest = 0;
        get(curUsr).subject.HTML.forEach((value) => {
            if (value > highest) {
                highest = value;
            }

            if (value < lowest) {
                lowest = value;
            }
        });
        $('.lowest-html').html(lowest);
        $('.highest-html').html(highest);
        $('.taken-html').html(get(curUsr).subject.HTML.length);
    }

    function plot(fields = ['html', 'css', 'js', 'jquery', 'bootstrap'], scores = [100, 14, 60, 20, 30]) {
        var scoreNovice = [];
        var scoreProficient = [];
        var scoreExpert = [];
        var score = 0;
        var w = [0.35, 0.35, 0.35, 0.35, 0.35];

        for (const value of scores) {
            if (value > 80 && value <= 100) {
                scoreExpert.push(value - 80);
                scoreProficient.push(40);
                scoreNovice.push(40);
            } else if (value > 40 && value <= 80) {
                scoreExpert.push(0);
                scoreProficient.push(value - 40);
                scoreNovice.push(40);
            } else if (value < 40) {
                scoreExpert.push(0);
                scoreProficient.push(0);
                scoreNovice.push(value);
            } else if (value < 0) {
                scoreExpert.push(0);
                scoreProficient.push(0);
                scoreNovice.push(0);
            } else if (value > 100) {
                scoreExpert.push(20);
                scoreProficient.push(40);
                scoreNovice.push(40);
            }
        }

        var trace1 = {
            x: fields,
            y: scoreNovice,
            width: w,
            name: 'Novice',
            type: 'bar',
            marker: {
                color: '#fdad35'
            }
        };

        var trace2 = {
            x: fields,
            y: scoreProficient,
            width: w,
            name: 'Proficient',
            type: 'bar',
            marker: {
                color: '#35fd72'
            }
        };

        var trace3 = {
            x: fields,
            y: scoreExpert,
            width: w,
            name: 'Expert',
            type: 'bar',
            marker: {
                color: '#35bdfd'
            }
        };

        var data = [trace1, trace2, trace3];
        var layout = {
            title: 'Average Skills',
            barmode: 'stack',
            plot_bgcolor: "rgb(47, 47, 53)",
            paper_bgcolor: "rgb(47, 47, 53)",
            font: {
                color: 'rgba(255, 254, 254, 0.87)',
            }
        };
        Plotly.newPlot('chart', data, layout, {
            responsive: true
        });
    }
})