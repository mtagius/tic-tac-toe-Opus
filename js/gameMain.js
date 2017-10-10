
var canvas;
var context;

var canvasSize;
var squareSize;

var player1Name = "";
var player2name = "";

var turn = 0;

var board = ["", "", "", "", "", "", "", "", ""];

var player1Wins = 0;
var player2Wins = 0;
var gamesPlayed = 0;

var gameOver = false;


function drawO(boardArrayNum) {
    var halfsquareSize = (0.5 * squareSize);
    var centerX = (boardArrayNum % 3) * squareSize + halfsquareSize;
    var centerY = (Math.floor(boardArrayNum / 3) * squareSize) + halfsquareSize;
    var radius = squareSize / 3.4;
    var startAngle = 0 * Math.PI;
    var endAngle = 2 * Math.PI;

    context.lineWidth = 10;
    context.strokeStyle = "#01bBC2";
    context.beginPath();
    context.arc(centerX, centerY, radius, startAngle, endAngle);
    context.stroke();
}

function drawX(boardArrayNum) {
    context.strokeStyle = "#f1be32";

    var xCoordinate = (boardArrayNum % 3) * squareSize;
    var yCoordinate = Math.floor(boardArrayNum / 3) * squareSize;


    context.beginPath();

    var offset = Math.floor((1/4) * squareSize);
    context.moveTo(xCoordinate + offset, yCoordinate + offset);
    context.lineTo(xCoordinate + squareSize - offset, yCoordinate + squareSize - offset);

    context.moveTo(xCoordinate + offset, yCoordinate + squareSize - offset);
    context.lineTo(xCoordinate + squareSize - offset, yCoordinate + offset);

    context.stroke();
}

function drawBoardGrid() {
    var lineStart = 4;
    var lineLength = canvasSize - 5;
    context.lineWidth = 10;
    context.lineCap = 'round';
    context.strokeStyle = "#283F53";
    context.beginPath();

    /*
     * Horizontal lines 
     */
    for (var y = 1; y <= 2; y++) {
        context.moveTo(lineStart, y * squareSize);
        context.lineTo(lineLength, y * squareSize);
    }

    /*
     * Vertical lines 
     */
    for (var x = 1; x <= 2; x++) {
        context.moveTo(x * squareSize, lineStart);
        context.lineTo(x * squareSize, lineLength);
    }

    context.stroke();
}

function getSquareCube(event) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;

    var boardX = Math.floor(mouseX / squareSize);
    var boardY = Math.floor(mouseY / squareSize);

    return (3 * boardY) + boardX;
}

function drawWinPosition(winPosition) {
    context.lineWidth = 15;
    context.lineCap = 'round';
    context.strokeStyle = "#384F63";

    var halfsquareSize = (0.5 * squareSize);

    var startNum = 0;
    var endNum = 0;

    if(winPosition == 1 || winPosition == 4 || winPosition == 7) {
        startNum = 0;
        if(winPosition == 1) {
            endNum = 2;
        } else if (winPosition == 4) {
            endNum = 6;
        } else {
            endNum = 8;
        }
    } else if(winPosition == 2) {
        startNum = 3;
        endNum = 5;
    } else if(winPosition == 3 || winPosition == 8) {
        startNum = 6;
        if(winPosition == 3) {
            endNum = 8;
        } else {
            endNum = 2;
        }
    } else if(winPosition == 5) {
        startNum = 1;
        endNum = 7;
    } else if(winPosition == 6) {
        startNum = 2;
        endNum = 8;
    }

    var startCenterX = (startNum % 3) * squareSize + halfsquareSize;
    var startCenterY = (Math.floor(startNum / 3) * squareSize) + halfsquareSize;

    var endCenterX = (endNum % 3) * squareSize + halfsquareSize;
    var endCenterY = (Math.floor(endNum / 3) * squareSize) + halfsquareSize;

    context.beginPath();

    context.moveTo(startCenterX, startCenterY);
    context.lineTo(endCenterX, endCenterY);
    
    context.stroke();

}

