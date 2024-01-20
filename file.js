/* 
planning:
classes: 
1. gameboard
2. squares
3. controlFlow
4. player1 and player2 objects (but within the controlFlow)

(later)
4. display class

logic-- 

1. board divided into 3 rows/columns
2. gameboard has method of player and coordinate
3. calls these through the squares class to change a sqaures value, this is then pushed to the board
4. the game flow object calls methods of gameboard, printing it, and adding sqaures based on consequential 
coordinate inputs (later will be the dom). game flow also switches player turns. 
5. 
a. coordinate is inputted
b. flow calls on board method to place
c. updates console/dom based on board
d. switches players
e. checks for win based on player objects in gameflow
(note- when doing the dom. have board/changes displayed independently of game happening)

*/

function Board(){

    let board = []

    for (i = 0; i <=2; i++) {
        board.push([])
        for (j = 0; j <=2; j++) {
            let newSquare = Square()
            board[i].push(newSquare)
        }
    }

    const printBoard = function(){
        console.log(board)
        console.log(`board printed`)
        for (i = 0; i <= board.length-1; i++){
            for (j=0; j<= board[i].length-1; j++){
                console.log(board[i][j].getSquare())
                console.log("")
            }
        }
    }

    const addMarker = function(player, row, column){
        console.log(`add marker`)
        if (board[row][column].getSquare() != 0) {
            console.log('hasnt worked')
            return
        } 
        console.log(`row: ${row}, column: ${column}`)
        board[row][column].changeSquare(player)
    }

    const returnBoard = function(){
        return board
    }

    return {printBoard, addMarker, returnBoard}
}

function Square(){
    let square = 0

    const changeSquare = function(playerNumb) {
        square = playerNumb
    }

    const getSquare = function(){
        return square
    }
    return {changeSquare, getSquare}
}

function gameFlow(playerOneName, playerTwoName){

    const playerOne ={
        mark: 1,
        title: playerOneName
    }
    const playerTwo = {
        mark: 2,
        title: playerTwoName
    }

    const board = Board()
    let currentPlayer = playerOne

    const checkWin = function(mark){
        let squares = board.returnBoard()
        console.log(`squares: ${squares[2][0].getSquare()}`)
        const squareNumbers= squares[0].map((item) => {
            console.log(`the item: ${item}`)
            return item.getSquare()
        })
        console.log(`map result: ${squareNumbers}`)
        const winningCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
        for (i = 0; i <= 2; i++){
            for (j=0; j<=2;j++){
                if (winningCombos[i][j] )
            }
        }
        /*
        how to store position each player;
        keep all winning combos for each player
        each round pass coordinates and remove from combo
        have other function that checks if either has all three removed

        */


    }

    const markSquare = function(row,column){
        board.addMarker(currentPlayer.mark, row, column)
        board.printBoard()

        checkWin(currentPlayer.mark)


        if (currentPlayer == playerOne) {
            currentPlayer = playerTwo
        } else {
            currentPlayer = playerOne
        }
    }

    return {
        markSquare
    }


}
game = gameFlow()
game.markSquare(0,0)
game.markSquare(0,1)
game.markSquare(0,2)
game.markSquare(1,0)
game.markSquare(1,0)