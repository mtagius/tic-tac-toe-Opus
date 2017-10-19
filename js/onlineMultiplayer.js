/*
server = "";
function testServer() {
    alert(server);
}
*/

serverName = "";

function initializeOnlineMultiplayer() {
    
    canvas = document.getElementById('tic-tac-toe-board');
    context = canvas.getContext('2d');
    
    canvasSize = $("#mainContainer").height() * (2/3);
    squareSize = canvasSize / 3;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    context.translate(0.5, 0.5);

    drawBoardGrid();

    canvas.addEventListener('mousedown', function (event) {

        console.log("Click");
    });

    $("#player1Wins").html(player1Wins);
    $("#player2Wins").html(player2Wins);
    $("#gamesPlayed").html("Games Played: " + gamesPlayed);

    $.getJSON("../gameData/" + serverName + ".json", function(json) {
        player1Name = json.players[0];
        player2Name = json.players[1];
        $("#player1Name").html(player1Name);
        $("#player2Name").html(player2Name);
        whosTurn();
    });
}