function winCondition(draw) {
    var iterator = 0;
    var firstPiece = "";
    var iteratorPiece = "";
    var win = true;

    //horizontal rows
    for(var i = 0; i < 3; i++) {
        firstPiece = board[iterator];
        win = true;
        for(var j = 0; j < 3; j++) {
            if(firstPiece != board[iterator]) {
                win = false;
            }
            iterator += 1;
        }
        if(win == true && firstPiece != "") {
            if(draw == true) {
                drawWinPosition(i + 1);
            }
            return firstPiece;
        }
    }

    //vertical rows
    for(var i = 0; i < 3; i++) {
        iterator = i;
        firstPiece = board[i];
        win = true;
        for(var j = 0; j < 3; j++) {
            if(firstPiece != board[iterator]) {
                win = false;
            }
            iterator += 3;
        }
        if(win == true && firstPiece != "") {
            if(draw == true) {
                drawWinPosition(i + 4);
            }
            return firstPiece;
        }
    }

    //diagonal rows
    for(var i = 0; i < 2; i++) {
        firstPiece = board[2 * i];
        win = true;
        iterator = 2 * i;
        for(var j = 0; j < 3; j++) {
            if(firstPiece != board[iterator]) {
                win = false;
            }
            if(i == 0) {
                iterator += 4;
            } else {
                iterator += 2;
            }
        }
        if(win == true && firstPiece != "") {
            if(draw == true) {
                drawWinPosition(i + 7);
            }
            return firstPiece;
        }
    }

    //tie games
    var tieGame = true;
    for(var i = 0; i < board.length; i++) {
        if(board[i] == "") {
            tieGame = false;
            break;
        }
    }
    if(tieGame == true) {
        return "Tie";
    }



    return null;
}

function restart() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBoardGrid();
    turn = gamesPlayed % 2;  
    board = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    whosTurn();
}





function whosTurn() {
    if(turn == 0) {
        $("#whosTurn").html("It's " + player1Name + "'s turn.");
    } else {
        $("#whosTurn").html("It's " + player2Name + "'s turn.");
    }
}


$(document).ready(function () {
    var queryString = window.location.href;
    results = /\?=(.*)/.exec(queryString);
    if(!results) {
        $("#GameMode").html("No Game");
    } else if (results[1] == "Local_Multiplayer" ) {
        $("#GameMode").html("Local Multiplayer");
        $.get("../modals/localMultiplayer.html", function(data){
            $("#modalContainer").html(data);
            $('#myModal').modal({
                backdrop: 'static',
                keyboard: false
            })
            $("#player1NameModal").on('input', function() {                
                if(($("#player1NameModal").val() != "") && ($("#player2NameModal").val() != "")){
                    $("#beginButton").removeClass("disabled");
                } else {
                    $("#beginButton").addClass("disabled");
                }
            });
            $("#player2NameModal").on('input', function() {                
                if(($("#player1NameModal").val() != "") && ($("#player2NameModal").val() != "")){
                    $("#beginButton").removeClass("disabled");
                } else {
                    $("#beginButton").addClass("disabled");
                }
            });
            $('#player2NameModal').keypress(function(e){
                if(e.keyCode==13) {
                    $("#beginButton").click();
                }
              });
            $("#beginButton").on('click', function() {
                if(!($("#beginButton").hasClass("disabled"))) {
                    $('#myModal').modal("hide");
                    $("#player1NameModal").off("input");
                    $("#player2NameModal").off("input");
                    $("#player2NameModal").off("keypress");
                    $("#beginButton").off("click");
                    player1Name = $("#player1NameModal").val();
                    player2Name = $("#player2NameModal").val();
                    $("#player1Name").html(player1Name);
                    $("#player2Name").html(player2Name);
                    whosTurn();
                }
            });
        });
        $.get("../js/localMultiplayer.js", function(data){
            initializeLocalMultiplayer();
        });
        
    } else if (results[1] == "Single_Player") {
        $("#GameMode").html("Single Player");
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
                    player1Name = $("#player1NameModal").val();
                    player2Name = "Computer";
                    $("#player1Name").html(player1Name);
                    $("#player2Name").html(player2Name);
                    whosTurn();
                }
            });
        });
        $.get("../js/singlePlayer.js", function(data){
            initializeSinglePlayer();
        });
    } else {
        $("#GameMode").html("Online Multiplayer");
        $.getScript("../js/onlineMultiplayer.js", function() {
            server = results[1];
            testServer();
        });
    }
    
});