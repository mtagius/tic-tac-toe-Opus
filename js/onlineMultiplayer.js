/*
server = "";
function testServer() {
    alert(server);
}
*/

serverName = "";
sessionKey = "";
spectator = false;

function nameModal(player) {
    $.get("../modals/singlePlayer.html", function(data){
        $("#modalContainer").html(data);
        $('#myModal').modal({
            backdrop: 'static',
            keyboard: false
        })
        $("#player1NameModal").on('input', function() {                
            if($("#player1NameModal").val() != "") {
                $("#beginButton").removeClass("disabled");
            } else {
                $("#beginButton").addClass("disabled");
            }
        });
        $('#player1NameModal').keypress(function(e){
            if(e.keyCode==13) {
                $("#beginButton").click();
            }
          });
        $("#beginButton").on('click', function() {
            if(!($("#beginButton").hasClass("disabled"))) {
                $('#myModal').modal("hide");
                $("#player1NameModal").off("input");
                $("#player1NameModal").off("keypress");
                $("#beginButton").off("click");
                if(player == 1) {
                    player1Name = $("#player1NameModal").val();
                    createCookie("playerName", player1Name);
                    $("#player1Name").html(player1Name);
                    //ajax to update player1Name
                } else {
                    player2Name = $("#player1NameModal").val();
                    createCookie("playerName", player2Name);
                    $("#player2Name").html(player2Name);
                    //ajax to update player2Name
                }
            }
        });
    });
}

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

    $.getJSON("../gameData/" + serverName + ".json", function(json) {

        if(json.players[0] == "" || json.players[1] == "") {
            if(json.players[0] == "") {
                if(getCookie("playerName") == null) {
                    nameModal(1);
                } else {
                    player1Name = getCookie("playerName");
                }
                player2Name =  json.players[1];
                //ajax to update player1Name
            }
             else {
                if(getCookie("playerName") == null) {
                    nameModal(2);
                } else {
                    player2Name = getCookie("playerName");
                }
                player1Name =  json.players[0];
                //ajax to update player2Name
             }
             sessionKey = json.sessionKey;
             createCookie("sessionKey", sessionKey);
        } else {
            player1Name =  json.players[0];
            player2Name =  json.players[1];
            if(getCookie("sessionKey") != json.sessionKey) {
                spectator = true;
                $("#GameMode").html("Spectator");
            }
        }
        
        player1Wins = json.wins[0];
        player2Wins = json.wins[1];
        gamesPlayed = json.gamesPlayed;
        turn = json.turn;
        board = json.board;

        $("#player1Name").html(player1Name);
        $("#player2Name").html(player2Name);
        $("#player1Wins").html(player1Wins);
        $("#player2Wins").html(player2Wins);
        $("#gamesPlayed").html("Games Played: " + gamesPlayed);
        whosTurn();
    });
}