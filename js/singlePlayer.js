function computerTurn() {
    var computerPick = -1;

    for(var i = 0; i < board.length; i++) {
        if(board[i] == "") {
            board[i] = "X";
            if(winCondition(false) == "X") {
                board[i] = "";
                computerPick = i;
                break;
            }
            board[i] = "";
        }
    }

    for(var i = 0; i < board.length; i++) {
        if(board[i] == "") {
            board[i] = "O";
            if(winCondition(false) == "O") {
                computerPick = i;
                break;
            }
            board[i] = "";
        }
    }

    if(computerPick == -1) {
        do {
            computerPick = Math.floor(Math.random() * 9);
        } while(board[computerPick] != "");
    }

    setTimeout(function() {
        turn = 0;
        board[computerPick] = "O";
        drawO(computerPick);
        whosTurn();
        determineWinner();
    }, Math.floor(Math.random() * 1500) + 1000);
}

function determineWinner() {
    var winner = winCondition(true);
    if(winner != null) {
        if(winner == "X") {
            $("#player1Wins").html(player1Wins += 1);
            $("#whosTurn").html(player1Name + " wins!");
        } else if (winner == "O") {
            $("#player2Wins").html(player2Wins += 1);
            $("#whosTurn").html(player2Name + " wins!");
        } else {
            $("#whosTurn").html("Tie Game!");
        }
        $("#gamesPlayed").html("Games Played: " + (gamesPlayed += 1));
        gameOver = true;
    }
}

function initializeSinglePlayer() {
    
    canvas = document.getElementById('tic-tac-toe-board');
    context = canvas.getContext('2d');
    
    canvasSize = $("#mainContainer").height() * (2/3);
    squareSize = canvasSize / 3;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    context.translate(0.5, 0.5);

    drawBoardGrid();

    canvas.addEventListener('mousedown', function (event) {

        if((gameOver == false) && (turn == 0)){

            var boardArrayNum = getSquareCube(event);
            
            if(board[boardArrayNum] == "") {
                turn = 1;
                board[boardArrayNum] = "X";
                drawX(boardArrayNum);
        
                whosTurn();
            }

            determineWinner();

            if(gameOver == false) {
                computerTurn();
            }
        }
    });

    $("#newGameButton").on('click', function() {
        if(gameOver == true) {
            restart();
            if(turn == 1) {
                computerTurn();
            }
        }
    });

    $("#player1Wins").html(player1Wins);
    $("#player2Wins").html(player2Wins);
    $("#gamesPlayed").html("Games Played: " + gamesPlayed);
}