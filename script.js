const body = document.querySelector("body")
const table = document.createElement("table")
const status = document.createElement("p")
const restartButton = document.createElement("input")

const fillTable = () => {
    let pos = 0
    for (let i = 0; i < 3; i++) {
        let row = document.createElement("tr")
        for (let j = 0; j < 3; j++) {
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

    status.innerText = "O's turn!"

    restartButton.type = "button"
    restartButton.value = "Restart"
    restartButton.addEventListener("click", gameBoard.restart)

    body.appendChild(table)
    body.appendChild(status)
    body.appendChild(restartButton)
}

const gameBoard = (function () {
    let _gameBoard = []
    let _playerXTurn = false
    let _gameOver = false

    const O = "O"
    const X = "X"

    for (let i = 0; i < 9; i++) {
        // 0 1 2
        // 3 4 5
        // 6 7 8
        _gameBoard[i] = ''
    }

    const _checkVerticalWin = () => {
        for (let i = 0; i < 3; i++) {
            let oneDown = i + 3
            let twoDown = i + 6

            let currPiece = _gameBoard[i]
            let onePieceDown = _gameBoard[oneDown]
            let twoPieceDown = _gameBoard[twoDown]

            if (currPiece == O || currPiece == X) {
                if (currPiece == onePieceDown && currPiece == twoPieceDown) {
                    _gameOver = true
                    return currPiece
                }
            }
        }

        // no winner
        return ""
    }

    const _checkHorizontalWin = () => {
        for (let i = 0; i < 9; i += 3) {
            let oneDown = i + 1
            let twoDown = i + 2

            let currPiece = _gameBoard[i]
            let onePieceDown = _gameBoard[oneDown]
            let twoPieceDown = _gameBoard[twoDown]

            if (currPiece == O || currPiece == X) {
                if (currPiece == onePieceDown && currPiece == twoPieceDown) {
                    _gameOver = true
                    return currPiece
                }
            }
        }

        // no winner
        return ""
    }

    const _checkDiagonalWin = () => {
        let centerPiece = _gameBoard[4]

        let topLeftPiece = _gameBoard[0]
        let bottomRightPiece = _gameBoard[8]

        let topRightPiece = _gameBoard[2]
        let bottomLeftPiece = _gameBoard[6]

        if (centerPiece == O || centerPiece == X) {
            if (centerPiece == topLeftPiece && centerPiece == bottomRightPiece) {
                _gameOver = true
                return centerPiece
            }
            if (centerPiece == topRightPiece && centerPiece == bottomLeftPiece) {
                _gameOver = true
                return centerPiece
            }
        }

        // no winner
        return ""
    }

    const _checkTie = () => {
        for (let i = 0; i < _gameBoard.length; i++) {
            if (_gameBoard[i] === "") {
                return ""
            }
        }

        _gameOver = true
        return "tie"
    }

    const _checkWin = () => {
        if (_checkDiagonalWin() !== "") {
            return _checkDiagonalWin()
        } else if (_checkHorizontalWin() !== "") {
            return _checkHorizontalWin()
        } else if (_checkVerticalWin() !== "") {
            return _checkVerticalWin()
        } else {
            return _checkTie()
        }
    }

    const placePiece = square => {
        let pos = square.dataset.pos

        if (square.innerText !== "" || _gameOver) {
            // we don't want to place pieces in occupied spaces
            // and if the game is over, not placing of pieces
            return
        }

        if (_playerXTurn) {
            _gameBoard[pos] = X
            square.innerText = X
            status.innerText = "O's turn!"
        }
        else {
            _gameBoard[pos] = O
            square.innerText = O
            status.innerText = "X's turn!"
        }

        _playerXTurn = !_playerXTurn

        let gameStatus = _checkWin()

        switch (gameStatus) {
            case X:
                status.innerText = "X won"
                break;
            case O:
                status.innerText = "O won"
                break;
            case "tie":
                status.innerText = "It's a tie!"
                break;
            default:
                break;
        }
    }

    const restart = () => {
        for (let i = 0; i < _gameBoard.length; i++) {
            _gameBoard[i] = ""
        }

        let data = document.querySelectorAll("td")

        for(let i = 0; i < data.length; i++){
            data[i].innerText = ""
        }

        if(!_gameOver){
            _playerXTurn = !_playerXTurn
        }

        const currentTurn = _playerXTurn ? "X's turn" : "O's turn"

        _gameOver = false

        status.innerText = currentTurn
    }

    return { placePiece, restart }

})()


fillTable()