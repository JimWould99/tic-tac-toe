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

    const boardNumbers = function(){
        currentSquares = []
        for (i = 0; i <= 2; i++){
            board[i].map((item) => {
                currentSquares.push(item.getSquare())
        })
        }
        return currentSquares
    }

    return {printBoard, addMarker, returnBoard, boardNumbers}
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

function GameFlow(playerOneName, playerTwoName){

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
    let gameState = "competing"
   
    const checkWin = function(){
        let mark = currentPlayer.mark
        currentSquares = board.boardNumbers()
        console.log(`currentSquares: ${currentSquares}`)

        const winningCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
        for (i = 0; i <= winningCombos.length-1; i++){
            oneCombo = winningCombos[i]
            if (currentSquares[oneCombo[0]] == mark && currentSquares[oneCombo[1]] == mark && currentSquares[oneCombo[2]] == mark) {
                 console.log(`${currentPlayer.title} wins`)
                 gamestate= "wins"
                 return 'wins'
            }
        }

        const draw = currentSquares.every((item) => {
            return item !== 0
        })
        if(draw){
            console.log('game is a draw')
            gamestate="draw"
            return 'draw'
        }

    }


    const markSquare = function(row,column){
        board.addMarker(currentPlayer.mark, row, column, gameState)
        
        console.log(`current player is ${currentPlayer.title}`)
        board.printBoard()
        checkWin()

        if (currentPlayer == playerOne) {
            currentPlayer = playerTwo
        } else {
            currentPlayer = playerOne
        }
    }

    return {
        markSquare, getBoard: board, currentPlayer, gameState
    }
}


function Interface(){
    domBoard = document.querySelector('#board')
    game = GameFlow('spike','MG')
    buttons = document.querySelectorAll('[data-btn]')
    
    function updateDisplay(){
        domBoard.textContent = ""
        currentBoard = game.getBoard
        squaresValues = currentBoard.boardNumbers()
        for (i = 0; i <= squaresValues.length -1; i++) {
            let square = document.createElement('button')
            square.textContent = squaresValues[i]
            square.setAttribute('data-btn', i)
            domBoard.appendChild(square)
        }
    }

    updateDisplay()

    function gameEnd(){
        domBoard.remove()
        turn = document.querySelector('h3')
        turn.remove()
        let paragraph = document.createElement('h1')
        if (game.gameState == "wins"){
            paragraph.textContent = `${game.currentPlayer.title} wins!`
        } else {
            paragraph.textContent = `The game is a draw!`
        }
        console.log(`done game end`)
        paragraph.setAttribute('class', 'second')
        body = document.querySelector('body')
        body.appendChild(paragraph)
    }
    
   domBoard.addEventListener('click', (e) => {
        number = e.target.dataset.btn
        let row
        let column
        console.log(`attribute number: ${number}`)

        if (number >= 0 && number <= 2) {
            row = 0
        } else if (number >= 3 && number <=5) {
            row = 1
        } else {
            row = 2
        }

        if (number == 0 || number == 3 || number ==6){
            column = 0
        } else if (number == 1 || number == 4|| number == 7) {
            column = 1
        } else {
            column = 2
        }

        console.log(`row: ${row}`)
        console.log(`column: ${column}`)

        
        game.markSquare(row, column)
        if (game.gamestate != "competing") {
            gameEnd()
            return
        } 
        
        
        updateDisplay()

        })
    }
    
Interface()

/*
game = GameFlow('spike','MG')
game.markSquare(0,1)
game.markSquare(0,0)
game.markSquare(0,2)
game.markSquare(1,1)
game.markSquare(1,2)
game.markSquare(1,0)
game.markSquare(2,0)
game.markSquare(2,1)
game.markSquare(2,2)
*/