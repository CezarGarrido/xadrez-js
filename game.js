function NewGame(squares, pieces) {
    let state = {
        players: {},
        moves: {},
        currentPlayer: {}
    }

    function Run() {
        console.log('Running game.')
    }

    function MovePiece(command) {
        if (command.type != 'move:piece') {
            return
        }
        //togleLegalMoves();
        let square = command.payload.current_position;
        let pieceType = command.payload.piece_type;
        let piece = command.payload.current_piece;
        let possibleMoves = verifyMoves(pieceType, square);
        let proxID = piece.getAttribute('id');
        Object.keys(possibleMoves).forEach(function(i) {
            //document.getElementById(possibleMoves[i]).classList.toggle('legal-move-hint')
            const index = possibleMoves[i]
            if (proxID == index) {
                piece.appendChild(command.payload.last_piece)
                return
            }
        });
    }

    function ClickPiece(command) {
        togleLegalMoves();
        let square = command.payload.current_position;
        let pieceType = command.payload.piece_type;

        setStyleIsCurrentPiece(square);

        let elPiece = document.getElementById(square)
        let possibleMoves = verifyMoves(pieceType, square);

        Object.keys(possibleMoves).forEach(function(i) {
            document.getElementById(possibleMoves[i]).classList.toggle('legal-move-hint')
        });
    }

    function setStyleIsCurrentPiece(id) {
        document.getElementById(id).classList.toggle('current-piece');
    }

    function togleLegalMoves() {
        for (let i = 0; i < squares.length; i++) {
            squares[i].classList.remove('legal-move-hint')
        }
        for (let i = 0; i < pieces.length; i++) {
            pieces[i].classList.remove('current-piece')
        }
    }

    function verifyMoves(pieceType, square) {

        let line = Number(square[1]);
        let column = square[0];
        let newLine = line + 1;
        let moves = {};
        let moviment = 0;
        if (pieceType == 'pawn-white') {
            if (line == 2) {
                for (let i = 0; i < 2; i++) {
                    let pos = document.getElementById(column + (newLine++));
                    if (pos.childElementCount == 0) {
                        moviment++;
                        moves[moviment] = pos.getAttribute('id');
                    } else {
                        break
                    }
                }
            } else {
                for (let i = 0; i < 1; i++) {
                    let pos = document.getElementById(column + (newLine++));
                    if (pos.childElementCount == 0) {
                        moviment++;
                        moves[moviment] = pos.getAttribute('id');
                    } else {
                        break
                    }
                }
            }
        } else if (pieceType == 'pawn-black') {
            if (line == 7) {
                for (let i = 7; i >= 5; --i) {
                    if (i != 7) {
                        let pos = document.getElementById(column + i);
                        if (pos.childElementCount == 0) {
                            moviment++;
                            moves[moviment] = pos.getAttribute('id');
                        } else {
                            break
                        }
                    }
                }
            } else {
                for (let i = line; i >= line - 1; --i) {
                    let pos = document.getElementById(column + i);
                    if (pos.childElementCount == 0) {
                        moviment++;
                        moves[moviment] = pos.getAttribute('id');
                    } else {
                        break
                    }
                }
            }
        }
        return moves;
    }

    function FindIndex(obj, index) {
        let result = null;
        Object.keys(obj).forEach(function(i, val) {
            if (i == index) {
                result = i;
            }
        })
        return result;
    }

    return {
        FindIndex,
        ClickPiece,
        MovePiece
    }
}