const body = document.querySelector("body")
const table = document.createElement("table")

const fillTable = () => {
    let pos = 0
    for(let i = 0; i < 3; i++){
        let row = document.createElement("tr")
        for(let j = 0; j < 3; j++){
            let data = document.createElement("td")
            data.dataset.pos = pos

            data.addEventListener("click", () => {
                gameBoard.placePiece(data)
            })

            row.appendChild(data)
            pos++
        }
        table.appendChild(row)
    }

    body.appendChild(table)
}

const gameBoard = (function(){
    let _gameBoard  = []
    let _playerXTurn = false
    
    for(let i = 0; i < 9; i++){
        _gameBoard[i] = ''
    }

    const placePiece = square => {
        let pos = square.dataset.pos

        if(square.innerText !== ""){
            // we don't want to place pieces in occupied spaces
            return
        }

        if(_playerXTurn){
            _gameBoard[pos] = "X"
            square.innerText = "X"
        }
        else{
            _gameBoard[pos] = "O"
            square.innerText = "O"
        }

        _playerXTurn = !_playerXTurn
    }

    return {placePiece}

})()



fillTable()