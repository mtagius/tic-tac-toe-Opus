

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
                if (turn == 0) {
                    turn = 1;
                    board[boardArrayNum] = "X";
                    drawX(boardArrayNum);
                } else {
                    turn = 0;
                    board[boardArrayNum] = "O";
                    drawO(boardArrayNum);
                }
        
                whosTurn();
            }

            var winner = winCondition();
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
        
    });

    $("#newGameButton").on('click', function() {
        if(gameOver == true) {
            restart();
        }
    });

    $("#player1Wins").html(player1Wins);
    $("#player2Wins").html(player2Wins);
    $("#gamesPlayed").html("Games Played: " + gamesPlayed);
}