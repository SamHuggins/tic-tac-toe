//empty board
let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

//player always starts as X
let player = "X"

//this is used to stop player from changing cells after the game is over
let gameOver = false

$('.cell').on('click', function() {
    //this keeps the player from being able to click on an already clicked cell
    if (!gameOver && !$(this).hasClass('clicked')) {
        //adds class clicked to a cell
        $(this).addClass('clicked');
        
        // Get the cell's row and column indices
        const row = $(this).parent().index();
        const col = $(this).index();

        // Update the board array with the current player's symbol
        board[row][col] = player;
        
        //updates the cell to display the player's symbol
        $(this).text(player);

        //checks for a win/draw every time
        checkWin()


    }

});

function switchPlayer(){
    if(player === "X"){
        player = "O"
        $('#game-info-text').html('<h3>It is Os turn</h3>');
    } else{
        player = "X"
        $('#game-info-text').html('<h3>It is Xs turn</h3>');
    }
}

function checkWin(){
    let flag = false;
    let clickedCount = 0;

    //check rows
    for (let i = 0; i < 3; i++) {
        if(
            board[i][0] !== null && 
            board[i][0] === board[i][1] && 
            board[i][0] === board[i][2]
        ) {
            flag = true;
        }
    }

    //check columns
    for (let i = 0; i < 3; i++) {
        if(
            board[0][i] !== null && 
            board[0][i] === board[1][i] && 
            board[0][i] === board[2][i]
        ) {   
            flag = true;
        }
    }

    //check diagonals
    if (
        board[0][0] !== null &&
        board[0][0] === board[1][1] &&
        board[0][0] === board[2][2]
      ) {
        flag = true;
    }

    if (
        board[0][2] !== null &&
        board[0][2] === board[1][1] &&
        board[0][2] === board[2][0]
    ) {
        flag = true;
    }

    
    
    // count clicked cells
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] !== null) {
                clickedCount++;
            }
        }
    }
    
    //check draw
    if (clickedCount === 9 && flag === false) {
        $('#game-result-alert').removeClass('d-none').addClass('alert-warning').text('It is a draw!');
        $('#game-info-text').html('');
        gameOver = true;
    } 
    //if there is a winner
    else if (flag) {
        $('#game-result-alert').removeClass('d-none').addClass('alert-success').text(player + ' wins!');
        $('#game-info-text').html('');
        gameOver = true;
    } 
    //if game is still going
    else {
        switchPlayer();
        $('#game-info-text').html(player + "'s turn");
    }
}



function resetGame() {
    // clear board array
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    //sets player back to X
    player = "X"

    //sets game info to x
    $('#game-info-text').html('<h3>It is Xs turn</h3>');

    // remove clicked class and text from all cells
    $('.cell').removeClass('clicked').text('');

    //resets gameOver
    gameOver = false;

    // hide game result alert
    $('#game-result-alert').addClass('d-none');
    
}

$('#new-game').on('click', function() {
    resetGame();
});

