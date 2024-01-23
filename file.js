
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
            return "taken"
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
   
    const end = function(result){
        values = board.returnBoard()
        for (i = 0; i <= values.length-1; i++){
            for (j=0; j<= values[i].length-1; j++){
                values[i][j].changeSquare(result)
            }
        }
        
    }

    const getPlayer= function(){
        return currentPlayer
    }
   
    const checkWin = function(){
        let mark = currentPlayer.mark
        currentSquares = board.boardNumbers()
        console.log(`currentSquares: ${currentSquares}`)

        const winningCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
        for (i = 0; i <= winningCombos.length-1; i++){
            oneCombo = winningCombos[i]
            if (currentSquares[oneCombo[0]] == mark && currentSquares[oneCombo[1]] == mark && currentSquares[oneCombo[2]] == mark) {
                 console.log(`${currentPlayer.title} wins`)
                 end('w')
                 return true
            }
        }

        const draw = currentSquares.every((item) => {
            return item !== 0
        })
        if(draw){
            console.log('game is a draw')
            end('d') 
            return true
        }

    }

    const changePlayer = function(){
        if (currentPlayer == playerOne) {
            currentPlayer = playerTwo
        } else {
            currentPlayer = playerOne
        }
    }


    const markSquare = function(row,column){
        let add = board.addMarker(currentPlayer.mark, row, column)
        if (add == "taken" ){
            console.log('taken')
            return
        }
        console.log(`current player is ${currentPlayer.title}`)
        let stop = checkWin()
        if (stop) {
            return
        }
        changePlayer()
        board.printBoard()

    }

    return {
        markSquare, getBoard: board, getPlayer
    }
}


function Interface(one, two){
    domBoard = document.querySelector('#board')
    game = GameFlow(one, two)
    turn = document.querySelector('h3')
    form = document.querySelector('form')
   
    
    function updateDisplay(){
        domBoard.textContent = ""
        let currentBoard = game.getBoard
        let squaresValues = currentBoard.boardNumbers()
        for (i = 0; i <= squaresValues.length -1; i++) {
            let square = document.createElement('button')
            if (squaresValues[i] == 0) {
                square.textContent = "E"
                square.setAttribute('style', 'color: #A9DFBF; font-weight: 700')
            } else if (squaresValues[i] == 1) {
                square.textContent = "〇"
                square.setAttribute('style', 'color: #F1948A; font-weight: 700')
            } else if (squaresValues[i] == 2) {
                square.textContent = "✖"
                square.setAttribute('style', 'color: #FBFCFC')
            }
            square.setAttribute('data-btn', i)
            domBoard.appendChild(square)
        }
    }

    updateDisplay()


    function gameEnd(internal){
        domBoard.remove()
        turn.remove()
        form.remove()
        let paragraph = document.createElement('h1')
        player = game.getPlayer()
        if (internal == "w"){
            paragraph.textContent = `${player.title} wins!`
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
        console.log(`current player display: ${game.getPlayer().title}`)
        turn.textContent = `${game.getPlayer().title}'s turn`
        let internal = game.getBoard.boardNumbers()[1]
        if (internal == "w" || internal == "d") {
            gameEnd(internal)
        }
        
        updateDisplay()

        })
    }
    
    submit = document.querySelector('#submit')
    submit.addEventListener('click', (event) => {
        event.preventDefault()
        if (one.value == ""){
            one.value = "Player One"
        }
        if (two.value == ""){
            two.value = "Player Two"
        }
        console.log(one.value)
        console.log(two.value)
        Interface(one.value, two.value) 
    })
