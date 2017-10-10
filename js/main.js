
//Thanks to they guys who made Particleground https://github.com/jnicol/particleground  
$(document).ready(function () {
    $('#particles').particleground({
        dotColor: '#283F53',
        lineColor: '#5cbdaa',
        density: 30000,
        minSpeedX: .1,
        maxSpeedX: .3,
        minSpeedY: .1,
        maxSpeedY: .3,
        particleRadius: 80,
        parallaxMultiplier: 20,
        proximity: 0
    });
    $('.intro').css({
        'margin-top': -($('.intro').height() / 2)
    });
    setCopyrightFooter();
});


function isValidInput(input) {

    return true;
}

function setCopyrightFooter() {
    $("#copyrightFooter").html("© " + new Date().getFullYear() + " Matt Agius, All Rights Reserved");
}
  